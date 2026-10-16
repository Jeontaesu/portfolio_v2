import type { ReactNode } from "react";

import { AdminMobileNav } from "@/components/layout/admin-mobile-nav";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { MotionProvider } from "@/components/ui/motion-provider";
import { SkipLink } from "@/components/layout/skip-link";
import { signOut } from "@/lib/auth/config";
import { requireAdmin } from "@/lib/auth/guard";

// Everything under (protected) requires an admin. The check runs here on the server for every request;
// each page's data access and every Server Action must still call requireAdmin() themselves, because
// layouts are not re-run on every client-side navigation and are not a security boundary on their own.
export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin();
  const userLabel = admin.name ?? admin.email;

  async function signOutAction() {
    "use server";
    await requireAdmin();
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <MotionProvider>
      <SkipLink />
      <div className="lg:grid lg:grid-cols-[240px_1fr]">
        <aside className="sticky top-0 hidden h-dvh border-r border-border bg-surface lg:block">
          <AdminSidebar userLabel={userLabel} signOutAction={signOutAction} />
        </aside>
        <div className="min-w-0">
          <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
            <p className="text-body font-semibold">MEFLOWEB Admin</p>
            <AdminMobileNav>
              <AdminSidebar userLabel={userLabel} signOutAction={signOutAction} />
            </AdminMobileNav>
          </header>
          <main
            id="main-content"
            tabIndex={-1}
            className="min-h-dvh bg-surface px-4 py-8 outline-none lg:min-h-0 lg:px-8"
          >
            {children}
          </main>
        </div>
      </div>
    </MotionProvider>
  );
}
