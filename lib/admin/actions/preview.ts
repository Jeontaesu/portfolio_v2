"use server";

import { requireAdmin } from "@/lib/auth/guard";
import { renderMarkdown } from "@/lib/markdown/render";

export type PreviewResult = { html: string } | { error: string };

const MAX_PREVIEW_LENGTH = 200_000;

/** Renders Markdown with the same sanitizing pipeline as the public pages, so Preview shows what readers get. */
export async function previewMarkdown(markdown: string): Promise<PreviewResult> {
  await requireAdmin();
  if (typeof markdown !== "string" || markdown.length > MAX_PREVIEW_LENGTH) {
    return { error: "본문이 너무 깁니다." };
  }
  try {
    const { html } = await renderMarkdown(markdown);
    return { html };
  } catch (error) {
    console.error("[admin] previewMarkdown failed", error);
    return { error: "미리보기를 만들지 못했습니다. Markdown 구조를 확인해 주세요." };
  }
}
