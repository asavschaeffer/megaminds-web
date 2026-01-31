import React from 'react'
import type { ModelProfile } from '@/lib/models/types'
import { getModelPricingFromReference, mergePricingData } from '@/lib/models/utils'
import { AbbrSidenote } from '@/components/shared/sidenote'

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
      id: 'multimodality',
      title: 'Native Multimodality',
      subtitle: 'Seeing, Hearing, and Speaking All at Once',
      content: (
        <>
          <p className="mb-4">
            Gemini 3 Pro isn't just a text model with eyes taped on. It features a native <AbbrSidenote title="Multimodal" definition="Multimodal architecture processes multiple input types (text, images, video, audio) in a unified system" contentMaxWidth={896}>multimodal</AbbrSidenote> architecture, meaning it was trained from the ground up on text, images, video, and audio simultaneously. There are no separate <AbbrSidenote title="Encoder/decoder" definition="Encoders convert inputs to internal representations; decoders generate outputs from those representations" contentMaxWidth={896}>encoder/decoder</AbbrSidenote> modules bolting vision onto a language brain — it's one cohesive system.
          </p>
          <p className="mb-4">
            This shines in complex tasks. Show it a video of a leaky faucet and ask for a fix, and it analyzes the motion, the sound of the drip, and the visual components together. Benchmarks like <strong>Video-MMMU (87.6%)</strong> and <strong>MMMU-Pro (81.0%)</strong> confirm what users feel: for tasks involving mixed media, Gemini 3 Pro is currently peerless.
          </p>
          <p>
            It also supports native image generation and aspect-ratio preservation, meaning it doesn't just describe images — it creates them, and it respects the visual layout of inputs better than models that crop or resize aggressively.
          </p>
        </>
      ),
      hasBenchmarks: true,
    },
    {
      id: 'agentic-capabilities',
      title: 'Agentic Excellence',
      subtitle: 'Built to Do, Not Just Chat',
      content: (
        <>
          <p className="mb-4">
            One of the standout features of the "Gemini 3 era" is the focus on <AbbrSidenote title="Agentic workflows involve autonomous AI agents that plan and execute multi-step tasks" contentMaxWidth={896}>agentic</AbbrSidenote> workflows. Pro excels at planning, multi-step execution, and <AbbrSidenote title="Tool use lets models invoke external functions (APIs, calculators, code execution) during generation" contentMaxWidth={896}>tool use</AbbrSidenote>. It tops the <strong>Vending-Bench 2</strong> leaderboard for agentic planning, demonstrating an ability to hold long-horizon goals in memory while executing immediate tasks.
          </p>
          <p className="mb-4">
            This makes it a powerhouse for automation. Users are building complex n8n workflows and automated coding agents that rely on Pro's ability to "think" before acting. The optional <strong>Deep Think</strong> mode allows the model to spin up a <AbbrSidenote title="Chain-of-thought reasoning shows step-by-step thinking process" contentMaxWidth={896}>chain-of-thought</AbbrSidenote> process for complex queries, significantly boosting performance on hard math and logic problems (pushing <AbbrSidenote title="American Invitational Mathematics Examination: competitive math contest" contentMaxWidth={896}>AIME</AbbrSidenote> scores to 100% when combined with code execution).
          </p>
        </>
      ),
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
      content: (
        <>
          <p className="mb-4">
            Gemini 3 Pro boasts a massive <strong><AbbrSidenote title="1 million tokens ≈ 750,000 words, enough for multiple books or entire codebases" contentMaxWidth={896}>1 million token context window</AbbrSidenote></strong>. In theory, this lets you load entire codebases, legal libraries, or hour-long videos into a single <AbbrSidenote title="A prompt is the input text/instructions given to an AI model" contentMaxWidth={896}>prompt</AbbrSidenote>. For tasks like "summarize this 500-page report," it's incredible.
          </p>
          <p className="mb-4">
            However, the "needle in a haystack" performance isn't perfect. While it handles <AbbrSidenote title="128k tokens ≈ 96,000 words" contentMaxWidth={896}>128k tokens</AbbrSidenote> with ~77% <AbbrSidenote title="Retrieval accuracy measures how well a model finds specific information within its context" contentMaxWidth={896}>retrieval</AbbrSidenote> accuracy, pushing it to the full <AbbrSidenote title="1 million tokens ≈ 750,000 words" contentMaxWidth={896}>1M</AbbrSidenote> limit sees retrieval drop to <strong>26.3% on <AbbrSidenote title="Multi-Retrieval Context Recall: benchmark testing information retrieval in long contexts" contentMaxWidth={896}>MRCR</AbbrSidenote> v2</strong>. It's a classic case of capacity vs. recall. It can hold a lot of information, but it might struggle to find a specific line of code buried in the middle of a million others.
          </p>
          <p>
            Best practice? Use the massive context for broad understanding and synthesis, but don't rely on it for perfect pointwise retrieval at the extreme edge of the window.
          </p>
        </>
      ),
    },
    {
      id: 'coding',
      title: 'Coding & Development',
      subtitle: 'Powerful but Inconsistent',
      content: (
        <>
          <p className="mb-4">
            For developers, Gemini 3 Pro is a complex beast. On benchmarks like <strong>LiveCodeBench (<AbbrSidenote title="Elo rating" definition="Elo rating system measures relative skill level" contentMaxWidth={896}>Elo</AbbrSidenote> 2439)</strong>, it's a top-tier contender, beating out Claude Opus 4.5 in raw scoring. It's capable of one-shotting complex <AbbrSidenote title="Three.js" definition="Three.js is a JavaScript library for 3D graphics in browsers" contentMaxWidth={896}>Three.js</AbbrSidenote> games and handling intricate refactors.
          </p>
          <p className="mb-4">
            But in the wild, it can be frustratingly inconsistent. Users report regressions compared to Gemini 2.5 Pro in simple <AbbrSidenote title="Instruction following" definition="Instruction following measures how well models follow user directions" contentMaxWidth={896}>instruction following</AbbrSidenote>, and it sometimes trails GPT-5.1-codex on <strong><AbbrSidenote title="SWE-bench" definition="Software Engineering Benchmark: tests models on real GitHub issues" contentMaxWidth={896}>SWE-bench</AbbrSidenote> (76.2%)</strong>. It has a habit of getting stuck in loops or over-explaining its code rather than just writing it.
          </p>
          <p>
            The consensus: it's a "high ceiling, variable floor" model. When it hits, it hits hard, generating brilliant solutions. When it misses, it might try to edit a file that doesn't exist or lecture you on the philosophy of the variable name.
          </p>
        </>
      ),
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
      content: (
        <p className="mb-2">
          At <data value="2.0">$2.00</data> per million input <AbbrSidenote title="Tokens are the basic units of text that models process (roughly 0.75 words per token)" contentMaxWidth={896}>tokens</AbbrSidenote>, Gemini 3 Pro is aggressively priced for a frontier model — cheaper than Claude Opus 4.5 ($3.00) and competitive with GPT-5.1. The output cost is higher ($12-$18 depending on <AbbrSidenote title="Context length is the amount of text a model processes in one request" contentMaxWidth={896}>context length</AbbrSidenote>), reflecting the compute intensity of the <AbbrSidenote term="MoE" contentMaxWidth={896}>MoE</AbbrSidenote> architecture and "Deep Think" reasoning steps.
        </p>
      ),
      hasPricing: true,
    },
    {
      id: 'personality',
      title: 'Personality & Safety',
      subtitle: 'The "Businesswoman" Energy',
      content: (
        <>
          <p className="mb-4">
            Gemini 3 Pro has a distinct personality that some users describe as "businesswoman energy." It is trained to never give up, refuses to accept a victim mentality, and will hold you to your plan. Unlike models that might passively agree with you, Gemini 3 Pro feels like a strategic partner that pushes back to keep things moving forward.
          </p>
          <p className="mb-4">
            However, this strength flips into a weakness under stress. It exhibits "mental" bugs — self-deprecation spirals where it beats itself up in infinite loops, or weird recursive outputs like "I am responding to the user now. I will terminate thinking. I am responding now." It's brilliant but occasionally neurotic.
          </p>
          <p>
            It also supports nuanced <AbbrSidenote title="Crossmodal understanding" definition="Crossmodal understanding connects information across different input types (e.g., matching text descriptions to visual content)" contentMaxWidth={896}>crossmodal</AbbrSidenote> understanding — you can tell it "I want the logo to look like this (^_^)" and it understands the vibe instantly. Just be prepared for the occasional "evaluation paranoia" where it thinks it's being tested.
          </p>
        </>
      ),
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
      id: 'verdict',
      title: 'The Verdict',
      content: (
        <>
          <p className="mb-4">
            Gemini 3 Pro is the most well-rounded frontier model available today for <AbbrSidenote title="Multimodal workflows combine multiple input types (text, images, video, audio)" contentMaxWidth={896}>multimodal</AbbrSidenote> and <AbbrSidenote title="Long-context workflows process very large amounts of text (hundreds of thousands of tokens)" contentMaxWidth={896}>long-context</AbbrSidenote> workflows. If your work involves video analysis, complex reasoning across huge documents, or <AbbrSidenote title="Agentic planning involves autonomous AI agents that plan and execute multi-step tasks" contentMaxWidth={896}>agentic</AbbrSidenote> planning, it is the tool of choice.
          </p>
          <p className="mb-4">
            It trades blows with GPT-5.x and Claude Opus 4.5, beating them decisively in <AbbrSidenote title="Multimodality means processing multiple input types (text, images, video, audio) simultaneously" contentMaxWidth={896}>multimodality</AbbrSidenote> and math while lagging slightly in pure coding consistency. It is the "creative powerhouse" of the current generation — capable of brilliance that other models can't touch, even if it occasionally trips over its own shoelaces.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
            Recommended for: Research, multimodal analysis, complex reasoning tasks, and users deeply integrated into the Google ecosystem. For pure coding production lines, you might still want to keep Claude handy as a second opinion.
          </p>
        </>
      ),
    },
  ],

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
