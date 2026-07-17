import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react'
import type { AnalysisItem, AnalysisStatus, StrengthsWeaknessesProps } from '@/lib/models/types'

// The analysis table is a scannable ✓/✗/? index: each item is one short claim,
// with the hedge, provenance, and elaboration sorted into their own fields
// (see AnalysisItemSchema). This widget renders that structure honestly — the
// claim leads, the caveat sits co-equal beneath it (not subordinated), and a
// provenance tag marks anything that isn't a plain external observation.

// Only non-default provenance is surfaced; `observed` is the baseline expectation.
const STATUS_LABEL: Partial<Record<AnalysisStatus, string>> = {
  inferred: 'inferred',
  'self-reported': 'self-reported',
}

// line-clamp is a display backstop: a compliant ≤15-word claim never truncates,
// but the table can never become a wall of prose regardless of item length.
const clamp = 'line-clamp-2'

const AnalysisLine = ({
  item,
  marker,
  markerClass,
}: {
  item: AnalysisItem
  marker: string
  markerClass: string
}) => {
  const statusLabel = item.status ? STATUS_LABEL[item.status] : undefined
  return (
    <dd className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
      <span className={`${markerClass} mt-0.5 shrink-0`} aria-hidden="true">
        {marker}
      </span>
      <div className="min-w-0">
        <span className={clamp} title={item.detail ?? item.claim}>
          {item.claim}
        </span>
        {statusLabel && (
          <span className="ml-1.5 align-baseline text-[10px] font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            {statusLabel}
          </span>
        )}
        {item.caveat && (
          <span className={`mt-0.5 block text-xs italic text-neutral-500 dark:text-neutral-400 ${clamp}`}>
            {item.caveat}
          </span>
        )}
      </div>
    </dd>
  )
}

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
          {strengths.map((item, idx) => (
            <AnalysisLine
              key={idx}
              item={item}
              marker="✓"
              markerClass="text-green-500 dark:text-green-400"
            />
          ))}
        </dl>
      )}

      {weaknesses.length > 0 && (
        <dl className="space-y-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
            <XCircle className="w-4 h-4" aria-hidden="true" />
            <span>Weaknesses</span>
          </dt>
          {weaknesses.map((item, idx) => (
            <AnalysisLine key={idx} item={item} marker="✗" markerClass="text-red-500 dark:text-red-400" />
          ))}
        </dl>
      )}

      {unknowns.length > 0 && (
        <dl className="space-y-2 md:col-span-2">
          <dt className="flex items-center gap-2 text-sm font-semibold text-amber-700 dark:text-amber-400">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            <span>Unknowns</span>
          </dt>
          <div className="grid gap-2 sm:grid-cols-2">
            {unknowns.map((item, idx) => (
              <AnalysisLine
                key={idx}
                item={item}
                marker="?"
                markerClass="text-amber-500 dark:text-amber-400"
              />
            ))}
          </div>
        </dl>
      )}
    </div>
  )
}

export default StrengthsWeaknesses
