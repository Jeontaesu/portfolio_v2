import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { NavLink } from "@/components/layout/nav-link";

import { GUIDE_GROUPS } from "./guide-nav-items";

/** Component list. Mobile: wrapping rows above the content. lg: fixed-width sidebar that scrolls on its own. */
export function GuideNav() {
  return (
    <nav
      aria-label="컴포넌트 목록"
      className="border-b border-border bg-surface px-5 py-6 md:px-8 lg:sticky lg:top-0 lg:h-dvh lg:w-60 lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-b-0 lg:px-6 lg:py-10"
    >
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-1 text-body-sm text-secondary hover:text-foreground hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        포트폴리오로 돌아가기
      </Link>
      <p className="mt-2 text-h4">
        <Link href="/guide">Components</Link>
      </p>
      <p className="mt-1 text-caption text-secondary">MEFLOWEB UI guide</p>
      <div className="mt-6 flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-x-10 lg:flex-col lg:gap-6">
        {GUIDE_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
              {group.label}
            </p>
            <ul className="mt-1">
              {group.items.map((item) => (
                <li key={item.slug}>
                  <NavLink
                    href={`/guide/${item.slug}`}
                    className="inline-flex min-h-11 items-center text-body-sm"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
