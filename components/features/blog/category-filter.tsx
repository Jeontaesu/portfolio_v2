import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import { POST_CATEGORIES, type PostCategorySlug } from "@/lib/content/types";

type CategoryFilterProps = {
  current?: PostCategorySlug;
};

const itemClass =
  "inline-flex min-h-11 items-center border px-4 text-caption font-semibold tracking-[0.08em] uppercase";

/** Filter is plain links to ?category=… so it works without JS and is shareable. */
export function CategoryFilter({ current }: CategoryFilterProps) {
  const items = [{ slug: undefined, name: "All" }, ...POST_CATEGORIES];
  return (
    <nav aria-label="카테고리">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const active = item.slug === current;
          return (
            <li key={item.slug ?? "all"}>
              <Link
                href={item.slug ? `/blog?category=${item.slug}` : "/blog"}
                aria-current={active ? "page" : undefined}
                className={cn(
                  itemClass,
                  active
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface text-secondary hover:text-foreground",
                )}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
