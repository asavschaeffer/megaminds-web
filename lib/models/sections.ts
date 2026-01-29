import type { SectionId, SectionRegistry, SectionRegistryEntry } from './types'

export const SECTION_ORDER: Record<string, number> = {
  'test-time-scaling': 5,
  'why-it-matters': 10,
  'the-max-moment': 11,
  'experience-cumulative': 12,
  'moe-blueprint': 14,
  multimodality: 15,
  'social-proof': 20,
  speed: 25,
  'core-features': 30,
  benchmarks: 32,
  context: 35,
  enterprise: 38,
  economics: 40,
  'developer-experience': 42,
  'agentic-excellence': 44,
  alignment: 46,
  'limitations': 48,
  training: 50,
  ecosystem: 55,
  issues: 60,
  personality: 65,
  'in-the-wild': 70,
  'tools-and-bugs': 75,
  advanced: 80,
  verdict: 100,
}

export interface SectionMeta {
  id: SectionId
  label: string
  description: string
  required: boolean
  order: number
}

export const STANDARD_SECTIONS: Record<string, SectionMeta> = {
  'why-it-matters': {
    id: 'why-it-matters',
    label: 'Why It Matters',
    description: 'Explains significance for everyday users and power users',
    required: false,
    order: 10,
  },
  'social-proof': {
    id: 'social-proof',
    label: 'Social Proof',
    description: 'Featured testimonial or quote',
    required: false,
    order: 20,
  },
  'core-features': {
    id: 'core-features',
    label: 'Core Features',
    description: 'Technical capabilities and key features',
    required: false,
    order: 30,
  },
  economics: {
    id: 'economics',
    label: 'The Economics',
    description: 'Pricing, costs, and value comparison',
    required: false,
    order: 40,
  },
  training: {
    id: 'training',
    label: 'Training & Architecture',
    description: 'Technical details for ML engineers',
    required: false,
    order: 50,
  },
  issues: {
    id: 'issues',
    label: 'Known Issues & Quirks',
    description: 'Limitations and gotchas',
    required: false,
    order: 60,
  },
  'in-the-wild': {
    id: 'in-the-wild',
    label: 'In the Wild',
    description: 'Real-world usage and community reactions',
    required: false,
    order: 70,
  },
  advanced: {
    id: 'advanced',
    label: 'For ML Engineers',
    description: 'Deep technical details and implementation',
    required: false,
    order: 80,
  },
  multimodality: {
    id: 'multimodality',
    label: 'Multimodality',
    description: 'Cross-modal capabilities including image, video, and audio',
    required: false,
    order: 15,
  },
  speed: {
    id: 'speed',
    label: 'Speed',
    description: 'Generation speed and throughput characteristics',
    required: false,
    order: 25,
  },
  context: {
    id: 'context',
    label: 'Context',
    description: 'Context window size and long-context behavior',
    required: false,
    order: 35,
  },
  ecosystem: {
    id: 'ecosystem',
    label: 'Ecosystem',
    description: 'Platform integrations and developer ecosystem',
    required: false,
    order: 55,
  },
  personality: {
    id: 'personality',
    label: 'Personality',
    description: 'Model personality traits and behavioral tendencies',
    required: false,
    order: 65,
  },
  'tools-and-bugs': {
    id: 'tools-and-bugs',
    label: 'Tools & Bugs',
    description: 'Tool calling behavior and known bugs',
    required: false,
    order: 75,
  },
  verdict: {
    id: 'verdict',
    label: 'The Verdict',
    description: 'Summary and recommendations',
    required: true,
    order: 100,
  },
}

export const DEFAULT_SECTION_REGISTRY: SectionRegistry = [{ id: 'verdict', required: true, order: 100 }]

export function getSectionMeta(id: SectionId): SectionMeta | undefined {
  return STANDARD_SECTIONS[id]
}

export function getStandardSectionIds(): SectionId[] {
  return Object.keys(STANDARD_SECTIONS) as SectionId[]
}

export function sortSectionsByOrder<T extends { id: string }>(sections: T[]): T[] {
  return [...sections].sort((a, b) => {
    const orderA = SECTION_ORDER[a.id] ?? 50
    const orderB = SECTION_ORDER[b.id] ?? 50
    return orderA - orderB
  })
}

export function validateRequiredSections(sectionIds: SectionId[]): { valid: boolean; missing: SectionId[] } {
  const requiredIds = Object.values(STANDARD_SECTIONS)
    .filter((s) => s.required)
    .map((s) => s.id)

  const missing = requiredIds.filter((id) => !sectionIds.includes(id))

  return {
    valid: missing.length === 0,
    missing,
  }
}

export function getTocSections<T extends { id: string; title?: string }>(sections: T[]): T[] {
  return sections.filter((s) => s.title)
}

export function getSectionOrder(id: SectionId): number {
  return SECTION_ORDER[id] ?? 50
}

export function registerSections(registry: SectionRegistry, entry: SectionRegistryEntry): SectionRegistry {
  return [...registry, entry]
}
