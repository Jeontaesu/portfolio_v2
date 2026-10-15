import * as React from "react";
import { cn } from "@/lib/utils/cn";

// Border uses --muted (4.83:1 on white) instead of --border (1.24:1, decorative) so the field edge meets
// the 3:1 non-text contrast requirement (WCAG 1.4.11). aria-invalid switches to the error color.
export const controlClass =
  "text-body-sm h-11 w-full rounded-sm border border-muted bg-surface px-3 text-foreground placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  function Input({ className, type = "text", ...props }, ref) {
    return <input ref={ref} type={type} className={cn(controlClass, className)} {...props} />;
  },
);
