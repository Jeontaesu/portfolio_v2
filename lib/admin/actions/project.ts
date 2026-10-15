"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/guard";
import { db } from "@/lib/db/client";
import type { FormState } from "@/lib/admin/form-state";
import { revalidatePublicSite } from "@/lib/admin/revalidate";
import { projectSchema } from "@/lib/validations/project";

import { fieldError, isUniqueViolation, unexpectedError, validationError } from "./helpers";

export async function saveProject(
  id: string | null,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = projectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationError(parsed.error);
  const { intent, ...fields } = parsed.data;

  let savedId: string;
  try {
    const slugOwner = await db.project.findUnique({
      where: { slug: fields.slug },
      select: { id: true },
    });
    if (slugOwner && slugOwner.id !== id) {
      return fieldError("slug", "이미 사용 중인 slug입니다.");
    }
    if (id && !(await db.project.findUnique({ where: { id }, select: { id: true } }))) {
      return { status: "error", message: "프로젝트를 찾을 수 없습니다." };
    }

    const status: "PUBLISHED" | "DRAFT" = intent === "publish" ? "PUBLISHED" : "DRAFT";
    // Optional fields that were emptied must be cleared (null), not left unchanged (undefined).
    const data = {
      ...fields,
      status,
      thumbnail: fields.thumbnail ?? null,
      thumbnailAlt: fields.thumbnail ? (fields.thumbnailAlt ?? null) : null,
      startedAt: fields.startedAt ?? null,
      endedAt: fields.endedAt ?? null,
      githubUrl: fields.githubUrl ?? null,
      demoUrl: fields.demoUrl ?? null,
    };

    if (id) {
      savedId = (await db.project.update({ where: { id }, data, select: { id: true } })).id;
    } else {
      // New projects go to the end of the list; order is changed with move up / down.
      const last = await db.project.aggregate({ _max: { sortOrder: true } });
      const sortOrder = (last._max.sortOrder ?? 0) + 1;
      savedId = (await db.project.create({ data: { ...data, sortOrder }, select: { id: true } }))
        .id;
    }
  } catch (error) {
    if (isUniqueViolation(error)) return fieldError("slug", "이미 사용 중인 slug입니다.");
    return unexpectedError("saveProject", error);
  }

  revalidatePublicSite();
  if (!id) redirect(`/admin/projects/${savedId}`);
  return {
    status: "success",
    message: intent === "publish" ? "게시했습니다." : "초안으로 저장했습니다.",
  };
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdmin();
  try {
    await db.project.delete({ where: { id } });
  } catch (error) {
    // Already deleted in another tab: the goal is met.
    if (!(
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === "P2025"
    )) {
      throw error;
    }
  }
  revalidatePublicSite();
  redirect("/admin/projects");
}

/**
 * Moves a project one step up or down. Orders are renumbered 1..n inside one transaction, so equal or
 * gapped sortOrder values (e.g. from seed data) never make a click do nothing.
 */
export async function moveProject(id: string, direction: "up" | "down"): Promise<void> {
  await requireAdmin();
  if (direction !== "up" && direction !== "down") return;

  const projects = await db.project.findMany({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    select: { id: true },
  });
  const from = projects.findIndex((project) => project.id === id);
  const to = direction === "up" ? from - 1 : from + 1;
  if (from === -1 || to < 0 || to >= projects.length) return;

  const reordered = projects.map((project) => project.id);
  [reordered[from], reordered[to]] = [reordered[to]!, reordered[from]!];

  await db.$transaction(
    reordered.map((projectId, index) =>
      db.project.update({ where: { id: projectId }, data: { sortOrder: index + 1 } }),
    ),
  );
  revalidatePublicSite();
  redirect("/admin/projects");
}

export async function toggleFeatured(id: string): Promise<void> {
  await requireAdmin();
  const project = await db.project.findUnique({ where: { id }, select: { featured: true } });
  if (!project) return;
  await db.project.update({ where: { id }, data: { featured: !project.featured } });
  revalidatePublicSite();
  redirect("/admin/projects");
}
