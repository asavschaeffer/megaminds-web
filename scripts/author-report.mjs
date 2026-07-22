#!/usr/bin/env node
/**
 * Report authoring adapter — the subject model writes its own report.
 *
 * Drives the subject model through a stateful, section-by-section authoring
 * pass over the research dispatches in research-reports/<slug>/, producing a
 * draft MDX body (research-reports/<slug>/draft.mdx). The report's SUBJECT is
 * its AUTHOR — GLM writes the GLM report, Grok writes Grok's — using the site's
 * standalone authoring constitution (scripts/prompts/report-writer.md) as the
 * system prompt, with none of a coding agent's scaffolding.
 *
 * Why section-by-section over one big call:
 *   - Pointedness: a focused call per section beats a 13k-token single shot that
 *     visibly loses steam toward the end (worse still for thinking models, whose
 *     reasoning shares the completion budget).
 *   - Coherence for free: the conversation ACCRETES — each section turn sees the
 *     actual prior sections, so it picks up threads and avoids repetition, and
 *     the verdict (written last) sees the whole report.
 *   - Cheap input: the static prefix (constitution + dispatches) is cached once;
 *     each written section is cached as it lands, so later turns read it at ~0.1x
 *     where the model supports caching (Claude, Gemini). Non-caching models still
 *     work — they just re-send (fine for mid-tier).
 * The trade is that it is sequential (no parallel fan-out); authoring quality
 * beats wall-clock here.
 *
 * Flow: PLAN turn (thesis + ordered section list) → one SECTION turn per planned
 * section, verdict last → assemble into the draft. Authoring stops at the draft;
 * citation-vetting, lint, and final smoothing are the editor's pass, by design.
 *
 * Plain Node >= 18 (native fetch), no dependencies. Matches the conventions of
 * scripts/interview-model.mjs and scripts/deep-research.mjs.
 *
 * Usage:
 *   node scripts/author-report.mjs --slug <slug> --route <vendor/model> [options]
 *
 * Options:
 *   --slug <slug>            (required) Report slug; the dispatch dir + draft name
 *   --route <vendor/model>   (required) Subject's OpenRouter model id, e.g.
 *                            "z-ai/glm-5.2". The vendor prefix picks the backend:
 *                            anthropic/ → Claude Code, openai/ → Codex (both are
 *                            stubs for now), everything else → OpenRouter.
 *   --name "<Display Name>"  Report subject's display name (default: the slug)
 *   --provider <name>        openrouter | nvidia, for the OpenRouter backend
 *   --sysprompt <path>       System prompt (default scripts/prompts/report-writer.md)
 *   --sections <ids>         Skip the plan turn; author exactly these comma-separated
 *                            section ids in order (still verdict-last is NOT forced)
 *   --temperature <t>        Sampling temperature (default 0.7)
 *   --max-tokens <n>         Per-section completion cap (default 16000; reasoning
 *                            models spend part of it on hidden reasoning tokens)
 *   --plan-max-tokens <n>    Plan-turn completion cap (default 6000)
 *   --out <path>             Output path (default research-reports/<slug>/draft.mdx)
 *   --force                  Overwrite an existing draft
 *   --dry-run                Compose everything, print the plan of work + prefix
 *                            size + first request (key redacted); call nothing.
 *
 * Environment:
 *   OPENROUTER_API_KEY       OpenRouter (https://openrouter.ai/api/v1/chat/completions)
 *   NVIDIA_NIM_API_KEY       NVIDIA NIM (canonical; NVIDIA_API_KEY accepted as alias)
 */

import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, basename, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const SCRIPT_NAME = basename(fileURLToPath(import.meta.url))
const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const REDACTED = '***REDACTED***'

const PROVIDERS = {
  openrouter: {
    label: 'OpenRouter',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    envVars: ['OPENROUTER_API_KEY'],
  },
  nvidia: {
    label: 'NVIDIA NIM',
    url: 'https://integrate.api.nvidia.com/v1/chat/completions',
    envVars: ['NVIDIA_NIM_API_KEY', 'NVIDIA_API_KEY'],
  },
}

