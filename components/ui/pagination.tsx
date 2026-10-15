import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils/cn";

type PaginationProps = {
  page: number;
  pageCount: number;
  /** Builds the URL for a page so the caller keeps its own search params. */
  hrefFor: (page: number) => string;
};

const itemClass =
  "text-body-sm inline-flex min-h-11 items-center gap-1 rounded-sm border border-muted px-4 font-semibold";

export function Pagination({ page, pageCount, hrefFor }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="페이지 이동" className="flex items-center justify-between gap-4">
      {page > 1 ? (
        <Link href={hrefFor(page - 1)} className={cn(itemClass, "hover:bg-border/60")}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          이전
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(itemClass, "opacity-50")}>
          <ChevronLeft className="size-4" aria-hidden="true" />
          이전
        </span>
      )}
      <p className="text-body-sm text-secondary">
        {page} / {pageCount}
      </p>
      {page < pageCount ? (
        <Link href={hrefFor(page + 1)} className={cn(itemClass, "hover:bg-border/60")}>
          다음
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : (
        <span aria-disabled="true" className={cn(itemClass, "opacity-50")}>
          다음
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
