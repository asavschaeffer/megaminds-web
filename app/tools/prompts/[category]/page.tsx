import Link from 'next/link'
import { ArrowLeft, Copy, ThumbsUp } from 'lucide-react'
import { notFound } from 'next/navigation'
import { ModelIcon } from '@/components/ui/model-icon'
import { getPromptCategories, getPromptsByCategory, type PromptContent } from '@/lib/content'

export function generateStaticParams() {
  return getPromptCategories().map((category) => ({ category: category.slug }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categories = getPromptCategories()
  const category = categories.find((item) => item.slug === params.category)

  if (!category) {
    notFound()
  }

  const prompts = getPromptsByCategory(params.category)

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

        <h1 className="text-3xl font-bold text-gray-900">{category.name} Prompts</h1>
        <p className="mt-2 text-gray-600">{prompts.length} prompts in this category</p>

        <div className="mt-8 space-y-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      </div>
    </div>
  )
}

function getPromptBody(content: string): string {
  return content.split(/\n---\n/)[0].trim()
}

function PromptCard({ prompt }: { prompt: PromptContent }) {
  const promptBody = getPromptBody(prompt.content)

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
            <span key={model} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1.5">
              <ModelIcon name={model} size={14} />
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
          <button className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700" type="button">
            <Copy className="w-3 h-3" />
            Copy
          </button>
        </div>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded border border-gray-200 max-h-48 overflow-y-auto">
          {promptBody}
        </pre>
      </div>
    </div>
  )
}
