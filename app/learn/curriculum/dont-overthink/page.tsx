import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { LazyVsPerfectDemo, GaslightDemo, ReadingThoughtsExample, WorkflowSteps, LazyWinCard } from '@/components/learn/curriculum/demos/dont-overthink'

const components = {
  LazyVsPerfectDemo,
  GaslightDemo,
  ReadingThoughtsExample,
  WorkflowSteps,
  LazyWinCard,
} satisfies CurriculumMdxComponents

export default function DontOverthinkPage() {
  return <CurriculumMdxPage slug="dont-overthink" components={components} />
}
