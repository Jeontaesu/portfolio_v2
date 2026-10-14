import { cn } from "@/lib/utils/cn";
import type { TocItem } from "@/lib/markdown/toc";

function TocList({ items }: { items: readonly TocItem[] }) {
  return (
    <ol className="flex flex-col gap-2 text-body-sm">
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && "pl-4")}>
          <a href={`#${item.id}`} className="text-secondary hover:text-foreground hover:underline">
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Desktop: sticky side list. Below lg: collapsible block above the body (CSS switch, no JS). */
export function TableOfContents({ items }: { items: readonly TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <>
      <details className="border-y border-border py-4 lg:hidden">
        <summary className="cursor-pointer text-body-sm font-semibold">목차</summary>
        <nav aria-label="목차" className="mt-4">
          <TocList items={items} />
        </nav>
      </details>
      <nav aria-label="목차" className="hidden lg:sticky lg:top-28 lg:block">
        <p className="mb-4 text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          목차
        </p>
        <TocList items={items} />
      </nav>
    </>
  );
}
