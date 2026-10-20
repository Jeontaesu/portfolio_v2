"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/guard";
import { db } from "@/lib/db/client";
import type { FormState } from "@/lib/admin/form-state";
import { revalidatePublicSite } from "@/lib/admin/revalidate";
import { postSchema } from "@/lib/validations/post";

import {
  fieldError,
  isNotFound,
  isUniqueViolation,
  unexpectedError,
  validationError,
} from "./helpers";

/**
 * Create (id = null) or update a post. Every Server Action is a public POST endpoint, so it checks the
 * admin role and validates the input itself: hiding the form from non-admins is not authorization.
 */
export async function savePost(
  id: string | null,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  const admin = await requireAdmin();

  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationError(parsed.error);
  const { intent, categoryId, ...fields } = parsed.data;

  let savedId: string;
  try {
    const slugOwner = await db.post.findUnique({
      where: { slug: fields.slug },
      select: { id: true },
    });
    if (slugOwner && slugOwner.id !== id) {
      return fieldError("slug", "이미 사용 중인 slug입니다.");
    }

    if (categoryId && !(await db.category.findUnique({ where: { id: categoryId } }))) {
      return fieldError("categoryId", "존재하지 않는 카테고리입니다.");
    }

    const status: "PUBLISHED" | "DRAFT" = intent === "publish" ? "PUBLISHED" : "DRAFT";
    const existing = id
      ? await db.post.findUnique({ where: { id }, select: { publishedAt: true } })
      : null;
    if (id && !existing) return { status: "error", message: "글을 찾을 수 없습니다." };

    // The first publish date is kept when a post is unpublished and published again.
    const publishedAt =
      status === "PUBLISHED" ? (existing?.publishedAt ?? new Date()) : existing?.publishedAt;

    const data = { ...fields, categoryId: categoryId ?? null, status, publishedAt };
    const saved = id
      ? await db.post.update({ where: { id }, data, select: { id: true } })
      : await db.post.create({ data: { ...data, authorId: admin.id }, select: { id: true } });
    savedId = saved.id;
  } catch (error) {
    if (isUniqueViolation(error)) return fieldError("slug", "이미 사용 중인 slug입니다.");
    return unexpectedError("savePost", error);
  }

  revalidatePublicSite();

  // redirect() works by throwing, so it stays outside the try/catch.
  if (!id) redirect(`/admin/posts/${savedId}`);
  return {
    status: "success",
    message: intent === "publish" ? "게시했습니다." : "초안으로 저장했습니다.",
  };
}

export async function deletePost(id: string): Promise<void> {
  await requireAdmin();
  try {
    await db.post.delete({ where: { id } });
  } catch (error) {
    // Already deleted in another tab: the goal (the post is gone) is met.
    if (!isNotFound(error)) throw error;
  }
  revalidatePublicSite();
  redirect("/admin/posts");
}
