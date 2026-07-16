export type TagCategory =
  | 'capability'
  | 'modality'
  | 'architecture'
  | 'licensing'
  | 'size-performance'
  | 'context'
  | 'output'
  | 'deployment'

export interface ModelTag {
  id: string
  label: string
  category: TagCategory
  description?: string
  icon?: string
}

export type ModelTagId =
  | 'generalist'
  | 'reasoning'
  | 'coding'
  | 'math'
  | 'writing'
  | 'analysis'
  | 'translation'
  | 'summarization'
  | 'instruction'
  | 'tool-use'
  | 'function-calling'
  | 'search'
  | 'rag'
  | 'creativity'
  | 'ideation'
  | 'roleplay'
  | 'worldbuilding'
  | 'frontier'
  | 'agentic-swarm'
  | 'visible-reasoning'
  | 'structured-output'
  | 'design'
  | 'text'
  | 'vision'
  | 'audio'
  | 'image-gen'
  | 'video-gen'
  | 'multimodal'
  | 'moe'
  | 'dense'
  | 'hybrid'
  | 'ssm'
  | 'open-source'
  | 'open-weights'
  | 'proprietary'
  | 'research'
  | 'commercial'
  | 'enterprise'
  | 'tiny'
  | 'small'
  | 'medium'
  | 'large'
  | 'precision'
  | 'speed'
  | 'efficiency'
  | 'cost-efficient'
  | 'short'
  | 'medium-context'
  | 'long'
  | 'ultra'
  | 'output-2k'
  | 'output-4k'
  | 'output-8k'
  | 'output-16k'
  | 'output-32k'
  | 'output-64k'
  | 'output-128k'
  | 'cloud'
  | 'local'
  | 'edge'
  | 'api'

export const TAG_CATEGORY_ORDER: TagCategory[] = [
  'capability',
  'modality',
  'architecture',
  'licensing',
  'size-performance',
  'context',
  'output',
  'deployment',
]