const DEFAULT_SYSPROMPT = join('scripts', 'prompts', 'report-writer.md')
const REQUIRED_SECTIONS = ['why-it-matters', 'economics', 'issues', 'verdict']

function fail(message) {
  console.error(`error: ${message}`)
  process.exit(1)
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function parseArgs(argv) {
  const args = {
    slug: undefined,
    route: undefined,
    name: undefined,
    provider: undefined,
    sysprompt: DEFAULT_SYSPROMPT,
    sections: undefined,
    temperature: 0.7,
    // Generous by default: reasoning models spend completion budget on hidden
    // reasoning tokens before emitting content, and a cap that is too low comes
    // back as empty content (finish_reason "stop"). Headroom is cheap; silence isn't.
    maxTokens: 16000,
    planMaxTokens: 6000,
    out: undefined,
    force: false,
    dryRun: false,
  }

  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i]
    const next = () => {
      const value = argv[i + 1]
      if (value === undefined) fail(`missing value for ${flag}`)
      i++
      return value
    }
    switch (flag) {
      case '--slug': args.slug = next(); break
      case '--route': args.route = next(); break
      case '--name': args.name = next(); break
      case '--provider': args.provider = next(); break
      case '--sysprompt': args.sysprompt = next(); break
      case '--sections':
        args.sections = next().split(',').map((s) => s.trim()).filter(Boolean)
        if (args.sections.length === 0) fail('--sections given but empty')
        break
      case '--temperature':
        args.temperature = Number.parseFloat(next())
        if (!Number.isFinite(args.temperature)) fail('--temperature must be a number')
        break
      case '--max-tokens':
        args.maxTokens = Number.parseInt(next(), 10)
        if (!Number.isInteger(args.maxTokens) || args.maxTokens < 1) fail('--max-tokens must be a positive integer')
        break
      case '--plan-max-tokens':
        args.planMaxTokens = Number.parseInt(next(), 10)
        if (!Number.isInteger(args.planMaxTokens) || args.planMaxTokens < 1) fail('--plan-max-tokens must be a positive integer')
        break
      case '--out': args.out = next(); break
      case '--force': args.force = true; break
      case '--dry-run': args.dryRun = true; break
      default: fail(`unknown flag: ${flag}`)
    }
  }

  if (!args.slug) fail('--slug is required')
  if (!args.route) fail('--route is required (the subject\'s OpenRouter model id, e.g. "z-ai/glm-5.2")')
  args.name ??= args.slug
  return args
}

/** anthropic/ → claude-code, openai/ → codex, everything else → openrouter. */
function resolveBackend(route) {
  const vendor = (route.split('/')[0] || '').toLowerCase()
  if (vendor === 'anthropic') return 'claude-code'
  if (vendor === 'openai') return 'codex'
  return 'openrouter'
}

function resolveProvider(requested) {
  if (requested) {
    const provider = PROVIDERS[requested]
    if (!provider) fail(`unknown provider "${requested}" (expected: ${Object.keys(PROVIDERS).join(' | ')})`)
    const key = provider.envVars.map((name) => process.env[name]).find(Boolean)
    if (!key) fail(`provider "${requested}" selected but none of ${provider.envVars.join(', ')} is set`)
    return { id: requested, ...provider, key }
  }
  for (const id of ['openrouter', 'nvidia']) {
    const provider = PROVIDERS[id]
    const key = provider.envVars.map((name) => process.env[name]).find(Boolean)
    if (key) return { id, ...provider, key }
  }
  fail('no API key found; set OPENROUTER_API_KEY or NVIDIA_NIM_API_KEY (or pass --provider)')
}

/**
 * Concatenate every dispatch in research-reports/<slug>/ (google.md, x.md,
 * self-interview.md, scratchpad.md, probe-*.md, web.md, …) into one block, each
 * fenced by a header. Excludes any prior draft. This is the raw material the
 * author cites from — and the big, static, cacheable half of the prefix.
 */
