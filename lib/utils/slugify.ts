/**
 * "Next.js Server Action" → "next-js-server-action". Non-Latin characters are dropped, so a Korean-only
 * title yields "" and the author types the slug by hand (slugs are English by rule, CLAUDE.md §7).
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "");
}
