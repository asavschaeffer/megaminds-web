---
description: How to add a new AI model evaluation to the Megaminds platform
---

# Model Integration Workflow

> **Superseded:** the canonical, end-to-end methodology now lives in
> `.claude/skills/add-model/SKILL.md` (invoke as `/add-model`). It covers the
> editorial constitution, research-brief generation, the subject self-interview,
> the section catalog, and the picker signal contract. The steps below remain
> as a quick mechanical reference; where they disagree, the skill wins.

This workflow documents how to add a new AI model evaluation to the Megaminds platform.

## Prerequisites

- Research document with model details (architecture, benchmarks, pricing, community sentiment)
- Reference template at `content/eval/models/template.tsx`
- Model and organization icons in `public/icons/`

---

## Step 1: Create Model Profile (Header + Section Structure)

**Prompt:**
> Please read `content/eval/models/template.tsx` and `[Research Document].md`
> 
> I would like you to make a new file in `content/eval/models/` for [Model Name], and fill out the header metadata completely (name, family, variant, version, organization, release date, identity, tagIds, links, pricing, benchmarks, sentiment feed).
> 
> You can also choose which sections you would like to include for the main content, but **do not write the section content**—just write section names and subtitles. If you are not satisfied with the template sections, please feel free to make your own. I would expect there to be many unique sections for this particular model given its [unique features].

**Files touched:**
- `content/eval/models/[model-slug].tsx` (NEW)

**Validation:**
- Check that all `tagIds` are valid in `lib/models/tags.ts`
- Check that all link keys are valid in `lib/models/link-types.ts`
- Ensure `nameOrder` matches the model's naming convention

---

## Step 2: Register Model & Set Up Card

**Prompt:**
> Please register [Model Name] in the model registry and update the model cards system to use the registry pattern. Make sure to:
> 1. Import the model profile in `lib/models/registry.ts`
> 2. Add it to the MODELS array
> 3. Update `lib/models/model-cards.ts` to use `getModelBySlug()` with proper `buildModelAssets()`
> 4. Add any missing tags to `lib/models/tags.ts` if needed

**Files touched:**
- `lib/models/registry.ts`
- `lib/models/model-cards.ts`
- `lib/models/tags.ts` (if new tags needed)

**Validation:**
- Verify card renders correctly on `/eval` page with icons and proper name display

---

## Step 3: Homepage & Legacy Updates

**Prompt:**
> Please add the [Model Name] card to the homepage under "Latest Model Evaluations" with abbreviated tags and proper icon assets. Also search for any legacy references to the old model name and update them.

**Files touched:**
- `app/page.tsx`
- Any files with legacy model name references

**Important:** When adding to homepage, you must include explicit icon paths:
```tsx
<BrandCard
  model={getModelBySlug('[model-slug]')}
  modelIconSrc="/icons/[model]/[model]-color.svg"
  modelTextLogoSrc="/icons/[model]/[model]-text.svg"
  parentIconSrc="/icons/[org]/[org]-mono.svg"
  tags={['Abbreviated', 'Tag', 'List']}
/>
```

---

## Step 4: Section Content

**Prompt (per-section or batch):**
> Please fill in the content for the following sections: [section-id-1], [section-id-2], [section-id-3]. Use the research document as the source. Include `<AbbrSidenote>` components for technical terms.

**Files touched:**
- `content/eval/models/[model-slug].tsx`

---

## Step 5: Audit for AbbrSidenote Opportunities

**Prompt:**
> Please audit the completed model report for `<AbbrSidenote>` opportunities. Look for:
> - Technical acronyms (MoE, MLA, RLHF, KV cache, etc.)
> - Benchmark names (AIME, SWE-bench, HLE, LMSYS)
> - Architecture terms (context window, token, routing, experts)
> - Concepts that might need definition for non-expert readers

**Files touched:**
- `content/eval/models/[model-slug].tsx`

---

## Common Friction Points

| Issue | Solution |
|-------|----------|
| Invalid `tagIds` | Check `lib/models/tags.ts` for valid values, or add new tags |
| Invalid link types | Use `weights` not `huggingface`, `docs` not `documentation` |
| Name not displaying correctly | Add `variant`, `modelVersion`, and `nameOrder` fields |
| Homepage card shows placeholder icons | Add explicit `modelIconSrc`, `modelTextLogoSrc`, `parentIconSrc` |
| Card not appearing | Ensure model is registered in `lib/models/registry.ts` |

---

## File Checklist

- [ ] `content/eval/models/[model-slug].tsx` — Model profile
- [ ] `lib/models/registry.ts` — Registration
- [ ] `lib/models/model-cards.ts` — Card configuration  
- [ ] `lib/models/tags.ts` — New tags (if any)
- [ ] `app/page.tsx` — Homepage card
- [ ] Legacy reference updates
