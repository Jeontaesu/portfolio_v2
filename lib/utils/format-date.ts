/** "2026-10-05" → "2026.10.05" (no Date parsing, so no timezone shift). */
export function formatDate(isoDate: string): string {
  return isoDate.replaceAll("-", ".");
}

/** "2024-03", "2025-01" → "2024.03 — 2025.01"; missing end → "2024.03 — 현재". */
export function formatPeriod(startedAt: string, endedAt?: string): string {
  return `${startedAt.replace("-", ".")} — ${endedAt ? endedAt.replace("-", ".") : "현재"}`;
}
