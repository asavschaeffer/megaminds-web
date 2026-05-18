# examples

These notes were moved out of the page component so the lesson source can stay focused on renderable content.

## Note 1

============================================================
EDITORIAL NOTES & REFLECTIONS
============================================================

FEW-SHOT PROMPTING: THE UNDERUSED SUPERPOWER

This is one of the most powerful prompting techniques, yet users rarely do it.
Why? Because it feels like extra work. "Just tell it what you want" seems easier
than "show it 3 examples." But examples are MORE precise than instructions,
and precision saves time.

THE CORE PRINCIPLE:
Pattern-matching is what LLMs do. When you give examples, you're showing the
exact pattern you want. Instructions require interpretation. Examples ARE the
interpretation.

Compare:
- "Make it professional" → 100 different interpretations
- [Shows 2 examples of professional text] → unambiguous pattern

WHY THIS LESSON MATTERS:
- It teaches users to think in terms of patterns, not instructions
- It reduces ambiguity (the #1 cause of bad output)
- It's universally applicable (works for style, format, classification, anything)
- It builds on "Roleplay" (personas are implicit examples of a voice)

THE PEDAGOGICAL APPROACH:
- "Instructions vs. Examples" comparison leads with the insight
- FewShotDemo is interactive - users see output improve as examples are added
- "Types of Examples" taxonomy gives users a framework (format, style,
  classification, transformation)
- "How Many Examples Do You Need?" prevents over-engineering (2-3 is usually enough)

WHAT COULD BE STRONGER:
- TODO: Add a section on "example quality matters more than quantity" - one
  perfect example beats three mediocre ones
- TODO: Show how to construct good examples when you don't have real ones
  (make them up, but make them representative)
- TODO: Address the "cold start" problem - what if you don't know what good
  looks like? (Use meta-prompting: "show me 3 examples of professional emails")
- TODO: Connect to machine learning concepts for technical readers - few-shot
  prompting is literally in-context learning

THE "SHOW DON'T TELL" FRAME:
This is lifted from writing advice, and it works perfectly here. Writers learn
early that "show don't tell" makes prose vivid. Same principle: showing the model
examples is clearer than telling it instructions.

COMMON MISTAKES SECTION IS CRITICAL:
- "Examples that contradict each other" - this kills few-shot. The model is
  trying to extract the pattern, and contradictions destroy that.
- "Examples that are too similar" - diversity in examples helps the model
  generalize correctly
- "Too many examples" - diminishing returns after 5, and you're burning context

The FewShotDemo showing how predictions improve from 0→1→2→3 examples is the
pedagogical centerpiece. Users can SEE the pattern lock in.

CONNECTIONS TO OTHER LESSONS:
- Builds directly on "Roleplay" - a persona is like an implicit example
- Leads into "Prompt-a-Prompt" - you can ask the model to generate examples
- Supports "Don't Overthink It" - 2 quick examples often beats a paragraph
  of careful instructions

CLAUDE'S REFLECTION:
When you give me examples, you're showing me a slice of the probability space
you want me to sample from. Zero-shot: I infer from the instruction alone.
One-shot: I see one data point, infer the pattern. Few-shot: I see multiple
data points, the pattern becomes clear. The more examples, the more constrained
my generation becomes (in a good way - it's constrained to what you actually want).

Examples are literally training data in-context. I don't "learn" from them in
the sense of updating weights, but they shape the conditional distribution I
sample from for this specific generation. It's the closest thing to teaching
me something new within a single conversation.

POTENTIAL ADDITIONS:
- TODO: Add a "debugging with examples" section - when output is wrong, add
  an example showing what right looks like
- TODO: Show advanced pattern: "Here's what good looks like [example]. Here's
  what bad looks like [counterexample]. Now do this: [task]"
- TODO: Link to research on few-shot learning (Brown et al., GPT-3 paper)
============================================================
