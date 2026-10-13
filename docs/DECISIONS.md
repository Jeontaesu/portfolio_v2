# DECISIONS.md

기술 결정 기록. 형식: 결정 / 이유 / trade-off / 날짜. 규칙은 `CLAUDE.md`가 기준이고, 여기에는 "왜 그렇게 정했는가"를 남긴다.
버전은 2026-10-13에 npm registry와 nodejs.org에서 확인한 값이다.

---

## D-001. 저장소는 `portfolio/` 독립 저장소로 분리

- **결정**: `portfolio/`를 독립 Git 저장소로 만든다. 기존 KOSMCO 프로젝트는 로컬 참고용이다.
- **이유**: 현재 상위 저장소에 KOSMCO 파일 1,112개가 함께 추적된다. 포트폴리오를 공개하면 회사 프로젝트 소스까지 공개된다 (`CLAUDE.md §9` 위반).
- **trade-off**: 기존 커밋(문서 3개)을 새 저장소로 옮겨야 한다.
- **상태**: 결정됨, 분리 작업은 초기 세팅 단계에서 실행. 분리 전에는 GitHub 공개·Vercel 연결 금지.
- **날짜**: 2026-10-13

## D-002. 패키지 매니저 pnpm 12.11.2

- **이유**: 명령어 기준이 이미 pnpm이고 설치 속도·디스크 효율이 좋다. `packageManager` 필드 + corepack으로 고정.
- **trade-off**: 현재 PC에는 pnpm이 없어 설치 단계가 하나 늘어난다.
- **날짜**: 2026-10-13

## D-003. Node 24 LTS

- **이유**: 로컬에 이미 v24.21.0(LTS, Krypton)이 설치되어 있고 Next 16 요구(>=20.9)를 만족한다. `.nvmrc`·`engines`·Vercel 설정을 24로 맞춘다.
- **trade-off**: 최신 v26.11.1은 LTS가 아니다. 22 LTS는 지원 기간이 더 짧다.
- **날짜**: 2026-10-13

## D-004. Next.js 16.4.0 / React 19.3.0

- **이유**: 현재 안정 최신. Next 16 peer 범위가 React 19를 포함한다.
- **trade-off**: 최신 메이저라 일부 서드파티가 뒤따르지 못했을 수 있다. 설치 시 peer 경고를 확인한다.
- **날짜**: 2026-10-13

## D-005. Tailwind CSS v4.3.3

- **이유**: 토큰을 `globals.css`의 `@theme`에서 한 번만 정의하면 CSS 변수와 유틸리티 클래스가 함께 생겨, "Figma Variable = CSS 변수 = Tailwind 클래스" 1:1 목표에 맞다 (v3는 `tailwind.config`와 `:root`에 이중 정의).
- **trade-off**: v3 기준 자료·shadcn 예제는 변환이 필요하다. 최신 브라우저 위주 지원.
- **날짜**: 2026-10-13

## D-006. TypeScript 7.0.2 목표, 호환 문제 시 6.x

