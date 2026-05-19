import Link from 'next/link'
import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { AbbrSidenoteProvider, AbbrSidenote } from '@/components/shared/sidenote'
import { RLHFDiagram, WeightsDiagram, AssistantAxisDiagram } from '@/components/learn/curriculum/demos/finetuning-basics'

const components = {
  RLHFDiagram,
  WeightsDiagram,
  AssistantAxisDiagram,
  Link,
  AbbrSidenote,
} satisfies CurriculumMdxComponents

export default function FinetuningBasicsPage() {
  return (
    <AbbrSidenoteProvider>
      <CurriculumMdxPage slug="finetuning-basics" components={components} />
    </AbbrSidenoteProvider>
  )
}
