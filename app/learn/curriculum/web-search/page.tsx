import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { KnowledgeCutoffDemo, FactsVsConceptsComparison, SearchWorkflow, ModelSearchFeatures } from '@/components/learn/curriculum/demos/web-search'

const components = {
  KnowledgeCutoffDemo,
  FactsVsConceptsComparison,
  SearchWorkflow,
  ModelSearchFeatures,
} satisfies CurriculumMdxComponents

export default function WebSearchPage() {
  return <CurriculumMdxPage slug="web-search" components={components} />
}
