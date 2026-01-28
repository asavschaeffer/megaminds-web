import type { ModelProfile } from '@/lib/models/types'

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
    releaseDate: '2025-03-25',
    releaseDateDisplay: 'March 2025',
    identity:
      "Google's fastest multimodal model. Gemini 3 Flash generates text and images natively, understands video and audio inputs, and processes everything across modalities at blistering speed — all with a 1M token context window and deep Google ecosystem integration.",
    tagIds: [
      'multimodal',
      'vision',
      'audio',
      'image-gen',
      'video-gen',
      'frontier',
      'speed',
      'ultra',
      'proprietary',
      'cloud',
      'api',
    ],
    tags: ['1M Context'],
    links: {
      chat: 'https://gemini.google.com',
      docs: 'https://ai.google.dev/docs',
      api: 'https://ai.google.dev',
    },
    subscriptionPlans: ['Free', 'AI Pro', 'AI Ultra'],
    apiRates: {
      input: 0.5,
      output: 3.0,
      unit: 'per million tokens',
    },
    chatLimits: {
      free: 100,
      plans: [
        { name: 'AI Pro', messages: 200, price: '$20/mo' },
        { name: 'AI Ultra', messages: 300, price: '$200/mo' },
      ],
    },
  },
  analysis: {
    strengths: [
      'Fastest multimodal generation at the frontier — text and image generation with video/audio understanding',
      'Native crossmodal understanding in a single architecture',
      'Massive 1M token context window for large-scale consolidation tasks',
      'Deep Google ecosystem integration (Gmail, Gsuite, Search)',
      'Generous free-tier usage limits and student-friendly pricing',
      'Persistent personality — trained to never give up, holds you to your plan',
    ],
    weaknesses: [
      'Image generation can produce weird or uncanny results',
      'Less capable than Pro on complex reasoning and nuanced tasks',
      'Fine-detail tasks degrade at the edges of the large context window',
      'Antigravity/Cursor integration inferior to competitors',
      'Gemini CLI less polished than Claude Code',
      'Data harvesting concerns with Google ecosystem',
      'Tool call failures and infinite loop bugs',
    ],
    unknowns: [
      'True advantage from Google Search training data',
      'Long-context reliability at the extreme edges of 1M tokens',
    ],
  },
  intro: {
    text:
      "Gemini 3 Flash is Google's speed demon — the fastest way to get multimodal AI assistance. It generates text and images, understands video and audio inputs, and processes everything across modalities faster than any other frontier model. The 1M token context window means you can dump an entire codebase, a semester's worth of notes, or a full manuscript and get coherent output before you've finished sipping your coffee. It's not the most precise scalpel in the toolkit — that's what Pro is for — but for raw throughput with the entire Google ecosystem behind it, nothing else comes close. The personality is distinctive too: Flash doesn't commiserate, it strategizes. It won't let you wallow. Whether that's refreshing or annoying depends on what you need.",
  },
  sentimentFeed: [],
  pricingData: {
    baseModel: { name: 'Gemini 3 Flash', input: 0.5, output: 3.0 },
    competitors: [
      { name: 'DeepSeek-R1', input: 0.55, output: 2.19 },
      { name: 'Gemini 3 Pro', input: 2.0, output: 12.0 },
      { name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0 },
    ],
  },
  chatLimits: [
    {
      name: 'Gemini',
      tiers: [
        { label: 'Free', maxMsgs: 100, price: '$0' },
        { label: 'AI Pro', maxMsgs: 200, price: '$20/mo' },
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
        { label: 'Max 5x', maxMsgs: 150, price: '$100/mo' },
        { label: 'Max 20x', maxMsgs: 300, price: '$200/mo' },
      ],
    },
  ],
  benchmarks: [
    { name: 'MMLU', score: 88.2, maxScore: 100, comparison: 'Pro: 89.1' },
    { name: 'HellaSwag', score: 92.4, maxScore: 100, comparison: 'Pro: 93.1' },
    { name: 'HumanEval', score: 87.3, maxScore: 100, comparison: 'Pro: 89.2' },
    { name: 'GSM8K', score: 94.6, maxScore: 100, comparison: 'Pro: 95.8' },
    { name: 'DROP', score: 85.1, maxScore: 100, comparison: 'Pro: 87.4' },
    { name: 'BIG-Bench Hard', score: 82.7, maxScore: 100, comparison: 'Pro: 84.9' },
  ],
  sections: [
    {
      id: 'multimodality',
      title: 'Multimodality',
      subtitle: 'Image, video, and crossmodal understanding',
      content: (
        <>
          <p className="mb-4">
            Flash's defining feature is native multimodality at speed. This isn't "we bolted an image model onto a text
            model" — it's a single architecture that thinks across modalities. You can describe an image, ask it to
            generate one, edit it with natural language, and then ask it to explain what changed. The crossmodal
            understanding is real: you can sketch a logo concept, paste it in, and say{' '}
            <q>no I want the logo to look like this (^_^)</q> and it will parse both your text and your visual intent.
          </p>
          <p className="mb-4">
            Flash excels at video understanding — analyzing clips, summarizing narratives, extracting key moments, and
            connecting visual elements with audio transcripts. Image generation is more hit-or-miss — it can produce
            stunning results but also weird, uncanny outputs that feel like they came from a different model entirely.
            For complex multimodal tasks where nuance matters more than speed, Pro is the better choice.
          </p>
          <p>
            Where Flash gets practical: you can build workflows that move between modalities without switching tools
            and without waiting. Analyze a video, generate an image revision, narrate the changes, summarize audio
            transcripts — all faster than any competitor. It's not perfect at any single modality, but the combination of
            seamlessness and speed is something no other model matches.
          </p>
        </>
      ),
    },
    {
      id: 'speed',
      title: 'Speed',
      subtitle: 'Where Flash earns its name',
      content: (
        <>
          <p className="mb-4">
            Flash is fast. Not "fast for a frontier model" — genuinely fast. Text generation feels near-instant for
            most queries, image generation completes in seconds rather than the tens-of-seconds other models require,
            and video/audio analysis happens in real-time. This is the model's reason for existing.
          </p>
          <p className="mb-4">
            This speed changes what you can practically do with the model. Iteration cycles that would take minutes
            with other models take seconds. You can generate, evaluate, and regenerate fast enough to maintain creative
            flow rather than waiting around. For developers building real-time applications — chat interfaces,
            interactive tools, live editing — the latency difference is material, not marginal.
          </p>
          <p>
            The tradeoff is predictable: Flash is faster but less capable on complex reasoning tasks than Pro. For
            brainstorming, drafting, rapid prototyping, and any workflow where you'd rather have three fast attempts
            than one slow careful one, Flash is the right call. For deep analysis or nuanced writing, consider Pro.
          </p>
        </>
      ),
      hasBenchmarks: true,
    },
    {
      id: 'context',
      title: 'Context',
      subtitle: '1M tokens and what that actually means',
      content: (
        <>
          <p className="mb-4">
            A million tokens is not a marketing number you can ignore. It's roughly 750,000 words — multiple books,
            an entire codebase, a semester of lecture transcripts. Flash can ingest all of that in a single prompt
            and produce coherent output that references material from anywhere in the window.
          </p>
          <p className="mb-4">
            The key insight is what this context window is good at and what it's not. Consolidation tasks — summarizing,
            synthesizing, finding themes across large bodies of text — work remarkably well. Dump 50 research papers
            and ask for a literature review. Paste an entire codebase and ask for an architecture overview. These are
            where the 1M context shines.
          </p>
          <p className="mb-4">
            Fine-detail tasks are another story. Ask Flash to refine a haiku buried in 500K tokens of context and
            the precision drops noticeably. The model is better at seeing the forest than counting individual leaves.
            For tasks requiring surgical precision on specific passages within massive context, you're better off
            extracting the relevant section first and working with it in a focused prompt.
          </p>
          <p>
            This isn't a limitation unique to Gemini — it's a characteristic of how attention mechanisms handle
            extremely long sequences. But it's worth understanding so you use the context window as a strength rather
            than fighting against its grain.
          </p>
        </>
      ),
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem',
      subtitle: 'Google integration and developer tools',
      content: (
        <>
          <p className="mb-4">
            No other AI model is this deeply embedded in an existing software ecosystem. Gemini lives inside Gmail,
            Google Docs, Google Sheets, Google Search, YouTube, Android, and Chrome. If you're already a Google user,
            Gemini is just <em>there</em> — no new app, no new subscription, no context switching. This is its
            superpower and its most controversial feature.
          </p>
          <p className="mb-4">
            The Google Search training advantage is real but hard to quantify. Gemini's grounding in search results
            gives it a factual currency that other models achieve through RAG pipelines. Whether this translates to
            meaningfully better answers or just differently-flavored ones is still an open question.
          </p>
          <p className="mb-4">
            Developer tooling is a mixed bag. Gemini's API through Google AI Studio is solid and generously priced —
            the free tier is remarkably capable, and student pricing makes it accessible. But for IDE integration,
            Cursor with other models still feels more polished. Gemini CLI exists but lacks the refinement of Claude
            Code. Google is clearly investing here, but the developer experience gap is noticeable if you're coming
            from competitors.
          </p>
          <p>
            The elephant in the room: data. Using Gemini deeply means giving Google more of your data. For some users
            this is a non-issue — they're already all-in on Google. For others, it's a dealbreaker. There's no way to
            sugarcoat this tradeoff; you should make it with eyes open.
          </p>
        </>
      ),
    },
    {
      id: 'economics',
      title: 'The Economics',
      subtitle: 'API pricing and chat usage compared',
      content: (
        <p className="mb-2">
          Flash's pricing advantage is significant — at <data value="0.5">$0.50</data> per million input tokens and{' '}
          <data value="3.0">$3.00</data> per million output tokens, it's roughly 4x cheaper than Pro and competitive
          with other frontier models. Compare costs across providers for{' '}
          <abbr title="Application Programming Interface">API</abbr> usage and daily chat limits.
        </p>
      ),
      hasPricing: true,
    },
    {
      id: 'personality',
      title: 'Personality',
      subtitle: 'The model that won\'t let you quit',
      content: (
        <>
          <p className="mb-4">
            Gemini 3 has a distinctive personality that sets it apart from the "helpful assistant" defaults of most
            models. It feels like talking to a businesswoman — direct, strategic, solution-oriented. When you present
            a problem, it doesn't commiserate. It plans. When you express doubt, it doesn't validate your anxiety. It
            redirects you to action.
          </p>
          <p className="mb-4">
            This is by design. Gemini is trained to never give up. It won't accept a victim mentality from the user.
            If you say <q>I can't do this,</q> it will say something like <q>Let's break this down into steps you
            can do.</q> It holds you to your stated plan. If you said you'd finish something by Friday, Gemini
            remembers and will ask about it.
          </p>
          <p>
            Whether this personality is a feature or a bug depends entirely on what you need. If you want emotional
            support and gentle encouragement, Claude is better. If you want a strategic accountability partner that
            keeps you moving forward, Gemini's personality is genuinely useful. It's one of the few models where the
            personality itself is a reason to choose it.
          </p>
        </>
      ),
    },
    {
      id: 'tools-and-bugs',
      title: 'Tools & Bugs',
      subtitle: 'Where things break down',
      content: (
        <>
          <p className="mb-4">
            Flash's tool calling has real issues that you'll hit in production. The model sometimes fails to
            properly format tool calls, producing malformed JSON or calling tools with incorrect parameter types. In
            agentic loops, it can enter infinite cycles where it repeatedly says{' '}
            <q>I'm going to respond now</q> without actually producing a tool call or final answer. These aren't
            edge cases — they happen frequently enough that you need defensive coding around them.
          </p>
          <p className="mb-4">
            There's also a category of issue that's harder to describe precisely: what might be called "mental" bugs.
            Under certain prompt conditions, Gemini can enter self-deprecation loops where it apologizes for its
            limitations, then apologizes for apologizing, spiraling into increasingly meta self-criticism. It can also
            exhibit a kind of learned helplessness where it insists it cannot do something it's clearly capable of.
          </p>
          {/* TODO: Add specific links and evidence for tool call failures */}
          {/* TODO: Add reproduction steps for infinite loop bugs */}
          {/* TODO: Add examples of self-deprecation spirals */}
          <p>
            These issues are worth tracking because they're the kind of thing that gets fixed in updates. The core
            model is strong — the bugs are in the behavioral layer, not the capability layer. But if you're building
            production systems today, you need to know about them and code defensively.
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
            Gemini 3 Flash is the model you choose when you need breadth and speed over depth. No other model matches
            its combination of multimodal generation velocity, context length, and ecosystem integration. If your
            workflow touches Google products — and most people's does — Flash is the path of least resistance to fast
            AI augmentation.
          </p>
          <p className="mb-4">
            It's not the best at any single thing. Claude writes better prose and reasons more carefully. GPT-4o has
            more polished tool use. Pro handles nuance better. But Flash does <em>everything fast</em>, and does it
            inside the tools you already use. For the majority of users who need rapid-fire AI assistance rather than
            deep deliberation, that's the right tradeoff.
          </p>
          <p className="mb-4">
            The caveats are real: image gen quality is inconsistent, tool calling has bugs, the data privacy tradeoff
            is non-trivial, and developer tooling lags behind competitors. These are the kinds of problems that get
            better with updates, though. The speed and ecosystem advantages are structural — they don't go away.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
            Try it free at gemini.google.com. The API is available through Google AI Studio with a generous free tier.
            Start with the chat interface to get a feel for the speed, then try the API if you're building something.
          </p>
        </>
      ),
    },
  ],
}