function loadDispatches(slug) {
  const dir = join(WEB_ROOT, 'research-reports', slug)
  if (!existsSync(dir)) fail(`no dispatch directory at research-reports/${slug} (run the research pipeline first)`)
  // Dispatches are .md; the draft we write is .mdx, so it is excluded already.
  const files = readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .sort()
  if (files.length === 0) fail(`no dispatch .md files in research-reports/${slug}`)
  const parts = files.map((f) => `===== dispatch: ${f} =====\n\n${readFileSync(join(dir, f), 'utf8').trim()}`)
  return { files, text: parts.join('\n\n') }
}

function loadSysprompt(path) {
  const abs = resolve(WEB_ROOT, path)
  if (!existsSync(abs)) fail(`system prompt not found: ${abs}`)
  return readFileSync(abs, 'utf8').trim()
}

// ---------------------------------------------------------------------------
// OpenRouter chat with incremental prompt caching + retry/backoff.
// The conversation is an array of { role, text }. We cache the system prefix
// (constitution + dispatches, static) and, each turn, the last message — so the
// growing report gets cached as it is written (Anthropic/Gemini honor this;
// other models ignore cache_control harmlessly).
// ---------------------------------------------------------------------------

function toContent(text, cache) {
  return cache ? [{ type: 'text', text, cache_control: { type: 'ephemeral' } }] : text
}

function buildBody(conversation, { model, temperature, maxTokens, providerId }) {
  // Prompt caching (cache_control content parts) and OpenRouter's usage-report
  // opt-in are OpenRouter extensions. NVIDIA NIM and other plain
  // OpenAI-compatible backends reject `usage` and don't understand
  // cache_control, so only emit them for OpenRouter.
  const caching = providerId === 'openrouter'
  const lastIndex = conversation.length - 1
  const body = {
    model,
    temperature,
    max_tokens: maxTokens,
    messages: conversation.map((m, i) => ({
      role: m.role,
      // Cache the static system prefix and the current tail of the conversation.
      content: toContent(m.text, caching && (m.role === 'system' || i === lastIndex)),
    })),
  }
  if (caching) body.usage = { include: true }
  return body
}

function redactedHeaders() {
  return { Authorization: `Bearer ${REDACTED}`, 'Content-Type': 'application/json' }
}

async function httpJson(label, url, init, { maxAttempts = 4 } = {}) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let response
    try {
      response = await fetch(url, init)
    } catch (err) {
      if (attempt === maxAttempts) throw new Error(`network error talking to ${label}: ${err.message}`)
      console.error(`  network error (${err.message}), retrying (${attempt}/${maxAttempts})...`)
      await sleep(2000 * attempt)
      continue
    }
    if (response.status === 429 || response.status === 503) {
      if (attempt === maxAttempts) throw new Error(`${label} kept returning ${response.status} after ${maxAttempts} attempts`)
      const retryAfter = Number.parseInt(response.headers.get('retry-after') ?? '', 10)
      const waitMs = Number.isInteger(retryAfter) ? retryAfter * 1000 : 5000 * attempt
      console.error(`  ${response.status} from ${label}, waiting ${waitMs}ms (attempt ${attempt}/${maxAttempts})...`)
      await sleep(waitMs)
      continue
    }
    const text = await response.text()
    if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}: ${text.slice(0, 500)}`)
    try {
      return JSON.parse(text)
    } catch {
      throw new Error(`${label} returned non-JSON body: ${text.slice(0, 300)}`)
    }
  }
  throw new Error('unreachable')
}

/** One turn: send the whole conversation, return the assistant's text. */
async function turn(provider, route, conversation, opts) {
  const body = buildBody(conversation, { model: route, providerId: provider.id, ...opts })
  const res = await httpJson(provider.label, provider.url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${provider.key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const message = res.choices?.[0]?.message
  const content = (message?.content ?? '').trim()
  if (!content) {
    const finish = res.choices?.[0]?.finish_reason ?? 'unknown'
    const reasoning = res.usage?.completion_tokens_details?.reasoning_tokens
    throw new Error(
      `${provider.label} returned empty content (finish_reason: ${finish}${reasoning ? `, reasoning_tokens: ${reasoning}` : ''}). ` +
        `If this is a reasoning model, its hidden reasoning likely consumed the token budget — raise --max-tokens / --plan-max-tokens.`
    )
  }
  if (res.choices?.[0]?.finish_reason === 'length') {
    console.error('  WARNING: finish_reason=length — output was truncated; consider a higher --max-tokens')
  }
  return { text: content, usage: res.usage }
}

// ---------------------------------------------------------------------------
// Planning
// ---------------------------------------------------------------------------

const PLAN_INSTRUCTION = `Before writing, plan the report. Decide the through-line (your thesis) and the exact sections you will write, in reading order.

