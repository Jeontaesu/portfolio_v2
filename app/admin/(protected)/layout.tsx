import type { ReactNode } from "react";

import { SkipLink } from "@/components/layout/skip-link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/config";
import { requireAdmin } from "@/lib/auth/guard";

// Everything under (protected) requires an admin. The check runs here on the server for every request;
// each page's data access and every Server Action must still call requireAdmin() themselves, because
// layouts are not re-run on every client-side navigation and are not a security boundary on their own.
export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();

  async function signOutAction() {
    "use server";
    await requireAdmin();
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <>
      <SkipLink />
      <header className="border-b border-border bg-surface">
        <div className="flex h-16 items-center justify-between gap-4 px-5 lg:px-10">
          <p className="text-body font-semibold">MEFLOWEB Admin</p>
          <div className="flex items-center gap-4">
            <p className="hidden text-body-sm text-secondary md:block">
              {admin.name ?? admin.email}
            </p>
            <form action={signOutAction}>
              <Button type="submit" variant="secondary" size="sm">
                로그아웃
              </Button>
            </form>
          </div>
        </div>
      </header>
      <main id="main-content" tabIndex={-1} className="px-5 py-10 outline-none lg:px-10">
        {children}
      </main>
    </>
  );
}
