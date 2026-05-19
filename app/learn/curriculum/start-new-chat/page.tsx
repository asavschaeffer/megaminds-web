import { MDXRemote } from 'next-mdx-remote/rsc'
import { CurriculumLessonPage } from '@/components/learn/curriculum/lesson-page'
import { getCurriculumMdx } from '@/lib/curriculum-mdx'
import { LessonRecap } from '@/components/learn/curriculum/teaching-blocks'
import { StartNewChatButton, WhenToStartFresh, HowToStartFresh, FreshStartExample } from '@/components/learn/curriculum/demos/start-new-chat'

const components = {
  StartNewChatButton,
  WhenToStartFresh,
  HowToStartFresh,
  FreshStartExample,
  LessonRecap,
}
export default function StartNewChatPage() {
  const content = getCurriculumMdx('start-new-chat')

  return (
    <CurriculumLessonPage slug="start-new-chat">
      <MDXRemote source={content} components={components} />
    </CurriculumLessonPage>
  )
}
