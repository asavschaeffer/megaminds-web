import { getIconManifest } from '@/lib/icon-manifest'
import type { BrandCardProps } from '@/components/ui/brand-card'
import type { ModelTagId } from '@/lib/models/tags'
import { getAllTagIds } from '@/lib/models/tags'
import { getModelBySlug } from '@/lib/models/registry'

const iconEntries = getIconManifest().icons ?? []
const iconBySlug = new Map(iconEntries.map((entry) => [entry.slug, entry]))
const assetVariants = ['mono', 'color', 'text', 'combine', 'combine-color', 'avatar'] as const
type IconVariant = (typeof assetVariants)[number] | 'brand-color'

export const MODEL_TAGS = getAllTagIds()

const getVariant = (slug: string | undefined, variant: IconVariant) => {
  if (!slug) return undefined
  return iconBySlug.get(slug)?.variants[variant]
}

const getModelIcon = (slug: string) =>
  getVariant(slug, 'avatar') ?? getVariant(slug, 'color') ?? getVariant(slug, 'mono')

const getModelWordmark = (slug: string) =>
  getVariant(slug, 'text') ?? getVariant(slug, 'combine') ?? getVariant(slug, 'mono')

const getParentWatermark = (slug: string) =>
  getVariant(slug, 'color') ??
  getVariant(slug, 'brand-color') ??
  getVariant(slug, 'mono') ??
  getVariant(slug, 'avatar') ??
  getVariant(slug, 'combine-color') ??
  getVariant(slug, 'combine')

const buildBrandAssets = (modelSlug: string, parentSlug?: string) => {
  const parent = parentSlug ?? iconBySlug.get(modelSlug)?.parent ?? modelSlug
  return {
    modelIconSrc: getModelIcon(modelSlug),
    modelTextLogoSrc: getModelWordmark(modelSlug),
    parentIconSrc: parent ? getParentWatermark(parent) : undefined,
  }
}

const getModelsIcon = (slug: string) => {
  if (slug === 'grok' || slug === 'openai') {
    return getVariant(slug, 'mono') ?? getVariant(slug, 'color') ?? getVariant(slug, 'avatar')
  }
  return getVariant(slug, 'color') ?? getVariant(slug, 'avatar') ?? getVariant(slug, 'mono')
}

const buildModelAssets = (modelSlug: string, parentSlug?: string) => ({
  ...buildBrandAssets(modelSlug, parentSlug),
  modelIconSrc: getModelsIcon(modelSlug),
})

const buildOpenAiAssets = () => ({
  ...buildModelAssets('openai', 'openai'),
  parentIconSrc: getVariant('openai', 'color') ?? getVariant('openai', 'mono'),
  watermarkAlign: 'left' as const,
})

const wideWatermarkClassName =
  'absolute -right-1 top-1/2 h-[155%] w-auto -translate-y-1/2 translate-x-[4%] rotate-[9deg] opacity-[0.12] sm:-right-2 sm:h-[165%] sm:translate-x-[6%] lg:-right-4 lg:h-[175%] lg:translate-x-[8%]'
const anthropicWatermarkClassName =
  'absolute -right-1 top-[56%] h-[135%] w-auto -translate-y-1/2 translate-x-[4%] rotate-[9deg] opacity-[0.12] sm:-right-2 sm:h-[145%] sm:translate-x-[6%] lg:-right-4 lg:h-[155%] lg:translate-x-[8%]'
const xaiWatermarkClassName =
  'absolute -right-1 top-[48%] h-[135%] w-auto -translate-y-1/2 translate-x-[0%] rotate-[9deg] opacity-[0.12] sm:-right-2 sm:h-[145%] sm:translate-x-[2%] lg:-right-4 lg:h-[155%] lg:translate-x-[4%]'
const openAiWatermarkClassName =
  'absolute -right-2 top-1/2 h-[170%] w-auto -translate-y-1/2 translate-x-[10%] rotate-[9deg] opacity-[0.12] sm:-right-3 sm:h-[180%] sm:translate-x-[12%] lg:-right-4 lg:h-[190%] lg:translate-x-[14%]'
const alibabaWatermarkClassName =
  'absolute -right-3 top-1/2 h-[190%] w-auto -translate-y-1/2 translate-x-[26%] rotate-[9deg] opacity-[0.12] sm:-right-4 sm:h-[205%] sm:translate-x-[28%] lg:-right-6 lg:h-[220%] lg:translate-x-[30%]'

type ModelCard = BrandCardProps & {
  key: string
  tags: ModelTagId[]
}

