import { career } from "@/content/profile";
import { formatPeriod } from "@/lib/utils/format-date";

/** Company-level summary (period, company, position). Project detail lives on /career. */
export function CareerTimeline() {
  return (
    <ol className="border-b border-border">
      {career.map((entry) => (
        <li
          key={entry.company}
          className="grid gap-1 border-t border-border py-6 md:grid-cols-12 md:gap-6"
        >
          <p className="text-body-sm text-secondary md:col-span-4">
            {formatPeriod(entry.startedAt, entry.endedAt)}
          </p>
          <div className="md:col-span-8">
            <h3 className="text-h4">{entry.company}</h3>
            <p className="mt-1 text-body text-secondary">
              {entry.position}
              {entry.employment && ` · ${entry.employment}`}
            </p>
            <p className="mt-2 text-body">{entry.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
