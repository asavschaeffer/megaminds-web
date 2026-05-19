import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { CanvasChatComparison, ContextConsumptionDemo, RealExamples, BestPractices } from '@/components/learn/curriculum/demos/canvas-mode'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'

const components = {
  CanvasChatComparison,
  ContextConsumptionDemo,
  RealExamples,
  BestPractices,
}

export default function CanvasModePage() {
  const content = getCurriculumMdx('canvas-mode')

  return (
    <CurriculumLessonPage slug="canvas-mode">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
