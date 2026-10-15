import { PostTable } from "@/components/features/blog/post-table";
import { StatCard } from "@/components/features/dashboard/stat-card";
import { EmptyState } from "@/components/ui/empty-state";
import { getDashboardStats, getRecentPosts } from "@/lib/admin/queries";
import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  // Pages check again themselves (see the layout comment): a page must not rely on its layout for auth.
  await requireAdmin();
  const [stats, recentPosts] = await Promise.all([getDashboardStats(), getRecentPosts()]);

  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-h2">Dashboard</h1>

      <dl className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          label="Posts"
          value={stats.posts.total}
          detail={`${stats.posts.published} published`}
        />
        <StatCard
          label="Projects"
          value={stats.projects.total}
          detail={`${stats.projects.published} published`}
        />
        <StatCard label="Drafts" value={stats.drafts} detail="글·프로젝트 초안" />
      </dl>

      <section aria-labelledby="recent-posts-title" className="flex flex-col gap-4">
        <h2 id="recent-posts-title" className="text-h4">
          최근 수정한 글
        </h2>
        {recentPosts.length > 0 ? (
          <PostTable rows={recentPosts} caption="최근 수정한 글 5개" />
        ) : (
          <EmptyState title="아직 글이 없습니다." description="첫 게시글을 작성해보세요." />
        )}
      </section>
    </div>
  );
}
