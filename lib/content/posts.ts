import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { renderMarkdown } from "@/lib/markdown/render";

import {
  POST_CATEGORIES,
  type ContentStatus,
  type Post,
  type PostCategorySlug,
  type PostMeta,
} from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CHARS_PER_MINUTE = 500;

function fail(file: string, message: string): never {
  throw new Error(`[content/posts/${file}] ${message}`);
}

function requireString(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "")
    fail(file, `frontmatter "${key}" is required`);
  return value.trim();
}

function parsePost(file: string, raw: string): { meta: PostMeta; body: string } {
  const { data, content } = matter(raw);
  const slug = requireString(data, "slug", file);
  if (!SLUG_PATTERN.test(slug)) fail(file, `slug "${slug}" must be lowercase kebab-case`);

  const category = requireString(data, "category", file);
  if (!POST_CATEGORIES.some((c) => c.slug === category)) {
    fail(
      file,
      `category "${category}" must be one of ${POST_CATEGORIES.map((c) => c.slug).join(", ")}`,
    );
  }

  // gray-matter parses unquoted YYYY-MM-DD as a Date.
  const rawDate =
    data.publishedAt instanceof Date
      ? data.publishedAt.toISOString().slice(0, 10)
      : data.publishedAt;
  if (typeof rawDate !== "string" || !DATE_PATTERN.test(rawDate)) {
    fail(file, `publishedAt must be YYYY-MM-DD`);
  }

  const status = requireString(data, "status", file);
  if (status !== "DRAFT" && status !== "PUBLISHED") fail(file, `status must be DRAFT or PUBLISHED`);

  return {
    body: content,
    meta: {
      title: requireString(data, "title", file),
      slug,
      category: category as PostCategorySlug,
      excerpt: requireString(data, "excerpt", file),
      publishedAt: rawDate,
      status: status as ContentStatus,
      readingMinutes: Math.max(1, Math.round(content.length / CHARS_PER_MINUTE)),
    },
  };
}

async function readAllPosts(): Promise<{ meta: PostMeta; body: string }[]> {
  let files: string[];
  try {
    files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  const posts = await Promise.all(
    files.map(async (file) =>
      parsePost(file, await fs.readFile(path.join(POSTS_DIR, file), "utf8")),
    ),
  );

  const seen = new Set<string>();
  for (const { meta } of posts) {
    if (seen.has(meta.slug)) throw new Error(`[content/posts] duplicate slug "${meta.slug}"`);
    seen.add(meta.slug);
  }

  // DRAFT is excluded here so no page can leak it. Newest first.
  return posts
    .filter(({ meta }) => meta.status === "PUBLISHED")
    .sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt));
}

export async function getPosts(options: { category?: PostCategorySlug } = {}): Promise<PostMeta[]> {
  const posts = (await readAllPosts()).map((p) => p.meta);
  return options.category ? posts.filter((p) => p.category === options.category) : posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const found = (await readAllPosts()).find((p) => p.meta.slug === slug);
  if (!found) return null;
  const { html, toc } = await renderMarkdown(found.body);
  return { ...found.meta, html, toc };
}

export function isPostCategory(value: string | undefined): value is PostCategorySlug {
  return POST_CATEGORIES.some((c) => c.slug === value);
}