Output ONLY a JSON object, no prose before or after, in this shape:
{"thesis": "<one or two sentences: the single argument this whole report makes>",
 "sections": [{"id": "<lowercase-kebab-id>", "intent": "<one line: what this section does>"}]}

Rules for the section list:
- Include at least: why-it-matters, economics, issues, verdict.
- verdict is ALWAYS last.
- Invent additional sections this model genuinely deserves (kebab-case ids). Do not pad with sections you have no material for.`

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const raw = fenced ? fenced[1] : text
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start === -1 || end === -1 || end < start) throw new Error('no JSON object found in plan output')
  return JSON.parse(raw.slice(start, end + 1))
}

function normalizePlan(parsed) {
  if (!parsed || typeof parsed.thesis !== 'string' || !Array.isArray(parsed.sections)) {
    throw new Error('plan JSON missing thesis or sections')
  }
  const seen = new Set()
  const sections = []
  for (const s of parsed.sections) {
    const id = String(s?.id ?? '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    if (!id || seen.has(id)) continue
    seen.add(id)
    sections.push({ id, intent: String(s?.intent ?? '').trim() })
  }
  // Guarantee the required set, then force verdict last.
  for (const id of REQUIRED_SECTIONS) {
    if (!seen.has(id)) { seen.add(id); sections.push({ id, intent: '' }) }
  }
  const verdict = sections.find((s) => s.id === 'verdict')
  const ordered = sections.filter((s) => s.id !== 'verdict')
  ordered.push(verdict)
  return { thesis: parsed.thesis.trim(), sections: ordered }
}

function sectionInstruction(section, plan) {
  const outline = plan.sections.map((s) => `- ${s.id}${s.intent ? `: ${s.intent}` : ''}`).join('\n')
  return `Write the \`${section.id}\` section now${section.intent ? ` — ${section.intent}` : ''}.

Output ONLY this one section: a single \`## ${section.id}\` heading followed by its MDX prose. Do not write any other section, and do not repeat what earlier sections already covered — build on them. Keep to the report's thesis: ${plan.thesis}

For reference, the full section order is:
${outline}`
}

