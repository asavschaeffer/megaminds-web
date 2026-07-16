const fs = require('fs')
const path = require('path')

// Enforces site policy: every factual claim in a model eval report should
// cite its original source as an inline markdown link. A "violation" is a
// `## section` with more than WORD_THRESHOLD words and zero inline links.
//
// Existing debt is grandfathered via a baseline file (scripts/citation-baseline.json).
// Run with --write-baseline to (re)generate that file from the current state.
// Normal runs report every violation but only fail (exit 1) on violations that
// are NOT already in the baseline — i.e. new or edited sections must cite.

const MODELS_DIR = path.join(process.cwd(), 'content', 'eval', 'models')
const BASELINE_PATH = path.join(__dirname, 'citation-baseline.json')
const WORD_THRESHOLD = 150

const args = process.argv.slice(2)
const writeBaseline = args.includes('--write-baseline')

const walkMdxFiles = (dir) => {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith('.mdx') && name !== 'template.mdx')
    .sort()
}

const stripFrontmatter = (contents) => {
  if (!contents.startsWith('---')) return contents
  const lines = contents.split(/\r?\n/)
  if (lines[0].trim() !== '---') return contents
  for (let i = 1; i < lines.length; i += 1) {
    if (lines[i].trim() === '---') {
      return lines.slice(i + 1).join('\n')
    }
  }
  return contents
}

// Splits body text into `## section-id` sections. Nested `###` (or deeper)
// subheadings stay inside the enclosing `##` section rather than splitting it.
const parseSections = (body) => {
  const lines = body.split(/\r?\n/)
  const sections = []
  let current = null
  for (const line of lines) {
    const match = line.match(/^##\s+(.+?)\s*$/)
    if (match) {
      if (current) sections.push(current)
      current = { id: match[1].trim(), lines: [] }
    } else if (current) {
      current.lines.push(line)
    }
  }
  if (current) sections.push(current)
  return sections.map((section) => ({ id: section.id, text: section.lines.join('\n') }))
}

const countWords = (text) => {
  const words = text.split(/\s+/).filter(Boolean)
  return words.length
}

const countLinks = (text) => {
  const matches = text.match(/\]\(http/g)
  return matches ? matches.length : 0
}

const loadBaseline = () => {
  if (!fs.existsSync(BASELINE_PATH)) return new Set()
  try {
    const parsed = JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8'))
    const violations = Array.isArray(parsed.violations) ? parsed.violations : []
    return new Set(violations)
  } catch (err) {
    console.error(`Failed to parse ${path.relative(process.cwd(), BASELINE_PATH)}: ${err.message}`)
    return new Set()
  }
}

const files = walkMdxFiles(MODELS_DIR)

// results[file] = { sectionsChecked, violations: [{ id, words, links }] }
const results = {}
const allViolationKeys = []

for (const file of files) {
  const fullPath = path.join(MODELS_DIR, file)
  const contents = fs.readFileSync(fullPath, 'utf8')
  const body = stripFrontmatter(contents)
  const sections = parseSections(body)

  const fileResult = { sectionsChecked: sections.length, violations: [] }

  for (const section of sections) {
    const words = countWords(section.text)
    const links = countLinks(section.text)
    if (words > WORD_THRESHOLD && links === 0) {
      fileResult.violations.push({ id: section.id, words, links })
      allViolationKeys.push(`${file}#${section.id}`)
    }
  }

  results[file] = fileResult
}

if (writeBaseline) {
  const baseline = {
    generatedAt: new Date().toISOString(),
    wordThreshold: WORD_THRESHOLD,
    violations: allViolationKeys.slice().sort(),
  }
  fs.writeFileSync(BASELINE_PATH, `${JSON.stringify(baseline, null, 2)}\n`)
  console.log(
    `Wrote ${path.relative(process.cwd(), BASELINE_PATH)} with ${allViolationKeys.length} baselined violation(s).`
  )
  process.exit(0)
}

const baseline = loadBaseline()

let totalSections = 0
let totalViolations = 0
let totalNew = 0
let totalBaselined = 0

const summaryRows = []

for (const file of files) {
  const fileResult = results[file]
  totalSections += fileResult.sectionsChecked

  const newViolations = []
  const baselinedViolations = []
  for (const violation of fileResult.violations) {
    const key = `${file}#${violation.id}`
    if (baseline.has(key)) {
      baselinedViolations.push(violation)
    } else {
      newViolations.push(violation)
    }
  }

  totalViolations += fileResult.violations.length
  totalNew += newViolations.length
  totalBaselined += baselinedViolations.length

  summaryRows.push({
    file,
    sectionsChecked: fileResult.sectionsChecked,
    violations: fileResult.violations.length,
    baselined: baselinedViolations.length,
    new: newViolations.length,
  })

  for (const violation of newViolations) {
    console.error(
      `❌ ${file}#${violation.id} — ${violation.words} words, 0 links (NOT baselined)`
    )
  }
  for (const violation of baselinedViolations) {
    console.warn(
      `⚠️  ${file}#${violation.id} — ${violation.words} words, 0 links (baselined debt)`
    )
  }
}

console.log('')
console.log('Model citation check summary')
console.log(`(sections with > ${WORD_THRESHOLD} words and 0 inline "](http" links are violations)`)
console.log('')

const nameWidth = Math.max(4, ...summaryRows.map((row) => row.file.length))
const header = [
  'file'.padEnd(nameWidth),
  'sections'.padStart(8),
  'violations'.padStart(10),
  'baselined'.padStart(9),
  'new'.padStart(5),
].join('  ')
console.log(header)
console.log('-'.repeat(header.length))

for (const row of summaryRows) {
  console.log(
    [
      row.file.padEnd(nameWidth),
      String(row.sectionsChecked).padStart(8),
      String(row.violations).padStart(10),
      String(row.baselined).padStart(9),
      String(row.new).padStart(5),
    ].join('  ')
  )
}

console.log('-'.repeat(header.length))
console.log(
  `TOTAL: ${totalSections} sections checked, ${totalViolations} violations (${totalBaselined} baselined, ${totalNew} new)`
)

if (!fs.existsSync(BASELINE_PATH)) {
  console.log('')
  console.log(
    `No baseline file found at ${path.relative(process.cwd(), BASELINE_PATH)}. Run with --write-baseline to create one.`
  )
}

if (totalNew > 0) {
  console.log('')
  console.error(`❌ ${totalNew} new (non-baselined) citation violation(s) found.`)
  process.exit(1)
}

console.log('')
console.log('✅ No new citation violations (existing debt remains baselined).')
process.exit(0)
