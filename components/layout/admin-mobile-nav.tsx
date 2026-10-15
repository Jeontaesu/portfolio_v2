"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";

// Below lg the sidebar becomes a drawer. Radix Dialog provides focus trap, Esc, scroll lock and focus return.
export function AdminMobileNav({ children }: { children: ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm hover:bg-border/60"
        aria-label="메뉴 열기"
      >
        <Menu className="size-6" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto bg-surface shadow-md">
          <Dialog.Title className="sr-only">관리자 메뉴</Dialog.Title>
          <Dialog.Description className="sr-only">관리자 페이지로 이동합니다.</Dialog.Description>
          <Dialog.Close
            className="absolute top-3 right-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm hover:bg-border/60"
            aria-label="메뉴 닫기"
          >
            <X className="size-6" aria-hidden="true" />
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
