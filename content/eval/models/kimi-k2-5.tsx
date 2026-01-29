import type { ModelLinkTypeId } from '@/lib/models/link-types'
import type { ModelProfile } from '@/lib/models/types'
import { MODEL_LINK_TYPES } from '@/lib/models/link-types'
import { AbbrSidenote } from '@/components/shared/sidenote'

const kimiK25Links: Partial<Record<ModelLinkTypeId, string>> = {
    weights: 'https://huggingface.co/moonshotai/Kimi-K2.5',
    github: 'https://github.com/MoonshotAI/Kimi-K2',
    docs: 'https://www.kimi.com/blog/kimi-k2-5.html',
    api: 'https://platform.moonshot.ai/',
    pricing: 'https://platform.moonshot.ai/docs/pricing/chat',
    playground: 'https://kimi.moonshot.cn/',
}

export const kimiK25Model: ModelProfile = {
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
    pricingData: {
        baseModel: { name: 'Kimi K2.5 (Cache Hit)', input: 0.15, output: 3.0 },
        competitors: [
            { name: 'Kimi K2.5 (Cache Miss)', input: 0.6, output: 3.0 },
            { name: 'Claude 4.5 Opus', input: 15.0, output: 75.0 },
            { name: 'GPT-5.2', input: 10.0, output: 30.0 },
            { name: 'Gemini 3 Pro', input: 7.0, output: 21.0 },
        ],
    },
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
            content: 'The AI landscape in early 2026 has reached an inflection point. The race for bigger models with more parameters is giving way to a new paradigm: orchestrated intelligence. Kimi K2.5 embodies this shift. While GPT-5.2 and Claude 4.5 Opus continue to push the boundaries of abstract reasoning, Kimi has carved out a different territory entirely—one where the model acts less like a conversationalist and more like a project manager, delegating work to specialized sub-agents that operate in parallel. This matters because most real-world problems are not linear. Researching 50 products, analyzing sentiment across thousands of reviews, or debugging a complex codebase involves tasks that can—and should—happen simultaneously. Kimi\'s Agent Swarm architecture makes this not just possible but economical. At $0.15 per million tokens on cache hits, Moonshot has effectively commoditized what was previously the domain of expensive, custom-built agent frameworks. For startups and enterprises alike, this changes the calculus of automation: complex multi-step workflows that once required teams of engineers can now be orchestrated by a single API call.',
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
            content: 'The Agent Swarm operates as a hierarchical system with clear separation of concerns. When you submit a prompt, the Orchestrator—the main Kimi K2.5 instance—analyzes the request and decomposes it into discrete sub-tasks. For each sub-task, it can instantiate up to 100 ephemeral sub-agents that execute in parallel. These sub-agents are not persistent; they are spun up to perform specific operations like web searches, code execution, or data retrieval, then terminated once their output is returned. This architecture enables massive horizontal scaling of inference. Consider a task like analyzing sentiment across 50 product reviews: a traditional model would process them sequentially, while Kimi dispatches 50 sub-agents simultaneously. The Orchestrator then aggregates these streams into a coherent final response. The system supports up to 1,500 tool calls per session—far beyond what most models can handle—through sophisticated context management that summarizes sub-agent trajectories before feeding them back to the main instance. This design reduces end-to-end task latency by 4.5x compared to single-agent setups, fundamentally changing the economics of complex automation.',
        },
        {
            id: 'parl-training',
            title: 'Parallel-Agent Reinforcement Learning (PARL)',
            subtitle: 'How Kimi Learned to Think in Parallel',
            variant: 'advanced',
            content: 'Standard reinforcement learning from human feedback (RLHF) rewards models for generating single high-quality responses. PARL takes a fundamentally different approach, training Kimi to act as an orchestrator from the ground up. The methodology uses staged reward shaping to prevent a critical failure mode called "serial collapse"—where models default to sequential execution despite having parallel capacity. In early training stages, Kimi is explicitly rewarded for identifying sub-tasks that can run in parallel. This conditions the model to view complex prompts as dependency graphs rather than linear sequences. As training progresses, the reward signal shifts toward global task success, ensuring parallel outputs are effectively aggregated. The result is a model that naturally decomposes problems into parallelizable components without explicit prompting. This training philosophy is what enables Kimi\'s 4.5x latency reduction on complex tasks; it is not just running faster, it is thinking differently about how work should be structured.',
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
            content: 'Kimi\'s Mixture-of-Experts architecture is the foundation that makes its trillion-parameter scale economically viable. With 384 distinct experts and a top-8 routing mechanism, the model activates only 32 billion parameters per token despite having access to a trillion total. This 30:1 compression ratio is what allows Kimi to deliver frontier-level performance without frontier-level inference costs. The architecture includes one shared expert that is always activated, serving as a stabilizing anchor for reasoning consistency while specialized experts handle domain-specific nuances. The 61-layer depth—with a hidden dimension of 7168—enables high-dimensional feature spaces that can distinguish subtle semantic differences in complex instruction-following tasks. This granular expert routing, combined with rigorous load balancing, prevents the "expert collapse" problem where MoE models over-rely on a few experts while ignoring others. The result is a model that can access encyclopedic breadth without the latency penalties of dense trillion-parameter architectures.',
        },
        {
            id: 'mla-context',
            title: 'Multi-Head Latent Attention (MLA)',
            subtitle: 'Compressing 256K Tokens into Memory',
            variant: 'advanced',
            content: 'Managing the Key-Value (KV) cache—the memory storing attention weights for past tokens—is the primary constraint on context length in large language models. Standard Multi-Head Attention scales linearly with context length, making ultra-long contexts prohibitively expensive in VRAM. Kimi\'s Multi-Head Latent Attention (MLA) solves this by compressing the KV cache into a low-rank latent vector. This compression enables Kimi to support a 256,000-token context window while maintaining inference throughputs that remain economically viable. The operational implications extend beyond simple long-document processing. MLA is what allows the Agent Swarm to hold massive amounts of state information—such as intermediate results from 100 parallel searches—without suffering the catastrophic memory bloat that would cripple standard dense models. For agentic workflows where context is repeatedly queried and updated, this efficiency is not an optimization; it is an enabler.',
        },
        {
            id: 'muon-optimizer',
            title: 'The Muon Optimizer',
            subtitle: 'Zero Training Instability at Trillion Scale',
            variant: 'advanced',
            content: 'Training sparse models at trillion-parameter scale introduces significant instability risks. Gradient updates across hundreds of experts can become unbalanced, leading to training divergence or expert collapse. Moonshot AI employed the Muon optimizer at unprecedented scale to address these challenges. Muon is specifically designed for the non-convex optimization landscapes typical of MoE architectures, ensuring gradient updates remain balanced across all 384 experts. The technical report notes "zero training instability"—a remarkable achievement for a model of this magnitude. This stability suggests Moonshot has solved the expert collapse problem through rigorous load balancing and optimizer tuning. The implications go beyond Kimi itself; demonstrating stable trillion-parameter training opens the door for even larger sparse architectures that can maintain efficiency while scaling knowledge capacity.',
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // MULTIMODAL SECTIONS — MoonViT & Visual Coding
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'moonvit-encoder',
            title: 'Native Multimodality: MoonViT',
            subtitle: 'A 400M Parameter Vision Encoder Built In',
            hasBenchmarks: true,
            content: 'Unlike earlier multimodal models that bolted vision encoders onto pre-trained text models—creating modality gaps where text backbones struggled to interpret visual nuances—Kimi K2.5 is natively multimodal. It was pre-trained on approximately 15.5 trillion mixed visual and text tokens, ensuring its reasoning capabilities are grounded in visual data from the start. The MoonViT encoder, at 400 million parameters, is compact compared to the trillion-parameter text backbone but highly efficient. It processes video streams and high-resolution screenshots with minimal latency, enabling what Moonshot calls "Visual Coding": generating functional code directly from UI designs or video workflows without intermediate text descriptions. This joint pre-training approach means Kimi does not just see images; it understands them in the context of actionable outputs. The result is superior performance on document understanding benchmarks like InfoVQA (92.6%) where visual-text integration is critical.',
        },
        {
            id: 'visual-coding',
            title: 'Visual Coding',
            subtitle: 'From Screenshots to Working Code',
            content: 'Visual Coding leverages Kimi\'s native multimodality to bridge the gap between design and implementation. A developer can share a screenshot of a UI mockup or a video demonstrating a workflow, and Kimi generates functional code that replicates what it sees—no intermediate text description required. This capability transforms how frontend development and UI automation are approached. Instead of writing detailed specifications, teams can iterate visually: show Kimi the current state, describe the desired change, and receive updated code. The MoonViT encoder\'s efficiency means this process happens with minimal latency, making it practical for interactive development workflows. For legacy system modernization, Kimi can analyze screenshots of existing applications and generate equivalent modern implementations. This is particularly valuable for organizations maintaining aging codebases where documentation is sparse but visual references are abundant.',
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
            content: 'Moonshot\'s pricing strategy is deliberately disruptive. At $0.15 per million input tokens on cache hits, Kimi undercuts Western frontier models by 10-20x. For agentic applications where context—codebases, legal documents, novels—is static but queried repeatedly, this cache-hit pricing is transformative. A developer can run 20 iteration loops with Kimi for the cost of one loop with Claude 4.5 Opus. This changes the economics of autonomous workflows. "Agentic loops" where an AI runs for hours debugging and iterating become feasible at scale. A startup can run thousands of complex Kimi Swarm queries for the price of a few dozen high-end Claude queries. The pricing structure also incentivizes efficient context management: cache misses cost $0.60 per million tokens, still competitive but 4x higher. Organizations that structure their prompts to maximize cache hits unlock the full value proposition.',
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
            content: 'Kimi Code is Moonshot\'s terminal-based CLI agent, positioned as a direct competitor to Cursor and Claude Code. It integrates with VSCode, Cursor, and Zed through the Model Context Protocol (MCP), allowing connections to local tools and databases. Where Kimi Code differentiates itself is Visual Debugging: because of the native MoonViT encoder, a developer can show Kimi a screenshot of a broken UI, and the CLI agent inspects the code and generates fixes based on the visual discrepancy. This addresses a blind spot for text-dominant coding agents that cannot perceive the gap between intended and actual rendering. Early reviews suggest Kimi Code excels at rapid iteration but occasionally struggles with tool calling reliability in complex refactoring scenarios, sometimes hallucinating file paths or syntax. For teams already using Kimi\'s API, the CLI provides a natural extension of their workflow into the development environment, with the same cost advantages that make Kimi attractive for other agentic applications.',
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // COMPARATIVE ANALYSIS
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'vs-gpt-5-2',
            title: 'Kimi vs. GPT-5.2',
            subtitle: 'The Doer vs. The Thinker',
            content: 'The comparison between Kimi and GPT-5.2 reveals the central divergence in 2026 AI capabilities. GPT-5.2 has achieved saturation in abstract mathematical reasoning, scoring 100% on AIME 2025. For closed-system logic puzzles and theoretical derivations, it is effectively unrivaled. Kimi, scoring 49-70% on the same benchmark, cannot compete in raw unassisted "IQ." However, the dynamic reverses on Humanity\'s Last Exam (HLE), a benchmark designed for real-world agentic problem-solving. Here Kimi (50.2%) outperforms GPT-5.2 (45.5%) when tools are permitted. GPT-5.2 is the superior Professor, capable of perfect theoretical recall; Kimi is the superior Contractor, better at using search, code execution, and external data to solve messy, unstructured problems. For enterprise deployment, this distinction is crucial: most business problems resemble HLE—requiring research and synthesis—more than AIME—requiring proof derivation. Choose GPT-5.2 for theoretical analysis; choose Kimi for applied execution.',
        },
        {
            id: 'vs-claude-opus',
            title: 'Kimi vs. Claude 4.5 Opus',
            subtitle: 'The Coding Battleground',
            content: 'Claude 4.5 Opus remains the premier Software Engineer, holding the SWE-bench Verified record at 80.9% versus Kimi\'s 76.8%. For autonomous GitHub issue resolution and precision engineering, Claude maintains a clear edge. But the economic analysis fundamentally alters this comparison. Claude 4.5 Opus carries premium inference costs estimated at $15 per million input tokens—100x Kimi\'s cache-hit rate. For agentic coding workflows requiring repeated codebase ingestion, Kimi is orders of magnitude cheaper. A developer can run 20 iteration loops with Kimi for the cost of one loop with Claude. This creates a natural division of labor: Claude 4.5 Opus for final review and high-stakes precision work; Kimi for iterative drafting, self-healing code loops, and rapid prototyping. Teams are increasingly adopting this hybrid approach, using Kimi to explore solution spaces cheaply before engaging Claude for critical validation.',
        },
        {
            id: 'vs-gemini-pro',
            title: 'Kimi vs. Gemini 3 Pro',
            subtitle: 'The Multimodal Context War',
            content: 'Gemini 3 Pro dominates the LMSYS Chatbot Arena with a 1490 Elo, leveraging effectively infinite context windows and deep Google infrastructure integration. For general consumer queries involving long-form video or massive audio files, Gemini retains advantages in sheer scale. Yet Kimi\'s native multimodal encoder delivers surprising competitiveness. On InfoVQA—document understanding requiring visual-text integration—Kimi scores 92.6% versus Gemini\'s 57.2%. This counter-intuitive result stems from Kimi\'s specific optimization for business document processing and UI understanding. For enterprise workflows involving PDFs, forms, and application interfaces, Kimi outperforms the generalist leader. However, users report Kimi\'s Thinking mode shows hallucination issues beyond 32K tokens, whereas Gemini\'s context handling remains robust at extreme lengths. The choice depends on use case: Gemini for open-ended multimedia exploration; Kimi for targeted document and interface analysis at fraction of the cost.',
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // COMMUNITY & SENTIMENT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'lmsys-arena',
            title: 'LMSYS Chatbot Arena Deep Dive',
            subtitle: 'Where Kimi Ranks Among the Titans',
            content: 'As of January 2026, the Arena leaderboard shows a compression at the frontier. Tier 1 includes Gemini 3 Pro (1490) and Grok 4.1 Thinking (1477). Tier 2 features Claude Opus 4.5 (1470) and Kimi K2 Thinking (~1438). Kimi occupies a solid Tier 2 position, trading blows with Claude Sonnet 4.5 Thinking. The data reveals strong user preference for models displaying "Thinking" processes—internal monologues that Kimi has integrated deeply. The 52-point gap between Kimi and the leader is noticeable but not disqualifying, especially given the cost differential. Arena users praise Kimi\'s responsiveness on Hard Prompts but penalize occasional refusals or logic errors in extremely long multi-turn conversations compared to Gemini. This feedback aligns with known limitations: Kimi excels at parallel task decomposition but can struggle with extended coherent reasoning beyond certain context thresholds.',
        },
        {
            id: 'open-weights-reality',
            title: 'The Open Weights Reality Check',
            subtitle: 'Can You Actually Run It Locally?',
            content: 'Kimi K2.5\'s release under a Modified MIT License triggered excitement across the open-source community, followed by sobering hardware reality. The 1T parameter count (32B active) makes local inference accessible only to those with enterprise-grade infrastructure—clusters of H100s or massive RAM pools. Community members note that even a quantized Q4 version would require setups costing north of $20,000. For 99% of the open-source community, Kimi is effectively an API model, not a "run on my laptop" model. This creates a tension: the weights are open, but the barrier to entry remains prohibitive. The practical effect is that most users interact with Kimi through Moonshot\'s API or third-party providers, similar to how they would use proprietary models. The open-weights release matters more for enterprises and research institutions that can self-host for compliance or customization, and for the ecosystem of fine-tuning and derivative models that will emerge as quantization techniques improve.',
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
            content: 'An unexpected adoption pattern has emerged in creative writing and roleplay communities. Users on r/SillyTavernAI and related forums explicitly favor Kimi over Western models they describe as "sanitized," "preachy," or suffering from "GPT-isms"—repetitive, sterile sentence structures. Kimi is praised for having "100x more creativity" and being less prone to moralizing refusals in fiction writing. The native multimodal capabilities enable new forms of immersive roleplay: users report scenarios where Kimi "sees" character avatars or scene images and dynamically adjusts narrative descriptions to match visual details—a level of grounding text-only models cannot achieve. In this niche, Kimi ranks above Gemini and GPT-5 but slightly below Claude Sonnet 4.5, which remains the gold standard for prose quality. However, Kimi\'s dramatically lower cost makes it the practical choice for high-volume creative users who generate thousands of tokens per session.',
        },

        // ═══════════════════════════════════════════════════════════════════════════
        // LIMITATIONS & VERDICT
        // ═══════════════════════════════════════════════════════════════════════════

        {
            id: 'issues',
            title: 'Known Issues & Quirks',
            content: 'Kimi K2.5 has documented limitations that users should understand. First, hallucination issues emerge in Thinking mode when context exceeds approximately 32K tokens—well below the advertised 256K limit. This suggests the MLA compression, while efficient, may trade precision for capacity at extreme lengths. Second, tool calling reliability lags behind Claude in complex refactoring scenarios. Users report occasional hallucinations of file paths or syntax errors when performing multi-file operations. Third, the stealth release pattern—where models appeared on the website before official announcements—raised questions about testing rigor. Fourth, abstract mathematical reasoning trails significantly behind GPT-5.2, making Kimi unsuitable for tasks requiring pure theoretical derivation. Finally, while the open-weights release is welcome, the Modified MIT License includes clauses that may concern enterprises regarding derivative works and redistribution. These limitations do not negate Kimi\'s strengths but define the boundaries of appropriate use cases.',
        },
        {
            id: 'geopolitics',
            title: 'The Geopolitical Context',
            subtitle: 'Open Weights from China: Implications and Considerations',
            content: 'Kimi K2.5 arrives at a complex moment in US-China AI dynamics. As a Chinese-developed model released with open weights, it represents a significant contribution to the global AI ecosystem while raising questions that enterprises must navigate. The Modified MIT License, while permissive, includes clauses that differ from standard open-source frameworks, potentially affecting derivative works and redistribution. For organizations in regulated industries, data residency and sovereignty questions arise: using Kimi\'s API means data flows to Moonshot\'s infrastructure. However, the open-weights nature enables self-hosting for entities with sufficient hardware, addressing some compliance concerns. The model\'s release also signals that the capability gap between US and Chinese AI research has narrowed significantly in applied agency, even if fundamental research leadership remains contested. For enterprises evaluating Kimi, the calculus involves weighing cost advantages and technical capabilities against geopolitical risk assessments that vary by industry and jurisdiction.',
        },
        {
            id: 'verdict',
            title: 'The Verdict',
            content: 'Kimi K2.5 marks a pivotal moment: the commoditization of agentic intelligence. While GPT-5.2 remains the Scientist for abstract reasoning and Claude 4.5 Opus the Engineer for precision software work, Kimi has claimed the mantle of Universal Agent. Use Kimi when your work involves researching, browsing, aggregating, and drafting—tasks that benefit from parallel execution and external tool use. Use it when cost efficiency matters: the $0.15 cache-hit pricing enables agentic workflows that would be economically impossible with frontier competitors. Use it for visual coding, document understanding, and any scenario where UI-to-code translation accelerates development. Do not use Kimi for pure mathematical derivation, tasks requiring extreme context coherence beyond 32K tokens, or situations where tool-calling reliability is paramount—Claude remains superior for critical refactoring. The open-weights release matters most for enterprises seeking customization and compliance flexibility, though hardware requirements mean most users will interact via API. Kimi is not just another model; it is a blueprint for the swarm era of AI.',
        },
    ],
}
