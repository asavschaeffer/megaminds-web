import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { getModelPricingFromReference, mergePricingData } from '@/lib/models/utils'

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
            'structured-output',
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
    pricingData: mergePricingData(
        getModelPricingFromReference('qwen-3-max'),
        ['gpt-5-2', 'claude-opus-4-5', 'gemini-3-pro']
    ),
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
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 2. THE MAX MOMENT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'why-it-matters',
            title: 'The Max Moment',
            subtitle: 'Why It Matters',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 3. EXPERIENCE-CUMULATIVE REASONING
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'experience-cumulative',
            title: 'Experience-Cumulative Reasoning',
            subtitle: 'Recursive Self-Aggregation',
            variant: 'advanced',
            content: null,
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
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 5. THE BENCHMARKS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'benchmarks',
            title: 'The Benchmarks',
            subtitle: 'Specialist, Not Generalist',
            hasBenchmarks: true,
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 6. ENTERPRISE IN PRODUCTION
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'enterprise',
            title: 'Enterprise in Production',
            subtitle: 'Real-World Validation',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 7. THE ECONOMICS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'economics',
            title: 'The Economics',
            subtitle: 'Premium Positioning for Mission-Critical Tasks',
            hasPricing: true,
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 8. DEVELOPER EXPERIENCE
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'developer-experience',
            title: 'Developer Experience',
            subtitle: 'Frictionless Adoption',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 9. AGENTIC EXCELLENCE
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'agentic-excellence',
            title: 'Agentic Excellence',
            subtitle: 'Architected for Agency',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 10. THE ALIGNMENT TRADE-OFF
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'alignment',
            title: 'The Alignment Trade-off',
            subtitle: 'Safety and Censorship',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 11. KNOWN LIMITATIONS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'issues',
            title: 'Known Limitations',
            subtitle: 'Constraints and Risks',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // 12. THE VERDICT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'verdict',
            title: 'The Verdict',
            subtitle: 'When to Use, When to Avoid',
            content: null,
        },
    ],
    editorial: {
        status: 'flagged-for-rewrite',
        reason: 'Pre-pipeline report: 3 uncited sections, 7 benchmark entries lack per-entry sources, no author/updatedAt',
        flaggedAt: '2026-07-14',
    },
    governance: {
        lastUpdated: '2026-01-25',
        dataSources: [
            {
                type: 'official',
                url: 'https://qwen.ai/blog?id=qwen3-max-thinking',
                description: 'Qwen 3 Max Launch Blog',
            },
            {
                type: 'paper',
                url: 'https://arxiv.org/abs/2505.09388',
                description: 'Qwen 3 Technical Report',
            },
        ],
        confidence: {
            overall: 90,
            pricing: 100, // Official Alibaba Cloud pricing
            benchmarks: 95, // Verified by multiple sources
            features: 90,
        },
    },
}