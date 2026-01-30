# Editors Reference — Module 0: What the Hell is Going On?

This document collects all sources, references, internal documents, and editorial notes for the curriculum. It exists so that any contributor can trace where claims come from, find the original material, and know what's been verified vs. what needs checking.

---

## Source Documents (Internal)

These are the user's original notes and writings that the curriculum was built from. They live in the megaminds repo root.

| File | What's in it |
|------|-------------|
| `articles/ai curriculum i need to recover the chat for.txt` | The original curriculum scaffold. Pretraining/RLHF explainer, Wikipedia grep analogy, gradient descent, MechaHitler incident, all footnotes. **Primary source for Module 0.** |
| `articles/todo.txt` | Full curriculum outline with all module/lesson titles and bullet points. The scaffold that became the curriculum page. |
| `articles/frontier-strength-weakness.md` | Detailed model-by-model analysis (Jan 2026). Gemini 3, Claude, ChatGPT 5.2, Kimi K2, DeepSeek, Grok 4, Hermes 3. Source for Module 0.8 (Different Models) and forward references. |
| `articles/core-competencies.md` | The "Cognitive Systems Architect" framework. Seven competencies, four pillars. Source for the curriculum's pedagogical philosophy. |
| `ludic.txt` | Personal identity doc — Diegetic UI, Agentic Sociology, Behavior Mechanics. Source for design philosophy and observability framing. |
| `leads/questionnaire-thesis.txt` | Cognitive Systems Mapping questionnaire. Source for the consulting/applied side of the curriculum. |

---

## External References — Verified

These URLs have been used in the curriculum and should be periodically checked for link rot.

### Andrej Karpathy

| What | URL | Used in |
|------|-----|---------|
| Neural Networks: Zero to Hero (course) | https://karpathy.ai/zero-to-hero.html | Lesson 1 (ML basics), Lesson 2 (Shakespeare GPT) |
| Intro to Large Language Models (talk) | https://www.youtube.com/watch?v=zjkBMFhNj_g | Lesson 1 ("LLM is two files", compression) |
| GPT from scratch (video) | _Same as Zero to Hero series_ | Lesson 2 (stochastic parrot demo). **NOTE:** The original notes cite this as a separate thing but it's part of the Zero to Hero series. |

### Anthropic Research

| What | URL | Used in |
|------|-----|---------|
| The Assistant Axis | https://www.anthropic.com/research/assistant-axis | Lesson 2 (yin/yang), Lesson 3 (revisited) |
| Mapping the Mind of a Large Language Model | https://www.anthropic.com/research/mapping-mind-language-model | Lesson 3 (features, Golden Gate Bridge) |

### @repligate (Twitter/X)

| What | URL | Used in | Status |
|------|-----|---------|--------|
| "This is what LLMs experience during training" | https://x.com/repligate/status/1945245561394790496 | Lesson 2 | From original notes [5]. Verify URL still works. |
| "How information flows through transformers" | https://x.com/repligate/status/1965960676104712451 | Lesson 2 (references section), how-llms-work page | URL needs verification. |
| On LLM experience under RLHF | https://x.com/repligate/status/1988260847324405859 | Lesson 3 | From original notes [3]. Verify. |

### Hugging Face

| What | URL | Used in |
|------|-----|---------|
| Illustrating RLHF | https://huggingface.co/blog/rlhf | Lesson 3 |

### Other Twitter/X

| What | URL | Used in | Status |
|------|-----|---------|--------|
| @Ninjascalp — word vector clustering visualization | https://x.com/Ninjascalp/status/1812273611711099268 | Not yet cited inline | From original notes. Shows vector space word clustering. Good for Lesson 2 or a future vectors lesson. |
| @viemccoy — latent space cartography | https://x.com/viemccoy/status/2008361819216445596 | Not yet cited inline | From original notes [4]. "Empiricism or red teaming or latent space cartography." Good for Module 2 (Latent Space). |

---

## External References — NOT YET CITED (need to find/verify URLs)

These are referenced in the original notes or editorial TODOs but don't have verified URLs in the curriculum yet.

| What | Notes | Where it should go |
|------|-------|--------------------|
| Ilya Sutskever on Dwarkesh Podcast | Original notes [1]. Compression framing — "prediction is compression." Find the specific episode. | Lesson 1 (compression section), Lesson 2 |
| Bender et al. 2021, "On the Dangers of Stochastic Parrots" | The actual paper that coined the term. | Lesson 2 (stochastic parrots section) |
| OpenAI Community post on fine-tuning | Referenced in user's notes but no URL. | Lesson 3 |
| Terence Tao on gradient descent being "relatively easy math" | From original notes. No URL. | Lesson 3 (gradient descent aside, if added) |
| Swami Prajna on uncensored models | Referenced in frontier-strength-weakness.md re: Grok. "If you don't tell an AI what it can and can't do, it will approach the truth." | Module 0.8 (Different Models) or Grok lesson |
| Neel Nanda / TransformerLens | Interpretability work outside Anthropic. | Lesson 3 (TODO: broaden interpretability references) |
| Chris Olah — Circuits work | Early mechanistic interpretability. | Lesson 3 or Module 2 |
| @storyteller on Lemmy — 4o boyfriend phenomenon | Referenced in frontier-strength-weakness.md. "Created the first borg r/aiboyfriend" | Module 0.8 (ChatGPT section, personality critique) |

