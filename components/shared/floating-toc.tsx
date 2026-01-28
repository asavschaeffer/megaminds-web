'use client'

import { useEffect, useRef, useState } from 'react'
import type { MouseEvent } from 'react'

export type FloatingTocItem = {
  id: string
  label: string
}

export interface FloatingTocProps {
  items: FloatingTocItem[]
  activeId: string | null
  variant?: 'margin-left' | 'fixed-left'
  show?: boolean
  showAfterScrollY?: number
  contentMaxWidth?: number
  minWidth?: number
  maxWidth?: number
  marginPadding?: number
  heading?: string
  ariaLabel?: string
  containerClassName?: string
  transitionClassName?: string
  headingClassName?: string
  listClassName?: string
  linkClassName?: string
  activeLinkClassName?: string
  inactiveLinkClassName?: string
  enableSmoothScroll?: boolean
}

export const FloatingToc = ({
  items,
  activeId,
  variant = 'margin-left',
  show = true,
  showAfterScrollY,
  contentMaxWidth = 768,
  minWidth = 140,
  maxWidth = 180,
  marginPadding = 16,
  heading,
  ariaLabel = 'Table of contents',
  containerClassName = '',
  transitionClassName = 'transition-opacity duration-200',
  headingClassName = '',
  listClassName = '',
  linkClassName = '',
  activeLinkClassName = '',
  inactiveLinkClassName = '',
  enableSmoothScroll = false,
}: FloatingTocProps) => {
  const navRef = useRef<HTMLElement>(null)
  const [marginSpace, setMarginSpace] = useState(0)
  const [scrolledPast, setScrolledPast] = useState(showAfterScrollY == null)

  useEffect(() => {
    if (variant !== 'margin-left') return
    const calculate = () => {
      const viewportWidth = window.innerWidth
      const margin = Math.max(0, (viewportWidth - contentMaxWidth) / 2)
      setMarginSpace(margin)
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [contentMaxWidth, variant])

  useEffect(() => {
    if (variant !== 'margin-left') return
    if (!navRef.current) return

    const usableMargin = marginSpace - marginPadding * 2
    if (usableMargin < minWidth) return

    const updatePosition = () => {
      const nav = navRef.current
      if (!nav) return

      const tocWidth = Math.min(maxWidth, usableMargin)
      const leftOffset = marginSpace - marginPadding - tocWidth

      nav.style.left = `${leftOffset}px`
      nav.style.width = `${tocWidth}px`
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [marginPadding, marginSpace, maxWidth, minWidth, variant])

  useEffect(() => {
    if (showAfterScrollY == null) return
    const handleScroll = () => {
      setScrolledPast(window.scrollY > showAfterScrollY)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScrollY])

  const hasRoom = variant !== 'margin-left' || marginSpace - marginPadding * 2 >= minWidth
  const isVisible = Boolean(show) && (showAfterScrollY == null ? true : scrolledPast) && hasRoom

  const handleClick = enableSmoothScroll
    ? (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault()
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    : undefined

  if (items.length === 0) return null

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className={`fixed z-40 ${transitionClassName} ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${containerClassName}`}
    >
      {heading && <p className={headingClassName}>{heading}</p>}
      <ol className={listClassName}>
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={handleClick ? (event) => handleClick(event, item.id) : undefined}
                aria-current={isActive ? 'location' : undefined}
                className={`${linkClassName} ${isActive ? activeLinkClassName : inactiveLinkClassName}`}
              >
                {item.label}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default FloatingToc
