import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

// White surface + status text token instead of a tinted background: tints dropped below 4.5:1
// (destructive never reached it on #FAFAFA). A dot gives a non-color cue; the label carries the meaning.
const badgeVariants = cva(
  "text-caption bg-surface border-border inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-semibold",
  {
    variants: {
      variant: {
        neutral: "text-secondary",
        primary: "text-primary",
        success: "text-success-text",
        warning: "text-warning-text",
        destructive: "text-destructive",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

const dotVariants: Record<NonNullable<VariantProps<typeof badgeVariants>["variant"]>, string> = {
  neutral: "bg-muted",
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant = "neutral", children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      <span
        className={cn("size-1.5 rounded-full", dotVariants[variant ?? "neutral"])}
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
