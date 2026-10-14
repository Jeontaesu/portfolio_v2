import "server-only";

import fs from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

import { SITE_NAME } from "./site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Satori (next/og) reads TTF/OTF/WOFF but not woff2. WOFF is used (about half the TTF size).
// These files must be tracked in git (see .gitignore whitelist) — Vercel builds from the repo.
async function loadFonts() {
  const dir = path.join(process.cwd(), "public", "fonts");
  const [regular, bold] = await Promise.all([
    fs.readFile(path.join(dir, "Pretendard-Regular.woff")),
    fs.readFile(path.join(dir, "Pretendard-Bold.woff")),
  ]);
  return [
    { name: "Pretendard", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Pretendard", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

type OgImageInput = {
  /** Small uppercase label, e.g. "BLOG · FRONTEND". */
  eyebrow: string;
  title: string;
  description?: string;
};

/** Shared OG layout: token colors (background #FAFAFA, foreground #111827, primary #2563EB). */
export async function renderOgImage({ eyebrow, title, description }: OgImageInput) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#FAFAFA",
        color: "#111827",
        fontFamily: "Pretendard",
        borderTop: "16px solid #2563EB",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 2, color: "#4B5563" }}>
          {eyebrow}
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.25, wordBreak: "keep-all" }}>
          {title}
        </div>
        {description && (
          <div style={{ fontSize: 30, lineHeight: 1.5, color: "#4B5563", wordBreak: "keep-all" }}>
            {description}
          </div>
        )}
      </div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{SITE_NAME}</div>
    </div>,
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
