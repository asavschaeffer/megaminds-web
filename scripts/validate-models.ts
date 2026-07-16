/**
 * Model validation & audit script.
 *
 * Importing the registry runs the hard checks (Zod schema, tag validation, and
 * MDX<->TSX section cross-check); any of those throw and abort this script.
 *
 * On top of that, this script is the site's audit surface. Exactly one check is
 * a gate:
 *   - REQUIRED_SECTION_IDS coverage — warn by default, exit 1 under --strict.
 *
 * Every other check below is WARN-ONLY in both modes (they build worklists for
 * the next research dispatch, they do not fail CI):
 *   1. Novel sections not in SECTION_CATALOG.
 *   2. Picker-signal coverage (which models have each declared signal).
 *   3. Module-completeness audit (missing pricing / benchmarks / metadata).
 *   4. Malformed MDX `## ` headings the section parser silently drops.
 *
 * Flags:
 *   --strict   exit 1 when a required section is missing (CI uses this).
 *   --json     emit the whole audit as a JSON object and suppress the tables.
 *
 * Run with: tsx scripts/validate-models.ts [--strict] [--json]
 */

import fs from 'fs'
import path from 'path'
import { getAllModels } from '../lib/models/registry'
import { REQUIRED_SECTION_IDS } from '../lib/models/sections'
import { getNovelSectionIds } from '../lib/models/section-catalog'
import { PICKER_SIGNALS, tagSignalStatus, type PickerSignal } from '../lib/models/picker-signals'
import { buildPickerModel } from '../lib/models/picker'
import type { ModelProfile } from '../lib/models/types'

const strict = process.argv.includes('--strict')
const jsonMode = process.argv.includes('--json')

const CONTENT_DIR = path.join(process.cwd(), 'content', 'eval', 'models')

// ——— 1. required sections (the only gate) ———

interface RequiredRow {
  slug: string
  missing: string[]
}

function auditRequiredSections(models: ModelProfile[]): RequiredRow[] {
  return models.map((model) => {
    const sectionIds = new Set(model.sections.map((section) => section.id))
    const missing = REQUIRED_SECTION_IDS.filter((id) => !sectionIds.has(id))
    return { slug: model.slug, missing }
  })
}

// ——— 2. novel sections (warn-only) ———

interface NovelRow {
  slug: string
  novel: string[]
}

function auditNovelSections(models: ModelProfile[]): NovelRow[] {
  return models.map((model) => {
    const ids = model.sections.map((section) => section.id)
    return { slug: model.slug, novel: getNovelSectionIds(ids) }
  })
}

// ——— 3. picker-signal coverage (warn-only) ———

const tagSignals = PICKER_SIGNALS.filter((s) => s.provenance.kind === 'tag')
const computedSignals = PICKER_SIGNALS.filter((s) => s.provenance.kind === 'computed')

interface PickerCoverage {
  matrix: Record<string, Record<string, 'yes' | 'unknown'>>
  computed: Record<string, { priceBand: string; hasFreeAccess: boolean }>
  requirements: Array<{ slug: string; signal: string; need: string }>
}

function auditPickerCoverage(models: ModelProfile[]): PickerCoverage {
  const matrix: PickerCoverage['matrix'] = {}
  const computed: PickerCoverage['computed'] = {}
  const requirements: PickerCoverage['requirements'] = []

  for (const model of models) {
    const row: Record<string, 'yes' | 'unknown'> = {}
    for (const signal of tagSignals) {
      const status = tagSignalStatus(model, signal)
      // computed status can't occur here (filtered to tag provenance)
      const resolved: 'yes' | 'unknown' = status === 'yes' ? 'yes' : 'unknown'
      row[signal.id] = resolved
      if (resolved === 'unknown') {
        requirements.push({ slug: model.slug, signal: signal.id, need: signal.need })
      }
    }
    matrix[model.slug] = row

    const picker = buildPickerModel(model)
    computed[model.slug] = { priceBand: picker.priceBand, hasFreeAccess: picker.hasFreeAccess }
  }

  return { matrix, computed, requirements }
}

// ——— 4. module completeness (warn-only) ———

interface CompletenessRow {
  slug: string
  flags: string[]
}

function auditCompleteness(models: ModelProfile[]): CompletenessRow[] {
  return models.map((model) => {
    const flags: string[] = []

    const hasApiRates = model.meta.apiRates != null
    const hasPricingData = model.pricingData != null
    if (!hasApiRates && !hasPricingData) flags.push('no-pricing(apiRates+pricingData)')

    if (!model.chatLimits || model.chatLimits.length === 0) flags.push('no-chatLimits')

    const benchmarks = model.benchmarks ?? []
    if (benchmarks.length === 0) {
      flags.push('no-benchmarks')
    } else {
      const missingSource = benchmarks.filter((b) => !b.source).length
      if (missingSource > 0) flags.push(`benchmarks-missing-source(${missingSource})`)
    }

    const sentiment = model.sentimentFeed ?? []
    const sentimentMissingUrl = sentiment.filter((s) => !s.url).length
    if (sentimentMissingUrl > 0) flags.push(`sentiment-missing-url(${sentimentMissingUrl})`)

    if (!model.governance?.lastUpdated) flags.push('no-governance.lastUpdated')
    if (!model.author) flags.push('no-author')
    if (!model.updatedAt) flags.push('no-updatedAt')

    return { slug: model.slug, flags }
  })
}

