/**
 * Author-time pricing helpers for model profiles.
 * Profiles compose their PricingData from the shared reference list so
 * competitor numbers stay consistent across reports.
 */

import type { PricingData } from './types'
import { MODEL_PRICING_REFERENCES } from './pricing-reference'

function getCompetitorPricingFromReferences(
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
  if (!basePricing) return undefined // PricingData requires baseModel

  return {
    baseModel: basePricing,
    competitors: getCompetitorPricingFromReferences(competitorIds),
  }
}