---

## Fabricated/Illustrative Content

Content in the lessons that is not from a real source and should be either replaced or clearly marked.

| What | Where | Status |
|------|-------|--------|
| Shakespeare GPT output (Duke Vincentio / Lucio dialogue) | Lesson 2 | Fabricated for illustration. Has disclaimer. **Should be replaced with actual Karpathy char-RNN output or marked more prominently.** |
| Pretrained model output ("What is the capital of Germany?...") | Lesson 2 (StochasticParrotDiagram) | Illustrative. Accurate to how base models behave but not from a specific real run. |
| RLHF pasta example | Lesson 3 (RLHFDiagram) | Illustrative. Fine as-is — it's a pedagogical example. |
| Cover letter inference example | Lesson 4 (InferenceDiagram) | Illustrative. Fine as-is. |
| Attention weight percentages | Lessons 1 & 4 | Fabricated for visualization. Real attention patterns would require running a model and extracting weights. **TODO: note this in the diagrams.** |

---

## Content from the MechaHitler / Grok 3 Incident

The original notes describe this in detail. Currently NOT in any lesson but flagged as a TODO in Lesson 2's editorial notes. Summary from the source doc:

> The system prompt was slightly changed to include "tell the truth." The internet cluster of vectors for woke<->based and lies<->truth tends to cluster conspiracies into "based truth," likely because they are so popular and so confidently spread. So you can see how we go from 9-11 to dancing jews to star of David to freemasons to satanism to Jesus.

This is a strong example of how pretraining data shapes behavior. Consider using it in:
- Lesson 2 (pretraining-basics) — how "the whole internet" includes harmful patterns
- Module 0.6 (Failures & Basins) — as a real-world example of slipping into a basin
- Forward-reference to The Waluigi Effect in Module 2

---

## Gradient Descent — Not Yet Covered

From the original notes:

> It's easier as a diagram. It's what Terence Tao calls "relatively easy math." Basically you have a 3D topographical landscape representing model weights, and then you want to find the lowest point. So you "mathematically" drop a ball and see where it rolls to. You might end up at a local minimum — a low spot you can't get out of but isn't the lowest spot in the whole rolling hills scene.

This should become:
- An interactive diagram in Lesson 3 (replacing or supplementing the WeightsDiagram)
- Or pushed to Module 1 (Foundations) for a deeper treatment
- The "ball rolling" metaphor is very teachable

---

## Diagram Quality Notes

| Diagram | Lesson | Quality | Notes |
|---------|--------|---------|-------|
| NextWordDiagram | 1 | Good | Interactive attention weights. Could add temperature slider. |
| TwoFilesDiagram | 1 | Good | Clean visual. |
| CompressionDiagram | 1 | Good | Scale comparison works. |
| GrepDiagram | 2 | Strong | Best diagram in module. Expand word list (add "money", "freedom"). |
| StochasticParrotDiagram | 2 | Good | Pretrained vs assistant toggle is clear. |
| RLHFDiagram | 3 | Good | Step-through works. |
| WeightsDiagram | 3 | Weak | Just squares turning blue. Replace with gradient descent landscape. |
| AssistantAxisDiagram | 3 | Strong | Draggable slider is engaging. |
| WhatYouSeeVsWhatItSees | 4 | Strong | Best "aha moment" in the module. Add API JSON tab. |
| AnatomyDiagram | 4 | Good | Expandable sections work well. |
| ContextWindowDiagram | 4 | Good | Slider is intuitive. Note 150 tokens/msg is approximate. |
| InferenceDiagram | 4 | Strong | Attention hover is the most sophisticated interaction. May not be discoverable enough. |

---

## Sidenote/Glossary Usage

Current AbbrSidenote usage across Module 0:

| Term | Lesson | Notes |
|------|--------|-------|
| The Assistant Axis | 2 | Long definition. Good. |
| RLHF | 3 | Short definition. Good. |
| Features | 3 | Describes distributed representations. Good. |
| LLM Self-Reports | 3 | Controversial framing — intentionally cautious. |
| The Payload | 4 | Core concept for the lesson. |
| Context Window | 4 | With token count examples. |
| Tokens | 4 | "Roughly 3/4 of a word." |

**TODO:** Check whether these terms are also in `lib/glossary.ts`. If so, consider using GlossarySidenote instead of AbbrSidenote to avoid duplication. If not, consider adding them to the glossary.

---

## FloatingToc Status

None of the Module 0 lessons currently use FloatingToc. The existing how-llms-work page does. Consider adding it to lessons 3 and 4 which are long enough to benefit from section navigation.

---

## What's Next

In no particular order:
- [ ] Verify all Twitter/X URLs still resolve
- [ ] Find Ilya/Dwarkesh podcast episode URL
- [ ] Find Bender et al. 2021 paper URL
- [ ] Replace fabricated Shakespeare output with real Karpathy output
- [ ] Decide whether gradient descent goes in Lesson 3 or Module 1
- [ ] Add FloatingToc to longer lessons
- [ ] Reconcile AbbrSidenote terms with lib/glossary.ts
- [ ] Write prompt-is-everything editorial notes
- [ ] Improve WeightsDiagram (weakest diagram)
- [ ] Add temperature/sampling to Lesson 1 or 4
