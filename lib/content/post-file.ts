// Reads and validates content/posts/*.md. No `server-only` import: prisma/seed.ts runs outside Next
// and shares this parser with lib/content/posts.ts, so file validation lives in exactly one place.
import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import type { ContentStatus, PostMeta } from "./types";

// Categories the files may use. The seed script creates these rows; after that the database is the source of truth.
export const POST_CATEGORIES = [
  { slug: "frontend", name: "Frontend" },
  { slug: "css", name: "CSS" },
  { slug: "web", name: "Web" },
  { slug: "study", name: "Study" },
] as const;

const POSTS_DIR = path.join(process.cwd(), "content", "posts");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const CHARS_PER_MINUTE = 500;

/** A post as written in a file: the category is a slug here, resolved to a row by the seed. */
export type PostFileMeta = Omit<PostMeta, "category"> & { category: string };
export type PostFile = { meta: PostFileMeta; body: string };

function fail(file: string, message: string): never {
  throw new Error(`[content/posts/${file}] ${message}`);
}

function requireString(data: Record<string, unknown>, key: string, file: string): string {
  const value = data[key];
  if (typeof value !== "string" || value.trim() === "")
    fail(file, `frontmatter "${key}" is required`);
  return value.trim();
}

function parsePost(file: string, raw: string): PostFile {
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
      category,
      excerpt: requireString(data, "excerpt", file),
      publishedAt: rawDate,
      status: status as ContentStatus,
      readingMinutes: Math.max(1, Math.round(content.length / CHARS_PER_MINUTE)),
    },
  };
}

/** Every post file, DRAFT included, in no particular order. Callers decide what to expose. */
export async function readAllPostFiles(): Promise<PostFile[]> {
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
  return posts;
}
