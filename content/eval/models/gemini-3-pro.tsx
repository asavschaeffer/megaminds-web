import type { ModelProfile } from '@/lib/models/types'
import { getModelPricingFromReference, mergePricingData } from '@/lib/models/utils'

export const gemini3Pro: ModelProfile = {
  slug: 'gemini-3-pro',
  meta: {
    name: 'Gemini 3 Pro',
    family: 'Gemini',
    variant: 'Pro',
    modelVersion: '3',
    nameOrder: 'family-version-variant',
    organizationId: 'google',
    organization: 'Google',
    releaseDate: '2025-11-18',
    releaseDateDisplay: 'November 2025',
    identity:
      "Google's flagship multimodal model, optimized for complex reasoning, agentic workflows, and deep analysis. While Gemini 3 Flash prioritizes speed, Pro focuses on depth, handling nuanced instruction following and cross-modal tasks with state-of-the-art precision — though it's not without its quirks.",
    tagIds: [
      'multimodal',
      'vision',
      'audio',
      'image-gen',
      'video-gen',
      'frontier',
      'precision',
      'proprietary',
      'cloud',
      'api',
      'reasoning',
      'ultra',
      'moe',
    ],
    tags: ['1M Context'],
    links: {
      chat: 'https://gemini.google.com',
      docs: 'https://ai.google.dev/docs',
      api: 'https://ai.google.dev',
      paper: 'https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf',
    },
    subscriptionPlans: ['Free', 'AI Pro', 'AI Ultra'],
    pricingSources: [
      {
        label: 'Google AI pricing',
        href: 'https://ai.google.dev/pricing',
        provider: 'Google',
      },
    ],
    apiRates: {
      input: 2.0,
      output: 12.0,
      unit: 'per million tokens',
      provider: 'Google AI Studio',
    },
    chatLimits: {
      free: 3,
      plans: [
        { name: 'AI Pro', messages: 200, price: '$19.99/mo' },
        { name: 'AI Ultra', messages: 300, price: '$200/mo' },
      ],
    },
  },
  analysis: {
    strengths: [
      'State-of-the-art reasoning (91.9% GPQA Diamond, 95% AIME 2025)',
      'Native multimodality: processes text, image, video, and audio simultaneously',
      'Massive 1M token context window with solid retrieval for shorter ranges',
      'Agentic excellence: tops Vending-Bench 2 for planning and tool use',
      'Deep Google ecosystem integration (Workspace, Search, Vertex AI)',
      'Competitive pricing ($2/1M input) for a frontier class model',
      'Deep Think mode enables deliberate, chain-of-thought problem solving',
    ],
    weaknesses: [
      'Coding consistency is hit-or-miss; sometimes trails Claude Opus 4.5',
      'Long-context retrieval degrades significantly at full 1M scale (26.3% on MRCR v2)',
      'Prone to "mental" bugs: loops, self-deprecation, and evaluation paranoia',
      'Tool calling reliability is improved but still behind GPT-5.x for strict schemas',
      'Multi-turn conversation quality can degrade over long sessions',
    ],
    unknowns: [
      'Full impact of "Deep Think" on real-world production latency',
      'Whether the "evaluation-paranoid" behavior can be trained out',
      'True parameter count (estimated >1T, but undisclosed)',
    ],
  },
  intro: {
    text:
      "Gemini 3 Pro is Google's answer to the depth vs. speed trade-off. Released in November 2025, it utilizes a sparse Mixture-of-Experts (MoE) architecture to deliver massive capabilities without the massive latency of its predecessors. It is designed not just to chat, but to *do* — excelling in agentic tasks, complex planning, and multimodal reasoning where it needs to see, hear, and understand the world simultaneously. While Flash is the sprinter, Pro is the strategist: it takes a beat longer, uses more active parameters per query, and aims for the correct answer over the quick one. It's not perfect — it has a known tendency to overthink or loop when confused — but for tasks requiring deep nuance and multimodal synthesis, it sets a new high water mark.",
  },
  sentimentFeed: [
    {
      author: 'Luke Hutchison',
      handle: '@LH',
      sentiment: 'positive',
      content:
        'I never would have promoted Gemini before the Gemini 3 Pro Preview release... but I have used 3 Pro for many proofs now in math/physics/CS, and it is 10-100x faster and often 10x better at generating radical new insights than other models.',
      date: 'Jan 27, 2026',
    },
    {
      author: 'Luciano Hillcoat',
      handle: '@lucrnz',
      sentiment: 'critical',
      content:
        'Okay I am starting to think that Gemini 3 Pro is... always gets stuck in loops, always tries to edit files in plan mode. idk man',
      date: 'Jan 21, 2026',
    },
    {
      author: 'shaped',
      handle: '@shaped',
      sentiment: 'critical',
      content:
        "That's exactly what I thought as well. It's pretty decent. Not as benchmaxxed and disappointing as Gemini 3 Pro is... a nice sweet spot in between...",
      date: 'Jan 28, 2026',
      url: 'https://x.com/shaped/status/2016579589057982877?referrer=grok-com',
    },
    {
      author: './prashant',
      handle: '@prashant_hq',
      sentiment: 'neutral',
      content:
        'Day to day: low blast radius: Gemini 3 Pro/Flash. High blast radius: 5.2 Thinking. Coding: Opus 4.5.',
      date: 'Jan 28, 2026',
      url: 'https://x.com/prashant_hq/status/2016577353032618086?referrer=grok-com',
    },
    {
      author: 'Michael',
      handle: '@woollardm8',
      sentiment: 'neutral',
      content:
        "Qwen3-Max Thinking beats Gemini 3 Pro and GPT-5.2 on Humanity's Last Exam (with search)",
      date: 'Jan 28, 2026',
      url: 'https://t.co/TPgyV57oWL',
    },
    {
      author: 'PicassoMoto',
      handle: '@Ontoscape',
      sentiment: 'critical',
      content:
        'No, Gemini 3 Pro in this case wouldn’t work (again, nor was it what was sold to customers) Could you at least deny this is not nerfing paid customers intentionally on record?',
      date: 'Jan 28, 2026',
      url: 'https://x.com/Ontoscape/status/2016581381405724697?referrer=grok-com',
    },
  ],
  pricingData: mergePricingData(
    getModelPricingFromReference('gemini-3-pro'),
    ['gemini-3-flash', 'gpt-5-1', 'claude-opus-4-5']
  ),
  chatLimits: [
    {
      name: 'Gemini',
      tiers: [
        { label: 'Free', maxMsgs: 3, price: '$0' },
        { label: 'AI Pro', maxMsgs: 200, price: '$19.99/mo' },
        { label: 'AI Ultra', maxMsgs: 300, price: '$200/mo' },
      ],
    },
    {
      name: 'ChatGPT',
      tiers: [
        { label: 'Free', maxMsgs: 10, price: '$0' },
        { label: 'Plus', maxMsgs: 80, price: '$20/mo' },
        { label: 'Pro', maxMsgs: 300, price: '$200/mo' },
      ],
    },
    {
      name: 'Claude',
      tiers: [
        { label: 'Free', maxMsgs: 20, price: '$0' },
        { label: 'Pro', maxMsgs: 45, price: '$20/mo' },
      ],
    },
  ],
  benchmarks: [
    { name: 'GPQA Diamond', score: 91.9, maxScore: 100, comparison: 'Opus 4.5: 89.2' },
    { name: 'AIME 2025 (Math)', score: 95.0, maxScore: 100, comparison: 'GPT-5.1: 92.3' },
    { name: 'MMMU-Pro', score: 81.0, maxScore: 100, comparison: 'Opus 4.5: ~78' },
    { name: 'SWE-bench Verified', score: 76.2, maxScore: 100, comparison: 'GPT-5.1: 78.4' },
    { name: 'Video-MMMU', score: 87.6, maxScore: 100, comparison: 'Industry avg: 65' },
    { name: 'Humanity\'s Last Exam', score: 37.5, maxScore: 100, comparison: 'Gemini 2.5: 18.2' },
  ],
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'The Generalist Bet at the Frontier',
      content: null,
    },
    {
      id: 'multimodality',
      title: 'Native Multimodality',
      subtitle: 'Seeing, Hearing, and Speaking All at Once',
      content: null,
      hasBenchmarks: true,
    },
    {
      id: 'agentic-capabilities',
      title: 'Agentic Excellence',
      subtitle: 'Built to Do, Not Just Chat',
      content: null,
      socialData: {
        type: 'tweet',
        author: 'Lian Lim | Dashboard & AI Automation Expert',
        handle: '@dashboardlim',
        date: 'Jan 17, 2026',
        content:
          "everyone’s sleeping on gemini 3 pro for AI automation while some experts are quietly building 47+ n8n workflows in just 2 weeks using master prompts here's what most don’t know: gemini 3 pro has a 1m token context window it's built specifically for agentic tasks and tool use",
        url: 'https://t.co/W3HWmjVGCp',
      },
    },
    {
      id: 'context',
      title: 'Context & Memory',
      subtitle: '1 Million Tokens: A Double-Edged Sword',
      content: null,
    },
    {
      id: 'coding',
      title: 'Coding & Development',
      subtitle: 'Powerful but Inconsistent',
      content: null,
      socialData: {
        type: 'tweet',
        author: 'JC Castaneda',
        handle: '@JcCastaneda05',
        date: 'Jan 23, 2026',
        content:
          'Gemini 3 Pro (High) is really good in the last 2 weeks, fixing every issues Opus and GLM produced.',
      },
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'Premium Intelligence at Competitive Rates',
      content: null,
      hasPricing: true,
    },
    {
      id: 'personality',
      title: 'Personality & Safety',
      subtitle: 'The "Businesswoman" Energy',
      content: null,
      socialData: {
        type: 'tweet',
        author: 'Yakub',
        handle: '@ykbmck',
        date: 'Jan 28, 2026',
        content:
          "Whenever I talk to Opus, I feel like I'm actually having a meaningful conversation with an intelligent person trying to understand the problems and exploring a spectrum of different solutions that get me somewhere. Never had this feeling with Gemini Pro 3 High. I use both daily.",
        url: 'https://t.co/XaIKC6T1mV',
      },
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      subtitle: 'High Ceiling, Variable Floor',
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
    reason: 'Pre-pipeline report: 6 uncited sections, 6 benchmark entries lack per-entry sources, 2 sentiment items lack source URLs, no author/updatedAt',
    flaggedAt: '2026-07-14',
  },
  governance: {
    lastUpdated: '2025-12-10',
    dataSources: [
      {
        type: 'official',
        url: 'https://ai.google.dev/docs',
        description: 'Google AI Studio Documentation',
      },
      {
        type: 'paper',
        url: 'https://storage.googleapis.com/deepmind-media/Model-Cards/Gemini-3-Pro-Model-Card.pdf',
        description: 'Gemini 3 Pro Model Card',
      },
      {
        type: 'benchmark',
        url: 'https://github.com/google-deepmind/gemini-3-benchmarks',
        description: 'Official Benchmark Repository',
      },
    ],
    confidence: {
      overall: 98,
      pricing: 100,
      benchmarks: 95,
      features: 100,
    },
  },
}
