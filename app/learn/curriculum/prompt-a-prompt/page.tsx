import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { MetaPromptingDemo, WorkflowSteps, PatternCard, FullLoopExample } from '@/components/learn/curriculum/demos/prompt-a-prompt'

const components = {
  MetaPromptingDemo,
  WorkflowSteps,
  PatternCard,
  FullLoopExample,
} satisfies CurriculumMdxComponents

export default function PromptAPromptPage() {
  return <CurriculumMdxPage slug="prompt-a-prompt" components={components} />
}
