import Link from 'next/link'
import { ArrowLeft, Copy, ThumbsUp } from 'lucide-react'
import { notFound } from 'next/navigation'

// Sample data - will be replaced with MDX/database content
const promptsByCategory: Record<string, {
  name: string
  prompts: {
    slug: string
    title: string
    description: string
    models: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    successRate: number
    prompt: string
  }[]
}> = {
  finance: {
    name: 'Finance',
    prompts: [
      {
        slug: 'portfolio-analysis',
        title: 'Portfolio Risk Assessment',
        description: 'Analyze your investment portfolio for risk exposure and diversification.',
        models: ['claude', 'chatgpt'],
        difficulty: 'intermediate',
        successRate: 92,
        prompt: `I'd like you to analyze my investment portfolio for risk and diversification.

Here's my current allocation:
[LIST YOUR HOLDINGS]

Please provide:
1. Overall risk assessment (conservative/moderate/aggressive)
2. Sector concentration analysis
3. Geographic diversification
4. Suggestions for rebalancing
5. Potential blind spots or risks I should consider

Consider my risk tolerance as [CONSERVATIVE/MODERATE/AGGRESSIVE] and my investment timeline is [X YEARS].`
      },
      {
        slug: 'decade-planning',
        title: 'Financial Planning by Decade',
        description: 'Create a financial roadmap tailored to your current life stage.',
        models: ['claude', 'chatgpt', 'gemini'],
        difficulty: 'beginner',
        successRate: 88,
        prompt: `I'm in my [20s/30s/40s/50s/60s] and want to create an age-appropriate financial plan.

My current situation:
- Income: [AMOUNT]
- Savings: [AMOUNT]
- Debt: [AMOUNT]
- Major goals: [LIST GOALS]

Please create a financial roadmap that includes:
1. Priority areas for this decade
2. Savings rate recommendations
3. Investment strategy appropriate for my age
4. Key milestones to hit before the next decade
5. Common mistakes people make at this stage`
      },
    ]
  },
  // Add more categories...
}

export function generateStaticParams() {
  return Object.keys(promptsByCategory).map((category) => ({ category }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const data = promptsByCategory[params.category]

  if (!data) {
    notFound()
  }

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/tools/prompts"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Categories
        </Link>

        <h1 className="text-3xl font-bold text-gray-900">{data.name} Prompts</h1>
        <p className="mt-2 text-gray-600">{data.prompts.length} prompts in this category</p>

        <div className="mt-8 space-y-6">
          {data.prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PromptCard({ prompt }: { prompt: typeof promptsByCategory.finance.prompts[0] }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-semibold text-gray-900">{prompt.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{prompt.description}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <ThumbsUp className="w-4 h-4" />
            {prompt.successRate}%
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {prompt.models.map((model) => (
            <span key={model} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {model}
            </span>
          ))}
          <span className={`text-xs px-2 py-1 rounded ${
            prompt.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
            prompt.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {prompt.difficulty}
          </span>
        </div>
      </div>

      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Prompt</span>
          <button className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded border border-gray-200 max-h-48 overflow-y-auto">
          {prompt.prompt}
        </pre>
      </div>
    </div>
  )
}
