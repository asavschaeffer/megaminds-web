import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { DeterministicDemo, InputVisualization, TemperatureDemo } from '@/components/learn/curriculum/demos/output-determined-by-input'

const components = {
  DeterministicDemo,
  InputVisualization,
  TemperatureDemo,
} satisfies CurriculumMdxComponents

export default function OutputDeterminedByInputPage() {
  return <CurriculumMdxPage slug="output-determined-by-input" components={components} />
}
