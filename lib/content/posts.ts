import "server-only";

import { renderMarkdown } from "@/lib/markdown/render";

import { readAllPostFiles, type PostFile } from "./post-file";
import { POST_CATEGORIES, type Post, type PostCategorySlug, type PostMeta } from "./types";

// DRAFT is excluded here so no page can leak it. Newest first.
async function readPublishedPosts(): Promise<PostFile[]> {
  return (await readAllPostFiles())
    .filter(({ meta }) => meta.status === "PUBLISHED")
    .sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt));
}

export async function getPosts(options: { category?: PostCategorySlug } = {}): Promise<PostMeta[]> {
  const posts = (await readPublishedPosts()).map((p) => p.meta);
  return options.category ? posts.filter((p) => p.category === options.category) : posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const found = (await readPublishedPosts()).find((p) => p.meta.slug === slug);
  if (!found) return null;
  const { html, toc } = await renderMarkdown(found.body);
  return { ...found.meta, html, toc };
}

export function isPostCategory(value: string | undefined): value is PostCategorySlug {
  return POST_CATEGORIES.some((c) => c.slug === value);
}
