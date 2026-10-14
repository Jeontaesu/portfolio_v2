import Link from "next/link";

import { PostListItem } from "@/components/features/blog/post-list-item";
import { getPosts } from "@/lib/content/posts";

import { SectionHeader } from "./section-header";

export async function BlogPreview() {
  const posts = (await getPosts()).slice(0, 3);

  return (
    <section aria-labelledby="blog-title" className="container-page py-20 lg:py-32">
      <SectionHeader id="blog-title" overline="Technical Blog" title="최근 글" />
      {posts.length > 0 ? (
        <>
          <ul className="mt-12 border-b border-border">
            {posts.map((post) => (
              <PostListItem key={post.slug} post={post} />
            ))}
          </ul>
          <Link
            href="/blog"
            className="mt-8 inline-flex min-h-11 items-center text-primary underline underline-offset-4"
          >
            View all
          </Link>
        </>
      ) : (
        <p className="mt-12 border-t border-border pt-8 text-body text-secondary">
          아직 게시된 글이 없습니다.
        </p>
      )}
    </section>
  );
}
