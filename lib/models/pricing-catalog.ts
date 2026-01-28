export type PricingCatalogEntry = {
  name: string
  input: number
  output: number
  provider?: string
}

export const PRICING_CATALOG: PricingCatalogEntry[] = [
  {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    input: 3.0,
    output: 15.0,
  },
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    input: 2.5,
    output: 10.0,
  },
  {
    name: 'OpenAI o1',
    provider: 'OpenAI',
    input: 15.0,
    output: 60.0,
  },
]
