// Shapes the pages consume. They mirror the Phase 2 data model (CLAUDE.md §7), so pages do not know
// whether the data came from files or the database.
import type { TocItem } from "@/lib/markdown/toc";

export type ContentStatus = "DRAFT" | "PUBLISHED";

export type Category = {
  slug: string;
  name: string;
};

export type PostMeta = {
  title: string;
  slug: string;
  /** null = uncategorized (its category was deleted). */
  category: Category | null;
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
  /** "contain" for logos and diagrams that must not be cropped. Default "cover". */
  thumbnailFit?: "cover" | "contain";
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
