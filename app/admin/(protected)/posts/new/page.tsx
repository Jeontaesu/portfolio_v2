import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { PostForm } from "@/components/features/blog/post-form";
import { getCategoryOptions } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "New Post" };

export default async function NewPostPage() {
  await requireAdmin();
  const categories = await getCategoryOptions();

  return (
    <div className="flex max-w-3xl flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/admin/posts"
          className="inline-flex min-h-11 items-center gap-1 text-body-sm font-semibold"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Posts
        </Link>
        <h1 className="text-h2">New Post</h1>
      </div>
      <PostForm categories={categories} />
    </div>
  );
}
