import * as React from "react";
import { cn } from "@/lib/utils/cn";

// Same --muted border as Input (see input.tsx for the contrast reasoning).
export const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          "min-h-24 w-full rounded-sm border border-muted bg-surface px-3 py-2 text-body-sm text-foreground placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive",
          className,
        )}
        {...props}
      />
    );
  },
);
