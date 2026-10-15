import "server-only";

import { z } from "zod";

import { GENERIC_ERROR, type FormState } from "@/lib/admin/form-state";

export function validationError(error: z.ZodError): FormState {
  return {
    status: "error",
    message: "입력 내용을 확인해 주세요.",
    fieldErrors: z.flattenError(error).fieldErrors,
  };
}

export function fieldError(name: string, message: string): FormState {
  return {
    status: "error",
    message: "입력 내용을 확인해 주세요.",
    fieldErrors: { [name]: [message] },
  };
}

/** Details go to the server log only; the user sees a generic message (CLAUDE.md §6 보안). */
export function unexpectedError(context: string, error: unknown): FormState {
  console.error(`[admin] ${context} failed`, error);
  return { status: "error", message: GENERIC_ERROR };
}

/** Prisma unique-constraint violation (a race between the pre-check and the write). */
export function isUniqueViolation(error: unknown): boolean {
  return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
}
