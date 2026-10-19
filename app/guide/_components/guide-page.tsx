import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type GuidePageProps = {
  title: string;
  /** Where the component lives, shown under the title. */
  source?: string;
  description: ReactNode;
  children: ReactNode;
};

/** Page frame: h1, one-line description, then the Demo / PropsTable / CodeBlock sections. */
export function GuidePage({ title, source, description, children }: GuidePageProps) {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="text-h2">{title}</h1>
        {source && <p className="font-mono text-caption text-secondary">{source}</p>}
        <p className="max-w-2xl text-body text-secondary">{description}</p>
      </header>
      {children}
    </article>
  );
}

type DemoProps = {
  title: string;
  description?: ReactNode;
  /** Stack demo items vertically instead of wrapping in a row. */
  column?: boolean;
  children: ReactNode;
};

/** One titled example on a plain surface. The title is an h2 so the page outline stays h1 → h2. */
export function Demo({ title, description, column = false, children }: DemoProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h4">{title}</h2>
      {description && <p className="max-w-2xl text-body-sm text-secondary">{description}</p>}
      <div
        className={cn(
          "border border-border bg-surface p-6",
          column ? "flex flex-col items-start gap-4" : "flex flex-wrap items-center gap-4",
        )}
      >
        {children}
      </div>
    </section>
  );
}

type PropRow = { name: string; type: string; default?: string; description: string };

/** Props table. Scrolls sideways on narrow screens, so the wrapper is keyboard-focusable and labelled. */
export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h4">Props</h2>
      <div
        role="region"
        aria-label="Props 표, 가로 스크롤"
        tabIndex={0}
        className="overflow-x-auto border border-border bg-surface"
      >
        <table className="w-full min-w-xl text-left text-body-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="p-3 font-semibold">
                Prop
              </th>
              <th scope="col" className="p-3 font-semibold">
                Type
              </th>
              <th scope="col" className="p-3 font-semibold">
                Default
              </th>
              <th scope="col" className="p-3 font-semibold">
                설명
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-b border-border align-top last:border-b-0">
                <th scope="row" className="p-3 font-mono font-semibold">
                  {row.name}
                </th>
                <td className="p-3 font-mono text-secondary">{row.type}</td>
                <td className="p-3 font-mono text-secondary">{row.default ?? "-"}</td>
                <td className="p-3 text-secondary">{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** Copyable usage snippet. Long lines scroll, so the block is focusable and labelled (same as blog code blocks). */
export function CodeBlock({ code }: { code: string }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h4">사용법</h2>
      <pre
        role="region"
        aria-label="사용 예시 코드, 가로 스크롤"
        tabIndex={0}
        className="overflow-x-auto bg-foreground p-4 font-mono text-body-sm text-primary-foreground"
      >
        <code>{code}</code>
      </pre>
    </section>
  );
}
