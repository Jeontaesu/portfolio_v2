import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import { projects } from "@/content/projects";
import { renderMarkdown } from "@/lib/markdown/render";

import type { Project, ProjectMeta } from "./types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

function listPublished(): ProjectMeta[] {
  const seen = new Set<string>();
  for (const p of projects) {
    if (seen.has(p.slug)) throw new Error(`[content/projects] duplicate slug "${p.slug}"`);
    seen.add(p.slug);
  }
  // DRAFT is excluded here so no page can leak it. sortOrder ascending.
  return projects
    .filter((p) => p.status === "PUBLISHED")
    .toSorted((a, b) => a.sortOrder - b.sortOrder);
}

export async function getProjects(): Promise<ProjectMeta[]> {
  return listPublished();
}

export async function getFeaturedProjects(): Promise<ProjectMeta[]> {
  return listPublished().filter((p) => p.featured);
}

export async function getProject(slug: string): Promise<Project | null> {
  const meta = listPublished().find((p) => p.slug === slug);
  if (!meta) return null;
  const source = await fs.readFile(path.join(PROJECTS_DIR, `${meta.slug}.md`), "utf8").catch(() => {
    throw new Error(`[content/projects] missing body file content/projects/${meta.slug}.md`);
  });
  const { html, toc } = await renderMarkdown(source);
  return { ...meta, html, toc };
}

/** Previous/next in sortOrder, for the Case Study footer navigation. */
export async function getAdjacentProjects(slug: string) {
  const list = listPublished();
  const index = list.findIndex((p) => p.slug === slug);
  return {
    previous: index > 0 ? (list[index - 1] ?? null) : null,
    next: index >= 0 ? (list[index + 1] ?? null) : null,
  };
}
