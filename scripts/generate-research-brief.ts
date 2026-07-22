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
 * Run with: tsx scripts/generate-research-brief.ts [--model "<display name>"] [--slug <slug>] [--source google|x] [--out <path>] [--release-url <url> ...]
 *
 * --release-url (repeatable) names primary release/announcement URLs; the brief
 * asserts the model is real and lists them, so a deep-research agent won't doubt
 * a model that postdates its training cutoff.
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
  const releaseUrls: string[] = []
  let org: string | undefined
  let released: string | undefined

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
    } else if (argv[i] === '--release-url') {
      const value = argv[i + 1]
      if (value) releaseUrls.push(value)
      i++
    } else if (argv[i] === '--org') {
      org = argv[i + 1]
      i++
    } else if (argv[i] === '--released') {
      released = argv[i + 1]
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

  return { model, slug, out, source, releaseUrls, org, released }
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

The editor hand-collected the material below while following this model. Treat every item as a lead, not a fact: open each link, verify it against the live source, upgrade it to a primary citation where possible, and note anything that has since changed or cannot be confirmed. Cover all of it, then go beyond it — the seed list is a floor, not the scope.

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

function renderHeader(model: string, releaseUrls: string[], org?: string, released?: string): string {
  const date = todayIso()
  const provenance = [released ? `released ${released}` : '', org ? `by ${org}` : ''].filter(Boolean).join(' ')
  const sources = releaseUrls.length
    ? `\nStart from these primary sources and expand well beyond them:\n${releaseUrls.map((u) => `- ${u}`).join('\n')}\n`
    : ''
  return `# Research Dispatch Brief: ${model}

Research **${model}**${provenance ? `, ${provenance}` : ''} — a shipped, publicly available model. Gather exhaustive, cited source material; this is raw research, not a finished writeup.
${sources}
## Ground rules

- **Dateline everything** — open with "as of ${date}" and re-flag anywhere facts may have changed (pricing, benchmarks, versions).
- **Cite every claim** with an inline source URL; prefer primary sources, mark anything unverifiable as **unverified**, and write \`TODO(research)\` for gaps rather than guessing.
- **Mixed sentiment only** — community reception must include both positive and critical voices, not cherry-picked praise.

---

`
}

function renderStructuredDataSection(): string {
  return `## Structured data requirements

The dispatch must gather enough sourced material to populate these profile fields:

- **Pricing** — input, output, and cached-input $/Mtok; free tiers; subscription/chat plans (name, price, message limits). Every number needs a source URL and a pricing date.
- **Benchmarks** — per benchmark: score, max possible score, a comparison point (rival model or prior version), source URL. Flag independent third-party results vs. vendor self-reported.
- **Community sentiment** — 5-10 attributed quotes (author/handle, URL, date where available), mixed across positive, neutral, and critical takes. Quote directly — do not paraphrase.
- **Release date** — sourced, with a note on exact-day uncertainty if sources disagree.
- **Context window** — advertised token limit, plus independent evidence on *usable* recall at that length (needle-in-haystack results, degradation reports).
- **Max output tokens** — advertised cap.
- **License** — license name (MIT, Apache-2.0, proprietary, custom, etc.) and whether weights are actually downloadable, not just "open" in name.
- **Architecture / parameter count** — if disclosed: total params, active params (MoE), architecture family. Mark undisclosed specs as such rather than estimating.
- **Capabilities & modalities** — strongest/weakest task types (coding, reasoning, math, writing, agentic tool-use, long-context…), each backed by a benchmark or cited demonstration rather than vendor adjectives; and which input/output modalities it genuinely supports (text / vision / audio / image-gen), sourced. Gather the evidence, not the labels.

---

`
}

function renderPickerSignalSection(): string {
  const lines: string[] = [
    '## Picker signal evidence',
    '',
    'The Model Picker scores/eliminates models on these signals. Each is a research question: establish whether the evidence bar is met, and cite it. If it can\'t be established, say so — "not established" is a real state, not a failure.',
    '',
  ]

  for (const signal of PICKER_SIGNALS) {
    lines.push(`- **${signal.id}** (${signal.hard ? 'hard filter' : 'scoring'}) — need: ${signal.need} · establish: ${signal.evidence}`)
  }

  return lines.join('\n') + '\n\n---\n\n'
}

function renderSectionCoverageSection(): string {
  const lines: string[] = ['## Section coverage', '']
  lines.push('Required sections (minimum four) — gather sourced material for each:', '')

  for (const id of REQUIRED_SECTION_IDS) {
    const entry = SECTION_CATALOG[id]
    lines.push(`- **${id}**${entry ? ` — ${entry.description}` : ''}`)
  }

  lines.push('')
  lines.push(
    'Also gather material for these recommended sections where relevant to this model — skip only what genuinely does not apply, not what is just more work:',
    ''
  )

  for (const entry of getCatalogByStatus('recommended')) {
    lines.push(`- **${entry.id}** — ${entry.description}`)
  }

  lines.push('')
  lines.push(
    'This model may also have bespoke angles no cataloged section covers — a named architecture technique, a launch controversy, a head-to-head rivalry, a regulatory event. Note and source those too; coin a new section id for a genuinely novel angle (see `lib/models/section-catalog.ts` for precedent and naming style).'
  )

  return lines.join('\n') + '\n'
}

function buildBrief(
  model: string,
  scratchpad: string | null,
  releaseUrls: string[],
  org?: string,
  released?: string
): string {
  return (
    renderHeader(model, releaseUrls, org, released) +
    renderStructuredDataSection() +
    renderPickerSignalSection() +
    renderSectionCoverageSection() +
    (scratchpad ? renderSeedSection(scratchpad) : '')
  )
}

function main() {
  const { model, slug, out, source, releaseUrls, org, released } = parseArgs(process.argv.slice(2))
  const scratchpad = slug ? loadScratchpad(slug) : null
  const brief = (source ? loadSourcePrompt(source) : '') + buildBrief(model, scratchpad, releaseUrls, org, released)

  process.stdout.write(brief)

  if (out) {
    const path = resolve(out)
    writeFileSync(path, brief, 'utf8')
    console.error(`\nWrote brief to ${path}`)
  }
}

main()
