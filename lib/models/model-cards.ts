/**
 * Model cards, derived entirely from the registry.
 *
 * Every card is computed from a `ModelProfile` — name, description, chips, and
 * link all come from the profile, and icons resolve through the icon manifest
 * (model icon from the family, parent watermark from the manifest's parent
 * relation). There is no hand-maintained card list: a model appears here by
 * being registered, and its card can never disagree with its report.
 *
 * The only native content in this file is presentation: how each
 * organization's watermark sits inside the card.
 */

import { getIconManifest } from '@/lib/icon-manifest'
import type { BrandCardProps } from '@/components/ui/brand-card'
import type { ModelTagId } from './tags'
import { getAllTagIds, getTag } from './tags'
import type { ModelMeta, ModelProfile } from './types'
import type { OrganizationId } from './organizations'
import { getAllModels, getLatestModels } from './registry'

export const MODEL_TAGS = getAllTagIds()

export type ModelCard = BrandCardProps & {
  key: string
  /** Typed registry tags, for filtering. Display chips live in `tags`. */
  tagIds: ModelTagId[]
}

// ——— icon resolution (manifest-driven) ———

const iconBySlug = new Map((getIconManifest().icons ?? []).map((entry) => [entry.slug, entry]))

const getVariant = (slug: string, variant: string) => iconBySlug.get(slug)?.variants[variant]

const getModelIcon = (slug: string) =>
  getVariant(slug, 'color') ?? getVariant(slug, 'avatar') ?? getVariant(slug, 'mono')

const getModelWordmark = (slug: string) =>
  getVariant(slug, 'text') ?? getVariant(slug, 'combine') ?? getVariant(slug, 'mono')

const getParentWatermark = (slug: string) =>
  getVariant(slug, 'color') ??
  getVariant(slug, 'brand-color') ??
  getVariant(slug, 'mono') ??
  getVariant(slug, 'avatar') ??
  getVariant(slug, 'combine-color') ??
  getVariant(slug, 'combine')

/** Family name usually IS the icon slug ("Claude" → claude); meta.iconSlug overrides. */
const resolveIconSlug = (meta: ModelMeta): string | undefined =>
  [meta.iconSlug, meta.family?.toLowerCase(), meta.name.split(/[\s/-]/)[0]?.toLowerCase()].find(
    (candidate): candidate is string => Boolean(candidate && iconBySlug.has(candidate))
  )

// ——— presentation: per-organization watermark placement ———

const DEFAULT_WATERMARK_CLASSNAME =
  'absolute -right-1 top-1/2 h-[155%] w-auto -translate-y-1/2 translate-x-[4%] rotate-[9deg] opacity-[0.12] sm:-right-2 sm:h-[165%] sm:translate-x-[6%] lg:-right-4 lg:h-[175%] lg:translate-x-[8%]'

const WATERMARK_CLASSNAMES: Partial<Record<OrganizationId, string>> = {
  anthropic:
    'absolute -right-1 top-[56%] h-[135%] w-auto -translate-y-1/2 translate-x-[4%] rotate-[9deg] opacity-[0.12] sm:-right-2 sm:h-[145%] sm:translate-x-[6%] lg:-right-4 lg:h-[155%] lg:translate-x-[8%]',
  xai: 'absolute -right-1 top-[48%] h-[135%] w-auto -translate-y-1/2 translate-x-[0%] rotate-[9deg] opacity-[0.12] sm:-right-2 sm:h-[145%] sm:translate-x-[2%] lg:-right-4 lg:h-[155%] lg:translate-x-[4%]',
  openai:
    'absolute -right-2 top-1/2 h-[170%] w-auto -translate-y-1/2 translate-x-[10%] rotate-[9deg] opacity-[0.12] sm:-right-3 sm:h-[180%] sm:translate-x-[12%] lg:-right-4 lg:h-[190%] lg:translate-x-[14%]',
  alibaba:
    'absolute -right-3 top-1/2 h-[190%] w-auto -translate-y-1/2 translate-x-[26%] rotate-[9deg] opacity-[0.12] sm:-right-4 sm:h-[205%] sm:translate-x-[28%] lg:-right-6 lg:h-[220%] lg:translate-x-[30%]',
}

// ——— derivation ———

function buildModelCard(profile: ModelProfile): ModelCard {
  const iconSlug = resolveIconSlug(profile.meta)
  const parentSlug = iconSlug ? iconBySlug.get(iconSlug)?.parent ?? iconSlug : undefined
  const tagIds = profile.meta.tagIds ?? []

  return {
    key: profile.slug,
    model: profile,
    tagIds,
    tags: [...tagIds.map((id) => getTag(id).label), ...(profile.meta.specChips ?? [])],
    organizationId: profile.meta.organizationId,
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName:
      (profile.meta.organizationId && WATERMARK_CLASSNAMES[profile.meta.organizationId]) ||
      DEFAULT_WATERMARK_CLASSNAME,
    modelIconSrc: iconSlug ? getModelIcon(iconSlug) : undefined,
    modelTextLogoSrc: iconSlug ? getModelWordmark(iconSlug) : undefined,
    parentIconSrc: parentSlug ? getParentWatermark(parentSlug) : undefined,
  }
}

/** One card per registered model, in registry order. */
export const modelCards: ModelCard[] = getAllModels().map(buildModelCard)

/**
 * The most recently released models, as cards. Drives the homepage
 * "Latest Model Evaluations" section — a model surfaces here automatically
 * once its profile has a `releaseDate`.
 */
export function getLatestModelCards(limit = 3): ModelCard[] {
  return getLatestModels(limit).map(buildModelCard)
}
