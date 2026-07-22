#!/usr/bin/env node
/**
 * Browser-driven deep-research dispatch runner.
 *
 * Drives the *consumer web UIs* of Gemini Deep Research and Grok DeepSearch to
 * produce the same cited research dispatch (research-reports/<slug>/<source>.md)
 * that scripts/deep-research.mjs produces via the paid APIs — but for free,
 * using a logged-in browser session. The paid-API path is the fallback; this is
 * the default in the pipeline.
 *
 * The prompt is NOT reimplemented here: it is composed by spawning
 * scripts/generate-research-brief.ts (via tsx) exactly as deep-research.mjs
 * does, so the persona + brief + picker signals stay single-sourced.
 *
 * Auth model: a dedicated, persistent Chrome profile (default
 * ~/.research-browser/chrome-profile) logged in ONCE via `--login`, then reused
 * headless forever. Alternatively attach to an already-running Chrome over CDP
 * with --cdp http://localhost:9222 (the spike's path; no dedicated profile).
 *
 * Uses the system Google Chrome (channel: 'chrome') — no bundled-browser
 * download. Requires playwright-core + turndown (this folder's package.json).
 *
 * Usage:
 *   node scripts/research-browser/index.mjs --login [--profile <dir>]
 *   node scripts/research-browser/index.mjs --slug <slug> --model "<Name>" --source google|x [options]
 *
 * Options:
 *   --slug <slug>            (required unless --login) report slug; names the output file
 *   --model "<Name>"         (required unless --login) display name for the brief generator
 *   --source google|x        (required unless --login) which engine/persona to run
 *   --profile <dir>          persistent Chrome user-data-dir (default ~/.research-browser/chrome-profile)
 *   --cdp <url>              attach to a running Chrome over CDP instead of launching a profile
 *   --headful                show the browser window (default headless)
 *   --keep-open              do not close the context on exit (leave the tab for inspection)
 *   --no-prepare             skip engine tier-setting (Deep Research / Expert); rely on profile defaults
 *   --out <path>             output path (default research-reports/<slug>/<source>.md)
 *   --force                  overwrite an existing output file
 *   --timeout <min>          overall wait-for-completion timeout (default 25)
 *   --poll-interval <sec>    completion poll interval (default 15)
 *   --release-url <url>      (repeatable) primary release URL(s) passed to the brief generator
 *   --org <name>             org, passed to the brief generator
 *   --released <when>        release date/period, passed to the brief generator
 *   --dry-run                compose the prompt and print the plan; launch nothing
 *   --prompt-override "<t>"  test hook: use this literal string instead of the brief generator
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { homedir, tmpdir } from 'node:os'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = resolve(SCRIPT_DIR, '..', '..')
const GENERATED_BY = 'scripts/research-browser/index.mjs'
const DEFAULT_PROFILE = join(homedir(), '.research-browser', 'chrome-profile')

function fail(message) {
  console.error(`error: ${message}`)
  process.exit(1)
}
const log = (m) => console.error(`  ${m}`)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// ---------------------------------------------------------------------------
// Args
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = {
    login: false,
    slug: undefined,
    model: undefined,
    source: undefined,
    profile: DEFAULT_PROFILE,
    cdp: undefined,
    headful: false,
    keepOpen: false,
    prepare: true,
    out: undefined,
    force: false,
    timeout: 25,
    pollInterval: 15,
    releaseUrls: [],
    org: undefined,
    released: undefined,
    dryRun: false,
    promptOverride: undefined,
  }
  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i]
    const next = () => {
      const v = argv[i + 1]
      if (v === undefined) fail(`missing value for ${flag}`)
      i++
      return v
    }
    switch (flag) {
      case '--login': args.login = true; break
      case '--slug': args.slug = next(); break
      case '--model': args.model = next(); break
      case '--source': args.source = next(); break
      case '--profile': args.profile = next(); break
      case '--cdp': args.cdp = next(); break
      case '--headful': args.headful = true; break
      case '--keep-open': args.keepOpen = true; break
      case '--no-prepare': args.prepare = false; break
      case '--out': args.out = next(); break
      case '--force': args.force = true; break
      case '--timeout':
        args.timeout = Number.parseFloat(next())
        if (!Number.isFinite(args.timeout) || args.timeout <= 0) fail('--timeout must be a positive number (minutes)')
        break
      case '--poll-interval':
        args.pollInterval = Number.parseInt(next(), 10)
        if (!Number.isInteger(args.pollInterval) || args.pollInterval < 1) fail('--poll-interval must be a positive integer (seconds)')
        break
      case '--release-url': args.releaseUrls.push(next()); break
      case '--org': args.org = next(); break
      case '--released': args.released = next(); break
      case '--dry-run': args.dryRun = true; break
      case '--prompt-override': args.promptOverride = next(); break
      default: fail(`unknown flag: ${flag}`)
    }
  }
  if (args.login) return args
  if (!args.slug) fail('--slug is required (or pass --login)')
  if (!args.model) fail('--model is required (display name for the brief generator)')
  if (!args.source) fail('--source is required (google | x)')
  if (!ENGINES[args.source]) fail(`--source must be one of: ${Object.keys(ENGINES).join(' | ')} (got: ${args.source})`)
  return args
}

// ---------------------------------------------------------------------------
// Prompt composition (spawns the brief generator; never reimplemented here).
// Mirrors scripts/deep-research.mjs composePrompt.
// ---------------------------------------------------------------------------

function composePrompt(args) {
  if (args.promptOverride !== undefined) return args.promptOverride
  const quote = (s) => (/[\s"]/.test(s) ? `"${String(s).replace(/"/g, '\\"')}"` : String(s))
  const parts = [
    'npx tsx',
    '--tsconfig', quote(join('scripts', 'tsconfig.json')),
    quote(join('scripts', 'generate-research-brief.ts')),
    '--model', quote(args.model),
    '--slug', quote(args.slug),
    '--source', args.source,
  ]
  if (args.org) parts.push('--org', quote(args.org))
  if (args.released) parts.push('--released', quote(args.released))
  for (const u of args.releaseUrls) parts.push('--release-url', quote(u))

  const res = spawnSync(parts.join(' '), { shell: true, cwd: WEB_ROOT, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 })
  if (res.error) fail(`failed to spawn brief generator: ${res.error.message}`)
  if (res.status !== 0) fail(`brief generator exited ${res.status}\n${(res.stderr || '').trim() || '(no stderr)'}`)
  const prompt = (res.stdout || '').trim()
  if (!prompt) fail(`brief generator produced no output\n${(res.stderr || '').trim()}`)
  return prompt
}

// ---------------------------------------------------------------------------
// Shared driver helpers
// ---------------------------------------------------------------------------

async function clickIfPresent(page, selector, label) {
  try {
    const loc = page.locator(selector).first()
    if (await loc.count()) {
      await loc.click({ timeout: 8000 })
      log(`clicked ${label} (${selector})`)
      return true
    }
  } catch (e) {
    log(`could not click ${label} (${selector}): ${e.message.split('\n')[0]}`)
  }
  return false
}

/**
 * Wait for a "still generating" control to first appear (best-effort, short),
 * then disappear and stay gone for `stableChecks` consecutive polls. This is
 * the completion signal for both engines (Gemini's "Stop response", Grok's
 * stop button). If it never appears, we assume the run finished fast / did not
 * stream and return.
 */
