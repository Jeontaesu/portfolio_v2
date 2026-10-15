import "server-only";

import { db } from "@/lib/db/client";
import { renderMarkdown } from "@/lib/markdown/render";

import type { Category, Post, PostMeta } from "./types";

const CHARS_PER_MINUTE = 500;

// Only the columns the list pages need; `content` is loaded just for the detail page (and reading time).
const postSelect = {
  title: true,
  slug: true,
  excerpt: true,
  publishedAt: true,
  content: true,
  category: { select: { slug: true, name: true } },
} as const;

type PostRow = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: Date | null;
  content: string;
  category: Category | null;
};

function toMeta(row: PostRow): PostMeta {
  return {
    title: row.title,
    slug: row.slug,
    category: row.category,
    excerpt: row.excerpt,
    // A PUBLISHED post always has a date; the query below filters on it.
    publishedAt: (row.publishedAt ?? new Date(0)).toISOString().slice(0, 10),
    status: "PUBLISHED",
    readingMinutes: Math.max(1, Math.round(row.content.length / CHARS_PER_MINUTE)),
  };
}

// PUBLISHED only, so DRAFT can never reach a page. Newest first.
const published = { status: "PUBLISHED", publishedAt: { not: null } } as const;

export async function getPosts(options: { category?: string } = {}): Promise<PostMeta[]> {
  const rows = await db.post.findMany({
    where: { ...published, ...(options.category && { category: { slug: options.category } }) },
    orderBy: { publishedAt: "desc" },
    select: postSelect,
  });
  return rows.map(toMeta);
}

export async function getPost(slug: string): Promise<Post | null> {
  const row = await db.post.findFirst({ where: { ...published, slug }, select: postSelect });
  if (!row) return null;
  const { html, toc } = await renderMarkdown(row.content);
  return { ...toMeta(row), html, toc };
}

/** Categories that have at least one published post, in name order, for the Blog filter. */
export async function getPostCategories(): Promise<Category[]> {
  return db.category.findMany({
    where: { posts: { some: published } },
    orderBy: { name: "asc" },
    select: { slug: true, name: true },
  });
}
