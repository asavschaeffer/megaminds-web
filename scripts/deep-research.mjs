#!/usr/bin/env node
/**
 * Headless deep-research dispatch runner.
 *
 * Composes a research prompt from the site's brief generator, then drives a
 * hosted deep-research / web-grounded agent to produce a cited research
 * dispatch (the raw source material that later feeds a published Megaminds
 * model report). The report body is written to research-reports/<slug>/ with
 * provenance frontmatter.
 *
 * The prompt is NOT reimplemented here: it is produced by spawning
 * `scripts/generate-research-brief.ts` (via tsx) and capturing its stdout.
 *
 * Plain Node >= 18 (native fetch), no dependencies. Matches the conventions of
 * scripts/interview-model.mjs (arg parsing, retry/backoff, provenance
 * frontmatter, error style).
 *
 * Usage:
 *   node scripts/deep-research.mjs --slug <slug> --model "<Display Name>" --source google|x [options]
 *
 * Options:
 *   --slug <slug>            (required) Report slug; names the default output file
 *   --model "<Display Name>" (required) Model display name passed to the brief generator
 *   --source google|x        (required) Which researcher persona/brief to compose
 *   --provider <name>        gemini | xai | openrouter. Default by source:
 *                            google -> gemini, x -> xai. openrouter is a valid
 *                            fallback for either source.
 *   --tier fast|max          Gemini agent tier (default fast)
 *   --or-model <id>          OpenRouter model id (default google/gemini-3-flash-preview:online)
 *   --from-date <YYYY-MM-DD> xai X-search lower date bound (default: 90 days ago)
 *   --to-date <YYYY-MM-DD>   xai X-search upper date bound (default: none)
 *   --out <path>             Output path (default research-reports/<slug>/<source>.md)
 *   --force                  Overwrite an existing output file
 *   --poll-interval <sec>    Gemini poll interval (default 30)
 *   --timeout <min>          Gemini overall poll timeout (default 45)
 *   --dry-run                Compose prompt, print provider/endpoint/payload (key
 *                            redacted), write nothing, call nothing. Works with no keys.
 *   --prompt-override "<text>"  Test hook: skip the brief generator and use this
 *                            literal string as the research prompt.
 *   --max-tokens <n>         openrouter max_tokens cap (test hook; default none)
 *   --max-web-results <n>    openrouter web plugin max_results (default 5)
 *
 * Environment:
 *   GEMINI_API_KEY      Gemini Deep Research (x-goog-api-key header)
 *   XAI_API_KEY         xAI Grok / X Search (Authorization: Bearer)
 *   OPENROUTER_API_KEY  OpenRouter web-search fallback (Authorization: Bearer)
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, basename, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const SCRIPT_NAME = basename(fileURLToPath(import.meta.url))
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = resolve(SCRIPT_DIR, '..')
const REDACTED = '***REDACTED***'

const PROVIDERS = {
  gemini: { label: 'Gemini Deep Research', envVar: 'GEMINI_API_KEY' },
  xai: { label: 'xAI Grok (X Search)', envVar: 'XAI_API_KEY' },
  openrouter: { label: 'OpenRouter (web search)', envVar: 'OPENROUTER_API_KEY' },
}

const GEMINI_AGENTS = {
  fast: 'deep-research-preview-04-2026',
  max: 'deep-research-max-preview-04-2026',
}

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta/interactions'
const XAI_URL = 'https://api.x.ai/v1/responses'
const XAI_MODEL = 'grok-4.5'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_DEFAULT_MODEL = 'google/gemini-3-flash-preview:online'

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
    model: undefined,
    source: undefined,
    provider: undefined,
    tier: 'fast',
    orModel: OPENROUTER_DEFAULT_MODEL,
    fromDate: undefined,
    toDate: undefined,
    out: undefined,
    force: false,
    pollInterval: 30,
    timeout: 45,
    dryRun: false,
    promptOverride: undefined,
    maxTokens: undefined,
    maxWebResults: 5,
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
      case '--model': args.model = next(); break
      case '--source': args.source = next(); break
      case '--provider': args.provider = next(); break
      case '--tier': args.tier = next(); break
      case '--or-model': args.orModel = next(); break
      case '--from-date': args.fromDate = next(); break
      case '--to-date': args.toDate = next(); break
      case '--out': args.out = next(); break
      case '--force': args.force = true; break
      case '--poll-interval':
        args.pollInterval = Number.parseInt(next(), 10)
        if (!Number.isInteger(args.pollInterval) || args.pollInterval < 1) fail('--poll-interval must be a positive integer (seconds)')
        break
      case '--timeout':
        args.timeout = Number.parseFloat(next())
        if (!Number.isFinite(args.timeout) || args.timeout <= 0) fail('--timeout must be a positive number (minutes)')
        break
      case '--dry-run': args.dryRun = true; break
      case '--prompt-override': args.promptOverride = next(); break
      case '--max-tokens':
        args.maxTokens = Number.parseInt(next(), 10)
        if (!Number.isInteger(args.maxTokens) || args.maxTokens < 1) fail('--max-tokens must be a positive integer')
        break
      case '--max-web-results':
        args.maxWebResults = Number.parseInt(next(), 10)
        if (!Number.isInteger(args.maxWebResults) || args.maxWebResults < 1) fail('--max-web-results must be a positive integer')
        break
      default:
        fail(`unknown flag: ${flag}`)
    }
  }

  if (!args.slug) fail('--slug is required (report slug for the output filename)')
  if (!args.model) fail('--model is required (display name passed to the brief generator)')
  if (!args.source) fail('--source is required (google | x)')
  if (!['google', 'x'].includes(args.source)) fail(`--source must be one of: google | x (got: ${args.source})`)
  if (!['fast', 'max'].includes(args.tier)) fail(`--tier must be one of: fast | max (got: ${args.tier})`)

  return args
}

function resolveProviderId(args) {
  if (args.provider) {
    if (!PROVIDERS[args.provider]) fail(`unknown provider "${args.provider}" (expected: ${Object.keys(PROVIDERS).join(' | ')})`)
    return args.provider
  }
  return args.source === 'x' ? 'xai' : 'gemini'
}

/**
 * Compose the research prompt by spawning the brief generator and capturing
 * stdout. stderr is captured separately (the generator prints "Wrote brief..."
 * only with --out, which we do not pass). We do NOT reimplement the brief.
 */
