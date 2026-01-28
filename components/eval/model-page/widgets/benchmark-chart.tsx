import { BarChart3 } from 'lucide-react'
import type { BenchmarkChartProps } from '@/lib/models/types'

export const BenchmarkChart = ({ benchmarks }: BenchmarkChartProps) => {
  return (
    <figure className="my-8 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <figcaption className="flex items-center gap-2 px-6 py-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <BarChart3 className="w-4 h-4 text-neutral-500" aria-hidden="true" />
        <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Benchmark Performance</span>
      </figcaption>
      <div className="p-6 space-y-4">
        {benchmarks.map((b, idx) => {
          const pct = (b.score / b.maxScore) * 100
          return (
            <div key={idx}>
              <div className="flex items-baseline justify-between mb-1.5">
                <label htmlFor={`benchmark-${idx}`} className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {b.name}
                </label>
                <div className="flex items-baseline gap-2">
                  <output className="text-sm font-bold tabular-nums text-neutral-900 dark:text-neutral-100">{b.score}</output>
                  {b.comparison && (
                    <span className="text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                      <small>{b.comparison}</small>
                    </span>
                  )}
                </div>
              </div>
              <div className="relative h-2.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <meter
                  id={`benchmark-${idx}`}
                  value={b.score}
                  min={0}
                  max={b.maxScore}
                  low={50}
                  high={70}
                  optimum={90}
                  className="sr-only"
                >
                  {b.score} out of {b.maxScore}
                </meter>
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${pct}%`,
                    background:
                      pct >= 90
                        ? 'linear-gradient(90deg, #22c55e, #16a34a)'
                        : pct >= 70
                          ? 'linear-gradient(90deg, #3b82f6, #2563eb)'
                          : 'linear-gradient(90deg, #f59e0b, #d97706)',
                  }}
                  role="presentation"
                  aria-hidden="true"
                />
              </div>
            </div>
          )
        })}
      </div>
    </figure>
  )
}

export default BenchmarkChart
