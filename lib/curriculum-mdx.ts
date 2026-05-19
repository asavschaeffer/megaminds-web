import fs from 'fs'
import path from 'path'

export function getCurriculumMdx(slug: string): string {
  const filePath = path.join(process.cwd(), 'app', 'learn', 'curriculum', slug, 'content.mdx')

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing curriculum MDX content: ${slug}`)
  }

  return fs.readFileSync(filePath, 'utf8')
}

