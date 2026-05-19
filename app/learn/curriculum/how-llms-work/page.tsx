import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { Diagram1_InformationHighways, Diagram2_InformationPaths, Diagram3_CausalGraph } from '@/components/learn/curriculum/demos/how-llms-work'

const components = {
  Diagram1_InformationHighways,
  Diagram2_InformationPaths,
  Diagram3_CausalGraph,
} satisfies CurriculumMdxComponents

export default function HowLLMsWorkPage() {
  return (
    <CurriculumMdxPage
      slug="how-llms-work"
      components={components}
      containerClassName="mx-auto max-w-4xl"
      proseClassName="prose prose-lg max-w-none text-gray-700"
      showNavigation={false}
    />
  )
}