/** Ensure the section body opens with its exact heading; strip stray fences. */
function normalizeSection(id, text) {
  let body = text.trim()
  const fence = body.match(/^```(?:mdx|markdown)?\s*([\s\S]*?)```$/)
  if (fence) body = fence[1].trim()
  const headingRe = new RegExp(`^##\\s+${id}\\b`, 'i')
  if (!headingRe.test(body)) body = `## ${id}\n\n${body}`
  return body
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const backend = resolveBackend(args.route)

  if (backend !== 'openrouter') {
    fail(
      `backend "${backend}" (route ${args.route}) is not yet automated here — this adapter currently drives OpenRouter subjects.\n` +
        `  Claude subjects: author in-session, or headless via\n` +
        `    claude --bare -p --system-prompt (Get-Content ${DEFAULT_SYSPROMPT} -Raw) --resume <session> ...\n` +
        `  GPT subjects: codex exec -c experimental_instructions_file="${DEFAULT_SYSPROMPT}" ...\n` +
        `  (Both slot behind this same plan→section→assemble flow when wired.)`
    )
  }

  const outPath = resolve(args.out ?? join(WEB_ROOT, 'research-reports', args.slug, 'draft.mdx'))
  if (!args.dryRun && existsSync(outPath) && !args.force) {
    fail(`refusing to overwrite existing draft ${outPath} (pass --force to replace it)`)
  }

  const sysprompt = loadSysprompt(args.sysprompt)
  const dispatches = loadDispatches(args.slug)
  const systemText = `${sysprompt}\n\n# Research dispatches for ${args.name}\n\nThe following are the raw, cited research dispatches. Author the report from them; cite the primary sources they point to, never the dispatches themselves.\n\n${dispatches.text}`

  // The system message (constitution + dispatches) is the static, cacheable prefix.
  const conversation = [{ role: 'system', text: systemText }]

  if (args.dryRun) {
    console.log(`[dry-run] backend:      ${backend} (route ${args.route})`)
    console.log(`[dry-run] dispatches:   ${dispatches.files.length} file(s): ${dispatches.files.join(', ')}`)
    console.log(`[dry-run] system prefix: ${systemText.length} chars (cached once)`)
    console.log(`[dry-run] draft output:  ${outPath}`)
    if (args.sections) {
      console.log(`[dry-run] plan:         SKIPPED — authoring given sections: ${args.sections.join(', ')}`)
    } else {
      console.log(`[dry-run] plan:         1 plan turn → thesis + section list, then one turn per section`)
    }
    console.log(`[dry-run] request shape: POST ${PROVIDERS[args.provider ?? 'openrouter']?.url ?? PROVIDERS.openrouter.url}`)
    console.log(`[dry-run] headers:       ${JSON.stringify(redactedHeaders())}`)
    console.log(`[dry-run] first user turn:\n${(args.sections ? sectionInstruction({ id: args.sections[0], intent: '' }, { thesis: '<from plan>', sections: args.sections.map((id) => ({ id, intent: '' })) }) : PLAN_INSTRUCTION).slice(0, 800)}`)
    return
  }

  const provider = resolveProvider(args.provider)

  // 1) Plan (or take the section list from --sections, skipping the turn).
  let plan
  if (args.sections) {
    plan = normalizePlan({ thesis: '(author-supplied section list)', sections: args.sections.map((id) => ({ id, intent: '' })) })
    console.error(`Authoring ${args.name} via ${provider.label} (${args.route}) — ${plan.sections.length} given section(s), no plan turn`)
  } else {
    console.error(`Planning ${args.name} report via ${provider.label} (${args.route})...`)
    conversation.push({ role: 'user', text: PLAN_INSTRUCTION })
    const planned = await turn(provider, args.route, conversation, { temperature: args.temperature, maxTokens: args.planMaxTokens })
    conversation.push({ role: 'assistant', text: planned.text })
    try {
      plan = normalizePlan(extractJson(planned.text))
    } catch (err) {
      fail(`could not parse the plan turn: ${err.message}\n--- plan output ---\n${planned.text.slice(0, 800)}`)
    }
    console.error(`  thesis: ${plan.thesis}`)
    console.error(`  sections (${plan.sections.length}): ${plan.sections.map((s) => s.id).join(', ')}`)
  }

  // 2) One accreting turn per section; each sees the growing report.
  const written = []
  for (let i = 0; i < plan.sections.length; i++) {
    const section = plan.sections[i]
    console.error(`[section ${i + 1}/${plan.sections.length}] ${section.id}`)
    conversation.push({ role: 'user', text: sectionInstruction(section, plan) })
    const started = Date.now()
    const result = await turn(provider, args.route, conversation, { temperature: args.temperature, maxTokens: args.maxTokens })
    conversation.push({ role: 'assistant', text: result.text })
    const body = normalizeSection(section.id, result.text)
    written.push(body)
    console.error(`  wrote ${section.id} in ${((Date.now() - started) / 1000).toFixed(1)}s (${body.length} chars)`)
  }

  // 3) Assemble the draft.
  const now = new Date().toISOString()
  const header =
    `{/* DRAFT — authored by ${args.route} via ${provider.label} on ${now} from research-reports/${args.slug}/.\n` +
    `    Editor: verify every citation against its primary source, smooth transitions, then place into content/eval/models/${args.slug}.mdx. */}`
  const doc = `${header}\n\n${written.join('\n\n')}\n`

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, doc, 'utf8')
  console.error(`\nWrote draft to ${outPath} (${plan.sections.length} sections, ${doc.length} chars)`)
}

main().catch((err) => {
  console.error(`error: ${err.message}`)
  process.exit(1)
})
