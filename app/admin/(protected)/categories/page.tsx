import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getCategoriesWithCounts } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Categories" };

const thClass =
  "text-caption py-3 pr-4 text-left font-semibold tracking-[0.08em] text-secondary uppercase";

export default async function AdminCategoriesPage() {
  await requireAdmin();
  const categories = await getCategoriesWithCounts();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h2">Categories</h1>
        <Button asChild>
          <Link href="/admin/categories/new">
            <Plus className="size-5" aria-hidden="true" />
            New Category
          </Link>
        </Button>
      </div>

      {categories.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <caption className="sr-only">카테고리 목록</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className={thClass}>
                  Name
                </th>
                <th scope="col" className={`${thClass} hidden md:table-cell`}>
                  Slug
                </th>
                <th scope="col" className={thClass}>
                  Posts
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-border">
                  <th scope="row" className="py-4 pr-4 text-left text-body-sm font-semibold">
                    <Link
                      href={`/admin/categories/${category.id}`}
                      className="inline-flex min-h-11 items-center hover:underline"
                    >
                      {category.name}
                    </Link>
                  </th>
                  <td className="hidden py-4 pr-4 text-body-sm text-secondary md:table-cell">
                    {category.slug}
                  </td>
                  <td className="py-4 pr-4 text-body-sm text-secondary">{category.postCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          title="아직 카테고리가 없습니다."
          description="카테고리를 만들면 글을 분류하고 블로그에서 필터로 쓸 수 있습니다."
          action={
            <Button asChild size="sm">
              <Link href="/admin/categories/new">New Category</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
