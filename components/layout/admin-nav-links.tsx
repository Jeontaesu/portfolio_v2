"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils/cn";

// Routes are added here as their pages are built; unbuilt ones (Comments, Media, Settings) stay hidden.
const ADMIN_NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText },
] as const;

/** Sidebar list. aria-current marks the page; the filled background is the non-color-only visual cue. */
export function AdminNavLinks() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {ADMIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={isCurrent ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-sm px-3 text-body-sm font-semibold",
                isCurrent
                  ? "bg-foreground text-background"
                  : "text-secondary hover:bg-border/60 hover:text-foreground",
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
