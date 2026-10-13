import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { NAV_ITEMS } from "./nav-items";
import { profile } from "@/content/profile";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-h4 font-bold tracking-tight"
        >
          {profile.brand}
        </Link>
        <nav aria-label="주요 메뉴" className="hidden md:block">
          <ul className="flex items-center gap-8 text-body-sm font-semibold lg:gap-10">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} className="inline-flex min-h-11 items-center">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
