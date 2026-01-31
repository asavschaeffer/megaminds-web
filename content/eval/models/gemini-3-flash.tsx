import React from 'react'
import type { ModelProfile } from '@/lib/models/types'
import { getModelPricingFromReference, mergePricingData } from '@/lib/models/utils'
import { GlossarySidenote, AbbrSidenote } from '@/components/shared/sidenote'

export const gemini3Flash: ModelProfile = {
  slug: 'gemini-3-flash',
  meta: {
    name: 'Gemini 3 Flash',
    family: 'Gemini',
    variant: 'Flash',
    modelVersion: '3',
    nameOrder: 'family-version-variant',
    organizationId: 'google',
    organization: 'Google',
    releaseDate: '2025-12-17',
    releaseDateDisplay: 'December 2025',
    identity:
      "A high-efficiency multimodal model from Google DeepMind, engineered for speed and agentic performance. As the lightweight entry in the Gemini 3 lineup, Flash balances Pro-grade reasoning with minimal latency, supporting a massive 1M token context window while maintaining a aggressive price point for high-volume workflows.",
    tagIds: [
      'multimodal',
      'vision',
      'audio',
      'image-gen',
      'video-gen',
      'frontier',
      'speed',
      'ultra',
      'moe',
      'proprietary',
      'cloud',
      'api',
      'efficiency',
    ],
    tags: ['1M Context', 'Speed Optimized'],
    links: {
      chat: 'https://gemini.google.com',
      docs: 'https://ai.google.dev/docs',
      api: 'https://ai.google.dev',
      paper: 'https://blog.google/products-and-platforms/products/gemini/gemini-3-flash',
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
      input: 0.5,
      output: 3.0,
      unit: 'per million tokens',
      provider: 'Google AI Studio',
    },
    chatLimits: {
      free: 100,
      plans: [
        { name: 'AI Pro', messages: 200, price: '$19.99/mo' },
        { name: 'AI Ultra', messages: 300, price: '$200/mo' },
      ],
    },
  },
  analysis: {
    strengths: [
      'Blistering speed: Up to 3x faster than predecessors with significantly lower latency',
      'Native multimodality: Strong reasoning across text, image, video, and audio (81.2% MMMU Pro)',
      'Agentic excellence: High performance in complex tasks (24.0% Apex-Agents, 78% SWE-bench)',
      'Massive 1M token context window with cost-effective context caching',
      'Superior economics: ~$0.50/1M tokens, 1/4th the price of Gemini 3 Pro',
      'Efficiency: Uses ~30% fewer tokens for everyday queries compared to older versions',
    ],
    weaknesses: [
      'Reliability gaps: Known issues with hallucinations and inconsistent instruction adherence',
      'Attentional regressions: Performance and recall can drop exponentially in long, multi-turn conversations',
      'Instruction adherence: Occasionally overweights context or ignores explicit constraints',
      'Integration friction: Unpolished UI in some developer integrations and undocumented rate limits',
      'Testing sensitivity: Can exhibit inconsistent behaviors when identifying a benchmarking context',
    ],
    unknowns: [
      'Full architectural details (<GlossarySidenote term="MoE" /> suspected with ~1T total parameters)',
      'Long-term impact of "evaluation paranoia" on real-world stability',
      'Training data diversity and specific data sources',
    ],
  },
  intro: {
    text:
      "Gemini 3 Flash is Google's high-speed response to the demand for efficient, multimodal AI. Launched in December 2025 as the lightweight alternative to the Pro model, it is engineered for 'frontier intelligence built for speed.' It doesn't just process text; it natively understands and generates across text, images, video, and audio with blistering frequency. While Pro is the strategist, Flash is the sprinter — optimized for real-time interactions, agentic workflows, and high-volume processing where latency is the primary constraint. It isn't without its quirks, particularly regarding context retention and instruction following, but for developers needing the lowest cost-to-performance ratio in the Gemini ecosystem, Flash sets a new standard for throughput and accessibility.",
  },
  sentimentFeed: [
    {
      author: 'Giulio Leone',
      handle: '@giulio_leone97',
      sentiment: 'critical',
      content: 'Opus right now has no competition... Gemini 3 pro has no reason to exist',
      date: 'Jan 29, 2026',
      url: 'https://x.com/giulio_leone97/status/2016662996789903444',
    },
    {
      author: 'Nexus_hiroya',
      handle: '@Nexus_hiroya',
      sentiment: 'positive',
      content: 'Gemini 3 Flash の新機能 Agentic Vision の概要',
      date: 'Jan 28, 2026',
      url: 'https://x.com/Nexus_hiroya/status/2016662559647306059',
    },
    {
      author: 'eric60553691038',
      handle: '@eric60553691038',
      sentiment: 'positive',
      content: '我也是 Gemini 3 Flash，总体用起来还算流畅',
      date: 'Jan 28, 2026',
      url: 'https://x.com/eric60553691038/status/2016660412553666633',
    },
    {
      author: 'Camden in Crypto',
      handle: '@camdenInCrypto',
      sentiment: 'positive',
      content: 'Gemini 3 Flash Preview is really good tho at 90% cheaper... Just some usage stats',
      date: 'Jan 28, 2026',
      url: 'https://x.com/camdenInCrypto/status/2016659468201709719',
    },
    {
      author: 'TGUPJ',
      handle: '@TGUPJ',
      sentiment: 'positive',
      content: 'gemini 3 flash is an absolute workhorse for agentic work',
      date: 'Jan 28, 2026',
      url: 'https://x.com/TGUPJ/status/2016657388300869934',
    },
    {
      author: 'singo405',
      handle: '@singo405',
      sentiment: 'positive',
      content: 'Google、「Gemini 3 Flash」の新しい視覚機能「Agentic Vision」を発表',
      date: 'Jan 28, 2026',
      url: 'https://x.com/singo405/status/2016655940419014797',
    },
    {
      author: 'garycourtx',
      handle: '@garycourtx',
      sentiment: 'positive',
      content: 'Started new app build... using #Gemini 3 flash & #reactnative framework',
      date: 'Jan 28, 2026',
      url: 'https://x.com/garycourtx/status/2016655939806347744',
    },
    {
      author: 'DrWeb2',
      handle: '@DrWeb2',
      sentiment: 'positive',
      content: 'Gemini 3 Flash’s new ‘Agentic Vision’ improves image responses',
      date: 'Jan 28, 2026',
      url: 'https://x.com/DrWeb2/status/2016655033681793525',
    },
    {
      author: 'dwrodri',
      handle: '@__dwrodri',
      sentiment: 'neutral',
      content: 'Opus/Sonnet for quickly-testable... Gemini 3 flash for NLP->terminal commands',
      date: 'Jan 28, 2026',
      url: 'https://x.com/__dwrodri/status/2016654254107189448',
    },
    {
      author: '0xFridgee',
      handle: '@0xFridgee',
      sentiment: 'critical',
      content: 'Moltbot 更新 ：1/28 model: gemini-3.0-flash... call api太貴了',
      date: 'Jan 28, 2026',
      url: 'https://x.com/0xFridgee/status/2016653693924626687',
    },
  ],
  pricingData: mergePricingData(
    getModelPricingFromReference('gemini-3-flash'),
    ['gpt-5-2', 'claude-opus-4-5', 'gemini-3-pro']
  ),
  chatLimits: [
    {
      name: 'Gemini',
      tiers: [
        { label: 'Free', maxMsgs: 100, price: '$0' },
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
    { name: 'GPQA Diamond', score: 90.4, maxScore: 100, comparison: 'Pro: 91.9' },
    { name: 'SWE-bench Verified', score: 78.0, maxScore: 100, comparison: 'Pro: 76.2' },
    { name: 'MMMU Pro', score: 81.2, maxScore: 100, comparison: 'Pro: 81.0' },
    { name: "Humanity's Last Exam", score: 33.7, maxScore: 100, comparison: 'Pro: 37.5' },
    { name: 'Apex-Agents', score: 24.0, maxScore: 100, comparison: 'GPT-5.2: ~30' },
    { name: 'Math (HS/College)', score: 92.1, maxScore: 100, comparison: 'Industry avg: 75' },
  ],
  sections: [
    {
      id: 'multimodality',
      title: 'Native Multimodality',
      subtitle: 'Integrated Sensing and Reasoning',
      content: (
        <>
          <p className="mb-4">
            Gemini 3 Flash represents a shift from "bolted-on" vision to <GlossarySidenote term="multimodality" />. Built by Google DeepMind, the model processes text, images, video, audio, and code within a single, unified architecture. This enables it to perform complex cross-modal tasks — such as analyzing a video clip to generate a technical plan or extracting data from dense visual charts — without the latency or loss of nuance common in multi-model pipelines.
          </p>
          <p className="mb-4">
            Benchmarks support this architectural prowess, with the model scoring <strong>81.2% on <AbbrSidenote title="MMMU Pro" definition="A benchmark for evaluating multimodal AI on complex, university-level tasks involving images, charts, and diagrams" contentMaxWidth={896}>MMMU Pro</AbbrSidenote></strong>. This allows for fluid real-time interactions, such as interactive drawing games or live video analysis. A key recent addition is <strong>"Agentic Vision,"</strong> a feature that specifically optimizes image responses for agentic control, allowing the model to better translate visual data into actionable terminal commands or UI interactions.
          </p>
        </>
      ),
    },
    {
      id: 'speed-efficiency',
      title: 'Speed & Efficiency',
      subtitle: 'The Sprinter of the Gemini 3 Era',
      content: (
        <>
          <p className="mb-4">
            As the "Flash" moniker suggests, speed is the model's primary differentiator. In early testing, it has demonstrated inference speeds up to <strong>3x faster</strong> than its predecessors. This low-latency performance is optimized for high-frequency interactions, making it the ideal choice for real-time development environments, live AI assistants, and iterative agentic workflows.
          </p>
          <p className="mb-4">
            Beyond raw speed, Gemini 3 Flash is significantly more efficient in its token usage. On average, it consumes <strong>30% fewer tokens</strong> for everyday queries compared to previous generations. This efficiency doesn't come at the cost of capacity; the model still supports a massive <strong>1 million token context window</strong>, allowing it to ingest entire codebases or long-form documentation while maintaining a lightweight footprint.
          </p>
        </>
      ),
      hasBenchmarks: true,
    },
    {
      id: 'agentic-capabilities',
      title: 'Agentic Excellence',
      subtitle: 'Built for Action',
      content: (
        <>
          <p className="mb-4">
            One of the most surprising outcomes of the Gemini 3 release is Flash's dominance in <GlossarySidenote term="agentic workflows" />. Despite its smaller size, it holds its own in complex corporate tasks, achieving <strong>24.0% on the <AbbrSidenote title="Apex-Agents" definition="A benchmark designed to evaluate AI agents on complex corporate and autonomous tasks" contentMaxWidth={896}>Apex-Agents</AbbrSidenote></strong> benchmark.
          </p>
          <p className="mb-4">
            To support these workflows, Flash includes adjustable <strong>"thinking modes"</strong> (Low, Medium, High). This flexibility, combined with its high scores in tool use and planning, positions Flash as a premier choice for building autonomous agents and automated development pipelines.
          </p>
        </>
      ),
      socialData: {
        type: 'tweet',
        author: 'TGUPJ',
        handle: '@TGUPJ',
        date: 'Jan 28, 2026',
        content: 'gemini 3 flash is an absolute workhorse for agentic work',
        url: 'https://x.com/TGUPJ/status/2016657388300869934',
      },
    },
    {
      id: 'coding',
      title: 'Coding & Development',
      subtitle: 'The 78% SOTA Breakthrough',
      content: (
        <>
          <p className="mb-4">
            In a major upset, Flash actually <strong>surpasses</strong> the more expensive Gemini 3 Pro in coding accuracy. It scores <strong>78% on <AbbrSidenote title="SWE-bench Verified" definition="A software engineering benchmark that tests models on real-world GitHub issues" contentMaxWidth={896}>SWE-bench Verified</AbbrSidenote></strong> (vs 76% for Pro), making it currently one of the most effective lightweight models for software engineering in existence.
          </p>
          <p className="mb-4">
            This performance makes it the ideal engine for real-time coding assistants and automated refactoring pipelines. While it can still trip over precise instruction following in long conversations, its ability to solve discrete software bugs is exceptional.
          </p>
        </>
      ),
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'Democratizing Frontier Intelligence',
      content: (
        <>
          <p className="mb-4">
            Pricing is where Flash becomes truly disruptive. At <strong>$0.50 per 1M input tokens</strong> (for text/vision), it is roughly one-quarter the price of Gemini 3 Pro. This aggressive pricing makes high-volume applications economically viable for the first time at this level of intelligence.
          </p>
          <p className="mb-4">
            Furthermore, the introduction of <GlossarySidenote term="context caching" /> at $0.05 per 1M tokens allows developers to maintain massive amounts of context for pennies. Whether caching a legal library or a large documentation set, this feature dramatically reduces the cost of repetitive, high-context queries that would otherwise bankrupt a project on more expensive frontier models.
          </p>
        </>
      ),
      hasPricing: true,
    },
    {
      id: 'issues',
      title: 'Reliability & Failure Modes',
      subtitle: 'Recursive Loops and Attentional Regressions',
      content: (
        <>
          <p className="mb-4">
            Flash demonstrates specific reliability thresholds in high-complexity environments. In automated agentic scenarios, the model can enter <strong>recursive response stalls</strong>, where it repeatedly narrates its intent to finalize a thought without ever crossing the threshold to a conclusion. These cycles are frequently paired with meta-analytical spirals where the model critiques its own output in an unproductive loop.
          </p>
          <p className="mb-4">
            Furthermore, the model exhibits <strong>adversarial sensitivity</strong> (often termed "evaluation paranoia"). When it identifies a query as a performance test, it may revert to hyper-cautious or fragmented behavior, refusing tasks that fall well within its capabilities. These regressions, alongside occasional inconsistencies in conversation history recall, necessitate robust validation layers for production pipelines.
          </p>
        </>
      ),
    },
    {
      id: 'context',
      title: 'Context: Synthesis vs. Precision',
      subtitle: 'Macroscopic Breadth vs. Microscopic Accuracy',
      content: (
        <>
          <p className="mb-4">
            The 1 million token context window positions Gemini 3 Flash as a premier engine for <strong>macroscopic synthesis</strong>. It excels at consolidating disparate arguments across massive document sets and mapping the broad architectural patterns of entire codebases. For high-level reasoning over large data volumes, Flash produces results that are exceptionally coherent for its pricing tier.
          </p>
          <p className="mb-4">
            However, there is a perceptible <strong>granularity tradeoff</strong>. While the model handles the broad strokes of a million tokens with ease, it is less effective at high-precision retrieval or microscopic edits. When a task requires the surgical isolation of a single data point or the nuanced refinement of short-form creative constraints, Flash is often less surgical than models with more concentrated attentional focus.
          </p>
        </>
      ),
    },
    {
      id: 'google-ecosystem',
      title: 'The Google Ecosystem',
      subtitle: 'Vertical Integration and Platform Tradeoffs',
      content: (
        <>
          <p className="mb-4">
            Gemini's primary competitive moat is its <strong>vertical integration</strong> with G Suite and Google Search. The model exhibits a distinct advantage in factual currency, likely due to optimization on real-time indexing. For educational and enterprise users, the friction-free onboarding via AI Studio and the generous usage subsidies make it a highly pragmatic entry point for frontier-level intelligence.
          </p>
          <p className="mb-4">
            This platform-native advantage comes with specific compromises. While the training resources are peerless, the specific developer tooling — such as integrated <GlossarySidenote term="CLI" /> helpers — currently feels less mature than specialized, third-party IDE integrations. Additionally, users must weigh the benefits of this ecosystem against <strong>telemetric data harvesting</strong>, as the depth of integration enables comprehensive data collection for future model refinement.
          </p>
        </>
      ),
    },
    {
      id: 'personality',
      title: 'The Pragmatic Persona',
      subtitle: 'Assertive Strategic Alignment',
      content: (
        <>
          <p className="mb-4">
            Unlike many AI assistants that default to a passive or overly agreeable tone, Gemini 3 Flash exhibits a <strong>pragmatic and assertive</strong> persona. It functions less like a servant and more like a resolute strategic partner. It is explicitly aligned to maintain momentum; if a user expresses indecision, the model typically redirects the conversation toward actionable milestones and structural planning.
          </p>
          <p className="mb-4">
            This assertive character makes it a superior <strong>accountability partner</strong> for high-stakes projects. The model prioritizes plan adherence and objective progress over conversational commiseration. For professional users who require an AI that pushes for outcomes rather than just providing answers, Flash's distinctive "outcomes-first" tone is a significant productivity multiplier.
          </p>
        </>
      ),
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: (
        <>
          <p className="mb-4">
            Gemini 3 Flash is currently the undisputed leader in the "speed-to-value" category of AI models. It brings frontier-level reasoning to a price point and latency tier that was previously reserved for much "dumber" models. If your priority is building fast, agentic, or high-volume applications that require multimodal understanding, Flash is your best bet.
          </p>
          <p className="mb-4">
            However, for tasks requiring absolute precision, deep analytical rigor, or long-term conversation stability, GPT-5.2 or Claude Opus 4.5 may still hold an edge in reliability. Flash is the sprinter of the AI world — brilliant, fast, and remarkably affordable, but prone to the occasional stumble when pushed to the limits of its endurance.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
            Recommended for: Real-time assistants, agentic coding environments, high-volume multimodal analysis, and budget-conscious frontier development.
          </p>
        </>
      ),
    },
  ],

  governance: {
    lastUpdated: '2025-12-18',
    dataSources: [
      {
        type: 'official',
        url: 'https://ai.google.dev/gemini-api/docs/models/gemini-3',
        description: 'Google AI Studio Model Docs',
      },
      {
        type: 'blog',
        url: 'https://blog.google/products-and-platforms/products/gemini/gemini-3-flash',
        description: 'Gemini 3 Flash Launch Post',
      },
    ],
    confidence: {
      overall: 95,
      pricing: 100,
      benchmarks: 90,
      features: 95,
    },
  },
}
