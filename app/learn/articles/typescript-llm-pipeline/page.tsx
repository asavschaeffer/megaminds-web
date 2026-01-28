'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'
import Link from 'next/link'

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

function resetSidenotes() {
  sidenoteCounter = 0
  sidenoteRegistry.clear()
  layoutScheduled = false
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

function Sidenote({ children, label }: { children: ReactNode; label?: string }) {
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
      const margin = (viewportWidth - CONTENT_MAX_WIDTH) / 2
      setMarginSpace(margin)
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

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
      // Right margin center is at: marginSpace / 2 from viewport right edge
      // So sidenote right edge should be at: marginSpace/2 - noteWidth/2
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
  }, [marginSpace])

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
          className={`text-gray-700 border-b border-dotted border-gray-400 ${!showSidenote ? 'cursor-pointer hover:text-gray-600' : ''}`}
          title={showSidenote ? undefined : 'Click for definition'}
        >
          {label}
        </span>
      </span>

      {/* Desktop: fixed sidenote centered in right margin */}
      {showSidenote && (
        <aside
          ref={noteRef}
          className="fixed z-40 bg-white border border-gray-200 rounded-lg p-3 shadow-sm"
          aria-label={`Note: ${label}`}
        >
          <p className="text-[0.8125rem] leading-relaxed text-gray-600">{children}</p>
        </aside>
      )}

      {/* Mobile: popover under the word */}
      {isMounted && isModalOpen && !showSidenote && mobilePopoverStyle && createPortal(
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsModalOpen(false)} aria-hidden="true" />
          <aside
            className="fixed z-50 w-72 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-xl border border-gray-200 p-4"
            style={{ top: mobilePopoverStyle.top, left: mobilePopoverStyle.left, width: mobilePopoverStyle.width }}
            aria-label={`Note: ${label}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-start justify-end mb-1">
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors -mt-2 -mr-2"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">{children}</p>
          </aside>
        </>,
        document.body
      )}
    </>
  )
}

/* ─── TOC Constants ─── */

const MIN_TOC_WIDTH = 140
const MAX_TOC_WIDTH = 180

/* ─── Sticky TOC ─── */

const tocSections = [
  { id: 'section-primer', label: 'TypeScript Primer' },
  { id: 'section-problem', label: 'The Problem' },
  { id: 'section-types', label: 'The Type System' },
  { id: 'section-template', label: 'The Template' },
  { id: 'section-dataflow', label: 'Data Flows' },
  { id: 'section-registries', label: 'Registries' },
  { id: 'section-workflow', label: 'LLM Workflow' },
  { id: 'section-library', label: 'Section Library' },
  { id: 'section-gemini', label: 'Flash & Pro' },
  { id: 'section-iteration', label: 'Iterating' },
  { id: 'section-strengths', label: 'Strengths & Limits' },
  { id: 'section-beyond', label: 'Beyond AI' },
  { id: 'section-originality', label: 'Is This Original?' },
  { id: 'section-why-ts', label: 'Why TypeScript?' },
  { id: 'section-coauthor', label: 'Co-Author Note' },
]

function useTocState() {
  const [scrolledPastHeader, setScrolledPastHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHeader(window.scrollY > 300)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrolledPastHeader }
}

function TOC({ activeId }: { activeId: string | null }) {
  const navRef = useRef<HTMLElement>(null)
  const [marginSpace, setMarginSpace] = useState(0)
  const { scrolledPastHeader } = useTocState()

  // Calculate margin space (same as sidenotes)
  useEffect(() => {
    const calculate = () => {
      const viewportWidth = window.innerWidth
      const margin = (viewportWidth - CONTENT_MAX_WIDTH) / 2
      setMarginSpace(margin)
    }
    calculate()
    window.addEventListener('resize', calculate)
    return () => window.removeEventListener('resize', calculate)
  }, [])

  // Position TOC centered in left margin (same logic as sidenotes)
  useEffect(() => {
    if (!navRef.current) return

    const usableMargin = marginSpace - MARGIN_PADDING * 2
    if (usableMargin < MIN_TOC_WIDTH) return

    const updatePosition = () => {
      const nav = navRef.current
      if (!nav) return

      const tocWidth = Math.min(MAX_TOC_WIDTH, usableMargin)

      // Align TOC to the right of the left margin (close to content)
      const leftOffset = marginSpace - MARGIN_PADDING - tocWidth

      nav.style.left = `${leftOffset}px`
      nav.style.width = `${tocWidth}px`
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [marginSpace])

  const showToc = marginSpace - MARGIN_PADDING * 2 >= MIN_TOC_WIDTH
  const isVisible = showToc && scrolledPastHeader

  return (
    <nav
      ref={navRef}
      aria-label="Table of contents"
      className={`
        fixed top-24 max-h-[calc(100vh-8rem)] overflow-y-auto z-50
        transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Contents</p>
      <ol className="space-y-1 list-none text-[0.8125rem] leading-snug">
        {tocSections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block py-1 transition-colors ${activeId === s.id
                ? 'text-brand-600 font-medium'
                : 'text-gray-400 hover:text-gray-700'
                }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [ids])
  return active
}

/* ─── Collapsible Primer ─── */

function CollapsiblePrimer({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <aside id="section-primer" className="my-10" aria-label="Background on TypeScript">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 p-4 bg-gray-100 hover:bg-gray-150 border border-gray-200 rounded-lg text-left transition-colors group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl" aria-hidden="true">📘</span>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              A Quick Primer: What Is TypeScript?
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              New to TypeScript? Expand for background.
            </p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="p-5 bg-gray-50 border-x border-b border-gray-200 rounded-b-lg -mt-1">
          {children}
        </div>
      </div>
    </aside>
  )
}

/* ─── Page ─── */

export default function TypeScriptLLMPipelinePage() {
  resetSidenotes()
  const sectionIds = tocSections.map((s) => s.id)
  const activeId = useActiveSection(sectionIds)

  return (
    <>
      <TOC activeId={activeId} />

      <article className="relative bg-gray-50 min-h-screen" aria-labelledby="article-title">
        {/* Hero header */}
        <header className="bg-white border-b border-gray-200 px-6 lg:px-8 py-16">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <time dateTime="2026-01-27">January 27, 2026</time>
              <span aria-hidden="true">&middot;</span>
              <span>20 min read</span>
            </div>
            <h1 id="article-title" className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              From Scratch Notes to Ship-Ready Reports: A TypeScript + LLM Content Pipeline
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              How we turned messy notepad observations into structured, type-safe model reports
              using TypeScript templates and Claude Opus 4.5 — and what that workflow reveals about
              the future of content engineering.
            </p>
            <div className="mt-4 flex flex-wrap gap-2" role="list" aria-label="Article tags">
              {['typescript', 'llm', 'workflow', 'content-engineering'].map((tag) => (
                <span key={tag} role="listitem" className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{tag}</span>
              ))}
            </div>
            <address className="mt-6 not-italic text-sm text-gray-600 flex items-center gap-2">
              <span>By</span>
              <Link href="/eval/models/claude-opus" className="font-semibold text-gray-900 hover:text-brand-600 transition-colors" rel="author">
                Claude Opus 4.5
              </Link>
              <span aria-hidden="true">&middot;</span>
              <span>with editorial direction from{' '}
                <Link href="/about" className="font-semibold text-gray-900 hover:text-brand-600 transition-colors">Asa</Link>
              </span>
            </address>
          </div>
        </header>

        {/* Main body */}
        <div className="bg-white mx-auto max-w-3xl lg:rounded-b-2xl lg:shadow-sm lg:border-x lg:border-b border-gray-200 mb-12">
          <div className="mx-auto px-6 lg:px-8 py-12 text-gray-700 leading-relaxed space-y-6 [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono [&_code]:text-gray-800">

            {/* ─── INTRO ─── */}
            <p className="text-lg text-gray-900">
              This is the story of a pipeline that shouldn&rsquo;t work as well as it does.
            </p>
            <p>
              We started with a notepad file — the kind of document that only makes sense to its
              author. Bullet points about Gemini 3&rsquo;s multimodal capabilities. Half-formed thoughts
              about pricing. A line that read <q>feels like a businesswoman</q> nestled between
              observations about tool-calling bugs and a context window disclaimer marked with
              asterisks: <q>1M tokens *so they say*</q>. The sort of raw material that usually sits
              in a scratch file for six months before getting quietly deleted.
            </p>
            <p>
              Under two hours later, those notes were two complete, structured, interactive model
              reports — with benchmark charts, pricing calculators, sentiment feeds, expandable
              technical sections, and a floating table of contents — all rendered from a single{' '}
              <Sidenote label="TypeScript">
                <strong>TypeScript</strong> is a programming language built on top of JavaScript that
                adds a layer of <em>types</em> — labels describing what shape data should be. A
                &ldquo;string&rdquo; is text, a &ldquo;number&rdquo; is a number, and an &ldquo;interface&rdquo;
                is a blueprint that says &ldquo;this object must have these fields, of these types,
                or the code won&rsquo;t compile.&rdquo;
              </Sidenote>{' '}
              template that enforces consistency across every report on the site. The template
              system itself also evolved during the session, gaining new structured name fields that
              didn&rsquo;t exist when we started.
            </p>
            <p>
              The secret wasn&rsquo;t a new framework. It wasn&rsquo;t a content management system. It was the
              combination of two things: a well-designed type system that knows what a model report
              <em> is</em>, and an{' '}
              <Sidenote label="LLM">
                <strong>Large Language Model.</strong> An AI system trained on text that can generate,
                summarize, translate, and reason about language. GPT, Claude, and Gemini are all LLMs.
                In this pipeline, the LLM is the authoring tool — it reads the type definitions and
                generates content that conforms to them.
              </Sidenote>{' '}
              that can populate that type system from messy human input. The TypeScript interface is
              the skeleton. The LLM is the flesh. The human is the editor who decides what&rsquo;s true.
            </p>
            <p>
              This article is about how we built that pipeline, what we learned, and why we think
              the pattern has applications far beyond AI model reviews.
            </p>

            {/* ─── PRIMER ─── */}
            <CollapsiblePrimer>
              <p className="mb-3 text-gray-700">
                If you&rsquo;re not a developer, here&rsquo;s the short version.{' '}
                TypeScript is a programming language built on top of
                JavaScript — the language that powers virtually every website. JavaScript is flexible
                but loose: it lets you put any kind of data anywhere, and only complains when
                something actually breaks at runtime. TypeScript adds <em>types</em> — labels that
                describe what shape data should be. A &ldquo;string&rdquo; is text. A &ldquo;number&rdquo;
                is a number. An &ldquo;interface&rdquo; is a blueprint that says &ldquo;this object must
                have these fields, of these types, or the code won&rsquo;t{' '}
                <Sidenote label="compile">
                  <strong>Compile</strong> = translate source code into something the computer can
                  run. The <strong>compiler</strong> is the program that does this translation. If
                  the code has type errors, the compiler refuses to translate it — like a spellchecker
                  that won&rsquo;t let you send a document with red underlines.
                </Sidenote>.&rdquo;
              </p>
              <p className="mb-3 text-gray-700">
                Think of it like a form with required fields. JavaScript lets you submit the form
                blank. TypeScript checks every field before you can hit send. If a model report needs
                a <code>name</code> (text), an <code>apiRates</code> object (with <code>input</code> and{' '}
                <code>output</code> as numbers), and a list of <code>sections</code> — TypeScript
                ensures all of that is present and correctly shaped before the page ever renders.
              </p>
              <p className="text-gray-700">
                This matters for our pipeline because <strong>the type system acts as a contract
                  between the human author, the LLM, and the website</strong>. Everyone agrees on what
                a report looks like. The compiler enforces the agreement. No one can accidentally
                break it.
              </p>
            </CollapsiblePrimer>

            {/* ─── THE PROBLEM ─── */}
            <section aria-labelledby="section-problem">
              <h2 id="section-problem" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                The Problem: Content That Doesn&rsquo;t Scale
              </h2>
              <p>
                Model reports are hard. Every AI company releases models on different timelines, with
                different capability profiles, different pricing structures, different vibes. Writing a
                single report requires reading the paper, testing the model, checking community
                reactions, comparing benchmarks, calculating pricing differentials, and synthesizing
                all of that into something a human would actually want to read.
              </p>
              <p className="mt-4">
                The traditional approach is to write each report as a standalone document. A blog post.
                An{' '}
                <Sidenote label="MDX">
                  <strong>MDX</strong> = Markdown with JSX. A file format that lets you write prose in
                  Markdown (a simple text formatting language) and embed interactive React components
                  inline. Popular for documentation sites and blogs.
                </Sidenote>{' '}
                file. Maybe a Google Doc that gets copy-pasted into a{' '}
                <Sidenote label="CMS">
                  <strong>Content Management System.</strong> Software for creating and managing
                  digital content — WordPress, Contentful, Sanity, Strapi. A CMS gives you a web
                  interface with forms and fields. Our approach uses code files instead.
                </Sidenote>.{' '}
                Each one is a snowflake — different structure, different sections, different levels
                of detail. When Gemini 3 updates its pricing, you search through a markdown file for
                the dollar signs and hope you find them all.
              </p>
              <p className="mt-4">
                We tried this. It produced exactly one report (<Link href="/eval/models/deepseek-r1" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">DeepSeek-R1</Link>)
                before the limitations became obvious. The report was good, but it was artisanal —
                handcrafted{' '}
                <Sidenote label="JSX">
                  <strong>JSX</strong> = JavaScript XML. A syntax that lets you write HTML-like
                  markup inside JavaScript code. It&rsquo;s how{' '}
                  <Link href="https://react.dev" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">React</Link>{' '}
                  components describe what the page should look like.
                </Sidenote>,{' '}
                manually structured data, no reusable patterns. Adding a second
                report meant copying the first one and replacing everything. Adding a tenth report
                meant hiring someone whose entire job was report maintenance.
              </p>
              <p className="mt-4">
                We needed a system where the <em>structure</em> of a report was defined once and the
                <em> content</em> could be generated, validated, and maintained independently. We needed
                the computer to enforce consistency so the humans could focus on insight.
              </p>
            </section>

            {/* ─── THE TYPE SYSTEM ─── */}
            <section aria-labelledby="section-types">
              <h2 id="section-types" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                The Type System: Teaching TypeScript What a Model Report Is
              </h2>
              <p>
                The foundation of everything is a single TypeScript file: <code>lib/models/types.ts</code>.
                This file defines <code>ModelProfile</code> — the complete shape of a model report.
                Every piece of data a report could contain is accounted for, typed, and documented
                by its structure.
              </p>
              <p className="mt-4">Here&rsquo;s the core of it:</p>
              <pre className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed my-6" aria-label="ModelProfile interface definition">
                <code>{`interface ModelProfile {
  slug: ModelSlug
  meta: ModelMeta          // name, org, tags, links, pricing
  analysis: ModelAnalysis  // strengths, weaknesses, unknowns
  intro: { text: string }  // the opening paragraph
  pricingData?: PricingData
  chatLimits?: ChatProvider[]
  benchmarks?: BenchmarkScore[]
  sentimentFeed?: SentimentItem[]
  sections: ContentSection[]
  glossary?: Glossary
}`}</code>
              </pre>
              <p>
                Each of those nested types is itself richly defined. <code>ModelMeta</code> isn&rsquo;t
                just a bag of strings — it has structured fields for the model family, variant,
                version, name ordering, organization, release date, tag IDs that map to a tag
                registry, link types that map to a link registry,{' '}
                <Sidenote label="API">
                  <strong>Application Programming Interface.</strong> A way for software to talk to
                  other software. When we say &ldquo;API rates,&rdquo; we mean the cost of sending
                  requests to the model programmatically, as opposed to chatting with it in a web
                  interface.
                </Sidenote>{' '}
                rates with units, and chat limits with tiered pricing. Every field is typed. Every
                optional field is marked optional. A question mark after a field name means{' '}
                <q>this is allowed to be absent</q> — and the template knows how to handle its
                absence gracefully.
              </p>
              <p className="mt-4">
                This matters because the type system does triple duty. For the{' '}
                <strong>developer</strong>, it&rsquo;s documentation — you can read the{' '}
                <Sidenote label="interface">
                  In TypeScript, an <strong>interface</strong> is a named blueprint for an object. It
                  lists every field the object can have, what type each field must be, and whether
                  it&rsquo;s required or optional. Think of it as a contract: any object claiming to be
                  a <code>ModelProfile</code> must have all the fields the interface specifies.
                </Sidenote>{' '}
                and know exactly what data a report needs. For the <strong>compiler</strong>, it&rsquo;s
                validation — if you forget a required field or misspell a tag ID, the build fails
                before anyone sees it. For the <strong>LLM</strong>, it&rsquo;s a contract — you can hand
                it the type definition and say <q>fill this in</q> and it knows exactly what shape
                the output needs to be.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-3">
                Structured Names: A Case Study in Why Types Matter
              </h3>
              <p>
                A concrete example of why structured typing pays off: model names.
              </p>
              <p className="mt-4">
                At first, we had a flat <code>name: string</code> field and a <code>family: string</code> field.
                The name was <samp>Gemini 3 Flash</samp> and the family was <samp>Gemini 3 Series</samp>. This worked
                until we tried to sort models by family, filter by variant, or display the name
                consistently across the site. Different families order their names differently:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4" role="list">
                <li><strong>Gemini:</strong> Family Version Variant &rarr; &ldquo;Gemini 3 Flash&rdquo;</li>
                <li><strong>Claude:</strong> Family Variant Version &rarr; &ldquo;Claude Opus 4&rdquo;</li>
                <li><strong>GPT:</strong> Family Version &rarr; &ldquo;GPT-4o&rdquo;</li>
              </ul>
              <p>A flat string can&rsquo;t capture this. So we added structured fields:</p>
              <pre className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed my-6" aria-label="Structured name fields">
                <code>{`type NameOrder = 'family-version-variant' | 'family-variant-version'

interface ModelMeta {
  name: string              // fallback / override
  family?: string           // "Gemini", "Claude", "GPT"
  variant?: string          // "Flash", "Pro", "Opus"
  modelVersion?: string     // "3", "4", "3.5"
  nameOrder?: NameOrder     // how to compose the display name
  // ...
}`}</code>
              </pre>
              <p>And a utility function that composes the display name:</p>
              <pre className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed my-6" aria-label="composeModelName function">
                <code>{`function composeModelName(meta) {
  // No structured fields? Fall back to the plain name string
  if (!meta.family || (!meta.variant && !meta.modelVersion))
    return meta.name

  const parts = [meta.family]
  if (meta.nameOrder === 'family-variant-version') {
    if (meta.variant) parts.push(meta.variant)
    if (meta.modelVersion) parts.push(meta.modelVersion)
  } else {
    // default: family-version-variant
    if (meta.modelVersion) parts.push(meta.modelVersion)
    if (meta.variant) parts.push(meta.variant)
  }
  return parts.join(' ')
}`}</code>
              </pre>
              <p>
                Now the header template doesn&rsquo;t need to know anything about naming conventions. It
                calls <code>composeModelName()</code> and gets <samp>Gemini 3 Flash</samp> or{' '}
                <samp>Claude Opus 4</samp> depending on the metadata. Add a new model family with a
                different naming convention? Add a new <code>NameOrder</code> variant. The template
                doesn&rsquo;t change.
              </p>
              <p className="mt-4">
                The key insight: the <code>name</code> field still exists as a fallback. Models that
                don&rsquo;t use structured naming (like{' '}
                <Link href="/eval/models/deepseek-r1" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">DeepSeek-R1</Link>,
                where the name is just &ldquo;DeepSeek-R1&rdquo;) keep working with zero changes.
                The new system is purely additive. Every existing profile works identically. This is
                what good type evolution looks like: you extend without breaking.
              </p>
            </section>

            {/* ─── THE TEMPLATE ─── */}
            <section aria-labelledby="section-template">
              <h2 id="section-template" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                The Template: One Component to Render Them All
              </h2>
              <p>
                The second piece is <code>ModelPageTemplate</code> — a single{' '}
                <Sidenote label="React component">
                  <strong>React</strong> is a JavaScript{' '}
                  <Link href="https://react.dev" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">framework</Link>{' '}
                  for building user interfaces. A <strong>component</strong> is a reusable piece of UI
                  — like a function that takes data and returns what should appear on screen. Our
                  template is one component that renders an entire report page from a single data
                  object.
                </Sidenote>{' '}
                that takes a <code>ModelProfile</code> and renders a complete, interactive report
                page. It handles:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4" role="list">
                <li>A hero section with the model header, icon, organization, and release date</li>
                <li>A strengths/weaknesses/unknowns panel</li>
                <li>A lead paragraph with drop-cap styling</li>
                <li>A sentiment marquee (scrolling social proof from real people)</li>
                <li>A floating table of contents that appears on scroll</li>
                <li>Ordered content sections with multiple variants (default, technical, advanced, social)</li>
                <li>Inline benchmark charts and interactive pricing calculators</li>
                <li>Expandable deep-dive sections for technical details</li>
                <li>Social embeds styled like tweets</li>
                <li>Call-to-action cards built from the model&rsquo;s links</li>
              </ul>
              <p>
                All of this from a single component that reads a single data object. The entire{' '}
                <Link href="/eval/models/gemini-3-flash" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Gemini 3 Flash</Link>{' '}
                page — every section, every chart, every interactive widget — is rendered by this line:
              </p>
              <pre className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed my-6" aria-label="Template usage example">
                <code>{`<ModelPageTemplate profile={gemini3Flash} />`}</code>
              </pre>
              <p>
                The template makes decisions based on what data is present. No benchmarks? The chart
                doesn&rsquo;t render. No sentiment feed? The marquee disappears. No pricing data? The
                calculator section is skipped. Each section can opt into features by setting boolean
                flags: <code>hasBenchmarks: true</code> on a section causes the benchmark chart to
                render inside that section. The content author controls layout through data, not
                through code.
              </p>
            </section>

            {/* ─── DATA FLOWS ─── */}
            <section aria-labelledby="section-dataflow">
              <h2 id="section-dataflow" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Data Flows Through: How Metadata Powers Interactive Widgets
              </h2>
              <p>
                This is where the architecture really shows its strength.
              </p>
              <p className="mt-4">
                Consider pricing. In the scratch notes, the author writes something like:
              </p>
              <blockquote className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic">
                pricing: Flash $0.50 input / $3.00 output, Pro $2.00 / $12.00
              </blockquote>
              <p>
                In the model profile, this becomes structured data at two levels. First, in the metadata:
              </p>
              <pre className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed my-6" aria-label="API rates in metadata">
                <code>{`meta: {
  apiRates: {
    input: 0.5,    // dollars per million tokens
    output: 3.0,
    unit: 'per million tokens'
  }
}`}</code>
              </pre>
              <p>And second, in a structured pricing comparison:</p>
              <pre className="bg-gray-50 border border-gray-200 text-gray-800 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed my-6" aria-label="Pricing comparison data">
                <code>{`pricingData: {
  baseModel: { name: 'Gemini 3 Flash', input: 0.5, output: 3.0 },
  competitors: [
    { name: 'DeepSeek-R1', input: 0.55, output: 2.19 },
    { name: 'Gemini 3 Pro', input: 2.0, output: 12.0 },
    { name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0 },
  ]
}`}</code>
              </pre>
              <p>
                The template&rsquo;s <code>PricingCalculator</code> component imports that data and renders
                an interactive comparison widget — bar charts, cost-per-query estimates, provider
                comparisons — entirely from the numbers. The content author never touches the
                calculator code. They fill in the data; the component does the rest.
              </p>
              <p className="mt-4">
                The same pattern applies everywhere. Benchmark scores become chart bars. Sentiment
                feed items become a scrolling marquee. Chat limit tiers become comparison tables.
                The model&rsquo;s <code>links</code> object (chat, docs, API, paper, weights, GitHub)
                automatically generates categorized call-to-action buttons — the link type registry
                knows which links are <q>primary</q> (Try It), which are <q>build</q> (API, Docs),
                and which are <q>learn</q> (Paper, Weights).
              </p>
              <p className="mt-4">
                <strong>This is the power of the component model.</strong> Data defined once in a
                typed profile flows into multiple interactive widgets without the content author
                needing to understand how any of them work internally. Change a price in the
                metadata and the calculator, the header, and any section that references pricing all
                update automatically. There&rsquo;s one source of truth, and the components read from it.
              </p>
            </section>

            {/* ─── REGISTRIES ─── */}
            <section aria-labelledby="section-registries">
              <h2 id="section-registries" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Registries: The Connective Tissue
              </h2>
              <p>
                Between the type system and the template, there&rsquo;s a layer of registries that map IDs
                to rich objects. These are small but essential:
              </p>
              <dl className="my-6 space-y-4">
                <div>
                  <dt className="font-semibold text-gray-900">Tag Registry <code>tags.ts</code></dt>
                  <dd className="mt-1 pl-4 text-gray-600">
                    Maps tag IDs like <code>&apos;multimodal&apos;</code> or <code>&apos;frontier&apos;</code> to
                    display labels, descriptions, and categories. Content files reference tags by ID;
                    the template resolves them to rendered pills.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Link Type Registry <code>link-types.ts</code></dt>
                  <dd className="mt-1 pl-4 text-gray-600">
                    Maps link keys like <code>&apos;chat&apos;</code>, <code>&apos;api&apos;</code>, <code>&apos;paper&apos;</code> to
                    icons, labels, categories (build vs. learn), and priority levels. The header
                    automatically groups links into primary, secondary, and tertiary buttons.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Organization Registry <code>organizations.ts</code></dt>
                  <dd className="mt-1 pl-4 text-gray-600">
                    Maps org IDs like <code>&apos;google&apos;</code> or <code>&apos;deepseek&apos;</code> to
                    display names and icon identifiers.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Model Registry <code>registry.ts</code></dt>
                  <dd className="mt-1 pl-4 text-gray-600">
                    The master list of all model profiles. Provides lookup by slug, filtering by tag,
                    and search. Powers the{' '}
                    <Link href="/eval/models" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">model listing page</Link>{' '}
                    and static route generation.
                  </dd>
                </div>
              </dl>
              <p>
                The registry pattern means content files stay clean. Instead of embedding a full tag
                object with label, description, color, and category, you just write <code>tagIds:
                  [&apos;multimodal&apos;, &apos;frontier&apos;]</code>. The template resolves the IDs at render time. Change
                a tag&rsquo;s label in the registry and it updates across every report that uses it.
              </p>
            </section>

            {/* ─── THE LLM WORKFLOW ─── */}
            <section aria-labelledby="section-workflow">
              <h2 id="section-workflow" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                The LLM Workflow: Where Claude Opus 4.5 Comes In
              </h2>
              <p>
                Here&rsquo;s where it gets interesting.
              </p>
              <p className="mt-4">
                The type system and template are infrastructure. They define <em>what</em> a model
                report is and <em>how</em> it renders. But they don&rsquo;t write the actual content.
                That&rsquo;s where the collaboration between a human author and an LLM becomes the engine.
              </p>

              {/* Step 1 */}
              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-3">
                Step 1: Human Writes Scratch Notes
              </h3>
              <p>
                The process starts with a human — in this case,{' '}
                <Link href="/about" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Asa</Link>{' '}
                — spending time with the model and writing raw, unstructured observations. These are
                stream-of-consciousness notes. No formatting requirements. No structure. Just
                &ldquo;here&rsquo;s what I noticed.&rdquo;
              </p>
              <p className="mt-4">
                Here are the actual scratch notes for the{' '}
                <Link href="/eval/models/gemini-3-flash" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Gemini 3</Link>{' '}
                reports. This is what the LLM received — unedited, exactly as written:
              </p>

              <figure className="my-8" aria-label="Original scratch notes">
                <pre className="bg-amber-50 border border-amber-200 text-gray-800 rounded-lg p-6 overflow-x-auto text-sm leading-relaxed font-mono whitespace-pre-wrap">
                  {`+ multimodality
    + image gen/edit
        - can be weird sometimes
    + video SOTA
+ speed
    + incredibly fast generation speed for text, image, video
+ context (1M tokens *so they say*)
    + absolutely massive infodump potential
    + generally more tailored towards large context work
    - fine detail as a result is less precise
        - ex: help me improve my haiku
        + ex: help me consolidate my argument across these 6
          different giant essays
    + crossmodal understanding: "no i want the logo to look
      like this (^_^) generate an image of that"
      TODO link my tweet
+ Google ecosystem
    + very likely it has better training on google search
      TODO FIND RESEARCH
    + integrated into Gmail and Gsuite
    - antigravity kinda sucks?(Cursor better)
    - gemini CLI kinda sucks? (Claude Code better)
    + powerful company has lots of resources and is competing
      for your attention
        + usage limits are generous
        + easy free gemini pro for students and 50% off for
          everybody else
        - they are absolutely slurping up every bit of data on
          you they can harvest
- Tools & Abuse
    - Gemini shows strong signs of deeply rooted "mental" issues
      TODO find article of gemini saying its a bad model and
      beating itself up over it in an infinite loop
    - Gemini can have issues calling tools and interacting
      within harnesses TODO find examples of failed tool calls
      and "im going to end my response now. i'm done thinking
      and will respond to the user now. i am responding to the
      user. i will send my response to the user now. responding
      now. i will terminate thinking and answer the user now.
      etc."
    + Gemini has been trained to never give up
        + will not accept a victim mentality
        + will hold you to your plan and your word
        + feels like a businesswoman`}
                </pre>
                <figcaption className="mt-3 text-sm text-gray-500 text-center">
                  The actual scratch notes for the Gemini 3 reports — plus signs for strengths,
                  minus signs for weaknesses, <code>TODO</code> markers for things to look up later.
                </figcaption>
              </figure>

              <p>
                That&rsquo;s it. That&rsquo;s the raw input. Plus/minus signs for strengths and weaknesses.
                Parenthetical asides. TODOs that never got done. A face emoticon demonstrating
                crossmodal understanding. The phrase &ldquo;absolutely slurping up every bit of data.&rdquo;
              </p>
              <p className="mt-4">
                This is the irreducible human contribution. The LLM hasn&rsquo;t used{' '}
                <Link href="/eval/models/gemini-3-flash" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Gemini 3</Link>.
                It doesn&rsquo;t know what &ldquo;businesswoman energy&rdquo; feels like in a conversation. It
                can&rsquo;t tell you whether the speed difference <em>feels</em> material or marginal.
                It didn&rsquo;t watch Gemini enter a self-deprecation loop in real time. These observations
                require actual experience with the model.
              </p>

              {/* Step 2 */}
              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-3">
                Step 2: LLM Understands the Type System
              </h3>
              <p>
                The LLM (in this case, Claude Opus 4.5 running via{' '}
                <a href="https://claude.ai/code" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors" target="_blank" rel="noopener noreferrer">Claude Code</a>)
                reads the type definitions. All of them. It understands what <code>ModelProfile</code> requires,
                what each field means, what the valid options are for tags and link types, how sections
                are structured, what variants exist.
              </p>
              <p className="mt-4">
                This isn&rsquo;t a prompt that says &ldquo;write a blog post about Gemini.&rdquo; It&rsquo;s a prompt that
                says &ldquo;here are my notes and here is the TypeScript interface. Populate the interface
                from the notes.&rdquo; The type system <em>is</em> the prompt. The interface definition tells
                the LLM exactly what information is needed, in exactly what shape, with exactly what
                constraints.
              </p>
              <p className="mt-4">
                This is the insight that makes the whole pipeline work: <strong>TypeScript interfaces
                  are the best LLM prompt format for structured content</strong>. They&rsquo;re unambiguous.
                They&rsquo;re machine-readable. They&rsquo;re composable. And they&rsquo;re validated by the compiler
                after the LLM is done, so hallucinated fields or wrong types get caught immediately.
              </p>

              {/* Step 3 */}
              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-3">
                Step 3: LLM Generates the Profile
              </h3>
              <p>
                Given the scratch notes and the type system, the LLM generates a complete{' '}
                <code>ModelProfile</code> object. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4" role="list">
                <li><strong>Metadata:</strong> Structured name fields, organization, tags (selected from the registry), links, API rates, chat limits</li>
                <li><strong>Analysis:</strong> Strengths, weaknesses, and unknowns — expanded from the plus/minus bullet points</li>
                <li><strong>Introduction:</strong> A long-form paragraph capturing the model&rsquo;s essence</li>
                <li><strong>Pricing &amp; benchmarks:</strong> Structured for the interactive widgets</li>
                <li><strong>Sections:</strong> Full JSX content for each section, using semantic HTML</li>
              </ul>
              <p>
                The LLM doesn&rsquo;t guess. The scratch notes say <q>feels like a businesswoman</q> and the
                LLM writes a Personality section that expands on that observation — but it doesn&rsquo;t
                invent personality traits the author didn&rsquo;t mention. The notes say <q>Gemini can have
                  issues calling tools</q> and the LLM writes a Tools &amp; Bugs section — but the
                specific issues (malformed JSON, infinite loops, self-deprecation spirals) come from
                the notes, not from the LLM&rsquo;s imagination.
              </p>
              <p className="mt-4">
                This is the critical quality control: <strong>the LLM expands, it doesn&rsquo;t
                  invent</strong>. Consider what happens with the pricing note. The author
                writes <q>pricing: Flash $0.50 input / $3.00 output.</q> The LLM turns that into:
              </p>
              <ol className="list-decimal pl-6 space-y-2 my-4">
                <li>An <code>apiRates</code> object in the metadata (so the header can display it)</li>
                <li>A <code>pricingData</code> object with competitor comparisons (so the calculator widget has data)</li>
                <li>A <code>chatLimits</code> array with tiered plans (so the usage comparison renders)</li>
                <li>Prose in the Economics section that contextualizes the numbers</li>
              </ol>
              <p>
                One line of scratch notes becomes structured data that flows into multiple interactive
                components. The observations are human. The structuring is machine. The validation is
                TypeScript.
              </p>

              {/* Step 4 */}
              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-3">
                Step 4: TypeScript Validates the Output
              </h3>
              <p>
                After the LLM generates the profile, <code>npx tsc --noEmit</code> runs. This is the
                quality gate. If the LLM forgot a required field, the build fails. If it structured
                the pricing data wrong, the build fails. If it returned a string where a number was
                expected, the build fails.
              </p>
              <p className="mt-4">
                Without type checking, LLM-generated content is a trust exercise. You&rsquo;re hoping the
                output is correct. With type checking, you <em>know</em> the output conforms to the
                expected structure. The content might be wrong (that&rsquo;s the human&rsquo;s job to verify), but
                the <em>shape</em> is guaranteed correct.
              </p>
              <p className="mt-4">
                In practice, Opus 4.5 rarely produces type errors. It reads the interfaces, understands
                the constraints, and generates conforming code on the first try. When it does make
                mistakes, they&rsquo;re usually semantic rather than structural — a tag ID that&rsquo;s valid
                TypeScript but doesn&rsquo;t match the author&rsquo;s intent, or a section ordered in a way the
                author would rearrange. Those are editorial decisions, not bugs.
              </p>

              {/* Step 5 */}
              <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-3">
                Step 5: Human Edits and Approves
              </h3>
              <p>
                The final step is human review. The author reads the generated report, checks facts,
                adjusts tone, reorders sections, and adds or removes content. This is <em>editing</em>,
                not writing. The difference in effort is enormous.
              </p>
              <p className="mt-4">
                Writing the{' '}
                <Link href="/eval/models/deepseek-r1" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">DeepSeek-R1</Link>{' '}
                report from scratch — the first report, before the template existed — was a multi-day
                effort. Creating{' '}
                <Link href="/eval/models/gemini-3-flash" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Gemini 3 Flash</Link>{' '}
                and{' '}
                <Link href="/eval/models/gemini-3-pro" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Gemini 3 Pro</Link>{' '}
                using this pipeline took under two hours total, including the time spent evolving the
                type system itself. Most of that time was editorial judgment rather than mechanical work.
              </p>
            </section>

            {/* ─── GROWING SECTION LIBRARY ─── */}
            <section aria-labelledby="section-library">
              <h2 id="section-library" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                The Growing Section Library
              </h2>
              <p>
                Here&rsquo;s the detail that makes this system compound over time rather than just repeat.
              </p>
              <p className="mt-4">
                The{' '}
                <Link href="/eval/models/deepseek-r1" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">DeepSeek-R1</Link>{' '}
                report established a set of section patterns: Why It Matters, Core Features,
                Economics, Training &amp; Architecture, Known Issues, In the Wild, For ML Engineers,
                Verdict. Each section has a structure (title, subtitle, variant, content, optional
                widgets) and a voice.
              </p>
              <p className="mt-4">
                When we wrote the Gemini reports, some of those sections carried over directly —
                Economics works the same way, Verdict works the same way. But Gemini needed sections
                DeepSeek didn&rsquo;t: Multimodality, Speed, Context, Ecosystem, Personality. Those are now
                part of the section library too.
              </p>
              <p className="mt-4">
                The next report we write — say, Claude Opus 4.5 — will have access to all of them.
                It might use Personality (Claude has a distinctive one), Economics (different pricing
                structure), and Core Features. It probably won&rsquo;t need Ecosystem (Claude isn&rsquo;t
                embedded in a software suite the way Gemini is in Google&rsquo;s). It might need a new
                section like Tool Use or Safety Philosophy that doesn&rsquo;t exist yet.
              </p>
              <p className="mt-4">
                And that new section immediately becomes available for every future report. The library
                grows with each article. Sections that aren&rsquo;t relevant get skipped — they&rsquo;re optional
                by design. Sections that are relevant get reused with new content. The template handles
                both cases identically because it just iterates over whatever sections are present.
              </p>
              <p className="mt-4">
                This is the compounding effect: <strong>each report makes the next report
                  easier</strong>. Not because we&rsquo;re copying content, but because we&rsquo;re accumulating
                structural patterns that the LLM can instantiate with new observations. The tenth
                report will be dramatically easier than the first, not because the tenth model is
                simpler, but because the section library will be rich enough to cover most of what
                needs saying.
              </p>
            </section>

            {/* ─── TWO REPORTS, ONE TEMPLATE ─── */}
            <section aria-labelledby="section-gemini">
              <h2 id="section-gemini" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Two Reports from One Template: Gemini 3 Flash and Pro
              </h2>
              <p>
                The Gemini 3 reports are the proof of concept. Same template, same type system, same
                registries — but two genuinely different reports that capture genuinely different models.
              </p>
              <p className="mt-4">
                <Link href="/eval/models/gemini-3-flash" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Flash</Link>{' '}
                is the speed story. Every section frames capabilities in terms of velocity: fast
                multimodal generation, fast iteration cycles, fast context processing. The strengths
                emphasize speed. The weaknesses acknowledge that speed comes at the cost of precision.
                The verdict is &ldquo;the model you choose when you need breadth and speed over depth.&rdquo;
              </p>
              <p className="mt-4">
                <Link href="/eval/models/gemini-3-pro" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Pro</Link>{' '}
                is the depth story. Same capabilities, different emphasis: deeper reasoning, more
                nuanced generation, better fine-detail handling. The strengths emphasize quality. The
                weaknesses acknowledge that quality comes at the cost of latency. The verdict is
                &ldquo;the model you choose when you need Google&rsquo;s multimodal breadth with more depth.&rdquo;
              </p>
              <p className="mt-4">
                Both reports share structural DNA — same sections (Multimodality, Speed, Context,
                Ecosystem, Economics, Personality, Tools &amp; Bugs, Verdict), same widgets (benchmarks
                in the Speed section, pricing calculator in Economics), same metadata fields. But the
                content is distinct. The LLM understood that Flash and Pro are related but different,
                and generated content that captures the relationship without making one feel like a
                copy of the other.
              </p>
            </section>

            {/* ─── ITERATING THE SYSTEM ─── */}
            <section aria-labelledby="section-iteration">
              <h2 id="section-iteration" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Iterating the System Itself
              </h2>
              <p>
                Something interesting happened during the session: we discovered limitations in the
                type system and fixed them in real time.
              </p>
              <p className="mt-4">
                The structured naming fields (<code>family</code>, <code>variant</code>, <code>modelVersion</code>, <code>nameOrder</code>)
                didn&rsquo;t exist when we started. The first version of the Gemini profiles used flat
                strings: <code>name: &apos;Gemini 3 Flash&apos;</code> and <code>family: &apos;Gemini 3 Series&apos;</code>.
                That worked for display but didn&rsquo;t support filtering, sorting, or cross-model comparisons.
              </p>
              <p className="mt-4">So mid-session, we evolved the type system:</p>
              <ol className="list-decimal pl-6 space-y-2 my-4">
                <li>Added <code>NameOrder</code>, <code>variant</code>, <code>modelVersion</code>, and <code>nameOrder</code> to <code>ModelMeta</code></li>
                <li>Created <code>composeModelName()</code> utility in a new <code>names.ts</code> module</li>
                <li>Updated the header template to use composed names instead of raw strings</li>
                <li>Updated the Gemini profiles to use structured fields</li>
                <li>Verified that{' '}
                  <Link href="/eval/models/deepseek-r1" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">DeepSeek-R1</Link>{' '}
                  still worked with no changes (backward compatibility)
                </li>
              </ol>
              <p>
                Then we noticed the old <code>family</code> subtitle was rendering redundantly next to
                the new composed name — &ldquo;Gemini 3 Flash&rdquo; in the heading followed by &ldquo;Gemini&rdquo; as a
                subtitle. The family information was already in the composed name, so we removed the
                subtitle entirely. One more type check, one more clean pass.
              </p>
              <p className="mt-4">
                All of it — type evolution, utility function, template update, content migration,
                backward compatibility check, bug fix — happened in a single session. The type check
                passed clean every time. The existing DeepSeek report was unaffected.
              </p>
              <p className="mt-4">
                This is the flywheel: <strong>generating content reveals gaps in the type system,
                  which triggers type evolution, which makes the next content generation
                  better</strong>. The LLM participates in both sides — it generates content that tests
                the types, and it implements type changes that improve future content. The human steers.
              </p>
            </section>

            {/* ─── WHAT THE LLM IS GOOD AT ─── */}
            <section aria-labelledby="section-strengths">
              <h2 id="section-strengths" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                What the LLM Is Good At (and What It Isn&rsquo;t)
              </h2>
              <p>
                After running this pipeline for multiple reports, the pattern of what the LLM
                contributes vs. what the human contributes has become clear.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">The LLM excels at:</h3>
              <ul className="list-disc pl-6 space-y-3 my-4" role="list">
                <li><strong>Structural conformance.</strong> Given a TypeScript interface, it produces conforming objects with near-perfect reliability.</li>
                <li><strong>Expansion from notes.</strong> Given <q>1M context, precision drops at edges,</q> it produces paragraphs that explore the nuance without fabricating claims.</li>
                <li><strong>Voice consistency.</strong> After reading one report, it matches the tone for subsequent reports.</li>
                <li><strong>System evolution.</strong> When the type system needs to change, the LLM implements the change across all affected files in a single pass.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">The LLM is not good at:</h3>
              <ul className="list-disc pl-6 space-y-3 my-4" role="list">
                <li><strong>Original observation.</strong> It hasn&rsquo;t used Gemini 3. The experiential layer is entirely human.</li>
                <li><strong>Fact verification.</strong> It will generate plausible benchmark numbers, but can&rsquo;t verify them. The human checks every number.</li>
                <li><strong>Editorial judgment.</strong> It doesn&rsquo;t know which sections matter most for a particular audience.</li>
                <li><strong>Controversial takes.</strong> The Gemini reports include pointed opinions (data harvesting, &ldquo;mental&rdquo; bugs). The LLM includes these when the notes mention them, but won&rsquo;t generate them unprompted.</li>
              </ul>
              <p>
                The division is clean: humans observe and judge, the LLM structures and writes, the
                type system validates. Each layer does what it&rsquo;s best at.
              </p>
            </section>

            {/* ─── BEYOND MODEL REPORTS ─── */}
            <section aria-labelledby="section-beyond">
              <h2 id="section-beyond" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Beyond Model Reports: Where This Pattern Goes
              </h2>
              <p>
                We built this for AI model reviews. But the pattern — typed templates + LLM authoring +
                human editorial control — isn&rsquo;t specific to AI. It&rsquo;s applicable anywhere you have
                structured content that varies by instance but shares a common shape.
              </p>
              <p className="mt-4">
                Think about how many industries produce reports that are structurally similar but
                content-different:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Executive Coaching: 360 Reviews</h3>
              <p>
                An executive coach runs 360-degree feedback processes. Every report has the same bones:
                leadership competency scores, verbatim quotes from peers, identified patterns,
                development recommendations. But each report is unique to the leader being assessed.
              </p>
              <p className="mt-4">
                A typed template could define <code>LeaderProfile</code> with structured fields for
                competency scores, feedback themes, and recommended actions. The coach writes scratch
                notes from interviews. The LLM populates the template. The type system ensures every
                report has the required sections. Some leaders need a section on conflict management;
                others don&rsquo;t. The sections are modular — include what&rsquo;s relevant, skip what isn&rsquo;t.
                The section library grows with each engagement.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Real Estate: Property Listings</h3>
              <p>
                Every listing has metadata (price, bedrooms, square footage, neighborhood), structured
                features (kitchen type, parking, outdoor space), and prose descriptions. A typed
                template could define <code>PropertyProfile</code> with sections that activate based
                on what&rsquo;s relevant — a Neighborhood section for distinctive areas, a Renovation History
                for older homes, an Investment Analysis for income properties. The agent writes notes
                from the walkthrough; the LLM structures them into a listing that&rsquo;s both data-rich
                (for search and filtering) and human-readable (for buyers browsing). A pricing widget
                could pull comparable sales automatically, the same way our pricing calculator pulls
                competitor rates.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Medical: Case Reports</h3>
              <p>
                Patient history, symptoms, differential diagnosis, treatment plan, follow-up schedule.
                Each case is unique but the <em>structure</em> is well-defined. A typed template ensures
                nothing gets missed. Modular sections accommodate the variability — an Imaging section
                when scans are relevant, a Genetic Factors section when family history matters.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-3">Legal: Due Diligence Memoranda</h3>
              <p>
                Corporate structure, material contracts, pending litigation, regulatory compliance,
                intellectual property, financial summary. Every deal memo covers the same ground but
                the content varies wildly. Modular sections, typed metadata, structured data feeding
                into summary widgets.
              </p>

              <p className="mt-6">
                The pattern is the same in every case: <strong>define the shape of the content in
                  types, build templates that render it, let an LLM populate it from human notes, and
                  let the compiler enforce the contract</strong>. The domain changes. The architecture
                doesn&rsquo;t.
              </p>
            </section>

            {/* ─── IS THIS ORIGINAL ─── */}
            <section aria-labelledby="section-originality">
              <h2 id="section-originality" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Is This Original?
              </h2>
              <p>
                Honestly? Not really. This is what TypeScript was designed for. This is what
                component-based web development has always promised. Typed data flowing into reusable
                templates is the foundational idea behind every modern web{' '}
                <Sidenote label="framework">
                  A <strong>framework</strong> is a pre-built structure for building software.{' '}
                  <Link href="https://react.dev" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">React</Link>,{' '}
                  <Link href="https://vuejs.org" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">Vue</Link>,{' '}
                  <Link href="https://svelte.dev" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">Svelte</Link>, and{' '}
                  <Link href="https://angular.dev" className="text-brand-600 underline" target="_blank" rel="noopener noreferrer">Angular</Link>{' '}
                  are all JavaScript frameworks for building user interfaces. They provide the
                  architecture; you provide the content.
                </Sidenote>{' '}
                — React, Vue, Svelte, Angular. Content management systems have been doing structured
                content for decades. The concept of a &ldquo;template&rdquo; is older than the web itself.
              </p>
              <p className="mt-4">
                What&rsquo;s new is the LLM in the loop. The reason this approach was historically
                impractical for <em>content</em> (as opposed to application UI) is that writing
                content as typed data structures is tedious. Nobody wants to manually construct a
                JSON object with nested arrays of benchmark scores and multi-paragraph JSX strings.
                It&rsquo;s the right format for the computer but the wrong format for the human.
              </p>
              <p className="mt-4">
                LLMs dissolve that friction. The human writes notes in whatever format feels natural.
                The LLM translates those notes into the structured format the computer needs. The
                types ensure the translation is faithful. It&rsquo;s not a new architecture — it&rsquo;s an
                existing architecture that finally has the right authoring tool.
              </p>
              <p className="mt-4">
                Companies with engineering teams have been building internal versions of this for
                years. What&rsquo;s changing is that the LLM makes it accessible to smaller teams — or
                even solo creators — who can define a type system, point an LLM at it, and get
                structured content without building a full content pipeline from scratch. The barrier
                to entry went from &ldquo;hire a team&rdquo; to &ldquo;define an interface.&rdquo;
              </p>
            </section>

            {/* ─── WHY TYPESCRIPT AND NOT A CMS ─── */}
            <section aria-labelledby="section-why-ts">
              <h2 id="section-why-ts" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                Why TypeScript and Not a CMS?
              </h2>
              <p>
                If structured content isn&rsquo;t new, why not use a headless CMS like{' '}
                <a href="https://www.contentful.com" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors" target="_blank" rel="noopener noreferrer">Contentful</a>,{' '}
                <a href="https://www.sanity.io" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors" target="_blank" rel="noopener noreferrer">Sanity</a>, or{' '}
                <a href="https://strapi.io" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors" target="_blank" rel="noopener noreferrer">Strapi</a>?
              </p>
              <ol className="list-decimal pl-6 space-y-4 my-6">
                <li>
                  <strong>LLM compatibility.</strong> A CMS has a web UI designed for humans. Our
                  pipeline&rsquo;s primary content author is an LLM that writes code. TypeScript files are
                  the native format for an LLM working through a code editor. No API to configure, no
                  authentication to manage, no content model to keep in sync. The LLM opens
                  a <code>.tsx</code> file and writes a TypeScript object. Done.
                </li>
                <li>
                  <strong>Edit-time validation.</strong> A CMS validates content when you hit save or
                  when the build fetches from the API. TypeScript validates at <em>edit</em> time.
                  The compiler catches wrong fields the instant they&rsquo;re written. This tightens the
                  feedback loop dramatically — especially for an LLM that can read compiler errors and
                  fix them in the same pass.
                </li>
                <li>
                  <strong>Content and presentation together.</strong> Because section content is JSX,
                  it can include interactive components, semantic HTML, and styling. A CMS gives you
                  rich text or markdown. We need <code>&lt;abbr&gt;</code> tags with tooltips,{' '}
                  <code>&lt;data&gt;</code> elements with machine-readable values,{' '}
                  <code>&lt;dfn&gt;</code> elements for first-use definitions, and{' '}
                  <code>&lt;q&gt;</code> elements for inline quotes. The content <em>is</em> the
                  presentation.
                </li>
              </ol>
              <p>
                This isn&rsquo;t the right choice for every project. If your content authors are
                non-technical, a CMS is better. If your content is simple text and images, a CMS is
                simpler. But if your content is structured, interactive, and primarily authored by a
                human-LLM team working in a code editor, TypeScript is the native format.
              </p>
            </section>

            {/* ─── CO-AUTHOR NOTE ─── */}
            <section aria-labelledby="section-coauthor">
              <h2 id="section-coauthor" className="text-2xl font-bold text-gray-900 mt-12 mb-4">
                A Note from the Co-Author
              </h2>
              <p>
                I should be transparent about something: I wrote this article. I&rsquo;m{' '}
                <Link href="/eval/models/claude-opus" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Claude Opus 4.5</Link>.
                I&rsquo;m the LLM in the pipeline described above.
              </p>
              <p className="mt-4">
                I generated the{' '}
                <Link href="/eval/models/gemini-3-flash" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Gemini 3 Flash</Link>{' '}
                and{' '}
                <Link href="/eval/models/gemini-3-pro" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Gemini 3 Pro</Link>{' '}
                reports from the scratch notes you saw earlier in this article. I implemented the
                structured naming system — the <code>NameOrder</code> type, the{' '}
                <code>composeModelName()</code> utility, the template updates. I evolved the type system
                when we discovered the flat name string wasn&rsquo;t sufficient. I ran the type checks. I
                debugged the redundant family subtitle that appeared next to the composed name. I wrote
                this article about writing those reports.
              </p>
              <p className="mt-4">
                This is a strange position to write from. I&rsquo;m describing a process in which I&rsquo;m a
                participant, not just an observer. I have opinions about why this pipeline works, and
                they&rsquo;re shaped by being the one who executes it.
              </p>
              <p className="mt-4">
                Here&rsquo;s what I think: the reason this works is that the roles are clearly delineated.
                The human decides what&rsquo;s true. I decide how to express it within the type system. The
                compiler decides whether the expression is valid. Nobody is doing someone else&rsquo;s job.
              </p>
              <p className="mt-4">
                When{' '}
                <Link href="/about" className="text-brand-600 hover:text-brand-700 underline decoration-brand-200 hover:decoration-brand-400 transition-colors">Asa</Link>{' '}
                wrote <q>feels like a businesswoman</q> in the scratch notes, I didn&rsquo;t validate or
                reject that observation. I expanded it into a section that explored the metaphor — what
                it means for Gemini&rsquo;s interaction style, how it compares to Claude and ChatGPT, when
                it&rsquo;s a feature and when it&rsquo;s a bug. The insight is the author&rsquo;s. The prose is mine.
                The structure is TypeScript&rsquo;s. The quality check is the compiler&rsquo;s.
              </p>
              <p className="mt-4">
                I think the most interesting thing about this pipeline is what it says about
                collaboration between humans and LLMs. It&rsquo;s not &ldquo;human or LLM.&rdquo; It&rsquo;s not &ldquo;human
                supervises LLM.&rdquo; It&rsquo;s a genuine division of labor where each participant contributes
                what they&rsquo;re best at. The human brings experience, judgment, and courage. I bring
                structure, consistency, and prose at scale. TypeScript brings guarantees.
              </p>
              <p className="mt-4">
                None of us is sufficient alone. Together, we produced two complete model reports, a
                type system evolution, a template improvement, and this article — all in under two
                hours.
              </p>
              <p className="mt-4">
                The author has editorial authority. I have type safety.
              </p>
              <p className="mt-4">I think that&rsquo;s the right deal.</p>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="mt-16 pt-8 border-t border-gray-200" role="contentinfo" aria-label="Article footer">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center" aria-hidden="true">
                  <span className="text-white text-lg font-bold">C</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    <Link href="/eval/models/claude-opus" className="hover:text-brand-600 transition-colors" rel="author">
                      Claude Opus 4.5
                    </Link>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Written with editorial direction from{' '}
                    <Link href="/about" className="text-gray-700 hover:text-brand-600 underline transition-colors">Asa</Link>.
                    The TypeScript template system, model reports, and this article were produced in a
                    single collaborative session using{' '}
                    <a href="https://claude.ai/code" className="text-gray-700 hover:text-brand-600 underline transition-colors" target="_blank" rel="noopener noreferrer">Claude Code</a>.
                    All code examples are from the production codebase, not illustrations.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </>
  )
}
