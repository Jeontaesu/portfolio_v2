import Link from "next/link";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { MAIN_NAV_ITEMS, RESUME_NAV_ITEM, CONTACT_NAV_ITEM } from "./nav-items";
import { profile } from "@/content/profile";

/**
 * Below md: one row, brand + full-screen menu. From md: two rows (DESIGN §5.1) — brand, tagline and Resume
 * on top, page links and Contact below. The two-row header is tall, so it only sticks on mobile.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur md:static">
      <div className="container-page flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center text-h4 font-bold tracking-tight md:text-h3"
        >
          {profile.brand}
        </Link>
        <p className="hidden text-caption font-semibold tracking-[0.08em] text-secondary uppercase lg:block">
          {profile.tagline}
        </p>
        <NavLink
          href={RESUME_NAV_ITEM.href}
          className="hidden min-h-11 items-center text-body-sm font-semibold md:inline-flex"
        >
          {RESUME_NAV_ITEM.label}
        </NavLink>
        <MobileNav />
      </div>
      <div className="hidden border-t border-border md:block">
        <nav aria-label="주요 메뉴" className="container-page flex items-center justify-between">
          <ul className="flex items-center gap-8 text-body-sm font-semibold">
            {MAIN_NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} className="inline-flex min-h-11 items-center">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink
            href={CONTACT_NAV_ITEM.href}
            className="inline-flex min-h-11 items-center text-body-sm font-semibold"
          >
            {CONTACT_NAV_ITEM.label}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
