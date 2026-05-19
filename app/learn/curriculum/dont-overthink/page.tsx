import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { LazyVsPerfectDemo, GaslightDemo, ReadingThoughtsExample, WorkflowSteps, LazyWinCard } from '@/components/learn/curriculum/demos/dont-overthink'

const components = {
  LazyVsPerfectDemo,
  GaslightDemo,
  ReadingThoughtsExample,
  WorkflowSteps,
  LazyWinCard,
}
export default function DontOverthinkPage() {
  const content = getCurriculumMdx('dont-overthink')

  return (
    <CurriculumLessonPage slug="dont-overthink">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
