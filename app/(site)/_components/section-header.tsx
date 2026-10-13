import { cn } from "@/lib/utils/cn";

type SectionHeaderProps = {
  /** Small uppercase label, e.g. "SELECTED WORKS". Visual only — `title` is the real heading. */
  overline: string;
  title: string;
  description?: string;
  id: string;
  className?: string;
};

export function SectionHeader({ overline, title, description, id, className }: SectionHeaderProps) {
  return (
    <header className={cn("flex flex-col gap-4", className)}>
      <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
        {overline}
      </p>
      <h2 id={id} className="max-w-3xl text-h2">
        {title}
      </h2>
      {description && <p className="max-w-2xl text-body-lg text-secondary">{description}</p>}
    </header>
  );
}
