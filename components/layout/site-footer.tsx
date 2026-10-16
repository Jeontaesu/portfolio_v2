import Link from "next/link";

import { profile } from "@/content/profile";

import { NAV_ITEMS } from "./nav-items";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-8 py-12 lg:py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="text-h3 font-bold tracking-tight">{profile.brand}</p>
          <nav aria-label="푸터 메뉴">
            <ul className="flex flex-wrap gap-x-6 text-body-sm text-secondary">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-border pt-6 text-caption text-secondary md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.brand}
          </p>
          <p>{profile.tagline}</p>
          <a href="#top" className="inline-flex min-h-11 items-center font-semibold">
            맨 위로 ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
