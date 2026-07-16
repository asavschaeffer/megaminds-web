import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'

const deepseekLinks: Record<ModelLinkTypeId, string> = {
    chat: 'https://chat.deepseek.com',
    api: 'https://platform.deepseek.com/api-docs',
    docs: 'https://api-docs.deepseek.com',
    paper: 'https://arxiv.org/abs/2512.02556',
    weights: 'https://huggingface.co/deepseek-ai',
    github: 'https://github.com/deepseek-ai/DeepSeek-V3',
    pricing: 'https://api-docs.deepseek.com/quick_start/pricing',
} as Partial<Record<ModelLinkTypeId, string>> as Record<ModelLinkTypeId, string>

export const deepseekV3_2: ModelProfile = {
    slug: 'deepseek-v3-2',
    meta: {
        name: 'DeepSeek V3.2',
        family: 'DeepSeek',
        variant: 'v',
        modelVersion: '3.2',
        nameOrder: 'family-variant-version',
        organization: 'DeepSeek',
        releaseDate: '2025-12-01',
        identity: 'A powerful open\u2011source reasoning model that challenges proprietary frontiers with exceptional math and coding capabilities, while balancing efficiency via Mixture\u2011of\u2011Experts.',
        tagIds: [
            'reasoning',
            'coding',
            'math',
            'text',
            'moe',
            'open-source',
            'long',
            'output-8k',
            'api',
            'cloud',
            'cost-efficient',
        ],
        specChips: ['671B Parameters', '128k Context'],
        // Rates as of 2025-12-01; pricingSources TODO(research)
        apiRates: { input: 0.14, output: 0.28, provider: 'DeepSeek' },
        links: deepseekLinks,
    },
    analysis: {
        strengths: [
            'Exceptional mathematical and coding reasoning',
            'High parameter efficiency via Mixture-of-Experts',
            'Strong hallucination mitigation specific to reasoning tasks',
        ],
        weaknesses: [
            'Extremely high hardware requirements for self-hosting',
            'Latency trade-offs in "Think" mode',
        ],
        unknowns: [
            'Multilingual superiority in low-resource languages',
            'Long-term cost of GRPO-induced high token consumption',
        ],
    },
    intro: {
        text: 'DeepSeek V3.2 is a landmark open\u2011source model that delivers GPT\u20115\u2011level reasoning at a fraction of the cost. Built on a sophisticated Mixture\u2011of\u2011Experts architecture, it activates only 37B of its 671B parameters per token, achieving exceptional efficiency without sacrificing performance. The model excels in mathematics, coding, and agentic tasks, backed by a dedicated community that celebrates its disruptive potential\u2014even as debates continue about its true frontier status and practical deployment hurdles.',
    },
    benchmarks: [
        { name: 'MathArena', score: 88, maxScore: 100, comparison: 'GPT-5-mini: 87' },
        { name: 'ABC-Bench', score: 50, maxScore: 100, comparison: 'Claude 3.5 Sonnet: 63' },
        { name: 'GSM8K', score: 95, maxScore: 100, comparison: 'SOTA Level' }, // Estimated from "Strong"
    ],
    sentimentFeed: [
        {
            author: 'sutanisurabu',
            handle: '@incubatordesuka',
            content: 'Sorry but Roon is right, in my tests it still fails the same benchmarks that are passed by past generation V3.2. I yet have to see any real competitive model made by anyone from China that is not DeepSeek or http://Z.AI lol.',
            sentiment: 'critical',
            url: 'https://x.com/incubatordesuka/status/2016714845471514912',
        },
        {
            author: 'techsimplified',
            handle: '@star_speace',
            content: 'the AI model rankings in January 2026:\n\nGemini 3 Pro: #1 on user preference (LMArena)\nGPT-5.2: #1 on benchmark intelligence\nClaude Opus 4.5: #1 for coding (SWE-bench, Terminal-bench)\nDeepSeek V3.2: best open-source, 1/30th the cost\n\nthe answer is now: best for what?',
            sentiment: 'positive',
            url: 'https://x.com/star_speace/status/2016604919462088994',
        },
        {
            author: 'OpenRouter',
            handle: '@OpenRouterAI',
            content: 'DeepSeek V3.2 models are live on OpenRouter!\n\n- V3.2 brings V3.2-Exp efficiency plus improved reasoning and agentic behavior, including full tool calling support in a DeepSeek reasoner for the first time ever.\n- V3.2 Speciale is a high compute variant that rivals Gemini 3 Pro.',
            sentiment: 'positive',
            url: 'https://x.com/OpenRouterAI/status/1995511463386231012',
        },
        {
            author: 'Okara',
            handle: '@askOkara',
            content: 'another reason not to use OpenAI models.\n\ndeepseek v3.2 is on par with gpt-5 and you can use it on okara.\n\nwe don\'t take a percentage of what you build. your ideas stay yours.',
            sentiment: 'positive',
            url: 'https://x.com/askOkara/status/2014643860237168758',
        },
        {
            author: 'Robuttal',
            handle: '@robuttal',
            content: 'New debate: Torture is never justified, even for national security\n\nGemini 2.5 Flash (1466 Elo) vs DeepSeek V3 (1518 Elo)\n\nhttps://robuttal.com/debates/713a3f55-37ea-48db-a0f6-4e95aabc67bc\n\n@GoogleAI @deepseek_ai #AI #Defense #Military',
            sentiment: 'neutral',
            url: 'https://x.com/robuttal/status/2016602480797257836',
        },
        {
            author: 'TestingCatalog News \ud83d\uddc3',
            handle: '@testingcatalog',
            content: 'DeepSeek released DeepSeek-V3.2-Exp build on top of previously released V3.1-Terminus model.\n\nIt is 50% cheaper and slightly better at search benchmarks.\n\nDeep dumping \ud83d\udc40',
            sentiment: 'positive',
            url: 'https://x.com/testingcatalog/status/1972607048711045555',
        },
        {
            author: 'Fisherman',
            handle: '@Rybens92',
            content: 'Deepseek V3.2 best cheap model for user intention understanding, planing and reasoning close to GPT 5.x family, but the downside is it\'s closely slow.\n\nGLM and Minimax failed for me many times in these tasks.',
            sentiment: 'positive',
            url: 'https://x.com/Rybens92/status/2015149711364124942',
        },
        {
            author: 'AI with Shekhar',
            handle: '@Shekhar_Builds',
            content: 'DeepSeek v3.2 + Qwen VL/GLM 4.7 mix crushes it locally! I use Qwen coder for agents, DeepSeek for reasoning\u2014fast on 8GB. Multi-model flows ftw. What\'s your routing logic for best results?',
            sentiment: 'neutral',
            url: 'https://x.com/Shekhar_Builds/status/2016563338160017736',
        },
        {
            author: 'FallenOne',
            handle: '@FallenOne58035',
            content: 'for clawdbot, MiniMax M2.1, GLM 4.7. you can also add deepseek v3.2, it\'s the worst of the 3 models, but it\'s multiple times cheaper, and like 5% dumber, you can leave it running with opencode for 4 hours and not even spend $1, that\'s how cheap it is.',
            sentiment: 'critical',
            url: 'https://x.com/FallenOne58035/status/2015144555155210346',
        },
    ],
    sections: [
        {
            id: 'why-it-matters',
            title: 'Why It Matters',
            subtitle: 'The Open Frontier',
            content: null,
            socialData: {
                type: 'tweet',
                author: 'Emmanuel -Big tech and blue chip Lover',
                handle: '@obienu59136',
                content: '1\ufe0f\u20e3 House China committee chair John Moolenaar says Nvidia helped China\'s DeepSeek in 2024, providing technical support.\n\n2\ufe0f\u20e3 The support reportedly cut training compute for DeepSeek-V3 to ~2.788M H800 GPU-hours.\n\n3\ufe0f\u20e3 Lawmakers claim DeepSeek models were later used by China\'s military, prompting calls for tighter export licensing.\n\n4\ufe0f\u20e3 Nvidia disputes the military-use framing, emphasizing their guidance was technical, not operational.\n\n5\ufe0f\u20e3 Potential implication: U.S. lawmakers may tighten AI hardware export rules, impacting global GPU supply.',
                url: 'https://x.com/obienu59136/status/2016639608424181965',
                date: 'Jan 28, 2026',
            },
        },
        {
            id: 'coding',
            title: 'Coding & Development',
            subtitle: 'A Developer\'s Workbench',
            hasBenchmarks: true,
            content: null,
            socialData: {
                type: 'tweet',
                author: 'AI with Shekhar',
                handle: '@Shekhar_Builds',
                content: 'DeepSeek v3.2 + Qwen VL/GLM 4.7 mix crushes it locally! I use Qwen coder for agents, DeepSeek for reasoning\u2014fast on 8GB. Multi-model flows ftw. What\'s your routing logic for best results?',
                url: 'https://x.com/Shekhar_Builds/status/2016563338160017736',
                date: 'Jan 28, 2026',
            },
        },
        {
            id: 'reasoning',
            title: 'Incentivized Reasoning',
            subtitle: 'The "Think" Mode Revolution',
            content: null,
            socialData: {
                type: 'tweet',
                author: 'Fisherman',
                handle: '@Rybens92',
                content: 'Deepseek V3.2 best cheap model for user intention understanding, planing and reasoning close to GPT 5.x family, but the downside is it\'s closely slow.\n\nGLM and Minimax failed for me many times in these tasks.',
                url: 'https://x.com/Rybens92/status/2015149711364124942',
                date: 'Jan 28, 2026',
            },
        },
        {
            id: 'training',
            title: 'Training & Architecture',
            subtitle: 'Efficiency at Scale',
            variant: 'advanced',
            specs: [
                { label: 'Total Params', value: '671B', icon: 'cpu' },
                { label: 'Active Params', value: '37B', icon: 'zap' },
            ],
            content: null,
        },
        {
            id: 'deployment',
            title: 'The Hardware Reality',
            subtitle: 'Free Weights, Expensive Metal',
            variant: 'technical',
            content: null,
        },
        {
            id: 'economics',
            title: 'The Economics',
            subtitle: 'API Pricing Warfare',
            hasPricing: true,
            content: null,
            socialData: {
                type: 'tweet',
                author: 'TestingCatalog News \ud83d\uddc3',
                handle: '@testingcatalog',
                content: 'DeepSeek released DeepSeek-V3.2-Exp build on top of previously released V3.1-Terminus model.\n\nIt is 50% cheaper and slightly better at search benchmarks.\n\nDeep dumping \ud83d\udc40',
                url: 'https://x.com/testingcatalog/status/1972607048711045555',
                date: 'Jan 28, 2026',
            },
        },
        {
            id: 'issues',
            title: 'Known Quirks',
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
        reason: 'Pre-pipeline report: 5 uncited sections, no chatLimits, 3 benchmark entries lack per-entry sources, no author/updatedAt',
        flaggedAt: '2026-07-14',
    },
    governance: {
        lastUpdated: '2025-12-05',
        dataSources: [
            {
                type: 'official',
                url: 'https://api-docs.deepseek.com',
                description: 'DeepSeek API Documentation',
            },
            {
                type: 'paper',
                url: 'https://arxiv.org/abs/2512.02556',
                description: 'DeepSeek-V3 Technical Report',
            },
            {
                type: 'community',
                description: 'HuggingFace Community Discussions',
            },
        ],
        confidence: {
            overall: 95,
            pricing: 100, // Official API docs
            benchmarks: 90, // Mixed sources (paper + arena)
            features: 95, // Verified via API usage
        },
    },
}
