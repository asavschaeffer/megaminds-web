import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { FewShotDemo, ExampleTypes, RealExampleCard } from '@/components/learn/curriculum/demos/examples'

const components = {
  FewShotDemo,
  ExampleTypes,
  RealExampleCard,
} satisfies CurriculumMdxComponents

export default function ExamplesPage() {
  return <CurriculumMdxPage slug="examples" components={components} />
}
