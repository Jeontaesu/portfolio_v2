import * as React from "react";

type CheckboxFieldProps = Omit<React.ComponentProps<"input">, "type" | "children"> & {
  label: string;
  description?: string;
};

/** Native checkbox inside a 44px-high label, so the whole row is the touch target. */
export function CheckboxField({ label, description, id, ...props }: CheckboxFieldProps) {
  const descriptionId = description && id ? `${id}-description` : undefined;
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="flex min-h-11 cursor-pointer items-center gap-3 text-body-sm font-semibold"
      >
        <input
          id={id}
          type="checkbox"
          aria-describedby={descriptionId}
          className="size-5 cursor-pointer accent-primary"
          {...props}
        />
        {label}
      </label>
      {description && (
        <p id={descriptionId} className="text-caption text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
