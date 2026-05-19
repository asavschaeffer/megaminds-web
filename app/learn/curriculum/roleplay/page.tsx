import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { PersonaSwitcher, RoleplayPatterns, ExampleCard } from '@/components/learn/curriculum/demos/roleplay'

const components = {
  PersonaSwitcher,
  RoleplayPatterns,
  ExampleCard,
} satisfies CurriculumMdxComponents

export default function RoleplayPage() {
  return <CurriculumMdxPage slug="roleplay" components={components} />
}
