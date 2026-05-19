import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { KnowledgeCutoffDemo, FactsVsConceptsComparison, SearchWorkflow, ModelSearchFeatures } from '@/components/learn/curriculum/demos/web-search'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'

const components = {
  KnowledgeCutoffDemo,
  FactsVsConceptsComparison,
  SearchWorkflow,
  ModelSearchFeatures,
}

export default function WebSearchPage() {
  const content = getCurriculumMdx('web-search')

  return (
    <CurriculumLessonPage slug="web-search">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
