import type { ContentSection } from '@/lib/models/types'
import { getTocSections } from '@/lib/models/sections'
import { FloatingToc } from '@/components/shared/floating-toc'

export const FloatingTOC = ({
  sections,
  activeId,
  show,
}: {
  sections: ContentSection[]
  activeId: string | null
  show: boolean
}) => {
  const titled = getTocSections(sections)
  const items = titled.map((section) => ({ id: section.id, label: section.title ?? section.id }))

  return (
    <FloatingToc
      items={items}
      activeId={activeId}
      show={show}
      variant="fixed-left"
      enableSmoothScroll
      containerClassName="hidden xl:block left-6 top-1/2 -translate-y-1/2 max-w-[180px]"
      listClassName="space-y-1 list-none"
      linkClassName="block text-xs py-1.5 pl-3 border-l-2 transition-all duration-200"
      activeLinkClassName="border-neutral-900 dark:border-neutral-100 text-neutral-900 dark:text-neutral-100 font-medium"
      inactiveLinkClassName="border-transparent text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-600"
    />
  )
}

export default FloatingTOC
