import Link from "next/link";

import type { PostMeta } from "@/lib/content/types";
import { formatDate } from "@/lib/utils/format-date";

/** Shown when a post has no category (its category was deleted). */
export const UNCATEGORIZED_LABEL = "Uncategorized";

type PostListItemProps = {
  post: PostMeta;
  /** Heading level of the title: h3 under a section's h2 (Home), h2 directly under the page's h1. */
  headingLevel?: "h2" | "h3";
};

/** Editorial list row (not a card): meta line, title, excerpt. */
export function PostListItem({ post, headingLevel: Heading = "h3" }: PostListItemProps) {
  return (
    <li className="border-t border-border py-8">
      <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
        {post.category?.name ?? UNCATEGORIZED_LABEL} ·{" "}
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
        {post.readingMinutes} min read
      </p>
      <Heading className="mt-3 text-h3">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </Heading>
      <p className="mt-2 max-w-2xl text-body text-secondary">{post.excerpt}</p>
    </li>
  );
}
