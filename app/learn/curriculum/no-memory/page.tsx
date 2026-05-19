import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import Link from 'next/link'
import { AbbrSidenoteProvider, AbbrSidenote } from '@/components/shared/sidenote'
import { LessonRecap } from '@/components/learn/curriculum/teaching-blocks'
import { WhatYouSeeVsWhatItSees, AnatomyDiagram, ContextWindowDiagram, InferenceDiagram } from '@/components/learn/curriculum/demos/no-memory'

const components = {
  WhatYouSeeVsWhatItSees,
  AnatomyDiagram,
  ContextWindowDiagram,
  InferenceDiagram,
  Link,
  AbbrSidenote,
  LessonRecap,
}
export default function NoMemoryPage() {
  const content = getCurriculumMdx('no-memory')

  return (
    <AbbrSidenoteProvider>
      <CurriculumLessonPage slug="no-memory">
        <MDXRemote source={content} components={components} />
      </CurriculumLessonPage>
    </AbbrSidenoteProvider>
  )
}
