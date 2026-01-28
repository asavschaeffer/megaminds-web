import type { ModelProfile, ModelSlug } from './types'
import type { ModelTagId } from './tags'
import { validateTagConflicts, validateTagCoverage, validateTagIds } from './tags'
import { deepseekR1 } from '@/content/eval/models/deepseek-r1'
import { gemini3Flash } from '@/content/eval/models/gemini-3-flash'
import { gemini3Pro } from '@/content/eval/models/gemini-3-pro'

const MODELS: ModelProfile[] = [deepseekR1, gemini3Flash, gemini3Pro]

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

const MODEL_BY_SLUG = new Map<ModelSlug, ModelProfile>(MODELS.map((model) => [model.slug, model]))

export function getAllModelSlugs(): ModelSlug[] {
  return MODELS.map((model) => model.slug)
}

export function getModelBySlug(slug: ModelSlug): ModelProfile | undefined {
  return MODEL_BY_SLUG.get(slug)
}

export function getAllModels(): ModelProfile[] {
  return MODELS
}

export function getModelsByTag(tagId: ModelTagId): ModelProfile[] {
  return MODELS.filter((model) => model.meta.tagIds?.includes(tagId) || false)
}

export function getModelsByOrganization(orgId: string): ModelProfile[] {
  return MODELS.filter(
    (model) => model.meta.organizationId === orgId || model.meta.organization?.toLowerCase() === orgId.toLowerCase()
  )
}

export function searchModels(query: string): ModelProfile[] {
  const lowerQuery = query.toLowerCase()
  return MODELS.filter(
    (model) =>
      model.meta.name.toLowerCase().includes(lowerQuery) ||
      model.meta.identity.toLowerCase().includes(lowerQuery) ||
      model.meta.family?.toLowerCase().includes(lowerQuery)
  )
}

export function getRecentModels(limit = 5): ModelProfile[] {
  return [...MODELS]
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
  return MODELS.length
}
