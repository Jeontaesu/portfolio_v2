import "server-only";

import { db } from "@/lib/db/client";
import type { Project as ProjectRow } from "@/lib/db/generated/client";
import { renderMarkdown } from "@/lib/markdown/render";

import type { Project, ProjectMeta } from "./types";

// PUBLISHED only, so DRAFT can never reach a page. sortOrder ascending.
const published = { status: "PUBLISHED" } as const;
const order = { sortOrder: "asc" } as const;

/** Date column → "YYYY-MM" (the site shows months, the column holds the first day). */
function toMonth(date: Date | null): string | undefined {
  return date ? date.toISOString().slice(0, 7) : undefined;
}

function toMeta(row: ProjectRow): ProjectMeta {
  return {
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    thumbnail: row.thumbnail ?? undefined,
    thumbnailAlt: row.thumbnailAlt ?? undefined,
    thumbnailFit: row.thumbnailFit === "CONTAIN" ? "contain" : "cover",
    techStack: row.techStack,
    role: row.role,
    startedAt: toMonth(row.startedAt),
    endedAt: toMonth(row.endedAt),
    githubUrl: row.githubUrl ?? undefined,
    demoUrl: row.demoUrl ?? undefined,
    featured: row.featured,
    sortOrder: row.sortOrder,
    status: "PUBLISHED",
  };
}

export async function getProjects(): Promise<ProjectMeta[]> {
  const rows = await db.project.findMany({ where: published, orderBy: order });
  return rows.map(toMeta);
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  const rows = await db.project.findMany({
    where: { ...published, featured: true },
    orderBy: order,
  });
  return rows.map(toMeta);
}

export async function getProject(slug: string): Promise<Project | null> {
  const row = await db.project.findFirst({ where: { ...published, slug } });
  if (!row) return null;
  const { html, toc } = await renderMarkdown(row.content);
  return { ...toMeta(row), html, toc };
}

/** Previous/next in sortOrder, for the Case Study footer navigation. */
export async function getAdjacentProjects(slug: string) {
  const list = await getProjects();
  const index = list.findIndex((p) => p.slug === slug);
  return {
    previous: index > 0 ? (list[index - 1] ?? null) : null,
    next: index >= 0 ? (list[index + 1] ?? null) : null,
  };
}