export const MODEL_TAGS: Record<ModelTagId, ModelTag> = {
  generalist: {
    id: 'generalist',
    label: 'Generalist',
    category: 'capability',
    description: 'Broad capability across tasks and domains',
  },
  reasoning: {
    id: 'reasoning',
    label: 'Reasoning',
    category: 'capability',
    description: 'Strong logical reasoning and problem-solving',
  },
  coding: {
    id: 'coding',
    label: 'Coding',
    category: 'capability',
    description: 'Code generation, debugging, and explanation',
  },
  math: {
    id: 'math',
    label: 'Math',
    category: 'capability',
    description: 'Mathematical problem-solving and proofs',
  },
  writing: {
    id: 'writing',
    label: 'Writing',
    category: 'capability',
    description: 'Strong writing and narrative generation',
  },
  analysis: {
    id: 'analysis',
    label: 'Analysis',
    category: 'capability',
    description: 'Data analysis and interpretation',
  },
  translation: {
    id: 'translation',
    label: 'Translation',
    category: 'capability',
    description: 'Multi-language translation',
  },
  summarization: {
    id: 'summarization',
    label: 'Summarization',
    category: 'capability',
    description: 'Text summarization and compression',
  },
  instruction: {
    id: 'instruction',
    label: 'Instruction',
    category: 'capability',
    description: 'Follows complex instructions reliably',
  },
  'tool-use': {
    id: 'tool-use',
    label: 'Tool Use',
    category: 'capability',
    description: 'Strong tool use and orchestration',
  },
  'function-calling': {
    id: 'function-calling',
    label: 'Function Calling',
    category: 'capability',
    description: 'Native tool/function calling support',
  },
  search: {
    id: 'search',
    label: 'Search',
    category: 'capability',
    description: 'Web search integration',
  },
  rag: {
    id: 'rag',
    label: 'RAG',
    category: 'capability',
    description: 'Retrieval-augmented generation support',
  },
  creativity: {
    id: 'creativity',
    label: 'Creativity',
    category: 'capability',
    description: 'Originality and creative ideation',
  },
  ideation: {
    id: 'ideation',
    label: 'Ideation',
    category: 'capability',
    description: 'Great at brainstorming and concept generation',
  },
  roleplay: {
    id: 'roleplay',
    label: 'Roleplay',
    category: 'capability',
    description: 'Strong at in-character roleplay',
  },
  worldbuilding: {
    id: 'worldbuilding',
    label: 'Worldbuilding',
    category: 'capability',
    description: 'Long-form narrative and lore creation',
  },
  design: {
    id: 'design',
    label: 'Design',
    category: 'capability',
    description: 'Design thinking and visual communication',
  },
  frontier: {
    id: 'frontier',
    label: 'Frontier',
    category: 'capability',
    description: 'Frontier-level capability across tasks',
  },
  'agentic-swarm': {
    id: 'agentic-swarm',
    label: 'Agentic Swarm',
    category: 'capability',
    description: 'Spawns parallel sub-agents for autonomous task execution',
  },
  'visible-reasoning': {
    id: 'visible-reasoning',
    label: 'Visible Reasoning',
    category: 'capability',
    description: 'Exposes raw reasoning traces to the user',
  },
  'structured-output': {
    id: 'structured-output',
    label: 'Structured Output',
    category: 'capability',
    description: 'Reliable JSON/schema-constrained output for programmatic use',
  },
  text: {
    id: 'text',
    label: 'Text',
    category: 'modality',
    description: 'Text input and output',
  },
  vision: {
    id: 'vision',
    label: 'Vision',
    category: 'modality',
    description: 'Image understanding',
  },
  audio: {
    id: 'audio',
    label: 'Audio',
    category: 'modality',
    description: 'Audio input/output',
  },
  'image-gen': {
    id: 'image-gen',
    label: 'Image Gen',
    category: 'modality',
    description: 'Image generation capabilities',
  },
  'video-gen': {
    id: 'video-gen',
    label: 'Video Gen',
    category: 'modality',
    description: 'Video understanding or generation',
  },
  multimodal: {
    id: 'multimodal',
    label: 'Multimodal',
    category: 'modality',
    description: 'Multiple input/output modalities',
  },
  moe: {
    id: 'moe',
    label: 'MoE',
    category: 'architecture',
    description: 'Mixture of Experts architecture',
  },
  dense: {
    id: 'dense',
    label: 'Dense',
    category: 'architecture',
    description: 'Dense (all parameters active)',
  },
  hybrid: {
    id: 'hybrid',
    label: 'Hybrid',
    category: 'architecture',
    description: 'Hybrid architecture',
  },
  ssm: {
    id: 'ssm',
    label: 'SSM',
    category: 'architecture',
    description: 'State Space Model (Mamba-style)',
  },
  'open-source': {
    id: 'open-source',
    label: 'Open Source',
    category: 'licensing',
    description: 'Fully open source with code and weights',
  },
  'open-weights': {
    id: 'open-weights',
    label: 'Open Weights',
    category: 'licensing',
    description: 'Weights available for download',
  },
  proprietary: {
    id: 'proprietary',
    label: 'Proprietary',
    category: 'licensing',
    description: 'Closed source, API-only access',
  },
  research: {
    id: 'research',
    label: 'Research',
    category: 'licensing',
    description: 'Limited to research use',
  },
  commercial: {
    id: 'commercial',
    label: 'Commercial',
    category: 'licensing',
    description: 'Commercial use permitted',
  },
  enterprise: {
    id: 'enterprise',
    label: 'Enterprise',
    category: 'licensing',
    description: 'Enterprise-grade usage and support',
  },
  tiny: {
    id: 'tiny',
    label: 'Tiny (<3B)',
    category: 'size-performance',
    description: 'Under 3B parameters',
  },
  small: {
    id: 'small',
    label: 'Small (3-10B)',
    category: 'size-performance',
    description: '3B-10B parameters',
  },
  medium: {
    id: 'medium',
    label: 'Medium (10-70B)',
    category: 'size-performance',
    description: '10B-70B parameters',
  },
  large: {
    id: 'large',
    label: 'Large (70-200B)',
    category: 'size-performance',
    description: '70B-200B parameters',
  },
  precision: {
    id: 'precision',
    label: 'Precision',
    category: 'size-performance',
    description: 'High accuracy and low hallucination rate',
  },
  speed: {
    id: 'speed',
    label: 'Speed',
    category: 'size-performance',
    description: 'Fast responses and high throughput',
  },
  efficiency: {
    id: 'efficiency',
    label: 'Efficiency',
    category: 'size-performance',
    description: 'Efficient in cost or compute usage',
  },
  'cost-efficient': {
    id: 'cost-efficient',
    label: 'Cost Efficient',
    category: 'size-performance',
    description: 'Low-cost for comparable performance',
  },
  short: {
    id: 'short',
    label: 'Short (<16K)',
    category: 'context',
    description: 'Under 16K context window',
  },
  'medium-context': {
    id: 'medium-context',
    label: 'Medium (16K-64K)',
    category: 'context',
    description: '16K-64K context window',
  },
  long: {
    id: 'long',
    label: 'Long (64K-200K)',
    category: 'context',
    description: '64K-200K context window',
  },
  ultra: {
    id: 'ultra',
    label: 'Ultra (200K+)',
    category: 'context',
    description: 'Over 200K context window',
  },
  'output-2k': {
    id: 'output-2k',
    label: 'Output 2K',
    category: 'output',
    description: 'Up to 2K output tokens',
  },
  'output-4k': {
    id: 'output-4k',
    label: 'Output 4K',
    category: 'output',
    description: 'Up to 4K output tokens',
  },
  'output-8k': {
    id: 'output-8k',
    label: 'Output 8K',
    category: 'output',
    description: 'Up to 8K output tokens',
  },
  'output-16k': {
    id: 'output-16k',
    label: 'Output 16K',
    category: 'output',
    description: 'Up to 16K output tokens',
  },
  'output-32k': {
    id: 'output-32k',
    label: 'Output 32K',
    category: 'output',
    description: 'Up to 32K output tokens',
  },
  'output-64k': {
    id: 'output-64k',
    label: 'Output 64K',
    category: 'output',
    description: 'Up to 64K output tokens',
  },
  'output-128k': {
    id: 'output-128k',
    label: 'Output 128K',
    category: 'output',
    description: 'Up to 128K output tokens',
  },
  cloud: {
    id: 'cloud',
    label: 'Cloud',
    category: 'deployment',
    description: 'Cloud deployment',
  },
  local: {
    id: 'local',
    label: 'Local',
    category: 'deployment',
    description: 'Local deployment',
  },
  edge: {
    id: 'edge',
    label: 'Edge',
    category: 'deployment',
    description: 'Edge/mobile deployment',
  },
  api: {
    id: 'api',
    label: 'API',
    category: 'deployment',
    description: 'Available via API',
  },
}

