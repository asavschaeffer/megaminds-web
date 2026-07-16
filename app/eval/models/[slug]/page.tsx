import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { ModelPageTemplate } from '@/components/eval/model-page/model-page-template'
import { buildPricingData } from '@/lib/models/pricing'
import { getAllModelSlugs, getAllModels, getModelBySlug } from '@/lib/models/registry'
import { modelMdxComponents } from '@/lib/models/mdx-components'
import type { ModelProfile, ContentSection, ExpandableBlock } from '@/lib/models/types'

export function generateStaticParams() {
  return getAllModelSlugs().map((slug) => ({ slug }))
}

/**
 * Compile MDX string content in sections to ReactNode.
 * Only processes sections/expandables with contentSource: 'mdx'.
 */
async function compileModelMdx(profile: ModelProfile): Promise<ModelProfile> {
  const compiledSections: ContentSection[] = await Promise.all(
    profile.sections.map(async (section) => {
      const updates: Partial<ContentSection> = {}

      // Compile section content if it's MDX
      if (section.contentSource === 'mdx' && typeof section.content === 'string') {
        updates.content = (
          <MDXRemote source={section.content} components={modelMdxComponents} />
        )
      }

      // Compile single expandable if it's MDX
      if (section.expandable?.contentSource === 'mdx' && typeof section.expandable.content === 'string') {
        updates.expandable = {
          ...section.expandable,
          content: (
            <MDXRemote source={section.expandable.content} components={modelMdxComponents} />
          ),
        }
      }

      // Compile multiple expandables if they're MDX
      if (section.expandables?.some((e) => e.contentSource === 'mdx')) {
        updates.expandables = await Promise.all(
          section.expandables.map(async (exp) => {
            if (exp.contentSource === 'mdx' && typeof exp.content === 'string') {
              return {
                ...exp,
                content: (
                  <MDXRemote source={exp.content} components={modelMdxComponents} />
                ),
              } as ExpandableBlock
            }
            return exp
          })
        )
      }

      if (Object.keys(updates).length === 0) {
        return section
      }

      return { ...section, ...updates }
    })
  )

  return { ...profile, sections: compiledSections }
}

export default async function ModelPage({ params }: { params: { slug: string } }) {
  const model = getModelBySlug(params.slug)

  if (!model) {
    notFound()
  }

  const pricingData = buildPricingData(model, getAllModels()) ?? undefined

  // Compile MDX content strings to ReactNode
  const compiled = await compileModelMdx(model)

  return <ModelPageTemplate profile={compiled} pricingData={pricingData} />
}
