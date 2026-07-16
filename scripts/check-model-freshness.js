const fs = require('fs')
const path = require('path')

// Flags date-anchored ephemeral phrases in model eval reports. Reports are
// written in present tense (site policy), so words like "currently" or "now"
// are fine — but calendar-anchored words ("tonight", "this week", ...)
// guarantee the prose goes stale. Default: print warnings, exit 0. With
// --strict: exit 1 if any findings, for use as a hard gate once content is clean.

const MODELS_DIR = path.join(process.cwd(), 'content', 'eval', 'models')

const PHRASES = [
  'tonight',
  'today',
  'tomorrow',
  'yesterday',
  'this week',
  'next week',
  'this month',
  'last week',
]

const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Word-boundary, case-insensitive matching. `\b` on a multi-word phrase like
// "this week" naturally avoids false positives like "this weekend" (no
// boundary between "week" and "end"), and phrases like "currently"/"now"/
// "recently" are simply not in the list, so present-tense voice is untouched.
const phrasePatterns = PHRASES.map((phrase) => ({
  phrase,
  regex: new RegExp(`\\b${escapeRegExp(phrase).replace(/\s+/g, '\\s+')}\\b`, 'gi'),
}))

const args = process.argv.slice(2)
const strict = args.includes('--strict')

const walkMdxFiles = (dir) => {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.mdx') && name !== 'template.mdx')
    .sort()
}

const excerpt = (line, maxLen = 140) => {
  const trimmed = line.trim()
  if (trimmed.length <= maxLen) return trimmed
  return `${trimmed.slice(0, maxLen - 1)}…`
}

const files = walkMdxFiles(MODELS_DIR)

const findings = [] // { file, lineNumber, phrase, excerpt }

for (const file of files) {
  const fullPath = path.join(MODELS_DIR, file)
  const contents = fs.readFileSync(fullPath, 'utf8')
  const lines = contents.split(/\r?\n/)

  lines.forEach((line, index) => {
    for (const { phrase, regex } of phrasePatterns) {
      regex.lastIndex = 0
      const matches = line.match(regex)
      if (matches) {
        for (const matched of matches) {
          findings.push({
            file,
            lineNumber: index + 1,
            phrase: matched,
            excerpt: excerpt(line),
          })
        }
      }
    }
  })
}

console.log('Model freshness check (date-anchored ephemera)')
console.log(`Flagged phrases: ${PHRASES.map((p) => `"${p}"`).join(', ')}`)
console.log('')

if (findings.length === 0) {
  console.log('✅ No date-anchored ephemera found.')
  process.exit(0)
}

const byFile = new Map()
for (const finding of findings) {
  if (!byFile.has(finding.file)) byFile.set(finding.file, [])
  byFile.get(finding.file).push(finding)
}

for (const [file, fileFindings] of byFile) {
  const icon = strict ? '❌' : '⚠️ '
  console.log(`${icon} ${file} (${fileFindings.length} finding${fileFindings.length === 1 ? '' : 's'})`)
  for (const finding of fileFindings) {
    console.log(`   line ${finding.lineNumber}: "${finding.phrase}" — ${finding.excerpt}`)
  }
}

console.log('')
console.log(
  `TOTAL: ${findings.length} finding(s) across ${byFile.size} file(s).`
)

if (strict) {
  console.error('')
  console.error('❌ --strict mode: failing due to date-anchored ephemera above.')
  process.exit(1)
}

console.log('')
console.log('Warnings only (run with --strict to fail the build on these).')
process.exit(0)
