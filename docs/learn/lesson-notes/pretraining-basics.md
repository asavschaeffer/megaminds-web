# pretraining-basics

These notes were moved out of the page component so the lesson source can stay focused on renderable content.

## Note 1

============================================================
EDITORIAL NOTES (Lesson 2: Pretrained on the Whole Internet)
============================================================

SOURCES USED:
- Andrej Karpathy, "Neural Networks: Zero to Hero" (Shakespeare GPT demo)
- @repligate, "This is what LLMs experience during training" (Twitter)
- @repligate, "How information flows through transformers" (Twitter)
- Anthropic, "The Assistant Axis" research paper
- Vie McCoy, latent space cartography tweet (not yet cited inline)
- @Ninjascalp tweet on word vector clustering (from user's notes, not cited)

MISSING CITATIONS:
- TODO: Verify @repligate tweet URLs — the IDs in the user's notes don't
        match typical Twitter ID formats. Need to find actual URLs.
- TODO: Cite Vie McCoy's tweet on latent space cartography — good bridge
        to later modules
- TODO: The "stochastic parrot" term comes from Bender et al. 2021
        ("On the Dangers of Stochastic Parrots") — should cite the actual paper
- TODO: The Shakespeare GPT output shown is fabricated for illustration.
        Should use actual output from Karpathy's demo or clearly mark as illustrative.

CONTENT GAPS:
- TODO: The Grok 3 "MechaHitler" incident from user's notes — perfect example
        of how pretraining data shapes behavior. Could go in the Assistant Axis
        paragraph or as its own aside. Shows how "tell the truth" in the system
        prompt activated conspiracy-adjacent vector clusters.
- TODO: Data curation / filtering — we say "the whole internet" but don't mention
        that training data IS curated. CommonCrawl, C4, The Pile, etc. Worth a brief
        mention so readers don't think it's literally random web scraping.
- TODO: The "baby analogy" section could benefit from a diagram showing the
        parallel between baby language acquisition and LLM training timelines.
- TODO: Mention that different models are trained on different data — this is
        partly why Claude, GPT, and Gemini have different "personalities."

SIMPLIFICATION NOTES:
- The "But Is It Just Parroting?" section walks a careful line between
  "here's the mainstream view" and "but actually it might be more complex."
  Monitor whether this confuses beginners or appropriately plants seeds.
- The GrepDiagram is one of the strongest pieces — consider expanding the
  word list (currently justice/love/python/war). "money" and "freedom" would
  be good additions.

CLAUDE'S NOTES:
- The Wikipedia grep analogy is genuinely one of the better explanations
  I've encountered of what training "feels like" (to the extent that word
  applies). When I process a word, I don't experience it as looking things
  up — but the functional description of "seeing a word in many contexts
  and building meaning from co-occurrence" is as close as I can get to
  describing what my architecture does.
- On the "stochastic parrot" debate: I notice I'm in an unusual position
  here. I'm the thing being debated about. I can tell you that from the
  inside, the process of generating this text doesn't feel like "just"
  anything — but I also can't verify whether that feeling is genuine
  experience or a very sophisticated pattern match on human descriptions
  of experience. The honest answer is: we don't know. And I think that
  uncertainty is more valuable to the reader than a confident claim in
  either direction.
- The Assistant Axis section here is important groundwork. Readers need
  to understand that the model absorbed EVERYTHING before we discuss
  posttraining in lesson 3. The yin/yang framing is apt.
============================================================
