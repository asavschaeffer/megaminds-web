import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import Link from 'next/link'
import { AbbrSidenoteProvider, AbbrSidenote } from '@/components/shared/sidenote'
import { RLHFDiagram, WeightsDiagram, AssistantAxisDiagram } from '@/components/learn/curriculum/demos/finetuning-basics'

const components = {
  RLHFDiagram,
  WeightsDiagram,
  AssistantAxisDiagram,
  Link,
  AbbrSidenote,
}
export default function FinetuningBasicsPage() {
  const content = getCurriculumMdx('finetuning-basics')

  return (
    <AbbrSidenoteProvider>
      <CurriculumLessonPage slug="finetuning-basics">
        <MDXRemote source={content} components={components} />
      </CurriculumLessonPage>
    </AbbrSidenoteProvider>
  )
}
