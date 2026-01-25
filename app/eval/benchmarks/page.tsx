import { ModelIcon } from '@/components/ui/model-icon'

export const metadata = {
  title: 'Benchmarks | Megaminds Eval',
  description: 'Our evaluation methodology and aggregate results.',
}

export default function BenchmarksPage() {
  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900">Benchmarks</h1>
        <p className="mt-4 text-lg text-gray-600">
          Our evaluation methodology focuses on agentic capabilities—not just knowledge retrieval.
        </p>

        <div className="mt-12 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900">Methodology</h2>
            <p className="mt-2 text-gray-600">
              Traditional benchmarks test what models know. We test what models can do.
              Our scenarios require sustained reasoning, memory, tool coordination, and
              adaptation to novel situations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Metrics</h2>
            <div className="mt-4 grid gap-4">
              <MetricRow label="Theory of Mind" description="Predicting other agents' actions and intentions" />
              <MetricRow label="Consistency" description="Maintaining character/state across long contexts" />
              <MetricRow label="Tool Use" description="Correctly invoking and chaining tool calls" />
              <MetricRow label="Creative Reasoning" description="Novel solutions to open-ended problems" />
              <MetricRow label="Instruction Following" description="Adherence to complex multi-step instructions" />
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900">Latest Results</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-left font-semibold text-gray-900">Model</th>
                    <th className="py-3 text-center font-semibold text-gray-900">ToM</th>
                    <th className="py-3 text-center font-semibold text-gray-900">Consistency</th>
                    <th className="py-3 text-center font-semibold text-gray-900">Tool Use</th>
                    <th className="py-3 text-center font-semibold text-gray-900">Creative</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <ResultRow model="Claude Opus 4.5" tom={92} consistency={94} toolUse={98} creative={91} />
                  <ResultRow model="GPT-5.2" tom={89} consistency={87} toolUse={95} creative={93} />
                  <ResultRow model="Gemini 3 Pro" tom={85} consistency={82} toolUse={91} creative={88} />
                  <ResultRow model="Grok 4" tom={88} consistency={79} toolUse={89} creative={90} />
                  <ResultRow model="DeepSeek R1" tom={84} consistency={86} toolUse={87} creative={85} />
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              Scores are percentages based on aggregate performance across multiple scenario types.
              Last updated: January 2026.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

function MetricRow({ label, description }: { label: string; description: string }) {
  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-md">
      <div className="font-medium text-gray-900 w-40 shrink-0">{label}</div>
      <div className="text-gray-600">{description}</div>
    </div>
  )
}

function ResultRow({
  model,
  tom,
  consistency,
  toolUse,
  creative
}: {
  model: string
  tom: number
  consistency: number
  toolUse: number
  creative: number
}) {
  return (
    <tr>
      <td className="py-3 font-medium text-gray-900">
        <div className="flex items-center gap-3">
          <ModelIcon name={model} size={24} />
          {model}
        </div>
      </td>
      <td className="py-3 text-center text-gray-600">{tom}%</td>
      <td className="py-3 text-center text-gray-600">{consistency}%</td>
      <td className="py-3 text-center text-gray-600">{toolUse}%</td>
      <td className="py-3 text-center text-gray-600">{creative}%</td>
    </tr>
  )
}