async function waitForCompletion(page, selectors, { timeoutMin, intervalSec, shotPath }) {
  const sel = selectors.join(', ')
  const intervalMs = intervalSec * 1000
  const deadline = Date.now() + timeoutMin * 60 * 1000
  const count = async () => {
    try { return await page.locator(sel).count() } catch { return 0 }
  }

  // Phase 1: wait up to ~45s for the generating control to appear.
  let appeared = false
  for (let i = 0; i < Math.max(3, Math.ceil(45 / intervalSec)); i++) {
    if (await count()) { appeared = true; break }
    await sleep(intervalMs)
  }
  if (!appeared) {
    log('generating indicator never appeared — assuming already complete / non-streaming')
    return
  }
  log('generating… (indicator present)')

  // Phase 2: wait for it to be gone for 2 consecutive polls.
  let absent = 0
  let n = 0
  while (Date.now() < deadline) {
    await sleep(intervalMs)
    n++
    const c = await count()
    if (shotPath) await page.screenshot({ path: shotPath }).catch(() => {})
    const elapsed = ((Date.now() - (deadline - timeoutMin * 60 * 1000)) / 1000).toFixed(0)
    log(`[${elapsed}s] generating=${c ? 'yes' : 'no'}`)
    if (!c) absent++
    else absent = 0
    if (absent >= 2) { log('complete (indicator gone)'); return }
  }
  throw new Error(`research did not complete within ${timeoutMin} min`)
}

