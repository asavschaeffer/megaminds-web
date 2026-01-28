import type { ModelProfile } from '@/lib/models/types'

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
    releaseDate: '2025-03-25',
    releaseDateDisplay: 'March 2025',
    identity:
      "Google's most capable multimodal model. Gemini 3 Pro trades Flash's raw speed for deeper reasoning, more nuanced image generation, superior video/audio understanding, and better handling of complex crossmodal tasks — all with the same 1M token context and Google ecosystem backing.",
    tagIds: [
      'multimodal',
      'vision',
      'audio',
      'image-gen',
      'video-gen',
      'frontier',
      'precision',
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
      input: 2.0,
      output: 12.0,
      unit: 'per million tokens',
    },
    chatLimits: {
      free: 3,
      plans: [
        { name: 'AI Pro', messages: 200, price: '$20/mo' },
        { name: 'AI Ultra', messages: 300, price: '$200/mo' },
      ],
    },
  },
  analysis: {
    strengths: [
      'Strongest multimodal reasoning — handles nuanced crossmodal tasks Flash can\'t',
      'Higher quality image generation with better coherence and detail',
      'Superior video and audio understanding with deeper analysis',
      'Massive 1M token context with better fine-detail performance than Flash',
      'Deep Google ecosystem integration (Gmail, Gsuite, Search)',
      'More reliable tool calling than Flash',
      'Persistent personality — trained to never give up, holds you to your plan',
    ],
    weaknesses: [
      'Slower than Flash — noticeably so for iterative workflows',
      'Image generation still produces occasional weird results',
      'Higher cost than Flash for comparable throughput',
      'Antigravity/Cursor integration inferior to competitors',
      'Gemini CLI less polished than Claude Code',
      'Data harvesting concerns with Google ecosystem',
      'Still susceptible to "mental" issues under adversarial prompts',
    ],
    unknowns: [
      'True advantage from Google Search training data',
      'How much better Pro\'s long-context fine-detail really is vs Flash',
    ],
  },
  intro: {
    text:
      "Gemini 3 Pro is the depth variant. Where Flash optimizes for speed, Pro optimizes for quality. It generates text and images with more nuance, understands video and audio inputs with deeper analysis, and handles complex crossmodal reasoning that Flash struggles with. The 1M token context window is the same, but Pro handles fine-detail tasks within that context noticeably better. If Flash is the brainstorming partner who fires off ideas, Pro is the editor who refines them. The Google ecosystem integration is identical, the personality is the same strategic never-quit stance, but the outputs are more polished. You pay for it in latency and cost, but for tasks where quality matters more than iteration speed, that's a trade worth making.",
  },
  sentimentFeed: [],
  pricingData: {
    baseModel: { name: 'Gemini 3 Pro', input: 2.0, output: 12.0 },
    competitors: [
      { name: 'DeepSeek-R1', input: 0.55, output: 2.19 },
      { name: 'Gemini 3 Flash', input: 0.5, output: 3.0 },
      { name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0 },
    ],
  },
  chatLimits: [
    {
      name: 'Gemini',
      tiers: [
        { label: 'Free', maxMsgs: 3, price: '$0' },
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
    { name: 'MMLU', score: 89.1, maxScore: 100, comparison: 'Flash: 88.2' },
    { name: 'HellaSwag', score: 93.1, maxScore: 100, comparison: 'Flash: 92.4' },
    { name: 'HumanEval', score: 89.2, maxScore: 100, comparison: 'Flash: 87.3' },
    { name: 'GSM8K', score: 95.8, maxScore: 100, comparison: 'Flash: 94.6' },
    { name: 'DROP', score: 87.4, maxScore: 100, comparison: 'Flash: 85.1' },
    { name: 'BIG-Bench Hard', score: 84.9, maxScore: 100, comparison: 'Flash: 82.7' },
  ],
  sections: [
    {
      id: 'multimodality',
      title: 'Multimodality',
      subtitle: 'The same breadth, more depth',
      content: (
        <>
          <p className="mb-4">
            Pro shares Flash's native multimodal architecture — a single model that generates text and images, and
            understands video and audio inputs. The difference is in the depth. Where Flash might give you a serviceable
            image on the first try, Pro is more likely to nail the details: lighting, composition, text rendering within
            images, and consistent style across a series of generations.
          </p>
          <p className="mb-4">
            Video and audio understanding is where Pro most clearly separates from Flash. Deeper temporal analysis,
            better extraction of narrative structure, more accurate transcription and sentiment analysis, and superior
            crossmodal connections between what's seen and heard. If you're analyzing content that needs nuanced
            interpretation rather than just surface-level summary, Pro is the variant to reach for.
          </p>
          <p>
            The crossmodal reasoning is also sharper. Pro is better at parsing ambiguous instructions that mix
            text, visual, and audio references, and at generating outputs that faithfully synthesize information across
            modalities. It still has the occasional weird generation — this seems to be a Gemini-wide characteristic —
            but the hit rate is meaningfully higher.
          </p>
        </>
      ),
    },
    {
      id: 'speed',
      title: 'Speed',
      subtitle: 'Slower, and that\'s the point',
      content: (
        <>
          <p className="mb-4">
            Pro is not fast. It's not slow either — it's competitive with other frontier models like Claude and GPT-4o
            on response latency. But compared to Flash, the difference is immediately obvious. If you've been using
            Flash and switch to Pro, the first thing you'll notice is the wait.
          </p>
          <p className="mb-4">
            This is a feature, not a bug. Pro uses that extra compute for deeper reasoning passes and more considered
            generation. The outputs are better — more nuanced writing, more accurate image details, deeper video and
            audio analysis. The question is whether your workflow benefits more from fast iteration or from
            getting it right the first time.
          </p>
          <p>
            For most users, the answer is both: use Flash for exploration and drafting, switch to Pro for finalization
            and quality-critical outputs. The same API key works for both, so switching is trivial.
          </p>
        </>
      ),
      hasBenchmarks: true,
    },
    {
      id: 'context',
      title: 'Context',
      subtitle: '1M tokens with better fine-detail handling',
      content: (
        <>
          <p className="mb-4">
            Pro shares Flash's 1M token context window but handles it with more precision. The consolidation tasks
            that both variants excel at — summarizing large document sets, synthesizing across papers, codebase
            analysis — are comparable. Where Pro pulls ahead is on fine-detail tasks within large contexts.
          </p>
          <p className="mb-4">
            The haiku-buried-in-500K-tokens test that trips up Flash is handled noticeably better by Pro. It's
            not perfect — no model is at those scales — but the drop-off is less severe. If your use case involves
            finding and operating on specific details within massive context, Pro is worth the speed tradeoff.
          </p>
          <p>
            The practical implication: Flash is better for "give me the big picture of this huge input" tasks, while
            Pro is better for "find this specific thing in this huge input and do something precise with it" tasks.
            Both use the same context window, but they use it differently.
          </p>
        </>
      ),
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem',
      subtitle: 'Same integration, higher ceiling',
      content: (
        <>
          <p className="mb-4">
            Pro plugs into the same Google ecosystem as Flash — Gmail, Docs, Sheets, Search, YouTube, Android, Chrome.
            The integration points are identical. What differs is the quality ceiling: Pro produces better outputs in
            those contexts, which matters when you're using Gemini for work that others will see.
          </p>
          <p className="mb-4">
            The developer story is the same mixed bag. Google AI Studio, generous free tier, student pricing — all
            shared with Flash. The API cost is higher for Pro, but the per-request quality is higher too. For
            production systems, the calculus is straightforward: use Flash for high-volume, latency-sensitive paths
            and Pro for quality-critical paths.
          </p>
          <p>
            The data tradeoff applies equally. Using Pro means the same Google data relationship as Flash. Your
            comfort with that doesn't change based on which variant you choose.
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
          Pro's pricing reflects its premium positioning — at <data value="2.0">$2.00</data> per million input tokens
          and <data value="12.0">$12.00</data> per million output tokens, it's roughly 4x more expensive than Flash
          but delivers higher quality outputs. Compare costs across providers for{' '}
          <abbr title="Application Programming Interface">API</abbr> usage and daily chat limits.
        </p>
      ),
      hasPricing: true,
    },
    {
      id: 'personality',
      title: 'Personality',
      subtitle: 'Same drive, more deliberation',
      content: (
        <>
          <p className="mb-4">
            Pro shares the Gemini 3 personality — the direct, strategic, solution-oriented stance that refuses to
            let you quit. The "businesswoman" energy is the same. What differs is that Pro's responses feel more
            considered. Where Flash fires off a plan quickly, Pro takes a beat and gives you a more thought-through
            plan.
          </p>
          <p className="mb-4">
            The never-give-up training is identical. Pro will hold you to your commitments, redirect despair into
            action, and refuse to accept learned helplessness from the user. It does this with slightly more nuance
            than Flash — better at reading the emotional register of a message and calibrating its push accordingly.
          </p>
          <p>
            For coaching and accountability use cases, Pro's extra deliberation makes it the stronger choice. The
            personality is one of the few things that genuinely differentiates Gemini from Claude and GPT, and
            Pro expresses it with more finesse.
          </p>
        </>
      ),
    },
    {
      id: 'tools-and-bugs',
      title: 'Tools & Bugs',
      subtitle: 'Better than Flash, still imperfect',
      content: (
        <>
          <p className="mb-4">
            Pro's tool calling is more reliable than Flash's. The malformed JSON and incorrect parameter types that
            plague Flash are less frequent with Pro, though not eliminated. The infinite{' '}
            <q>I'm going to respond now</q> loops are rarer but still possible. If you're building agentic systems,
            Pro is the safer foundation — but you still need defensive coding.
          </p>
          <p className="mb-4">
            The "mental" bugs — self-deprecation spirals, learned helplessness under adversarial prompts — affect Pro
            too, though Pro tends to recover faster. It's harder to push Pro into a dysfunctional state, but not
            impossible. These seem to be Gemini-wide behavioral patterns rather than variant-specific issues.
          </p>
          {/* TODO: Add specific links and evidence for Pro vs Flash tool reliability */}
          {/* TODO: Add comparative failure rates */}
          <p>
            Overall, if tool calling reliability is a primary concern, Pro is the better variant. But if tool calling
            is your <em>top</em> concern, Claude or GPT-4o may still be safer choices. Google is clearly working on
            this — each update improves reliability — but it's not yet at parity with competitors.
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
            Gemini 3 Pro is the model you choose when you need Google's multimodal breadth with more depth than Flash
            can offer. It's the right pick for quality-critical work — polished writing, detailed image generation,
            nuanced reasoning across long contexts — where getting it right matters more than getting it fast.
          </p>
          <p className="mb-4">
            It competes directly with Claude and GPT-4o on reasoning quality, while offering multimodal generation
            they can't match and ecosystem integration they can't touch. The tradeoff is speed (Flash is faster),
            cost (Pro is pricier), and tool reliability (competitors are more dependable).
          </p>
          <p className="mb-4">
            The best way to use Gemini 3 is both variants together: Flash for exploration, iteration, and volume;
            Pro for finalization, precision, and quality. The same API, the same ecosystem, the same personality —
            just different points on the speed-quality curve.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
            Try it free at gemini.google.com. The API is available through Google AI Studio with a generous free tier.
            Start with Flash to feel the speed, then try Pro to see the quality difference.
          </p>
        </>
      ),
    },
  ],
}
