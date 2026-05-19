import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { FewShotDemo, ExampleTypes, RealExampleCard } from '@/components/learn/curriculum/demos/examples'

const components = {
  FewShotDemo,
  ExampleTypes,
  RealExampleCard,
}
export default function ExamplesPage() {
  const content = getCurriculumMdx('examples')

  return (
    <CurriculumLessonPage slug="examples">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
