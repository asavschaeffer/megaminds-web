'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { XCircle } from 'lucide-react'
import type { Definition } from '@/lib/models/types'

export interface DefinitionPopoverProps extends Definition {
  children: ReactNode
}

const DefinitionContent = ({ term, definition, furtherReading }: Definition) => (
  <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 shadow-sm">
    <dfn className="font-semibold text-neutral-900 dark:text-neutral-100 not-italic text-base block mb-2">{term}</dfn>
    <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">{definition}</p>
    {furtherReading && furtherReading.length > 0 && (
      <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
        <p className="text-xs font-semibold text-neutral-600 dark:text-neutral-400 mb-2 uppercase tracking-wider">
          Further Reading
        </p>
        <ul className="space-y-1.5">
          {furtherReading.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)

export const DefinitionPopover = ({ term, definition, furtherReading, children }: DefinitionPopoverProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLElement | null>(null)
  const [showSidenote, setShowSidenote] = useState(false)

  useEffect(() => {
    const checkBreakpoint = () => {
      setShowSidenote(window.innerWidth >= 1515)
    }
    checkBreakpoint()
    window.addEventListener('resize', checkBreakpoint)
    return () => window.removeEventListener('resize', checkBreakpoint)
  }, [])

  useEffect(() => {
    if (!showSidenote || !containerRef.current || !popoverRef.current) return

    const updatePosition = () => {
      const container = containerRef.current
      const popover = popoverRef.current
      if (!container || !popover) return

      const rect = container.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const contentMaxWidth = 896
      const margin = Math.max(0, (viewportWidth - contentMaxWidth) / 2)

      popover.style.position = 'fixed'
      popover.style.right = '24px'
      popover.style.top = `${rect.top}px`

      const availableWidth = margin - 24 - 24
      popover.style.width = `${Math.max(200, Math.min(400, availableWidth))}px`
      popover.style.maxWidth = `${Math.max(200, Math.min(400, availableWidth))}px`
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [showSidenote])

  const handleClose = () => setIsModalOpen(false)

  return (
    <>
      <span ref={containerRef} className="relative inline-block" onClick={() => !showSidenote && setIsModalOpen(true)}>
        {children}
      </span>

      {showSidenote && (
        <aside ref={popoverRef} className="not-prose fixed right-6 z-40" aria-label={`Definition: ${term}`}>
          <DefinitionContent term={term} definition={definition} furtherReading={furtherReading} />
        </aside>
      )}

      {isModalOpen && !showSidenote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={handleClose} aria-hidden="true" />
          <aside
            className="not-prose relative z-10 w-full max-w-md bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-neutral-200 dark:border-neutral-800 p-6"
            aria-label={`Definition: ${term}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{term}</h3>
              <button
                onClick={handleClose}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                aria-label="Close definition"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            <DefinitionContent term={term} definition={definition} furtherReading={furtherReading} />
          </aside>
        </div>
      )}
    </>
  )
}

export default DefinitionPopover
