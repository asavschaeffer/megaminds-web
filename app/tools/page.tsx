import Link from 'next/link'
import { Compass, Library, PlusCircle } from 'lucide-react'

export const metadata = {
  title: 'Tools | Megaminds',
  description: 'AI tools powered by our evaluation data.',
}

export default function ToolsPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Tools</h1>
        <p className="mt-4 text-lg text-gray-600">
          Practical tools powered by our evaluation data. Find the right model,
          discover effective prompts, and contribute to the community library.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <ToolCard
            icon={<Compass className="w-6 h-6" />}
            title="Model Picker"
            description="Answer a few questions about your task and get a model recommendation backed by our eval data."
            href="/tools/model-picker"
          />
          <ToolCard
            icon={<Library className="w-6 h-6" />}
            title="Prompt Library"
            description="Curated prompts organized by category. Finance, travel, health, business, and more."
            href="/tools/prompts"
          />
          <ToolCard
            icon={<PlusCircle className="w-6 h-6" />}
            title="Submit a Prompt"
            description="Contribute your own prompts to the community library."
            href="/tools/submit"
          />
        </div>
      </div>
    </div>
  )
}

function ToolCard({
  icon,
  title,
  description,
  href
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <Link href={href} className="group">
      <div className="h-full p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
        <div className="text-gray-700 mb-4">{icon}</div>
        <h2 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
          {title}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  )
}
