import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import Link from 'next/link'
import { NextWordDiagram, TwoFilesDiagram, CompressionDiagram } from '@/components/learn/curriculum/demos/llms-machine-learning'

const components = {
  NextWordDiagram,
  TwoFilesDiagram,
  CompressionDiagram,
  Link,
}
export default function LLMsMachineLearningPage() {
  const content = getCurriculumMdx('llms-machine-learning')

  return (
    <CurriculumLessonPage slug="llms-machine-learning">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
