'use client'

import { Children, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

/**
 * ProbeGallery — shows one of several probe-run samples (poem or ASCII-art
 * self-portrait) at random, with a shuffle affordance and a "n / total"
 * position indicator.
 *
 * Probes are sampled 3x per model against a fixed, identical-for-every-model
 * system prompt (see `sysprompt-poem` / `sysprompt-ascii-art` in
 * lib/models/section-catalog.ts); this component picks one to show instead
 * of dumping all three inline.
 *
 * MDX usage — one child per sample, in run order:
 *
 *   <ProbeGallery variant="poem" label="Poem">
 *     {`Sample 1, line one
 *     line two...`}
 *     {`Sample 2...`}
 *     {`Sample 3...`}
 *   </ProbeGallery>
 *
 *   <ProbeGallery variant="ascii" label="ASCII self-portrait">
 *     {`  /\\_/\\
 *      ( o.o )   <- sample 1
 *       > ^ <`}
 *     {`sample 2 art...`}
 *     {`sample 3 art...`}
 *   </ProbeGallery>
 *
 * Each child is rendered verbatim (a template-literal string is the natural
 * fit — it preserves line breaks with no extra markup). `variant` controls
 * whitespace handling: `poem` wraps with preserved line breaks, `ascii` is
 * monospace in a horizontally-scrollable box so wide art never breaks the
 * page layout.
 *
 * Hydration: sample 0 renders on the server and on first client paint; a
 * `useEffect` (not a `useState` initializer, and never render itself) then
 * picks a random sample once mounted. This keeps SSR and first-paint HTML
 * identical, so React never reports a hydration mismatch.
 */
export interface ProbeGalleryProps {
  /** One sample per child, in run order. */
  children: ReactNode
  variant?: 'poem' | 'ascii'
  /** aria-label for the sample region; defaults based on `variant`. */
  label?: string
}

export function ProbeGallery({ children, variant = 'poem', label }: ProbeGalleryProps) {
  const samples = Children.toArray(children)
  const count = samples.length
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (count > 1) {
      setIndex(Math.floor(Math.random() * count))
    }
  }, [count])

  if (count === 0) return null

  const shuffle = () => {
    if (count < 2) return
    setIndex((prev) => (prev + 1 + Math.floor(Math.random() * (count - 1))) % count)
  }

  const regionLabel = label ?? (variant === 'ascii' ? 'ASCII self-portrait sample' : 'Poem sample')

  return (
    <div className="my-6 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
      <div
        role="region"
        aria-label={regionLabel}
        aria-live="polite"
        className={variant === 'ascii' ? 'overflow-x-auto bg-neutral-50 dark:bg-neutral-900 px-6 py-4' : 'px-6 py-4'}
      >
        <div
          className={
            variant === 'ascii'
              ? 'font-mono text-xs leading-relaxed whitespace-pre text-neutral-800 dark:text-neutral-200 w-fit'
              : 'whitespace-pre-wrap text-sm leading-relaxed text-neutral-700 dark:text-neutral-300'
          }
        >
          {samples[index]}
        </div>
      </div>
      {count > 1 && (
        <div className="flex items-center justify-between gap-4 px-6 py-2 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50">
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {index + 1} / {count}
          </span>
          <button
            type="button"
            onClick={shuffle}
            aria-label="Show another sample"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
          >
            <span aria-hidden="true">🎲</span> Show another
          </button>
        </div>
      )}
    </div>
  )
}

export default ProbeGallery
