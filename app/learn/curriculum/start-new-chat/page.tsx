import { CurriculumMdxPage, type CurriculumMdxComponents } from '@/components/learn/curriculum/curriculum-mdx-page'
import { LessonRecap } from '@/components/learn/curriculum/teaching-blocks'
import { StartNewChatButton, WhenToStartFresh, HowToStartFresh, FreshStartExample } from '@/components/learn/curriculum/demos/start-new-chat'

const components = {
  StartNewChatButton,
  WhenToStartFresh,
  HowToStartFresh,
  FreshStartExample,
  LessonRecap,
} satisfies CurriculumMdxComponents

export default function StartNewChatPage() {
  return <CurriculumMdxPage slug="start-new-chat" components={components} />
}
