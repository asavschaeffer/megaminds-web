import type { NameOrder } from './types'

export function composeModelName(meta: {
  name: string
  family?: string
  variant?: string
  modelVersion?: string
  nameOrder?: NameOrder
}): string {
  if (!meta.family || (!meta.variant && !meta.modelVersion)) return meta.name

  const parts = [meta.family]
  if (meta.nameOrder === 'family-variant-version') {
    if (meta.variant) parts.push(meta.variant)
    if (meta.modelVersion) parts.push(meta.modelVersion)
  } else {
    // default: family-version-variant (Gemini 3 Flash)
    if (meta.modelVersion) parts.push(meta.modelVersion)
    if (meta.variant) parts.push(meta.variant)
  }
  return parts.join(' ')
}
