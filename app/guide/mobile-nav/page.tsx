import type { Metadata } from "next";

import { MobileNav } from "@/components/layout/mobile-nav";

import { CodeBlock, Demo, GuidePage, PropsTable } from "../_components/guide-page";

export const metadata: Metadata = { title: "MobileNav" };

const USAGE = `// Radix Dialog가 포커스 트랩, Esc, 스크롤 잠금, 포커스 복귀를 처리한다.
// open을 직접 제어하고 Overlay·Content에 forceMount를 줘서, AnimatePresence가 exit 애니메이션이
// 끝날 때까지 마운트를 유지한다.
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger aria-label="메뉴 열기">…</Dialog.Trigger>
  <Dialog.Portal forceMount>
    <AnimatePresence>
      {open && <Dialog.Overlay key="overlay" forceMount />}
      {open && (
        <Dialog.Content key="content" forceMount asChild>
          <m.div exit={{ opacity: 0, y: -16 }}>…</m.div>
        </Dialog.Content>
      )}
    </AnimatePresence>
  </Dialog.Portal>
</Dialog.Root>`;

export default function MobileNavGuidePage() {
  return (
    <GuidePage
      title="MobileNav"
      source="components/layout/mobile-nav.tsx"
      description="모바일 전체 화면 메뉴입니다. Radix Dialog 위에 열림·닫힘 애니메이션만 얹었고, 접근성 동작은 직접 구현하지 않았습니다 (D-017, D-028). 사이트 헤더에서는 md(768px) 미만에서만 보이지만, 이 데모는 어느 폭에서나 열립니다."
    >
      <Demo
        title="열어 보기"
        description="버튼을 눌러 메뉴를 열고 아래 항목을 키보드로 확인해 보세요. 메뉴의 링크는 실제 사이트 페이지로 이동합니다."
      >
        <MobileNav alwaysVisible />
        <span className="text-body-sm text-secondary">← 메뉴 열기 버튼</span>
      </Demo>

      <section className="flex flex-col gap-4">
        <h2 className="text-h4">Radix가 처리하는 것</h2>
        <ul className="flex max-w-2xl list-disc flex-col gap-2 pl-5 text-body-sm text-secondary">
          <li>
            <strong className="text-foreground">포커스 트랩:</strong> 열려 있는 동안 Tab과
            Shift+Tab이 메뉴 안에서만 순환합니다.
          </li>
          <li>
            <strong className="text-foreground">Esc:</strong> 메뉴가 닫힙니다.
          </li>
          <li>
            <strong className="text-foreground">포커스 복귀:</strong> 닫히면 포커스가 메뉴 열기
            버튼으로 돌아갑니다.
          </li>
          <li>
            <strong className="text-foreground">스크롤 잠금:</strong> 열려 있는 동안 뒤 배경이
            스크롤되지 않습니다. Radix 1.3은 이것을 Overlay가 맡아서, 전체 화면 Content여도
            Overlay를 렌더링해야 합니다.
          </li>
          <li>
            <strong className="text-foreground">이름과 설명:</strong> Title과 Description은 스크린
            리더에만 읽히는 문구(sr-only)로 넣었습니다.
          </li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-h4">이 프로젝트가 더한 것</h2>
        <ul className="flex max-w-2xl list-disc flex-col gap-2 pl-5 text-body-sm text-secondary">
          <li>
            <strong className="text-foreground">exit 애니메이션:</strong> 닫히는 순간 Radix가 바로
            언마운트하므로, forceMount와 AnimatePresence로 애니메이션이 끝날 때까지 유지합니다.
            이것이 CSS만으로 어려워 motion을 쓴 이유입니다.
          </li>
          <li>
            <strong className="text-foreground">모션 줄이기:</strong> MotionConfig의
            reducedMotion=&quot;user&quot;가 이동(y)을 끄고 페이드만 남깁니다.
          </li>
          <li>
            <strong className="text-foreground">터치 영역:</strong> 열기·닫기 버튼은 44×44px, 메뉴
            항목은 큰 글자와 넉넉한 높이입니다.
          </li>
          <li>
            <strong className="text-foreground">현재 페이지 표시:</strong> NavLink가
            aria-current=&quot;page&quot;를 붙입니다.
          </li>
        </ul>
      </section>

      <PropsTable
        rows={[
          {
            name: "alwaysVisible",
            type: "boolean",
            default: "false",
            description:
              "md 이상에서도 열 수 있게 함. 가이드 데모 전용이고 사이트 헤더는 기본값(md 미만에서만 표시)을 씀",
          },
        ]}
      />
      <CodeBlock code={USAGE} />
    </GuidePage>
  );
}
