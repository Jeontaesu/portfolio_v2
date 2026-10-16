import Link from "next/link";

import { career } from "@/content/profile";
import { formatPeriod } from "@/lib/utils/format-date";

/** Left: title and link. Right: one row per company (period, name, summary, position). Detail lives on /career. */
export function Career() {
  return (
    <section
      aria-labelledby="career-title"
      className="container-page border-t border-foreground py-16 lg:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <header className="flex flex-col gap-4 lg:col-span-4">
          <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
            Career Archive
          </p>
          <h2 id="career-title" className="text-h2">
            역할과 기술이 어떻게 성장해 왔는지 보여줍니다.
          </h2>
          <Link
            href="/career"
            className="inline-flex min-h-11 items-center text-body-sm font-semibold text-primary"
          >
            경력 상세 보기<span aria-hidden="true">&nbsp;→</span>
          </Link>
        </header>
        <ol className="border-b border-border lg:col-span-7 lg:col-start-6">
          {career.map((entry) => (
            <li
              key={entry.company}
              className="reveal grid gap-1 border-t border-border py-6 md:grid-cols-[11rem_1fr_auto] md:gap-6"
            >
              <p className="text-body-sm text-secondary">
                {formatPeriod(entry.startedAt, entry.endedAt)}
              </p>
              <div>
                <h3 className="text-h4">{entry.company}</h3>
                <p className="mt-2 text-body-sm text-secondary">{entry.summary}</p>
              </div>
              <p className="text-body-sm text-secondary md:text-right">
                {entry.position}
                {entry.employment && ` · ${entry.employment}`}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
