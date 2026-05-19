import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { Diagram1_InformationHighways, Diagram2_InformationPaths, Diagram3_CausalGraph } from '@/components/learn/curriculum/demos/how-llms-work'

const components = {
  Diagram1_InformationHighways,
  Diagram2_InformationPaths,
  Diagram3_CausalGraph,
}
export default function HowLLMsWorkPage() {
  const content = getCurriculumMdx('how-llms-work')

  return (
    <CurriculumLessonPage slug="how-llms-work" containerClassName="mx-auto max-w-4xl" proseClassName="prose prose-lg max-w-none text-gray-700" showNavigation={false}>
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
