import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CategoryForm } from "@/components/features/blog/category-form";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "New Category" };

export default async function NewCategoryPage() {
  await requireAdmin();

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
        <h1 className="text-h2">New Category</h1>
      </div>
      <CategoryForm />
    </div>
  );
}
