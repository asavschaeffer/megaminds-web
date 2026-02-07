import type { ModelProfile, ContentSection, ExpandableBlock } from './types'
import { loadModelMdx } from './mdx-loader'

/**
 * Hydrate a ModelProfile with MDX content if a matching .mdx file exists.
 * Returns the profile unchanged if no MDX file is found (backward compatible).
 */
export function hydrateModelWithMdx(profile: ModelProfile): ModelProfile {
  const mdxData = loadModelMdx(profile.slug)

  if (!mdxData) {
    return profile
  }

  const { sections: mdxSections } = mdxData

  const hydratedSections: ContentSection[] = profile.sections.map((section) => {
    const mdxSection = mdxSections[section.id]

    if (!mdxSection) {
      return section
    }

    const updates: Partial<ContentSection> = {}

    // Overlay content if MDX provides it
    if (mdxSection.content) {
      updates.content = mdxSection.content
      updates.contentSource = 'mdx'
    }

    // Overlay expandables if MDX provides them
    if (mdxSection.expandables.length > 0) {
      if (mdxSection.expandables.length === 1 && !section.expandables) {
        // Single expandable → use `expandable` field
        const exp = mdxSection.expandables[0]
        updates.expandable = {
          title: exp.title,
          preview: exp.preview,
          content: exp.content,
          contentSource: 'mdx',
        }
      } else {
        // Multiple expandables → use `expandables` field
        updates.expandables = mdxSection.expandables.map((exp) => ({
          title: exp.title,
          preview: exp.preview,
          content: exp.content,
          contentSource: 'mdx' as const,
        }))
      }
    }

    return { ...section, ...updates }
  })

  return { ...profile, sections: hydratedSections }
}
