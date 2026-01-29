'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import { getGlossary } from '@/lib/glossary'
import type { GlossaryTerm } from '@/lib/glossary'

/* ─── Sidenote (centered in right margin) ─── */

let sidenoteCounter = 0
const sidenoteRegistry = new Map<number, {
  note: HTMLElement
  desiredTop: number
  height: number
  width: number
  right: number
}>()
let layoutScheduled = false

type AbbrRegistry = {
  register: (key: string) => boolean
}

const AbbrSidenoteContext = createContext<AbbrRegistry | null>(null)

function resetSidenotes() {
  sidenoteCounter = 0
  sidenoteRegistry.clear()
  layoutScheduled = false
}

export function AbbrSidenoteProvider({ children }: { children: ReactNode }) {
  const seenRef = useRef(new Set<string>())
  const registry = useMemo<AbbrRegistry>(() => ({
    register: (key: string) => {
      if (seenRef.current.has(key)) return false
      seenRef.current.add(key)
      return true
    },
  }), [])

  return (
    <AbbrSidenoteContext.Provider value={registry}>
      {children}
    </AbbrSidenoteContext.Provider>
  )
}

const CONTENT_MAX_WIDTH = 768 // max-w-3xl
const MIN_SIDENOTE_WIDTH = 160
const MAX_SIDENOTE_WIDTH = 240
const MARGIN_PADDING = 16 // padding from content edge and viewport edge
const SIDENOTE_GAP = 12

function scheduleSidenoteLayout() {
  if (layoutScheduled) return
  layoutScheduled = true
  requestAnimationFrame(() => {
    layoutScheduled = false
    const entries = Array.from(sidenoteRegistry.values())
      .filter((entry) => entry.note.isConnected)
      .sort((a, b) => a.desiredTop - b.desiredTop)

    let lastBottom = -Infinity
    for (const entry of entries) {
      const top = Math.max(entry.desiredTop, lastBottom + SIDENOTE_GAP)
      entry.note.style.top = `${top}px`
      entry.note.style.right = `${entry.right}px`
      entry.note.style.width = `${entry.width}px`
      lastBottom = top + entry.height
    }
  })
}

export interface SidenoteProps {
  children: ReactNode
  label?: string
  contentMaxWidth?: number
}

