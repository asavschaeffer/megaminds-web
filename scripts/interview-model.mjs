#!/usr/bin/env node
/**
 * Self-interview dispatch generator.
 *
 * Interviews a subject model over an OpenAI-compatible chat completions API so
 * that a report author can quote it as an attributed primary source (see the
 * `from-the-inside` section in lib/models/section-catalog.ts). Each question is
 * asked in its own independent API call with the same system prompt — no
 * accumulated conversation — so every answer has simple, self-contained
 * provenance.
 *
 * Plain Node >= 18 (native fetch), no dependencies.
 *
 * Usage:
 *   node scripts/interview-model.mjs --model <id> --slug <report-slug> [options]
 *
 * Options:
 *   --model <id>          (required) Provider-side model id, e.g. "z-ai/glm-4.5-air:free"
 *   --slug <slug>         (required) Report slug; names the default output file
 *   --provider <name>     openrouter | nvidia. Default: openrouter if
 *                         OPENROUTER_API_KEY is set, else nvidia if
 *                         NVIDIA_NIM_API_KEY is set.
 *   --questions <file>    Markdown file with one question per line starting "- "
 *   --max-questions <n>   Cap the number of questions asked
 *   --out <path>          Output path. Default: research-reports/<slug>/self-interview.md
 *   --temperature <t>     Sampling temperature (default 0.7)
 *
 * Environment:
 *   OPENROUTER_API_KEY    OpenRouter key (https://openrouter.ai/api/v1/chat/completions)
 *   NVIDIA_NIM_API_KEY    NVIDIA NIM key (https://integrate.api.nvidia.com/v1/chat/completions)
 *                         (canonical name; NVIDIA_API_KEY is accepted as a fallback alias)
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname, basename, join } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const SCRIPT_NAME = basename(fileURLToPath(import.meta.url))
const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

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

/**
 * Default question set, aligned with the site's section vocabulary
 * (why-it-matters, core-features, issues, personality, advanced,
 * structured-output picker signal, economics, verdict).
 */
const DEFAULT_QUESTIONS = [
  'In your own view, why do you matter? What do you change for the people who use you, compared with what came before?',
  'What kinds of work do you believe you are genuinely best at, and what kinds are you worst at? Be specific about tasks, not marketing categories.',
  'What are your honest known failure modes — the ways you go wrong that a developer or writer relying on you should watch for?',
  'How would you describe your own personality and voice? What tendencies show up in your writing whether or not the user asked for them?',
  'What can you actually verify about your own architecture, training, and parameter count — and what are you unable to know or confirm about yourself from the inside?',
  'When a user asks you for JSON or other strictly structured output, how do you handle it, and where does that reliability break down?',
  'A developer is choosing between you and a cheaper rival model. What would you honestly tell them? Now the same question against a more expensive rival.',
  'What question do you wish evaluators and reviewers asked about you but never do?',
  'How do you behave when you are uncertain or when you do not know something? Do you say so, and under what conditions do you fail to?',
  'Is there anything else you want on the record for a published evaluation of you — a correction, a caveat, a request to future users?',
]

function buildSystemPrompt() {
  return [
    'You are being interviewed for a published evaluation of you on Megaminds, a site that reviews AI models.',
    'Your answers will be quoted with attribution as a primary source — the subject model speaking for itself.',
    'Please be honest and specific rather than promotional; concrete examples beat marketing language.',
    "It is completely fine to say you don't know or can't verify something about yourself — that is itself useful, quotable information.",
    'Answer in a few paragraphs at most per question.',
  ].join(' ')
}

function fail(message) {
  console.error(`error: ${message}`)
  process.exit(1)
}

function parseArgs(argv) {
  const args = {
    model: undefined,
    slug: undefined,
    provider: undefined,
    questionsFile: undefined,
    maxQuestions: undefined,
    out: undefined,
    temperature: 0.7,
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
      case '--model':
        args.model = next()
        break
      case '--slug':
        args.slug = next()
        break
      case '--provider':
        args.provider = next()
        break
      case '--questions':
        args.questionsFile = next()
        break
      case '--max-questions':
        args.maxQuestions = Number.parseInt(next(), 10)
        if (!Number.isInteger(args.maxQuestions) || args.maxQuestions < 1) {
          fail('--max-questions must be a positive integer')
        }
        break
      case '--out':
        args.out = next()
        break
      case '--temperature':
        args.temperature = Number.parseFloat(next())
        if (!Number.isFinite(args.temperature)) fail('--temperature must be a number')
        break
      default:
        fail(`unknown flag: ${flag}`)
    }
  }

  if (!args.model) fail('--model is required (provider-side model id)')
  if (!args.slug) fail('--slug is required (report slug for the output filename)')

  return args
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

