import React from 'react'
import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'
import { getModelPricingFromReference, mergePricingData } from '@/lib/models/utils'
import { AbbrSidenote } from '@/components/shared/sidenote'

const kimiK25Links: Partial<Record<ModelLinkTypeId, string>> = {
    weights: 'https://huggingface.co/moonshotai/Kimi-K2.5',
    github: 'https://github.com/MoonshotAI/Kimi-K2',
    docs: 'https://www.kimi.com/blog/kimi-k2-5.html',
    api: 'https://platform.moonshot.ai/',
    pricing: 'https://platform.moonshot.ai/docs/pricing/chat',
    playground: 'https://kimi.moonshot.cn/',
}

export const kimiK25: ModelProfile = {
    slug: 'kimi-k2-5',
    meta: {
        name: 'Kimi K2.5',
        family: 'Kimi',
        variant: 'K',
        modelVersion: '2.5',
        nameOrder: 'family-variant-version',
        organization: 'Moonshot AI',
        releaseDate: '2026-01-15',
        releaseDateDisplay: 'January 2026',
        identity:
            'The open-weight agentic powerhouse that spawns 100 sub-agents to complete complex tasks in parallel—redefining what "autonomous AI" means at a fraction of frontier pricing.',
        tagIds: [
            // Capability
            'reasoning',
            'coding',
            'tool-use',
            'agentic-swarm',
            // Modality
            'text',
            'vision',
            'multimodal',
            // Architecture
            'moe',
            // Licensing
            'open-weights',
            // Size/Performance
            'large',
            // Context
            'ultra',
            // Deployment
            'cloud',
            'api',
            'local',
            // Output
            'output-8k',
        ],
        tags: ['1T Parameters', '32B Active', '256K Context'],
        links: {
            ...kimiK25Links,
        },
    },
    analysis: {
        strengths: [
            'Agent Swarm: Spawns up to 100 parallel sub-agents for 4.5x faster complex task completion',
            'Ultra-low API pricing: $0.15/M tokens (cache hit) undercuts competitors by 10-20x',
            'Native multimodality with MoonViT encoder excels at visual coding and document understanding',
            'Open weights under Modified MIT License enable enterprise customization',
            'MoE efficiency: 1T total params but only 32B active per inference',
        ],
        weaknesses: [
            'Abstract math reasoning (AIME: 49-70%) significantly trails GPT-5.2 (100%)',
            'Hardware requirements prohibitive for local inference without enterprise resources',
            'Hallucination issues reported in Thinking mode beyond 32K context tokens',
            'Tool calling reliability lower than Claude in complex refactoring scenarios',
        ],
        unknowns: [
            'Long-term stability and support for open-weights releases',
            'Actual adoption rates in enterprise vs. hobbyist communities',
            'Comparative safety alignment with Western frontier models',
        ],
    },
    intro: {
        text: 'Kimi K2.5 represents a fundamental shift in how we think about AI capabilities. While the industry has been fixated on raw intelligence benchmarks, Moonshot AI has built something different: a model designed from the ground up for autonomous execution. With its trillion-parameter Mixture-of-Experts architecture, Kimi can spawn up to 100 parallel sub-agents to tackle complex tasks simultaneously—reducing end-to-end latency by 4.5x compared to traditional single-agent approaches. What makes this truly disruptive is the economics: at $0.15 per million tokens (cache hit), Kimi undercuts Western frontier models by an order of magnitude while delivering competitive performance on real-world agentic benchmarks like Humanity\'s Last Exam. This is not just another large language model; it is a blueprint for the next era of autonomous systems.',
    },
    pricingData: mergePricingData(
        getModelPricingFromReference('kimi-k2-5'),
        ['claude-opus-4-5', 'gpt-5-2', 'gemini-3-pro']
    ),
    chatLimits: [
        {
            name: 'Kimi K2.5 API',
            tiers: [
                { label: 'Free Tier', maxMsgs: 0, price: 'API only' },
                { label: 'Cache Hit', maxMsgs: 256000, price: '$0.15 / 1M tokens' },
                { label: 'Cache Miss', maxMsgs: 256000, price: '$0.60 / 1M tokens' },
            ],
        },
    ],
    benchmarks: [
        { name: 'LMSYS Elo (Text)', score: 1438, maxScore: 1600, comparison: 'Gemini 3 Pro: 1490' },
        { name: 'AIME 2025 (Math)', score: 70, maxScore: 100, comparison: 'GPT-5.2: 100%' },
        { name: 'HLE (With Tools)', score: 50.2, maxScore: 100, comparison: 'GPT-5.2: 45.5%' },
        { name: 'SWE-bench Verified', score: 76.8, maxScore: 100, comparison: 'Claude 4.5 Opus: 80.9%' },
        { name: 'LiveCodeBench v6', score: 85.0, maxScore: 100, comparison: 'Gemini 3 Pro: 87.4' },
        { name: 'MathVista (Vision)', score: 90.1, maxScore: 100, comparison: 'GPT-5.2: 82.8' },
        { name: 'InfoVQA', score: 92.6, maxScore: 100, comparison: 'Gemini 3 Pro: 57.2' },
    ],
    sentimentFeed: [
        {
            author: 'Moonshot AI',
            handle: '@Kimi_Moonshot',
            content: 'Introducing Kimi K2.5: global SOTA on agentic benchmarks, open-source vision/coding leader. Features Agent Swarm (beta) and aesthetic website generation from chats/images/videos.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/Kimi_Moonshot/status/2016024049869324599',
        },
        {
            author: 'Alex Cheema',
            handle: '@alexocheema',
            content: 'Running Kimi K2.5 locally on dual Mac Studios at 24 tok/sec. It supports tools like clawdbot.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/alexocheema/status/2016404573917683754',
        },
        {
            author: 'Ollama',
            handle: '@ollama',
            content: 'Kimi K2.5 is now available on Ollama. Run it locally and integrate with tools like Claude Code.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/ollama/status/2016086374005538932',
        },
        {
            author: 'Okara AI',
            handle: '@askOkara',
            content: 'Kimi K2.5 beats Opus 4.5 on benchmarks while being 8x cheaper. The open-source era is here.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/askOkara/status/2016108647504609428',
        },
        {
            author: 'Asa Hidmark',
            handle: '@Nymne',
            content: 'Trying Kimi K2.5 for reasoning and images at a fraction of US model costs. Europe needs to be more flexible.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/Nymne/status/2016206455343341570',
        },
        {
            author: 'Dev',
            handle: '@Dev1059632',
            content: 'Hardware needs for local Kimi K2.5: 512GB Mac Studio gets you 10-15 tok/sec at Q2/Q3 quantization.',
            sentiment: 'neutral',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/Dev1059632/status/2016693007148601534',
        },
        {
            author: 'Mario Zechner',
            handle: '@badlogicgames',
            content: 'Does Kimi K2.5 output tool calls in thinking traces on providers like HuggingFace or OpenRouter?',
            sentiment: 'neutral',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/badlogicgames/status/2016694973014384833',
        },
        {
            author: 'Burhan',
            handle: '@agenzlabs',
            content: '1T MoE architecture, benchmarks rivaling frontiers, aggressive pricing. Awaiting real-world tests but this looks promising.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/agenzlabs/status/2016695118062129574',
        },
        {
            author: 'Clo Willaerts',
            handle: '@bnox',
            content: 'Multimodal, open-source, agent swarms. China is serious about AI competition.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/bnox/status/2016439603343888825',
        },
        {
            author: 'smr',
            handle: '@smr1337',
            content: 'Kimi K2.5 is like Opus 4.5 lite at high speeds via OpenCode Zen.',
            sentiment: 'positive',
            date: '2026-01-27',
            dateDisplay: 'Jan 27, 2026',
            url: 'https://x.com/smr1337/status/2016694693891907867',
        },
    ],
    sections: [
        // ═══════════════════════════════════════════════════════════════════════════
        // CORE SECTIONS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'why-it-matters',
            title: 'Why It Matters',
            subtitle: 'The Agentic Swarm Revolution',
            content: null,
        },
        {
            id: 'social-proof',
            variant: 'social',
            content: null,
            socialData: {
                type: 'quote',
                author: 'r/LocalLLaMA Community',
                content: 'The ability to spawn 100 sub-agents is bonkers. This essentially commoditizes the entire "Research Assistant" startup sector. The base model now does what specialized agents used to do.',
                date: '2026-01',
                dateDisplay: 'Jan 2026',
            },
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // UNIQUE SECTIONS — Agent Swarm & PARL (Kimi-specific)
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'agent-swarm',
            title: 'Agent Swarm Architecture',
            subtitle: 'Orchestrating 100 Parallel Sub-Agents',
            variant: 'technical',
            content: null,
        },
        {
            id: 'parl-training',
            title: 'Parallel-Agent Reinforcement Learning (PARL)',
            subtitle: 'How Kimi Learned to Think in Parallel',
            variant: 'advanced',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // ARCHITECTURE SECTIONS — MoE Deep Dive
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'moe-architecture',
            title: 'Mixture-of-Experts Infrastructure',
            subtitle: '384 Experts, 32B Active at a Time',
            variant: 'technical',
            specs: [
                { label: 'Total Params', value: '~1T', icon: 'cpu' },
                { label: 'Active Params', value: '32B', icon: 'zap' },
                { label: 'Experts', value: '384+1', icon: 'layers' },
                { label: 'Layers', value: '61', icon: 'stack' },
            ],
            content: null,
        },
        {
            id: 'mla-context',
            title: 'Multi-Head Latent Attention (MLA)',
            subtitle: 'Compressing 256K Tokens into Memory',
            variant: 'advanced',
            content: null,
        },
        {
            id: 'muon-optimizer',
            title: 'The Muon Optimizer',
            subtitle: 'Zero Training Instability at Trillion Scale',
            variant: 'advanced',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // MULTIMODAL SECTIONS — MoonViT & Visual Coding
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'moonvit-encoder',
            title: 'Native Multimodality: MoonViT',
            subtitle: 'A 400M Parameter Vision Encoder Built In',
            hasBenchmarks: true,
            content: null,
        },
        {
            id: 'visual-coding',
            title: 'Visual Coding',
            subtitle: 'From Screenshots to Working Code',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // ECONOMICS & DEPLOYMENT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'economics',
            title: 'The Economics',
            subtitle: (
                <>
                    <AbbrSidenote term="API" force>API</AbbrSidenote> pricing and the $0.15 disruption
                </>
            ),
            content: null,
            hasPricing: true,
            socialData: {
                type: 'tweet',
                author: 'Okara AI',
                handle: '@askOkara',
                date: 'Jan 27, 2026',
                content: 'Kimi K2.5 beats Opus 4.5 on benchmarks while being 8x cheaper. The open-source era is here.',
                url: 'https://x.com/askOkara/status/2016108647504609428',
            },
        },
        {
            id: 'kimi-code-cli',
            title: 'Kimi Code CLI',
            subtitle: 'Terminal-Based Agentic Development',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // COMPARATIVE ANALYSIS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'vs-gpt-5-2',
            title: 'Kimi vs. GPT-5.2',
            subtitle: 'The Doer vs. The Thinker',
            content: null,
        },
        {
            id: 'vs-claude-opus',
            title: 'Kimi vs. Claude 4.5 Opus',
            subtitle: 'The Coding Battleground',
            content: null,
        },
        {
            id: 'vs-gemini-pro',
            title: 'Kimi vs. Gemini 3 Pro',
            subtitle: 'The Multimodal Context War',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // COMMUNITY & SENTIMENT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'lmsys-arena',
            title: 'LMSYS Chatbot Arena Deep Dive',
            subtitle: 'Where Kimi Ranks Among the Titans',
            content: null,
        },
        {
            id: 'open-weights-reality',
            title: 'The Open Weights Reality Check',
            subtitle: 'Can You Actually Run It Locally?',
            content: null,
            socialData: {
                type: 'tweet',
                author: 'Alex Cheema',
                handle: '@alexocheema',
                date: 'Jan 27, 2026',
                content: 'Running Kimi K2.5 locally on dual Mac Studios at 24 tok/sec. Confirms it supports tools like clawdbot.',
                url: 'https://x.com/alexocheema/status/2016404573917683754',
            },
        },
        {
            id: 'roleplay-creative',
            title: 'The Unexpected Niche: Creative Writing & Roleplay',
            subtitle: 'Why the SillyTavern Community Loves Kimi',
            content: null,
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // LIMITATIONS & VERDICT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'issues',
            title: 'Known Issues & Quirks',
            content: null,
        },
        {
            id: 'geopolitics',
            title: 'The Geopolitical Context',
            subtitle: 'Open Weights from China: Implications and Considerations',
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
        reason: 'Pre-pipeline report: 4 uncited sections, 7 benchmark entries lack per-entry sources, no author/updatedAt',
        flaggedAt: '2026-07-14',
    },
    governance: {
        lastUpdated: '2026-01-27',
        dataSources: [
            {
                type: 'official',
                url: 'https://www.kimi.com/blog/kimi-k2-5.html',
                description: 'Kimi K2.5 Launch Blog',
            },
            {
                type: 'community',
                url: 'https://huggingface.co/moonshotai/Kimi-K2.5',
                description: 'HuggingFace Model Card',
            },
        ],
        confidence: {
            overall: 85,
            pricing: 100,
            benchmarks: 85, // Community verified but new
            features: 90,
        },
    },
}
