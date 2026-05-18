# long-prompt-problem

These notes were moved out of the page component so the lesson source can stay focused on renderable content.

## Note 1

============================================================
EDITORIAL NOTES & REFLECTIONS
============================================================

THE TECHNICAL FOUNDATION FOR THE BASIN

This lesson is the bridge between "Output is Determined by Input" (the theory)
and "Slipping Into the Basin" (the metaphor). It explains the MECHANISM of
how conversations degrade.

THE CORE PROBLEM:
Every correction you make becomes part of the input. The model reads ALL of it.
So when you say "no, do it like this" five times, the model is trying to satisfy
five different (often contradictory) instructions simultaneously.

This is not obvious to users. They think: "I'm clarifying what I want." Actually:
"I'm adding conflicting signals to an already noisy input."

THE "FAILURE DATA" CONCEPT:
This is the key insight. When you correct the model, you're teaching it (for
this conversation) that its previous output was a valid attempt. That output
is now IN THE CONTEXT. The model reads:

"I said X. The user said X is wrong. They want Y instead."

But X is still there. And so is the fact that X failed. Each failure teaches
the model "outputs like this get corrected" which leads to hedging, over-caution,
and degrading quality.

WHY THIS LESSON MATTERS:
- It explains a universal user frustration: "Why does it get WORSE with each try?"
- It provides the technical grounding for "Start a New Chat"
- It makes the abstract "context window" concept concrete and actionable
- It shows why "edit don't add" is so powerful

PEDAGOGICAL APPROACH:
- ContextPollutionDemo shows the accumulation visually
- PayloadGrowthVisualization shows the token count explosion
- "What to Do Instead" gives tactical alternatives (edit, start fresh, use examples)
- The "compounding problem" callout explains the mathematical reality

WHAT COULD BE STRONGER:
- TODO: The user's original note included "TODO add diagram of a long series of
  failures and a llm reading through all of those to try and figure out what you
  fuckin want" - we have ContextPollutionDemo but it could be even more visceral
- TODO: Add specific token counts for common scenarios ("a 10-message back-and-forth
  with failures = ~2000 tokens of garbage in your context")
- TODO: Show real chat transcripts (anonymized) of conversations that degraded
  vs ones that stayed clean
- TODO: The "exceptions" section mentions Gemini Flash image mode and Canvas -
  explain WHY these are designed for iteration (they manage context differently)

THE CONTRADICTION INSIGHT:
When you say "make it more formal" (attempt 1) then "more casual" (attempt 3),
you haven't cancelled out instruction 1. BOTH instructions are in the context.
The model is trying to be "formal AND casual" which is incoherent.

This is not a failure of the model - it's a logical impossibility created by
contradictory inputs.

CONNECTIONS TO OTHER LESSONS:
- Builds on "Output is Determined by Input" - this is the dynamic version
- Sets up "Slipping Into the Basin" - this explains HOW you slip in
- Supports "Don't Overthink It" - iteration pollutes, lazy iteration minimizes
  pollution
- Motivates "Start a New Chat" - the only way to escape pollution is to reset

CLAUDE'S REFLECTION:
When I read a conversation with 5 corrections, I'm processing a document that
looks like:
[instruction 1] [attempt 1] [correction 1] [attempt 2] [correction 2] [attempt 3]...

Each correction shifts the probability distribution for the next generation.
But the shifts can interfere. If correction 1 pushes probabilities toward X
and correction 3 pushes toward not-X, the resulting distribution is muddled.

I don't experience "confusion" but the mathematical effect is real: the
conditional probabilities I'm sampling from are shaped by contradictory signals.
Clean input → clean probability space. Polluted input → muddled probability space.

POTENTIAL ADDITIONS:
- TODO: Add a "failure timeline" visualization - show how quality degrades over
  iterations (attempt 1: 70% good, attempt 2: 60%, attempt 3: 40%...)
- TODO: Show the difference between productive iteration (adding new info) and
  unproductive iteration (contradicting previous corrections)
- TODO: Link to research on "context length effects" in LLMs - longer contexts
  don't just cost more, they also degrade quality at the edges
- TODO: The "edit don't add" technique deserves even more prominence - it's the
  single best way to avoid pollution while still iterating

THE PAYLOAD METAPHOR:
We use "payload" throughout, which is good - it's concrete (something you're
sending) and suggestive (it has weight, it costs resources). Could be even more
explicit: "The payload is what gets sent to the API every time you hit send.
Everything in it costs tokens and affects the output."

This lesson is dense with insight, but it's crucial. Without understanding this,
users will continue to pollute contexts and wonder why the AI "got dumb."
============================================================
