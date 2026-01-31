/**
 * Shared pricing reference for model comparison
 * Single source of truth for competitor pricing data
 */

export interface ModelPricingReference {
  id: string
  name: string
  provider: string
  input: number
  output: number
  cachedInput?: number
  currency?: string
  unit?: string
  lastUpdated?: string
}

export const MODEL_PRICING_REFERENCES: Record<string, ModelPricingReference> = {
  'gemini-3-pro': {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    provider: 'Google AI Studio',
    input: 2.0,
    output: 12.0,
    currency: 'USD',
    unit: 'per million tokens',
    lastUpdated: '2025-11-18',
  },
  'gemini-3-flash': {
    id: 'gemini-3-flash',
    name: 'Gemini 3 Flash',
    provider: 'Google AI Studio',
    input: 0.5,
    output: 3.0,
    currency: 'USD',
    unit: 'per million tokens',
    lastUpdated: '2025-12-17',
  },
  'gpt-5-1': {
    id: 'gpt-5-1',
    name: 'GPT-5.1',
    provider: 'OpenAI',
    input: 1.25,
    output: 10.0,
    currency: 'USD',
    unit: 'per million tokens',
  },
  'gpt-5-2': {
    id: 'gpt-5-2',
    name: 'GPT-5.2',
    provider: 'OpenAI',
    input: 1.0,
    output: 6.0,
    currency: 'USD',
    unit: 'per million tokens',
  },
  'claude-opus-4-5': {
    id: 'claude-opus-4-5',
    name: 'Claude Opus 4.5',
    provider: 'Anthropic',
    input: 3.0,
    output: 15.0,
    currency: 'USD',
    unit: 'per million tokens',
  },
  'qwen-3-max': {
    id: 'qwen-3-max',
    name: 'Qwen 3 Max',
    provider: 'Alibaba Cloud',
    input: 0.861,
    output: 3.441,
    currency: 'USD',
    unit: 'per million tokens',
    lastUpdated: '2026-01-25',
  },
  'kimi-k2-5': {
    id: 'kimi-k2-5',
    name: 'Kimi K2.5',
    provider: 'Moonshot AI',
    input: 0.15,
    output: 3.0,
    cachedInput: 0.15,
    currency: 'USD',
    unit: 'per million tokens',
    lastUpdated: '2026-01-15',
  },
  'deepseek-v3-2': {
    id: 'deepseek-v3-2',
    name: 'DeepSeek V3.2',
    provider: 'DeepSeek',
    input: 0.14,
    output: 0.28,
    currency: 'USD',
    unit: 'per million tokens',
    lastUpdated: '2025-12-01',
  },
}

export function getModelPricing(modelId: string): ModelPricingReference | undefined {
  return MODEL_PRICING_REFERENCES[modelId]
}

export function getAllCompetitorPricing(excludeIds: string[] = []): ModelPricingReference[] {
  return Object.values(MODEL_PRICING_REFERENCES).filter(
    (ref) => !excludeIds.includes(ref.id)
  )
}
