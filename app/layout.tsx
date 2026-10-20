import type { Metadata } from "next";

import { pretendardCore, pretendardHangul } from "@/lib/fonts/pretendard";
import { IS_INDEXABLE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo/site";

import "./globals.css";

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
    <html lang="ko" className={`${pretendardCore.variable} ${pretendardHangul.variable}`}>
      <body className="bg-background font-sans text-body text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
