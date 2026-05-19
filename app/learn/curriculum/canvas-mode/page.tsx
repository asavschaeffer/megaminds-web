import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { CanvasChatComparison, ContextConsumptionDemo, RealExamples, BestPractices } from '@/components/learn/curriculum/demos/canvas-mode'

const components = {
  CanvasChatComparison,
  ContextConsumptionDemo,
  RealExamples,
  BestPractices,
} satisfies CurriculumMdxComponents

export default function CanvasModePage() {
  return <CurriculumMdxPage slug="canvas-mode" components={components} />
}
