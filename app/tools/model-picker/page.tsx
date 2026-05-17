import ModelPickerClient from './ModelPickerClient'
import { getAllModels } from '@/lib/models/registry'
import { composeModelName } from '@/lib/models/names'
import type { AnalysisItem, ModelProfile } from '@/lib/models/types'

export const metadata = {
  title: 'Model Picker | Megaminds',
  description: 'Answer a few questions about your task and get a model recommendation from the Megaminds model registry.',
}

const analysisText = (item: string | AnalysisItem): string =>
  typeof item === 'string' ? item : item.text

const buildPickerModel = (profile: ModelProfile) => {
  const name = composeModelName(profile.meta)
  const strengths = profile.analysis.strengths.map(analysisText).slice(0, 6)
  const weaknesses = profile.analysis.weaknesses.map(analysisText).slice(0, 4)

  return {
    slug: profile.slug,
    name,
    tags: [...(profile.meta.tagIds ?? []), ...(profile.meta.tags ?? []).map((tag) => tag.toLowerCase())],
    reason: profile.meta.identity || profile.intro.text,
    strengths,
    weaknesses,
  }
}

export default function ModelPickerPage() {
  const modelProfiles = getAllModels().map(buildPickerModel)

  return <ModelPickerClient modelProfiles={modelProfiles} />
}
