import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  /** Optional next step, e.g. a Button asChild around a Link. */
  action?: ReactNode;
};

/** "Nothing here yet" for data views (the empty state of loading / empty / error / success). */
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-start gap-3 border border-dashed border-muted p-8">
      <p className="text-h4">{title}</p>
      {description && <p className="max-w-xl text-body text-secondary">{description}</p>}
      {action}
    </div>
  );
}
