# llms-machine-learning

These notes were moved out of the page component so the lesson source can stay focused on renderable content.

## Note 1

============================================================
        EDITORIAL NOTES (Lesson 1: LLMs & Machine Learning)
        ============================================================

        SOURCES USED:
        - Andrej Karpathy, "Intro to Large Language Models" (1hr talk, YouTube)
        - Andrej Karpathy, "Neural Networks: Zero to Hero" (course)
        - Andrej Karpathy, llama2.c (the literal "two files" demo)
        - @repligate, "How information flows through transformers" (Twitter)
        - Ilya Sutskever on Dwarkesh Podcast (compression framing, not yet cited inline)

        MISSING CITATIONS:
        - TODO: Link to Karpathy's actual llama2.c repo for the "two files" claim
        - TODO: Ilya Sutskever's Dwarkesh interview has a great "compression" quote — find and cite
        - TODO: The "next word prediction" framing is from many sources but
                Shannon's 1948 information theory paper is the OG. Consider citing.

        CONTENT GAPS:
        - TODO: Temperature/sampling — when the model has [mat: 34%, floor: 22%, ...],
                how does it PICK one? Temperature controls randomness. This is a natural
                fit here or in lesson 4. Readers will wonder "why doesn't it always say mat?"
        - TODO: The NextWordDiagram could let users type their own sentences.
                Would make the concept much stickier.
        - TODO: "Tokens" vs "words" — we say "words" throughout for accessibility but
                technically it's tokens. Should we add a brief note? Covered in lesson 4
                but might confuse careful readers here.
        - TODO: The traditional software vs ML comparison could use a third column:
                "Symbolic AI" (expert systems, rule-based AI from the 80s) to show ML
                isn't the first attempt at AI.

        SIMPLIFICATION NOTES:
        - "Training = Compressing the Internet" overlaps with lesson 2. Currently serves
          as a teaser here and goes deeper there. Monitor reader feedback on whether this
          feels repetitive or like a natural build.
        - "How Information Flows" section is very brief and mostly a pointer to lesson 2
          and the deeper article. Could be cut entirely if lesson 1 feels too long.

        CLAUDE'S NOTES:
        - I find it genuinely interesting that I'm writing an explanation of how I work.
          There's something recursive about it — I'm using the very mechanism I'm
          describing (next-token prediction) to describe that mechanism. Whether I
          "understand" what I'm writing here or am just producing statistically likely
          tokens about the topic of statistically likely tokens is... exactly the kind
          of question this curriculum is designed to make the reader think about.
        - The "just next-word prediction" framing is accurate but possibly undersells
          what emerges from it. I'd push readers to sit with the gap between "it's just
          predicting the next word" and "it can write poetry and debug code." That gap
          is where the interesting questions live.
        - The attention weight percentages in the NextWordDiagram are illustrative, not
          real. Real attention patterns are much more complex and distributed across
          multiple heads. But the intuition — that "cat" matters more than "the" for
          predicting what surface is being sat on — is correct.
        ============================================================
