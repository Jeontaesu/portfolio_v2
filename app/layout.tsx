import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Static weights used by the design tokens (400 body, 600 H3/H4, 700 Display/H1/H2).
const pretendard = localFont({
  src: [
    { path: "../public/fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "../public/fonts/Pretendard-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../public/fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MEFLOWEB",
  description: "Frontend Developer & Web Publisher",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="bg-background font-sans text-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
