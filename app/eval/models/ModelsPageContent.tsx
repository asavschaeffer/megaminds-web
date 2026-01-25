'use client'

import Link from 'next/link'
import { ModelIcon } from '@/components/ui/model-icon'

interface Model {
  slug: string
  name: string
  tagline: string
  strengths: string[]
}

export default function ModelsPageContent({ models }: { models: Model[] }) {
  return (
    <div className="mt-12 grid gap-4">
      {models.map((model) => (
        <Link key={model.slug} href={`/eval/models/${model.slug}`} className="group">
          <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-2">
              <ModelIcon name={model.name} size={32} />
              <h2 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
                {model.name}
              </h2>
            </div>
            <p className="text-sm text-gray-500 mt-1">{model.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {model.strengths.map((strength) => (
                <span
                  key={strength}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
