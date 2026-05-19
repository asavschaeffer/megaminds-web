import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { ContextPollutionDemo, PayloadGrowthVisualization, WhatToDoInstead } from '@/components/learn/curriculum/demos/long-prompt-problem'

const components = {
  ContextPollutionDemo,
  PayloadGrowthVisualization,
  WhatToDoInstead,
}
export default function LongPromptProblemPage() {
  const content = getCurriculumMdx('long-prompt-problem')

  return (
    <CurriculumLessonPage slug="long-prompt-problem">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
