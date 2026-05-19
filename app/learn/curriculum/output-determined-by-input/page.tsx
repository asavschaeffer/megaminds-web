import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { DeterministicDemo, InputVisualization, TemperatureDemo } from '@/components/learn/curriculum/demos/output-determined-by-input'

const components = {
  DeterministicDemo,
  InputVisualization,
  TemperatureDemo,
}
export default function OutputDeterminedByInputPage() {
  const content = getCurriculumMdx('output-determined-by-input')

  return (
    <CurriculumLessonPage slug="output-determined-by-input">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
