import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { MetaPromptingDemo, WorkflowSteps, PatternCard, FullLoopExample } from '@/components/learn/curriculum/demos/prompt-a-prompt'

const components = {
  MetaPromptingDemo,
  WorkflowSteps,
  PatternCard,
  FullLoopExample,
}
export default function PromptAPromptPage() {
  const content = getCurriculumMdx('prompt-a-prompt')

  return (
    <CurriculumLessonPage slug="prompt-a-prompt">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
