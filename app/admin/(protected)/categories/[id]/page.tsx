import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CategoryForm } from "@/components/features/blog/category-form";
import { ConfirmDelete } from "@/components/ui/confirm-delete";
import { deleteCategory } from "@/lib/admin/actions/category";
import { getAdminCategory } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Edit Category" };

export default async function EditCategoryPage({ params }: PageProps<"/admin/categories/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const category = await getAdminCategory(id);
  if (!category) notFound();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/categories"
          className="inline-flex min-h-11 items-center gap-1 text-body-sm font-semibold"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Categories
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-h2">Edit Category</h1>
          <ConfirmDelete
            targetName={category.name}
            consequence={
              category.postCount > 0
                ? `이 카테고리의 글 ${category.postCount}개는 삭제되지 않고 미분류로 남습니다.`
                : undefined
            }
            action={deleteCategory.bind(null, category.id)}
          />
        </div>
      </div>
      <CategoryForm key={category.id} category={category} />
    </div>
  );
}
