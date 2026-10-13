import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// CVA is used here because Button combines two independent axes (variant × size).
const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm font-semibold whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-hover",
        secondary:
          "border-secondary text-foreground hover:bg-border/60 active:bg-border border bg-transparent",
        ghost: "text-foreground hover:bg-border/60 active:bg-border bg-transparent",
        destructive: "bg-destructive text-primary-foreground hover:opacity-90 active:opacity-80",
      },
      // md/lg meet the 44px touch target; sm is for dense desktop UI only.
      size: {
        sm: "text-body-sm h-10 px-4",
        md: "text-body h-11 px-5",
        lg: "text-body h-12 px-6 lg:text-body-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render the child element (e.g. next/link) with button styles. */
  asChild?: boolean;
  /** Keeps the width, shows a spinner and sets aria-busy. Ignored with asChild. */
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
  ref,
) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (asChild) {
    return (
      <Slot ref={ref} className={classes} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(classes, "relative")}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {/* Content stays in the layout (invisible) while loading so the width does not change. */}
      <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-5 animate-spin" aria-hidden="true" />
          <span className="sr-only">처리 중</span>
        </span>
      )}
    </button>
  );
});

export { buttonVariants };
