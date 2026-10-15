import type { AdminPostRow } from "@/lib/admin/queries";
import { formatDateKst } from "@/lib/utils/format-date";

import { PostStatusBadge } from "./post-status-badge";

const thClass =
  "text-caption py-3 pr-4 text-left font-semibold tracking-[0.08em] text-secondary uppercase";

/** Admin table. Below md only Title and Status stay (PORTFOLIO_DESIGN §3: Admin Table → core columns). */
export function PostTable({ rows, caption }: { rows: readonly AdminPostRow[]; caption: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className={thClass}>
              Title
            </th>
            <th scope="col" className={`${thClass} hidden md:table-cell`}>
              Category
            </th>
            <th scope="col" className={thClass}>
              Status
            </th>
            <th scope="col" className={`${thClass} hidden md:table-cell`}>
              Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((post) => (
            <tr key={post.id} className="border-b border-border">
              <th scope="row" className="py-4 pr-4 text-left text-body-sm font-semibold">
                {post.title}
              </th>
              <td className="hidden py-4 pr-4 text-body-sm text-secondary md:table-cell">
                {post.categoryName ?? "—"}
              </td>
              <td className="py-4 pr-4">
                <PostStatusBadge status={post.status} />
              </td>
              <td className="hidden py-4 pr-4 text-body-sm text-secondary md:table-cell">
                <time dateTime={post.updatedAt.toISOString()}>{formatDateKst(post.updatedAt)}</time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
