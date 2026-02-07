import type { ModelProfile, ModelSlug } from './types'
import type { ModelTagId } from './tags'
import { validateTagConflicts, validateTagCoverage, validateTagIds } from './tags'
import { hydrateModelWithMdx } from './build-model'
import { deepseekR1 } from '@/content/eval/models/deepseek-r1'
import { deepseekV3_2 } from '@/content/eval/models/deepseek-v3-2'
import { gemini3Flash } from '@/content/eval/models/gemini-3-flash'
import { gemini3Pro } from '@/content/eval/models/gemini-3-pro'
import { kimiK25Model } from '@/content/eval/models/kimi-k2-5'
import { qwen3Max } from '@/content/eval/models/qwen3-max'
import { claudeSonnet45Model } from '@/content/eval/models/claude-sonnet-4-5'

const MODELS: ModelProfile[] = [deepseekR1, deepseekV3_2, gemini3Flash, gemini3Pro, kimiK25Model, qwen3Max, claudeSonnet45Model]

const tagCoverageErrors = MODELS.flatMap((model) => {
  const tagIds = model.meta.tagIds ?? []
  const { valid, missing } = validateTagCoverage(tagIds)
  if (valid) return []
  return [
    `Model "${model.slug}" is missing at least one tag from: ${missing.join(', ')}`,
  ]
})

const tagIdErrors = MODELS.flatMap((model) => {
  const tagIds = model.meta.tagIds ?? []
  const { valid, errors } = validateTagIds(tagIds)
  if (valid) return []
  return [`Model "${model.slug}" has invalid tagIds: ${errors.join('; ')}`]
})

const tagConflictErrors = MODELS.flatMap((model) => {
  const tagIds = model.meta.tagIds ?? []
  const { valid, conflicts } = validateTagConflicts(tagIds)
  if (valid) return []
  return [`Model "${model.slug}" has invalid tag combo: ${conflicts.join('; ')}`]
})

const tagErrors = [...tagIdErrors, ...tagCoverageErrors, ...tagConflictErrors]
if (tagErrors.length > 0) {
  throw new Error(tagErrors.join('\n'))
}

// Hydrate models with MDX content (after tag validation uses original data)
const HYDRATED_MODELS: ModelProfile[] = MODELS.map(hydrateModelWithMdx)

const MODEL_BY_SLUG = new Map<ModelSlug, ModelProfile>(HYDRATED_MODELS.map((model) => [model.slug, model]))

export function getAllModelSlugs(): ModelSlug[] {
  return MODELS.map((model) => model.slug)
}

export function getModelBySlug(slug: ModelSlug): ModelProfile | undefined {
  return MODEL_BY_SLUG.get(slug)
}

export function getAllModels(): ModelProfile[] {
  return HYDRATED_MODELS
}

export function getModelsByTag(tagId: ModelTagId): ModelProfile[] {
  return HYDRATED_MODELS.filter((model) => model.meta.tagIds?.includes(tagId) || false)
}

export function getModelsByOrganization(orgId: string): ModelProfile[] {
  return HYDRATED_MODELS.filter(
    (model) => model.meta.organizationId === orgId || model.meta.organization?.toLowerCase() === orgId.toLowerCase()
  )
}

export function searchModels(query: string): ModelProfile[] {
  const lowerQuery = query.toLowerCase()
  return HYDRATED_MODELS.filter(
    (model) =>
      model.meta.name.toLowerCase().includes(lowerQuery) ||
      model.meta.identity.toLowerCase().includes(lowerQuery) ||
      model.meta.family?.toLowerCase().includes(lowerQuery)
  )
}

export function getRecentModels(limit = 5): ModelProfile[] {
  return [...HYDRATED_MODELS]
    .filter((model) => model.updatedAt)
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || 0)
      const dateB = new Date(b.updatedAt || 0)
      return dateB.getTime() - dateA.getTime()
    })
    .slice(0, limit)
}

export function modelExists(slug: ModelSlug): boolean {
  return MODEL_BY_SLUG.has(slug)
}

export function getModelCount(): number {
  return HYDRATED_MODELS.length
}
