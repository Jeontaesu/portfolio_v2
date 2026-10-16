import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type PageHeaderProps = {
  /** Small uppercase label above the title. Visual only; `title` is the page's h1. */
  overline: string;
  title: string;
  /** Short note. Sits to the right of the title on desktop, below it on mobile. */
  description?: string;
  /** Extra content under the title, e.g. a download link. */
  children?: ReactNode;
  className?: string;
};

/** Opening block of a public page, the same shape as the Home hero: title left, note right. */
export function PageHeader({ overline, title, description, children, className }: PageHeaderProps) {
  return (
    <header className={cn("grid gap-8 lg:grid-cols-12 lg:gap-6", className)}>
      <div className="lg:col-span-8">
        <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
          {overline}
        </p>
        <h1 className="mt-4 text-h1">{title}</h1>
        {children}
      </div>
      {description && (
        <p className="text-body-sm text-secondary lg:col-span-3 lg:col-start-10 lg:pt-10">
          {description}
        </p>
      )}
    </header>
  );
}
