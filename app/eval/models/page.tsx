import { Suspense } from 'react'
import ModelsSection from './ModelsSection'
import { MODEL_TAGS, modelCards } from '@/lib/models/model-cards'

export const metadata = {
  title: 'Model Reports | Megaminds Eval',
  description: 'Deep dives on individual AI models.',
}

export default function ModelsPage() {
  return (
    <main className="py-16 px-6 lg:px-8">
      <section className="mx-auto max-w-4xl" aria-labelledby="models-title">
        <header>
          <h1 id="models-title" className="text-3xl font-bold text-gray-900">
            Model Reports
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Deep dives on frontier models. What they're good at, where they struggle,
            and when to use them.
          </p>
        </header>

        <Suspense fallback={<div className="mt-8 text-gray-400">Loading models...</div>}>
          <ModelsSection cards={modelCards} tags={MODEL_TAGS} />
        </Suspense>
      </section>
    </main>
  )
}

