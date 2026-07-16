#!/usr/bin/env node
/**
 * Scaffold an editor's scratchpad for a model's research dispatches.
 *
 * The scratchpad is the human-curated dispatch: links, quotes, tweets, and
 * articles collected by hand while following a model, living alongside the
 * machine-generated dispatches in research-reports/<slug>/. It feeds the
 * pipeline twice:
 *   - report authors read it directly (and must verify + cite primary URLs)
 *   - `research:brief -- --slug <slug>` embeds it into commissioned research
 *     prompts as seed material for the researcher to verify and extend
 *
 * Usage:
 *   node scripts/new-scratchpad.mjs --slug <slug> [--model "<Display Name>"]
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'

const WEB_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function fail(message) {
  console.error(`error: ${message}`)
  process.exit(1)
}

function parseArgs(argv) {
  const args = { slug: undefined, model: undefined }
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
      default: fail(`unknown flag: ${flag}`)
    }
  }
  if (!args.slug) fail('--slug is required (report slug, names the directory)')
  return args
}

const { slug, model } = parseArgs(process.argv.slice(2))
const today = new Date().toISOString().slice(0, 10)
const title = model ?? slug

const outPath = join(WEB_ROOT, 'research-reports', slug, 'scratchpad.md')
if (existsSync(outPath)) {
  fail(`${outPath} already exists — append to it instead of scaffolding`)
}

const content = `---
slug: ${slug}
type: scratchpad
started: ${today}
---

# Editor's scratchpad: ${title}

Hand-collected leads for the ${title} report — links, quotes, tweets,
articles, benchmark chatter. One bullet per item: URL first, then what it is
and why it matters. Date each capture session with a \`## YYYY-MM-DD\` heading.

Everything here is a lead, not a fact. Whoever consumes this — the report
author or a commissioned researcher — must open each link, verify the claim
against the live source, and cite the primary URL, never this file.

## ${today}

- <!-- https://example.com — what it is — why it matters -->
`

mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, content, 'utf8')
console.log(`Created ${outPath}`)
