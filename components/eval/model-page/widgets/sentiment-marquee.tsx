import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { SentimentMarqueeProps } from '@/lib/models/types'

export const SentimentMarquee = ({ items }: SentimentMarqueeProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [updateScrollState])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 340
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  const sentimentLabel = {
    positive: 'Positive sentiment',
    neutral: 'Neutral sentiment',
    critical: 'Critical sentiment',
  }

  const sentimentDot = {
    positive: 'bg-green-400',
    neutral: 'bg-amber-400',
    critical: 'bg-red-400',
  }

  return (
    <aside aria-label="Community reactions and testimonials" className="relative group">
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-50 dark:hover:bg-neutral-700"
          aria-label="Scroll testimonials left"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-300" aria-hidden="true" />
        </button>
      )}

      <div ref={scrollRef} className="overflow-x-auto py-10 scrollbar-hide scroll-smooth" role="region" aria-label="Scrollable testimonials">
        <ul className="flex gap-5 px-6 md:px-12 w-max list-none" role="list">
          {items.map((item, idx) => (
            <li key={idx} className="flex-shrink-0 w-80">
              <figure className="h-full p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors snap-start">
                <blockquote className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4 line-clamp-3">
                  <p>&ldquo;{item.content}&rdquo;</p>
                </blockquote>
                <figcaption className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <cite className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate not-italic">
                      {item.author}
                    </cite>
                    {item.handle && (
                      <span className="text-xs text-neutral-400 dark:text-neutral-500 truncate">{item.handle}</span>
                    )}
                  </div>
                  <span
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${sentimentDot[item.sentiment]}`}
                    title={sentimentLabel[item.sentiment]}
                    aria-label={sentimentLabel[item.sentiment]}
                  />
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-50 dark:hover:bg-neutral-700"
          aria-label="Scroll testimonials right"
        >
          <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-300" aria-hidden="true" />
        </button>
      )}
    </aside>
  )
}

export default SentimentMarquee
