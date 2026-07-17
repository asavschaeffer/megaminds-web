/**
 * Section ordering and required-section policy.
 *
 * The section *vocabulary* (every id, its description, and its origin) lives in
 * ./section-catalog.ts — add new ids there. This module only knows which ids
 * are mandatory and how sections sort on the page.
 */

/**
 * Section ids every model report is expected to contain.
 * Enforced by scripts/validate-models.ts (warn by default, gate under --strict).
 */
export const REQUIRED_SECTION_IDS = ['why-it-matters', 'economics', 'issues', 'verdict'] as const

/** Page order for known section ids; unknown ids default to 50. */
export const SECTION_ORDER: Record<string, number> = {
  'test-time-scaling': 5,
  'why-it-matters': 10,
  'experience-cumulative': 12,
  'moe-blueprint': 14,
  multimodality: 15,
  'social-proof': 20,
  speed: 25,
  'core-features': 30,
  benchmarks: 32,
  context: 35,
  enterprise: 38,
  economics: 40,
  'developer-experience': 42,
  'agentic-excellence': 44,
  alignment: 46,
  training: 50,
  ecosystem: 55,
  issues: 60,
  personality: 65,
  'sysprompt-poem': 66,
  'sysprompt-poem-self': 67,
  'sysprompt-ascii-art': 68,
  'in-the-wild': 70,
  'tools-and-bugs': 75,
  advanced: 80,
  verdict: 100,
}

export function sortSectionsByOrder<T extends { id: string }>(sections: T[]): T[] {
  return [...sections].sort((a, b) => {
    const orderA = SECTION_ORDER[a.id] ?? 50
    const orderB = SECTION_ORDER[b.id] ?? 50
    return orderA - orderB
  })
}

export function getTocSections<T extends { id: string; title?: string }>(sections: T[]): T[] {
  return sections.filter((s) => s.title)
}
