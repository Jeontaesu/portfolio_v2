import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  /** Path from the site root, e.g. "/blog/my-post". Used for canonical and og:url. */
  path: string;
  type?: "website" | "article";
  /** YYYY-MM-DD, for articles. */
  publishedTime?: string;
};

/**
 * Per-page metadata: title, description, canonical, Open Graph.
 * Relative URLs resolve against metadataBase (app/layout.tsx). OG images come from opengraph-image files.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type,
      ...(publishedTime && { publishedTime }),
    },
  };
}

/** Serialize JSON-LD for a <script> tag. "<" is escaped so content cannot close the script element. */
export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
