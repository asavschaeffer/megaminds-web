import type { ModelLinks } from '@/lib/models/types'
import type { ModelLinkTypeId } from '@/lib/models/link-types'
import { getLinkType, isValidLinkTypeId } from '@/lib/models/link-types'
import { ArrowRight } from 'lucide-react'

type LinkCard = ReturnType<typeof getLinkType> & { href: string }

const buildCards = (links: ModelLinks): LinkCard[] => {
  return Object.entries(links)
    .filter(([key, href]) => Boolean(href) && isValidLinkTypeId(key))
    .map(([key, href]) => ({ ...getLinkType(key as ModelLinkTypeId), href: href as string }))
}

export const CTACards = ({ links }: { links: ModelLinks }) => {
  const cards = buildCards(links)

  if (cards.length === 0) return null

  const gridCols =
    cards.length === 1
      ? ''
      : cards.length === 2
        ? 'sm:grid-cols-2'
        : cards.length <= 4
          ? 'sm:grid-cols-2 lg:grid-cols-4'
          : 'sm:grid-cols-2 md:grid-cols-3'

  return (
    <nav aria-label="External resources and quick links" className="max-w-5xl mx-auto px-6 md:px-8 py-12">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6">Resources</h2>
      <ul className={`grid gap-4 ${gridCols} list-none`} role="list">
        {cards.map((card) => (
          <li key={card.id}>
            <a
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col h-full p-5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-200"
            >
              <ArrowRight className="absolute top-4 right-4 w-3.5 h-3.5 text-neutral-300 dark:text-neutral-600 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
              <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-3 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                <card.icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1">{card.label}</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 flex-1 line-clamp-2">{card.description}</p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default CTACards
