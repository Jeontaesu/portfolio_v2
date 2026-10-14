import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/content/posts";
import { getProjects } from "@/lib/content/projects";
import { SITE_URL } from "@/lib/seo/site";

const STATIC_PATHS = ["/", "/projects", "/blog", "/about", "/career", "/resume", "/contact"];

// Only PUBLISHED content: lib/content already filters out DRAFT.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const url = (path: string) => new URL(path, SITE_URL).toString();

  return [
    ...STATIC_PATHS.map((path) => ({ url: url(path) })),
    ...projects.map((project) => ({ url: url(`/projects/${project.slug}`) })),
    ...posts.map((post) => ({ url: url(`/blog/${post.slug}`), lastModified: post.publishedAt })),
  ];
}
