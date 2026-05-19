import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { BasinVisualization, TwoFailureRule, BasinSigns, EscapeStrategy, DeathSpiralExample } from '@/components/learn/curriculum/demos/slipping-into-basin'

const components = {
  BasinVisualization,
  TwoFailureRule,
  BasinSigns,
  EscapeStrategy,
  DeathSpiralExample,
}
export default function SlippingIntoBasinPage() {
  const content = getCurriculumMdx('slipping-into-basin')

  return (
    <CurriculumLessonPage slug="slipping-into-basin">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
