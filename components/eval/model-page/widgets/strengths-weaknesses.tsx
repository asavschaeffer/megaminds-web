import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react'
import type { AnalysisItem, StrengthsWeaknessesProps } from '@/lib/models/types'

const itemText = (item: string | AnalysisItem) => (typeof item === 'string' ? item : item.text)

// HACK (2026-07-16): the analysis table is a scannable index — one claim per
// line — but authors overflow it into 20-37 word essays (see lint:models
// "essay creep" audit and the ≤15-word rule in the add-model skill). Until the
// schema redesign gives overflow a real home, `line-clamp` caps every item at
// two lines so a non-compliant item can never turn the table into a wall of
// prose; the full text stays reachable via the native title tooltip. A
// compliant ≤15-word claim never truncates.
const clampText = 'line-clamp-2'

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
              <span className={clampText} title={itemText(strength)}>
                {itemText(strength)}
              </span>
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
              <span className={clampText} title={itemText(weakness)}>
                {itemText(weakness)}
              </span>
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
              <dd
                key={idx}
                className="flex max-w-md items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
              >
                <span className="text-amber-500 dark:text-amber-400 mt-0.5 shrink-0" aria-hidden="true">
                  ?
                </span>
                <span className={clampText} title={itemText(unknown)}>
                  {itemText(unknown)}
                </span>
              </dd>
            ))}
          </div>
        </dl>
      )}
    </div>
  )
}

export default StrengthsWeaknesses
