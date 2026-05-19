import Link from 'next/link'
import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { AbbrSidenoteProvider, AbbrSidenote } from '@/components/shared/sidenote'
import { GrepDiagram, StochasticParrotDiagram } from '@/components/learn/curriculum/demos/pretraining-basics'

const components = {
  GrepDiagram,
  StochasticParrotDiagram,
  Link,
  AbbrSidenote,
} satisfies CurriculumMdxComponents

export default function PretrainingBasicsPage() {
  return (
    <AbbrSidenoteProvider>
      <CurriculumMdxPage slug="pretraining-basics" components={components} />
    </AbbrSidenoteProvider>
  )
}