- **이유**: registry 최신은 7.0.2. 다만 Next 16 / typescript-eslint 호환은 설치 시점에 검증한다.
- **규칙**: 호환 문제가 있으면 6.x 최신 안정 버전을 쓰고 사용자에게 보고한다. 검증 결과는 이 항목에 기록한다.
- **결과 (2026-10-13)**: 7.0.2로 설치하면 `typescript-eslint 8.71.1`이 "does not support TS 7.0" 오류로 ESLint를 실행하지 못한다 (peer 범위 `>=4.8.4 <6.1.0`). **TypeScript 6.0.3으로 확정** (6.x 최신 안정). 7.x는 typescript-eslint가 지원하면 재검토한다 (추적: typescript-eslint/typescript-eslint#10940).
- **상태**: 확정 (6.0.3)
- **날짜**: 2026-10-13

## D-007. `src/` 폴더 미사용

- **이유**: `CLAUDE.md §5` 구조 그대로 쓰고, 규모가 작아 `src/` 분리 이점이 적다.
- **trade-off**: 설정 파일과 소스가 루트에서 섞인다. 나중에 옮기면 import 경로를 수정해야 한다.
- **날짜**: 2026-10-13

## D-008. 아이콘 `lucide-react` 1.55.0

- **이유**: shadcn/ui 기본 아이콘, 개별 import로 번들이 작고 필요한 아이콘(ArrowUpRight, Menu, X)이 있다. React 19 지원.
- **trade-off**: 브랜드 로고는 없을 수 있다. Phase 1은 텍스트 링크라 영향 없음.
- **날짜**: 2026-10-13

## D-009. Markdown 스택

- **결정**: `gray-matter` + `unified`(remark-parse, remark-gfm, remark-rehype, rehype-slug, rehype-sanitize, rehype-stringify) + `shiki` 4.5.0(`@shikijs/rehype`) + 자체 목차 추출(`lib/markdown/`).
- **이유**: 빌드 시 정적 HTML 생성으로 클라이언트 JS가 없고, sanitize를 파이프라인에 넣어 보안 규칙을 충족하며, `lib/markdown/` 구조가 곧 설명 가능한 설계 자료가 된다.
- **trade-off**: `next-mdx-remote` 류보다 코드가 늘어난다. shiki 출력과 sanitize 허용 목록 조율, 코드 블록 `tabindex="0"` 처리가 필요하다.
- **날짜**: 2026-10-13

## D-010. 브랜드명 MEFLOWEB

- **결정**: 브랜드명은 MEFLOWEB. `docs/PORTFOLIO_DESIGN.md`의 "ME FLOW" 표기는 샘플이며 실제 화면과 Figma에서는 MEFLOWEB로 쓴다 (문서 본문 갱신은 별도 작업).
- **날짜**: 2026-10-13

## D-011. 디자인 문서 모호점 처리 (기본안)

- `--secondary`는 보조 텍스트 색. shadcn 소스를 가져올 때 토큰 이름을 매핑한다 (shadcn의 secondary는 배경색).
- 태블릿(768–1023px)은 8열 레이아웃 + 타이포 Mobile 값 (`lg` 미만 기준).
- Input 경계선 색(`--border` 대비 1.24)은 Input 컴포넌트 작업 시 확정한다.
- 시간 부족 시 줄이는 순서는 `docs/ROADMAP.md` 기준으로 통일한다.
- **날짜**: 2026-10-13

## D-012. 저장소를 새 이력으로 재생성

- **결정**: 상위 저장소(KOSMCO 포함)가 이미 `portfolio_v2` 원격에 올라가 있어서, `portfolio/`에서 새로 `git init` 후 `--force-with-lease`로 원격 `main`을 새 이력(`f39e2e7`)으로 교체했다. 원격에 KOSMCO 파일이 남지 않은 것을 `git ls-tree`로 확인했다.
- **주의**: 이전 커밋 SHA(`b9f2619`)는 GitHub에 한동안 캐시로 남을 수 있다. 저장소 공개 여부는 확인하지 못했다.
- **날짜**: 2026-10-13

## D-013. create-next-app 기본값 중 바꾼 것

- `cacheComponents: true`, `partialPrefetching: true`를 제거했다. Phase 1은 정적 콘텐츠 사이트라 불필요하고, 캐싱은 의도적으로 결정한다는 `CLAUDE.md §6` 규칙에 맞춘다. 필요해지면 그때 도입한다.
- `AGENTS.md`는 복사하지 않았다 (`CLAUDE.md`가 기준 문서).
- `typecheck`는 Next가 생성하는 전역 타입(`LayoutProps` 등)을 쓰므로 `next typegen && tsc --noEmit`.
- 스캐폴드는 임시 폴더에 생성한 뒤 필요한 파일만 복사했다 (기존 CLAUDE.md 덮어쓰기 방지).
- **날짜**: 2026-10-13

## D-014. 포맷터 범위와 pnpm 설치 방식

- Prettier는 `CLAUDE.md`와 `docs/`를 대상에서 제외한다 (문서 표·박스 도식이 재배치되어 diff가 커짐).
- pnpm은 `corepack enable`이 `C:\Program Files\nodejs` 쓰기 권한 문제(EPERM)로 실패해 `npm i -g pnpm@12.11.2`로 설치했다. `packageManager` 필드로 버전은 고정되어 있다.
- 줄바꿈은 `.gitattributes`의 `* text=auto eol=lf`로 통일했다.
- **날짜**: 2026-10-13
