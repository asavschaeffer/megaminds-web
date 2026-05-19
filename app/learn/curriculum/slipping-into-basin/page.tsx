import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { BasinVisualization, TwoFailureRule, BasinSigns, EscapeStrategy, DeathSpiralExample } from '@/components/learn/curriculum/demos/slipping-into-basin'

const components = {
  BasinVisualization,
  TwoFailureRule,
  BasinSigns,
  EscapeStrategy,
  DeathSpiralExample,
} satisfies CurriculumMdxComponents

export default function SlippingIntoBasinPage() {
  return <CurriculumMdxPage slug="slipping-into-basin" components={components} />
}
