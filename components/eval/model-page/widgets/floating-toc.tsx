import type { MouseEvent } from 'react'
import type { ContentSection } from '@/lib/models/types'
import { getTocSections } from '@/lib/models/sections'

export const FloatingTOC = ({
  sections,
  activeId,
  show,
}: {
  sections: ContentSection[]
  activeId: string
  show: boolean
}) => {
  const titled = getTocSections(sections)

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      aria-label="Table of contents"
      className={`hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 max-w-[180px] transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
    >
      <ul className="space-y-1 list-none" role="list">
        {titled.map((section) => {
          const isActive = activeId === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                aria-current={isActive ? 'location' : undefined}
                className={`block text-xs py-1.5 pl-3 border-l-2 transition-all duration-200 ${isActive
                    ? 'border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 font-medium'
                    : 'border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
              >
                {section.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default FloatingTOC