function turndownBody(html) {
  // Lazy import so --dry-run works without deps installed.
  return import('turndown').then(async ({ default: TurndownService }) => {
    const { gfm } = await import('turndown-plugin-gfm')
    const td = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' })
    td.use(gfm)
    // Strip zero-width / word-joiner chars some UIs inject into citation
    // markers (e.g. a word-joiner before Grok citation labels) so links read cleanly.
    const ZERO_WIDTH = new RegExp('[' + [0x200B, 0x200C, 0x200D, 0x2060, 0xFEFF].map((c) => String.fromCharCode(c)).join('') + ']', 'g')
    return td.turndown(html).replace(ZERO_WIDTH, '')
  })
}

// ---------------------------------------------------------------------------
// Engine definitions — the per-engine recipe. Selectors validated against the
// glm-5-2 spike run (2026-07-21). Tier-setting (prepare) is best-effort.
// ---------------------------------------------------------------------------

const ENGINES = {
  google: {
    source: 'google',
    host: 'gemini.google.com',
    url: 'https://gemini.google.com/app',
    provider: 'gemini-deep-research-browser',
    providerLabel: 'Gemini Deep Research (browser, Pro)',
    input: '[aria-label="Enter a prompt for Gemini"]',

    async prepare(page) {
      // The Pro tier is remembered by the profile ("mode picker, currently
      // Pro"), so only the Deep Research tool needs enabling. It's a toggle
      // inside the "Upload & tools" menu, labelled "Deep research" (lowercase
      // r), carrying aria-pressed true/false.
      if (!(await clickIfPresent(page, '[aria-label="Upload & tools"]', '"Upload & tools" menu'))) {
        log('WARNING: could not open tools menu — Deep Research may be off')
        return
      }
      await sleep(1000)
      const item = page.locator('button:has-text("Deep research")').first()
      if (await item.count()) {
        const pressed = await item.getAttribute('aria-pressed').catch(() => null)
        if (pressed === 'true') {
          log('Deep research already enabled')
          await page.keyboard.press('Escape').catch(() => {})
        } else {
          await item.click({ timeout: 8000 })
          log('enabled Deep research tool')
        }
      } else {
        log('WARNING: "Deep research" item not found in tools menu (UI may have drifted)')
        await page.keyboard.press('Escape').catch(() => {})
      }
      await sleep(1200)
    },

    async submit(page) {
      await page.click('[aria-label="Send message"]', { timeout: 15000 })
      log('submitted; waiting for the research plan…')
      // Deep Research generates a plan, then gates the actual (multi-minute)
      // run behind a "Start research" button. Plan-gen time scales with prompt
      // size and can exceed a minute for a full brief, so poll generously — the
      // gate sits there until clicked.
      const startBtn = page.locator('[aria-label="Start research"]')
      const deadline = Date.now() + 4 * 60 * 1000
      while (Date.now() < deadline) {
        if (await startBtn.count().catch(() => 0)) {
          await startBtn.first().click({ timeout: 8000 })
          log('clicked "Start research" — deep research now running')
          return
        }
        await sleep(3000)
      }
      log('WARNING: "Start research" never appeared within 4 min — proceeding to wait anyway')
    },

    doneSelectors: ['[aria-label="Stop response"]'],

    async openReport(page) {
      await clickIfPresent(page, 'button:has-text("Open")', 'Open report')
      await sleep(2500)
    },

    async extract(page) {
      return page.evaluate(() => {
        const panel = document.querySelector('immersive-panel')
        const root = panel?.querySelector('.markdown-main-panel') || panel?.querySelector('message-content') || panel
        if (!root) return null
        const links = [...new Set(Array.from((panel || root).querySelectorAll('a[href^="http"]')).map((a) => a.href))].filter(
          (u) => !/^https:\/\/(www\.google\.com|accounts\.google\.com|support\.google\.com|policies\.google\.com|gemini\.google\.com)/.test(u)
        )
        return { html: root.innerHTML, links }
      })
    },
  },

  x: {
    source: 'x',
    host: 'grok.com',
    url: 'https://grok.com',
    provider: 'grok-deepsearch-browser',
    providerLabel: 'Grok DeepSearch (browser, Expert)',
    input: '[aria-label="Ask Grok anything"]',

    async prepare(page) {
      // Set the Expert model tier. DeepSearch itself is triggered by the
      // "Use DeepSearch:" prefix carried in the x-researcher persona prompt.
      if (await clickIfPresent(page, '[aria-label="Model select"]', 'Model select')) {
        await sleep(600)
        const picked =
          (await clickIfPresent(page, '[role="menuitem"]:has-text("Expert")', 'Expert option')) ||
          (await clickIfPresent(page, 'text=/^\\s*Expert\\s*$/', 'Expert option (text)'))
        if (!picked) {
          await page.keyboard.press('Escape').catch(() => {})
          log('Expert option not found — using current tier')
        }
      }
      await sleep(600)
    },

    async submit(page) {
      await page.click('[aria-label="Submit"]', { timeout: 15000 })
      log('submitted')
    },

    doneSelectors: ['[aria-label="Stop model response"]', '[aria-label="Stop"]', 'button[aria-label*="Stop"]'],

    async openReport() {
      /* Grok renders inline; nothing to open. */
    },

    async extract(page) {
      return page.evaluate(() => {
        // The assistant response is the .response-content-markdown that has
        // headings (the echoed prompt has none). Take the largest such.
        const panels = Array.from(document.querySelectorAll('.response-content-markdown'))
        const resp =
          panels
            .map((e) => ({ e, h: e.querySelectorAll('h1,h2,h3').length, len: (e.innerText || '').length }))
            .filter((x) => x.h > 0)
            .sort((a, b) => b.len - a.len)[0]?.e || panels[panels.length - 1]
        if (!resp) return null
        const links = [...new Set(Array.from(resp.querySelectorAll('a[href^="http"]')).map((a) => a.href))].filter(
          (u) => !/^https:\/\/(grok\.com|x\.ai|accounts\.google\.com)/.test(u)
        )
        return { html: resp.innerHTML, links }
      })
    },
  },
}