// ——— 5. rewrite queue (warn-only) ———

interface RewriteQueueRow {
  slug: string
  reason?: string
  flaggedAt?: string
}

function auditRewriteQueue(models: ModelProfile[]): RewriteQueueRow[] {
  return models
    .filter((model) => model.editorial?.status === 'flagged-for-rewrite')
    .map((model) => ({
      slug: model.slug,
      reason: model.editorial?.reason,
      flaggedAt: model.editorial?.flaggedAt,
    }))
}

// ——— 6. malformed MDX headings (warn-only) ———

const HEADING_ID_RE = /^[a-z0-9-]+$/

interface MalformedHeading {
  file: string
  heading: string
}

function auditMalformedHeadings(): MalformedHeading[] {
  const results: MalformedHeading[] = []
  if (!fs.existsSync(CONTENT_DIR)) return results

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx') && f !== 'template.mdx')

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    // Drop fenced code blocks so `## ` inside code isn't mistaken for a heading.
    const withoutFences = raw.replace(/```[\s\S]*?```/g, '')
    const lines = withoutFences.split(/\r?\n/)
    for (const line of lines) {
      const match = /^## (.+?)\s*$/.exec(line)
      if (!match) continue
      const id = match[1]
      if (!HEADING_ID_RE.test(id)) {
        results.push({ file, heading: id })
      }
    }
  }

  return results
}

// ——— output helpers ———

function pad(value: string, width: number): string {
  return value.padEnd(width)
}

function printRequiredSections(rows: RequiredRow[]): void {
  const slugWidth = Math.max(...rows.map((r) => r.slug.length), 'Model'.length)
  const header = `${pad('Model', slugWidth)}  Missing required sections`
  console.log(header)
  console.log('-'.repeat(header.length))
  for (const row of rows) {
    const status = row.missing.length === 0 ? 'ok' : row.missing.join(', ')
    console.log(`${pad(row.slug, slugWidth)}  ${status}`)
  }
  console.log('')
}

function printNovelSections(rows: NovelRow[]): void {
  console.log('== Novel sections (not in lib/models/section-catalog.ts) ==')
  const offenders = rows.filter((r) => r.novel.length > 0)
  if (offenders.length === 0) {
    console.log('None — every section id in every report is cataloged.\n')
    return
  }
  for (const row of offenders) {
    for (const id of row.novel) {
      console.log(
        `WARN: novel section '${id}' in ${row.slug} — add it to lib/models/section-catalog.ts with a description and origin`
      )
    }
  }
  console.log('')
}

function printPickerCoverage(models: ModelProfile[], coverage: PickerCoverage): void {
  console.log('== Picker signal coverage (tag-provenance) ==')
  console.log('Columns are signals (see legend); rows are models. ✓ = granted, · = unknown.\n')

  // Legend: number each tag signal for compact fixed-width columns.
  const legend = tagSignals.map((s, i) => ({ n: i + 1, signal: s }))
  const colWidth = 3
  const slugWidth = Math.max(...models.map((m) => m.slug.length), 'Model'.length)

  const headerCells = legend.map((l) => pad(String(l.n), colWidth)).join(' ')
  const header = `${pad('Model', slugWidth)}  ${headerCells}`
  console.log(header)
  console.log('-'.repeat(header.length))
  for (const model of models) {
    const row = coverage.matrix[model.slug]
    const cells = tagSignals
      .map((s) => pad(row[s.id] === 'yes' ? '✓' : '·', colWidth))
      .join(' ')
    console.log(`${pad(model.slug, slugWidth)}  ${cells}`)
  }
  console.log('')

  console.log('Legend:')
  for (const l of legend) {
    const hard = l.signal.hard ? 'hard' : 'soft'
    console.log(`  ${pad(String(l.n), 3)} ${pad(l.signal.id, 20)} (${hard})  ${l.signal.need}`)
  }
  console.log('')

  // Computed-provenance signals: reported per model, not in the matrix.
  console.log('Computed signals (from buildPickerModel):')
  const bandWidth = Math.max(...Object.values(coverage.computed).map((c) => c.priceBand.length), 'priceBand'.length)
  console.log(`  ${pad('Model', slugWidth)}  ${pad('priceBand', bandWidth)}  freeAccess`)
  for (const model of models) {
    const c = coverage.computed[model.slug]
    console.log(`  ${pad(model.slug, slugWidth)}  ${pad(c.priceBand, bandWidth)}  ${c.hasFreeAccess ? 'yes' : 'no'}`)
  }
  console.log(`  (computed fields: ${computedSignals.map((s) => s.id).join(', ')})`)
  console.log('')

  // Research requirements: every unknown (model, signal) pair.
  console.log('== Research requirements (unknown signal coverage) ==')
  if (coverage.requirements.length === 0) {
    console.log('None — every model resolves every tag signal.\n')
    return
  }
  console.log(`${coverage.requirements.length} open question(s) for the next dispatch:`)
  for (const req of coverage.requirements) {
    console.log(`  - ${req.slug}: ${req.signal} — "${req.need}"`)
  }
  console.log('')
}

