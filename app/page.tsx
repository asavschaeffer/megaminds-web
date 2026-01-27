import Link from 'next/link'
import { ArrowRight, Cpu, BookOpen, Wrench, Users } from 'lucide-react'
import { ModelIcon } from '@/components/ui/model-icon'
import { BrandCard } from '@/components/ui/brand-card'

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="py-24 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Match minds to models to outcomes
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We evaluate AI models through rigorous agentic benchmarks, build tools that leverage
            our findings, and consult on cognitive architecture for individuals and organizations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/consulting/intake"
              className="rounded-md bg-gray-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
            >
              Work with us
            </Link>
            <Link
              href="/eval"
              className="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1 hover:text-gray-600 transition-colors"
            >
              Explore our evals <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Cpu className="w-6 h-6" />}
              title="Eval"
              description="Rigorous agentic benchmarks that test what matters: reasoning, consistency, tool use."
              href="/eval"
            />
            <ValueCard
              icon={<Wrench className="w-6 h-6" />}
              title="Tools"
              description="Model Picker, prompt library, and workflows powered by our evaluation data."
              href="/tools"
            />
            <ValueCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Learn"
              description="Curriculum on how LLMs work, model landscape breakdowns, and practical guides."
              href="/learn"
            />
            <ValueCard
              icon={<Users className="w-6 h-6" />}
              title="Consulting"
              description="Cognitive architecture consulting for individuals and organizations."
              href="/consulting"
            />
          </div>
        </div>
      </section>

      {/* Featured Models */}
      <section className="py-16 px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Model Evaluations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ModelCard
              name="Claude Opus 4.5"
              description="Best for reflection"
              href="/eval/models/claude"
            />
            <BrandCard
              href="/eval/models/copilot"
              modelFamily="Model family"
              modelVariant="Model variant"
              versionNumber="Version #"
              description="Paragraph element"
              tags={['tag1', 'tag2', 'tag3']}
              modelLogoLabel="Model logo"
              parentBrandingLabel="Parent company branding"
            />
            <ModelCard
              name="DeepSeek R1/V3"
              description="Best for transparent reasoning at low cost"
              href="/eval/models/deepseek"
              tags={['Visible reasoning trace', 'Cheapest', 'Open source']}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

function ValueCard({
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
      <div className="h-full p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
        <div className="text-gray-700 mb-3">{icon}</div>
        <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  )
}

function ModelCard({
  name,
  description,
  href,
  icon,
  tags = []
}: {
  name: string
  description: string
  href: string
  icon?: React.ReactNode
  tags?: string[]
}) {
  return (
    <Link href={href} className="group">
      <div className="p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all h-full">
        <div className="flex items-center gap-3 mb-3">
          {icon || <ModelIcon name={name} size={48} />}
          <h3 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">{name}</h3>
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