// ---------------------------------------------------------------------------
// Browser context acquisition
// ---------------------------------------------------------------------------

async function getContext(args) {
  const { chromium } = await import('playwright-core')
  if (args.cdp) {
    const browser = await chromium.connectOverCDP(args.cdp)
    const ctx = browser.contexts()[0]
    if (!ctx) throw new Error(`no browser context at CDP endpoint ${args.cdp}`)
    return { ctx, close: () => browser.close(), mode: `cdp ${args.cdp}` }
  }
  const ctx = await chromium.launchPersistentContext(args.profile, {
    headless: !args.headful,
    channel: 'chrome',
    viewport: args.headful ? null : { width: 1440, height: 1024 },
    // De-automate: strip the flags Google/X use to block "insecure browser"
    // logins and set navigator.webdriver=false, so a persistent profile can be
    // signed in once and reused headless.
    ignoreDefaultArgs: ['--enable-automation'],
    args: [
      ...(args.headful ? ['--start-maximized'] : []),
      '--disable-blink-features=AutomationControlled',
    ],
  })
  return { ctx, close: () => ctx.close(), mode: `persistent ${args.headful ? 'headful' : 'headless'} @ ${args.profile}` }
}

async function findEnginePage(ctx, engine) {
  const pages = ctx.pages()
  let page = pages.find((p) => p.url().includes(engine.host))
  if (!page) {
    page = pages.find((p) => p.url() === 'about:blank') || (await ctx.newPage())
    await page.goto(engine.url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(3500)
  }
  return page
}

async function assertLoggedIn(page, engine) {
  const signedOut = await page.evaluate(() => /(\bsign in\b|\bsign up\b|continue with google)/i.test(document.body.innerText.slice(0, 1200)))
  const hasInput = await page.locator(engine.input).count().catch(() => 0)
  if (signedOut && !hasInput) {
    throw new Error(
      `${engine.host} appears signed out (no "${engine.input}" composer). ` +
        `Run:  node ${GENERATED_BY} --login   then sign in, and retry.`
    )
  }
}

// ---------------------------------------------------------------------------
// Output rendering (parallels deep-research.mjs renderDocument)
// ---------------------------------------------------------------------------

function renderDocument({ engine, args, body, links, elapsedSec }) {
  const now = new Date().toISOString()
  const out = [
    '---',
    `date: ${now}`,
    `provider: ${engine.provider}`,
    `provider_label: ${engine.providerLabel}`,
    `source: ${engine.source}`,
    `slug: ${args.slug}`,
    `elapsed_seconds: ${elapsedSec}`,
    `generated_by: ${GENERATED_BY}`,
    '---',
    '',
    `> **Machine-generated research dispatch.** Produced by ${engine.providerLabel} via the browser on ${now} for the \`${args.slug}\` report. Raw, unvetted source material — verify every claim against its primary source before publishing. Treat unsourced or "unverified" claims as leads, not facts.`,
    '',
    body.trim(),
    '',
  ]
  if (links.length) {
    out.push('---', '', '## Sources (inline citations extracted from the report)', '')
    links.forEach((u, i) => out.push(`${i + 1}. ${u}`))
    out.push('')
  }
  return out.join('\n')
}

// ---------------------------------------------------------------------------
// Modes
// ---------------------------------------------------------------------------

async function runLogin(args) {
  const { ctx, close } = await getContext({ ...args, headful: true })
  console.error(`\nOpening ${args.profile} headful. Sign into BOTH:`)
  console.error('  • Gemini  → https://gemini.google.com/app')
  console.error('  • Grok    → https://grok.com')
  for (const url of ['https://gemini.google.com/app', 'https://grok.com']) {
    const p = await ctx.newPage()
    await p.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {})
  }
  for (const p of ctx.pages()) if (p.url() === 'about:blank') await p.close().catch(() => {})
  console.error('\nSign in, then press Ctrl-C here (or close the window) — the login is saved to the profile.')
  console.error('Leaving the window open for up to 20 minutes...')
  await sleep(20 * 60 * 1000)
  await close()
}

