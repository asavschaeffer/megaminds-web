const fs = require('fs')
const path = require('path')

const rules = [
  {
    name: 'learn articles',
    dir: path.join(process.cwd(), 'app', 'learn', 'articles'),
    forbid: [/<abbr\b/i, /<Sidenote\b/],
  },
  {
    name: 'model content',
    dir: path.join(process.cwd(), 'content', 'eval', 'models'),
    forbid: [/<abbr\b/i],
  },
  {
    name: 'learn content',
    dir: path.join(process.cwd(), 'content', 'learn', 'articles'),
    forbid: [/<abbr\b/i],
  },
]

const allowedExtensions = new Set(['.ts', '.tsx', '.mdx'])

const walk = (dir) => {
  if (!fs.existsSync(dir)) return []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...walk(fullPath))
      continue
    }
    if (allowedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath)
    }
  }
  return files
}

const errors = []

for (const rule of rules) {
  const files = walk(rule.dir)
  for (const file of files) {
    const contents = fs.readFileSync(file, 'utf8')
    const lines = contents.split(/\r?\n/)
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i]
      for (const pattern of rule.forbid) {
        if (pattern.test(line)) {
          errors.push({
            file,
            lineNumber: i + 1,
            line: line.trim(),
            pattern: pattern.toString(),
            rule: rule.name,
          })
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error('Abbreviation enforcement failed.')
  console.error('Use GlossarySidenote or AbbrSidenote instead of raw <abbr> or <Sidenote>.')
  for (const error of errors) {
    const relPath = path.relative(process.cwd(), error.file)
    console.error(`- ${relPath}:${error.lineNumber} (${error.rule}) ${error.pattern}`)
    console.error(`  ${error.line}`)
  }
  process.exit(1)
}
