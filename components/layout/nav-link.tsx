"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

type NavLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & { href: string };

/** Link that marks the current page with aria-current and a visible underline. */
export function NavLink({ href, className, children, ...props }: NavLinkProps) {
  const pathname = usePathname();
  const isCurrent = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={isCurrent ? "page" : undefined}
      className={cn(
        "decoration-2 underline-offset-8 transition-colors hover:underline",
        isCurrent ? "text-foreground underline" : "text-secondary hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
