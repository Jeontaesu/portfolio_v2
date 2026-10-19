import type { Metadata } from "next";

import { Demo, GuidePage } from "../_components/guide-page";

export const metadata: Metadata = { title: "Responsive" };

// Breakpoints, column counts and paddings are from docs/PORTFOLIO_DESIGN.md §3 and match app/globals.css (container-page).
const BREAKPOINTS = [
  { name: "Mobile", tailwind: "기본", width: "< 768", columns: 4, padding: 20 },
  { name: "Tablet", tailwind: "md", width: "768 – 1023", columns: 8, padding: 32 },
  { name: "Desktop", tailwind: "lg", width: "≥ 1024", columns: 12, padding: 40 },
  { name: "Wide", tailwind: "xl", width: "≥ 1280", columns: 12, padding: 40 },
] as const;

// What actually changes at each breakpoint in this project. Each line is implemented in the named file.
const REFLOWS = [
  {
    where: "Header",
    change: "md 미만은 Menu 버튼 + 전체 화면 메뉴(Radix Dialog), md 이상은 2단 가로 메뉴",
    file: "components/layout/site-header.tsx",
  },
  {
    where: "Project Grid",
    change: "1열 → md 2열 → lg 3열 (또는 12열 안에서 8/4 비율)",
    file: "components/features/projects/project-grid.tsx",
  },
  {
    where: "Admin 사이드바",
    change: "lg 미만은 Drawer(Radix Dialog), lg 이상은 240px 고정 사이드바",
    file: "app/admin/(protected)/layout.tsx",
  },
  {
    where: "Typography",
    change: "lg 미만은 Mobile 크기, lg 이상은 Desktop 크기. 태블릿도 글자는 Mobile 값",
    file: "app/globals.css",
  },
] as const;

const CELLS = Array.from({ length: 12 }, (_, i) => i + 1);

export default function ResponsiveGuidePage() {
  return (
    <GuidePage
      title="Responsive"
      source="app/globals.css → container-page, Tailwind breakpoints"
      description="Mobile-first입니다. 기본 스타일이 모바일이고 md, lg에서 확장합니다. 반응형은 viewport를 JS로 읽지 않고 CSS로만 처리해서 hydration 불일치가 없습니다. 창 너비를 바꿔 보면서 확인하세요."
    >
      <Demo title="Breakpoint" column>
        <div
          role="region"
          aria-label="브레이크포인트 표, 가로 스크롤"
          tabIndex={0}
          className="w-full overflow-x-auto"
        >
          <table className="w-full min-w-xl text-left text-body-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="p-3 font-semibold">
                  이름
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Tailwind
                </th>
                <th scope="col" className="p-3 font-semibold">
                  폭(px)
                </th>
                <th scope="col" className="p-3 font-semibold">
                  Grid
                </th>
                <th scope="col" className="p-3 font-semibold">
                  좌우 패딩(px)
                </th>
              </tr>
            </thead>
            <tbody>
              {BREAKPOINTS.map((bp) => (
                <tr key={bp.name} className="border-b border-border last:border-b-0">
                  <th scope="row" className="p-3 font-semibold">
                    {bp.name}
                  </th>
                  <td className="p-3 font-mono text-secondary">{bp.tailwind}</td>
                  <td className="p-3 font-mono text-secondary">{bp.width}</td>
                  <td className="p-3 font-mono text-secondary">{bp.columns} col</td>
                  <td className="p-3 font-mono text-secondary">{bp.padding}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <Demo
        title="Grid 열 수"
        description="같은 12개 칸이 Mobile 4열, Tablet 8열, Desktop 이상 12열로 다시 배치됩니다. 창 너비를 바꿔 보세요."
        column
      >
        <p className="text-body-sm font-semibold">
          <span className="md:hidden">지금: Mobile · 4열</span>
          <span className="hidden md:inline lg:hidden">지금: Tablet · 8열</span>
          <span className="hidden lg:inline">지금: Desktop 이상 · 12열</span>
        </p>
        <ol
          aria-label="Grid 칸 12개"
          className="grid w-full grid-cols-4 gap-3 md:grid-cols-8 lg:grid-cols-12"
        >
          {CELLS.map((n) => (
            <li
              key={n}
              className="flex h-12 items-center justify-center border border-muted bg-background font-mono text-caption text-secondary"
            >
              {n}
            </li>
          ))}
        </ol>
      </Demo>

      <Demo
        title="레이아웃이 바뀌는 곳"
        description="축소가 아니라 재배치입니다. 아래는 이 프로젝트에서 실제로 구현된 항목입니다."
        column
      >
        <ul className="flex w-full flex-col">
          {REFLOWS.map((item) => (
            <li
              key={item.where}
              className="flex flex-col gap-1 border-b border-border py-4 first:pt-0 last:border-b-0 last:pb-0"
            >
              <p className="text-body font-semibold">{item.where}</p>
              <p className="text-body-sm text-secondary">{item.change}</p>
              <p className="font-mono text-caption text-secondary">{item.file}</p>
            </li>
          ))}
        </ul>
      </Demo>

      <p className="max-w-2xl text-body-sm text-secondary">
        터치 타겟은 모든 폭에서 44×44px 이상입니다(Button의 sm 40px은 밀도가 높은 데스크톱 UI용
        예외). 모바일 기준 폭은 390px입니다. 이 페이지의 오른쪽 아래 표시는 현재 breakpoint를
        CSS로만 보여 줍니다.
      </p>
    </GuidePage>
  );
}
