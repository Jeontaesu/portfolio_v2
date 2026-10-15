import { requireAdmin } from "@/lib/auth/guard";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  // Pages check again themselves (see the layout comment): a page must not rely on its layout for auth.
  await requireAdmin();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-h2">Dashboard</h1>
      <p className="max-w-2xl text-body text-secondary">
        로그인과 권한 확인이 동작하는 상태입니다. 게시글·프로젝트 통계와 목록은 다음 단계에서 실제
        데이터로 구현합니다.
      </p>
    </div>
  );
}
