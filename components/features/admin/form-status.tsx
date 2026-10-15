"use client";

import { useEffect, useRef } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";

import type { FormState } from "@/lib/admin/form-state";

type FormStatusProps = {
  state: FormState;
  /** Field labels for the error list, keyed by field name. */
  labels: Record<string, string>;
};

/**
 * Error summary above the form: focus moves here after a failed save so keyboard and screen reader
 * users hear what went wrong, and each entry links to its field. Success is announced politely.
 */
export function FormStatus({ state, labels }: FormStatusProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.status === "error") ref.current?.focus();
  }, [state]);

  if (state.status === "success" && state.message) {
    return (
      <p
        role="status"
        className="flex items-center gap-2 text-body-sm font-semibold text-success-text"
      >
        <CircleCheck className="size-5" aria-hidden="true" />
        {state.message}
      </p>
    );
  }

  if (state.status !== "error") return null;

  const entries = Object.entries(state.fieldErrors ?? {}).filter(
    ([, messages]) => messages?.length,
  );

  return (
    <div
      ref={ref}
      role="alert"
      tabIndex={-1}
      className="flex flex-col gap-2 rounded-sm border border-destructive p-4 outline-none"
    >
      <p className="flex items-center gap-2 text-body-sm font-semibold text-destructive">
        <CircleAlert className="size-5" aria-hidden="true" />
        {state.message ?? "저장하지 못했습니다."}
      </p>
      {entries.length > 0 && (
        <ul className="list-disc pl-10 text-body-sm">
          {entries.map(([name, messages]) => (
            <li key={name}>
              <a href={`#${name}`} className="underline underline-offset-4">
                {labels[name] ?? name}
              </a>
              : {messages?.[0]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
