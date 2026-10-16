import type { Metadata } from "next";
import Link from "next/link";

import { CategoryFilter } from "@/components/features/blog/category-filter";
import { PageHeader } from "@/components/layout/page-header";
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
    <div className="container-page pt-12 pb-16 lg:pt-20 lg:pb-24">
      <PageHeader
        overline="Technical Blog"
        title="기술 블로그"
        description="직접 겪은 문제와 해결 과정을 기록합니다."
      />
      <div className="mt-12 border-t border-foreground pt-8">
        <CategoryFilter categories={categories} current={category} />
      </div>
      {posts.length > 0 ? (
        <ul className="mt-10 border-b border-border">
          {posts.map((post) => (
            <PostListItem key={post.slug} post={post} headingLevel="h2" />
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
              className="mt-4 inline-flex min-h-11 items-center text-body-sm font-semibold text-primary"
            >
              전체 글 보기
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
