import ModelsPageContent from './ModelsPageContent'
import FrontierModelsSection from '@/app/eval/models/FrontierModelsSection'
import { BrandCard } from '@/components/ui/brand-card'
import { getIconManifest, type ManifestIcon } from '@/lib/icon-manifest'

const iconEntries = getIconManifest().icons ?? []
const iconBySlug = new Map(iconEntries.map((entry) => [entry.slug, entry]))
const assetVariants = ['mono', 'color', 'text', 'combine', 'combine-color', 'avatar'] as const
type IconVariant = (typeof assetVariants)[number] | 'brand-color'

const TAGS = {
  frontier: 'Frontier',
  generalist: 'Generalist',
  multimodal: 'Multimodal',
  imageGen: 'Image Gen',
  videoGen: 'Video Gen',
  voiceMode: 'Voice Mode',
  speed: 'Speed',
  largeContext: 'Large Context',
  toolUse: 'Tool Use',
  computerUse: 'Computer Use',
  writing: 'Writing',
  coding: 'Coding',
  math: 'Math',
  reasoning: 'Reasoning',
  precision: 'Precision',
  search: 'Search',
  ecosystem: 'Ecosystem',
  openSource: 'Open Source',
  costEfficient: 'Cost Efficient',
  design: 'Design',
  frontend: 'Frontend',
  slides: 'Slides',
  roleplay: 'Roleplay',
  worldbuilding: 'Worldbuilding',
  instructionFollowing: 'Instruction Following',
  ideation: 'Ideation',
  productivity: 'Productivity',
  multilingual: 'Multilingual',
  creativity: 'Creativity',
  moe: 'MoE',
  efficiency: 'Efficiency',
  enterprise: 'Enterprise',
} as const

const FRONTIER_TAGS = [
  TAGS.frontier,
  TAGS.generalist,
  TAGS.multimodal,
  TAGS.imageGen,
  TAGS.videoGen,
  TAGS.voiceMode,
  TAGS.speed,
  TAGS.largeContext,
  TAGS.toolUse,
  TAGS.computerUse,
  TAGS.writing,
  TAGS.coding,
  TAGS.math,
  TAGS.reasoning,
  TAGS.precision,
  TAGS.search,
  TAGS.ecosystem,
  TAGS.openSource,
  TAGS.costEfficient,
  TAGS.design,
  TAGS.frontend,
  TAGS.slides,
  TAGS.roleplay,
  TAGS.worldbuilding,
  TAGS.instructionFollowing,
  TAGS.ideation,
  TAGS.productivity,
  TAGS.multilingual,
  TAGS.creativity,
  TAGS.moe,
  TAGS.efficiency,
  TAGS.enterprise,
]

const assetLabels: Record<(typeof assetVariants)[number], string> = {
  mono: 'Logo (mono)',
  color: 'Logo (color)',
  text: 'Text logo',
  combine: 'Combine (mono)',
  'combine-color': 'Combine (color)',
  avatar: 'Avatar (circle treatment)',
}

const assetClassNames: Partial<Record<(typeof assetVariants)[number], string>> = {
  text: 'max-w-[120px]',
  combine: 'max-w-[140px]',
  'combine-color': 'max-w-[140px]',
  avatar: 'rounded-full bg-gray-100 p-1',
}

const buildAssets = (slug: string) => {
  const entry = iconBySlug.get(slug)
  if (!entry) return undefined

  return assetVariants
    .filter((variant) => entry.variants[variant])
    .map((variant) => ({
      label: assetLabels[variant],
      src: entry.variants[variant],
      className: assetClassNames[variant],
    }))
}

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

const getFrontierModelIcon = (slug: string) => {
  if (slug === 'grok' || slug === 'openai') {
    return getVariant(slug, 'mono') ?? getVariant(slug, 'color') ?? getVariant(slug, 'avatar')
  }
  return getVariant(slug, 'color') ?? getVariant(slug, 'avatar') ?? getVariant(slug, 'mono')
}

const buildFrontierAssets = (modelSlug: string, parentSlug?: string) => ({
  ...buildBrandAssets(modelSlug, parentSlug),
  modelIconSrc: getFrontierModelIcon(modelSlug),
})

