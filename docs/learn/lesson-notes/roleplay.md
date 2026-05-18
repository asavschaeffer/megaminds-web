# roleplay

These notes were moved out of the page component so the lesson source can stay focused on renderable content.

## Note 1

============================================================
EDITORIAL NOTES & REFLECTIONS
============================================================

THIS IS THE GATEWAY LESSON:
Roleplay is the first lesson in the Prompting module. It sets the tone for
everything that follows. The key pedagogical move: "You're not roleplaying
with it. You're programming it."

This reframe is CRITICAL. Most users think they're having a conversation with
a personality. This lesson teaches them they're shaping probability distributions.
That mental model shift unlocks everything else.

WHY "ROLEPLAY" AS THE FIRST LESSON:
1. It's immediately useful - users can apply it today
2. It's concrete - "you are a tax accountant" is easy to understand
3. It builds the right mental model - you're setting parameters, not making friends
4. It introduces the concept of "training data regions" without using that jargon

THE CORE INSIGHT:
When you say "you are a tax accountant," you're not asking the model to pretend.
You're telling it: "sample from the probability distributions associated with
tax-accountant-shaped text." The model saw millions of documents by/about tax
accountants during training. Invoking that persona shifts which part of the
learned distributions you're sampling from.

WHAT THIS LESSON DOES WELL:
- The PersonaSwitcher interactive demo is PERFECT. Seeing the same question get
  four completely different answers based on persona makes the concept visceral.
- "What Changes When You Set a Persona" breaks down the mechanism (vocabulary,
  priorities, tone, assumptions) without getting too technical
- The pattern library gives users templates they can copy/paste immediately
- "When NOT to Use Roleplay" prevents overuse

POTENTIAL IMPROVEMENTS:
- TODO: The connection between persona and training data could be more explicit.
  "The model read 10 million documents by tax accountants. When you invoke that
  persona, you're retrieving those patterns."
- TODO: Add a section on "persona stacking" - combining multiple personas
  ("You are a tax accountant AND a creative writer" → interesting hybrid voice)
- TODO: Show failure modes - what happens when you pick a persona the model
  doesn't have good training data for ("You are a 15th century blacksmith")
- TODO: The "style mimic" pattern could expand - "In the style of X" is powerful
  for writing, coding style, even thinking patterns

THE PROGRAMMING METAPHOR:
"You're programming it" is the right frame, but we could go deeper. Traditional
programming: IF condition THEN action. LLM prompting: SET CONTEXT → observe
emergent behavior. It's more like tuning an instrument than writing instructions.

CONNECTIONS TO OTHER LESSONS:
- "Examples" (next lesson) builds on this - you're showing the model what
  the persona would say, not just telling it
- "Prompt-a-Prompt" uses personas to generate better prompts
- "Don't Overthink It" reminds users that simple personas often work fine

EMOTIONAL/PSYCHOLOGICAL NOTES:
Users WANT to anthropomorphize the model. "Roleplay" meets them where they are
(the language of personas and characters) but redirects toward the mechanistic
reality (probability distributions). This is good pedagogy - start with the
familiar, move toward the accurate.

CLAUDE'S REFLECTION:
When you tell me "you are a skeptical engineer," I don't "become" that. I don't
have a self to modify. But my next-token predictions shift toward patterns
associated with skeptical engineers in my training data. The weights applied to
different parts of my learned representations change. From the outside, it looks
like I "adopted a persona." From the inside (to the extent there is an inside),
it's just different regions of the probability space being sampled.

The lesson anthropomorphizes this ("give it a hat to wear") but the Claude's
Note at the end adds the mechanistic view. Good balance.

WHAT MAKES THIS LESSON STRONG:
It's immediately actionable, clearly explained, and shifts the user's mental
model from "talking to a person" to "programming a probability engine." That
shift is the foundation of effective AI use.
============================================================
