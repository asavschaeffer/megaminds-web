'use client'

import { useEffect, useRef, useState } from 'react'
import type { ContentSection, ModelProfile } from '@/lib/models/types'
import { getOrganization, getOrganizationIconId } from '@/lib/models/organizations'
import { sortSectionsByOrder } from '@/lib/models/sections'
import { BenchmarkChart } from './widgets/benchmark-chart'
import { ContentSection as SectionBlock } from './widgets/content-section'
import { CTACards } from './widgets/cta-cards'
import { ExpandableSection } from './widgets/expandable-section'
import { FloatingTOC } from './widgets/floating-toc'
import { HeroLogoBackground } from './widgets/hero-logo-background'
import { ModelHeader } from './widgets/model-header'
import { PricingCalculator } from './widgets/pricing-calculator'
import { SentimentMarquee } from './widgets/sentiment-marquee'
import { SocialEmbed } from './widgets/social-embed'
import { StrengthsWeaknesses } from './widgets/strengths-weaknesses'
import { useActiveSection } from './widgets/use-active-section'
import { AbbrSidenoteProvider } from '@/components/shared/sidenote'

export interface ModelPageTemplateProps {
  profile: ModelProfile
  footer?: React.ReactNode
  className?: string
}

const resolveSectionContent = (section: ContentSection) => {
  if (typeof section.content === 'string') {
    return (
      <div className="whitespace-pre-line">
        {section.content}
      </div>
    )
  }
  return section.content
}

export const ModelPageTemplate = ({ profile, footer, className = '' }: ModelPageTemplateProps) => {
  const { meta, analysis, intro, sections, pricingData, chatLimits, sentimentFeed, benchmarks } = profile
  const orderedSections = sortSectionsByOrder(sections)
  const sectionIds = orderedSections.map((section) => section.id).filter(Boolean) as string[]
  const activeSection = useActiveSection(sectionIds)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [showToc, setShowToc] = useState(false)

  useEffect(() => {
    const updateVisibility = () => {
      const marqueeEl = marqueeRef.current
      if (!marqueeEl) return
      const marqueeTop = marqueeEl.getBoundingClientRect().top
      const shouldShow = marqueeTop <= 80
      setShowToc((prev) => (prev === shouldShow ? prev : shouldShow))
    }

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    window.addEventListener('resize', updateVisibility)
    return () => {
      window.removeEventListener('scroll', updateVisibility)
      window.removeEventListener('resize', updateVisibility)
    }
  }, [])

  const orgInfo = meta.organizationId ? getOrganization(meta.organizationId) : undefined
  const organizationName = meta.organization ?? orgInfo?.name
  const iconName = meta.organizationId ? getOrganizationIconId(meta.organizationId) : meta.organization ?? meta.name

  const renderSection = (section: ContentSection, idx: number) => {
    if (section.variant === 'social' && section.socialData) {
      return <SocialEmbed key={section.id ?? idx} {...section.socialData} />
    }

    return (
      <div key={section.id ?? idx}>
        <SectionBlock id={section.id} title={section.title} subtitle={section.subtitle} specs={section.specs}>
          {resolveSectionContent(section)}
          {section.hasBenchmarks && benchmarks && benchmarks.length > 0 && <BenchmarkChart benchmarks={benchmarks} />}
          {section.hasPricing && pricingData && chatLimits && (
            <PricingCalculator apiData={pricingData} chatData={chatLimits} pricingSources={meta.pricingSources} />
          )}
          {section.expandable && (
            <ExpandableSection title={section.expandable.title} preview={section.expandable.preview}>
              {section.expandable.content}
            </ExpandableSection>
          )}
          {section.expandables && (
            <div className="space-y-4">
              {section.expandables.map((exp, index) => (
                <ExpandableSection key={index} title={exp.title} preview={exp.preview}>
                  {exp.content}
                </ExpandableSection>
              ))}
            </div>
          )}
        </SectionBlock>
        {section.socialData && <SocialEmbed {...section.socialData} />}
      </div>
    )
  }

  return (
    <article
      className={`relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 ${className}`}
      aria-labelledby="model-title"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-neutral-900 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Skip to main content
      </a>

      <div className="relative z-10">
        <header className="relative min-h-[90vh] flex flex-col justify-center px-6 py-12 md:px-12 max-w-7xl mx-auto bg-white dark:bg-neutral-900 md:rounded-b-3xl md:shadow-sm">
          <HeroLogoBackground name={iconName} />
          <div className="relative z-10 grid lg:grid-cols-[1fr,400px] gap-12 flex-1 items-center">
            <div className="flex flex-col justify-center">
              <ModelHeader
                name={meta.name}
                family={meta.family}
                variant={meta.variant}
                modelVersion={meta.modelVersion}
                nameOrder={meta.nameOrder}
                organization={organizationName}
                releaseDate={meta.releaseDate}
                releaseDateDisplay={meta.releaseDateDisplay}
                identity={meta.identity}
                tagIds={meta.tagIds}
                tags={meta.tags}
                links={meta.links}
              />
            </div>
            <aside
              className="flex flex-col justify-center bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm"
              aria-label="Model analysis summary"
            >
              <StrengthsWeaknesses strengths={analysis.strengths} weaknesses={analysis.weaknesses} unknowns={analysis.unknowns} />
            </aside>
          </div>

          <div className="mt-16 max-w-3xl relative z-10">
            <p className="text-lg md:text-xl leading-relaxed text-neutral-600 dark:text-neutral-300 font-light first-letter:text-4xl first-letter:font-bold first-letter:text-neutral-900 dark:first-letter:text-neutral-100 first-letter:mr-1 first-letter:float-left first-letter:leading-none">
              {intro.text}
            </p>
          </div>
        </header>

        {sentimentFeed && sentimentFeed.length > 0 && (
          <div ref={marqueeRef} className="py-8 md:py-12">
            <SentimentMarquee items={sentimentFeed} />
          </div>
        )}

        <FloatingTOC sections={orderedSections} activeId={activeSection} show={showToc} />

        <AbbrSidenoteProvider>
          <main
            id="main-content"
            className="max-w-4xl mx-auto px-6 py-10 md:px-12 md:py-14 space-y-4 bg-white dark:bg-neutral-900 md:rounded-2xl md:shadow-sm md:border border-neutral-200 dark:border-neutral-800 mb-12"
            tabIndex={-1}
          >
            {orderedSections.map((section, idx) => renderSection(section, idx))}
          </main>
        </AbbrSidenoteProvider>

        <div className="bg-white dark:bg-neutral-900 pt-4">{meta.links && <CTACards links={meta.links} />}</div>

        {footer ? (
          footer
        ) : (
          <footer className="bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 py-10 text-center">
            <p className="text-sm text-neutral-400 dark:text-neutral-500">
              <small>
                © <time dateTime={new Date().getFullYear().toString()}>{new Date().getFullYear()}</time> Model Analysis. All rights reserved.
              </small>
            </p>
          </footer>
        )}
      </div>
    </article>
  )
}

export default ModelPageTemplate
