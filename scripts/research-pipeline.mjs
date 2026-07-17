#!/usr/bin/env node
/**
 * Research pipeline orchestrator — one command for the whole dispatch phase.
 *
 * Runs every research stage for a model report in order, producing the
 * complete research-reports/<slug>/ dispatch directory that the authoring
 * phase (/add-model, Phase 2+) consumes:
 *
 *   scratchpad   scaffold the editor's scratchpad (never overwrites)
 *   google       Gemini Deep Research dispatch        -> google.md
 *   x            Grok / X Search dispatch             -> x.md
 *   interview    subject self-interview               -> self-interview.md
 *   poem         unguided poem probe                  -> probe-poem.md
 *   poem-self    introspective poem probe             -> probe-poem-self.md
 *   ascii-art    ASCII self-portrait probe            -> probe-ascii-art.md
 *
 * The orchestrator owns sequencing, idempotency, and key-awareness; each stage
 * remains an independent script with its own CLI (this file only composes
 * them). A stage whose output file already exists is skipped (rerun with
 * --force); a stage whose API key is missing is reported as blocked and the
 * rest continue. The scratchpad is human-owned and is never forced.
 *
 * Deliberately NOT automated here: authoring. The dispatch directory is raw
 * material; the report is written under .claude/skills/add-model (the
 * editorial constitution), and the editor's final pass stays manual.
 *
 * Plain Node >= 18, no dependencies. Matches the conventions of
 * scripts/interview-model.mjs and scripts/deep-research.mjs.
 *
 * Usage:
 *   node scripts/research-pipeline.mjs --slug <slug> --model "<Display Name>" [options]
 *
 * Options:
 *   --slug <slug>             (required) Report slug (dispatch directory name)
 *   --model "<Display Name>"  (required) Display name for the brief generator
 *   --subject-id <id>         Provider-side model id for interview + probes,
 *                             e.g. "z-ai/glm-5.2". Omit for Claude subjects
 *                             (author == subject: interview is unnecessary and
 *                             probes are generated in-session — see the skill).
 *   --provider <name>         openrouter | nvidia, for interview + probes
 *   --tier fast|max           Gemini agent tier (default fast)
 *   --fallback-openrouter     Run google/x stages via the OpenRouter
 *                             web-search fallback when GEMINI_API_KEY /
 *                             XAI_API_KEY is missing (lighter research; the
 *                             dispatch frontmatter records the provider)
 *   --only <steps>            Comma-separated step names to run ("probes" is
 *                             an alias for poem,poem-self,ascii-art)
 *   --skip <steps>            Comma-separated step names to skip
 *   --force                   Rerun steps whose output files already exist
 *                             (never applies to scratchpad)
 *   --dry-run                 Print the execution plan and each step's exact
 *                             command; run nothing
 *
 * Environment (each stage reports itself blocked when its key is missing):
 *   GEMINI_API_KEY            google stage
 *   XAI_API_KEY               x stage
 *   OPENROUTER_API_KEY        interview/probes; --fallback-openrouter
 *   NVIDIA_NIM_API_KEY        interview/probes alternative
 */

import { existsSync } from 'node:fs'
import { resolve, dirname, basename, join } from 'node:path'
import { spawnSync } from 'node:child_process'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const WEB_ROOT = resolve(SCRIPT_DIR, '..')

const PROBE_STEPS = ['poem', 'poem-self', 'ascii-art']
const STEP_NAMES = ['scratchpad', 'google', 'x', 'interview', ...PROBE_STEPS]

function fail(message) {
  console.error(`error: ${message}`)
  process.exit(1)
}

function parseArgs(argv) {
  const args = {
    slug: undefined,
    model: undefined,
    subjectId: undefined,
    provider: undefined,
    tier: undefined,
    fallbackOpenrouter: false,
    only: undefined,
    skip: undefined,
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
      case '--slug':
        args.slug = next()
        break
      case '--model':
        args.model = next()
        break
      case '--subject-id':
        args.subjectId = next()
        break
      case '--provider':
        args.provider = next()
        break
      case '--tier':
        args.tier = next()
        break
      case '--fallback-openrouter':
        args.fallbackOpenrouter = true
        break
      case '--only':
        args.only = parseStepList(next(), '--only')
        break
      case '--skip':
        args.skip = parseStepList(next(), '--skip')
        break
      case '--force':
        args.force = true
        break
      case '--dry-run':
        args.dryRun = true
        break
      default:
        fail(`unknown flag: ${flag}`)
    }
  }

  if (!args.slug) fail('--slug is required')
  if (!args.model) fail('--model is required (display name for the brief generator)')

  return args
}

function parseStepList(raw, flag) {
  const steps = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .flatMap((s) => (s === 'probes' ? PROBE_STEPS : [s]))
  for (const step of steps) {
    if (!STEP_NAMES.includes(step)) {
      fail(`${flag}: unknown step "${step}" (expected: ${STEP_NAMES.join(' | ')} | probes)`)
    }
  }
  if (steps.length === 0) fail(`${flag}: no steps given`)
  return new Set(steps)
}

function hasKey(...names) {
  return names.some((name) => Boolean(process.env[name]))
}

/**
 * Builds the ordered execution plan. Each entry:
 *   { name, outFile, command: [scriptRelPath, ...args] | null, status, note }
 * A null command means the step is not runnable (blocked/skipped) — status
 * and note say why.
 */
