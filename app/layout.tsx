import type { Metadata } from "next";
import localFont from "next/font/local";

import { IS_INDEXABLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/site";

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
  metadataBase: SITE_URL,
  title: {
    default: `${SITE_NAME} — Frontend Developer & Web Publisher`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: IS_INDEXABLE ? undefined : { index: false, follow: false },
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
