import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils/cn";

/** Props the control must receive so the label, hint and error are announced with it. */
export type FieldControlProps = {
  id: string;
  "aria-describedby"?: string;
  "aria-invalid"?: true;
  "aria-required"?: true;
};

type FormFieldProps = {
  /** Also the control's id and name, so the error summary can link to it. */
  id: string;
  label: string;
  required?: boolean;
  description?: string;
  error?: readonly string[];
  className?: string;
  children: (control: FieldControlProps) => ReactNode;
};

/** Label + control + hint + error. The error has an icon and text, never color alone (DESIGN §4.2). */
export function FormField({
  id,
  label,
  required,
  description,
  error,
  className,
  children,
}: FormFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error?.length ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body-sm font-semibold">
        {label}
        {required && <span className="font-normal text-secondary"> (필수)</span>}
      </label>
      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": errorId ? true : undefined,
        "aria-required": required ? true : undefined,
      })}
      {description && (
        <p id={descriptionId} className="text-caption text-secondary">
          {description}
        </p>
      )}
      {errorId && (
        <p
          id={errorId}
          className="flex items-start gap-1.5 text-body-sm font-semibold text-destructive"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{error?.join(" ")}</span>
        </p>
      )}
    </div>
  );
}
