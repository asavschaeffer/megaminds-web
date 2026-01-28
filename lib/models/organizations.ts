export interface Organization {
  id: string
  name: string
  description?: string
  website?: string
  iconId?: string
  region?: string
  type?: 'company' | 'research-lab' | 'non-profit' | 'government' | 'community'
}

export type OrganizationId =
  | 'openai'
  | 'anthropic'
  | 'google'
  | 'google-deepmind'
  | 'meta'
  | 'mistral'
  | 'deepseek'
  | 'alibaba'
  | 'cohere'
  | 'ai21'
  | 'stability'
  | 'huggingface'
  | 'microsoft'
  | 'nvidia'
  | 'amazon'
  | 'xai'
  | 'together'
  | 'perplexity'
  | 'inflection'
  | 'baichuan'
  | 'zhipu'
  | '01ai'
  | 'moonshot'

export const ORGANIZATIONS: Record<OrganizationId, Organization> = {
  openai: {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI research company behind GPT and ChatGPT',
    website: 'https://openai.com',
    iconId: 'openai',
    region: 'USA',
    type: 'company',
  },
  anthropic: {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'AI safety company behind Claude',
    website: 'https://anthropic.com',
    iconId: 'anthropic',
    region: 'USA',
    type: 'company',
  },
  google: {
    id: 'google',
    name: 'Google',
    description: 'Google AI and Gemini models',
    website: 'https://ai.google',
    iconId: 'google',
    region: 'USA',
    type: 'company',
  },
  'google-deepmind': {
    id: 'google-deepmind',
    name: 'Google DeepMind',
    description: 'Google DeepMind research lab',
    website: 'https://deepmind.google',
    iconId: 'google',
    region: 'UK',
    type: 'research-lab',
  },
  meta: {
    id: 'meta',
    name: 'Meta',
    description: 'Meta AI and Llama models',
    website: 'https://ai.meta.com',
    iconId: 'meta',
    region: 'USA',
    type: 'company',
  },
  mistral: {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'European AI company',
    website: 'https://mistral.ai',
    iconId: 'mistral',
    region: 'France',
    type: 'company',
  },
  deepseek: {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Chinese AI research company',
    website: 'https://deepseek.com',
    iconId: 'deepseek',
    region: 'China',
    type: 'company',
  },
  alibaba: {
    id: 'alibaba',
    name: 'Alibaba',
    description: 'Alibaba Cloud and Qwen models',
    website: 'https://www.alibabacloud.com',
    iconId: 'alibaba',
    region: 'China',
    type: 'company',
  },
  cohere: {
    id: 'cohere',
    name: 'Cohere',
    description: 'Enterprise AI company',
    website: 'https://cohere.com',
    iconId: 'cohere',
    region: 'Canada',
    type: 'company',
  },
  ai21: {
    id: 'ai21',
    name: 'AI21 Labs',
    description: 'AI research company behind Jurassic',
    website: 'https://ai21.com',
    iconId: 'ai21',
    region: 'Israel',
    type: 'company',
  },
  stability: {
    id: 'stability',
    name: 'Stability AI',
    description: 'Open generative AI company',
    website: 'https://stability.ai',
    iconId: 'stability',
    region: 'UK',
    type: 'company',
  },
  huggingface: {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'AI community and model hub',
    website: 'https://huggingface.co',
    iconId: 'huggingface',
    region: 'USA',
    type: 'company',
  },
  microsoft: {
    id: 'microsoft',
    name: 'Microsoft',
    description: 'Microsoft AI and Azure',
    website: 'https://www.microsoft.com/ai',
    iconId: 'microsoft',
    region: 'USA',
    type: 'company',
  },
  nvidia: {
    id: 'nvidia',
    name: 'NVIDIA',
    description: 'GPU and AI infrastructure company',
    website: 'https://www.nvidia.com/ai',
    iconId: 'nvidia',
    region: 'USA',
    type: 'company',
  },
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    description: 'AWS and Bedrock AI services',
    website: 'https://aws.amazon.com/bedrock',
    iconId: 'amazon',
    region: 'USA',
    type: 'company',
  },
  xai: {
    id: 'xai',
    name: 'xAI',
    description: "Elon Musk's AI company behind Grok",
    website: 'https://x.ai',
    iconId: 'xai',
    region: 'USA',
    type: 'company',
  },
  together: {
    id: 'together',
    name: 'Together AI',
    description: 'Open model inference platform',
    website: 'https://together.ai',
    iconId: 'together',
    region: 'USA',
    type: 'company',
  },
  perplexity: {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI-powered search engine',
    website: 'https://perplexity.ai',
    iconId: 'perplexity',
    region: 'USA',
    type: 'company',
  },
  inflection: {
    id: 'inflection',
    name: 'Inflection AI',
    description: 'AI company behind Pi',
    website: 'https://inflection.ai',
    iconId: 'inflection',
    region: 'USA',
    type: 'company',
  },
  baichuan: {
    id: 'baichuan',
    name: 'Baichuan',
    description: 'Chinese AI company',
    website: 'https://www.baichuan-ai.com',
    iconId: 'baichuan',
    region: 'China',
    type: 'company',
  },
  zhipu: {
    id: 'zhipu',
    name: 'Zhipu AI',
    description: 'Chinese AI company behind GLM',
    website: 'https://www.zhipuai.cn',
    iconId: 'zhipu',
    region: 'China',
    type: 'company',
  },
  '01ai': {
    id: '01ai',
    name: '01.AI',
    description: 'AI company behind Yi models',
    website: 'https://01.ai',
    iconId: '01ai',
    region: 'China',
    type: 'company',
  },
  moonshot: {
    id: 'moonshot',
    name: 'Moonshot AI',
    description: 'Chinese AI company behind Kimi',
    website: 'https://moonshot.cn',
    iconId: 'moonshot',
    region: 'China',
    type: 'company',
  },
}

export function getOrganization(id: OrganizationId): Organization {
  return ORGANIZATIONS[id]
}

export function getAllOrganizations(): Organization[] {
  return Object.values(ORGANIZATIONS)
}

export function getOrganizationsByRegion(region: string): Organization[] {
  return Object.values(ORGANIZATIONS).filter((org) => org.region === region)
}

export function getOrganizationsByType(type: Organization['type']): Organization[] {
  return Object.values(ORGANIZATIONS).filter((org) => org.type === type)
}

export function isValidOrganizationId(id: string): id is OrganizationId {
  return id in ORGANIZATIONS
}

export function getOrganizationIconId(id: OrganizationId): string {
  return ORGANIZATIONS[id]?.iconId ?? id
}