async function runResearch(args) {
  const engine = ENGINES[args.source]
  const outPath = resolve(args.out ?? join(WEB_ROOT, 'research-reports', args.slug, `${engine.source}.md`))
  if (!args.dryRun && existsSync(outPath) && !args.force) {
    fail(`refusing to overwrite existing file ${outPath} (pass --force to replace it)`)
  }

  const prompt = composePrompt(args)
  console.error(`composed prompt: ${prompt.length} chars`)
  console.error(`output → ${outPath}`)

  if (args.dryRun) {
    console.error(`\n[dry-run] engine: ${engine.source} (${engine.providerLabel})`)
    console.error(`[dry-run] context: ${args.cdp ? `cdp ${args.cdp}` : `persistent ${args.headful ? 'headful' : 'headless'} @ ${args.profile}`}`)
    console.error(`[dry-run] would: goto ${engine.url} → ${args.prepare ? 'prepare(tier) → ' : ''}paste → submit → wait(${args.timeout}min) → extract → write`)
    console.error(`[dry-run] prompt preview:\n${prompt.slice(0, 400)}\n…`)
    return
  }

  const startedAt = Date.now()
  const { ctx, close, mode } = await getContext(args)
  console.error(`context: ${mode}`)
  try {
    const page = await findEnginePage(ctx, engine)
    console.error(`tab: ${page.url()}`)
    await assertLoggedIn(page, engine)

    if (args.prepare) {
      console.error('preparing engine (model tier / research mode)…')
      await engine.prepare(page)
    }

    console.error('pasting prompt…')
    await page.click(engine.input, { timeout: 15000 })
    await page.keyboard.insertText(prompt)
    await sleep(500)

    await engine.submit(page)

    // Progress screenshots go to the temp dir, not the tracked research-reports
    // dir, so they never pollute committed content.
    const shotPath = join(tmpdir(), `research-browser-${args.slug}-${engine.source}-progress.png`)
    await waitForCompletion(page, engine.doneSelectors, {
      timeoutMin: args.timeout,
      intervalSec: args.pollInterval,
      shotPath,
    })

    await engine.openReport(page)

    console.error('extracting report…')
    const data = await engine.extract(page)
    if (!data || !data.html) throw new Error('extraction found no report content (selectors may have drifted — rerun with --headful to inspect)')

    const body = await turndownBody(data.html)
    if (body.trim().length < 400) throw new Error(`extracted body suspiciously short (${body.trim().length} chars) — likely grabbed the wrong node`)

    const elapsedSec = ((Date.now() - startedAt) / 1000).toFixed(1)
    const doc = renderDocument({ engine, args, body, links: data.links || [], elapsedSec })
    mkdirSync(dirname(outPath), { recursive: true })
    writeFileSync(outPath, doc, 'utf8')
    console.error(`\nWrote ${outPath} (${elapsedSec}s, ${body.length} chars, ${(data.links || []).length} sources)`)
  } finally {
    if (!args.keepOpen) await close()
    else console.error('(--keep-open) leaving the browser context open')
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  if (args.login) return runLogin(args)
  return runResearch(args)
}

main().catch((err) => {
  console.error(`error: ${err.message}`)
  process.exit(1)
})
