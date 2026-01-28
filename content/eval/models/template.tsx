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
    releaseDateDisplay: 'January 2025',
    identity:
      'One-sentence identity that captures why this model matters and who it is for.',
    tagIds: [
      // Capability (choose 2-5)
      'reasoning',
      'coding',
      // Modality (choose 1-3)
      'text',
      // Architecture (optional)
      // Licensing (choose 1-2)
      'proprietary',
      // Size/Performance (choose 1-2)
      'medium',
      // Context (choose 1)
      'medium-context',
      // Deployment (choose 1-2)
      'cloud',
      'api',
      // Output (optional)
      'output-8k',
    ],
    tags: ['X Parameters', 'Y Context'],
    links: {
      ...templateLinks,
    },
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
      'Use the intro to set the scene: launch context, why it is notable, and what makes it different.',
  },
  pricingData: {
    baseModel: { name: 'Model Name', input: 1.0, output: 3.0 },
    competitors: [
      { name: 'Competitor A', input: 5.0, output: 15.0 },
      { name: 'Competitor B', input: 2.5, output: 10.0 },
    ],
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
        dateDisplay: 'Jan 2025',
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
      expandables: [
        {
          title: 'Fine-tuning',
          preview: 'How to adapt the model for a specific domain',
          content: 'Outline the recommended fine-tuning workflow and constraints.',
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
  ],
}
