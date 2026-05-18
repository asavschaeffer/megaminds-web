import type { ReactNode } from 'react'
import { getCurriculumLesson } from '@/lib/curriculum'
import { LessonHeader } from './lesson-header'
import { LessonNavigation } from './lesson-navigation'

type CurriculumLessonPageProps = {
  children: ReactNode
  slug: string
  containerClassName?: string
  proseClassName?: string
  showNavigation?: boolean
}

export function CurriculumLessonPage({
  children,
  slug,
  containerClassName = 'mx-auto max-w-3xl',
  proseClassName = 'prose prose-lg max-w-none text-gray-700 space-y-6',
  showNavigation = true,
}: CurriculumLessonPageProps) {
  const lesson = getCurriculumLesson(slug)

  return (
    <div className="py-16 px-6 lg:px-8 bg-white">
      <div className={containerClassName}>
        <LessonHeader
          moduleLabel={lesson.moduleLabel}
          moduleTitle={lesson.module.title}
          title={lesson.title}
          description={lesson.description ?? lesson.module.description}
        />
        <div className={proseClassName}>
          {children}
          {showNavigation && <LessonNavigation slug={slug} />}
        </div>
      </div>
    </div>
  )
}
