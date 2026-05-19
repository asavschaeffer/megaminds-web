import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { LessonRecap } from '@/components/learn/curriculum/teaching-blocks'
import { MultimodelingDemo, UseCases, WorkflowSteps, ExampleCard } from '@/components/learn/curriculum/demos/multimodeling'

const components = {
  MultimodelingDemo,
  UseCases,
  WorkflowSteps,
  ExampleCard,
  LessonRecap,
} satisfies CurriculumMdxComponents

export default function MultimodelingPage() {
  return <CurriculumMdxPage slug="multimodeling" components={components} />
}
