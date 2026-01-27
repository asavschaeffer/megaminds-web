import 'server-only'
import { getIconManifest } from '@/lib/icon-manifest'
import { Cpu } from 'lucide-react'

interface ModelIconProps {
  name: string
  size?: number
  className?: string
}

type ManifestIcon = {
  slug: string
  variants: Record<string, string>
}

const iconEntries = getIconManifest().icons ?? []
const iconBySlug = new Map(iconEntries.map((entry) => [entry.slug, entry]))

const variantPriority = ['color', 'combine-color', 'mono', 'combine', 'text', 'avatar']

const brandFallback: Record<string, string> = {
  gemini: 'google',
  copilot: 'microsoft',
}

const getIconSrc = (slug: string) => {
  const variants = iconBySlug.get(slug)?.variants ?? null
  if (!variants) return null
  for (const variant of variantPriority) {
    const src = variants[variant]
    if (src) return src
  }
  return null
}

const iconMatchers: Array<{ slug: string; patterns: RegExp[] }> = [
  { slug: 'claude', patterns: [/claude/i, /anthropic/i] },
  { slug: 'gemini', patterns: [/gemini/i, /google/i] },
  { slug: 'open-ai', patterns: [/openai/i, /chat\s*gpt/i, /codex/i, /gpt/i] },
  { slug: 'deep-seek', patterns: [/deepseek/i] },
  { slug: 'meta-ai', patterns: [/meta\s*ai/i, /metaai/i] },
  { slug: 'meta', patterns: [/\bllama\b/i, /\bmeta\b/i] },
  { slug: 'mistral', patterns: [/mistral/i] },
  { slug: 'kimi', patterns: [/moonshot/i, /kimi/i] },
  { slug: 'cohere', patterns: [/cohere/i] },
  { slug: 'perplexity', patterns: [/perplexity/i] },
  { slug: 'grok', patterns: [/grok/i, /\bxai\b/i, /\bx\.ai\b/i] },
  { slug: 'nvidia', patterns: [/nvidia/i, /nemotron/i] },
  { slug: 'copilot', patterns: [/microsoft/i, /copilot/i] },
  { slug: 'hugging-face', patterns: [/hugging\s*face/i, /huggingface/i] },
  { slug: 'midjourney', patterns: [/midjourney/i] },
  { slug: 'qwen', patterns: [/qwen/i, /alibaba/i] },
  { slug: 'gemma', patterns: [/gemma/i] },
  { slug: 'manus', patterns: [/manus/i] },
  { slug: 'nous-research', patterns: [/nous/i] },
  { slug: 'adobe-firefly', patterns: [/firefly/i, /adobe\s*firefly/i] },
]

export function ModelIcon({ name, size = 32, className }: ModelIconProps) {
  const matched = iconMatchers.find((matcher) => matcher.patterns.some((pattern) => pattern.test(name)))
  let src = matched ? getIconSrc(matched.slug) : null

  if (!src && matched) {
    const fallbackSlug = brandFallback[matched.slug]
    if (fallbackSlug) {
      src = getIconSrc(fallbackSlug)
    }
  }

  if (src) {
    return (
      <img
        src={src}
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size }}
        alt={`${name} logo`}
      />
    )
  }

  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-full ${className}`} style={{ width: size, height: size }}>
      <Cpu size={size * 0.6} className="text-gray-500" />
    </div>
  )
}
