const fs = require('fs')
const path = require('path')

const curriculumDir = path.join('app', 'learn', 'curriculum')
const failures = []

for (const dirent of fs.readdirSync(curriculumDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue

  const filePath = path.join(curriculumDir, dirent.name, 'page.tsx')
  if (!fs.existsSync(filePath)) continue

  const source = fs.readFileSync(filePath, 'utf8')

  if (source.includes('LessonHeader')) {
    failures.push(`${filePath}: import CurriculumLessonPage instead of rendering LessonHeader directly.`)
  }

  if (source.includes('py-16 px-6 lg:px-8 bg-white')) {
    failures.push(`${filePath}: use CurriculumLessonPage for the shared lesson shell.`)
  }

  if (/EDITORIAL NOTES|EDITORIAL NOTES & REFLECTIONS|POTENTIAL ADDITIONS/.test(source)) {
    failures.push(`${filePath}: move long editorial notes to docs/learn/lesson-notes.`)
  }

  if (/Previous:|Next:|Next Module:|Previous Module:|Back to Curriculum/.test(source)) {
    failures.push(`${filePath}: use LessonNavigation instead of page-local nav CTAs.`)
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('Curriculum page guardrails passed.')

