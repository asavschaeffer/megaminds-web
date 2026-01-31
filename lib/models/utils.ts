/**
 * Utility functions for ModelProfile data transformation
 * Derives display strings from source data to eliminate redundancy
 */

import type { ModelProfile, ModelMeta, PricingData } from './types'
import { MODEL_PRICING_REFERENCES } from './pricing-reference'

export function formatReleaseDate(releaseDate?: string): string | undefined {
  if (!releaseDate) return undefined

  const date = new Date(releaseDate)
  if (isNaN(date.getTime())) return undefined

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ]
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${month} ${year}`
}

export function formatDisplayName(
  name: string,
  family?: string,
  variant?: string,
  modelVersion?: string,
  nameOrder: 'family-version-variant' | 'family-variant-version' = 'family-version-variant'
): string {
  if (variant && modelVersion) {
    if (nameOrder === 'family-version-variant') {
      return family ? `${family} ${modelVersion} ${variant}` : name
    } else {
      return family ? `${family} ${variant} ${modelVersion}` : name
    }
  }
  return name
}

export function getDisplayTags(meta: ModelMeta): string[] {
  return meta.tags || []
}

export function getCompetitorPricingFromReferences(
  competitorIds: string[]
): Array<{ name: string; input: number; output: number; provider?: string }> {
  return competitorIds
    .map((id) => MODEL_PRICING_REFERENCES[id])
    .filter(Boolean)
    .map((ref) => ({
      name: ref.name,
      input: ref.input,
      output: ref.output,
      provider: ref.provider,
    }))
}

export function getModelPricingFromReference(
  modelId: string
): { name: string; input: number; output: number; provider?: string } | undefined {
  const ref = MODEL_PRICING_REFERENCES[modelId]
  if (!ref) return undefined

  return {
    name: ref.name,
    input: ref.input,
    output: ref.output,
    provider: ref.provider,
  }
}

export function mergePricingData(
  basePricing?: { name: string; input: number; output: number; provider?: string },
  competitorIds: string[] = []
): PricingData | undefined {
  if (!basePricing && competitorIds.length === 0) return undefined

  // Safe checks for partial data to ensure we match the PricingData interface
  if (!basePricing) return undefined // PricingData requires baseModel

  return {
    baseModel: basePricing,
    competitors: getCompetitorPricingFromReferences(competitorIds),
  }
}

export function formatDateDisplay(date?: string, dateDisplay?: string): string | undefined {
  return dateDisplay || formatReleaseDate(date)
}

export function validateGovernance(governance: any): boolean {
  if (!governance) return true

  if (governance.confidence) {
    const { overall, pricing, benchmarks, features } = governance.confidence
    if (overall !== undefined && (overall < 0 || overall > 100)) return false
    if (pricing !== undefined && (pricing < 0 || pricing > 100)) return false
    if (benchmarks !== undefined && (benchmarks < 0 || benchmarks > 100)) return false
    if (features !== undefined && (features < 0 || features > 100)) return false
  }

  return true
}
