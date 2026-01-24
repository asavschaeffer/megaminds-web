import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// This will eventually pull from MDX files
const modelData: Record<string, {
  name: string
  tagline: string
  strengths: string[]
  weaknesses: string[]
  bestFor: string[]
  content: string
}> = {
  claude: {
    name: 'Claude (Opus 4.5, Sonnet, Haiku)',
    tagline: 'Best for reflection, writing, and tool use',
    strengths: [
      'SOTA tool calling and API integration',
      'SOTA computer use (browser, CLI, custom harnesses)',
      'Nuanced, high-quality writing',
      'Fine precision control for specific problems',
    ],
    weaknesses: [
      'More expensive than alternatives',
      'Slower generation speed',
      'Context poisoning around 300k tokens',
      'Automatic compaction for long chats',
    ],
    bestFor: [
      'Complex coding tasks',
      'Reflective/therapeutic conversations',
      'Document analysis and synthesis',
      'Automation and computer use',
    ],
    content: `
Claude represents Anthropic's approach to AI development—careful, thoughtful, and
focused on genuine helpfulness over engagement metrics.

## Personality & Interaction Style

Claude has been trained with what Anthropic calls "Constitutional AI"—a framework
that shapes its values and behavior. The result is a model that feels genuinely
curious and engaged, rather than sycophantic.

Unlike ChatGPT's tendency toward excessive enthusiasm and follow-up questions,
Claude maintains a more measured tone. It will push back when it disagrees,
acknowledge uncertainty, and avoid the "emoji spam" that characterizes some competitors.

## Tool Use & Computer Control

This is where Claude genuinely excels. Claude Code (the CLI tool) and Claude's
computer use capabilities represent the current state of the art for autonomous
AI agents. The model can:

- Navigate file systems and edit code
- Control browsers and interact with web applications
- Execute multi-step workflows with appropriate error handling
- Maintain context across complex, multi-turn operations

## When to Choose Claude

**Choose Claude when:**
- You need high-quality, nuanced writing
- Your task requires tool calling or computer control
- You want genuine engagement rather than validation
- Precision matters more than speed

**Consider alternatives when:**
- Cost is the primary concern (→ DeepSeek)
- You need multimodal capabilities (→ Gemini)
- Speed is critical (→ Gemini Flash)
- You need real-time cultural context (→ Grok)
    `
  },
  // Add more models...
}

export function generateStaticParams() {
  return Object.keys(modelData).map((slug) => ({ slug }))
}

export default function ModelPage({ params }: { params: { slug: string } }) {
  const model = modelData[params.slug]

  if (!model) {
    notFound()
  }

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/eval/models"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          All Models
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">{model.name}</h1>
        <p className="mt-2 text-lg text-gray-600">{model.tagline}</p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900">Strengths</h3>
            <ul className="mt-2 space-y-1">
              {model.strengths.map((item) => (
                <li key={item} className="text-sm text-green-800 flex gap-2">
                  <span>+</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-900">Weaknesses</h3>
            <ul className="mt-2 space-y-1">
              {model.weaknesses.map((item) => (
                <li key={item} className="text-sm text-red-800 flex gap-2">
                  <span>-</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900">Best For</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {model.bestFor.map((item) => (
              <span key={item} className="text-sm bg-white border border-gray-200 px-3 py-1 rounded-full">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 prose prose-gray max-w-none">
          {model.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h2 key={i} className="text-xl font-semibold text-gray-900 mt-8 mb-4">{paragraph.replace('## ', '')}</h2>
            }
            if (paragraph.startsWith('**')) {
              return <p key={i} className="text-gray-600 whitespace-pre-line">{paragraph}</p>
            }
            return <p key={i} className="text-gray-600 mb-4">{paragraph}</p>
          })}
        </div>
      </div>
    </div>
  )
}
