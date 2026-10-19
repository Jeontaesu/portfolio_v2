import type { Metadata } from "next";

import { Demo, GuidePage } from "../_components/guide-page";

export const metadata: Metadata = { title: "Colors" };

// Values and contrast ratios are copied from docs/PORTFOLIO_DESIGN.md §2.1–2.2 (contrast measured on #FFFFFF).
// Class names are written out in full so Tailwind can see them; do not build them from strings.
const TOKENS = [
  {
    name: "Primary",
    css: "--primary",
    swatch: "bg-primary",
    hex: "#2563EB",
    contrast: "5.17",
    use: "CTA, 링크, 주요 액션",
  },
  {
    name: "Primary Hover",
    css: "--primary-hover",
    swatch: "bg-primary-hover",
    hex: "#1D4ED8",
    contrast: "6.70",
    use: "Hover / Active",
  },
  {
    name: "Foreground",
    css: "--foreground",
    swatch: "bg-foreground",
    hex: "#111827",
    contrast: "17.74",
    use: "본문, 제목",
  },
  {
    name: "Secondary",
    css: "--secondary",
    swatch: "bg-secondary",
    hex: "#4B5563",
    contrast: "7.56",
    use: "보조 텍스트",
  },
  {
    name: "Muted",
    css: "--muted",
    swatch: "bg-muted",
    hex: "#6B7280",
    contrast: "4.83",
    use: "Caption, 입력창 경계",
  },
  {
    name: "Background",
    css: "--background",
    swatch: "bg-background",
    hex: "#FAFAFA",
    contrast: "-",
    use: "Public 페이지 배경",
  },
  {
    name: "Surface",
    css: "--surface",
    swatch: "bg-surface",
    hex: "#FFFFFF",
    contrast: "-",
    use: "Card, Panel, Admin 본문",
  },
  {
    name: "Border",
    css: "--border",
    swatch: "bg-border",
    hex: "#E5E7EB",
    contrast: "1.24",
    use: "Divider (장식용)",
  },
  {
    name: "Success Text",
    css: "--success-text",
    swatch: "bg-success-text",
    hex: "#15803D",
    contrast: "5.02",
    use: "성공 상태 텍스트",
  },
  {
    name: "Warning Text",
    css: "--warning-text",
    swatch: "bg-warning-text",
    hex: "#B45309",
    contrast: "5.02",
    use: "경고 상태 텍스트",
  },
  {
    name: "Error",
    css: "--destructive",
    swatch: "bg-destructive",
    hex: "#DC2626",
    contrast: "4.83",
    use: "오류, 삭제",
  },
  {
    name: "Success",
    css: "--success",
    swatch: "bg-success",
    hex: "#16A34A",
    contrast: "3.30",
    use: "아이콘, 점 (텍스트 불가)",
  },
  {
    name: "Warning",
    css: "--warning",
    swatch: "bg-warning",
    hex: "#D97706",
    contrast: "3.19",
    use: "아이콘, 점 (텍스트 불가)",
  },
] as const;

export default function ColorsGuidePage() {
  return (
    <GuidePage
      title="Colors"
      source="app/globals.css → :root, @theme inline"
      description={
        <>
          디자인 토큰 색상입니다. Figma Variable, CSS 변수, Tailwind 클래스 이름이 같은 값을
          가리킵니다. 새 색 토큰은 만들지 않습니다. 대비는 흰 배경 기준이고, 일반 텍스트는 4.5:1
          이상이어야 합니다.
        </>
      }
    >
      <Demo title="Tokens" column>
        <div
          role="region"
          aria-label="색상 토큰 표, 가로 스크롤"
          tabIndex={0}
          className="w-full overflow-x-auto"
        >
          <table className="w-full min-w-2xl text-left text-body-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="p-3 font-semibold">
                  색
                </th>
                <th scope="col" className="p-3 font-semibold">
                  이름
                </th>
                <th scope="col" className="p-3 font-semibold">
                  CSS 변수
                </th>
                <th scope="col" className="p-3 font-semibold">
                  값
                </th>
                <th scope="col" className="p-3 font-semibold">
                  대비
                </th>
                <th scope="col" className="p-3 font-semibold">
                  용도
                </th>
              </tr>
            </thead>
            <tbody>
              {TOKENS.map((token) => (
                <tr key={token.css} className="border-b border-border last:border-b-0">
                  <td className="p-3">
                    <span
                      aria-hidden="true"
                      className={`block size-8 rounded-sm border border-border ${token.swatch}`}
                    />
                  </td>
                  <th scope="row" className="p-3 font-semibold">
                    {token.name}
                  </th>
                  <td className="p-3 font-mono text-secondary">{token.css}</td>
                  <td className="p-3 font-mono text-secondary">{token.hex}</td>
                  <td className="p-3 font-mono text-secondary">{token.contrast}</td>
                  <td className="p-3 text-secondary">{token.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>
      <p className="max-w-2xl text-body-sm text-secondary">
        Success·Warning 원색은 대비가 3.3 이하라 텍스트에 쓰지 않고, 텍스트에는{" "}
        <code className="font-mono">*-text</code> 토큰을 씁니다. Border(1.24)는 장식용이라
        입력창처럼 식별이 필요한 경계에는 Muted를 씁니다 (D-026).
      </p>
    </GuidePage>
  );
}
