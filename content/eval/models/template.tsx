import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'
import { AbbrSidenote } from '@/components/shared/sidenote'

const templateLinks = (Object.keys(MODEL_LINK_TYPES) as ModelLinkTypeId[]).reduce(
  (acc, id) => {
    acc[id] = `https://example.com/${id}`
    return acc
  },
  {} as Record<ModelLinkTypeId, string>
)

export const templateModel: ModelProfile = {
  slug: 'template',
  meta: {
    name: 'Model Name',
    family: 'Model Family',
    organization: 'Organization Name',
    releaseDate: '2025-01-01',
    identity:
      'One-sentence identity that captures why this model matters and who it is for.',
    tagIds: [
      'reasoning',
      'coding',
      'text',
      'proprietary',
      'medium',
      'medium-context',
      'cloud',
      'api',
      'output-8k',
    ],
    specChips: ['X Parameters', 'Y Context'],
    links: {
      ...templateLinks,
    },
    // The model's own sourced rates. Competitor comparisons are computed from
    // the registry at render time — never hand-pick rivals here.
    apiRates: { input: 1.0, output: 3.0, provider: 'Provider Name' },
    pricingSources: [
      { label: 'Vendor pricing page', href: 'https://example.com/pricing', provider: 'Provider Name' },
    ],
  },
  analysis: {
    strengths: [
      'Primary strength (e.g., exceptional reasoning quality)',
      'Secondary strength (e.g., strong code generation)',
      'Differentiator (e.g., transparent reasoning traces)',
    ],
    weaknesses: [
      'Primary limitation (e.g., slower responses)',
      'Known gap (e.g., limited multimodal support)',
    ],
    unknowns: [
      'Open question (e.g., real-world safety behavior at scale)',
      'Open question (e.g., training data composition)',
    ],
  },
  intro: {
    text:
      'Use this intro to set the scene: launch context, why it is notable, and what makes it different.',
  },
  chatLimits: [
    {
      name: 'Model Chat',
      tiers: [{ label: 'Free', maxMsgs: 25, price: '$0' }],
    },
    {
      name: 'Competitor Chat',
      tiers: [
        { label: 'Free', maxMsgs: 10, price: '$0' },
        { label: 'Pro', maxMsgs: 80, price: '$20/mo' },
      ],
    },
  ],
  benchmarks: [
    { name: 'Benchmark A', score: 78, maxScore: 100, comparison: 'Competitor: 81' },
    { name: 'Benchmark B', score: 64, maxScore: 100, comparison: 'Competitor: 62' },
    { name: 'Benchmark C', score: 91, maxScore: 100, comparison: 'Competitor: 88' },
  ],
  sentimentFeed: [
    {
      author: 'Industry Analyst',
      handle: '@analyst',
      content: 'Short quote that captures a core reaction or takeaway.',
      sentiment: 'positive',
      url: 'https://example.com/quote-1',
    },
    {
      author: 'Developer',
      handle: '@dev',
      content: 'Another short reaction highlighting practical usage.',
      sentiment: 'neutral',
      url: 'https://example.com/quote-2',
    },
    {
      author: 'Researcher',
      handle: '@research',
      content: 'A skeptical or critical note about limitations.',
      sentiment: 'critical',
      url: 'https://example.com/quote-3',
    },
  ],
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'For everyday users and power users',
      content:
        'Summarize why this model changes outcomes for real users. Highlight trust, productivity, or new capabilities.',
    },
    {
      id: 'social-proof',
      variant: 'social',
      content: null,
      socialData: {
        type: 'quote',
        author: 'Notable voice',
        content: 'A featured quote that anchors the narrative.',
        date: '2025-01',
      },
    },
    {
      id: 'core-features',
      title: 'Core Features',
      subtitle: 'What makes it tick',
      variant: 'technical',
      hasBenchmarks: true,
      content:
        'Describe 2-3 core technical features and why they matter. Keep it specific and measurable when possible.',
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: (
        <>
          <AbbrSidenote term="API" force>API</AbbrSidenote> pricing and chat usage compared
        </>
      ),
      content:
        'Explain pricing advantages or tradeoffs. Include context on who benefits at scale.',
      hasPricing: true,
    },
    {
      id: 'training',
      title: 'Training & Architecture',
      subtitle: 'For the technically curious',
      variant: 'advanced',
      specs: [
        { label: 'Total Params', value: 'XXXB', icon: 'cpu' },
        { label: 'Active Params', value: 'XXB', icon: 'zap' },
      ],
      content:
        'Explain training methodology and architecture choices at a high level. Include notable techniques or tradeoffs.',
      expandable: {
        title: 'Architecture Deep Dive',
        preview: 'Optional detail block for advanced readers',
        content:
          'Add a deeper technical explanation here: routing, optimization, or training stages.',
      },
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      content:
        'List limitations, failure modes, and usage gotchas. Be candid and practical.',
    },
    {
      id: 'in-the-wild',
      title: 'In the Wild',
      subtitle: 'Real-world usage and community reactions',
      content:
        'Describe real deployments, community anecdotes, and observed adoption patterns.',
    },
    {
      id: 'advanced',
      title: 'For ML Engineers',
      subtitle: 'Implementation details and gotchas',
      variant: 'advanced',
      content: null,
      expandables: [
        {
          title: 'Fine-tuning',
          preview: 'How to adapt model for a specific domain',
          content: 'Outline recommended fine-tuning workflow and constraints.',
        },
        {
          title: 'Inference Optimization',
          preview: 'How to make it faster or cheaper in production',
          content: 'Describe caching, batching, or distillation approaches.',
        },
      ],
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content:
        'Mandatory section: summarize who should use this model, when, and why. Be decisive.',
    },
    {
      id: 'multimodality',
      title: 'Native Multimodality',
      subtitle: 'Seeing, Hearing, and Speaking All at Once',
      hasBenchmarks: true,
      content:
        'Explain multimodal architecture: is it bolted-on encoders or native training? Cover supported modalities (text, image, video, audio) and benchmark performance on tasks like Video-MMMU, MMMU-Pro.',
    },
    {
      id: 'agentic-capabilities',
      title: 'Agentic Excellence',
      subtitle: 'Built to Do, Not Just Chat',
      content:
        'Cover planning, multi-step execution, and tool use. Reference benchmarks like Vending-Bench 2. Discuss Deep Think or chain-of-thought modes if applicable.',
    },
    {
      id: 'context',
      title: 'Context & Memory',
      subtitle: 'How Much Can It Hold — and Actually Use?',
      content:
        'Discuss context window size, retrieval accuracy at different scales (e.g., 128k vs 1M), and practical advice on when to trust long-context vs. chunking strategies.',
    },
    {
      id: 'coding',
      title: 'Coding & Development',
      subtitle: 'Capabilities and Consistency for Developers',
      content:
        'Cover coding benchmarks (LiveCodeBench, SWE-bench), real-world consistency, instruction following, and any known failure modes in code generation.',
    },
    {
      id: 'personality',
      title: 'Personality & Safety',
      subtitle: "The Model's Character and Guardrails",
      content:
        "Describe model's tone, persona quirks, refusal patterns, and any 'mental' bugs (loops, self-deprecation, evaluation paranoia). Include safety alignment notes.",
    },
  ],
  governance: {
    lastUpdated: '2025-01-01',
    dataSources: [
      {
        type: 'official',
        url: 'https://example.com/official',
        description: 'Official model documentation and release notes',
      },
      {
        type: 'benchmark',
        url: 'https://example.com/benchmarks',
        description: 'Public benchmark results and evaluations',
      },
    ],
    confidence: {
      overall: 85,
      pricing: 90,
      benchmarks: 80,
      features: 85,
    },
  },
}
