import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

/**
 * Placeholder block for the loading state. Decorative, so it is hidden from assistive tech;
 * wrap a group of them in SkeletonRegion to announce loading once. The pulse is CSS and
 * only runs when the user has not asked for reduced motion.
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("bg-border motion-safe:animate-pulse", className)} />
  );
}

type SkeletonRegionProps = {
  /** Announced to screen readers; nothing is shown for it. */
  label?: string;
  className?: string;
  children: ReactNode;
};

/** One polite "loading" announcement for a group of Skeletons. */
export function SkeletonRegion({
  label = "불러오는 중",
  className,
  children,
}: SkeletonRegionProps) {
  return (
    <div role="status" className={className}>
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
