import Link from 'next/link'
import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
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
} satisfies CurriculumMdxComponents

export default function NoMemoryPage() {
  return (
    <AbbrSidenoteProvider>
      <CurriculumMdxPage slug="no-memory" components={components} />
    </AbbrSidenoteProvider>
  )
}
