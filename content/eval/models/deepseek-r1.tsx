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
    tags: ['670B Parameters', '128K Context'],
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
      'Exceptional value — 95% cheaper than o1, trained for $5-6M',
      'Transparent reasoning traces with visible "aha moments"',
      'Strong math and code performance (solves Putnam-level problems)',
      'Open weights under MIT license with 6 distilled models',
      'Can run locally via WebGPU or quantized versions',
      'Pure RL approach proves reasoning can emerge without SFT',
    ],
    weaknesses: [
      'Slower inference due to verbose reasoning (1000+ tokens common)',
      'Overthinks simple questions',
      'Tokenization issues with character-level tasks',
      'Less polished UX than competitors',
      'Limited multimodal capabilities',
      'Occasional "intrinsic knowledge override" where reasoning conflicts with memorized facts',
    ],
    unknowns: ['True dataset composition', 'Real-world safety behavior at scale'],
  },
  intro: {
    text:
      "DeepSeek-R1 landed on January 20, 2025 like a pricing nuke. While OpenAI's o1 dominated reasoning tasks at $15/million tokens, DeepSeek offered comparable performance for $0.55. That's not a typo. What makes this more remarkable: DeepSeek is a hedge fund skunkworks project that trained R1 for roughly $5-6 million — a fraction of what competitors spend. The model uses pure reinforcement learning (no supervised fine-tuning) to generate visible chain-of-thought reasoning, meaning you can actually watch it think. For developers building agents, math tutors, or code assistants, R1 became the obvious choice overnight. It's not perfect — the reasoning can get chatty, and it lacks vision — but it fundamentally reset expectations for what \"expensive\" means in AI.",
  },
  pricingData: {
    baseModel: { name: 'DeepSeek-R1', input: 0.55, output: 2.19, provider: 'DeepSeek API' },
    competitors: [
      { name: 'OpenAI o1', input: 15.0, output: 60.0, provider: 'OpenAI' },
      { name: 'GPT-4o', input: 2.5, output: 10.0, provider: 'OpenAI' },
      { name: 'Claude 3.5 Sonnet', input: 3.0, output: 15.0, provider: 'Anthropic' },
    ],
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
      content: (
        <>
          <p className="mb-4">
            Most{' '}
            <abbr title="Large Language Models" className="cursor-help underline decoration-dotted underline-offset-2">
              LLMs
            </abbr>{' '}
            give you an answer. DeepSeek-R1 shows you the work. If you've ever used ChatGPT and gotten a confident but
            wrong answer, you'll appreciate this: R1 exposes its reasoning process in real time. You can see it
            second-guessing itself, working through edge cases, correcting mistakes, and even having "aha moments" where
            it pauses to re-evaluate its approach.
          </p>
          <p className="mb-4">
            This matters for three reasons: <strong>trust</strong> (you can verify the logic), <strong>learning</strong>{' '}
            (watching the model think teaches you problem-solving), and <strong>debugging</strong> (when it's wrong, you
            know why). The transparency is especially valuable for developers building production systems — you can see
            exactly why the model made a decision.
          </p>
          <p>
            But the real story is the economics. At <data value="0.55">$0.55</data> per million tokens, R1 makes advanced
            reasoning accessible at a scale that was previously impossible. A hedge fund skunkworks project trained this
            for $5-6 million — proving that you don't need billions to compete at the frontier. This democratization of
            reasoning capability is what makes R1 genuinely transformative.
          </p>
        </>
      ),
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
      content: (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-3">Visible Reasoning</h3>
          <p className="mb-4">
            Unlike GPT-4 or Claude, which hide their thinking, DeepSeek-R1 shows you a{' '}
            <code className="bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded text-sm">&lt;think&gt;</code> block
            before every answer. This isn't just for show — the model genuinely uses this space to work through
            problems, test hypotheses, and refine its approach. It's like having a study partner who talks through the
            problem out loud.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Cost Efficiency</h3>
          <p className="mb-4">
            At <data value="0.55">$0.55</data> per million input tokens and <data value="2.19">$2.19</data> per million
            output tokens, R1 is roughly 20-30x cheaper than GPT-4o and 95% cheaper than o1. This isn't a budget model —
            it's frontier performance at commodity pricing. For context, running 1,000 complex reasoning queries costs
            about <data value="5">$5</data>.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Open Weights & Distilled Models</h3>
          <p className="mb-4">
            The full <data value="671000000000">671B</data> parameter model is available on HuggingFace under an MIT
            license. Yes, you can run it locally if you have the hardware (good luck). More realistically, DeepSeek
            released six distilled versions ranging from 1.5B to 70B parameters, trained on R1's reasoning outputs. The
            32B distilled model reportedly outperforms OpenAI o1-mini on some benchmarks, while the 8B version can run
            on consumer hardware. These distilled models preserve much of R1's reasoning capability at a fraction of the
            compute cost, making advanced reasoning accessible to anyone with a decent GPU or even a modern MacBook.
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
          R1's most disruptive feature isn't technical — it's the price tag. Compare costs across providers for{' '}
          <abbr title="Application Programming Interface">API</abbr> usage and daily chat limits.
        </p>
      ),
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
      content: (
        <>
          <p className="mb-4">
            DeepSeek trained R1 using <strong>pure reinforcement learning without supervised fine-tuning</strong> — a
            first for reasoning models at this scale. This is significant because it demonstrates that reasoning can
            emerge purely through reward signals, not just by mimicking human-written examples. They used{' '}
            <abbr title="Group Relative Policy Optimization">GRPO</abbr> (Group Relative Policy Optimization) with
            verifiable rewards:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>Verifiable rewards</strong>: For math problems, they checked answers against ground truth. For
              code, they compiled and ran test cases. No neural reward model needed — just deterministic verification.
            </li>
            <li>
              <strong>Cold-start data</strong>: They incorporated synthetic reasoning data from R1-Zero (their
              preliminary version) to bootstrap the process and avoid endless repetition issues.
            </li>
            <li>
              <strong>Rejection sampling</strong>: Generated multiple reasoning paths and kept the best ones, mixing 75%
              reasoning problems with 25% general queries in later stages.
            </li>
          </ul>
          <p className="mb-6">
            The base model is a{' '}
            <dfn>
              <abbr title="Mixture of Experts" className="cursor-help underline decoration-dotted underline-offset-2 hover:decoration-solid transition-all">
                MoE
              </abbr>
            </dfn>{' '}
            (Mixture of Experts) architecture with <data value="671000000000">671B</data> total parameters, but only
            ~<data value="37000000000">37B</data> active per token. This sparse activation is how they keep inference costs
            down — you're not running the full model for every word. During training, the model naturally learned to
            reason in multiple languages (they had to constrain it to English), suggesting that reasoning patterns are
            somewhat language-agnostic.
          </p>
        </>
      ),
      expandable: {
        title: 'MoE Architecture Details',
        preview: 'Deep dive into the mixture-of-experts routing and expert specialization patterns',
        content: (
          <>
            <p className="mb-4">
              The model uses a 2-expert-per-token routing strategy with learned gating functions. Each expert is a
              standard feedforward block, but the router learns to send tokens to specialized experts based on task type.
              Early analysis suggests some experts specialize in math, others in code, and others in general reasoning.
            </p>
            <p className="mb-4">
              Interestingly, the routing behavior changes during the reasoning phase. When generating the{' '}
              <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded">&lt;think&gt;</code> block, the model
              activates different experts than when generating the final answer. This suggests the training process
              learned to separate "internal cognition" from "user-facing output" at the architectural level.
            </p>
            <p>
              One fascinating emergent behavior is the "aha moment" — the model learned to pause and re-evaluate its
              reasoning mid-thought. This wasn't explicitly trained but emerged during RL training, appearing around the
              middle of the training process. You can see this in action when R1 says things like "Wait, let me
              reconsider..." or "Actually, that doesn't seem right..." — it's genuinely backtracking and exploring
              alternative paths.
            </p>
          </>
        ),
      },
    },
    {
      id: 'issues',
      title: 'Known Issues & Quirks',
      content: (
        <>
          <h3 className="text-xl font-semibold mt-6 mb-3">Verbose Reasoning</h3>
          <p className="mb-4">
            Sometimes R1 overthinks simple questions. Ask it <q>What is 2+2?</q> and you might get a 200-word reasoning
            trace about the properties of addition. This is funny once and annoying by the tenth time. The reasoning
            traces can consume 1000+ tokens even for straightforward queries, which slows down inference. You can
            mitigate this by adjusting the system prompt to encourage brevity, but the model was trained to reason
            extensively, so it's baked into its behavior.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Tokenization Limitations</h3>
          <p className="mb-4">
            Like most LLMs, R1 struggles with character-level tasks due to subword tokenization. The infamous
            "strawberry test" (counting r's in "strawberry") reveals this: the model can correctly spell the word
            letter-by-letter in its reasoning but then doubts itself because it knows "strawberry" typically has "two
            r's" from training data. This isn't unique to R1, but the visible reasoning makes the struggle more
            apparent. For character manipulation tasks, you're better off asking it to write code that does the
            counting.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Limited Multimodal Support</h3>
          <p className="mb-4">
            R1 is text-only. If you need vision, audio, or image generation, you'll need to use a different model.
            DeepSeek has hinted at a multimodal version, but no timeline yet.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">Occasional Hallucination in Reasoning</h3>
          <p className="mb-4">
            Because you can see the thinking, you can also see when it goes off the rails. Sometimes the model will
            confidently reason its way to the wrong answer, complete with convincing-sounding logic. The transparency
            helps you catch this, but it's still a risk. Interestingly, the model sometimes shows an "intrinsic
            knowledge override" — it will correctly reason through a problem but then second-guess itself based on
            memorized facts from training data, even when its reasoning is sound.
          </p>
        </>
      ),
    },
    {
      id: 'in-the-wild',
      title: 'In the Wild',
      subtitle: 'Real-world usage and community reactions',
      content: (
        <>
          <p className="mb-4">
            Within weeks of launch, developers started using R1 for use cases that were previously too expensive. The
            Hacker News discussion hit 1,843 points with 663 comments as developers shared quantized versions, setup
            guides, and local deployment strategies:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>
              <strong>AI tutors</strong> that show students step-by-step reasoning — the visible thinking process is
              perfect for educational applications
            </li>
            <li>
              <strong>Code review agents</strong> that explain why they flagged an issue — developers can see the
              model's logic and trust its suggestions
            </li>
            <li>
              <strong>Math problem solvers</strong> for competitive programming — R1 solves Putnam-level problems that
              stump other models
            </li>
            <li>
              <strong>Research assistants</strong> that synthesize papers and show their logic — researchers can verify
              the reasoning chain
            </li>
            <li>
              <strong>Local deployment</strong> — quantized versions (as small as 1.5B) run in browsers via WebGPU or on
              consumer hardware, making advanced reasoning accessible without cloud costs
            </li>
          </ul>
          <p className="mb-4">
            Real-world cost savings are dramatic: developers report cutting API costs by 80-95% compared to o1, with some
            building entire products for under $20/month that would have cost hundreds before.
          </p>
        </>
      ),
    },
    {
      id: 'advanced',
      title: 'For ML Engineers',
      subtitle: 'Implementation details and gotchas',
      variant: 'advanced',
      content: null,
      expandables: [
        {
          title: 'Fine-tuning R1',
          preview: 'How to adapt the model for domain-specific reasoning tasks',
          content: (
            <>
              <p className="mb-4">
                Because the weights are open, you can fine-tune R1 on your own data. The most effective approach is to
                continue the <abbr title="Reinforcement Learning">RL</abbr> training with domain-specific reward models.
                For example, if you're building a medical reasoning system, you'd:
              </p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Collect domain-specific reasoning traces (e.g., medical case studies)</li>
                <li>Train a reward model to score medical reasoning quality</li>
                <li>Use <abbr title="Proximal Policy Optimization">PPO</abbr> or <abbr title="Group Relative Policy Optimization">GRPO</abbr> to fine-tune R1's reasoning on your domain</li>
              </ol>
              <p>
                This is expensive (requires GPUs and expertise), but the results can be dramatic for specialized tasks.
              </p>
            </>
          ),
        },
        {
          title: 'Inference Optimization',
          preview: 'Making reasoning faster without sacrificing quality',
          content: (
            <>
              <p className="mb-4">
                R1's reasoning traces can get long (1000+ tokens), which slows inference. Here are strategies to speed
                things up:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Use distilled models</strong>: DeepSeek already released distilled versions (1.5B, 7B, 8B,
                  14B, 32B, 70B) that preserve much of R1's reasoning at a fraction of the compute. The 32B distilled
                  model reportedly outperforms o1-mini on some benchmarks.
                </li>
                <li>
                  <strong>Quantization</strong>: Q4_K_M quantizations work well for local deployment. The 8B model runs
                  at ~20 tokens/sec on a 16GB GPU, while the 7B version works on CPU-only setups.
                </li>
                <li>
                  <strong>Early stopping</strong>: Monitor the reasoning trace and stop generation once the model
                  reaches high confidence or starts repeating itself
                </li>
                <li>
                  <strong>WebGPU deployment</strong>: The 1.5B distilled model can run entirely in your browser using
                  WebGPU, with no server needed
                </li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      id: 'verdict',
      title: 'The Verdict',
      content: (
        <>
          <p className="mb-4">
            DeepSeek-R1 isn't just a good model — it's a market-shaping event. By offering frontier reasoning at sub-$1
            pricing (trained for $5-6M vs competitors' billions), it forced every competitor to rethink their
            economics. The pure RL approach without supervised fine-tuning proves that reasoning can emerge through
            reward signals alone — a paradigm shift that will influence how future models are trained.
          </p>
          <p className="mb-4">
            For developers, it's a no-brainer for any task that benefits from visible reasoning: math, code, planning,
            research, tutoring. The MIT-licensed weights mean you can run it locally, fine-tune it, or build on top of it
            without restrictions. The distilled models make advanced reasoning accessible to anyone with consumer
            hardware.
          </p>
          <p className="mb-4">
            It's not for everything. If you need multimodal support, lightning-fast responses, or ultra-polished UX,
            look elsewhere. The verbose reasoning can be annoying for simple queries, and tokenization issues persist.
            But for reasoning tasks at scale? R1 is the new baseline.
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 italic">
            Want to try it? Chat is free at chat.deepseek.com, and the open weights are on HuggingFace. You can also run
            quantized versions locally via Ollama or in your browser with WebGPU. Start with the chat interface to see
            the reasoning in action.
          </p>
        </>
      ),
    },
  ],
}
