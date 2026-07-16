/**
 * Research brief generator.
 *
 * Emits the markdown brief that gets pasted into a deep-research tool (Gemini
 * Deep Research, Grok DeepSearch, etc.) when commissioning a dispatch for a
 * new model. Everything below the header is assembled FROM THE CODE — the
 * tag catalog, the picker-signal contract, and the section catalog — so that
 * when a new signal/tag/section is added to the site, the next brief
 * automatically asks the researcher to establish it. Do not hardcode lists
 * here that already exist in lib/models/*; import them instead.
 *
 * Run with: tsx scripts/generate-research-brief.ts [--model "<display name>"] [--slug <slug>] [--source google|x] [--out <path>]
 *
 * --source prepends the matching deployment system prompt from scripts/prompts/
 * (google-researcher.md or x-researcher.md), producing a complete paste-ready
 * prompt for that research tool. Without --source, only the brief is emitted.
 *
 * --slug embeds research-reports/<slug>/scratchpad.md (the editor's
 * hand-collected leads) as seed material for the researcher to verify and
 * extend. Silently skipped when no scratchpad exists.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { TAG_CATEGORY_ORDER, getTagsByCategory, type TagCategory } from '../lib/models/tags'
import { PICKER_SIGNALS } from '../lib/models/picker-signals'
import { REQUIRED_SECTION_IDS } from '../lib/models/sections'
import { SECTION_CATALOG, getCatalogByStatus } from '../lib/models/section-catalog'

const RESEARCH_SOURCES = ['google', 'x'] as const
type ResearchSource = (typeof RESEARCH_SOURCES)[number]

function parseArgs(argv: string[]) {
  let model = '[MODEL NAME]'
  let slug: string | undefined
  let out: string | undefined
  let source: ResearchSource | undefined

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--model') {
      model = argv[i + 1] ?? model
      i++
    } else if (argv[i] === '--slug') {
      slug = argv[i + 1]
      i++
    } else if (argv[i] === '--out') {
      out = argv[i + 1]
      i++
    } else if (argv[i] === '--source') {
      const value = argv[i + 1]
      if (!RESEARCH_SOURCES.includes(value as ResearchSource)) {
        console.error(`--source must be one of: ${RESEARCH_SOURCES.join(', ')} (got: ${value ?? 'nothing'})`)
        process.exit(1)
      }
      source = value as ResearchSource
      i++
    }
  }

  return { model, slug, out, source }
}

/**
 * The editor's hand-collected leads for this model, if any. Frontmatter is
 * stripped; the body (including its own "leads, not facts" guidance) is
 * embedded verbatim.
 */
function loadScratchpad(slug: string): string | null {
  const path = join(process.cwd(), 'research-reports', slug, 'scratchpad.md')
  if (!existsSync(path)) return null
  const body = readFileSync(path, 'utf8').replace(/^---[\s\S]*?---\s*/, '').trim()
  return body || null
}

function renderSeedSection(scratchpad: string): string {
  return `
---

## Seed material from the editor

The site's editor hand-collected the material below while following this model. Treat every item as a lead, not a fact: open each link, verify the claim against the live source, upgrade it to a primary citation where possible, and note anything that has since changed or cannot be confirmed. Cover all of it — then go beyond it. The seed list is a floor, not the scope.

${scratchpad}
`
}

function loadSourcePrompt(source: ResearchSource): string {
  const promptsDir = join(dirname(fileURLToPath(import.meta.url)), 'prompts')
  const path = join(promptsDir, `${source}-researcher.md`)
  return readFileSync(path, 'utf8').trimEnd() + '\n\n'
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10)
}

function renderHeader(model: string): string {
  const date = todayIso()
  return `# Research Dispatch Brief: ${model}

This brief scopes a research dispatch for **${model}** — raw, cited source material to be handed to a deep-research tool (Gemini Deep Research, Grok DeepSearch, or similar), then later authored into a published Megaminds model report. It is not itself the report.

## Ground rules

- **Dateline everything.** State "as of ${date}" (or the actual research date) explicitly near the top, and note it again anywhere facts might have since changed (pricing, benchmarks, version numbers).
- **Cite every factual claim.** Every price, benchmark score, spec, and quote carries an inline source URL. Prefer primary sources (vendor docs, model cards, official blog posts) over aggregators; when only a secondary source is available, say so.
- **Mark uncertainty honestly.** If a claim cannot be verified, label it **unverified** rather than presenting it as fact. If something could not be found at all, write \`TODO(research)\` rather than guessing or inventing a plausible-sounding number.
- **Mixed sentiment only.** Community-reception material must include both positive and critical/skeptical voices — do not cherry-pick praise.

---

`
}

