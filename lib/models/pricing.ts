/**
 * Render-time pricing comparison, derived entirely from the registry.
 *
 * A profile's own sourced `meta.apiRates` is the base; competitors are the
 * registry's nearest price neighbors (one below, one near, one above), so
 * every number shown traces back to a profile that cites its pricing.
 */

import type { ModelProfile, PricingData } from './types'

type PricingCandidate = {
  name: string
  input: number
  output: number
  provider?: string
}

const getBaseRates = (profile: ModelProfile): PricingCandidate | null => {
  const apiRates = profile.meta.apiRates
  if (!apiRates) return null
  return {
    name: profile.meta.name,
    input: apiRates.input,
    output: apiRates.output,
    provider: apiRates.provider,
  }
}

const getCandidatesFromRegistry = (models: ModelProfile[], baseSlug: string): PricingCandidate[] =>
  models
    .filter((model) => model.slug !== baseSlug)
    .flatMap((model) => {
      const candidate = getBaseRates(model)
      return candidate ? [candidate] : []
    })

type PricingCandidateWithTotal = PricingCandidate & { total: number }

const pickPricingNeighbors = (base: PricingCandidate, candidates: PricingCandidate[]) => {
  const baseTotal = base.input + base.output
  const withTotals: PricingCandidateWithTotal[] = candidates.map((candidate) => ({
    ...candidate,
    total: candidate.input + candidate.output,
  }))

  const below = [...withTotals].filter((candidate) => candidate.total < baseTotal).sort((a, b) => b.total - a.total)[0]
  const above = [...withTotals].filter((candidate) => candidate.total > baseTotal).sort((a, b) => a.total - b.total)[0]
  const near = [...withTotals]
    .sort((a, b) => Math.abs(a.total - baseTotal) - Math.abs(b.total - baseTotal))
    .find((candidate) => candidate !== below && candidate !== above)

  return [below, near, above]
    .filter((candidate): candidate is PricingCandidateWithTotal => Boolean(candidate))
    .map(({ name, input, output, provider }) => ({ name, input, output, provider }))
}

export const buildPricingData = (profile: ModelProfile, models: ModelProfile[]): PricingData | null => {
  const baseModel = getBaseRates(profile)
  if (!baseModel) return null

  return {
    baseModel,
    competitors: pickPricingNeighbors(baseModel, getCandidatesFromRegistry(models, profile.slug)),
  }
}
