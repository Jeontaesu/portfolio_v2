import Link from "next/link";

import type { PostMeta } from "@/lib/content/types";
import { formatDate } from "@/lib/utils/format-date";

/** Shown when a post has no category (its category was deleted). */
export const UNCATEGORIZED_LABEL = "Uncategorized";

/** Editorial list row (not a card): meta line, title, excerpt. */
export function PostListItem({ post }: { post: PostMeta }) {
  return (
    <li className="border-t border-border py-8">
      <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
        {post.category?.name ?? UNCATEGORIZED_LABEL} ·{" "}
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
        {post.readingMinutes} min read
      </p>
      <h3 className="mt-3 text-h3">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h3>
      <p className="mt-2 max-w-2xl text-body text-secondary">{post.excerpt}</p>
    </li>
  );
}
