// Field names mirror the Phase 2 data model (CLAUDE.md §7) so moving to a DB only changes lib/content internals.
import type { TocItem } from "@/lib/markdown/toc";

export type ContentStatus = "DRAFT" | "PUBLISHED";

export const POST_CATEGORIES = [
  { slug: "frontend", name: "Frontend" },
  { slug: "css", name: "CSS" },
  { slug: "web", name: "Web" },
  { slug: "study", name: "Study" },
] as const;

export type PostCategorySlug = (typeof POST_CATEGORIES)[number]["slug"];

export type PostMeta = {
  title: string;
  slug: string;
  category: PostCategorySlug;
  excerpt: string;
  /** ISO date, YYYY-MM-DD */
  publishedAt: string;
  status: ContentStatus;
  readingMinutes: number;
};

export type Post = PostMeta & {
  html: string;
  toc: TocItem[];
};

export type ProjectMeta = {
  title: string;
  slug: string;
  summary: string;
  thumbnail?: string;
  /** Required with thumbnail: describes the image for screen readers. */
  thumbnailAlt?: string;
  techStack: readonly string[];
  role: string;
  /** YYYY-MM. Omitted when the source has no project-level period. */
  startedAt?: string;
  endedAt?: string;
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  sortOrder: number;
  status: ContentStatus;
};

export type Project = ProjectMeta & {
  html: string;
  toc: TocItem[];
};
