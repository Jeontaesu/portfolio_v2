# ARCHITECTURE.md

구현 구조 문서. 규칙·디렉터리 책임의 기준은 `CLAUDE.md §5`, 이 문서는 실제 구현이 생길 때마다 갱신한다.
현재 단계: Phase 1 (DB·인증·Admin 없음). 아직 코드가 없으므로 아래는 **설계 의도**이며, 구현되면 실제 구조로 고친다.

## 1. 데이터 흐름 (Phase 1)

```text
content/*.md, content/*.ts
        │  (빌드 시 읽기)
lib/content/  ← 페이지는 이 함수로만 콘텐츠를 읽는다 (server-only)
        │
lib/markdown/ ← Markdown → sanitize된 HTML, 목차 추출
        │
app/(site)/   ← Server Component 기본, 정적 생성
```

- 콘텐츠 필드 이름은 `CLAUDE.md §7`의 모델과 동일하게 쓴다.
- `status: DRAFT`는 빌드에서 제외한다.
- 이후 단계에서 DB로 옮길 때는 `lib/content/` 내부만 바꾸고 페이지 코드는 유지한다.

## 2. 렌더링 경계

- 기본은 Server Component. `"use client"`는 상호작용이 필요한 말단 컴포넌트에만 (예: MobileNav).
- 반응형은 CSS로 처리하고 viewport JS 감지는 쓰지 않는다.

## 3. 스타일 구조

- 토큰은 `app/globals.css`의 `@theme`에서 정의한다 (Tailwind v4). 값은 `docs/PORTFOLIO_DESIGN.md §2`.
- 유틸리티 `cn()`은 `lib/utils/cn.ts`.

## 4. 변경 이력

구현이 진행되면 구조가 바뀐 이유와 영향을 여기에 짧게 남긴다. 기술 선택의 이유는 `docs/DECISIONS.md`에 둔다.
