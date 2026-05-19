import Link from 'next/link'
import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { PromptIsRealityDiagram, WhatTheModelKnowsDiagram, PromptAnatomyDiagram } from '@/components/learn/curriculum/demos/prompt-is-everything'

const components = {
  PromptIsRealityDiagram,
  WhatTheModelKnowsDiagram,
  PromptAnatomyDiagram,
  Link,
} satisfies CurriculumMdxComponents

export default function PromptIsEverythingPage() {
  return <CurriculumMdxPage slug="prompt-is-everything" components={components} />
}
