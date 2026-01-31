'use client'

import { Cpu } from 'lucide-react'

type ModelIconClientProps = {
  name: string
  size?: number
  className?: string
}

const iconMatchers: Array<{ pattern: RegExp; src: string }> = [
  { pattern: /claude|anthropic/i, src: '/icons/claude/claude-color.svg' },
  { pattern: /gemini|google/i, src: '/icons/gemini/gemini-color.svg' },
  { pattern: /chat\s*gpt|codex|openai|gpt/i, src: '/icons/openai/openai-avatar.svg' },
  { pattern: /deepseek/i, src: '/icons/deepseek/deepseek-color.svg' },
  { pattern: /grok|xai|x\.ai/i, src: '/icons/grok/grok-mono.svg' },
  { pattern: /kimi|moonshot/i, src: '/icons/kimi/kimi-color.svg' },
  { pattern: /perplexity|sonar/i, src: '/icons/perplexity/perplexity-color.svg' },
  { pattern: /hermes|nous/i, src: '/icons/nousresearch/nousresearch-avatar.svg' },
  { pattern: /manus/i, src: '/icons/manus/manus-mono.svg' },
  { pattern: /alibaba cloud/i, src: '/icons/qwen/qwen-color.svg' },
  { pattern: /qwen/i, src: '/icons/qwen/qwen-color.svg' },
  { pattern: /alibaba/i, src: '/icons/alibaba/alibaba-color.svg' },
]

export function ModelIconClient({ name, size = 32, className }: ModelIconClientProps) {
  const match = iconMatchers.find((matcher) => matcher.pattern.test(name))
  if (match) {
    return (
      <img
        src={match.src}
        width={size}
        height={size}
        className={className}
        style={{ width: size, height: size }}
        alt={`${name} logo`}
      />
    )
  }

  return (
    <div className={`flex items-center justify-center bg-gray-100 rounded-full ${className ?? ''}`} style={{ width: size, height: size }}>
      <Cpu size={size * 0.6} className="text-gray-500" />
    </div>
  )
}
