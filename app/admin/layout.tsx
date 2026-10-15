import type { Metadata } from "next";
import type { ReactNode } from "react";

// Admin is never indexed. It also does not share the public layout: only primitives are shared.
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return children;
}
