import Link from 'next/link'
import { ArrowLeft, ThumbsUp, FileCode } from 'lucide-react'
import { notFound } from 'next/navigation'
import { ModelIcon } from '@/components/ui/model-icon'
import { CopyButton } from '@/components/ui/copy-button'
import { getAllPromptParams, getPrompt } from '@/lib/content'

export function generateStaticParams() {
  return getAllPromptParams()
}

export default function PromptPage({ params }: { params: { category: string; slug: string } }) {
  const prompt = getPrompt(params.category, params.slug)

  if (!prompt) {
    notFound()
  }

  const isSystem = prompt.kind === 'system'
  const body = prompt.content.trim()

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href={`/tools/prompts/${prompt.category}`}
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {prompt.category.replace(/-/g, ' ')}
        </Link>

        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{prompt.title}</h1>
          {typeof prompt.successRate === 'number' ? (
            <div className="flex items-center gap-1 text-sm text-green-600 shrink-0 mt-2">
              <ThumbsUp className="w-4 h-4" />
              {prompt.successRate}%
            </div>
          ) : isSystem ? (
            <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded shrink-0 mt-2">system</span>
          ) : null}
        </div>
        <p className="mt-2 text-gray-600">{prompt.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {prompt.role && (
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{prompt.role}</span>
          )}
          {prompt.models.map((model) => (
            <span key={model} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded flex items-center gap-1.5">
              <ModelIcon name={model} size={14} />
              {model}
            </span>
          ))}
          {prompt.difficulty && (
            <span
              className={`text-xs px-2 py-1 rounded ${
                prompt.difficulty === 'beginner'
                  ? 'bg-green-100 text-green-700'
                  : prompt.difficulty === 'intermediate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {prompt.difficulty}
            </span>
          )}
        </div>

        {prompt.source && (
          <p className="mt-3 text-xs text-gray-400 flex items-center gap-1.5 font-mono">
            <FileCode className="w-3 h-3 shrink-0" />
            {prompt.source}
          </p>
        )}

        <div className="mt-8 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Prompt</span>
            <CopyButton text={body} label="Copy prompt" />
          </div>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono bg-white p-4 overflow-x-auto">
            {body}
          </pre>
        </div>

        {isSystem && (
          <p className="mt-6 text-sm text-gray-500">
            This prompt is part of the Megaminds evaluation pipeline. See{' '}
            <Link href="/learn/articles/models-write-their-own-reports" className="text-gray-900 underline hover:text-gray-600">
              Models Write Their Own Reports
            </Link>{' '}
            for how it fits together.
          </p>
        )}
      </div>
    </div>
  )
}
