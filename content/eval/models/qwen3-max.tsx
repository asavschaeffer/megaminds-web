import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { AbbrSidenote, GlossarySidenote } from '@/components/shared/sidenote'

const qwen3MaxLinks: Partial<Record<ModelLinkTypeId, string>> = {
    chat: 'https://chat.qwen.ai/',
    api: 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
    docs: 'https://www.alibabacloud.com/help/en/model-studio/qwen-api-reference/',
    github: 'https://github.com/QwenLM/Qwen3',
    blog: 'https://qwen.ai/blog?id=qwen3-max-thinking',
    paper: 'https://arxiv.org/abs/2505.09388',
    pricing: 'https://www.alibabacloud.com/help/en/model-studio/models',
}

export const qwen3Max: ModelProfile = {
    slug: 'qwen3-max',
    meta: {
        name: 'Qwen 3 Max',
        family: 'Qwen',
        variant: 'Max',
        modelVersion: '3',
        nameOrder: 'family-version-variant',
        organization: 'Alibaba Cloud',
        organizationId: 'alibaba',
        releaseDate: '2026-01-25',
        releaseDateDisplay: 'January 2026',
        identity:
            'The trillion-parameter reasoning powerhouse that pioneered Test-Time Scaling—achieving 100% on AIME 25 and HMMT while outperforming GPT-5.2 on agentic benchmarks through dynamic, on-demand intelligence.',
        tagIds: [
            // Capability
            'reasoning',
            'coding',
            'tool-use',
            'math',
            'frontier',
            // Modality
            'text',
            // Architecture
            'moe',
            // Licensing
            'proprietary',
            // Size
            'large',
            // Context
            'long',
            // Deployment
            'cloud',
            'api',
            // Output
            'output-8k',
        ],
        tags: ['1T+ Parameters', '36T Training Tokens', '128K Context'],
        links: {
            ...qwen3MaxLinks,
        },
    },
    analysis: {
        strengths: [
            'Test-Time Scaling: Dynamic compute allocation achieves 100% on AIME 25 and HMMT through "thinking budget" mechanism',
            'Agentic superiority: 74.8 on Tau2-Bench outperforms Claude Opus 4 and DeepSeek-V3.1 on tool calling',
            'MoE efficiency: 128 experts with 8 active per token, 30% MFU improvement via PAI-FlashMoE',
            'OpenAI SDK compatible: Drop-in replacement requiring only base_url and model name changes',
            'Enterprise validated: Hamilton accounting automation, widespread adoption in finance and healthcare',
        ],
        weaknesses: [
            'Domain-specific limits: Only 15% pass rate on FinBen financial reasoning benchmark after 48-hour runtime',
            'SWE-bench gap: 69.6% vs GPT-5.2 (80%) indicates precision engineering remains a weakness',
            'Censorship layer: Political topics trigger upstream filter refusals before reaching the model',
            'Premium pricing: $0.861/M input + $3.441/M output positions it at the expensive end',
        ],
        unknowns: [
            'Long-term routing stability in MoE architecture after removing shared experts',
            'Hallucination risk in high-stakes applications requiring factual accuracy',
            'Actual hardware infrastructure given US export controls on high-end GPUs',
        ],
    },
    intro: {
        text: 'Qwen 3 Max Thinking represents a strategic departure from the conventional paradigm of achieving capability through brute-force scaling. While its base model exceeds one trillion parameters trained on 36 trillion tokens, its distinction lies in Test-Time Scaling (TTS)—a breakthrough that shifts computational burden from pre-training to inference, enabling dynamic resource allocation for complex tasks. This transforms the model from a static entity into an adaptive problem-solver. The "thinking budget" mechanism allows controlled trade-offs between latency and accuracy, achieving perfect scores on AIME 25 and HMMT through its synergistic combination of TTS and integrated code interpretation. Enterprise validation comes from Hamilton\'s deployment for accounting automation and widespread adoption across finance, healthcare, and manufacturing. For developers, OpenAI SDK compatibility means switching requires changing two variables, while tiered pricing with batch discounts and context caching makes premium reasoning economically accessible. The result: a model that embodies a new frontier in LLM development, prioritizing adaptive intelligence over sheer static scale.',
    },
    pricingData: {
        baseModel: { name: 'Qwen 3 Max (≤32K)', input: 0.861, output: 3.441 },
        competitors: [
            { name: 'Qwen 3 Max (32K-128K)', input: 1.434, output: 3.441 },
            { name: 'GPT-5.2', input: 10.0, output: 30.0 },
            { name: 'Claude 4.5 Opus', input: 15.0, output: 75.0 },
            { name: 'Gemini 3 Pro', input: 7.0, output: 21.0 },
        ],
    },
    chatLimits: [
        {
            name: 'Qwen Chat (chat.qwen.ai)',
            tiers: [
                { label: 'Free Preview', maxMsgs: 100, price: '$0' },
            ],
        },
        {
            name: 'Qwen App',
            tiers: [
                { label: 'Free', maxMsgs: 50, price: '$0' },
            ],
        },
    ],
    benchmarks: [
        { name: 'AIME 25 (Math)', score: 100, maxScore: 100, comparison: 'Perfect score via TTS + Code Interpreter' },
        { name: 'HMMT (Math)', score: 100, maxScore: 100, comparison: 'Elite math competition solved perfectly' },
        { name: 'AIME (General Math)', score: 80.6, maxScore: 100, comparison: 'GPT-5.2: ~85%' },
        { name: 'Tau2-Bench (Agent)', score: 74.8, maxScore: 100, comparison: 'Outperforms Claude Opus 4' },
        { name: 'SWE-bench Verified', score: 69.6, maxScore: 100, comparison: 'GPT-5.2: 80.0%' },
        { name: 'LMArena Text', score: 3, maxScore: 10, comparison: 'Ranked #3, surpassing GPT-5-Chat' },
        { name: 'FinBen (Financial)', score: 15, maxScore: 100, comparison: 'Domain-specific weakness after 48hr runtime' },
    ],
    sentimentFeed: [
        {
            author: 'Alibaba Qwen',
            handle: '@Alibaba_Qwen',
            content: 'Introducing Qwen3-Max-Thinking, our most capable reasoning model yet. Trained with massive scale and advanced RL, it delivers strong performance across reasoning, knowledge, tool use, and agent capabilities.',
            sentiment: 'positive',
            date: '2026-01-26',
            dateDisplay: 'Jan 26, 2026',
            url: 'https://x.com/Alibaba_Qwen/status/2015805330652111144',
        },
        {
            author: 'Bindu Reddy',
            handle: '@bindureddy',
            content: 'Qwen 3 Max Thinking Dropped And Says It\'s An Opus 4.5 Level Model!! It\'s not open source, and it\'s extremely doubtful that it actually is as good as the other closed-source models.',
            sentiment: 'critical',
            date: '2026-01-26',
            dateDisplay: 'Jan 26, 2026',
            url: 'https://x.com/bindureddy/status/2015924250042150923',
        },
        {
            author: 'Numman Ali',
            handle: '@nummanali',
            content: 'Qwen 3 Max Thinking on paper looks to match and surpass GPT 5.2/Opus 4.5 using test time scaling. The gap between closed and open source is narrowing significantly.',
            sentiment: 'positive',
            date: '2026-01-26',
            dateDisplay: 'Jan 26, 2026',
            url: 'https://x.com/nummanali/status/2015847876337737894',
        },
        {
            author: 'slow_developer',
            handle: '@slow_developer',
            content: 'qwen3-max-thinking is WOW the new model beats opus 4.5, gemini 3 pro, and gpt-5.2 in multiple benchmarks. It\'s a huge 1T-parameter model—especially tool use and agent-style tasks.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/slow_developer/status/2015965481434583235',
        },
        {
            author: 'Luke Powell',
            handle: '@LukePowell37880',
            content: 'Benchmarks aside, from my experience running STEM prompts all day, Qwen3-Max is not just underrated but one of the best models out there. Often getting questions correct GPT-5.2 Extended Thinking gets wrong.',
            sentiment: 'positive',
            date: '2026-01-28',
            dateDisplay: 'Jan 28, 2026',
            url: 'https://x.com/LukePowell37880/status/2016567924530532747',
        },
        {
            author: 'Vercel Developers',
            handle: '@vercel_dev',
            content: 'Qwen 3 Max Thinking is available now on AI Gateway. Set model: \'alibaba/qwen3-max-thinking\' and try it on complex reasoning tasks with autonomous tool selection.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/vercel_dev/status/2016193862411419839',
        },
    ],
    sections: [
        // ═══════════════════════════════════════════════════════════════════════════
        // 1. TEST-TIME SCALING
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'test-time-scaling',
            title: 'Test-Time Scaling',
            subtitle: 'The Core Innovation',
            variant: 'technical',
            content: (
                <>
                    <p className="mb-4">
                        The defining breakthrough of Qwen 3 Max Thinking is its implementation of <AbbrSidenote title="Test-Time Scaling" definition="A paradigm that shifts computational effort from pre-training to inference, enabling models to dynamically allocate resources based on task complexity">Test-Time Scaling (TTS)</AbbrSidenote>—a fundamental reorientation of how LLMs achieve high performance. Instead of relying solely on pre-training scale, TTS shifts computational effort from training to inference, enabling the model to dynamically allocate resources based on task complexity.
                    </p>
                    <p className="mb-4">
                        At the heart of this system is the "Thinking Budget" mechanism. For simple queries ("Hello"), the model operates in Non-Thinking Mode, delivering fast, low-cost responses. For complex problems (e.g., Olympiad math), it activates Thinking Mode, consuming a configurable budget of reasoning tokens. Critically, the model learns—via <GlossarySidenote term="RL" />—to emit a "stop thinking" token when marginal gains diminish, preventing infinite loops.
                    </p>
                    <p className="mb-4">
                        This approach moves beyond wasteful "Best-of-N" sampling. TTS enables adaptive cognition: the model thinks harder only when necessary, optimizing the trade-off between latency, cost, and accuracy. For developers, this is exposed via an <GlossarySidenote term="API" /> parameter, allowing fine-grained control over reasoning depth—a feature absent in most competitors.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 2. THE MAX MOMENT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'the-max-moment',
            title: 'The Max Moment',
            subtitle: 'Why It Matters',
            content: (
                <>
                    <p className="mb-4">
                        Qwen 3 Max Thinking marks a pivotal inflection point in the global AI landscape—the first Chinese <GlossarySidenote term="LLM" /> to credibly match and, in specific domains, surpass leading Western frontier models like GPT-5.2 and Gemini 3 Pro. This achievement shatters the long-standing assumption that Chinese AI lags 6–12 months behind its U.S. counterparts. Its release signals a paradigm shift: frontier AI is no longer a Western monopoly. Geopolitically, this is profound. Enterprises can no longer default to U.S. providers for "best-in-class" performance; they must now evaluate models on a capability-by-capability basis, potentially splitting infrastructure between East and West.
                    </p>
                    <p className="mb-4">
                        This milestone is especially significant given the context of U.S. export controls on high-end <AbbrSidenote title="Graphics Processing Unit" definition="Specialized hardware optimized for parallel computation, essential for training and running large AI models">GPUs</AbbrSidenote>. Alibaba's ability to train a trillion-parameter model under these constraints demonstrates that algorithmic innovation and software-level parallelism can effectively compensate for hardware limitations. Qwen 3 Max Thinking is not just a technical artifact—it is a strategic declaration that China has arrived at the frontier of artificial intelligence, forcing a reevaluation of global AI supply chains and competitive dynamics.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 3. EXPERIENCE-CUMULATIVE REASONING
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'experience-cumulative',
            title: 'Experience-Cumulative Reasoning',
            subtitle: 'Recursive Self-Aggregation',
            variant: 'advanced',
            content: (
                <>
                    <p className="mb-4">
                        Qwen 3 Max Thinking's reasoning process is formalized as Experience-Cumulative Reasoning (or Recursive Self-Aggregation). This is not standard chain-of-thought; it is a multi-stage, self-reflective loop:
                    </p>
                    <ol className="list-decimal list-inside mb-4 space-y-1">
                        <li><strong>Generate</strong>: Produce an initial reasoning path.</li>
                        <li><strong>Critique</strong>: Self-reflect to identify gaps, contradictions, or uncertainties.</li>
                        <li><strong>Aggregate</strong>: Retain key insights from prior attempts rather than discarding them.</li>
                        <li><strong>Spiral Upward</strong>: Use distilled experience to inform the next reasoning step, avoiding redundant exploration.</li>
                    </ol>
                    <p className="mb-4">
                        This "spiral" process allows the model to iteratively refine its logic within a single inference session. Crucially, it integrates a <AbbrSidenote title="Code Interpreter" definition="A built-in capability allowing the model to write and execute code (usually Python) to solve computational problems or analyze data">code interpreter</AbbrSidenote> directly into the reasoning loop. For mathematical or computational tasks, it doesn't just predict—it executes Python code, validates results, and incorporates outputs back into its thought process. This hybrid symbolic-neural architecture is why it achieves 100% on AIME 2025 and HMMT, benchmarks designed to challenge elite human problem-solvers.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 4. THE MOE BLUEPRINT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'moe-blueprint',
            title: 'The MoE Blueprint',
            subtitle: 'Architecture Deep Dive',
            variant: 'advanced',
            specs: [
                { label: 'Total Params', value: '1T+', icon: 'cpu' },
                { label: 'Experts', value: '128 (8 active)', icon: 'zap' },
                { label: 'Training Tokens', value: '36T', icon: 'database' },
                { label: 'MFU Gain', value: '+30%', icon: 'trending-up' },
            ],
            content: (
                <>
                    <p className="mb-4">
                        Qwen 3 Max is built on a highly optimized <AbbrSidenote title="Mixture of Experts" definition="A sparse model architecture that activates only a subset of parameters (experts) for each token, improving efficiency without sacrificing capacity">MoE</AbbrSidenote> architecture:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li>128 total experts, with 8 active per token</li>
                        <li>No shared experts—a deliberate design choice to simplify routing and reduce overhead</li>
                        <li>Custom Qwen3MoeSparseMoeBlock MLP architecture for improved efficiency</li>
                        <li>Trained using PAI-FlashMoE, Alibaba's proprietary framework, which delivers +30% <AbbrSidenote title="Model FLOPs Utilization" definition="A metric measuring how efficiently hardware compute resources are used during training, with higher values indicating better optimization">Model FLOPs Utilization (MFU)</AbbrSidenote> over Qwen2.5-Max</li>
                        <li>ChunkFlow for long-context training, yielding 3× throughput improvement over standard sequence parallelism</li>
                    </ul>
                    <p className="mb-4">
                        This configuration enables &gt;1 trillion parameters with only ~10–50B active per token, achieving massive knowledge capacity without proportional inference costs. The removal of shared experts reflects confidence in routing stability, while PAI-FlashMoE's efficiency gains were likely essential to training feasibility under GPU export restrictions.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 5. THE BENCHMARKS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'benchmarks',
            title: 'The Benchmarks',
            subtitle: 'Specialist, Not Generalist',
            hasBenchmarks: true,
            content: (
                <>
                    <p className="mb-4">
                        Qwen 3 Max Thinking excels as a specialist, not a generalist:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">✅ Strengths</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>100% on AIME 2025 & HMMT (math)</li>
                                <li>74.8 on Tau2-Bench (agent tool use)—beating GPT-5.2 and Gemini 3 Pro</li>
                                <li>75.3% on SWE-bench Verified (real-world code fixes)</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">❌ Weaknesses</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Only 15% pass rate on FinBen (financial reasoning) after 48 hours</li>
                                <li>Trails GPT-5.2 (80%) and Claude 4.5 Opus (80.9%) on SWE-bench</li>
                            </ul>
                        </div>
                    </div>
                    <p className="mb-4">
                        This profile confirms: Qwen 3 Max is a precision instrument for math, coding, and agentic tasks, but not a universal reasoner. Its dominance in structured, verifiable domains contrasts with gaps in abstract, domain-specific reasoning like finance.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 6. ENTERPRISE IN PRODUCTION
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'enterprise',
            title: 'Enterprise in Production',
            subtitle: 'Real-World Validation',
            content: (
                <>
                    <p className="mb-4">
                        Beyond benchmarks, Qwen 3 Max is already deployed in real-world enterprise systems:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li><strong>Hamilton</strong>: Uses Qwen to power its accounting automation engine, enabling rapid, low-cost deployment of intelligent financial workflows.</li>
                        <li><strong>Cross-sector adoption</strong>: Active in finance, energy, government, education, healthcare, and manufacturing, demonstrating reliability across regulated industries.</li>
                        <li><strong>Developer traction</strong>: Integrated into LangChain, LlamaIndex, CrewAI, and supported by Vercel's AI Gateway.</li>
                    </ul>
                    <p className="mb-4">
                        These deployments validate its production readiness and business value, moving it beyond academic curiosity into operational infrastructure.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 7. THE ECONOMICS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'economics',
            title: 'The Economics',
            subtitle: 'Premium Positioning for Mission-Critical Tasks',
            hasPricing: true,
            content: (
                <>
                    <p className="mb-4">
                        Pricing reflects premium positioning for mission-critical tasks:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li>Input: $0.861/M tokens (≤32K context) → $1.434/M (32K–128K)</li>
                        <li>Output: $3.441/M tokens</li>
                        <li>Batch calls: 50% discount on input/output</li>
                        <li><GlossarySidenote term="context caching" />: Up to 90% discount on repeated input tokens</li>
                    </ul>
                    <p className="mb-4">
                        For <AbbrSidenote title="Retrieval-Augmented Generation" definition="A technique where models fetch relevant documents before answering to improve accuracy and reduce hallucinations">RAG</AbbrSidenote> or agent applications with static context, effective input cost drops to ~$0.24/M tokens—a 10× advantage over GPT-5.2 ($10/M input). However, reasoning tokens are billed as output, making deep thinking expensive and unpredictable. Cost control requires strict max_tokens limits.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 8. DEVELOPER EXPERIENCE
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'developer-experience',
            title: 'Developer Experience',
            subtitle: 'Frictionless Adoption',
            content: (
                <>
                    <p className="mb-4">
                        Alibaba prioritized frictionless adoption:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li>OpenAI <AbbrSidenote title="Software Development Kit" definition="A collection of tools, libraries, and documentation that developers use to build applications for a specific platform">SDK</AbbrSidenote> compatible: Drop-in replacement via base_url and model name change</li>
                        <li>Native qwen3-sdk: Supports RAG (KnowledgeBase) and tool calling (call_tool)</li>
                        <li>Framework integrations: Full support for LangChain, LlamaIndex, Haystack, CrewAI</li>
                        <li>Thinking mode control: Toggle via API; reasoning traces returned in &lt;think&gt; tags for debugging or UI display</li>
                    </ul>
                    <p className="mb-4">
                        The main friction point: Alibaba Cloud account verification is more bureaucratic than Western "credit card + email" signups.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 9. AGENTIC EXCELLENCE
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'agentic-excellence',
            title: 'Agentic Excellence',
            subtitle: 'Architected for Agency',
            content: (
                <>
                    <p className="mb-4">
                        Qwen 3 Max is architected for <GlossarySidenote term="agentic workflows" />:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li>Hybrid thinking mode: Seamlessly switches between fast chat and deep reasoning</li>
                        <li>Autonomous tool use: Integrates function calling, enable_search, and code interpreter natively</li>
                        <li>Dominates Tau2-Bench (74.8)—proving superior planning, execution, and tool orchestration vs. GPT-5.2 (45.5%)</li>
                    </ul>
                    <p className="mb-4">
                        This makes it ideal for building autonomous agents that must reason, act, and adapt in dynamic environments.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 10. THE ALIGNMENT TRADE-OFF
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'alignment',
            title: 'The Alignment Trade-off',
            subtitle: 'Safety and Censorship',
            content: (
                <>
                    <p className="mb-4">
                        Safety is enforced via a multi-layered alignment strategy:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li><AbbrSidenote title="Direct Preference Optimization" definition="A reinforcement learning technique that aligns model behavior by directly optimizing on human preference data without requiring a separate reward model">Direct Preference Optimization (DPO)</AbbrSidenote> during training</li>
                        <li>Content moderation classifiers that filter harmful outputs</li>
                        <li>Upstream censorship layer: Politically sensitive prompts (e.g., "Tiananmen Square") trigger "Error 400: Inappropriate content" before reaching the model</li>
                    </ul>
                    <p className="mb-4">
                        The result is a hyper-neutral, fact-focused tone that avoids controversy. While this ensures compliance in China, it creates friction for international users seeking nuanced discussion on sensitive topics. Critics argue this "safety reasoning" burns tokens on refusals rather than problem-solving.
                    </p>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 11. KNOWN LIMITATIONS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'limitations',
            title: 'Known Limitations',
            subtitle: 'Constraints and Risks',
            content: (
                <>
                    <p className="mb-4">
                        Despite its strengths, Qwen 3 Max has notable constraints:
                    </p>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                        <li><strong>Domain gaps</strong>: Poor performance on FinBen (15%) shows limited financial reasoning</li>
                        <li><strong>SWE-bench lag</strong>: 75.3% vs. 80%+ for GPT-5.2/Claude—precision engineering remains a gap</li>
                        <li><strong>Hallucination risk</strong>: Like all LLMs, it may generate fluent but false information</li>
                        <li><strong>MoE stability concerns</strong>: Removal of shared experts could increase routing instability over time</li>
                        <li><strong>Data residency</strong>: Enterprises face compliance questions when using Alibaba Cloud infrastructure</li>
                    </ul>
                </>
            ),
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 12. THE VERDICT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'verdict',
            title: 'The Verdict',
            subtitle: 'When to Use, When to Avoid',
            content: (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <h4 className="font-semibold mb-2">Use Qwen 3 Max Thinking when:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                                <li>You need mathematical or algorithmic reasoning (AIME 100%, HMMT 100%)</li>
                                <li>Building agentic systems requiring tool use (Tau2-Bench 74.8)</li>
                                <li>Cost efficiency matters (input as low as $0.24/M with caching)</li>
                                <li>You value transparent reasoning traces for debugging or user trust</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Do not use it when:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
                                <li>Tasks require political neutrality (censorship layer interferes)</li>
                                <li>Precision software engineering is critical (SWE-bench 75.3% &lt; GPT-5.2's 80%)</li>
                                <li>Operating in regulated Western environments with strict data residency rules</li>
                            </ul>
                        </div>
                    </div>
                    <p className="mb-4">
                        Qwen 3 Max Thinking is not a compromise—it is a specialist weapon for deep reasoning and autonomous action. In the new multipolar AI world, it earns a permanent seat at the evaluation table.
                    </p>
                </>
            ),
        },
    ],
}