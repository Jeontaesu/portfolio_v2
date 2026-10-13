"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { NavLink } from "./nav-link";
import { NAV_ITEMS } from "./nav-items";
import { profile } from "@/content/profile";

// Radix Dialog provides the focus trap, Esc to close, scroll lock and focus return.
export function MobileNav() {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm hover:bg-border/60 md:hidden"
        aria-label="메뉴 열기"
      >
        <Menu className="size-6" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Radix 1.3 applies the scroll lock via Overlay, so it must be rendered even though Content is full-screen. */}
        <Dialog.Overlay className="fixed inset-0 z-50 md:hidden" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
          <div className="container-page flex h-16 shrink-0 items-center justify-between">
            <Dialog.Close asChild>
              <Link href="/" className="inline-flex min-h-11 items-center text-h4">
                {profile.brand}
              </Link>
            </Dialog.Close>
            <Dialog.Close
              className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-sm hover:bg-border/60"
              aria-label="메뉴 닫기"
            >
              <X className="size-6" aria-hidden="true" />
            </Dialog.Close>
          </div>
          <Dialog.Title className="sr-only">사이트 메뉴</Dialog.Title>
          <Dialog.Description className="sr-only">페이지로 이동합니다.</Dialog.Description>
          <nav aria-label="모바일 메뉴" className="container-page flex-1 overflow-y-auto py-8">
            <ul className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Dialog.Close asChild>
                    <NavLink href={item.href} className="block py-5 text-h2">
                      {item.label}
                    </NavLink>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
