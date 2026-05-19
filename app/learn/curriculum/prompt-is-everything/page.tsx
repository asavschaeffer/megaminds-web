import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import Link from 'next/link'
import { PromptIsRealityDiagram, WhatTheModelKnowsDiagram, PromptAnatomyDiagram } from '@/components/learn/curriculum/demos/prompt-is-everything'

const components = {
  PromptIsRealityDiagram,
  WhatTheModelKnowsDiagram,
  PromptAnatomyDiagram,
  Link,
}
export default function PromptIsEverythingPage() {
  const content = getCurriculumMdx('prompt-is-everything')

  return (
    <CurriculumLessonPage slug="prompt-is-everything">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
