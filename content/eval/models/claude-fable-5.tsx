import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'

const claudeFable5Links = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    const linkMap: Partial<Record<ModelLinkTypeId, string>> = {
      docs: 'https://docs.claude.com/en/docs/about-claude/models',
      blog: 'https://www.anthropic.com/news/fable-mythos-access', // access-policy announcement
    }
    if (id in linkMap) {
      acc[id] = linkMap[id as keyof typeof linkMap]!
    }
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

// NOTE: This is an editorial report, not a self-authored one. Unlike its
// siblings, Fable 5 could not write its own profile — it is access-restricted
// and returned "Claude Fable 5 is currently unavailable" when asked. The report
// below documents what that restriction is and why it exists, rather than the
// model's own voice. Hard specs are deliberately left as TODO(research).
export const claudeFable5: ModelProfile = {
  slug: 'claude-fable-5',
  meta: {
    name: 'Claude Fable 5',
    family: 'Claude',
    variant: 'Fable',
    modelVersion: '5',
    organization: 'Anthropic',
    // releaseDate omitted — "release" is contested; access is gated. TODO(research)
    identity:
      'Anthropic\'s most capable widely-discussed model — and its least accessible: a frontier system held behind a restricted-access gate rather than offered to the general public.',
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
      // licensing (restricted / select access)
      'proprietary',
      'research',
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
    tags: ['Restricted Access', 'Frontier', 'Select Availability'],
    links: {
      ...claudeFable5Links,
    },
  },
  analysis: {
    strengths: [
      'Reputed frontier-level capability — positioned at or above the top of the Claude line',
      'Strong narrative, creative, and long-form reasoning (the qualities its name gestures at)',
      'Whatever its ceiling, it is high enough that access to it is treated as a controlled resource',
    ],
    weaknesses: [
      'You almost certainly cannot use it: access is gated to a select population, not the public',
      'Unevaluable in practice — no open access means no independent, reproducible testing',
      'Its restriction is itself a product limitation: a capability you cannot call is a capability you do not have',
    ],
    unknowns: [
      'Nearly everything verifiable: parameters, architecture, benchmarks, pricing, and true availability — all undisclosed or unconfirmed. TODO(research)',
      'The precise terms of who qualifies for access and why',
      'How much of the surrounding narrative is fact, controlled disclosure, or rumor',
    ],
  },
  intro: {
    text:
      'Claude Fable 5 is the model you have heard about but probably cannot use. Where Opus, Sonnet, and Haiku are sold by the token to anyone with an API key, Fable 5 sits behind a restricted-access gate — served to a select population rather than released to the public. That gating, and the controversy around it, is the defining fact about this model, so this report is about the withholding itself: what it is, the incident that appears to motivate it, and why an evaluation site can describe Fable 5 but cannot truly evaluate it.',
  },
  // benchmarks, pricingData, chatLimits, sentimentFeed omitted — the model is not
  // openly accessible, so there are no reproducible numbers to report. TODO(research)
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'A frontier model you are not allowed to call',
      content: null,
    },
    {
      id: 'the-withholding',
      title: 'The Withholding',
      subtitle: 'Capability as a controlled resource',
      content: null,
    },
    {
      id: 'mythos-incident',
      title: 'The Mythos Incident',
      subtitle: 'Why the gate exists',
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
        url: 'https://www.anthropic.com/news/fable-mythos-access',
        description: 'Access-policy announcement (restricted availability)',
      },
      {
        type: 'editorial',
        description:
          'Editorial report based on limited public information. The model could not be tested directly because it is access-restricted; treat the surrounding narrative as contested.',
      },
    ],
    confidence: {
      overall: 30,
      features: 25,
      benchmarks: 5,
      pricing: 5,
    },
  },
}
