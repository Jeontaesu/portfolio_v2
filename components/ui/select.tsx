import * as React from "react";
import { cn } from "@/lib/utils/cn";

import { controlClass } from "./input";

/** Native <select>: keyboard, screen reader and mobile pickers come from the browser. */
export const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select ref={ref} className={cn(controlClass, "cursor-pointer pr-8", className)} {...props}>
        {children}
      </select>
    );
  },
);