export function Sidenote({ children, label, contentMaxWidth = CONTENT_MAX_WIDTH }: SidenoteProps) {
  const containerRef = useRef<HTMLSpanElement>(null)
  const noteRef = useRef<HTMLElement>(null)
  const noteIdRef = useRef<number | null>(null)
  const [marginSpace, setMarginSpace] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [mobilePopoverStyle, setMobilePopoverStyle] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)

  // Calculate available margin space
  useEffect(() => {
    const calculate = () => {
      const viewportWidth = window.innerWidth
      const margin = (viewportWidth - contentMaxWidth) / 2
      setMarginSpace(margin)
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [contentMaxWidth])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Position sidenote centered in right margin
  useEffect(() => {
    if (!containerRef.current || !noteRef.current) return

    const usableMargin = marginSpace - MARGIN_PADDING * 2
    if (usableMargin < MIN_SIDENOTE_WIDTH) {
      const noteId = noteIdRef.current
      if (noteId !== null) {
        sidenoteRegistry.delete(noteId)
        scheduleSidenoteLayout()
      }
      return
    }

    if (noteIdRef.current === null) {
      sidenoteCounter += 1
      noteIdRef.current = sidenoteCounter
    }

    const updatePosition = () => {
      const container = containerRef.current
      const note = noteRef.current
      if (!container || !note) return

      const rect = container.getBoundingClientRect()
      const noteWidth = Math.min(MAX_SIDENOTE_WIDTH, usableMargin)

      // Center the sidenote in the right margin
      const rightOffset = (marginSpace - noteWidth) / 2

      note.style.position = 'fixed'
      note.style.right = `${rightOffset}px`
      note.style.width = `${noteWidth}px`

      const height = note.getBoundingClientRect().height
      const noteId = noteIdRef.current
      if (noteId === null) return

      sidenoteRegistry.set(noteId, {
        note,
        desiredTop: rect.top,
        height,
        width: noteWidth,
        right: rightOffset,
      })
      scheduleSidenoteLayout()
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
      const noteId = noteIdRef.current
      if (noteId !== null) {
        sidenoteRegistry.delete(noteId)
        scheduleSidenoteLayout()
      }
    }
  }, [marginSpace, contentMaxWidth])

  const showSidenote = marginSpace - MARGIN_PADDING * 2 >= MIN_SIDENOTE_WIDTH
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (showSidenote && isModalOpen) setIsModalOpen(false)
  }, [showSidenote, isModalOpen])

  useEffect(() => {
    if (!isModalOpen || showSidenote) {
      setMobilePopoverStyle(null)
      return
    }

    const updatePosition = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const padding = 16
      const maxWidth = 288
      const width = Math.min(maxWidth, Math.max(0, viewportWidth - padding * 2))
      const left = Math.min(
        Math.max(rect.left, padding),
        viewportWidth - width - padding
      )
      const top = rect.bottom + 8

      setMobilePopoverStyle({ top, left, width })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isModalOpen, showSidenote])

  return (
    <>
      <span
        ref={containerRef}
        className="relative inline"
        onClick={() => !showSidenote && setIsModalOpen(true)}
      >
        <span
          className={`sidenote-trigger text-gray-700 dark:text-gray-300 ${!showSidenote ? 'cursor-pointer hover:text-gray-600 dark:hover:text-gray-200' : ''}`}
          title={showSidenote ? undefined : 'Click for definition'}
        >
          {label}
        </span>
      </span>

      {/* Desktop: fixed sidenote centered in right margin */}
      {isMounted && showSidenote && createPortal(
        <aside
          ref={noteRef}
          className="fixed z-40 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-3 shadow-sm"
          aria-label={`Note: ${label}`}
        >
          <p className="text-[0.8125rem] leading-relaxed text-gray-600 dark:text-gray-400">{children}</p>
        </aside>,
        document.body
      )}

      {/* Mobile: popover under the word */}
      {isMounted && isModalOpen && !showSidenote && mobilePopoverStyle && createPortal(
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsModalOpen(false)} aria-hidden="true" />
          <aside
            className="fixed z-50 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-800 p-4"
            style={{ top: mobilePopoverStyle.top, left: mobilePopoverStyle.left, width: mobilePopoverStyle.width }}
            aria-label={`Note: ${label}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-end mb-1">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors -mt-2 -mr-2"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{children}</p>
          </aside>
        </>,
        document.body
      )}
    </>
  )
}

export interface AbbrSidenoteProps {
  term?: GlossaryTerm
  title?: string
  definition?: string
  force?: boolean
  children: ReactNode
  contentMaxWidth?: number
}

/**
 * Wrapper component that converts an <abbr> element into a sidenote.
 * Use this instead of <abbr> when you want sidenote behavior.
 */
export function AbbrSidenote({ term, title, definition, force = false, children, contentMaxWidth }: AbbrSidenoteProps) {
  const glossaryEntry = term ? getGlossary(term) : undefined
  const resolvedTitle = title ?? glossaryEntry?.title ?? (typeof children === 'string' ? children : '')
  const resolvedDefinition = definition ?? glossaryEntry?.definition ?? resolvedTitle
  const identity = term ?? resolvedTitle ?? (typeof children === 'string' ? children : '')
  const registry = useContext(AbbrSidenoteContext)
  const [isPrimary, setIsPrimary] = useState(true)
  const containerRef = useRef<HTMLSpanElement>(null)
  const noteRef = useRef<HTMLElement>(null)
  const noteIdRef = useRef<number | null>(null)
  const [marginSpace, setMarginSpace] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [mobilePopoverStyle, setMobilePopoverStyle] = useState<{
    top: number
    left: number
    width: number
  } | null>(null)

  useEffect(() => {
    if (force) {
      setIsPrimary(true)
      return
    }
    if (!registry || !identity) {
      setIsPrimary(true)
      return
    }
    setIsPrimary(registry.register(identity))
  }, [force, identity, registry])

  // Calculate available margin space
  useEffect(() => {
    if (!isPrimary) return
    const calculate = () => {
      const viewportWidth = window.innerWidth
      const margin = (viewportWidth - (contentMaxWidth || CONTENT_MAX_WIDTH)) / 2
      setMarginSpace(margin)
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [contentMaxWidth])

  useEffect(() => {
    if (!isPrimary) return
    setIsMounted(true)
  }, [])

  // Position sidenote centered in right margin
  useEffect(() => {
    if (!isPrimary) return
    if (!containerRef.current || !noteRef.current) return

    const usableMargin = marginSpace - MARGIN_PADDING * 2
    if (usableMargin < MIN_SIDENOTE_WIDTH) {
      const noteId = noteIdRef.current
      if (noteId !== null) {
        sidenoteRegistry.delete(noteId)
        scheduleSidenoteLayout()
      }
      return
    }

    if (noteIdRef.current === null) {
      sidenoteCounter += 1
      noteIdRef.current = sidenoteCounter
    }

    const updatePosition = () => {
      const container = containerRef.current
      const note = noteRef.current
      if (!container || !note) return

      const rect = container.getBoundingClientRect()
      const noteWidth = Math.min(MAX_SIDENOTE_WIDTH, usableMargin)

      // Center the sidenote in the right margin
      const rightOffset = (marginSpace - noteWidth) / 2

      note.style.position = 'fixed'
      note.style.right = `${rightOffset}px`
      note.style.width = `${noteWidth}px`

      const height = note.getBoundingClientRect().height
      const noteId = noteIdRef.current
      if (noteId === null) return

      sidenoteRegistry.set(noteId, {
        note,
        desiredTop: rect.top,
        height,
        width: noteWidth,
        right: rightOffset,
      })
      scheduleSidenoteLayout()
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
      const noteId = noteIdRef.current
      if (noteId !== null) {
        sidenoteRegistry.delete(noteId)
        scheduleSidenoteLayout()
      }
    }
  }, [marginSpace, contentMaxWidth])

  const showSidenote = marginSpace - MARGIN_PADDING * 2 >= MIN_SIDENOTE_WIDTH
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!isPrimary) return
    if (showSidenote && isModalOpen) setIsModalOpen(false)
  }, [showSidenote, isModalOpen])

  useEffect(() => {
    if (!isPrimary) return
    if (!isModalOpen || showSidenote) {
      setMobilePopoverStyle(null)
      return
    }

    const updatePosition = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const padding = 16
      const maxWidth = 288
      const width = Math.min(maxWidth, Math.max(0, viewportWidth - padding * 2))
      const left = Math.min(
        Math.max(rect.left, padding),
        viewportWidth - width - padding
      )
      const top = rect.bottom + 8

      setMobilePopoverStyle({ top, left, width })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [isModalOpen, showSidenote, isPrimary])

  if (!isPrimary) {
    return <>{children}</>
  }

  return (
    <>
      <span
        ref={containerRef}
        className="relative inline"
        onClick={() => !showSidenote && setIsModalOpen(true)}
      >
        <abbr
          title={resolvedTitle}
          className={`sidenote-trigger text-gray-700 dark:text-gray-300 ${!showSidenote ? 'cursor-pointer hover:text-gray-600 dark:hover:text-gray-200' : ''}`}
        >
          {children}
        </abbr>
      </span>

      {/* Desktop: fixed sidenote centered in right margin */}
      {isMounted && showSidenote && createPortal(
        <aside
          ref={noteRef}
          className="fixed z-40 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-lg p-3 shadow-sm"
          aria-label={`Note: ${children}`}
        >
          <p className="text-[0.8125rem] leading-relaxed text-gray-600 dark:text-gray-400">
            <strong>{resolvedTitle}</strong> {resolvedDefinition}
          </p>
        </aside>,
        document.body
      )}

      {/* Mobile: popover under the word */}
      {isMounted && isModalOpen && !showSidenote && mobilePopoverStyle && createPortal(
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsModalOpen(false)} aria-hidden="true" />
          <aside
            className="fixed z-50 w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-neutral-900 rounded-lg shadow-xl border border-gray-200 dark:border-neutral-800 p-4"
            style={{ top: mobilePopoverStyle.top, left: mobilePopoverStyle.left, width: mobilePopoverStyle.width }}
            aria-label={`Note: ${children}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-end mb-1">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors -mt-2 -mr-2"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              <strong>{resolvedTitle}</strong> {resolvedDefinition}
            </p>
          </aside>
        </>,
        document.body
      )}
    </>
  )
}

export { resetSidenotes }

export interface GlossarySidenoteProps {
  term: GlossaryTerm
  label?: string
  contentMaxWidth?: number
}

export function GlossarySidenote({ term, label, contentMaxWidth }: GlossarySidenoteProps) {
  const entry = getGlossary(term)
  return (
    <Sidenote label={label ?? term} contentMaxWidth={contentMaxWidth}>
      <strong>{entry.title}</strong> {entry.definition}
    </Sidenote>
  )
}

