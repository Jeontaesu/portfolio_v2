import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  /** Small uppercase label, e.g. "SELECTED WORKS". Visual only — `title` is the real heading. */
  overline: string;
  title: string;
  description?: string;
  id: string;
  /** Link shown at the right end on desktop (below the title on mobile), e.g. "View all". */
  action?: ReactNode;
  className?: string;
};

export function SectionHeader({
  overline,
  title,
  description,
  id,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn("flex flex-col gap-4 md:flex-row md:items-end md:justify-between", className)}
    >
      <div className="flex flex-col gap-4">
        <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
          {overline}
        </p>
        <h2 id={id} className="max-w-3xl text-h2">
          {title}
        </h2>
        {description && <p className="max-w-2xl text-body-lg text-secondary">{description}</p>}
      </div>
      {action}
    </header>
  );
}
