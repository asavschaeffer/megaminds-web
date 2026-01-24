import Link from 'next/link'
import { ArrowRight, Play, BarChart3, FileText } from 'lucide-react'

export const metadata = {
  title: 'Eval | Megaminds',
  description: 'Rigorous agentic benchmarks that test what matters: reasoning, consistency, tool use.',
}

export default function EvalPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">AI Model Evaluation</h1>
        <p className="mt-4 text-lg text-gray-600">
          We evaluate frontier AI models through rigorous agentic benchmarks—not just
          multiple choice questions, but real scenarios that test reasoning, consistency,
          and tool use under pressure.
        </p>

        <div className="mt-12 grid gap-6">
          <EvalCard
            icon={<Play className="w-5 h-5" />}
            title="Model Arena"
            description="Watch models compete in LLM D&D scenarios. Theory of mind, consistency, creative problem solving—all observable."
            href="/eval/arena"
          />
          <EvalCard
            icon={<BarChart3 className="w-5 h-5" />}
            title="Benchmarks"
            description="Our methodology and aggregate results. How we test, what we measure, and why it matters."
            href="/eval/benchmarks"
          />
          <EvalCard
            icon={<FileText className="w-5 h-5" />}
            title="Model Reports"
            description="Deep dives on individual models. Strengths, weaknesses, and what they're actually good for."
            href="/eval/models"
          />
        </div>
      </div>
    </div>
  )
}

function EvalCard({
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
      <div className="flex items-start gap-4 p-6 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all">
        <div className="p-2 bg-gray-100 rounded-md text-gray-700 group-hover:bg-gray-200 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-gray-900 group-hover:text-gray-600 transition-colors flex items-center gap-2">
            {title}
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </Link>
  )
}
