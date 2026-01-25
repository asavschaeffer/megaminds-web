import Link from 'next/link'
import { getModelReports } from '@/lib/content'
import ModelsPageContent from './ModelsPageContent'

export const metadata = {
  title: 'Model Reports | Megaminds Eval',
  description: 'Deep dives on individual AI models.',
}

// Static data for now - will be replaced with MDX content
const models = [
  {
    slug: 'claude',
    name: 'Claude (Opus 4.5, Sonnet, Haiku)',
    tagline: 'Best for reflection, writing, and tool use',
    strengths: ['SOTA tool calling', 'Nuanced writing', 'Computer use'],
  },
  {
    slug: 'gemini',
    name: 'Gemini 3 (Flash & Pro)',
    tagline: 'Best for multimodal and large context',
    strengths: ['1M token context', 'Video generation', 'Speed'],
  },
  {
    slug: 'chatgpt',
    name: 'ChatGPT 5.2 & Codex',
    tagline: 'Best for reasoning and math',
    strengths: ['SOTA programming', 'Mathematical proofs', 'Ideation'],
  },
  {
    slug: 'grok',
    name: 'Grok 4',
    tagline: 'Best for cultural context and real-time',
    strengths: ['X/Twitter integration', 'Uncensored', 'Large context'],
  },
  {
    slug: 'deepseek',
    name: 'DeepSeek R1/V3',
    tagline: 'Best for transparent reasoning at low cost',
    strengths: ['Visible reasoning trace', 'Cheapest', 'Open source'],
  },
  {
    slug: 'kimi',
    name: 'Kimi K2',
    tagline: 'Best for design and frontend',
    strengths: ['Pitch decks', 'UI design', 'Open source'],
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

        <ModelsPageContent models={models} />
      </div>
    </div>
  )
}
