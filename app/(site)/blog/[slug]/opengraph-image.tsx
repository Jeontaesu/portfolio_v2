import { categoryName } from "@/components/features/blog/post-list-item";
import { getPost, getPosts } from "@/lib/content/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/seo/og-image";

export const alt = "블로그 글 대표 이미지";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgImage({
    eyebrow: post ? `BLOG · ${categoryName(post.category).toUpperCase()}` : "BLOG",
    title: post?.title ?? "Blog",
  });
}
