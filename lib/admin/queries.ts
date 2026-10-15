import "server-only";

import { requireAdmin } from "@/lib/auth/guard";
import { db } from "@/lib/db/client";

export const POSTS_PAGE_SIZE = 10;

export type StatusFilter = "PUBLISHED" | "DRAFT";

export type DashboardStats = {
  posts: { total: number; published: number };
  projects: { total: number; published: number };
  drafts: number;
};

export type AdminPostRow = {
  id: string;
  title: string;
  slug: string;
  status: StatusFilter;
  categoryName: string | null;
  updatedAt: Date;
};

export type AdminPostList = {
  rows: AdminPostRow[];
  total: number;
  page: number;
  pageCount: number;
};

export type AdminPostQuery = {
  q?: string;
  status?: StatusFilter;
  /** Category slug, or "none" for posts without a category. */
  category?: string;
  page: number;
};

// Every read here is an admin read of unpublished data, so each one checks the role itself
// instead of trusting that the calling page did (CLAUDE.md §6 보안).

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireAdmin();
  const [posts, publishedPosts, projects, publishedProjects, draftPosts, draftProjects] =
    await Promise.all([
      db.post.count(),
      db.post.count({ where: { status: "PUBLISHED" } }),
      db.project.count(),
      db.project.count({ where: { status: "PUBLISHED" } }),
      db.post.count({ where: { status: "DRAFT" } }),
      db.project.count({ where: { status: "DRAFT" } }),
    ]);
  return {
    posts: { total: posts, published: publishedPosts },
    projects: { total: projects, published: publishedProjects },
    drafts: draftPosts + draftProjects,
  };
}

const postRowSelect = {
  id: true,
  title: true,
  slug: true,
  status: true,
  updatedAt: true,
  category: { select: { name: true } },
} as const;

type PostRowRecord = {
  id: string;
  title: string;
  slug: string;
  status: StatusFilter;
  updatedAt: Date;
  category: { name: string } | null;
};

function toRow(row: PostRowRecord): AdminPostRow {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status,
    categoryName: row.category?.name ?? null,
    updatedAt: row.updatedAt,
  };
}

export async function getRecentPosts(limit = 5): Promise<AdminPostRow[]> {
  await requireAdmin();
  const rows = await db.post.findMany({
    orderBy: { updatedAt: "desc" },
    take: limit,
    select: postRowSelect,
  });
  return rows.map(toRow);
}

export async function getAdminPosts(query: AdminPostQuery): Promise<AdminPostList> {
  await requireAdmin();

  const where = {
    ...(query.q && { title: { contains: query.q, mode: "insensitive" as const } }),
    ...(query.status && { status: query.status }),
    ...(query.category === "none"
      ? { categoryId: null }
      : query.category && { category: { slug: query.category } }),
  };

  const total = await db.post.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / POSTS_PAGE_SIZE));
  // A page past the end (stale link, deleted rows) shows the last page instead of an empty one.
  const page = Math.min(query.page, pageCount);

  const rows = await db.post.findMany({
    where,
    orderBy: [{ updatedAt: "desc" }, { id: "asc" }],
    skip: (page - 1) * POSTS_PAGE_SIZE,
    take: POSTS_PAGE_SIZE,
    select: postRowSelect,
  });

  return { rows: rows.map(toRow), total, page, pageCount };
}

export async function getAllCategories(): Promise<{ slug: string; name: string }[]> {
  await requireAdmin();
  return db.category.findMany({ orderBy: { name: "asc" }, select: { slug: true, name: true } });
}

export type AdminPostDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: StatusFilter;
  categoryId: string | null;
};

export async function getAdminPost(id: string): Promise<AdminPostDetail | null> {
  await requireAdmin();
  return db.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      content: true,
      status: true,
      categoryId: true,
    },
  });
}

export async function getCategoryOptions(): Promise<{ id: string; name: string }[]> {
  await requireAdmin();
  return db.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } });
}
