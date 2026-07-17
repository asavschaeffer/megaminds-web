/**
 * Shared contract for the Model Picker quiz.
 *
 * `buildPickerModel` distills a full `ModelProfile` down to the flat, typed
 * shape the picker UI consumes. Tags are kept as pure `ModelTagId[]` (no
 * display-string merging), so the quiz can reason about capabilities against
 * the same vocabulary the rest of the registry validates at build time.
 */

import type { AnalysisItem, ModelProfile } from './types'
import type { ModelTagId } from './tags'
import { composeModelName } from './names'

export type PriceBand = 'budget' | 'moderate' | 'premium'

export interface PickerModel {
  slug: string
  name: string
  /** Pure registry tags — never display strings. */
  tags: ModelTagId[]
  reason: string
  strengths: string[]
  weaknesses: string[]
  priceBand: PriceBand
  hasFreeAccess: boolean
}

const analysisText = (item: AnalysisItem): string => item.claim

/**
 * Blended $/M-token price using a 3:1 input:output weighting, which better
 * reflects typical chat/agent usage (input tokens dominate) than a flat mean.
 * Reads the profile's own sourced `meta.apiRates`; returns `undefined` when a
 * profile carries no structured pricing at all.
 */
function blendedPrice(profile: ModelProfile): number | undefined {
  const rates = profile.meta.apiRates
  if (!rates) return undefined
  return (rates.input * 3 + rates.output) / 4
}

/**
 * Price-band thresholds were chosen after surveying the blended price across
 * all 11 registry profiles so the split is meaningful:
 *   budget   (< $1.00/Mtok): DeepSeek V3.2 0.18, Kimi K2.5 0.86, DeepSeek-R1 0.96
 *   moderate ($1.00–$3.00) : Gemini 3 Flash 1.13, Qwen 3 Max 1.51
 *   premium  (> $3.00/Mtok): Gemini 3 Pro 4.50, Claude Sonnet 4.5 6.00
 *
 * Profiles with no structured pricing (several Claude reports) fall back to a
 * tag-based inference: frontier/precision → premium, cost-efficient/speed →
 * budget, otherwise moderate. This keeps Opus/Fable at premium, Haiku at
 * budget, and Sonnet 4.6 at moderate without inventing numbers.
 */
function computePriceBand(profile: ModelProfile): PriceBand {
  const blended = blendedPrice(profile)
  if (blended != null) {
    if (blended < 1.0) return 'budget'
    if (blended > 3.0) return 'premium'
    return 'moderate'
  }
  const tags = profile.meta.tagIds ?? []
  if (tags.includes('frontier') || tags.includes('precision')) return 'premium'
  if (tags.includes('cost-efficient') || tags.includes('efficiency') || tags.includes('speed')) {
    return 'budget'
  }
  return 'moderate'
}

/**
 * A model has a free access path if any chat tier is priced exactly "$0" or the
 * weights are open (open-source / open-weights, which anyone can self-host).
 */
function computeHasFreeAccess(profile: ModelProfile): boolean {
  const tags = profile.meta.tagIds ?? []
  if (tags.includes('open-source') || tags.includes('open-weights')) return true
  const providers = profile.chatLimits ?? []
  return providers.some((provider) => provider.tiers.some((tier) => tier.price.trim() === '$0'))
}

export function buildPickerModel(profile: ModelProfile): PickerModel {
  return {
    slug: profile.slug,
    name: composeModelName(profile.meta),
    tags: [...(profile.meta.tagIds ?? [])],
    reason: profile.meta.identity || profile.intro.text,
    strengths: profile.analysis.strengths.map(analysisText).slice(0, 6),
    weaknesses: profile.analysis.weaknesses.map(analysisText).slice(0, 4),
    priceBand: computePriceBand(profile),
    hasFreeAccess: computeHasFreeAccess(profile),
  }
}
