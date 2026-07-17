import type { ModelProfile } from '@/lib/models/types'

export const deepseekR1: ModelProfile = {
  slug: 'deepseek-r1',
  meta: {
    name: 'DeepSeek-R1',
    family: 'R1 Series',
    organizationId: 'deepseek',
    organization: 'DeepSeek',
    releaseDate: '2025-01-20',
    releaseDateDisplay: 'January 20, 2025',
    identity:
      'The cheapest reasoning frontier model with transparent chain-of-thought. DeepSeek-R1 brings o1-level performance at a fraction of the cost (trained for $5-6M vs competitors\' billions), with full visibility into its thinking process. Built by a hedge fund skunkworks project using pure reinforcement learning.',
    tagIds: [
      'reasoning',
      'visible-reasoning',
      'coding',
      'math',
      'text',
      'moe',
      'open-weights',
      'frontier',
      'cost-efficient',
      'long',
      'api',
    ],
    specChips: ['670B Parameters', '128K Context'],
    links: {
      chat: 'https://chat.deepseek.com',
      docs: 'https://api-docs.deepseek.com',
      paper: 'https://arxiv.org/abs/2501.12948',
      weights: 'https://huggingface.co/deepseek-ai/DeepSeek-R1',
      github: 'https://github.com/deepseek-ai/DeepSeek-R1',
    },
    pricingSources: [
      {
        label: 'DeepSeek API docs',
        href: 'https://api-docs.deepseek.com',
        provider: 'DeepSeek',
      },
    ],
    apiRates: {
      input: 0.55,
      output: 2.19,
      unit: 'per million tokens',
      provider: 'DeepSeek API',
    },
  },
  analysis: {
    strengths: [
      { claim: 'Exceptional value — 95% cheaper than o1, trained for $5-6M' },
      { claim: 'Transparent reasoning traces with visible "aha moments"' },
      { claim: 'Strong math and code performance (solves Putnam-level problems)' },
      { claim: 'Open weights under MIT license with 6 distilled models' },
      { claim: 'Can run locally via WebGPU or quantized versions' },
      { claim: 'Pure RL approach proves reasoning can emerge without SFT' },
    ],
    weaknesses: [
      { claim: 'Slower inference due to verbose reasoning (1000+ tokens common)' },
      { claim: 'Overthinks simple questions' },
      { claim: 'Tokenization issues with character-level tasks' },
      { claim: 'Less polished UX than competitors' },
      { claim: 'Limited multimodal capabilities' },
      { claim: 'Occasional "intrinsic knowledge override" where reasoning conflicts with memorized facts' },
    ],
    unknowns: [{ claim: 'True dataset composition' }, { claim: 'Real-world safety behavior at scale' }],
  },
  intro: {
    text:
      "DeepSeek-R1 landed on January 20, 2025 like a pricing nuke. While OpenAI's o1 dominated reasoning tasks at $15/million tokens, DeepSeek offered comparable performance for $0.55. That's not a typo. What makes this more remarkable: DeepSeek is a hedge fund skunkworks project that trained R1 for roughly $5-6 million — a fraction of what competitors spend. The model uses pure reinforcement learning (no supervised fine-tuning) to generate visible chain-of-thought reasoning, meaning you can actually watch it think. For developers building agents, math tutors, or code assistants, R1 became the obvious choice overnight. It's not perfect — the reasoning can get chatty, and it lacks vision — but it fundamentally reset expectations for what \"expensive\" means in AI.",
  },
  chatLimits: [
    {
      name: 'DeepSeek',
      tiers: [{ label: 'Free', maxMsgs: 999, price: '$0' }],
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
        { label: 'Max 5x', maxMsgs: 150, price: '$100/mo' },
        { label: 'Max 20x', maxMsgs: 300, price: '$200/mo' },
      ],
    },
  ],
  benchmarks: [
    { name: 'AIME 2024', score: 79.8, maxScore: 100, comparison: 'o1: 83.3' },
    { name: 'MATH-500', score: 97.3, maxScore: 100, comparison: 'o1: 96.4' },
    { name: 'Codeforces', score: 96.3, maxScore: 100, comparison: 'o1: 96.6' },
    { name: 'GPQA Diamond', score: 71.5, maxScore: 100, comparison: 'o1: 78.0' },
    { name: 'MMLU', score: 90.8, maxScore: 100, comparison: 'GPT-4o: 88.7' },
    { name: 'LiveCodeBench', score: 65.9, maxScore: 100, comparison: 'o1: 63.4' },
  ],
  sentimentFeed: [
    {
      author: 'Ethan Mollick',
      handle: '@emollick',
      content:
        'DeepSeek R1 is incredibly charming. Its reasoning traces are well-thought-out and feel like a human trying to make their way through a problem.',
      sentiment: 'positive',
      url: 'https://x.com/emollick/status/1881423029160575474',
    },
    {
      author: 'Greg Kamradt',
      handle: '@GregKamradt',
      content:
        'DeepSeek R1 performance on ARC-AGI is on par with OpenAI o1-preview, while being open-source and a fraction of the cost.',
      sentiment: 'positive',
      url: 'https://x.com/GregKamradt/status/1881762305152872654',
    },
    {
      author: 'ARC Prize',
      handle: '@arcprize',
      content:
        'This is really starting to look like "intelligence too cheap to meter." DeepSeek R1 matches o1 performance at 95% lower cost.',
      sentiment: 'positive',
      url: 'https://x.com/arcprize/status/1881761987090325517',
    },
    {
      author: 'Karthik',
      handle: '@karthikv792',
      content:
        'DeepSeek R1 performs very well on PlanBench - 39.8% on Mystery Blocksworld and 96.6% on Blocksworld, easily beating vanilla LLMs.',
      sentiment: 'positive',
      url: 'https://x.com/karthikv792/status/1881731017746313367',
    },
    {
      author: 'Simon Willison',
      handle: '@simonw',
      content:
        "These are a LOT of fun to play with. I've been trying out a quantized version of the Llama one. The \"thinking\" section is fascinating.",
      sentiment: 'positive',
      url: 'https://news.ycombinator.com/item?id=42769222',
    },
    {
      author: 'Hacker News',
      handle: '',
      content:
        'DeepSeek-R1 received 1,843 points and 663 comments. Users were enthusiastic about testing the models locally, with developers sharing quantized versions and setup guides.',
      sentiment: 'positive',
      url: 'https://news.ycombinator.com/item?id=42768072',
    },
    {
      author: 'It Can Think',
      handle: '',
      content:
        'DeepSeek R1 is incredibly charming. Its reasoning traces are well-thought-out and feel like a human trying to make their way through a problem.',
      sentiment: 'positive',
      url: 'https://itcanthink.substack.com/p/deepseek-r1-reactions',
    },
    {
      author: 'Ozgune',
      handle: '',
      content:
        "It's great that DeepSeek-R1 fixes the endless repetition issues. The MIT license will notably increase how many people can evaluate advanced reasoning models.",
      sentiment: 'positive',
      url: 'https://news.ycombinator.com/item?id=42768827',
    },
    {
      author: 'Mertnesvat',
      handle: '',
      content:
        "The most interesting part isn't just the performance - it's their pure RL approach without supervised fine-tuning. This hints at a potential shift in how we might train future models.",
      sentiment: 'positive',
      url: 'https://news.ycombinator.com/item?id=42781567',
    },
  ],
  sections: [
    {
      id: 'why-it-matters',
      title: 'Why It Matters',
      subtitle: 'For everyday people and power users',
      content: null,
    },
    {
      id: 'social-proof',
      variant: 'social',
      content: null,
      socialData: {
        type: 'tweet',
        author: 'Ethan Mollick',
        handle: '@emollick',
        date: '2025-01-22',
        dateDisplay: 'Jan 22, 2025',
        content:
          'DeepSeek R1 is incredibly charming. Its reasoning traces are well-thought-out and feel like a human trying to make their way through a problem.',
        url: 'https://x.com/emollick/status/1881423029160575474',
      },
    },
    {
      id: 'core-features',
      title: 'Core Features',
      subtitle: 'What makes it tick',
      variant: 'technical',
      hasBenchmarks: true,
      content: null,
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'API pricing and chat usage compared',
      content: null,
      hasPricing: true,
      socialData: {
        type: 'tweet',
        author: 'ARC Prize',
        handle: '@arcprize',
        content: 'This is really starting to look like "intelligence too cheap to meter." DeepSeek R1 matches o1 performance at 95% lower cost.',
        date: '2025-01-20',
        dateDisplay: 'Jan 20, 2025',
        url: 'https://x.com/arcprize/status/1881761987090325517',
      },
    },
    {
      id: 'training',
      title: 'Training & Architecture',
      subtitle: 'For the technically curious',
      variant: 'advanced',
      specs: [
        { label: 'Total Params', value: '671B', icon: 'cpu' },
        { label: 'Active Params', value: '37B', icon: 'zap' },
      ],
      content: null,
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      content: null,
    },
    {
      id: 'in-the-wild',
      title: 'In the Wild',
      subtitle: 'Real-world usage and community reactions',
      content: null,
    },
    {
      id: 'advanced',
      title: 'For ML Engineers',
      subtitle: 'Implementation details and gotchas',
      variant: 'advanced',
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
    reason: 'Pre-pipeline report: 7 uncited sections, 6 benchmark entries lack per-entry sources, no author/updatedAt',
    flaggedAt: '2026-07-14',
  },
  governance: {
    lastUpdated: '2025-01-20',
    dataSources: [
      {
        type: 'official',
        url: 'https://api-docs.deepseek.com',
        description: 'DeepSeek API Docs',
      },
      {
        type: 'paper',
        url: 'https://arxiv.org/abs/2501.12948',
        description: 'DeepSeek-R1 Technical Report',
      },
      {
        type: 'weights',
        url: 'https://huggingface.co/deepseek-ai/DeepSeek-R1',
        description: 'HuggingFace Model Weights',
      },
    ],
    confidence: {
      overall: 95,
      pricing: 100,
      benchmarks: 95,
      features: 90,
    },
  },
}
