import type { Metadata } from "next";

import { Demo, GuidePage } from "../_components/guide-page";

export const metadata: Metadata = { title: "Typography" };

// Sizes are from docs/PORTFOLIO_DESIGN.md §2.3. The sample renders at the size of the current breakpoint
// (Mobile values below lg, Desktop values from lg).
const STYLES = [
  { token: "text-display", desktop: 72, mobile: 40, weight: 700, className: "text-display" },
  { token: "text-h1", desktop: 56, mobile: 36, weight: 700, className: "text-h1" },
  { token: "text-h2", desktop: 40, mobile: 30, weight: 700, className: "text-h2" },
  { token: "text-h3", desktop: 28, mobile: 24, weight: 600, className: "text-h3" },
  { token: "text-h4", desktop: 20, mobile: 18, weight: 600, className: "text-h4" },
  { token: "text-body-lg", desktop: 18, mobile: 17, weight: 400, className: "text-body-lg" },
  { token: "text-body", desktop: 16, mobile: 16, weight: 400, className: "text-body" },
  { token: "text-body-sm", desktop: 14, mobile: 14, weight: 400, className: "text-body-sm" },
  { token: "text-caption", desktop: 12, mobile: 12, weight: 400, className: "text-caption" },
] as const;

export default function TypographyGuidePage() {
  return (
    <GuidePage
      title="Typography"
      source="app/globals.css → --fs-*, @theme inline"
      description="Pretendard를 쓰고, 한글 본문은 word-break: keep-all입니다. 태블릿(768–1023px)은 레이아웃은 8열이지만 글자 크기는 Mobile 값입니다."
    >
      <Demo title="Scale" column>
        <ul className="flex w-full flex-col">
          {STYLES.map((style) => (
            <li
              key={style.token}
              className="flex flex-col gap-1 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0"
            >
              <p className="font-mono text-caption text-secondary">
                {style.token} · Desktop {style.desktop} / Mobile {style.mobile} · {style.weight}
              </p>
              <p className={style.className}>웹을 만드는 사람, Aa 123</p>
            </li>
          ))}
        </ul>
      </Demo>
      <Demo
        title="Overline"
        description="섹션 라벨. Caption + uppercase + letter-spacing 0.08em."
        column
      >
        <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
          Selected Works
        </p>
      </Demo>
    </GuidePage>
  );
}
