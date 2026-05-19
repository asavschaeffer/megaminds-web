import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { ContextPollutionDemo, PayloadGrowthVisualization, WhatToDoInstead } from '@/components/learn/curriculum/demos/long-prompt-problem'

const components = {
  ContextPollutionDemo,
  PayloadGrowthVisualization,
  WhatToDoInstead,
} satisfies CurriculumMdxComponents

export default function LongPromptProblemPage() {
  return <CurriculumMdxPage slug="long-prompt-problem" components={components} />
}