const buildOpenAiFrontierAssets = () => ({
  ...buildFrontierAssets('openai', 'openai'),
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

export const metadata = {
  title: 'Model Reports | Megaminds Eval',
  description: 'Deep dives on individual AI models.',
}

// Static data for now - will be replaced with MDX content
const models = [
]

type BrandCardProps = Parameters<typeof BrandCard>[0]
type FrontierCard = BrandCardProps & {
  key: string
  tags: string[]
}

const frontierCards: FrontierCard[] = [
  {
    key: 'chatgpt',
    href: '/eval/models/chatgpt',
    modelFamily: 'ChatGPT',
    modelVariant: '5.2',
    versionNumber: '',
    description:
      'Multimodal with top-tier coding and math; Codex tones down the worst 5.2 personality quirks, but cost and sycophancy remain concerns.',
    tags: [TAGS.multimodal, TAGS.coding, TAGS.math, TAGS.reasoning, TAGS.ideation],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: openAiWatermarkClassName,
    ...buildOpenAiFrontierAssets(),
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
    tags: [TAGS.toolUse, TAGS.computerUse, TAGS.writing, TAGS.precision, TAGS.reasoning],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: anthropicWatermarkClassName,
    ...buildFrontierAssets('claude'),
  },
  {
    key: 'claude-sonnet',
    href: '/eval/models/claude',
    modelFamily: 'Claude',
    modelVariant: 'Sonnet',
    versionNumber: '4.5',
    description:
      'Text-first with best-in-class tool use, computer control, and writing; slower, pricey, and long-context precision can degrade.',
    tags: [TAGS.toolUse, TAGS.computerUse, TAGS.writing, TAGS.precision, TAGS.reasoning],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: anthropicWatermarkClassName,
    ...buildFrontierAssets('claude'),
  },
  {
    key: 'claude-haiku',
    href: '/eval/models/claude',
    modelFamily: 'Claude',
    modelVariant: 'Haiku',
    versionNumber: '4.5',
    description:
      'Text-first with best-in-class tool use, computer control, and writing; slower, pricey, and long-context precision can degrade.',
    tags: [TAGS.toolUse, TAGS.computerUse, TAGS.writing, TAGS.precision, TAGS.reasoning],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: anthropicWatermarkClassName,
    ...buildFrontierAssets('claude'),
  },
  {
    key: 'llama',
    href: '/eval/models/llama',
    modelFamily: 'Llama',
    modelVariant: '4',
    description: 'Paragraph element',
    tags: [TAGS.openSource, TAGS.generalist, TAGS.reasoning, TAGS.coding, TAGS.frontier],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('metaai', 'meta'),
    modelTextLogoSrc: undefined,
  },
  {
    key: 'mistral',
    href: '/eval/models/mistral',
    modelFamily: 'Mistral',
    modelVariant: '3',
    versionNumber: '',
    description: 'Paragraph element',
    tags: [TAGS.openSource, TAGS.speed, TAGS.coding, TAGS.generalist, TAGS.costEfficient],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('mistral'),
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
    tags: [TAGS.costEfficient, TAGS.openSource, TAGS.reasoning, TAGS.moe, TAGS.frontier],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('deepseek'),
  },
  {
    key: 'deepseek-r1',
    href: '/eval/models/deepseek-r1',
    modelFamily: 'DeepSeek',
    modelVariant: 'R1',
    versionNumber: '',
    description:
      'The cheapest reasoning frontier model with transparent chain-of-thought. DeepSeek-R1 brings o1-level performance at a fraction of the cost, with full visibility into its thinking process.',
    tags: [TAGS.reasoning, TAGS.openSource, TAGS.costEfficient, TAGS.frontier, TAGS.coding, TAGS.math],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('deepseek'),
  },
  {
    key: 'aya',
    href: '/eval/models/cohere',
    modelFamily: 'Aya',
    modelVariant: '',
    versionNumber: '',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: [TAGS.multilingual, TAGS.writing, TAGS.reasoning, TAGS.generalist],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('aya', 'cohere'),
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
    tags: [TAGS.search, TAGS.reasoning, TAGS.speed, TAGS.toolUse],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('sonar', 'perplexity'),
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
    tags: [TAGS.enterprise, TAGS.reasoning, TAGS.coding, TAGS.generalist],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('nvidia', 'nvidia'),
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
    tags: [TAGS.openSource, TAGS.multimodal, TAGS.coding, TAGS.reasoning, TAGS.multilingual],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: alibabaWatermarkClassName,
    ...buildFrontierAssets('qwen', 'alibaba'),
  },
  {
    key: 'manus',
    href: '/eval/models/manus',
    modelFamily: 'Manus',
    modelVariant: '',
    versionNumber: '',
    description: 'Paragraph element',
    tags: [TAGS.productivity, TAGS.toolUse, TAGS.generalist, TAGS.reasoning],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('manus'),
    modelIconSrc: getVariant('manus', 'mono'),
  },
  {
    key: 'gemma',
    href: '/eval/models/gemma',
    modelFamily: 'Gemma',
    modelVariant: '3',
    versionNumber: '',
    description: 'Paragraph element',
    tags: [TAGS.openSource, TAGS.efficiency, TAGS.generalist, TAGS.reasoning],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('gemma', 'google'),
  },
  {
    key: 'hermes',
    href: '/eval/models/nous',
    modelFamily: 'Hermes',
    modelVariant: '3',
    versionNumber: '',
    description: 'Open-source model tuned for roleplay and long-term context; not a frontier SOTA model.',
    tags: [
      TAGS.largeContext,
      TAGS.roleplay,
      TAGS.openSource,
      TAGS.worldbuilding,
      TAGS.instructionFollowing,
    ],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('nousresearch'),
    modelTextLogoSrc: undefined,
  },
  {
    key: 'kimi',
    href: '/eval/models/kimi',
    modelFamily: 'Kimi',
    modelVariant: 'K2',
    versionNumber: '',
    description: 'Design-forward model great for slides, frontend, and programming with solid tools; 256k context.',
    tags: [TAGS.design, TAGS.frontend, TAGS.slides, TAGS.coding, TAGS.toolUse],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('kimi', 'moonshot'),
  },
  {
    key: 'gemini-pro',
    href: '/eval/models/gemini',
    modelFamily: 'Gemini',
    modelVariant: '3',
    versionNumber: 'Pro',
    description:
      'Blazing-fast multimodal model with huge context and strong Google ecosystem integration; fine detail can blur and tools can be flaky.',
    tags: [TAGS.multimodal, TAGS.imageGen, TAGS.videoGen, TAGS.speed, TAGS.largeContext, TAGS.ecosystem],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('gemini'),
  },
  {
    key: 'gemini-flash',
    href: '/eval/models/gemini',
    modelFamily: 'Gemini',
    modelVariant: '3',
    versionNumber: 'Flash',
    description:
      'Incredibly fast multimodal model with massive context and Google integration; less precise on fine detail and tools can stumble.',
    tags: [TAGS.multimodal, TAGS.imageGen, TAGS.speed, TAGS.largeContext, TAGS.ecosystem],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('gemini'),
  },
  {
    key: 'grok',
    href: '/eval/models/grok',
    modelFamily: 'Grok',
    modelVariant: '',
    versionNumber: '4',
    description: 'Uncensored, multimodal model with strong search and large context; safety issues and uneven free access.',
    tags: [TAGS.multimodal, TAGS.imageGen, TAGS.videoGen, TAGS.voiceMode, TAGS.search, TAGS.largeContext],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: xaiWatermarkClassName,
    ...buildFrontierAssets('grok'),
  },
  {
    key: 'copilot',
    href: '/eval/models/copilot',
    modelFamily: 'Copilot',
    modelVariant: '',
    versionNumber: 'ChatGPT',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: [TAGS.coding, TAGS.productivity, TAGS.toolUse, TAGS.ecosystem],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('copilot', 'microsoft'),
  },
  {
    key: 'ernie',
    href: '/eval/models/ernie',
    modelFamily: 'Ernie',
    modelVariant: '',
    versionNumber: '5.2',
    description: 'Paragraph element',
    tags: [TAGS.multimodal, TAGS.ecosystem, TAGS.search, TAGS.reasoning],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('wenxin', 'baidu'),
    modelTextLogoSrc: undefined,
  },
  {
    key: 'glm',
    href: '/eval/models/glm',
    modelFamily: 'GLM',
    modelVariant: '',
    versionNumber: '4.7',
    description: 'Paragraph element',
    tags: [TAGS.generalist, TAGS.reasoning, TAGS.multilingual, TAGS.openSource],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('chatglm', 'zai'),
  },
  {
    key: 'minimax',
    href: '/eval/models/minimax',
    modelFamily: 'Minimax',
    modelVariant: 'M2.1',
    versionNumber: 'Preview',
    variantLayout: 'stacked' as const,
    description: 'Paragraph element',
    tags: [TAGS.multimodal, TAGS.videoGen, TAGS.speed, TAGS.creativity],
    modelLogoLabel: 'Model logo',
    parentBrandingLabel: 'Parent company branding',
    watermarkClassName: wideWatermarkClassName,
    ...buildFrontierAssets('minimax'),
  },
]

export default function ModelsPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Model Reports</h1>
        <p className="mt-4 text-lg text-gray-600">
          Deep dives on frontier models. What they're good at, where they struggle,
          and when to use them.
        </p>

        <FrontierModelsSection cards={frontierCards} tags={FRONTIER_TAGS} />

        <ModelsPageContent models={models} />
      </div>
    </div>
  )
}
