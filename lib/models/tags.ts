export type TagCategory =
  | 'capability'
  | 'modality'
  | 'architecture'
  | 'license'
  | 'size'
  | 'context'
  | 'provider'

export interface ModelTag {
  id: string
  label: string
  category: TagCategory
  description?: string
  icon?: string
}

export type ModelTagId =
  | 'reasoning'
  | 'coding'
  | 'math'
  | 'creative-writing'
  | 'analysis'
  | 'translation'
  | 'summarization'
  | 'agents'
  | 'function-calling'
  | 'chain-of-thought'
  | 'search'
  | 'rag'
  | 'text'
  | 'vision'
  | 'audio'
  | 'image-gen'
  | 'video'
  | 'multimodal'
  | 'transformer'
  | 'moe'
  | 'dense'
  | 'hybrid'
  | 'ssm'
  | 'open-source'
  | 'open-weights'
  | 'proprietary'
  | 'research-only'
  | 'commercial'
  | 'small'
  | 'medium'
  | 'large'
  | 'frontier'
  | 'short-context'
  | 'medium-context'
  | 'long-context'
  | 'ultra-context'
  | 'api-available'
  | 'local-deployment'
  | 'edge-deployment'
  | 'cloud-only'

export const MODEL_TAGS: Record<ModelTagId, ModelTag> = {
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
  'creative-writing': {
    id: 'creative-writing',
    label: 'Creative Writing',
    category: 'capability',
    description: 'Fiction, poetry, and creative content generation',
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
  agents: {
    id: 'agents',
    label: 'Agents',
    category: 'capability',
    description: 'Suitable for autonomous agent workflows',
  },
  'function-calling': {
    id: 'function-calling',
    label: 'Function Calling',
    category: 'capability',
    description: 'Native tool/function calling support',
  },
  'chain-of-thought': {
    id: 'chain-of-thought',
    label: 'Chain-of-Thought',
    category: 'capability',
    description: 'Explicit reasoning traces',
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
    label: 'Image Generation',
    category: 'modality',
    description: 'Image generation capabilities',
  },
  video: {
    id: 'video',
    label: 'Video',
    category: 'modality',
    description: 'Video understanding or generation',
  },
  multimodal: {
    id: 'multimodal',
    label: 'Multimodal',
    category: 'modality',
    description: 'Multiple input/output modalities',
  },
  transformer: {
    id: 'transformer',
    label: 'Transformer',
    category: 'architecture',
    description: 'Standard transformer architecture',
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
    category: 'license',
    description: 'Fully open source with code and weights',
  },
  'open-weights': {
    id: 'open-weights',
    label: 'Open Weights',
    category: 'license',
    description: 'Weights available for download',
  },
  proprietary: {
    id: 'proprietary',
    label: 'Proprietary',
    category: 'license',
    description: 'Closed source, API-only access',
  },
  'research-only': {
    id: 'research-only',
    label: 'Research Only',
    category: 'license',
    description: 'Limited to research use',
  },
  commercial: {
    id: 'commercial',
    label: 'Commercial',
    category: 'license',
    description: 'Commercial use permitted',
  },
  small: {
    id: 'small',
    label: 'Small (<10B)',
    category: 'size',
    description: 'Under 10 billion parameters',
  },
  medium: {
    id: 'medium',
    label: 'Medium (10-70B)',
    category: 'size',
    description: '10-70 billion parameters',
  },
  large: {
    id: 'large',
    label: 'Large (70-200B)',
    category: 'size',
    description: '70-200 billion parameters',
  },
  frontier: {
    id: 'frontier',
    label: 'Frontier',
    category: 'size',
    description: 'Frontier-scale model (200B+ or large MoE)',
  },
  'short-context': {
    id: 'short-context',
    label: 'Short Context',
    category: 'context',
    description: 'Under 16K context window',
  },
  'medium-context': {
    id: 'medium-context',
    label: 'Medium Context',
    category: 'context',
    description: '16K-64K context window',
  },
  'long-context': {
    id: 'long-context',
    label: 'Long Context',
    category: 'context',
    description: '64K-200K context window',
  },
  'ultra-context': {
    id: 'ultra-context',
    label: 'Ultra Context',
    category: 'context',
    description: 'Over 200K context window',
  },
  'api-available': {
    id: 'api-available',
    label: 'API Available',
    category: 'provider',
    description: 'Available via API',
  },
  'local-deployment': {
    id: 'local-deployment',
    label: 'Local Deployment',
    category: 'provider',
    description: 'Can run locally',
  },
  'edge-deployment': {
    id: 'edge-deployment',
    label: 'Edge Deployment',
    category: 'provider',
    description: 'Suitable for edge/mobile deployment',
  },
  'cloud-only': {
    id: 'cloud-only',
    label: 'Cloud Only',
    category: 'provider',
    description: 'Only available via cloud API',
  },
}

export function getTag(id: ModelTagId): ModelTag {
  return MODEL_TAGS[id]
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
