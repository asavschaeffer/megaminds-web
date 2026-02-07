import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { MdxSectionMap, MdxExpandableBlock } from './types'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'eval', 'models')

/**
 * Check if an MDX file exists for a given model slug.
 */
export function mdxFileExists(slug: string): boolean {
  return fs.existsSync(path.join(CONTENT_DIR, `${slug}.mdx`))
}

/**
 * Read and parse an MDX file for a model slug.
 * Returns null if no MDX file exists.
 */
export function loadModelMdx(slug: string): { frontmatter: Record<string, unknown>; sections: MdxSectionMap } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data: frontmatter, content } = matter(raw)

  const sections = parseSections(content)

  return { frontmatter, sections }
}

/**
 * Split MDX content by `## section-id` headings into a section map.
 * Each section's content includes everything until the next `## ` heading.
 */
function parseSections(content: string): MdxSectionMap {
  const sectionMap: MdxSectionMap = {}

  // Split on ## headings at the start of a line
  const sectionRegex = /^## ([a-z0-9-]+)\s*$/gm
  const matches: Array<{ id: string; index: number }> = []

  let match: RegExpExecArray | null
  while ((match = sectionRegex.exec(content)) !== null) {
    matches.push({ id: match[1], index: match.index })
  }

  for (let i = 0; i < matches.length; i++) {
    const start = matches[i].index + matches[i].id.length + 4 // "## " + id + newline
    const end = i + 1 < matches.length ? matches[i + 1].index : content.length
    const sectionContent = content.slice(start, end).trim()

    const { cleaned, expandables } = extractExpandables(sectionContent)

    sectionMap[matches[i].id] = {
      content: cleaned,
      expandables,
    }
  }

  return sectionMap
}

/**
 * Extract <Expandable> blocks from section content.
 * Returns cleaned content (with expandables removed) and the parsed expandable blocks.
 */
function extractExpandables(content: string): { cleaned: string; expandables: MdxExpandableBlock[] } {
  const expandables: MdxExpandableBlock[] = []

  // Match <Expandable id="..." title="..." preview="...">...</Expandable>
  const expandableRegex = /<Expandable\s+([^>]*?)>([\s\S]*?)<\/Expandable>/g
  const cleaned = content.replace(expandableRegex, (fullMatch, attrs: string, innerContent: string) => {
    const id = extractAttr(attrs, 'id') ?? `expandable-${expandables.length}`
    const title = extractAttr(attrs, 'title') ?? ''
    const preview = extractAttr(attrs, 'preview') ?? ''

    expandables.push({
      id,
      title,
      preview,
      content: innerContent.trim(),
    })

    return ''
  })

  return { cleaned: cleaned.trim(), expandables }
}

/**
 * Extract a quoted attribute value from an attribute string.
 */
function extractAttr(attrs: string, name: string): string | null {
  const regex = new RegExp(`${name}=["']([^"']*)["']`)
  const match = regex.exec(attrs)
  return match ? match[1] : null
}
