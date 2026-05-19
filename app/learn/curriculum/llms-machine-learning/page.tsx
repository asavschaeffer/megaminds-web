import Link from 'next/link'
import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { NextWordDiagram, TwoFilesDiagram, CompressionDiagram } from '@/components/learn/curriculum/demos/llms-machine-learning'

const components = {
  NextWordDiagram,
  TwoFilesDiagram,
  CompressionDiagram,
  Link,
} satisfies CurriculumMdxComponents

export default function LLMsMachineLearningPage() {
  return <CurriculumMdxPage slug="llms-machine-learning" components={components} />
}
