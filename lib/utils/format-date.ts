/** "2026-10-05" → "2026.10.05" (no Date parsing, so no timezone shift). */
export function formatDate(isoDate: string): string {
  return isoDate.replaceAll("-", ".");
}

/** "2024-03", "2025-01" → "2024.03 — 2025.01"; missing end → "2024.03 — 현재". */
export function formatPeriod(startedAt: string, endedAt?: string): string {
  return `${startedAt.replace("-", ".")} — ${endedAt ? endedAt.replace("-", ".") : "현재"}`;
}

/** A Date → "2026.10.05" in Korea time (the site's audience), independent of the server's timezone. */
export function formatDateKst(date: Date): string {
  return date.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" }).replaceAll("-", ".");
}
