import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { PersonaSwitcher, RoleplayPatterns, ExampleCard } from '@/components/learn/curriculum/demos/roleplay'

const components = {
  PersonaSwitcher,
  RoleplayPatterns,
  ExampleCard,
}
export default function RoleplayPage() {
  const content = getCurriculumMdx('roleplay')

  return (
    <CurriculumLessonPage slug="roleplay">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
