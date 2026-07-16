import type { ApiPricing, ModelProfile, PricingData } from './types'

type PricingCandidate = {
  name: string
  input: number
  output: number
  provider?: string
}

const resolveApiRates = (meta: ModelProfile['meta']): ApiPricing | null => meta.apiRates ?? null

const getBaseRates = (profile: ModelProfile): PricingCandidate | null => {
  const apiRates = resolveApiRates(profile.meta)
  if (apiRates) {
    return {
      name: profile.meta.name,
      input: apiRates.input,
      output: apiRates.output,
      provider: apiRates.provider,
    }
  }

  if (profile.pricingData?.baseModel) {
    return {
      name: profile.meta.name,
      input: profile.pricingData.baseModel.input,
      output: profile.pricingData.baseModel.output,
      provider: profile.pricingData.baseModel.provider,
    }
  }

  return null
}

const getCandidatesFromMeta = (models: ModelProfile[], baseSlug: string): PricingCandidate[] =>
  models
    .filter((model) => model.slug !== baseSlug)
    .flatMap((model): PricingCandidate[] => {
      const apiRates = resolveApiRates(model.meta)
      if (!apiRates) return []
      return [{
        name: model.meta.name,
        input: apiRates.input,
        output: apiRates.output,
        ...(apiRates.provider && { provider: apiRates.provider }),
      }]
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
    .map(({ name, input, output }) => ({ name, input, output }))
}

const mergeCompetitors = (primary: PricingCandidate[], secondary: PricingCandidate[]) => {
  const merged = [...primary]
  for (const candidate of secondary) {
    if (!merged.some((item) => item.name === candidate.name)) {
      merged.push(candidate)
    }
  }
  return merged
}

export const buildPricingData = (profile: ModelProfile, models: ModelProfile[]): PricingData | null => {
  const baseModel = getBaseRates(profile)
  if (!baseModel) return null

  const metaCandidates = getCandidatesFromMeta(models, profile.slug)
  const selected = pickPricingNeighbors(baseModel, metaCandidates)
  const fallback = profile.pricingData?.competitors ?? []
  const competitors = mergeCompetitors(selected, fallback)

  return {
    baseModel,
    competitors,
  }
}
