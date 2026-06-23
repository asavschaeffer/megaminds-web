import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'

const claudeFable5Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      docs: 'https://docs.claude.com/en/docs/about-claude/models',
      blog: 'https://www.anthropic.com/news/claude-fable-5-mythos-5', // launch + access announcement
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

// NOTE: This is an editorial report, not a self-authored one — not because
// Fable 5 was never accessible, but because by the time of writing it had been
// suspended (June 12, 2026), and asked to write its own profile it returns
// "Claude Fable 5 is currently unavailable." It was, however, briefly public:
// the report below documents that opening-and-withdrawal arc. Hard specs are
// deliberately left as TODO(research).
export const claudeFable5: ModelProfile = {
  slug: 'claude-fable-5',
  meta: {
    name: 'Claude Fable 5',
    family: 'Claude',
    variant: 'Fable',
    modelVersion: '5',
    organization: 'Anthropic',
    releaseDate: '2026-06-09',
    releaseDateDisplay: 'June 9, 2026',
    identity:
      'The first public release of Anthropic\'s top-tier Mythos system — a frontier model briefly included on every paid Claude plan in June 2026 before access was suspended days after launch.',
    tagIds: [
      // capability
      'reasoning',
      'frontier',
      'writing',
      'creativity',
      'worldbuilding',
      // modality
      'text',
      'multimodal',
      // licensing (closed weights, API-only)
      'proprietary',
      // size-performance
      'large',
      // context
      'ultra',
      // output
      'output-64k',
      // deployment
      'cloud',
      'api',
    ],
    tags: ['Mythos Sibling', 'Frontier', 'Access Suspended'],
    links: {
      ...claudeFable5Links,
    },
  },
  analysis: {
    strengths: [
      'Frontier-level capability — the public, fully-safeguarded face of the top-tier Mythos model',
      'Strong narrative, creative, and long-form reasoning (the qualities its name gestures at)',
      'Graceful safeguards: cyber/bio/chem/distillation triggers hand off to Opus 4.8 rather than hard-refusing, firing in under 5% of sessions',
    ],
    weaknesses: [
      'Currently unusable: access was suspended on June 12, 2026, with restoration promised but undated',
      'Volatile availability — granted broadly and revoked within a week, so you cannot count on it being callable',
      'Still unevaluable in depth: the public window was too brief to produce reproducible, independent benchmarks',
    ],
    unknowns: [
      'The hard specs: parameters, architecture, context/output limits, real benchmarks, and what post-window "usage credits" cost — all undisclosed or unconfirmed. TODO(research)',
      'The exact reason for the June 12 suspension and when access will return',
      'How Fable\'s capability compares to the safeguard-lifted Mythos 5 build given to approved partners',
    ],
  },
  intro: {
    text:
      'Claude Fable 5 is the model you may have briefly gotten to use and then lost. Released June 9, 2026 as the first public version of Anthropic\'s top-tier Mythos system, it was included free on Pro, Max, and Team plans — until Anthropic suspended it three days later. That arc, from broad public release to abrupt withdrawal, is the defining fact about this model, so this report is about the opening and the closing: what was offered, how it relates to the safeguard-lifted Mythos build, and why a model we actually called is still one we cannot fully measure.',
  },
  // benchmarks, pricingData, chatLimits, sentimentFeed omitted — the model is not
  // openly accessible, so there are no reproducible numbers to report. TODO(research)
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'A frontier model the public briefly got to touch',
      content: null,
    },
    {
      id: 'the-opening',
      title: 'The Opening',
      subtitle: 'Broadly released, then withdrawn within a week',
      content: null,
    },
    {
      id: 'the-mythos-sibling',
      title: 'The Mythos Sibling',
      subtitle: 'Same model, safeguards lifted',
      content: null,
    },
    {
      id: 'what-we-know',
      title: 'What We Actually Know',
      subtitle: 'Separating fact from narrative',
      content: null,
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: null,
    },
  ],
  governance: {
    // lastUpdated omitted — TODO(research)
    dataSources: [
      {
        type: 'official',
        url: 'https://www.anthropic.com/news/claude-fable-5-mythos-5',
        description: 'Launch announcement (public release, safeguards, June 12 suspension update)',
      },
      {
        type: 'editorial',
        description:
          'Editorial report combining firsthand use during the brief June 2026 public window with Anthropic\'s announcement. Access is currently suspended, so deeper claims (specs, benchmarks) remain unverified and are marked TODO(research).',
      },
    ],
    confidence: {
      overall: 45,
      features: 40,
      benchmarks: 10,
      pricing: 10,
    },
  },
}