function buildPlan(args) {
  const dispatchDir = join(WEB_ROOT, 'research-reports', args.slug)
  const plan = []

  const selected = (name) => {
    if (args.only && !args.only.has(name)) return false
    if (args.skip && args.skip.has(name)) return false
    return true
  }

  const push = (name, outFile, build) => {
    if (!selected(name)) {
      plan.push({ name, outFile, command: null, status: 'skipped', note: 'deselected (--only/--skip)' })
      return
    }
    const outPath = join(dispatchDir, outFile)
    const forceable = name !== 'scratchpad'
    if (existsSync(outPath) && !(args.force && forceable)) {
      const note = forceable ? 'output exists (rerun with --force)' : 'output exists (human-owned; never forced)'
      plan.push({ name, outFile, command: null, status: 'skipped', note })
      return
    }
    plan.push({ name, outFile, ...build() })
  }

  push('scratchpad', 'scratchpad.md', () => ({
    command: ['scripts/new-scratchpad.mjs', '--slug', args.slug, '--model', args.model],
    status: 'pending',
    note: '',
  }))

  for (const source of ['google', 'x']) {
    const envVar = source === 'google' ? 'GEMINI_API_KEY' : 'XAI_API_KEY'
    push(source, `${source}.md`, () => {
      const command = ['scripts/deep-research.mjs', '--slug', args.slug, '--model', args.model, '--source', source]
      let note = ''
      if (!hasKey(envVar)) {
        if (args.fallbackOpenrouter && hasKey('OPENROUTER_API_KEY')) {
          command.push('--provider', 'openrouter')
          note = `no ${envVar}; using OpenRouter web-search fallback`
        } else {
          return { command: null, status: 'blocked', note: `no ${envVar} (pass --fallback-openrouter to downgrade)` }
        }
      } else if (source === 'google' && args.tier) {
        command.push('--tier', args.tier)
      }
      if (args.force) command.push('--force')
      return { command, status: 'pending', note }
    })
  }

  const subjectSteps = [
    { name: 'interview', outFile: 'self-interview.md', extra: [] },
    ...PROBE_STEPS.map((probe) => ({ name: probe, outFile: `probe-${probe}.md`, extra: ['--probe', probe] })),
  ]
  for (const { name, outFile, extra } of subjectSteps) {
    push(name, outFile, () => {
      if (!args.subjectId) {
        return {
          command: null,
          status: 'blocked',
          note: 'no --subject-id (Claude subjects: run in-session per the add-model skill)',
        }
      }
      if (!hasKey('OPENROUTER_API_KEY', 'NVIDIA_NIM_API_KEY', 'NVIDIA_API_KEY')) {
        return { command: null, status: 'blocked', note: 'no OPENROUTER_API_KEY or NVIDIA_NIM_API_KEY' }
      }
      const command = ['scripts/interview-model.mjs', '--model', args.subjectId, '--slug', args.slug, ...extra]
      if (args.provider) command.push('--provider', args.provider)
      return { command, status: 'pending', note: '' }
    })
  }

  return plan
}

function formatCommand(command) {
  return ['node', ...command].map((part) => (/\s/.test(part) ? `"${part}"` : part)).join(' ')
}

function runStep(step) {
  console.error(`\n=== ${step.name} → research-reports/.../${step.outFile} ===`)
  if (step.note) console.error(`    (${step.note})`)
  const result = spawnSync(process.execPath, [resolve(WEB_ROOT, step.command[0]), ...step.command.slice(1)], {
    cwd: WEB_ROOT,
    stdio: 'inherit',
  })
  if (result.error) {
    step.status = 'failed'
    step.note = result.error.message
  } else if (result.status !== 0) {
    step.status = 'failed'
    step.note = `exit ${result.status}`
  } else {
    step.status = 'done'
  }
}

function printSummary(plan, slug) {
  const width = Math.max(...plan.map((s) => s.name.length))
  console.error(`\n== Pipeline summary (research-reports/${slug}/) ==`)
  for (const step of plan) {
    const status = step.status.toUpperCase().padEnd(7)
    console.error(`  ${step.name.padEnd(width)}  ${status}  ${step.outFile}${step.note ? `  — ${step.note}` : ''}`)
  }
  const blocked = plan.filter((s) => s.status === 'blocked').length
  const failed = plan.filter((s) => s.status === 'failed').length
  if (blocked) console.error(`\n${blocked} step(s) blocked — see notes above.`)
  if (failed) console.error(`${failed} step(s) failed.`)
  if (!failed) {
    console.error('\nNext: author the report from these dispatches (.claude/skills/add-model, Phase 2+).')
  }
}

function main() {
  const args = parseArgs(process.argv.slice(2))
  const plan = buildPlan(args)

  if (args.dryRun) {
    console.error(`Dry run — plan for research-reports/${args.slug}/:\n`)
    for (const step of plan) {
      if (step.command) {
        console.error(`  ${step.name}: ${formatCommand(step.command)}${step.note ? `  (${step.note})` : ''}`)
      } else {
        console.error(`  ${step.name}: ${step.status.toUpperCase()} — ${step.note}`)
      }
    }
    return
  }

  for (const step of plan) {
    if (step.command) runStep(step)
  }

  printSummary(plan, args.slug)
  if (plan.some((s) => s.status === 'failed')) process.exit(1)
}

main()