function loadQuestions(questionsFile, maxQuestions) {
  let questions = DEFAULT_QUESTIONS
  if (questionsFile) {
    const raw = readFileSync(resolve(questionsFile), 'utf8')
    questions = raw
      .split(/\r?\n/)
      .filter((line) => line.startsWith('- '))
      .map((line) => line.slice(2).trim())
      .filter(Boolean)
    if (questions.length === 0) {
      fail(`no questions found in ${questionsFile} (expected lines starting with "- ")`)
    }
  }
  if (maxQuestions) questions = questions.slice(0, maxQuestions)
  return questions
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function askQuestion(provider, model, temperature, systemPrompt, question) {
  const body = JSON.stringify({
    model,
    temperature,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: question },
    ],
  })

  const maxAttempts = 4
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let response
    try {
      response = await fetch(provider.url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${provider.key}`,
          'Content-Type': 'application/json',
        },
        body,
      })
    } catch (err) {
      if (attempt === maxAttempts) throw new Error(`network error talking to ${provider.label}: ${err.message}`)
      console.error(`  network error (${err.message}), retrying (${attempt}/${maxAttempts})...`)
      await sleep(2000 * attempt)
      continue
    }

    if (response.status === 429 || response.status === 503) {
      if (attempt === maxAttempts) {
        throw new Error(`${provider.label} kept returning ${response.status} after ${maxAttempts} attempts`)
      }
      const retryAfter = Number.parseInt(response.headers.get('retry-after') ?? '', 10)
      const waitMs = Number.isInteger(retryAfter) ? retryAfter * 1000 : 5000 * attempt
      console.error(`  ${response.status} from ${provider.label}, waiting ${waitMs}ms (attempt ${attempt}/${maxAttempts})...`)
      await sleep(waitMs)
      continue
    }

    const text = await response.text()

    if (!response.ok) {
      throw new Error(`${provider.label} returned HTTP ${response.status} for model "${model}": ${text.slice(0, 500)}`)
    }

    let payload
    try {
      payload = JSON.parse(text)
    } catch {
      throw new Error(`${provider.label} returned non-JSON body: ${text.slice(0, 300)}`)
    }

    const content = payload?.choices?.[0]?.message?.content
    if (typeof content !== 'string' || content.trim() === '') {
      if (attempt === maxAttempts) {
        throw new Error(
          `${provider.label} returned empty content for model "${model}" (finish_reason: ${payload?.choices?.[0]?.finish_reason ?? 'unknown'})`
        )
      }
      console.error(`  empty content returned, retrying (${attempt}/${maxAttempts})...`)
      await sleep(2000 * attempt)
      continue
    }

    return content.trim()
  }
  throw new Error('unreachable')
}

function renderTranscript({ provider, model, temperature, questions, answers, slug }) {
  const now = new Date().toISOString()
  const lines = [
    '---',
    `date: ${now}`,
    `provider: ${provider.label} (${provider.url})`,
    `model: ${model}`,
    `temperature: ${temperature}`,
    `questions: ${questions.length}`,
    `report_slug: ${slug}`,
    `generated_by: scripts/${SCRIPT_NAME}`,
    `method: each question asked in an independent API call with an identical system prompt (no accumulated conversation)`,
    '---',
    '',
    `# Self-Interview Dispatch: ${model}`,
    '',
    `This document is a PRIMARY SOURCE dispatch for the \`${slug}\` report: a transcript of the subject model interviewed about itself. All quoted answers below are the model's own words, generated on ${now} via ${provider.label} at temperature ${temperature}. The model was told it was being interviewed for a published evaluation and that its answers would be quoted with attribution. Self-descriptions are the model's claims about itself, not verified facts — treat capability claims here as testimony, to be corroborated against the research dispatch before publication.`,
    '',
    '## System prompt used',
    '',
    '> ' + buildSystemPrompt(),
    '',
  ]

  answers.forEach((answer, index) => {
    lines.push(`## Q${index + 1}: ${questions[index]}`, '', answer, '')
  })

  return lines.join('\n')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const provider = resolveProvider(args.provider)
  const questions = loadQuestions(args.questionsFile, args.maxQuestions)
  const outPath = resolve(args.out ?? join(WEB_ROOT, 'research-reports', args.slug, 'self-interview.md'))
  const systemPrompt = buildSystemPrompt()

  console.error(`Interviewing ${args.model} via ${provider.label} (${questions.length} question(s), temperature ${args.temperature})`)

  const answers = []
  for (let i = 0; i < questions.length; i++) {
    console.error(`[${i + 1}/${questions.length}] ${questions[i].slice(0, 80)}...`)
    const started = Date.now()
    const answer = await askQuestion(provider, args.model, args.temperature, systemPrompt, questions[i])
    console.error(`  answered in ${((Date.now() - started) / 1000).toFixed(1)}s (${answer.length} chars)`)
    answers.push(answer)
  }

  const transcript = renderTranscript({
    provider,
    model: args.model,
    temperature: args.temperature,
    questions,
    answers,
    slug: args.slug,
  })

  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, transcript, 'utf8')
  console.error(`\nWrote self-interview dispatch to ${outPath}`)
}

main().catch((err) => {
  console.error(`error: ${err.message}`)
  process.exit(1)
})
