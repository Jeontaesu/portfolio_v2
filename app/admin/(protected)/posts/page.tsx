import Link from "next/link";
import { Plus } from "lucide-react";

import { PostTable } from "@/components/features/blog/post-table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";
import { getAdminPosts, getAllCategories, type StatusFilter } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Posts" };

function first(value: string | string[] | undefined): string | undefined {
  const v = Array.isArray(value) ? value[0] : value;
  return v?.trim() || undefined;
}

function parseStatus(value: string | undefined): StatusFilter | undefined {
  return value === "PUBLISHED" || value === "DRAFT" ? value : undefined;
}

function parsePage(value: string | undefined): number {
  const n = Number(value);
  return Number.isInteger(n) && n >= 1 ? n : 1;
}

export default async function AdminPostsPage({ searchParams }: PageProps<"/admin/posts">) {
  await requireAdmin();

  const sp = await searchParams;
  const q = first(sp.q)?.slice(0, 100);
  const status = parseStatus(first(sp.status));
  const categories = await getAllCategories();
  // Unknown category slugs are ignored instead of producing an empty list that looks like a bug.
  const categoryParam = first(sp.category);
  const category =
    categoryParam === "none" || categories.some((c) => c.slug === categoryParam)
      ? categoryParam
      : undefined;

  const list = await getAdminPosts({ q, status, category, page: parsePage(first(sp.page)) });
  const isFiltered = Boolean(q || status || category);

  function hrefFor(page: number): string {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status) params.set("status", status);
    if (category) params.set("category", category);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `/admin/posts?${qs}` : "/admin/posts";
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-h2">Posts</h1>
        <Button asChild>
          <Link href="/admin/posts/new">
            <Plus className="size-5" aria-hidden="true" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Plain GET form: filters live in the URL, work without JS and can be shared. */}
      <form
        role="search"
        aria-label="글 검색"
        method="get"
        className="grid gap-3 md:grid-cols-[1fr_180px_180px_auto]"
      >
        <div>
          <label htmlFor="q" className="sr-only">
            제목 검색
          </label>
          <Input
            id="q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="제목 검색"
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="status" className="sr-only">
            상태
          </label>
          <Select id="status" name="status" defaultValue={status ?? ""}>
            <option value="">전체 상태</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </Select>
        </div>
        <div>
          <label htmlFor="category" className="sr-only">
            카테고리
          </label>
          <Select id="category" name="category" defaultValue={category ?? ""}>
            <option value="">전체 카테고리</option>
            <option value="none">미분류</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <Button type="submit">검색</Button>
      </form>

      <p className="text-body-sm text-secondary">{list.total}개의 글</p>

      {list.rows.length > 0 ? (
        <>
          <PostTable rows={list.rows} caption={isFiltered ? "검색 결과 글 목록" : "전체 글 목록"} />
          <Pagination page={list.page} pageCount={list.pageCount} hrefFor={hrefFor} />
        </>
      ) : isFiltered ? (
        <EmptyState
          title="조건에 맞는 글이 없습니다."
          description="검색어나 필터를 바꿔 보세요."
          action={
            <Button asChild variant="secondary" size="sm">
              <Link href="/admin/posts">필터 초기화</Link>
            </Button>
          }
        />
      ) : (
        <EmptyState
          title="아직 글이 없습니다."
          description="첫 게시글을 작성해보세요."
          action={
            <Button asChild size="sm">
              <Link href="/admin/posts/new">New Post</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
