'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { BrandCard } from '@/components/ui/brand-card'
import type { ModelTagId } from '@/lib/models/tags'
import { getTag, isValidTagId } from '@/lib/models/tags'

type BrandCardProps = Parameters<typeof BrandCard>[0]
type FrontierCard = BrandCardProps & {
  key: string
  tags: ModelTagId[]
}

type FrontierModelsSectionProps = {
  cards: FrontierCard[]
  tags: ModelTagId[]
}

const fadeDurationMs = 200
const featuredTagCountMobile = 6
const featuredTagCountDesktop = 18

export default function FrontierModelsSection({ cards, tags }: FrontierModelsSectionProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const requestedTag = searchParams.get('tag') ?? ''
  const activeTag = isValidTagId(requestedTag) ? requestedTag : ''

  const filteredCards = useMemo(() => {
    if (!activeTag) return cards
    return cards.filter((card) => card.tags.includes(activeTag as ModelTagId))
  }, [activeTag, cards])

  const [displayedCards, setDisplayedCards] = useState(filteredCards)
  const [isFading, setIsFading] = useState(false)
  const [isTagPickerOpen, setIsTagPickerOpen] = useState(false)
  const [tagQuery, setTagQuery] = useState('')
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false)

  useEffect(() => {
    setIsFading(true)
    const timeout = setTimeout(() => {
      setDisplayedCards(filteredCards)
      requestAnimationFrame(() => setIsFading(false))
    }, fadeDurationMs)
    return () => clearTimeout(timeout)
  }, [filteredCards])

  const updateTag = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (tag) {
      params.set('tag', tag)
    } else {
      params.delete('tag')
    }
    const query = params.toString()
    router.replace(`${pathname}${query ? `?${query}` : ''}`, { scroll: false })
  }

  const featuredTagsMobile = tags.slice(0, featuredTagCountMobile)
  const featuredTagsDesktop = tags.slice(0, featuredTagCountDesktop)
  const filteredTagOptions = tagQuery
    ? tags.filter((tag) => getTag(tag).label.toLowerCase().includes(tagQuery.trim().toLowerCase()))
    : tags
  const desktopTags = isDesktopExpanded ? tags : featuredTagsDesktop

  return (
    <>
      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Tags</h2>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => updateTag('')}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeTag
                ? 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                : 'border-slate-900 bg-slate-900 text-white'
              }`}
          >
            All
          </button>
          {featuredTagsMobile.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => updateTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeTag === tag
                  ? 'border-slate-900 bg-slate-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
            >
              {getTag(tag).label}
            </button>
          ))}
          {tags.length > featuredTagCountMobile ? (
            <button
              type="button"
              onClick={() => setIsTagPickerOpen(true)}
              className="rounded-full border border-dashed border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300"
            >
              More
            </button>
          ) : null}
        </div>
        <div className="mt-4 hidden flex-wrap gap-2 sm:flex">
          <button
            type="button"
            onClick={() => updateTag('')}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeTag
                ? 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                : 'border-slate-900 bg-slate-900 text-white'
              }`}
          >
            All
          </button>
          {desktopTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => updateTag(tag)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeTag === tag
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
            >
              {getTag(tag).label}
            </button>
          ))}
          {tags.length > featuredTagCountDesktop ? (
            <button
              type="button"
              onClick={() => setIsDesktopExpanded((current) => !current)}
              className="rounded-full border border-dashed border-slate-200 px-3 py-1 text-xs font-medium text-slate-500 transition hover:border-slate-300"
            >
              {isDesktopExpanded ? 'Less' : 'More'}
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900">Frontier models</h2>
        <div className={`mt-6 flex flex-col gap-6 transition-opacity duration-200 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
          {displayedCards.length ? (
            displayedCards.map(({ key, tags: cardTags, ...cardProps }) => (
              <BrandCard key={key} tags={cardTags.map((tag) => getTag(tag).label)} {...cardProps} />
            ))
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500">
              No models match this tag yet.
            </div>
          )}
        </div>
      </div>

      {isTagPickerOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/40"
            aria-label="Close tag list"
            onClick={() => setIsTagPickerOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 rounded-t-2xl bg-white px-4 pb-6 pt-5 shadow-2xl sm:inset-auto sm:right-8 sm:top-24 sm:bottom-auto sm:w-[420px] sm:rounded-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">All tags</h3>
              <button
                type="button"
                onClick={() => setIsTagPickerOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>
            <div className="mt-4">
              <label className="sr-only" htmlFor="tag-search">
                Search tags
              </label>
              <input
                id="tag-search"
                type="search"
                value={tagQuery}
                onChange={(event) => setTagQuery(event.target.value)}
                placeholder="Search tags"
                className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 outline-none transition focus:border-slate-300"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  updateTag('')
                  setIsTagPickerOpen(false)
                }}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeTag
                    ? 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    : 'border-slate-900 bg-slate-900 text-white'
                  }`}
              >
                All
              </button>
              {filteredTagOptions.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    updateTag(tag)
                    setIsTagPickerOpen(false)
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${activeTag === tag
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                >
                  {getTag(tag).label}
                </button>
              ))}
            </div>
            {!filteredTagOptions.length ? (
              <p className="mt-4 text-sm text-slate-500">No tags match that search.</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
