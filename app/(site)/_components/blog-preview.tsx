import Link from "next/link";

import { CategoryFilter } from "@/components/features/blog/category-filter";
import { UNCATEGORIZED_LABEL } from "@/components/features/blog/post-list-item";
import { getPostCategories, getPosts } from "@/lib/content/posts";
import { formatDate } from "@/lib/utils/format-date";

import { SectionHeader } from "./section-header";

/** Latest two posts as editorial columns. The category chips link to /blog?category=… (same filter as /blog). */
export async function BlogPreview() {
  const [allPosts, categories] = await Promise.all([getPosts(), getPostCategories()]);
  const posts = allPosts.slice(0, 2);

  return (
    <section
      aria-labelledby="blog-title"
      className="container-page border-t border-foreground py-16 lg:py-24"
    >
      <SectionHeader
        id="blog-title"
        overline="Technical Blog"
        title="만들면서 배운 것들을 씁니다"
        action={
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center text-body-sm font-semibold text-primary"
          >
            블로그 전체 보기<span aria-hidden="true">&nbsp;→</span>
          </Link>
        }
      />
      {posts.length > 0 ? (
        <>
          <div className="mt-8">
            <CategoryFilter categories={categories} />
          </div>
          <ul className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
            {posts.map((post) => (
              <li key={post.slug} className="reveal border-t border-border pt-6">
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
                <p className="mt-3 line-clamp-3 text-body text-secondary">{post.excerpt}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-10 border-t border-border pt-8 text-body text-secondary">
          아직 게시된 글이 없습니다.
        </p>
      )}
    </section>
  );
}
