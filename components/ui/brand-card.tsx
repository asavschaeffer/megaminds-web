import Link from 'next/link'
import { useId } from 'react'
import type { ModelProfile, ModelMeta } from '@/lib/models/types'
import { getOrganization } from '@/lib/models/organizations'

export interface BrandCardProps {
  href?: string
  modelFamily?: string
  modelVariant?: string
  versionNumber?: string
  description?: string
  tags?: string[]
  modelIconSrc?: string
  modelTextLogoSrc?: string
  parentIconSrc?: string
  watermarkClassName?: string
  watermarkAlign?: 'center' | 'left'
  variantLayout?: 'inline' | 'stacked'
  modelLogoLabel?: string
  parentBrandingLabel?: string
  sublineLogoSrc?: string
  sublineLogoLabel?: string
  modelFamilyClassName?: string
  organizationId?: ModelMeta['organizationId']
  model?: ModelProfile | { meta: ModelMeta; slug: string }
}

export function BrandCard({
  href: hrefProp,
  modelFamily: modelFamilyProp,
  modelVariant: modelVariantProp,
  versionNumber: versionNumberProp,
  description: descriptionProp,
  tags: tagsProp,
  modelIconSrc,
  modelTextLogoSrc,
  parentIconSrc,
  watermarkClassName,
  watermarkAlign = 'center',
  variantLayout = 'inline',
  modelLogoLabel = 'Model logo',
  parentBrandingLabel = 'Parent company branding',
  sublineLogoSrc,
  sublineLogoLabel,
  modelFamilyClassName,
  organizationId,
  model,
}: BrandCardProps) {
  // Extract values from model metadata if provided, otherwise use props
  const href = hrefProp ?? (model ? `/eval/models/${model.slug}` : undefined)
  const modelFamily = modelFamilyProp ?? model?.meta.family ?? 'Model family'
  const modelVariant = modelVariantProp ?? model?.meta.variant ?? ''
  const versionNumber = versionNumberProp ?? model?.meta.modelVersion ?? ''
  const description = descriptionProp ?? model?.meta.identity ?? 'Paragraph element'
  const tags = tagsProp ?? model?.meta.specChips ?? []
  const nameOrder = model?.meta.nameOrder

  // Determine the order of variant and version based on nameOrder
  const getVariantVersionOrder = () => {
    if (nameOrder === 'family-variant-version') {
      return [modelVariant, versionNumber].filter(Boolean)
    } else {
      // default: family-version-variant (Gemini 3 Flash)
      return [versionNumber, modelVariant].filter(Boolean)
    }
  }

  const resolvedOrganizationId = model?.meta.organizationId ?? organizationId
  const organization = resolvedOrganizationId ? getOrganization(resolvedOrganizationId) : undefined
  const brandStyle = model?.meta.branding ?? organization?.brandStyle
  const fontFamilyClass = brandStyle?.fontClassName ?? ''
  const inlineGapClassName = brandStyle?.inlineGapClassName ?? 'gap-2'
  const wordmarkImageClassName = brandStyle?.wordmarkImageClassName ?? 'w-auto max-w-[180px]'
  const usesAnthropicVariant = brandStyle?.variantStyle === 'anthropic'

  const id = useId()
  const headingId = `${id}-heading`
  const descriptionId = `${id}-description`
  const modelLabel = [modelFamily, modelVariant, versionNumber].filter(Boolean).join(' ')
  const modelWordmarkAlt = modelLogoLabel || `${modelFamily} wordmark`
  const watermarkAlignmentClass =
    watermarkAlign === 'left' ? 'flex items-center justify-start' : 'flex items-center justify-center'
  const watermarkSrc = parentIconSrc ?? modelIconSrc

  const content = (
    <article className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={
            `${watermarkClassName ??
            'absolute -right-2 top-1/2 h-[110%] w-auto -translate-y-1/2 translate-x-[12%] rotate-[9deg] opacity-[0.12] sm:-right-4 sm:h-[116%] sm:translate-x-[18%] lg:-right-7 lg:h-[121%] lg:translate-x-[24%]'} ${watermarkAlignmentClass}`
          }
        >
          {watermarkSrc ? (
            <img src={watermarkSrc} alt="" aria-hidden="true" className="h-full w-auto" />
          ) : (
            <svg viewBox="0 0 100 100" className="h-full w-auto" aria-hidden="true">
              <rect x="6" y="6" width="88" height="88" rx="18" className="fill-red-400/80 stroke-red-500" />
            </svg>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between gap-4">
        <header className="flex items-start gap-4">
          {modelIconSrc ? (
            <img src={modelIconSrc} alt={`${modelFamily} icon`} className="h-14 w-14 shrink-0" />
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-100 ring-1 ring-slate-200">
              <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
                <circle cx="16" cy="16" r="15" className="fill-slate-200 stroke-slate-300" />
              </svg>
            </div>
          )}
          <div className="min-w-0 min-h-14 flex flex-col justify-center">
            <h3 id={headingId} className={`flex flex-nowrap items-center ${inlineGapClassName}`}>
              {modelTextLogoSrc ? (
                <img
                  src={modelTextLogoSrc}
                  alt={modelWordmarkAlt}
                  className={`h-6 ${wordmarkImageClassName} block`}
                />
              ) : (
                <span
                  className={`whitespace-nowrap font-semibold text-slate-900 ${modelFamilyClassName ?? 'text-lg'} ${fontFamilyClass}`}
                >
                  {modelFamily}
                </span>
              )}
              {variantLayout === 'inline' && (modelVariant || versionNumber) ? (
                usesAnthropicVariant ? (
                  <span className={`whitespace-nowrap text-2xl text-slate-900 tracking-tight ${fontFamilyClass}`}>
                    {nameOrder === 'family-variant-version' ? (
                      <>
                        {modelVariant && <span className="font-normal">{modelVariant} </span>}
                        {versionNumber && <span className="font-medium">{versionNumber}</span>}
                      </>
                    ) : (
                      <>
                        {versionNumber && <span className="font-medium">{versionNumber} </span>}
                        {modelVariant && <span className="font-normal">{modelVariant}</span>}
                      </>
                    )}
                  </span>
                ) : (
                  <span className={`whitespace-nowrap text-2xl font-medium text-slate-900 tracking-tight ${fontFamilyClass}`}>
                    {getVariantVersionOrder().join(' ')}
                  </span>
                )
              ) : null}
              {variantLayout === 'stacked' && modelVariant ? (
                <span className={`whitespace-nowrap text-2xl font-medium text-slate-900 tracking-tight ${fontFamilyClass}`}>
                  {modelVariant}
                </span>
              ) : null}
              <span className="sr-only">{modelFamily}</span>
            </h3>
            {variantLayout === 'stacked' && (versionNumber || sublineLogoSrc) ? (
              <div className="mt-1 flex items-center text-sm text-slate-500">
                {sublineLogoSrc ? (
                  <img
                    src={sublineLogoSrc}
                    alt={sublineLogoLabel ?? `${modelFamily} subline`}
                    className="h-4 w-auto max-w-[140px]"
                  />
                ) : (
                  <span>{versionNumber}</span>
                )}
              </div>
            ) : null}
          </div>
          <div className="ml-auto text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
            ↗
          </div>
        </header>
        <section>
          <p id={descriptionId} className="text-sm text-slate-600">
            {description}
          </p>
        </section>
        <footer>
          <ul className="flex flex-wrap gap-2" aria-label="Model strengths">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                {tag}
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </article>
  )

  if (href) {
    return (
      <Link
        href={href}
        className="group h-full"
        aria-label={`Model report for ${modelLabel}`}
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
      >
        {content}
      </Link>
    )
  }

  return <div className="group h-full">{content}</div>
}