export const modelCards: ModelCard[] = [
  {
    key: 'chatgpt',
    href: '/eval/models/chatgpt',
    modelFamily: 'ChatGPT',
    modelVariant: '5.2',
    versionNumber: '',
    description:
      'Multimodal with top-tier coding and math; Codex tones down the worst 5.2 personality quirks, but cost and sycophancy remain concerns.',
    tags: ['multimodal', 'coding', 'math', 'reasoning', 'ideation'],
    organizationId: 'openai',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    modelFamilyClassName: 'text-2xl font-medium tracking-tight',
    watermarkClassName: openAiWatermarkClassName,
    ...buildOpenAiAssets(),
    modelTextLogoSrc: undefined,
  },
  {
    key: 'claude-opus',
    href: '/eval/models/claude',
    modelFamily: 'Claude',
    modelVariant: 'Opus',
    versionNumber: '4.5',
    description:
      'Text-first with best-in-class tool use, computer control, and writing; slower, pricey, and long-context precision can degrade.',
    tags: ['tool-use', 'instruction', 'writing', 'precision', 'reasoning'],
    organizationId: 'anthropic',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: anthropicWatermarkClassName,
    ...buildModelAssets('claude'),
  },
  {
    key: 'claude-sonnet',
    href: '/eval/models/claude',
    modelFamily: 'Claude',
    modelVariant: 'Sonnet',
    versionNumber: '4.5',
    description:
      'Text-first with best-in-class tool use, computer control, and writing; slower, pricey, and long-context precision can degrade.',
    tags: ['tool-use', 'instruction', 'writing', 'precision', 'reasoning'],
    organizationId: 'anthropic',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: anthropicWatermarkClassName,
    ...buildModelAssets('claude'),
  },
  {
    key: 'claude-haiku',
    href: '/eval/models/claude',
    modelFamily: 'Claude',
    modelVariant: 'Haiku',
    versionNumber: '4.5',
    description:
      'Text-first with best-in-class tool use, computer control, and writing; slower, pricey, and long-context precision can degrade.',
    tags: ['tool-use', 'instruction', 'writing', 'precision', 'reasoning'],
    organizationId: 'anthropic',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: anthropicWatermarkClassName,
    ...buildModelAssets('claude'),
  },
  {
    key: 'llama',
    href: '/eval/models/llama',
    modelFamily: 'Llama',
    modelVariant: '4',
    description: 'Paragraph element',
    tags: ['open-source', 'generalist', 'reasoning', 'coding', 'frontier'],
    organizationId: 'meta',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('metaai', 'meta'),
    modelTextLogoSrc: undefined,
  },
  {
    key: 'mistral',
    href: '/eval/models/mistral',
    modelFamily: 'Mistral',
    modelVariant: '3',
    versionNumber: '',
    description: 'Paragraph element',
    tags: ['open-source', 'speed', 'coding', 'generalist', 'cost-efficient'],
    organizationId: 'mistral',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('mistral'),
    modelTextLogoSrc: undefined,
  },
  {
    key: 'deepseek',
    href: '/eval/models/deepseek',
    modelFamily: 'DeepSeek',
    modelVariant: 'R1/V3',
    versionNumber: '',
    description:
      'Low-cost, open model with strong reasoning traces and a smart team; not always SOTA despite rumors.',
    tags: ['cost-efficient', 'open-source', 'reasoning', 'moe', 'frontier'],
    organizationId: 'deepseek',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('deepseek'),
  },
  {
    key: 'deepseek-r1',
    href: '/eval/models/deepseek-r1',
    modelFamily: 'DeepSeek',
    modelVariant: 'R1',
    versionNumber: '',
    description:
      'The cheapest reasoning frontier model with transparent chain-of-thought. DeepSeek-R1 brings o1-level performance at a fraction of the cost, with full visibility into its thinking process.',
    tags: ['reasoning', 'open-source', 'cost-efficient', 'frontier', 'coding', 'math'],
    organizationId: 'deepseek',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('deepseek'),
  },
  {
    key: 'aya',
    href: '/eval/models/cohere',
    modelFamily: 'Aya',
    modelVariant: '',
    versionNumber: '',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: ['translation', 'writing', 'reasoning', 'generalist'],
    organizationId: 'cohere',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('aya', 'cohere'),
    sublineLogoSrc: getVariant('cohere', 'text'),
    sublineLogoLabel: 'Cohere',
  },
  {
    key: 'sonar',
    href: '/eval/models/perplexity',
    modelFamily: 'Sonar',
    modelVariant: '',
    versionNumber: 'Perplexity',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: ['search', 'reasoning', 'speed', 'tool-use'],
    organizationId: 'perplexity',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('sonar', 'perplexity'),
    modelIconSrc: getModelIcon('perplexity'),
  },
  {
    key: 'nemotron',
    href: '/eval/models/nvidia',
    modelFamily: 'Nemotron',
    modelVariant: '',
    versionNumber: '',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: ['enterprise', 'reasoning', 'coding', 'generalist'],
    organizationId: 'nvidia',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('nvidia', 'nvidia'),
    modelTextLogoSrc: undefined,
    sublineLogoSrc: getVariant('nvidia', 'text'),
    sublineLogoLabel: 'Nvidia',
    modelFamilyClassName: 'text-xl',
  },
  {
    key: 'qwen',
    href: '/eval/models/qwen',
    modelFamily: 'Qwen',
    modelVariant: '3',
    versionNumber: '',
    description: 'Paragraph element',
    tags: ['open-source', 'multimodal', 'coding', 'reasoning', 'translation'],
    organizationId: 'alibaba',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: alibabaWatermarkClassName,
    ...buildModelAssets('qwen', 'alibaba'),
  },
  {
    key: 'manus',
    href: '/eval/models/manus',
    modelFamily: 'Manus',
    modelVariant: '',
    versionNumber: '',
    description: 'Paragraph element',
    tags: ['tool-use', 'generalist', 'reasoning', 'instruction'],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('manus'),
    modelIconSrc: getVariant('manus', 'mono'),
  },
  {
    key: 'gemma',
    href: '/eval/models/gemma',
    modelFamily: 'Gemma',
    modelVariant: '3',
    versionNumber: '',
    description: 'Paragraph element',
    tags: ['open-source', 'efficiency', 'generalist', 'reasoning'],
    organizationId: 'google',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('gemma', 'google'),
  },
  {
    key: 'hermes',
    href: '/eval/models/nous',
    modelFamily: 'Hermes',
    modelVariant: '3',
    versionNumber: '',
    description: 'Open-source model tuned for roleplay and long-term context; not a frontier SOTA model.',
    tags: ['long', 'roleplay', 'open-source', 'worldbuilding', 'instruction'],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('nousresearch'),
    modelTextLogoSrc: undefined,
  },
  ...(() => {
    const kimiK25 = getModelBySlug('kimi-k2-5')
    return kimiK25
      ? [
        {
          key: 'kimi-k2-5',
          model: kimiK25,
          tags: (kimiK25?.meta.tagIds ?? []) as ModelTagId[],
          organizationId: 'moonshot',
          modelLogoLabel: 'Model logo',
          parentBrandingLabel: 'Parent company branding',
          watermarkClassName: wideWatermarkClassName,
          ...buildModelAssets('kimi', 'moonshot'),
        },
      ]
      : []
  })(),
  ...(() => {
    const geminiPro = getModelBySlug('gemini-3-pro')
    const geminiFlash = getModelBySlug('gemini-3-flash')
    return [
      {
        key: 'gemini-pro',
        model: geminiPro,
        tags: (geminiPro?.meta.tagIds ?? []) as ModelTagId[],
        modelLogoLabel: 'Model logo',
        parentBrandingLabel: 'Parent company branding',
        watermarkClassName: wideWatermarkClassName,
        ...buildModelAssets('gemini'),
      },
      {
        key: 'gemini-flash',
        model: geminiFlash,
        tags: (geminiFlash?.meta.tagIds ?? []) as ModelTagId[],
        modelLogoLabel: 'Model logo',
        parentBrandingLabel: 'Parent company branding',
        watermarkClassName: wideWatermarkClassName,
        ...buildModelAssets('gemini'),
      },
    ]
  })(),
  {
    key: 'grok',
    href: '/eval/models/grok',
    modelFamily: 'Grok',
    modelVariant: '',
    versionNumber: '4',
    description: 'Uncensored, multimodal model with strong search and large context; safety issues and uneven free access.',
    tags: ['multimodal', 'image-gen', 'video-gen', 'audio', 'search', 'long'],
    organizationId: 'xai',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: xaiWatermarkClassName,
    ...buildModelAssets('grok'),
  },
  {
    key: 'copilot',
    href: '/eval/models/copilot',
    modelFamily: 'Copilot',
    modelVariant: '',
    versionNumber: 'ChatGPT',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: ['coding', 'tool-use', 'instruction'],
    organizationId: 'microsoft',
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('copilot', 'microsoft'),
  },
  {
    key: 'ernie',
    href: '/eval/models/ernie',
    modelFamily: 'Ernie',
    modelVariant: '',
    versionNumber: '5.2',
    description: 'Paragraph element',
    tags: ['multimodal', 'search', 'reasoning'],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('wenxin', 'baidu'),
    modelTextLogoSrc: undefined,
  },
  {
    key: 'glm',
    href: '/eval/models/glm',
    modelFamily: 'GLM',
    modelVariant: '',
    versionNumber: '4.7',
    description: 'Paragraph element',
    tags: ['generalist', 'reasoning', 'translation', 'open-source'],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('chatglm', 'zai'),
  },
  {
    key: 'minimax',
    href: '/eval/models/minimax',
    modelFamily: 'Minimax',
    modelVariant: 'M2.1',
    versionNumber: 'Preview',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: ['multimodal', 'video-gen', 'speed', 'creativity'],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildModelAssets('minimax'),
  },
]