function printCompleteness(rows: CompletenessRow[]): void {
  console.log('== Module completeness ==')
  const slugWidth = Math.max(...rows.map((r) => r.slug.length), 'Model'.length)
  for (const row of rows) {
    if (row.flags.length === 0) {
      console.log(`${pad(row.slug, slugWidth)}  ok`)
    } else {
      console.log(`${pad(row.slug, slugWidth)}  ${row.flags.length} flag(s): ${row.flags.join(', ')}`)
    }
  }
  console.log('')
}

function printRewriteQueue(rows: RewriteQueueRow[]): void {
  console.log('== Rewrite queue (editorial.status === "flagged-for-rewrite") ==')
  if (rows.length === 0) {
    console.log('None — no models are flagged for rewrite.\n')
    return
  }
  const slugWidth = Math.max(...rows.map((r) => r.slug.length), 'Model'.length)
  const flaggedWidth = Math.max(...rows.map((r) => (r.flaggedAt ?? '').length), 'FlaggedAt'.length)
  const header = `${pad('Model', slugWidth)}  ${pad('FlaggedAt', flaggedWidth)}  Reason`
  console.log(header)
  console.log('-'.repeat(header.length))
  for (const row of rows) {
    console.log(`${pad(row.slug, slugWidth)}  ${pad(row.flaggedAt ?? '(none)', flaggedWidth)}  ${row.reason ?? '(no reason given)'}`)
  }
  console.log(`\n${rows.length} model(s) flagged for rewrite.\n`)
}

function printMalformedHeadings(rows: MalformedHeading[]): void {
  console.log('== Malformed MDX headings (dropped by parseSections) ==')
  if (rows.length === 0) {
    console.log('None — every top-level `## ` heading is a valid [a-z0-9-] section id.\n')
    return
  }
  for (const row of rows) {
    console.log(
      `WARN: malformed heading '## ${row.heading}' in ${row.file} — parseSections only matches ^## [a-z0-9-]+$, so this is treated as body text`
    )
  }
  console.log('')
}

// ——— main ———

function main() {
  const models = getAllModels()

  const required = auditRequiredSections(models)
  const novel = auditNovelSections(models)
  const coverage = auditPickerCoverage(models)
  const completeness = auditCompleteness(models)
  const rewriteQueue = auditRewriteQueue(models)
  const malformed = auditMalformedHeadings()

  const incomplete = required.filter((r) => r.missing.length > 0)
  const requiredFailed = strict && incomplete.length > 0

  if (jsonMode) {
    const output = {
      models: models.map((m) => m.slug),
      strict,
      requiredSections: {
        rows: required,
        incomplete: incomplete.map((r) => r.slug),
        gateFailed: requiredFailed,
      },
      novelSections: novel.filter((r) => r.novel.length > 0),
      pickerCoverage: {
        signals: tagSignals.map((s) => ({ id: s.id, need: s.need, hard: s.hard })),
        computedSignals: computedSignals.map((s) => ({ id: s.id, need: s.need, hard: s.hard })),
        matrix: coverage.matrix,
        computed: coverage.computed,
        researchRequirements: coverage.requirements,
      },
      moduleCompleteness: completeness,
      rewriteQueue,
      malformedHeadings: malformed,
    }
    console.log(JSON.stringify(output, null, 2))
    process.exit(requiredFailed ? 1 : 0)
  }

  console.log(`Validating ${models.length} models...\n`)
  console.log('Registry loaded: Zod schema, tag, and MDX cross-checks passed.\n')

  // Gate: required sections.
  console.log('== Required sections ==')
  printRequiredSections(required)
  if (incomplete.length === 0) {
    console.log('All models contain every required section.\n')
  } else {
    const label = strict ? 'ERROR' : 'WARN'
    console.log(`${label}: ${incomplete.length} model(s) missing required sections:`)
    for (const row of incomplete) {
      console.log(`  - ${row.slug}: ${row.missing.join(', ')}`)
    }
    console.log('')
  }

  // Warn-only audits.
  printNovelSections(novel)
  printPickerCoverage(models, coverage)
  printCompleteness(completeness)
  printRewriteQueue(rewriteQueue)
  printMalformedHeadings(malformed)

  if (requiredFailed) {
    console.error('Strict mode: failing due to missing required sections.')
    process.exit(1)
  }
  if (incomplete.length > 0) {
    console.log('Non-strict mode: treating missing sections as warnings (exit 0).')
  }
  console.log('Audit complete. All non-required checks are warn-only (exit 0).')
  process.exit(0)
}

main()
