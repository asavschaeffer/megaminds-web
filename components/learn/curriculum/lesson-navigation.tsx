import Link from 'next/link'
import { getCurriculumLessonNeighbors } from '@/lib/curriculum'

type LessonNavigationProps = {
  slug: string
}

export function LessonNavigation({ slug }: LessonNavigationProps) {
  const { previous, next } = getCurriculumLessonNeighbors(slug)

  if (!previous && !next) {
    return null
  }

  return (
    <nav className="mt-16 pt-8 border-t border-gray-200 not-prose" aria-label="Lesson navigation">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {previous ? (
          <LessonNavLink direction="previous" href={`/learn/curriculum/${previous.slug}`}>
            {previous.title}
          </LessonNavLink>
        ) : (
          <span />
        )}

        {next && (
          <LessonNavLink direction="next" href={`/learn/curriculum/${next.slug}`}>
            {next.title}
          </LessonNavLink>
        )}
      </div>
    </nav>
  )
}

type LessonNavLinkProps = {
  children: string
  direction: 'previous' | 'next'
  href: string
}

function LessonNavLink({ children, direction, href }: LessonNavLinkProps) {
  const label = direction === 'previous' ? 'Previous' : 'Next'

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
    >
      {direction === 'previous' && <span aria-hidden="true">&larr;</span>}
      <span>
        {label}: {children}
      </span>
      {direction === 'next' && <span aria-hidden="true">&rarr;</span>}
    </Link>
  )
}
