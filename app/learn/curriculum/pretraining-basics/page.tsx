import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import Link from 'next/link'
import { AbbrSidenoteProvider, AbbrSidenote } from '@/components/shared/sidenote'
import { GrepDiagram, StochasticParrotDiagram } from '@/components/learn/curriculum/demos/pretraining-basics'

const components = {
  GrepDiagram,
  StochasticParrotDiagram,
  Link,
  AbbrSidenote,
}
export default function PretrainingBasicsPage() {
  const content = getCurriculumMdx('pretraining-basics')

  return (
    <AbbrSidenoteProvider>
      <CurriculumLessonPage slug="pretraining-basics">
        <MDXRemote source={content} components={components} />
      </CurriculumLessonPage>
    </AbbrSidenoteProvider>
  )
}
