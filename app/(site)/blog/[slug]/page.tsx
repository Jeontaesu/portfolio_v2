import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { MarkdownContent } from "@/components/ui/markdown-content";
import { UNCATEGORIZED_LABEL } from "@/components/features/blog/post-list-item";
import { TableOfContents } from "@/components/features/blog/table-of-contents";
import { getPost, getPosts } from "@/lib/content/posts";
import { jsonLd, pageMetadata } from "@/lib/seo/metadata";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site";
import { formatDate } from "@/lib/utils/format-date";

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    author: { "@type": "Person", name: SITE_NAME },
  };

  return (
    <article className="container-page pt-8 pb-16 lg:pt-12 lg:pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }}
      />
      {/* Decorative reading-progress bar. Shown only where CSS scroll timelines work and motion is allowed. */}
      <div
        aria-hidden="true"
        className="scroll-progress fixed inset-x-0 top-0 z-50 h-0.5 bg-primary"
      />
      <Link
        href="/blog"
        className="inline-flex min-h-11 items-center gap-1 text-body-sm text-secondary hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to Blog
      </Link>
      <header className="mt-6 flex max-w-3xl flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
          {post.category?.name ?? UNCATEGORIZED_LABEL}
        </p>
        <h1 className="text-h1">{post.title}</h1>
        <p className="text-body-sm text-secondary">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
          {post.readingMinutes} min read
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-10 border-t border-foreground pt-10 lg:grid-cols-12">
        <div className="lg:order-2 lg:col-span-3">
          <TableOfContents items={post.toc} />
        </div>
        <div className="lg:order-1 lg:col-span-9">
          <MarkdownContent html={post.html} />
        </div>
      </div>
    </article>
  );
}
