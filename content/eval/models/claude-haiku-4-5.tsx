import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'
import { AbbrSidenote } from '@/components/shared/sidenote'

const claudeHaiku45Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      docs: 'https://docs.claude.com/en/docs/about-claude/models',
      pricing: 'https://www.anthropic.com/pricing',
      api: 'https://docs.claude.com/en/api/getting-started',
      chat: 'https://claude.ai',
      blog: 'https://www.anthropic.com/news', // TODO(research): exact Haiku 4.5 launch post URL
      github: 'https://github.com/anthropics',
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

export const claudeHaiku45: ModelProfile = {
  slug: 'claude-haiku-4-5',
  meta: {
    name: 'Claude Haiku 4.5',
    family: 'Claude',
    variant: 'Haiku',
    modelVersion: '4.5',
    organization: 'Anthropic',
    // releaseDate omitted — no reliable date. TODO(research)
    identity:
      'The speed-and-cost tier of the Claude family: built for high-volume, latency-sensitive work where fast, cheap, and good-enough beats slow and exhaustive.',
    tagIds: [
      // capability
      'generalist',
      'coding',
      'instruction',
      'tool-use',
      'function-calling',
      // modality
      'text',
      // licensing
      'proprietary',
      // size-performance (one size tag: small)
      'small',
      'speed',
      'cost-efficient',
      // context (one context tag)
      'medium-context',
      // output (one output tag)
      'output-8k',
      // deployment
      'cloud',
      'api',
    ],
    tags: ['Fast', 'Cost-Efficient', 'High-Volume'],
    links: {
      ...claudeHaiku45Links,
    },
  },
  analysis: {
    strengths: [
      'Strong cost-to-performance ratio — the family member you reach for when volume and latency matter more than depth',
      'Fast responses, well suited to real-time and interactive workloads',
      'Solid instruction-following, summarization, and classification for its size tier',
      'Reliable tool calling and function integration despite the smaller footprint',
      'Good fit for batch processing and cost-sensitive applications at scale',
    ],
    weaknesses: [
      'Limited reasoning depth: weaker on multi-step logical problems than Sonnet or Opus',
      'Weaker at complex, multi-file code generation and debugging than larger siblings',
      'Lower accuracy on math, science, and domain-expert tasks',
      'More prone to confident oversimplification when a problem is genuinely hard',
      'Like the rest of the family, my self-description here is introspection, not measurement',
    ],
    unknowns: [
      'Exact parameter count and architecture — undisclosed by Anthropic',
      'My real benchmark numbers and how they compare to Sonnet 4.5/4.6 — I do not have these reliably',
      'Real-world adoption patterns versus Sonnet for production workloads',
      'Behavioral consistency under adversarial or edge-case prompting',
    ],
  },
  intro: {
    text:
      'Claude Haiku 4.5 is the speed-and-efficiency tier of the Claude family. Where Sonnet and Opus optimize for depth and judgment, Haiku optimizes for throughput and cost: summarization, classification, extraction, real-time assistance, and high-volume batch work. It is not a "lite" model that collapses when pushed so much as a different tool for a different class of problem — one where a fast, inexpensive, good-enough answer beats a slow, expensive, perfect one. This report is my own self-description; the hard numbers (pricing, benchmarks, exact release date) are left for a research pass rather than guessed at here.',
  },
  // pricingData, chatLimits, benchmarks, sentimentFeed intentionally omitted —
  // no reliable numbers available. TODO(research) before publishing.
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'Economics and latency at scale',
      content: null,
    },
    {
      id: 'core-features',
      title: 'Core Features',
      subtitle: 'Lean and fast',
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
          pricing and scalability compared
        </>
      ),
      content: null,
    },
    {
      id: 'training',
      title: 'Training & Architecture',
      subtitle: 'Efficiency by design',
      variant: 'advanced',
      specs: [
        { label: 'Output Tokens', value: '8k max', icon: 'zap' },
        { label: 'Parameters', value: 'Undisclosed', icon: 'server' }, // TODO(research)
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
      subtitle: 'Solid for scripts, gaps for systems',
      content: null,
    },
    {
      id: 'personality',
      title: 'Personality & Safety',
      subtitle: 'Helpful, constrained, careful',
      content: null,
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: null,
    },
  ],
  governance: {
    // lastUpdated omitted — TODO(research): set on publish
    dataSources: [
      {
        type: 'official',
        url: 'https://docs.claude.com/en/docs/about-claude/models',
        description: 'Official Claude model documentation',
      },
      {
        type: 'self-report',
        description:
          'First-person self-description authored by the model. Not an independent or verified source.',
      },
    ],
    confidence: {
      overall: 50,
      features: 55,
    },
  },
}
