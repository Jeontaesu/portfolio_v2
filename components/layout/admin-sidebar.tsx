import { ExternalLink } from "@/components/ui/external-link";
import { Button } from "@/components/ui/button";

import { AdminNavLinks } from "./admin-nav-links";

type AdminSidebarProps = {
  userLabel: string;
  /** Server Action that signs out (it checks the admin itself). */
  signOutAction: () => Promise<void>;
};

/** Sidebar content. Rendered once inside the fixed desktop column and once inside the mobile drawer. */
export function AdminSidebar({ userLabel, signOutAction }: AdminSidebarProps) {
  return (
    <div className="flex h-full flex-col gap-8 p-4">
      <p className="px-3 py-2 text-body font-semibold">MEFLOWEB Admin</p>
      <nav aria-label="관리자 메뉴" className="flex-1">
        <AdminNavLinks />
      </nav>
      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <p className="truncate px-3 text-body-sm text-secondary">{userLabel}</p>
        <ExternalLink href="/" className="min-h-11 px-3 text-body-sm font-semibold">
          사이트 보기
        </ExternalLink>
        <form action={signOutAction}>
          <Button type="submit" variant="secondary" size="sm" className="w-full">
            로그아웃
          </Button>
        </form>
      </div>
    </div>
  );
}
