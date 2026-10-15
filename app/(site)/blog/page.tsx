import type { Metadata } from "next";
import Link from "next/link";

import { CategoryFilter } from "@/components/features/blog/category-filter";
import { PostListItem } from "@/components/features/blog/post-list-item";
import { getPostCategories, getPosts } from "@/lib/content/posts";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description: "프론트엔드 개발과 웹 퍼블리싱을 하며 겪은 문제와 해결 과정을 기록합니다.",
  path: "/blog",
});

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const { category: rawCategory } = await searchParams;
  const value = Array.isArray(rawCategory) ? rawCategory[0] : rawCategory;
  const categories = await getPostCategories();
  // An unknown ?category= falls back to All instead of an empty list.
  const category = categories.find((c) => c.slug === value)?.slug;
  const posts = await getPosts({ category });

  return (
    <div className="container-page py-20 lg:py-32">
      <header className="flex flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Blog
        </p>
        <h1 className="text-h1">기술 블로그</h1>
        <p className="max-w-2xl text-body-lg text-secondary">
          직접 겪은 문제와 해결 과정을 기록합니다.
        </p>
      </header>
      <div className="mt-10">
        <CategoryFilter categories={categories} current={category} />
      </div>
      {posts.length > 0 ? (
        <ul className="mt-10 border-b border-border">
          {posts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </ul>
      ) : (
        <div className="mt-10 border-t border-border pt-8">
          <p className="text-body text-secondary">
            {category ? "이 카테고리에 아직 글이 없습니다." : "아직 게시된 글이 없습니다."}
          </p>
          {category && (
            <Link
              href="/blog"
              className="mt-4 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
            >
              전체 글 보기
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
