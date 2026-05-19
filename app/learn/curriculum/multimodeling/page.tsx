import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { LessonRecap } from '@/components/learn/curriculum/teaching-blocks'
import { MultimodelingDemo, UseCases, WorkflowSteps, ExampleCard } from '@/components/learn/curriculum/demos/multimodeling'

const components = {
  MultimodelingDemo,
  UseCases,
  WorkflowSteps,
  ExampleCard,
  LessonRecap,
}
export default function MultimodelingPage() {
  const content = getCurriculumMdx('multimodeling')

  return (
    <CurriculumLessonPage slug="multimodeling">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
