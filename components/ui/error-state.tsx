import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

type ErrorStateProps = {
  /** "page" fills a public route (overline + h1); "inline" is a compact block for Admin. */
  variant?: "page" | "inline";
  title?: string;
  /** Heading level of the title. h1 when the error replaces the page; lower when it sits under another h1. */
  headingLevel?: "h1" | "h2" | "h3";
  description?: string;
  /** Next step, usually a retry Button. The caller owns the handler, so this stays a Server-safe component. */
  action?: ReactNode;
};

/**
 * The error state of a data view. Copy is generic on purpose: the original error (DB, stack)
 * stays in the server log and never reaches the page.
 */
export function ErrorState({
  variant = "inline",
  title = "문제가 발생했습니다.",
  headingLevel: Heading = "h1",
  description = "잠시 후 다시 시도해 주세요.",
  action,
}: ErrorStateProps) {
  const isPage = variant === "page";

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-start",
        isPage ? "container-page gap-6 py-20 lg:py-32" : "gap-4",
      )}
    >
      {isPage && (
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Error
        </p>
      )}
      <Heading className={isPage ? "text-h1" : "text-h3"}>{title}</Heading>
      <p className={cn("text-secondary", isPage ? "max-w-2xl text-body-lg" : "text-body")}>
        {description}
      </p>
      {action}
    </div>
  );
}
