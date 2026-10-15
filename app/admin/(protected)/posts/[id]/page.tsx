import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { PostForm } from "@/components/features/blog/post-form";
import { PostStatusBadge } from "@/components/features/blog/post-status-badge";
import { ConfirmDelete } from "@/components/ui/confirm-delete";
import { ExternalLink } from "@/components/ui/external-link";
import { deletePost } from "@/lib/admin/actions/post";
import { getAdminPost, getCategoryOptions } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Edit Post" };

export default async function EditPostPage({ params }: PageProps<"/admin/posts/[id]">) {
  await requireAdmin();
  const { id } = await params;
  const [post, categories] = await Promise.all([getAdminPost(id), getCategoryOptions()]);
  if (!post) notFound();

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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-h2">Edit Post</h1>
            <PostStatusBadge status={post.status} />
          </div>
          <div className="flex items-center gap-3">
            {post.status === "PUBLISHED" && (
              <ExternalLink
                href={`/blog/${post.slug}`}
                className="min-h-11 text-body-sm font-semibold"
              >
                사이트에서 보기
              </ExternalLink>
            )}
            <ConfirmDelete targetName={post.title} action={deletePost.bind(null, post.id)} />
          </div>
        </div>
      </div>
      <PostForm key={post.id} post={post} categories={categories} />
    </div>
  );
}
