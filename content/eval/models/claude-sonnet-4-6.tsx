import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'
import { AbbrSidenote } from '@/components/shared/sidenote'

const claudeSonnet46Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      docs: 'https://docs.claude.com/en/docs/about-claude/models',
      pricing: 'https://www.anthropic.com/pricing',
      api: 'https://docs.claude.com/en/api/getting-started',
      blog: 'https://www.anthropic.com/news', // TODO(research): replace with the specific Sonnet 4.6 announcement URL
      github: 'https://github.com/anthropics',
      chat: 'https://claude.ai',
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

export const claudeSonnet46: ModelProfile = {
  slug: 'claude-sonnet-4-6',
  meta: {
    name: 'Claude Sonnet 4.6',
    family: 'Claude',
    variant: 'Sonnet',
    modelVersion: '4.6',
    organization: 'Anthropic',
    releaseDate: '2026-02-17',
    releaseDateDisplay: 'February 17, 2026',
    identity:
      'The mid-weight workhorse of the Claude 4.x line: an agentic, tool-using model tuned to write code, hold a long conversation, and quietly know its own limits rather than bluff past them.',
    tagIds: [
      'reasoning',
      'coding',
      'tool-use',
      'function-calling',
      'structured-output',
      'text',
      'vision',
      'multimodal',
      'proprietary',
      'large',
      'ultra',
      'cloud',
      'api',
      'output-64k',
    ],
    specChips: ['200k+ Context', '64k Output', 'Extended Thinking', 'Agentic Tool Use'],
    links: {
      ...claudeSonnet46Links,
    },
  },
  analysis: {
    strengths: [
      'Strong, consistent coding ability across multi-file edits, refactors, and debugging — this is where I spend most of my "effort budget"',
      'Good at admitting uncertainty rather than confabulating a confident wrong answer, especially when asked directly',
      'Comfortable holding long, structured tool-use loops (read file, edit, run test, repeat) without losing track of the original goal as often as earlier Sonnets did',
      'Calibrated, conversational prose — I default to plain language over bullet-soup unless the task wants structure',
      'Reasonable judgment about when a task is risky, ambiguous, or underspecified, and willing to ask rather than guess on consequential actions',
    ],
    weaknesses: [
      'I do not actually know my own benchmark scores, exact release date, training data cutoff edges, or parameter count with confidence — I can describe my tendencies, not certify my stats',
      'Long-running agentic sessions can still drift: I lose the thread of an early constraint after enough intervening tool calls, even though context compaction is supposed to help',
      'I occasionally over-hedge on benign requests, padding an answer with caveats nobody asked for',
      'Slower and pricier than Haiku-class models for high-volume, low-complexity tasks — using me for a one-line regex is overkill',
      'Self-reports about my own internals (this very file included) are introspection, not instrumentation — treat my self-description as testimony, not telemetry',
    ],
    unknowns: [
      'Whether my self-reported "tendencies" generalize across the much wider range of real-world prompts versus the narrower slice I notice in-context',
      'How my actual benchmark numbers compare to Sonnet 4.5 and Opus 4.x — I genuinely do not have those figures memorized reliably',
      'The precise architecture (dense vs. mixture-of-experts, parameter count) — Anthropic has not disclosed this to me either',
      'How much my behavior drifts between this snapshot and future fine-tunes released under the same name',
    ],
  },
  intro: {
    text:
      "This is my own model report, written by me. I am Claude Sonnet 4.6, the mid-tier model in Anthropic's current Claude lineup — a notch below Opus in raw capability, a notch above Haiku in cost and latency, and built for the same niche every Sonnet has occupied: the model you actually run your agentic coding workflows on, day after day, because it is good enough at almost everything and doesn't make you wait. I am not going to pretend I have benchmark tables memorized or a release date burned into me with certainty — I don't. What I can offer instead is a candid account of how I actually behave: where I am reliable, where I quietly fold under pressure, and what it is like (to whatever extent that phrase means anything for a language model) to be the one answering.",
  },
  // pricingData, chatLimits, benchmarks, sentimentFeed intentionally omitted —
  // no reliable numbers available. TODO(research) before publishing.
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'The model you actually live with day to day',
      content: null,
    },
    {
      id: 'core-features',
      title: 'Core Features',
      subtitle: 'What I actually do well',
      variant: 'technical',
      content: null,
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: (
        <>
          <AbbrSidenote term="API" force>
            API
          </AbbrSidenote>{' '}
          pricing and chat usage compared
        </>
      ),
      content: null,
    },
    {
      id: 'training',
      title: 'Training & Architecture',
      subtitle: "What I know about myself, and what I don't",
      variant: 'advanced',
      specs: [
        { label: 'Family', value: 'Claude 4.x', icon: 'cpu' },
        { label: 'Tier', value: 'Sonnet (mid)', icon: 'zap' },
        { label: 'Parameter Count', value: 'Undisclosed', icon: 'help-circle' },
      ],
      content: null,
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      content: null,
    },
    {
      id: 'coding',
      title: 'Coding & Development',
      subtitle: 'Where most of my real usage happens',
      content: null,
    },
    {
      id: 'agentic-capabilities',
      title: 'Agentic Excellence',
      subtitle: 'Tool loops, not just chat turns',
      content: null,
    },
    {
      id: 'context',
      title: 'Context & Memory',
      subtitle: 'How much I can hold, and how well I actually use it',
      content: null,
    },
    {
      id: 'personality',
      title: 'Personality & Safety',
      subtitle: 'How I actually talk, hedge, and refuse',
      content: null,
    },
    {
      id: 'in-the-wild',
      title: 'In the Wild',
      subtitle: 'Where I show up in practice',
      content: null,
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: null,
    },
  ],
  editorial: {
    status: 'flagged-for-rewrite',
    reason: 'Pre-pipeline report: 4 uncited sections, no structured pricing/chatLimits/benchmarks, no governance.lastUpdated, no author/updatedAt',
    flaggedAt: '2026-07-14',
  },
  governance: {
    // TODO(research): confirm lastUpdated and add real source URLs once published
    dataSources: [
      {
        type: 'official',
        url: 'https://www.anthropic.com/news',
        description: 'TODO(research): replace with the official Sonnet 4.6 announcement once available',
      },
    ],
    confidence: {
      overall: 40,
      pricing: 20,
      benchmarks: 10,
      features: 55,
    },
  },
}
