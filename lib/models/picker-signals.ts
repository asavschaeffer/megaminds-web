/**
 * Picker Signals — the contract between reports and the Model Picker.
 *
 * Every question the picker asks must resolve to a signal declared here, and
 * every signal declares its provenance: either a tag a report grants (with the
 * evidence bar for granting it) or a value computed from profile data.
 *
 * THE METHODOLOGY (this is the important part):
 *  1. A new user question is proposed ("can it run offline?", "is it fine-tunable?").
 *  2. Declare the signal HERE first — id, provenance, evidence bar.
 *  3. `lint:models` then reports per-model coverage: which models have the
 *     signal established and which are UNKNOWN. Unknowns become research
 *     requirements for the next dispatch (scripts/generate-research-brief
 *     includes every declared signal automatically).
 *  4. Only once coverage is reasonable does the question ship in the picker UI.
 *
 * Tag absence is ambiguous: it means "not established", never "no". Hard
 * signals (used for elimination) should therefore only gate on ABSENCE when
 * the question's phrasing makes "we couldn't verify support" an acceptable
 * reason to exclude — and elimination reasons in the UI must say that
 * honestly ("No verified structured output support").
 */

import type { ModelTagId } from './tags'
import type { ModelProfile } from './types'

export type SignalProvenance =
  | { kind: 'tag'; anyOf: ModelTagId[] }
  | { kind: 'computed'; field: 'priceBand' | 'hasFreeAccess'; source: string }

export interface PickerSignal {
  id: string
  /** The user need this signal answers, phrased as the user would */
  need: string
  /** true = used as a hard elimination; false = scoring-only */
  hard: boolean
  provenance: SignalProvenance
  /** What a report must establish before granting the tag (cited, in the profile or prose) */
  evidence: string
}

export const PICKER_SIGNALS: PickerSignal[] = [
  {
    id: 'image-generation',
    need: 'I need to generate images',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['image-gen'] },
    evidence: 'Native or first-party image generation documented by the vendor',
  },
  {
    id: 'video-generation',
    need: 'I need to generate video',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['video-gen'] },
    evidence: 'Video generation or understanding documented by the vendor',
  },
  {
    id: 'web-search',
    need: 'I need it to search the web',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['search'] },
    evidence: 'First-party web search integration (not just RAG-ability)',
  },
  {
    id: 'vision',
    need: 'I need it to read images and documents',
    hard: false,
    provenance: { kind: 'tag', anyOf: ['vision', 'multimodal'] },
    evidence: 'Image-understanding capability documented and benchmarked',
  },
  {
    id: 'open-source',
    need: 'It must be open source / open weights',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['open-source', 'open-weights'] },
    evidence: 'License identified by name; weights actually downloadable',
  },
  {
    id: 'visible-reasoning',
    need: 'I want to see how it thinks',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['visible-reasoning'] },
    evidence: 'Raw reasoning traces exposed to the user (not a hidden thinking mode)',
  },
  {
    id: 'structured-output',
    need: 'My program consumes its output as JSON',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['structured-output'] },
    evidence:
      'Reliable JSON/schema-constrained output: vendor docs PLUS independent evidence of reliability (tool-calling benchmark or credible field reports). Known parsing-failure reports disqualify',
  },
  {
    id: 'agentic',
    need: 'I want to delegate multi-step autonomous work',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['tool-use', 'agentic-swarm'] },
    evidence: 'Tool use / long-horizon execution demonstrated by benchmark or documented deployments',
  },
  {
    id: 'massive-context',
    need: 'I need to load books or whole codebases',
    hard: true,
    provenance: { kind: 'tag', anyOf: ['ultra', 'long'] },
    evidence: 'Context window ≥64K (long) or ≥200K (ultra), with usable-recall caveats noted in the report',
  },
  {
    id: 'price-band',
    need: 'How much am I willing to pay?',
    hard: true,
    provenance: {
      kind: 'computed',
      field: 'priceBand',
      source: 'Blended $/Mtok from meta.apiRates; tag fallback (see lib/models/picker.ts)',
    },
    evidence: 'meta.apiRates populated with sourced numbers (pricingSources)',
  },
  {
    id: 'free-access',
    need: 'I am not willing to pay at all',
    hard: true,
    provenance: {
      kind: 'computed',
      field: 'hasFreeAccess',
      source: 'Any $0 chat tier in chatLimits, or open weights (see lib/models/picker.ts)',
    },
    evidence: 'chatLimits populated with the vendor’s actual free tier, or license established',
  },
]

/** Resolve a tag-provenance signal for one profile: 'yes' if granted, 'unknown' otherwise. */
export function tagSignalStatus(profile: ModelProfile, signal: PickerSignal): 'yes' | 'unknown' | 'computed' {
  if (signal.provenance.kind === 'computed') return 'computed'
  const tagIds = profile.meta.tagIds ?? []
  return signal.provenance.anyOf.some((tag) => tagIds.includes(tag)) ? 'yes' : 'unknown'
}
