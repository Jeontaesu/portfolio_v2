"use client";

import { useState, type MouseEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

// Below lg the sidebar becomes a drawer. Radix Dialog provides focus trap, Esc, scroll lock and focus return.
// The admin layout stays mounted across navigation, so the drawer must close itself when a link is used.
// The links are shared with the desktop sidebar (outside any Dialog), so Dialog.Close cannot wrap them;
// a click on any anchor inside the drawer closes it instead.
// Open state is controlled and the parts use forceMount so AnimatePresence can play the exit slide.
export function AdminMobileNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  function closeOnLinkClick(event: MouseEvent<HTMLElement>) {
    if (event.target instanceof Element && event.target.closest("a[href]")) setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm hover:bg-border/60"
        aria-label="메뉴 열기"
      >
        <Menu className="size-6" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal forceMount>
        <AnimatePresence>
          {open && (
            <Dialog.Overlay key="overlay" forceMount asChild>
              <m.div
                className="fixed inset-0 z-50 bg-foreground/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>
          )}
          {open && (
            <Dialog.Content key="content" forceMount asChild onClick={closeOnLinkClick}>
              <m.div
                className="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] overflow-y-auto bg-surface shadow-md"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <Dialog.Title className="sr-only">관리자 메뉴</Dialog.Title>
                <Dialog.Description className="sr-only">
                  관리자 페이지로 이동합니다.
                </Dialog.Description>
                <Dialog.Close
                  className="absolute top-3 right-3 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm hover:bg-border/60"
                  aria-label="메뉴 닫기"
                >
                  <X className="size-6" aria-hidden="true" />
                </Dialog.Close>
                {children}
              </m.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
