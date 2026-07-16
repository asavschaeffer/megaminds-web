# Research Dispatch: Zhipu AI / Z.ai — GLM-5 Generation (incl. "GLM 5.2")

**As of July 14, 2026.** Raw sourced material for later authoring — not a finished report. Every claim below carries an inline source link; anything I could not verify is marked **unverified** or `TODO(research)`.

## 0. Does "GLM 5.2" exist? — Yes, confirmed real

The user's reference checks out. **GLM-5.2 is a real, shipped model** from Zhipu AI (international brand: **Z.ai**), not a hallucination-prone name. It is the third release in the GLM-5 line:

- **GLM-5** — released February 11–12, 2026 (sources differ by a day) ([Presenc AI lineage](https://presenc.ai/research/zhipu-glm-model-lineage-2026), [Wikipedia: Z.ai](https://en.wikipedia.org/wiki/Z.ai)). ~745B total / ~44B active parameter MoE ([search aggregation citing glm-5.org and glm5.net](https://glm-5.org/)).
- **GLM-5.1** — subscription release March 2026, open-sourced (MIT) April 7–8, 2026; API prices reportedly rose ~10% at this release ([Wikipedia: Z.ai](https://en.wikipedia.org/wiki/Z.ai), [Presenc AI](https://presenc.ai/research/zhipu-glm-model-lineage-2026)).
- **GLM-5.2** — the current flagship. Rolled out in stages: available to **GLM Coding Plan** subscribers on **June 13, 2026**; standalone API access, the Z.ai chatbot, open-source MIT-licensed weights, and published benchmarks followed on **June 16, 2026** ([Z.ai blog: "GLM-5.2: Built for Long-Horizon Tasks"](https://z.ai/blog/glm-5.2), [Digital Applied](https://www.digitalapplied.com/blog/glm-5-2-zai-flagship-coding-plan-release), [Wikipedia: Z.ai](https://en.wikipedia.org/wiki/Z.ai)).

No "GLM-6" or later point release (e.g. "GLM-5.3") turned up in searches as of this dateline — GLM-5.2 is Zhipu's current frontier model. **Confidence: high** on existence/timeline; **medium** on the exact Feb 11 vs Feb 12 / June 13 vs June 16 day-level discrepancies since secondary sources disagree by a day.

---

## 1. Structured output & function calling (priority focus)

### What Z.ai claims

- Z.ai's own GLM-5.2 docs list **Function Calling** ("Powerful tool invocation capabilities, enabling integration with various external toolsets") and **Structured Output** ("JSON and other structured formats supported") as first-class capabilities, alongside MCP (Model Context Protocol) tool integration ([docs.z.ai/guides/llm/glm-5.2](https://docs.z.ai/guides/llm/glm-5.2)).
- The separate Z.ai **Structured Output** guide describes a `response_format={"type": "json_object"}` JSON-mode parameter (OpenAI-compatible), with support for typed schemas (string/number/boolean/array/object, `required`, enums, nested objects, `additionalProperties`, min/max constraints) ([docs.z.ai/guides/capabilities/struct-output](https://docs.z.ai/guides/capabilities/struct-output)). **Caveat (unverified currency):** the models explicitly listed as supporting structured output on that page at fetch time were `glm-5`, `glm-4.7`, `glm-4.6`, and `glm-4.5` — **GLM-5.2 was not named on that specific list**, even though the GLM-5.2 model page separately advertises structured-output support. This looks like a documentation lag rather than an actual gap, but treat "GLM-5.2 + strict JSON schema mode" as **unverified** pending a source that names 5.2 explicitly on the structured-output page.
- Z.ai's migration/API guide covers `thinking` mode toggling, `reasoning_effort`, streaming, and tool-streaming parameters relevant to agent harnesses ([MarkTechPost hands-on API guide](https://www.marktechpost.com/2026/06/22/glm-5-2-openai-compatible-api-a-hands-on-guide-to-reasoning-effort-function-calling-and-long-context-retrieval/)).
- DataCamp's technical writeup states GLM-5.2 "natively parses and supports standard **Anthropic `tools` and `tool_choice` parameter schemas**," intended to enable "multi-step filesystem operations, shell execution, and custom tools out of the box" ([DataCamp: GLM-5.2](https://www.datacamp.com/blog/glm-5-2)) — this is a secondary source, not confirmed on Z.ai's own docs pages fetched for this dispatch.
- models.dev's provider aggregation lists "tools, reasoning, structured, temperature" as supported capability flags across all 64 tracked providers of GLM-5.2 ([models.dev/models/zhipuai/glm-5.2](https://models.dev/models/zhipuai/glm-5.2/)).

### Benchmark evidence

- **No official BFCL (Berkeley Function-Calling Leaderboard) score specifically for GLM-5.2 was found.** Extensive search turned up BFCL v3 scores for the **prior** generation — GLM-4.5 reportedly scored **77.8%** on BFCL v3 in one source and **76.7%** ("leading the leaderboard" as of June 29, 2026) in another ([layerlens.ai aggregation](https://layerlens.ai/blog/glm-5-benchmark-review); [pricepertoken BFCL v3 leaderboard](https://pricepertoken.com/leaderboards/benchmark/bfcl-v3)) — but neither source pins a GLM-5.2-specific BFCL number. **Mark as `TODO(research)`**: GLM-5.2's own BFCL score was not locatable via search at this dateline; the closest agentic/tool-use proxy found was:
  - **Tau2-Bench: 75.61%** — reported for GLM-5 (not confirmed if this figure is 5.0 or updated for 5.2) via a third-party aggregator ([layerlens.ai](https://layerlens.ai/blog/glm-5-benchmark-review)) — **unverified**, no primary-source confirmation.
  - **MCP-Atlas: 76.8** and **Tool-Decathlon: 48.2** — agentic/tool-use benchmark figures appearing on the GLM-5.2 Hugging Face model card ([huggingface.co/zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)). These are Zhipu-published (primary-source-adjacent, via the model repo) but I could not independently verify the benchmark methodology or find corroboration from an independent evaluator.

### Reliability in practice — mixed, with concrete failure reports

Real-world tool-calling reliability looks noticeably weaker than the marketing copy suggests, based on multiple independent bug reports from different integration surfaces:

- **Cursor IDE forum:** "GLM 5.2 MAX stopped handling tool calls" — tool calls such as grep/read/file-search silently fail to execute in Agent Mode ([Cursor Community Forum](https://forum.cursor.com/t/glm-5-2-max-stopped-handling-tool-calls/165275)).
- **Cursor IDE forum (separate thread):** "Built-in GLM 5.2 intermittently prints raw tool-call markup instead of invoking Agent tools" — the model sometimes emits the tool-call syntax as literal text rather than triggering the tool ([Cursor Community Forum](https://forum.cursor.com/t/built-in-glm-5-2-intermittently-prints-raw-tool-call-markup-instead-of-invoking-agent-tools/165202)).
- **Cursor IDE forum (third thread):** "GLM 5.2: Tool calls terminate chats" — every tool call causes the chat session to end after printing raw markup ([Cursor Community Forum](https://forum.cursor.com/t/glm-5-2-tool-calls-terminate-chats/165182)).
- **GitHub, charmbracelet/crush #3153:** Hard crash on GLM-4.6/5.2 via Fireworks — tool-call `arguments` rejected as invalid JSON, killing the session ([GitHub issue](https://github.com/charmbracelet/crush/issues/3153)).
- **GitHub, vllm-project/vllm #48095:** "GLM 5.2 forced toolcall left unparsed in content (glm 4.7 tool parser)" — when `tool_choice: required` is set, the tool call fails to parse into `tool_calls` and instead appears as raw output content; reported to work correctly with `tool_choice: auto` ([GitHub issue](https://github.com/charmbracelet/vllm-project/issues/48095) — note: filed against vLLM's GLM tool-call parser, so this may be a serving-stack integration bug rather than a model-inherent flaw).
- Independent security-tooling vendor **Semgrep** ran GLM-5.2 (via a basic Pydantic AI harness) on an IDOR vulnerability-detection task and measured **39% F1**, beating "Claude Code (32%)" in their comparison at roughly **$0.17 per vulnerability found**, while trailing Semgrep's own custom multimodal harnesses built on GPT-5.5 (61%) and Opus 4.8 (53%) ([Semgrep blog: "We have Mythos at home"](https://semgrep.dev/blog/2026/we-have-mythos-at-home-glm-52-beats-claude-in-our-cyber-benchmarks/)). This is a genuine independent third-party evaluation and reasonably strong evidence GLM-5.2 can drive tool-using agentic workflows competently when the harness is well-built — but Semgrep itself caveats that results are "limited to one task and dataset."

### Verdict for the Model Picker (structured output recommendation)

**Mixed / conditional yes.** GLM-5.2 has genuine, documented JSON-mode and function-calling support at the API level (OpenAI-compatible `response_format` and `tools`/`tool_choice` schemas), and at least one independent evaluator (Semgrep) got usable, cost-effective agentic tool-use out of it. However, multiple independent bug reports (Cursor forum, vLLM, crush) describe concrete tool-call parsing failures, session-terminating crashes on malformed JSON arguments, and `tool_choice: required` mis-parsing — these are serving/integration-layer issues in some cases, but they are frequent enough across different platforms to warrant caution. **Recommendation for the site:** list GLM-5.2 as a *budget-tier, conditionally credible* structured-output option — strong on paper and in well-engineered harnesses, but developers should test their specific serving stack (vLLM/SGLang/Fireworks/first-party API) for tool-call JSON reliability before depending on it in production, and a hard BFCL score for GLM-5.2 itself remains unconfirmed (`TODO(research)`). **Confidence: medium.**

---

## 2. Specs: architecture, context, modalities, license

| Spec | GLM-5.2 | Source |
|---|---|---|
| Architecture | Sparse Mixture-of-Experts (MoE), with a new "**IndexShare**" sparse-attention technique that reuses indexers across layers | [Z.ai blog](https://z.ai/blog/glm-5.2), [Hugging Face model card](https://huggingface.co/zai-org/GLM-5.2) |
| Total parameters | ~753B (also reported as ~744B by some secondary sources — figures vary slightly by source) | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2); cf. [trendingtopics.eu](https://www.trendingtopics.eu/glm-5-2-chinas-zhipu-ai-beats-even-googles-top-models-with-its-new-open-llm/) |
| Active parameters | ~40B per token | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2), [trendingtopics.eu](https://www.trendingtopics.eu/glm-5-2-chinas-zhipu-ai-beats-even-googles-top-models-with-its-new-open-llm/) |
| Context window | 1,000,000 tokens ("truly usable" 1M, per Z.ai) | [Z.ai blog](https://z.ai/blog/glm-5.2), [docs.z.ai](https://docs.z.ai/guides/llm/glm-5.2) |
| Max output tokens | 128K (128,000) per docs.z.ai; 131,072 per models.dev — effectively the same figure (128K = 131,072) | [docs.z.ai](https://docs.z.ai/guides/llm/glm-5.2), [models.dev](https://models.dev/models/zhipuai/glm-5.2/) |
| Modalities | Text in / text out only (no native image/audio I/O confirmed for GLM-5.2 itself — vision is a separate "V" line, e.g. GLM-4.5V/4.6V) | [docs.z.ai](https://docs.z.ai/guides/llm/glm-5.2) |
| Thinking/reasoning modes | Multiple configurable "thinking" / reasoning-effort modes (e.g., "High," "Max") | [docs.z.ai](https://docs.z.ai/guides/llm/glm-5.2), [DataCamp](https://www.datacamp.com/blog/glm-5-2) |
| License | **MIT** — fully open weights, no regional restrictions, unrestricted commercial use | [Hugging Face model card](https://huggingface.co/zai-org/GLM-5.2), [Wikipedia: Z.ai](https://en.wikipedia.org/wiki/Z.ai) |
| Weights availability | Published on Hugging Face (`zai-org/GLM-5.2`); BF16/F32, safetensors format; deployable via vLLM, SGLang, Transformers, KTransformers, Unsloth, and Ascend NPU platforms | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2) |
| Speculative decoding | Improved MTP (multi-token prediction) layer, claimed up to 20% higher acceptance length | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2) |
| Efficiency claim | IndexShare reduces per-token FLOPs by ~2.9x at 1M context length (Z.ai's own claim) | [Z.ai blog](https://z.ai/blog/glm-5.2), [Hugging Face](https://huggingface.co/zai-org/GLM-5.2) |

Local hardware reality check (community-sourced, not vendor spec): running full-precision GLM-5.2 locally requires very large RAM/VRAM footprints. One Hacker News commenter (`walrus01`) suggested a used Dell R640 dual-Xeon 18-core server with 1TB RAM (~$6,000) as a CPU-inference entry point; another (`easygenes`) argued that estimate "underestimates the memory needed to run with a reasonable amount of context," recommending 4x DGX Spark boxes or 4x RTX PRO 6000 GPUs for practical throughput; a third (`sgc`) discussed 4-bit quantization still needing roughly 714GB+ RAM ([Hacker News thread](https://news.ycombinator.com/item?id=48594012)). **Confidence: high** on official specs; **medium** on the exact total-parameter figure (744B vs 753B disagreement between sources).

---

## 3. Pricing

### Official Z.ai API pricing (per docs.z.ai)

| Model | Input ($/1M tok) | Output ($/1M tok) | Cached input ($/1M tok) |
|---|---|---|---|
| **GLM-5.2** | $1.40 | $4.40 | $0.26 (cached-input storage listed as "limited-time free") |
| GLM-5 | $1.00 | $3.20 | $0.20 |

Source: [docs.z.ai/guides/overview/pricing](https://docs.z.ai/guides/overview/pricing).

### Third-party API providers (GLM-5.2)

- **OpenRouter:** reported around **$0.93/M input, $3/M output** at time of search, with cheapest-provider input pricing having fallen ~33.6% (from $1.40 to $0.93) over the prior ~90 days as competition among re-sellers increased ([OpenRouter model page](https://openrouter.ai/z-ai/glm-5.2), summarized via search).
- **Requesty:** ~$1.40/M input, $4.40/M output (matches Z.ai first-party pricing) ([Requesty](https://www.requesty.ai/models/zai/glm-5.2)).
- Free tiers reported (unverified beyond aggregator claims) via Alibaba Token Plan, Kenari, Nvidia, UnoRouter, and ZenMux ([models.dev](https://models.dev/models/zhipuai/glm-5.2/)) — treat as **unverified**, not confirmed directly on each provider's own pricing page.

### Subscription / chat access (GLM Coding Plan)

| Tier | Monthly | Annual (per-month equiv.) |
|---|---|---|
| Lite | $18 | $12.60 |
| Pro | $72 | $50.40 |
| Max | $160 | $112 |

Source: secondary aggregator ([Lushbinary: GLM 5.2 API & Pricing Guide](https://lushbinary.com/blog/glm-5-2-api-pricing-glm-coding-plan-guide/)) — **not independently cross-checked against Z.ai's own subscription page in this pass; mark as medium confidence.** GLM-5.2 was made available to existing Coding Plan subscribers at launch (June 13, 2026) before the standalone API opened ([Digital Applied](https://www.digitalapplied.com/blog/glm-5-2-zai-flagship-coding-plan-release)).

### Cost comparison vs. contemporaries

Reporting frames GLM-5.2 as dramatically cheaper than closed frontier models: one outlet describes it rivaling "Opus 4.8 on coding benchmarks at a fifth of the cost" ([Technology.org](https://www.technology.org/2026/07/02/zhipus-glm-5-2-rivals-opus-4-8-on-coding-benchmarks-at-a-fifth-of-the-cost/) — full article body returned HTTP 403 on fetch, so this claim rests on the headline/search-snippet only, **unverified in detail**); VentureBeat's headline claims GLM-5.2 "beats GPT-5.5 on multiple long-horizon coding benchmarks for 1/6th the cost" ([VentureBeat](https://venturebeat.com/technology/z-ais-open-weights-glm-5-2-beats-gpt-5-5-on-multiple-long-horizon-coding-benchmarks-for-1-6th-the-cost) — this fetch returned HTTP 429, so likewise the claim is sourced from the headline/search index only, **unverified in detail**, `TODO(research)`: re-fetch when rate limit clears). For reference, GPT-5.5 and Claude Opus were reported elsewhere at roughly $5/M input, $25–30/M output ([search-aggregated pricing summary](https://www.trendingtopics.eu/glm-5-2-chinas-zhipu-ai-beats-even-googles-top-models-with-its-new-open-llm/)) — consistent with GLM-5.2 being priced at roughly one-fifth to one-sixth of those per-token rates. **Confidence: high** on Z.ai's own list pricing; **low-medium** on the exact "1/5th" and "1/6th" cost-ratio headline claims since the source articles themselves could not be fully fetched.

---

## 4. Benchmarks vs. contemporaries

| Benchmark | GLM-5.2 | GLM-5.1 | Claude Opus 4.8 | GPT-5.5 | Gemini 3.1 Pro | Source |
|---|---|---|---|---|---|---|
| SWE-bench Pro | 62.1% | 58.4% | — | 58.6% | 54.2% | [DataCamp](https://www.datacamp.com/blog/glm-5-2) |
| Terminal-Bench 2.1 | 81.0 (also reported 82.7 in one source) | ~62–63.5 | 85.0 | — | lower (unspecified) | [docs.z.ai summary](https://docs.z.ai/guides/llm/glm-5.2), [DataCamp](https://www.datacamp.com/blog/glm-5-2) |
| Artificial Analysis Intelligence Index v4.1 | 51 | — | — | — | 46 (3.1 Pro Preview) / 50 (3.5 Flash) | [search-aggregated](https://www.trendingtopics.eu/glm-5-2-chinas-zhipu-ai-beats-even-googles-top-models-with-its-new-open-llm/), [Artificial Analysis](https://artificialanalysis.ai/models/glm-5-2) |
| vs. MiniMax-M3 / DeepSeek V4 Pro / Kimi K2.6 (Intelligence Index) | 51 vs. 44 / 44 / 43 | — | — | — | — | [search-aggregated](https://www.trendingtopics.eu/glm-5-2-chinas-zhipu-ai-beats-even-googles-top-models-with-its-new-open-llm/) |
| Output speed | 183.3 tok/s (Artificial Analysis) | — | — | — | — | [Artificial Analysis](https://artificialanalysis.ai/models/glm-5-2) |
| Humanity's Last Exam | 40.5 (no tools) / 54.7 (with tools) | — | 49.8 (per Claude Fable 5 dispatch, different eval) | 41.4 | 44.4 | [Hugging Face model card](https://huggingface.co/zai-org/GLM-5.2) — cross-model column not independently confirmed on same eval harness |
| AIME 2026 | 99.2 | — | — | — | — | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2) |
| GPQA-Diamond | 91.2 | — | — | — | — | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2) |
| MCP-Atlas (agentic/tool use) | 76.8 | — | — | — | — | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2) |
| Tool-Decathlon | 48.2 | — | — | — | — | [Hugging Face](https://huggingface.co/zai-org/GLM-5.2) |
| Tau2-Bench | 75.61% (GLM-5, not confirmed updated for 5.2) | — | — | — | — | [layerlens.ai](https://layerlens.ai/blog/glm-5-benchmark-review) — **unverified, secondary source** |
| FrontierSWE | trails Opus 4.8 by ~1%; ahead of GPT-5.5 and Opus 4.7 | — | ~+1% over GLM-5.2 | behind | — | [docs.z.ai summary](https://docs.z.ai/guides/llm/glm-5.2) |
| IDOR vulnerability detection (F1, Semgrep harness) | 39% | — | 53% (custom multimodal harness) | 61% (custom multimodal harness) | — | [Semgrep](https://semgrep.dev/blog/2026/we-have-mythos-at-home-glm-52-beats-claude-in-our-cyber-benchmarks/) |

**Important caveat:** these figures are pulled from a mix of Zhipu's own model card (primary-source-adjacent but self-reported) and secondary aggregator sites; I did not find a single independent, neutral benchmark suite that ran all five models (GLM-5.2, Opus 4.8, GPT-5.5, Gemini 3.1 Pro, plus DeepSeek/Kimi/MiniMax) side-by-side under identical conditions. Treat the table as directionally informative, not a controlled head-to-head. Artificial Analysis is the closest thing to a neutral third-party cross-vendor index cited here. **Confidence: medium** — self-reported numbers from Zhipu carry the usual benchmark-selection bias risk seen across the industry (cf. the "cheating"/memorization concerns documented for other frontier models in this same research-reports directory, e.g. `google-gemini.md`'s sibling dispatch on Claude Fable 5).

---

## 5. Community reception

**Positive / cost-performance praise:**

- HN user **gertlabs** (a benchmark-harness author): "GLM 5.2 is just shy of Opus 4.6 on average" in multi-agent coding tests, but "when factoring in performance/cost, GLM 5.2 is the frontier model" ([Hacker News, "GLM 5.2 beats Claude in our benchmarks"](https://news.ycombinator.com/item?id=48709670), July 2026).
- HN user **pimeys**: "Nothing felt off with GLM. It did what I wanted, was fast, had a decent not very annoying personality and was much cheaper than Opus or GPT." ([same HN thread](https://news.ycombinator.com/item?id=48709670)).
- Hacker News thread titles independently corroborate a broadly positive open-weights narrative: *"GLM-5.2 is the new leading open weights model on Artificial Analysis"* ([HN](https://news.ycombinator.com/item?id=48567759)) and *"GLM-5.2 is a step change for open agents"* ([HN](https://news.ycombinator.com/item?id=48639840)).

**Skeptical / mixed:**

- HN user **jchw**: "After having used GLM 5.2 and Opus 4.8 ... I'm very unconvinced of the benchmark maxxing claims," adding "GLM 5.2 actually scored kinda meh on a lot of benchmarks ... but my actual experience using it does not match this" (i.e., real-world experience diverged from benchmark scores, in both directions depending on task) ([HN, same thread](https://news.ycombinator.com/item?id=48709670)).
- HN user **gertlabs** also noted a caveat that cuts against naive benchmark comparison: rival model "Flash adapts much better to our custom harness with tool names that are not identical to what models were likely trained on" — implying GLM-5.2's tool-use benchmark performance is sensitive to whether tool-name conventions match its training distribution ([HN](https://news.ycombinator.com/item?id=48709670)).
- On local deployment cost/practicality, HN user **redox99** asked pointedly: "Can you really say you're running GLM 5.2 if its a 2 bit quant? It might be usable but the capabilities will definitely not be the same" ([HN, "GLM-5.2: The Most Powerful Open Model yet and the Brutal Reality of Running It"](https://news.ycombinator.com/item?id=48594012)) — several commenters on that same thread also criticized the linked article itself as padded/AI-generated-sounding, independent of the model's merits.
- Bug-tracker level sentiment (Cursor forum, GitHub) skews negative specifically on **tool-call parsing reliability** — see Section 1 for direct quotes/links; this is a recurring, concrete complaint pattern rather than one-off anecdote.

**Confidence: medium-high** on the quotes themselves (pulled via WebFetch directly from the linked HN threads and forum/GitHub pages); **low** on how representative any single quote is of overall sentiment, since I sampled a handful of threads rather than a systematic survey.

---

## 6. Known issues / limitations

1. **Tool-call / function-calling reliability bugs** across multiple serving stacks and IDE integrations — Cursor Agent Mode tool calls silently failing or printing raw markup and terminating chats; vLLM's GLM parser mis-handling `tool_choice: required`; Fireworks-served sessions hard-crashing on malformed JSON tool arguments. See Section 1 for full citations. This is the most load-bearing limitation given the dispatch's structured-output focus.
2. **Benchmark-to-real-world gap reported by users** — HN commenter jchw explicitly said benchmark scores didn't predict his hands-on experience, in both directions ([HN](https://news.ycombinator.com/item?id=48709670)).
3. **"Cheating"/memorization-style concerns are a known industry-wide risk pattern for models trained on massive public-code corpora** (documented for other frontier models, e.g. Claude Fable 5, in this same reports directory) — I found **no direct, GLM-5.2-specific study replicating this** memorization-detection methodology; flagging as a plausible but **unverified** risk (`TODO(research)`: no Endor-Labs-style audit of GLM-5.2 located).
4. **Heavy local hardware requirements** for self-hosting at full precision (multi-hundred-GB to ~1TB+ RAM/VRAM depending on quantization) — see Section 2 hardware notes; quantized deployments raise open questions about capability retention (per HN user redox99).
5. **Uneven benchmark spectrum** — one aggregator's GLM-5 breakdown (predecessor generation) showed scores ranging from 97.4% (MATH-500) down to 10.37% (Humanity's Last Exam no-tools), with the claim that "math reasoning strength does not transfer to code execution tasks" ([layerlens.ai](https://layerlens.ai/blog/glm-5-benchmark-review)) — **secondary source, GLM-5 not 5.2, unverified whether this pattern persists in 5.2** given GLM-5.2's own HLE score improved to 40.5/54.7 per the Hugging Face card.
6. **Structured-output model list currency** — Z.ai's own structured-output documentation page did not explicitly list `glm-5.2` among supported models at fetch time, despite the GLM-5.2-specific docs page claiming JSON/structured output support (see Section 1). Likely a docs lag, not a real capability gap, but worth the site's editors double-checking against current docs before publishing a firm claim.
7. **Rapid version churn** — three major/point releases (GLM-5, 5.1, 5.2) landed within about four months (Feb–June 2026), each with pricing/context/benchmark changes, meaning any published comparison risks going stale quickly. `TODO(research)`: check docs.z.ai and huggingface.co/zai-org close to publish time for a possible GLM-5.3 or successor.

---

## Source list

Primary / official:
- [Z.ai blog: "GLM-5.2: Built for Long-Horizon Tasks"](https://z.ai/blog/glm-5.2)
- [docs.z.ai/guides/llm/glm-5.2](https://docs.z.ai/guides/llm/glm-5.2)
- [docs.z.ai/guides/capabilities/struct-output](https://docs.z.ai/guides/capabilities/struct-output)
- [docs.z.ai/guides/overview/pricing](https://docs.z.ai/guides/overview/pricing)
- [Hugging Face model card: zai-org/GLM-5.2](https://huggingface.co/zai-org/GLM-5.2)
- [arXiv 2602.15763 — "GLM-5: from Vibe Coding to Agentic Engineering"](https://arxiv.org/abs/2602.15763)

Aggregators / trackers:
- [models.dev/models/zhipuai/glm-5.2](https://models.dev/models/zhipuai/glm-5.2/)
- [Artificial Analysis: GLM-5.2](https://artificialanalysis.ai/models/glm-5-2)
- [Presenc AI: Zhipu/Z.ai GLM Model Lineage 2026](https://presenc.ai/research/zhipu-glm-model-lineage-2026)
- [Wikipedia: Z.ai](https://en.wikipedia.org/wiki/Z.ai)
- [Requesty: zai/glm-5.2](https://www.requesty.ai/models/zai/glm-5.2)
- [Lushbinary: GLM 5.2 API & Pricing / Coding Plan Guide](https://lushbinary.com/blog/glm-5-2-api-pricing-glm-coding-plan-guide/)
- [DataCamp: GLM-5.2](https://www.datacamp.com/blog/glm-5-2)
- [layerlens.ai: GLM-5 Benchmarks](https://layerlens.ai/blog/glm-5-benchmark-review)
- [trendingtopics.eu: GLM-5.2 beats Google's top models](https://www.trendingtopics.eu/glm-5-2-chinas-zhipu-ai-beats-even-googles-top-models-with-its-new-open-llm/)
- [Digital Applied: GLM-5.2 Lands on Z.ai's Coding Plan](https://www.digitalapplied.com/blog/glm-5-2-zai-flagship-coding-plan-release)
- [MarkTechPost: GLM-5.2 OpenAI-Compatible API hands-on guide](https://www.marktechpost.com/2026/06/22/glm-5-2-openai-compatible-api-a-hands-on-guide-to-reasoning-effort-function-calling-and-long-context-retrieval/)
- [pricepertoken: BFCL v3 leaderboard](https://pricepertoken.com/leaderboards/benchmark/bfcl-v3)

Independent evaluation / news:
- [Semgrep: "We have Mythos at home — GLM 5.2 beats Claude in our cyber benchmarks"](https://semgrep.dev/blog/2026/we-have-mythos-at-home-glm-52-beats-claude-in-our-cyber-benchmarks/)
- [VentureBeat: GLM-5.2 beats GPT-5.5 on coding benchmarks for 1/6th cost](https://venturebeat.com/technology/z-ais-open-weights-glm-5-2-beats-gpt-5-5-on-multiple-long-horizon-coding-benchmarks-for-1-6th-the-cost) (headline-only, body returned HTTP 429)
- [Technology.org: Zhipu's GLM 5.2 rivals Opus 4.8 at a fifth of the cost](https://www.technology.org/2026/07/02/zhipus-glm-5-2-rivals-opus-4-8-on-coding-benchmarks-at-a-fifth-of-the-cost/) (headline-only, body returned HTTP 403)

Community / bug reports:
- [Hacker News: "GLM-5.2 is the new leading open weights model on Artificial Analysis"](https://news.ycombinator.com/item?id=48567759)
- [Hacker News: "GLM 5.2 Is Out"](https://news.ycombinator.com/item?id=48518684)
- [Hacker News: "GLM 5.2 and the coming AI margin collapse"](https://news.ycombinator.com/item?id=48809877) (fetch failed, HTTP 429 — title/context only)
- [Hacker News: "GLM-5.2 – How to Run Locally"](https://news.ycombinator.com/item?id=48636377)
- [Hacker News: "GLM 5.2 beats Claude in our benchmarks"](https://news.ycombinator.com/item?id=48709670)
- [Hacker News: "GLM-5.2 is a step change for open agents"](https://news.ycombinator.com/item?id=48639840)
- [Hacker News: "GLM-5.2: The Most Powerful Open Model yet and the Brutal Reality of Running It"](https://news.ycombinator.com/item?id=48594012)
- [Hacker News: "Show HN: Getting GLM 5.2 running on my slow computer"](https://news.ycombinator.com/item?id=48842459)
- [Hacker News: "GLM 5.2 is a great model, but if you only want to use the best model available..."](https://news.ycombinator.com/item?id=48713146)
- [Hacker News: "GLM 5.2 is nearly as accurate as a human book keeper"](https://news.ycombinator.com/item?id=48850414)
- [Cursor Forum: "GLM 5.2 MAX stopped handling tool calls"](https://forum.cursor.com/t/glm-5-2-max-stopped-handling-tool-calls/165275)
- [Cursor Forum: "Built-in GLM 5.2 intermittently prints raw tool-call markup instead of invoking Agent tools"](https://forum.cursor.com/t/built-in-glm-5-2-intermittently-prints-raw-tool-call-markup-instead-of-invoking-agent-tools/165202)
- [Cursor Forum: "GLM 5.2: Tool calls terminate chats"](https://forum.cursor.com/t/glm-5-2-tool-calls-terminate-chats/165182)
- [GitHub charmbracelet/crush #3153](https://github.com/charmbracelet/crush/issues/3153)
- [GitHub vllm-project/vllm #48095](https://github.com/vllm-project/vllm/issues/48095)

*(Note: this dispatch cross-references `google-gemini.md` in this same directory only for register/format consistency, per instructions — no claims about Gemini are made or implied here.)*
