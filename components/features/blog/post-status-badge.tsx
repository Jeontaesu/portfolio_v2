import { Badge } from "@/components/ui/badge";

/** Published = success, Draft = neutral (PORTFOLIO_DESIGN §4.2). The label, not the color, carries the meaning. */
export function PostStatusBadge({ status }: { status: "PUBLISHED" | "DRAFT" }) {
  return status === "PUBLISHED" ? (
    <Badge variant="success">Published</Badge>
  ) : (
    <Badge variant="neutral">Draft</Badge>
  );
}
