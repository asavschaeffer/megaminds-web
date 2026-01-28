import { notFound } from 'next/navigation'
import { ModelPageTemplate } from '@/components/eval/model-page/model-page-template'
import { buildPricingData } from '@/lib/models/pricing'
import { getAllModelSlugs, getAllModels, getModelBySlug } from '@/lib/models/registry'

export function generateStaticParams() {
  return getAllModelSlugs().map((slug) => ({ slug }))
}

export default function ModelPage({ params }: { params: { slug: string } }) {
  const model = getModelBySlug(params.slug)

  if (!model) {
    notFound()
  }

  const pricingData = buildPricingData(model, getAllModels()) ?? undefined

  return <ModelPageTemplate profile={{ ...model, pricingData }} />
}
