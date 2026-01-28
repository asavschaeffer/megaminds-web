import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react'
import type { AnalysisItem, StrengthsWeaknessesProps } from '@/lib/models/types'

const renderItem = (item: string | AnalysisItem) => (typeof item === 'string' ? item : item.text)

export const StrengthsWeaknesses = ({
  strengths = [],
  weaknesses = [],
  unknowns = [],
}: StrengthsWeaknessesProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {strengths.length > 0 && (
        <dl className="space-y-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            <span>Strengths</span>
          </dt>
          {strengths.map((strength, idx) => (
            <dd key={idx} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="text-green-500 dark:text-green-400 mt-0.5 shrink-0" aria-hidden="true">
                ✓
              </span>
              <span>{renderItem(strength)}</span>
            </dd>
          ))}
        </dl>
      )}

      {weaknesses.length > 0 && (
        <dl className="space-y-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
            <XCircle className="w-4 h-4" aria-hidden="true" />
            <span>Weaknesses</span>
          </dt>
          {weaknesses.map((weakness, idx) => (
            <dd key={idx} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <span className="text-red-500 dark:text-red-400 mt-0.5 shrink-0" aria-hidden="true">
                ✗
              </span>
              <span>{renderItem(weakness)}</span>
            </dd>
          ))}
        </dl>
      )}

      {unknowns.length > 0 && (
        <dl className="space-y-2 md:col-span-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            <span>Unknowns</span>
          </dt>
          <div className="flex flex-wrap gap-3">
            {unknowns.map((unknown, idx) => (
              <dd key={idx} className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="text-amber-500 dark:text-amber-400 shrink-0" aria-hidden="true">
                  ?
                </span>
                <span>{renderItem(unknown)}</span>
              </dd>
            ))}
          </div>
        </dl>
      )}
    </div>
  )
}

export default StrengthsWeaknesses
