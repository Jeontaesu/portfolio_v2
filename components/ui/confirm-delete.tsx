"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Trash2 } from "lucide-react";

import { Button } from "./button";
import { SubmitButton } from "./submit-button";

type ConfirmDeleteProps = {
  /** What is being deleted, e.g. the post title. */
  targetName: string;
  /** Extra consequence line, e.g. "글은 미분류로 남습니다." */
  consequence?: string;
  /** Server Action, already bound to the record id. It checks the admin itself. */
  action: () => Promise<void>;
  /** Trigger label. Defaults to "삭제". */
  triggerLabel?: string;
  triggerSize?: "sm" | "md";
};

// AlertDialog (not Dialog): it focuses Cancel first and cannot be dismissed by clicking outside, which is
// what a destructive confirmation needs. Radix provides the focus trap, Esc and focus return.
export function ConfirmDelete({
  targetName,
  consequence,
  action,
  triggerLabel = "삭제",
  triggerSize = "sm",
}: ConfirmDeleteProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="secondary" size={triggerSize}>
          <Trash2 className="size-4" aria-hidden="true" />
          {triggerLabel}
          <span className="sr-only"> — {targetName}</span>
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-surface p-6 shadow-md">
          <AlertDialog.Title className="text-h4">정말 삭제할까요?</AlertDialog.Title>
          <AlertDialog.Description className="mt-3 text-body text-secondary">
            “{targetName}”을(를) 삭제합니다. 되돌릴 수 없습니다.
            {consequence && ` ${consequence}`}
          </AlertDialog.Description>
          <div className="mt-6 flex justify-end gap-3">
            <AlertDialog.Cancel asChild>
              <Button variant="secondary">취소</Button>
            </AlertDialog.Cancel>
            <form action={action}>
              <SubmitButton variant="destructive">삭제</SubmitButton>
            </form>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