function composePrompt(args) {
  if (args.promptOverride !== undefined) return args.promptOverride

  const quote = (s) => (/[\s"]/.test(s) ? `"${String(s).replace(/"/g, '\\"')}"` : String(s))
  const cmd = [
    'npx tsx',
    '--tsconfig', quote(join('scripts', 'tsconfig.json')),
    quote(join('scripts', 'generate-research-brief.ts')),
    '--model', quote(args.model),
    '--slug', quote(args.slug),
    '--source', args.source,
  ].join(' ')

  const res = spawnSync(cmd, {
    shell: true,
    cwd: WEB_ROOT,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  })

  if (res.error) fail(`failed to spawn brief generator: ${res.error.message}`)
  if (res.status !== 0) {
    fail(`brief generator exited ${res.status}\n${(res.stderr || '').trim() || '(no stderr)'}`)
  }
  const prompt = (res.stdout || '').trim()
  if (!prompt) fail(`brief generator produced no output\n${(res.stderr || '').trim()}`)
  return prompt
}

function requireKey(providerId) {
  const { envVar, label } = PROVIDERS[providerId]
  const key = process.env[envVar]
  if (!key) fail(`provider "${providerId}" (${label}) selected but ${envVar} is not set`)
  return key
}

function isoDaysAgo(days) {
  const d = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
  return d.toISOString().slice(0, 10)
}

// ---------------------------------------------------------------------------
// Request builders (shared by --dry-run printing and the live path).
// Each returns { endpoint, method, headers, body } where headers may contain
// the real key; a redacted copy is produced separately for printing.
// ---------------------------------------------------------------------------

function buildGeminiCreate(args, prompt, key) {
  return {
    endpoint: GEMINI_BASE,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': key ?? `<${PROVIDERS.gemini.envVar} not set>`,
    },
    body: {
      input: prompt,
      agent: GEMINI_AGENTS[args.tier],
      background: true,
    },
  }
}

function buildXai(args, prompt, key) {
  const xSearch = { type: 'x_search', from_date: args.fromDate ?? isoDaysAgo(90) }
  if (args.toDate) xSearch.to_date = args.toDate
  return {
    endpoint: XAI_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key ?? `<${PROVIDERS.xai.envVar} not set>`}`,
    },
    body: {
      model: XAI_MODEL,
      input: [{ role: 'user', content: prompt }],
      tools: [xSearch],
    },
  }
}

function buildOpenRouter(args, prompt, key) {
  const body = {
    model: args.orModel,
    messages: [{ role: 'user', content: prompt }],
    plugins: [{ id: 'web', max_results: args.maxWebResults }],
    usage: { include: true },
  }
  if (args.maxTokens) body.max_tokens = args.maxTokens
  return {
    endpoint: OPENROUTER_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key ?? `<${PROVIDERS.openrouter.envVar} not set>`}`,
    },
    body,
  }
}

function redactHeaders(headers) {
  const copy = { ...headers }
  if (copy['x-goog-api-key'] && !copy['x-goog-api-key'].startsWith('<')) copy['x-goog-api-key'] = REDACTED
  if (copy.Authorization && !copy.Authorization.includes(' <')) copy.Authorization = `Bearer ${REDACTED}`
  return copy
}

function printDryRun(providerId, req, extraNote) {
  console.log(`provider:  ${providerId} (${PROVIDERS[providerId].label})`)
  console.log(`endpoint:  ${req.method} ${req.endpoint}`)
  console.log(`headers:   ${JSON.stringify(redactHeaders(req.headers), null, 2)}`)
  console.log(`payload:   ${JSON.stringify(req.body, null, 2)}`)
  if (extraNote) console.log(extraNote)
}

// ---------------------------------------------------------------------------
// HTTP with retry/backoff (mirrors interview-model.mjs).
// ---------------------------------------------------------------------------

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
    if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}: ${text.slice(0, 600)}`)

    try {
      return JSON.parse(text)
    } catch {
      throw new Error(`${label} returned non-JSON body: ${text.slice(0, 300)}`)
    }
  }
  throw new Error('unreachable')
}

// ---------------------------------------------------------------------------
// Provider runners. Each returns { body, sources, meta }.
// ---------------------------------------------------------------------------

async function runGemini(args, prompt, key, startedAt) {
  const req = buildGeminiCreate(args, prompt, key)
  console.error(`Creating Gemini Deep Research interaction (agent ${req.body.agent})...`)
  const created = await httpJson(PROVIDERS.gemini.label, req.endpoint, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(req.body),
  })

  const id = created.id ?? created.name
  if (!id) throw new Error(`Gemini did not return an interaction id: ${JSON.stringify(created).slice(0, 300)}`)
  console.error(`Interaction id: ${id}`)

  const intervalMs = args.pollInterval * 1000
  const deadline = Date.now() + args.timeout * 60 * 1000
  let interaction = created

  while (true) {
    const status = interaction.status ?? interaction.state ?? 'unknown'
    const elapsed = ((Date.now() - startedAt) / 1000).toFixed(0)
    console.error(`  [${elapsed}s] status: ${status}`)

    if (status === 'completed') break
    if (status === 'failed' || status === 'cancelled' || status === 'error') {
      throw new Error(`Gemini interaction ${id} terminated with status "${status}": ${JSON.stringify(interaction.error ?? interaction).slice(0, 400)}`)
    }
    if (Date.now() > deadline) {
      throw new Error(`Gemini interaction ${id} did not complete within ${args.timeout} min (last status: ${status})`)
    }

    await sleep(intervalMs)
    interaction = await httpJson(PROVIDERS.gemini.label, `${GEMINI_BASE}/${encodeURIComponent(id)}`, {
      method: 'GET',
      headers: { 'x-goog-api-key': key },
    })
  }

  const body = extractGeminiText(interaction)
  if (!body) throw new Error(`Gemini interaction completed but no report text was found: ${JSON.stringify(interaction).slice(0, 400)}`)
  const sources = extractGeminiSources(interaction)

  return { body, sources, meta: { interactionId: id, agent: req.body.agent } }
}

function extractGeminiText(interaction) {
  const steps = interaction.steps
  if (Array.isArray(steps) && steps.length) {
    const last = steps[steps.length - 1]
    const parts = last?.content
    if (Array.isArray(parts)) {
      const text = parts.map((p) => p?.text).filter((t) => typeof t === 'string' && t.trim()).join('\n\n')
      if (text.trim()) return text.trim()
    }
  }
  // Defensive fallbacks for shape drift.
  if (typeof interaction.model_output === 'string') return interaction.model_output.trim()
  const out = interaction.output
  if (Array.isArray(out)) {
    const text = out.flatMap((m) => (Array.isArray(m?.content) ? m.content : [])).map((p) => p?.text).filter(Boolean).join('\n\n')
    if (text.trim()) return text.trim()
  }
  return ''
}

function extractGeminiSources(interaction) {
  const seen = new Map()
  const add = (url, title) => {
    if (typeof url === 'string' && url.startsWith('http') && !seen.has(url)) seen.set(url, title || url)
  }
  // Walk the object defensively for anything citation-shaped (grounding
  // metadata / citations are documented to exist but the exact path is not
  // pinned down in the public docs).
  const visit = (node) => {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) { node.forEach(visit); return }
    if (typeof node.uri === 'string') add(node.uri, node.title)
    if (typeof node.url === 'string') add(node.url, node.title)
    for (const v of Object.values(node)) if (v && typeof v === 'object') visit(v)
  }
  visit(interaction.citations)
  visit(interaction.steps)
  visit(interaction.grounding_metadata)
  return [...seen.entries()].map(([url, title]) => ({ url, title }))
}

async function runXai(args, prompt, key) {
  const req = buildXai(args, prompt, key)
  console.error(`Querying Grok (${XAI_MODEL}) with X Search (from_date ${req.body.tools[0].from_date}${req.body.tools[0].to_date ? `, to_date ${req.body.tools[0].to_date}` : ''})...`)
  const res = await httpJson(PROVIDERS.xai.label, req.endpoint, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(req.body),
  })

  const body = extractXaiText(res)
  if (!body) throw new Error(`xAI returned no output text: ${JSON.stringify(res).slice(0, 400)}`)
  const sources = extractXaiSources(res)
  return { body, sources, meta: { model: XAI_MODEL, responseId: res.id } }
}

function extractXaiText(res) {
  if (typeof res.output_text === 'string' && res.output_text.trim()) return res.output_text.trim()
  const out = res.output
  if (Array.isArray(out)) {
    const text = out
      .filter((m) => m?.type === 'message')
      .flatMap((m) => (Array.isArray(m.content) ? m.content : []))
      .filter((p) => p?.type === 'output_text' && typeof p.text === 'string')
      .map((p) => p.text)
      .join('\n\n')
    if (text.trim()) return text.trim()
  }
  return ''
}

function extractXaiSources(res) {
  const cites = res.citations
  if (!Array.isArray(cites)) return []
  return cites
    .map((c) => (typeof c === 'string' ? { url: c, title: c } : { url: c?.url ?? c?.uri, title: c?.title }))
    .filter((c) => typeof c.url === 'string')
}

async function runOpenRouter(args, prompt, key) {
  const req = buildOpenRouter(args, prompt, key)
  console.error('WARNING: OpenRouter web search is billed even on :free models')
  console.error(`  engine default (exa/parallel): ~$0.005/request incl. up to 10 results, +$0.001/result beyond; max_results=${args.maxWebResults}`)
  console.error(`Querying OpenRouter (${args.orModel}) with the web plugin...`)
  const res = await httpJson(PROVIDERS.openrouter.label, req.endpoint, {
    method: 'POST',
    headers: req.headers,
    body: JSON.stringify(req.body),
  })

  const message = res.choices?.[0]?.message
  const body = (message?.content ?? '').trim()
  if (!body) throw new Error(`OpenRouter returned empty content (finish_reason: ${res.choices?.[0]?.finish_reason ?? 'unknown'})`)

  const sources = extractOpenRouterSources(message)
  const usage = res.usage ?? {}
  return {
    body,
    sources,
    meta: { model: res.model ?? args.orModel, usage, generationId: res.id },
  }
}

function extractOpenRouterSources(message) {
  const anns = message?.annotations
  if (!Array.isArray(anns)) return []
  return anns
    .filter((a) => a?.type === 'url_citation' && a.url_citation?.url)
    .map((a) => ({ url: a.url_citation.url, title: a.url_citation.title ?? a.url_citation.url }))
}

// ---------------------------------------------------------------------------
// Output rendering
// ---------------------------------------------------------------------------

function renderDocument({ providerId, args, result, elapsedSec }) {
  const now = new Date().toISOString()
  const m = result.meta ?? {}
  const fm = [
    '---',
    `date: ${now}`,
    `provider: ${providerId}`,
    `provider_label: ${PROVIDERS[providerId].label}`,
    `agent_or_model: ${m.agent ?? m.model ?? args.orModel}`,
    `tier: ${providerId === 'gemini' ? args.tier : 'n/a'}`,
    `source: ${args.source}`,
    `slug: ${args.slug}`,
    `task_id: ${m.interactionId ?? m.responseId ?? m.generationId ?? 'n/a'}`,
    `elapsed_seconds: ${elapsedSec}`,
    `generated_by: scripts/${SCRIPT_NAME}`,
    '---',
    '',
    `> **Machine-generated research dispatch.** This document was produced automatically by a hosted deep-research / web-grounded agent (${PROVIDERS[providerId].label}) on ${now} for the \`${args.slug}\` report. It is raw, unvetted source material, not a published report. Every factual claim carries its own citation — vet each one against primary sources before publishing. Treat unsourced or "unverified" claims as leads to check, not facts.`,
    '',
    result.body,
    '',
  ]

  if (result.sources && result.sources.length) {
    fm.push('---', '', '## Sources (extracted from the API response)', '')
    result.sources.forEach((s, i) => {
      fm.push(`${i + 1}. [${s.title || s.url}](${s.url})`)
    })
    fm.push('')
  }

  return fm.join('\n')
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const providerId = resolveProviderId(args)

  const outPath = resolve(args.out ?? join(WEB_ROOT, 'research-reports', args.slug, `${args.source}.md`))
  if (!args.dryRun && existsSync(outPath) && !args.force) {
    fail(`refusing to overwrite existing file ${outPath} (pass --force to replace it)`)
  }

  const prompt = composePrompt(args)

  if (args.dryRun) {
    const key = process.env[PROVIDERS[providerId].envVar] // may be undefined; fine for dry-run
    let req
    if (providerId === 'gemini') req = buildGeminiCreate(args, prompt, key)
    else if (providerId === 'xai') req = buildXai(args, prompt, key)
    else req = buildOpenRouter(args, prompt, key)

    console.log(`[dry-run] composed prompt: ${prompt.length} chars`)
    console.log(`[dry-run] output would be written to: ${outPath}`)
    const note = providerId === 'openrouter'
      ? '[dry-run] note: web search is billed even on :free models'
      : providerId === 'gemini'
        ? `[dry-run] then polls GET ${GEMINI_BASE}/{id} every ${args.pollInterval}s (timeout ${args.timeout}min) until status "completed"`
        : null
    printDryRun(providerId, req, note)
    return
  }

  const key = requireKey(providerId)
  const startedAt = Date.now()

  let result
  if (providerId === 'gemini') result = await runGemini(args, prompt, key, startedAt)
  else if (providerId === 'xai') result = await runXai(args, prompt, key)
  else result = await runOpenRouter(args, prompt, key)

  const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1)
  const doc = renderDocument({ providerId, args, result, elapsedSec })

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, doc, 'utf8')

  console.error(`\nWrote research dispatch to ${outPath} (${elapsedSec}s, ${result.body.length} chars, ${result.sources.length} source(s))`)
  if (providerId === 'openrouter' && result.meta.usage) {
    const u = result.meta.usage
    console.error(`OpenRouter usage: prompt=${u.prompt_tokens ?? '?'} completion=${u.completion_tokens ?? '?'} total=${u.total_tokens ?? '?'}${u.cost != null ? ` cost=$${u.cost}` : ''}`)
  }
}

main().catch((err) => {
  console.error(`error: ${err.message}`)
  process.exit(1)
})
