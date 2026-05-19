const fs = require('fs')
const path = require('path')

const curriculumDir = path.join('app', 'learn', 'curriculum')
const failures = []

for (const dirent of fs.readdirSync(curriculumDir, { withFileTypes: true })) {
  if (!dirent.isDirectory()) continue

  const filePath = path.join(curriculumDir, dirent.name, 'page.tsx')
  if (!fs.existsSync(filePath)) continue

  const source = fs.readFileSync(filePath, 'utf8')
  const contentPath = path.join(curriculumDir, dirent.name, 'content.mdx')

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

  if (source.includes('MDXRemote') || source.includes('getCurriculumMdx(')) {
    failures.push(`${filePath}: use CurriculumMdxPage for the shared MDX lesson shell.`)
  }

  if (!source.includes('<CurriculumMdxPage')) {
    failures.push(`${filePath}: render curriculum lessons with CurriculumMdxPage.`)
  }

  if (source.includes('<CurriculumMdxPage') && !fs.existsSync(contentPath)) {
    failures.push(`${filePath}: add adjacent content.mdx for lesson body content.`)
  }

  if (/^function [A-Z][A-Za-z0-9_]*\(/m.test(source)) {
    failures.push(`${filePath}: move page-local demos to components/learn/curriculum/demos.`)
  }

  if (/^'use client'/m.test(source)) {
    failures.push(`${filePath}: keep route wrappers server-rendered; move client behavior to demos.`)
  }

  if (fs.existsSync(contentPath)) {
    const mdx = fs.readFileSync(contentPath, 'utf8')

    if (/EDITORIAL NOTES|EDITORIAL NOTES & REFLECTIONS|POTENTIAL ADDITIONS/.test(mdx)) {
      failures.push(`${contentPath}: move long editorial notes to docs/learn/lesson-notes.`)
    }
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log('Curriculum page guardrails passed.')