export function getTag(id: ModelTagId): ModelTag {
  const tag = MODEL_TAGS[id]
  if (!tag) {
    throw new Error(`Invalid tag ID: ${id}`)
  }
  return tag
}

export function getTagsByCategory(category: TagCategory): ModelTag[] {
  return Object.values(MODEL_TAGS).filter((tag) => tag.category === category)
}

export function getAllTagIds(): ModelTagId[] {
  return Object.keys(MODEL_TAGS) as ModelTagId[]
}

export function tagIdsToLabels(ids: ModelTagId[]): string[] {
  return ids.map((id) => MODEL_TAGS[id]?.label ?? id)
}

export function isValidTagId(id: string): id is ModelTagId {
  return id in MODEL_TAGS
}

export function validateTagIds(tagIds: unknown): { valid: boolean; errors: string[] } {
  if (!Array.isArray(tagIds)) {
    return { valid: false, errors: ['tagIds must be an array'] }
  }

  const errors: string[] = []
  const seen = new Set<string>()

  tagIds.forEach((id, index) => {
    if (typeof id !== 'string') {
      errors.push(`tagIds[${index}] must be a string`)
      return
    }
    if (!isValidTagId(id)) {
      errors.push(`tagIds[${index}] "${id}" is not a valid tag ID`)
      return
    }
    if (seen.has(id)) {
      errors.push(`Duplicate tag ID: "${id}"`)
      return
    }
    seen.add(id)
  })

  return { valid: errors.length === 0, errors }
}

const OPTIONAL_TAG_CATEGORIES: Set<TagCategory> = new Set<TagCategory>(['architecture', 'output'])

export function validateTagCoverage(tagIds: ModelTagId[]): { valid: boolean; missing: TagCategory[] } {
  const covered = new Set<TagCategory>()
  for (const id of tagIds) {
    const tag = MODEL_TAGS[id]
    if (tag) covered.add(tag.category)
  }
  const missing = TAG_CATEGORY_ORDER.filter(
    (category) => !covered.has(category) && !OPTIONAL_TAG_CATEGORIES.has(category)
  )
  return { valid: missing.length === 0, missing }
}

export function validateTagConflicts(tagIds: ModelTagId[]): { valid: boolean; conflicts: string[] } {
  const conflicts: string[] = []
  const hasOpenSource = tagIds.includes('open-source')
  const hasOpenWeights = tagIds.includes('open-weights')
  if (hasOpenSource && hasOpenWeights) {
    conflicts.push('open-source and open-weights cannot both be set')
  }
  const sizeTags: ModelTagId[] = ['tiny', 'small', 'medium', 'large']
  const contextTags: ModelTagId[] = ['short', 'medium-context', 'long', 'ultra']
  const outputTags: ModelTagId[] = [
    'output-2k',
    'output-4k',
    'output-8k',
    'output-16k',
    'output-32k',
    'output-64k',
    'output-128k',
  ]
  const selectedSize = sizeTags.filter((tag) => tagIds.includes(tag))
  const selectedContext = contextTags.filter((tag) => tagIds.includes(tag))
  const selectedOutput = outputTags.filter((tag) => tagIds.includes(tag))
  if (selectedSize.length > 1) {
    conflicts.push(`only one size tag allowed (found: ${selectedSize.join(', ')})`)
  }
  if (selectedContext.length > 1) {
    conflicts.push(`only one context tag allowed (found: ${selectedContext.join(', ')})`)
  }
  if (selectedOutput.length > 1) {
    conflicts.push(`only one output tag allowed (found: ${selectedOutput.join(', ')})`)
  }
  return { valid: conflicts.length === 0, conflicts }
}
