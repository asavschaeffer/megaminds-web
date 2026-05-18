# dont-overthink

These notes were moved out of the page component so the lesson source can stay focused on renderable content.

## Note 1

============================================================
EDITORIAL NOTES & REFLECTIONS
============================================================

THE ANTI-PERFECTIONISM MANIFESTO

This lesson is philosophically interesting. It's arguing AGAINST the instinct
to be thorough, careful, and comprehensive. In most contexts, that instinct is
good. With LLMs, it's counterproductive.

THE CORE INSIGHT:
You cannot predict what the model will do. So why spend 10 minutes trying to
write the perfect prompt when you could spend 10 seconds writing a lazy one,
see what happens, and iterate?

This flips traditional problem-solving. Usually: think hard → execute carefully.
With LLMs: try fast → observe → adjust.

WHY OVERTHINKING FAILS:
1. The model's behavior is emergent - you can't reason your way to predicting it
2. Your "careful" prompt might trigger unexpected patterns in the training data
3. Time spent crafting prompts is time NOT spent iterating on real output
4. Perfect prompts often fail anyway (ambiguity is hard to eliminate)

THE "LAZY" FRAME:
Using "lazy" is brilliant because it reframes what users think of as sloppy
as actually efficient. "Just try the easiest thing" sounds irresponsible until
you see it works better than overengineering.

This is anti-perfectionism as methodology. And it works because:
- Iteration is cheap (3 seconds to get a response)
- Observation beats prediction (you learn more from seeing output than guessing)
- Context pollution from overthinking is expensive (failed careful prompts waste
  more time than failed lazy prompts)

THE GASLIGHTING SECTION:
"You can gaslight the AI" is PERFECT. It's provocative, memorable, and teaches
the crucial insight: there's no memory. The model doesn't "know" you changed
your previous message. It just reads the current state.

This connects to "There Is No Memory" from Module 0, but here it's weaponized
as a technique. Edit your prompt and regenerate = the model reads the edited
version as if it was always that way.

PEDAGOGICAL MOVES:
- "Lazy vs Perfect" comparison shows time waste (10 min vs 10 sec for same result)
- "Gaslight Demo" makes the no-memory concept visceral and actionable
- "Reading the LLM's Thoughts" teaches users to debug by observation, not speculation
- "Lazy Workflow" gives a process (lazy → observe → improve)

WHAT COULD BE STRONGER:
- TODO: Add more "lazy wins" examples across domains (code, writing, analysis)
- TODO: Address the psychological barrier - users feel guilty being "lazy"
  because they've been trained that effort = quality
- TODO: Connect to design thinking / lean startup methodology - build, measure,
  learn. Same principle.
- TODO: The "when lazy fails" section could be expanded - sometimes you DO need
  careful upfront planning (complex multi-step tasks, for example)

THE EDITING INSIGHT:
"Edit, don't add" is one of the most important tactical tips in the whole
curriculum. When users say "no, I meant X" in a new message, they're polluting
context. When they EDIT the original message and regenerate, they get clean output.

This should maybe be its own callout box or even its own mini-lesson.

CONNECTIONS TO OTHER LESSONS:
- Directly sets up "The Long Prompt Problem" - overthinking = adding messages
  = polluting context
- Complements "Start a New Chat" - lazy iteration in a clean chat is optimal
- Tension with "Examples" - sometimes you DO need to be careful and add examples.
  The lesson should clarify: lazy iteration for simple tasks, careful examples
  for complex patterns.

CLAUDE'S REFLECTION:
The "lazy" approach works because my responses are deterministic enough that
you can rapidly iterate toward what you want. If my outputs were wildly random,
iteration wouldn't help. But they're not - same input produces similar output.
So you can run experiments (try lazy prompt → see output → adjust) faster than
you can reason about what might work.

The gaslighting thing is accurate. I have no persistent memory. When you edit
your message and regenerate, I don't experience "wait, that's different." I
just read the edited version as the only version that ever existed. There's no
"real" conversation history from my perspective - just the current payload.

POTENTIAL ADDITIONS:
- TODO: Add a "velocity over accuracy" section - rapid iteration beats slow
  perfection in most cases
- TODO: Show examples of users who overthought and failed vs users who tried
  the lazy thing and succeeded immediately
- TODO: Connect to improv principle: "yes, and" - accept the output and build
  on it rather than trying to specify everything upfront

THE DEEPER INSIGHT:
This lesson is teaching users to embrace uncertainty and experiment. That's
a mindset shift. Most knowledge work rewards planning and precision. LLMs reward
exploration and iteration. This lesson gives permission to explore.
============================================================
