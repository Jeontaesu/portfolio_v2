import type { Metadata } from "next";
import type { ReactNode } from "react";

import { SkipLink } from "@/components/layout/skip-link";

import { BreakpointBadge } from "./_components/breakpoint-badge";
import { GuideNav } from "./_components/guide-nav";

// A tool for building and reviewing components, not a page to find through search: noindex, out of the
// sitemap, disallowed in robots.txt. It shares tokens and primitives with the site but not its header/footer.
export const metadata: Metadata = {
  title: { default: "Components", template: "%s | Components" },
  description: "MEFLOWEB UI 컴포넌트 가이드",
  robots: { index: false, follow: false },
};

export default function GuideLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh lg:flex">
      <SkipLink />
      <GuideNav />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-w-0 flex-1 px-5 py-10 outline-none md:px-8 lg:px-12 lg:py-14"
      >
        <div className="max-w-4xl">{children}</div>
      </main>
      <BreakpointBadge />
    </div>
  );
}