function renderStructuredDataSection(): string {
  return `## Structured data requirements

The dispatch must gather enough sourced material to populate these profile fields:

- **Pricing** — input $/Mtok, output $/Mtok, cached-input $/Mtok, any free tiers, and any subscription/chat plans (name, price, message limits). Every number needs a source URL. Note the pricing date, since API rates change.
- **Benchmarks** — for each benchmark reported: score, max possible score, a comparison point (rival model or prior version), and a source URL per score. Prefer benchmarks run by an independent third party over vendor self-reported numbers, and flag which is which.
- **Community sentiment** — 5-10 attributed quotes (author or handle, a URL, and a date where available), deliberately mixed across positive, neutral, and critical takes. Do not paraphrase — quote directly and link to the original.
- **Release date** — with a source, and a note on the exact-day uncertainty if secondary sources disagree.
- **Context window** — the advertised token limit, plus any independent evidence on *usable* recall at that length (needle-in-haystack results, community reports of degradation).
- **Max output tokens** — the advertised cap.
- **License** — the license name (MIT, Apache-2.0, proprietary, custom research license, etc.) and whether weights are actually downloadable (not just "open" in name).
- **Architecture / parameter count** — if disclosed: total params, active params (for MoE), architecture family. Mark undisclosed specs as such rather than estimating.

---

`
}

function renderTagSection(): string {
  const lines: string[] = ['## Tag adjudication', '']
  lines.push(
    'For each tag below, state whether it applies to this model, with cited evidence. Absence of evidence means "not established" — do not guess yes or no without a source.',
    ''
  )

  for (const category of TAG_CATEGORY_ORDER) {
    const tags = getTagsByCategory(category)
    if (tags.length === 0) continue
    lines.push(`### ${categoryLabel(category)}`, '')
    for (const tag of tags) {
      lines.push(`- **${tag.label}** (\`${tag.id}\`)${tag.description ? ` — ${tag.description}` : ''}`)
    }
    lines.push('')
  }

  return lines.join('\n') + '\n---\n\n'
}

function categoryLabel(category: TagCategory): string {
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function renderPickerSignalSection(): string {
  const lines: string[] = [
    '## Picker signal evidence',
    '',
    'The Model Picker eliminates or scores models based on these signals. Each one is a research question: establish whether the evidence bar is met, and cite it. If it cannot be established, say so explicitly rather than leaving it silently unanswered — the picker treats "not established" as a real state, not a failure.',
    '',
  ]

  for (const signal of PICKER_SIGNALS) {
    lines.push(`### ${signal.id}${signal.hard ? ' (hard filter)' : ' (scoring only)'}`, '')
    lines.push(`- **User need:** ${signal.need}`)
    lines.push(`- **Establish whether:** ${signal.evidence}`)
    lines.push('')
  }

  return lines.join('\n') + '\n---\n\n'
}

function renderSectionCoverageSection(): string {
  const lines: string[] = ['## Section coverage', '']
  lines.push(
    'The published report requires these four sections at minimum. Gather sourced material for each:',
    ''
  )

  for (const id of REQUIRED_SECTION_IDS) {
    const entry = SECTION_CATALOG[id]
    lines.push(`- **${id}**${entry ? ` — ${entry.description}` : ''}`)
  }

  lines.push('')
  lines.push(
    'Beyond the required set, gather material for the recommended sections below where relevant to this model — skip any that genuinely do not apply, but do not skip one just because it is more work:',
    ''
  )

  for (const entry of getCatalogByStatus('recommended')) {
    lines.push(`- **${entry.id}** — ${entry.description}`)
  }

  lines.push('')
  lines.push(
    'Finally, this model may have bespoke angles that do not fit any cataloged section — a named architecture technique, a launch controversy, a head-to-head rivalry, a regulatory event. Note and source those too; a new section id can be coined for a genuinely novel angle (see the existing bespoke catalog in `lib/models/section-catalog.ts` for precedent and naming style).'
  )

  return lines.join('\n') + '\n'
}

function buildBrief(model: string, scratchpad: string | null): string {
  return (
    renderHeader(model) +
    renderStructuredDataSection() +
    renderTagSection() +
    renderPickerSignalSection() +
    renderSectionCoverageSection() +
    (scratchpad ? renderSeedSection(scratchpad) : '')
  )
}

function main() {
  const { model, slug, out, source } = parseArgs(process.argv.slice(2))
  const scratchpad = slug ? loadScratchpad(slug) : null
  const brief = (source ? loadSourcePrompt(source) : '') + buildBrief(model, scratchpad)

  process.stdout.write(brief)

  if (out) {
    const path = resolve(out)
    writeFileSync(path, brief, 'utf8')
    console.error(`\nWrote brief to ${path}`)
  }
}

main()
