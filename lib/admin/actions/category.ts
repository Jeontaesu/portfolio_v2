"use server";

import { redirect } from "next/navigation";

import { requireAdmin } from "@/lib/auth/guard";
import { db } from "@/lib/db/client";
import type { FormState } from "@/lib/admin/form-state";
import { revalidatePublicSite } from "@/lib/admin/revalidate";
import { categorySchema } from "@/lib/validations/category";

import { fieldError, isUniqueViolation, unexpectedError, validationError } from "./helpers";

export async function saveCategory(
  id: string | null,
  _previous: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = categorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return validationError(parsed.error);
  const { name, slug } = parsed.data;

  let savedId: string;
  try {
    const [sameName, sameSlug] = await Promise.all([
      db.category.findUnique({ where: { name }, select: { id: true } }),
      db.category.findUnique({ where: { slug }, select: { id: true } }),
    ]);
    if (sameName && sameName.id !== id) return fieldError("name", "이미 있는 카테고리 이름입니다.");
    if (sameSlug && sameSlug.id !== id) return fieldError("slug", "이미 사용 중인 slug입니다.");

    if (id && !(await db.category.findUnique({ where: { id }, select: { id: true } }))) {
      return { status: "error", message: "카테고리를 찾을 수 없습니다." };
    }

    const saved = id
      ? await db.category.update({ where: { id }, data: { name, slug }, select: { id: true } })
      : await db.category.create({ data: { name, slug }, select: { id: true } });
    savedId = saved.id;
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { status: "error", message: "이미 사용 중인 이름 또는 slug입니다." };
    }
    return unexpectedError("saveCategory", error);
  }

  revalidatePublicSite();
  if (!id) redirect(`/admin/categories/${savedId}`);
  return { status: "success", message: "저장했습니다." };
}

/** Posts in the category are kept and become uncategorized (onDelete: SetNull, D-023). */
export async function deleteCategory(id: string): Promise<void> {
  await requireAdmin();
  try {
    await db.category.delete({ where: { id } });
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
  redirect("/admin/categories");
}
