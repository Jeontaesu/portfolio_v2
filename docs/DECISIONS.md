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

## D-015. Badge는 tinted 배경 대신 흰 surface + 상태 텍스트 토큰 + 점

- **이유**: 상태색 10% tint 위에 상태 텍스트를 놓으면 대비가 primary 4.49 / success 4.50 / warning 4.50 / destructive 4.13으로 4.5:1에 못 미친다. 투명도를 4%까지 낮춰도 destructive는 `#FAFAFA` 위에서 4.37이라 통과하지 못한다. 흰 surface 위 텍스트 대비는 문서 §2.2 표 기준 4.83 이상이다.
- **방법**: 배경 `surface` + 테두리 `border`(장식용) + 상태 텍스트 토큰, 색 외 단서로 점(dot) 표시.
- **trade-off**: tint보다 시각적 강도가 약하다. 새 색 토큰이 필요 없고 대비가 보장된다.
- **날짜**: 2026-10-13

## D-016. 헤더 네비게이션 전환 기준과 기타 구현 결정

- 데스크톱 메뉴는 `md`(768px) 이상에서 보이고, 미만에서는 Radix Dialog 전체 화면 메뉴로 전환한다 (레이아웃 breakpoint 기준).
- Button `sm`은 40px로 44px 터치 타겟에 못 미친다. 밀도가 높은 데스크톱 UI용이며 `md`(44px), `lg`(48px)를 기본으로 쓴다.
- CVA는 variant × size 두 축을 가진 Button, Badge에만 쓴다.
- `next dev`가 `AGENTS.md`를 자동 생성해서 `next.config.ts`에 `agentRules: false`를 설정했다 (`CLAUDE.md`가 단일 기준).
- Footer·Contact는 `content/profile.ts`에 값이 있는 링크만 렌더링한다. Velog URL과 이메일은 사용자에게 받아 2026-10-15에 채웠다. 전화번호는 스팸·스크래핑 노출을 피하려고 사이트에 싣지 않고 이력서 PDF에만 둔다.
- **날짜**: 2026-10-13

## D-017. Step 7 브라우저 검증에서 찾은 문제

Chrome(Playwright)으로 390 / 768 / 1440px에서 검증하고 아래를 수정했다.

- **스크롤 잠금**: `@radix-ui/react-dialog` 1.3.0은 `Dialog.Overlay`가 스크롤 잠금을 담당한다. Content가 전체 화면이라 Overlay를 생략했더니 메뉴가 열린 채 배경이 스크롤됐다. Overlay를 추가해 해결 (wheel 스크롤 후 `scrollY=0` 확인).
- **포커스 링 깜빡임**: Button의 `transition-colors`가 `outline-color`까지 전환해 포커스 직후 링이 흰색에서 파란색으로 서서히 바뀌었다. 전환 대상을 `color, background-color, border-color, opacity`로 한정.
- **로고 터치 타겟**: 로고 링크 높이가 25~28px이라 `min-h-11`(44px)로 수정.
- **검증 범위**: 가로 넘침 없음, h1 크기(40/72px), Pretendard 로드, nav/메뉴 전환, 헤더 높이, 44px 터치 타겟, 콘솔 오류 없음, Skip link, 포커스 링, 모바일 메뉴(열기, focus trap, Esc, 포커스 복귀). 스크린 리더 실제 낭독은 검증하지 않았다.
- **날짜**: 2026-10-13

## D-018. Vercel 배포: GitHub 연동 자동 배포

- **결정**: Vercel 프로젝트 `portfolio-v2`(team `jeontaesus-projects`)를 GitHub 저장소 `Jeontaesu/portfolio_v2`와 연결한다. `main` push는 Production, 그 외 브랜치·PR은 Preview로 자동 배포한다. 프로덕션 도메인은 `https://portfolio-v2-ashen-eight.vercel.app`.
- **이유**: push만으로 배포되어 수동 단계가 없고, PR마다 Preview URL이 생겨 머지 전 확인이 쉽다. CLI 배포(`vercel --prod`)는 커밋과 배포가 어긋날 수 있어 기본 경로로 쓰지 않는다.
- **설정 방침**: `vercel.json`은 만들지 않는다. Next.js는 자동 감지되고, pnpm은 `packageManager` 필드로 고정되어 있다. Node 24는 프로젝트 설정(Settings → General)에서 지정한다. 설정이 코드에 필요해지면 그때 추가한다.
- **CLI 용도**: 로그인된 Vercel CLI는 로그 확인(`vercel logs`), 환경 변수 관리(`vercel env`), 배포 목록 확인에만 쓴다. `.vercel/`은 `.gitignore`에 있다.
- **환경 변수**: Phase 1은 필수 값이 없다. 도메인이 필요한 `metadataBase`, canonical, sitemap은 Week 3에 `NEXT_PUBLIC_SITE_URL`로 주입한다 (Production 값은 위 도메인, 커스텀 도메인을 붙이면 교체).
- **trade-off**: Preview도 공개 URL이라 `noindex` 처리 여부를 SEO 작업 때 정해야 한다. 지금은 콘텐츠가 임시 데이터여서 검색 노출 위험이 있다.
- **미확인**: Vercel 프로젝트의 Node 버전 설정, Production Branch가 `main`인지는 대시보드에서 확인하지 못했다.
- **날짜**: 2026-10-14

## D-019. Markdown 파이프라인 순서와 Blog 필터 렌더링

- **파이프라인 순서**: `remark-parse → remark-gfm → remark-rehype(raw HTML 미허용) → rehype-sanitize → rehype-slug → 목차 수집 → shiki → stringify`. `CLAUDE.md §2`의 순서(slug → sanitize)와 다르다.
- **이유**: sanitize 기본 스키마는 `id`에 `user-content-` 접두사를 붙여, slug를 먼저 붙이면 목차 앵커(`#제목`)와 실제 id가 어긋난다. slug를 sanitize 뒤에 두면 이미 정제된 텍스트로 id가 만들어진다. shiki도 sanitize 뒤에 두면 shiki가 만드는 `class`/`style`/`tabindex`를 허용 목록에 추가하지 않아도 된다. shiki의 입력은 sanitize된 AST이고 출력은 shiki가 직접 이스케이프해 생성한다.
- **재현 (2026-10-14)**: 순서를 바꿔 빌드해 확인했다. (a) slug → sanitize → 목차: heading id와 목차 링크가 모두 `user-content-문제`로 일치하지만 URL이 `#user-content-문제`가 된다. (b) slug → 목차 → sanitize: id는 `user-content-…`, 링크는 `#문제`라 6개 중 6개가 깨진다.
- **재발 방지**: `renderMarkdown`이 목차의 모든 id가 최종 HTML에 `id="…"`로 있는지 확인하고, 없으면 빌드를 실패시킨다. 잘못된 순서(b)에서 빌드가 실제로 실패함을 확인했다.
- **검증**: 임시 글로 빌드해 `<script>`와 `onerror`가 출력에 없고, `pre`에 `tabindex="0"`·`role="region"`·`aria-label`이 붙고, 목차 링크가 본문 heading id와 일치함을 확인했다.
- **추가 의존성**: `vfile`(`file.data.toc` 타입 확장), `@types/hast`(타입 전용), `server-only`.
- **Blog 카테고리 필터**: 디자인 문서대로 `?category=` search param을 쓴다. `searchParams`를 읽는 `/blog`는 요청 시 렌더링(ƒ)이 된다. 정적 생성을 유지하려면 `/blog/category/[slug]` 경로로 바꿔야 한다. 글이 수십 개 이하라 요청 시 렌더링 비용은 무시할 수 있어 URL 설계를 우선했다.
- **trade-off**: `/blog`는 CDN 정적 캐시가 아니다. 대신 필터 링크는 JS 없이 동작하고 공유 가능하다.
- **날짜**: 2026-10-14

## D-020. 경력기술서 반영 방식

- **출처**: 사용자가 제공한 경력 요약과 경력기술서. 급여 정보는 공개 데이터에 넣지 않는다.
- **정성 결과만 게시**: 기술서의 수치(체류 시간 20%, 작업 속도 30%, 코드 재사용률 80%, 오류율 0%, 로딩 15% 등)는 근거를 확인하기 전까지 사이트에 넣지 않았다 (`CLAUDE.md §9`). 근거가 확인된 항목은 `content/profile.ts`의 `result`에 추가한다. 기술서에서 확인이 필요한 점: 인바디 베트남과 BX-AFS의 성과 문구가 동일, "페이지 탐색 시간 20% 증가"를 성과로 쓴 부분, SK하이닉스·하나캐피탈이 "진행 중"인데 재직 기간은 2025.07까지.
- **기간 표기**: 프로젝트 기간은 기술서 표기를 그대로 쓰고, "진행 중" 두 건은 종료 시점을 추정하지 않고 `2024.02 ~`로만 표기했다.
- **고용 형태**: 기술서에 명시된 프리랜서만 표기하고 나머지는 비워 두었다.
- **기술 목록**: 기술서에 있는 것만 "실무 사용"에 넣었다. 기존 디자인 문서의 jQuery는 기술서에 없어 제외했다. React는 "협업 퍼블리싱"으로 한정했다.
- **링크**: Velog, Notion을 `ProfileLinks` 한 곳에서 Footer·Contact·`/contact`에 노출한다. Email은 값이 채워져(2026-10-15) 함께 노출된다.
- **날짜**: 2026-10-14

## D-021. SEO: 사이트 URL, Preview noindex, OG 이미지

- **사이트 URL**: `lib/seo/site.ts`가 `NEXT_PUBLIC_SITE_URL` → `VERCEL_PROJECT_PRODUCTION_URL`(Vercel이 자동 주입) → `localhost` 순으로 정한다. 커스텀 도메인 전까지 환경 변수 설정이 필요 없다. Preview 배포에서도 canonical은 프로덕션 도메인을 가리킨다.
- **Preview 차단**: `VERCEL_ENV`가 `production`이 아니면 `<meta name="robots" content="noindex, nofollow">`와 `robots.txt`의 `Disallow: /`를 낸다. 같은 내용의 공개 Preview URL이 검색 결과에 중복으로 잡히는 것을 막는다.
- **검증**: 환경 변수로 Preview/Production 빌드를 각각 흉내 내 robots 메타, `robots.txt`, canonical이 의도대로 나오는 것을 확인했다. 실제 Vercel 배포에서는 아직 확인하지 않았다.
- **OG 이미지**: `next/og`로 빌드 시 생성한다 (Home, 글별, Case Study별). Satori가 woff2를 읽지 못해 `public/fonts`의 Pretendard TTF를 쓴다. 외부 이미지 서비스나 수작업 이미지가 필요 없고, 글을 추가하면 이미지도 자동으로 생긴다. trade-off: 빌드 시간과 함수 번들에 TTF(약 2.6MB × 2)가 포함된다.
- **JSON-LD**: 블로그 글에만 `BlogPosting`을 넣었다. `author.name`은 실명이 정해지지 않아 브랜드명(MEFLOWEB)을 쓴다. `Person`은 공개할 이름이 정해지면 추가한다.
- **not-found**: `app/not-found.tsx`는 `(site)` 그룹 밖이라 레이아웃을 받지 못한다. 그래서 `SiteShell`(SkipLink·Header·main·Footer)을 컴포넌트로 분리해 `(site)/layout.tsx`와 함께 쓴다.
- **날짜**: 2026-10-14

## D-022. 배포 실패: git에 없는 파일에 의존한 빌드

- **문제**: OG 이미지가 `public/fonts/Pretendard-*.ttf`를 읽었는데, `.gitignore`가 woff2만 커밋하도록 되어 있었다. 로컬에는 파일이 있어 빌드가 통과했고, Vercel에서는 `ENOENT`로 실패했다 (배포 `77s8puw4c`).
- **해결**: Satori가 읽을 수 있는 WOFF(Regular·Bold, 약 1.1MB씩, TTF의 절반 이하)로 바꾸고 `.gitignore` 허용 목록에 추가했다.
- **재발 방지**: 빌드가 저장소 밖 파일을 읽도록 바꿨을 때는 커밋된 파일만 있는 새 clone에서 `pnpm install --frozen-lockfile && pnpm build`로 확인한 뒤 push한다. 이번 수정도 이 방법으로 확인했다.
- **결과**: 배포 `3h8k62cfv` Ready. 실제 도메인에서 모든 공개 페이지 200, 없는 경로 404(사이트 레이아웃 포함), robots·sitemap(12개 URL)·canonical·OG 이미지가 프로덕션 도메인으로 나오는 것을 확인했다.
- **날짜**: 2026-10-14

## D-023. Phase 2 기반 결정: Neon, GitHub OAuth, Zod, Category SetNull

- **DB 호스팅: Neon** — Vercel Marketplace로 연결하면 `DATABASE_URL` 등이 Vercel 환경 변수로 자동 주입된다. 서버리스 Postgres라 트래픽이 적은 포트폴리오에 맞고 무료 티어가 있다. Preview 배포마다 DB branch를 나눌 수 있다. 대안이었던 Supabase는 Storage가 장점이지만 Auth가 Auth.js와 겹치고, Prisma Postgres는 설정이 가장 단순하지만 Prisma 밖의 도구 경험이 적다.
- **인증: Auth.js + GitHub OAuth** — 허용 목록에 있는 계정만 `ADMIN`으로 만든다. 비밀번호를 저장하지 않아 해싱·로그인 시도 제한을 직접 구현할 필요가 없다. trade-off: GitHub 계정이 없는 사람은 로그인할 수 없다 (이 사이트는 관리자 1명이라 문제없음). 권한 확인은 버튼 숨김이 아니라 Admin 페이지·모든 Server Action·Route Handler에서 각각 한다 (`CLAUDE.md §1`).
- **Validation: Zod** — 폼과 Server Action이 같은 스키마를 쓰고 타입을 스키마에서 만든다.
- **Category 삭제: SetNull** — 글은 남기고 미분류로 둔다. 글이 사라지는 일이 없다.
- **버전**: Prisma, Auth.js, Zod 버전은 설치 시점에 registry에서 확인해 고정하고 이 항목에 기록한다.
- **날짜**: 2026-10-14

## D-024. 파일 콘텐츠를 DB로 전환하는 방식

- **버전**: Prisma 7.10.0 고정. npm `latest` 태그가 RC(8.0.0-rc.22)여서 안정 버전(`prev` 태그)을 썼다. `@prisma/adapter-pg` 7.10.0, `pg` 8.23.1. Prisma 7은 datasource URL을 `schema.prisma`가 아니라 `prisma.config.ts`에 두고 `.env`를 직접 읽지 않아, config에서 `process.loadEnvFile(".env.local")`로 읽는다. pnpm 12의 빌드 스크립트 차단 때문에 `pnpm-workspace.yaml`의 `allowBuilds`에 prisma, @prisma/engines, esbuild를 허용했다.
- **접속 두 가지**: 앱은 pooled `DATABASE_URL`, migration·seed는 direct `DATABASE_URL_UNPOOLED`. 서버리스에서는 pooler 없이 연결하면 연결 수가 부족해질 수 있고, migration은 pooler(PgBouncer)와 맞지 않는다.
- **로컬은 Neon dev branch**: `.env.local`은 프로덕션과 분리된 dev branch를 가리킨다. migration·seed 실험이 프로덕션 데이터에 닿지 않는다.
- **seed는 덮어쓰지 않는다**: slug·email이 이미 있으면 건너뛴다. Admin에서 수정한 내용을 파일이 되돌리지 못하게 하기 위해서다. 그래서 seed 후 파일을 고쳐도 DB에는 반영되지 않는다 (파일은 최초 이전용 원본이다).
- **카테고리는 데이터**: 고정 목록(`POST_CATEGORIES`) 의존을 없애고 `Category` 테이블에서 읽는다 (`PostMeta.category`는 `{slug, name} | null`, null은 삭제된 카테고리의 미분류 글). 시드용 목록은 `post-file.ts`에만 남겼다. Blog 필터는 **게시된 글이 있는 카테고리만** 보여준다. 이전에는 빈 카테고리도 보이고 "글이 없습니다"를 안내했다. 빈 카테고리를 눌러 빈 목록을 보는 경험을 없애기 위한 변경이다 (빈 카테고리를 직접 URL로 열면 전체 목록으로 돌아간다).
- **날짜**: 프로젝트 기간은 `DATE`(해당 월 1일, UTC)로 저장하고 `lib/content`에서 `YYYY-MM`으로 되돌린다.
- **마이그레이션 적용 방식**: Vercel 빌드에서 `prisma migrate deploy`를 자동 실행하지 않는다. Preview와 Production이 같은 DB 환경 변수를 쓰고 있어서, Preview 빌드가 프로덕션 DB를 바꿀 수 있기 때문이다. 스키마 변경은 `pnpm db:deploy`를 프로덕션 접속 정보로 수동 실행한 뒤 push한다. Preview용 DB를 분리하면 자동화를 재검토한다.
- **검증**: dev DB에 seed 후 `next build`한 정적 페이지 7개의 `<main>` 내용이 파일 기반으로 배포된 프로덕션과 글자 수까지 동일함을 확인했다. `/blog`(필터 포함)와 없는 slug의 404는 로컬 서버에서 확인했다.
- **날짜**: 2026-10-15

## D-025. 인증 구현: Auth.js v5 + GitHub, 관리자 확인은 매번 DB로

- **버전**: `next-auth` 5.0.0-beta.32 (정확한 버전 고정). npm `latest`는 v4(4.24.15)이고 v5는 아직 베타다. `AUTH_SECRET`·`AUTH_GITHUB_ID`·`AUTH_GITHUB_SECRET` 환경 변수 이름이 v5 규칙이고 App Router용 `auth()` 헬퍼가 v5에만 있어 v5를 택했다. trade-off: 베타라 API가 바뀔 수 있다. 정식 버전이 나오면 업그레이드를 검토한다.
- **허용 목록은 DB의 `User.role = ADMIN`**: GitHub 로그인 후 `signIn` 콜백이 이메일(대소문자 무시)로 ADMIN 행을 찾고, 없으면 `AccessDenied`로 돌려보낸다. 환경 변수 목록 대신 DB를 쓰면 코드 수정 없이 관리자를 추가·제거할 수 있다. 비밀번호는 저장하지 않는다.
- **JWT 세션, DB 세션 테이블 없음**: `Account`·`Session` 테이블이 필요 없다. 대신 JWT는 "누가 로그인했는지"의 힌트일 뿐이고, `requireAdmin()`이 요청마다 DB에서 ADMIN 여부를 다시 확인한다 (`lib/auth/guard.ts`). 관리자 권한을 회수하면 JWT가 만료되기 전이라도 즉시 접근이 막힌다. 비용: 보호된 요청마다 쿼리 1건.
- **권한 확인 위치**: Admin 레이아웃, 각 페이지, (이후) 모든 Server Action·Route Handler에서 각각 호출한다. 레이아웃은 클라이언트 이동 시 다시 실행되지 않아 보안 경계가 될 수 없다 (`CLAUDE.md §1`: 버튼 숨김만으로 처리하지 않는다). `proxy`(구 middleware)는 쓰지 않았다.
- **로그인 루프 방지**: 로그인 페이지는 `getAdmin()`(DB 확인, redirect 없음)으로 판단한다. JWT는 유효하지만 DB에서 관리자가 아닌 사용자가 /admin/login ↔ /admin/dashboard를 오가는 무한 리다이렉트를 막는다.
- **오류 메시지**: 로그인 실패는 "등록되어 있지 않습니다"와 일반 오류 두 가지만 보여준다. 허용된 계정 목록이나 실패 원인을 노출하지 않는다.
- **노출 차단**: `/admin`은 `noindex` metadata, `robots.txt`의 `Disallow: /admin, /api/`.
- **아이콘**: lucide-react 1.x에는 브랜드 아이콘(`Github`)이 없다. 아이콘 라이브러리를 추가하지 않고 범용 `LogIn`을 썼다 (`CLAUDE.md §6`: 아이콘은 lucide 하나).
- **검증 (2026-10-15)**: 실제 GitHub 로그인 없이, `AUTH_SECRET`으로 세션 쿠키를 만들어 `next start`에서 11개를 확인했다. 쿠키 없음·깨진 쿠키·DB에 없는 사용자·VIEWER는 로그인 페이지로, ADMIN은 대시보드로 이동하고, 로그인 페이지 루프가 없고, 로그인 오류 문구와 noindex가 나오고, `/api/auth/providers`가 github를 반환한다. **GitHub OAuth 왕복(승인 → 콜백 → 세션)은 2026-10-16 로컬 `pnpm dev`에서 로그인 성공을 확인했다. Vercel 프로덕션(프로덕션용 OAuth App, 별도 Callback URL)에서도 같은 날 로그인이 정상 동작했다.**
- **발견한 점**: `next start`(production 모드)는 `UntrustedHost`로 모든 인증 요청을 500으로 거부한다. Vercel은 `VERCEL` 변수로 자동 신뢰되고 `next dev`도 문제없다. 코드에서 `trustHost: true`로 열지 않고, 로컬 production 테스트 때만 `AUTH_TRUST_HOST=true`를 준다.
- **날짜**: 2026-10-15

## D-026. Admin CMS: 폼·검증·미리보기·삭제 방식

- **Input 테두리 = 기존 `--muted`**: `--border`(대비 1.24)는 장식용이라 입력창 경계로는 WCAG 1.4.11(UI 경계 3:1)에 미달한다. `--muted`(4.83)를 재사용해 새 색 토큰을 만들지 않았다. 사용자 확인 후 결정 (2026-10-15).
- **Zod 4.6.7 (정확한 버전 고정)**: 스키마 하나를 Server Action에서 서버 검증에 쓴다. 폼 값은 전부 문자열로 오므로 빈 문자열 → `undefined`, 체크박스 `"on"` → boolean, 쉼표 구분 기술 스택 → 배열, `YYYY-MM` → 날짜를 스키마에서 변환한다 (`lib/validations/`).
- **모든 Server Action은 첫 줄에서 `requireAdmin()`**: Server Action은 누구나 POST할 수 있는 공개 엔드포인트다. 폼을 숨기는 것은 권한이 아니다. 관리자 읽기 쿼리(`lib/admin/queries.ts`)도 각각 `requireAdmin()`을 부른다.
- **폼 상태는 `useActionState`**: 반환값 `{ status, message, fieldErrors }`로 필드 오류를 보여준다. 실패하면 오류 요약(`role="alert"`)으로 포커스가 이동하고 항목이 각 필드로 링크된다. 성공은 `role="status"`로 알린다. 오류 메시지는 일반 문구만 쓰고 DB 오류는 서버 로그에만 남긴다. 생성 후에는 편집 페이지로 `redirect`한다.
- **slug 중복은 사전 조회 + `P2002` 처리**: 사전 조회는 좋은 오류 메시지를 위해, `P2002` 처리는 두 요청이 동시에 들어오는 경쟁 상황을 위해 둘 다 둔다.
- **게시일 유지**: 처음 게시할 때만 `publishedAt`을 정하고, 초안으로 되돌렸다 다시 게시해도 원래 게시일을 유지한다. 공개 쿼리는 `status = PUBLISHED`만 읽는다.
- **재검증은 `revalidatePath("/", "layout")` 한 줄**: 글·프로젝트는 Home, 목록, 상세, OG 이미지, sitemap에 나온다. 경로를 하나씩 추적하면 slug가 바뀔 때 옛 경로가 남을 수 있어, 페이지가 몇 개 안 되는 이 사이트에서는 전체 재검증이 더 안전하다. trade-off: 저장마다 공개 페이지가 다시 만들어진다.
- **Markdown 미리보기는 서버에서**: `previewMarkdown` Server Action이 공개 페이지와 같은 `renderMarkdown`(sanitize 포함)을 쓴다. 클라이언트에 Markdown 라이브러리를 번들하지 않고, 미리보기가 실제 결과와 같다. 비용: 탭을 열 때마다 서버 왕복. 탭은 Radix Tabs를 써 방향키·포커스를 직접 구현하지 않았다. 본문은 상태 + hidden input으로 제출해 Preview 탭이 열려 있어도 값이 전송된다.
- **삭제는 Radix AlertDialog**: 취소에 먼저 포커스되고, 바깥 클릭으로 닫히지 않는다. 카테고리를 삭제하면 글은 미분류로 남고(SetNull) 확인 문구에 영향 받는 글 수를 보여준다.
- **프로젝트 정렬은 위·아래 버튼**: 항상 1..n으로 다시 번호를 매기는 트랜잭션이라 sortOrder가 같거나 비어 있어도 클릭이 무반응이 되지 않는다. 드래그 정렬은 P1.
- **썸네일은 `/`로 시작하는 public 경로만**: `next/image`는 원격 호스트를 `next.config`에 등록해야 하고, 업로드는 Media 기능에서 다룬다. 외부 URL 입력은 지금 거부한다. 링크 URL은 `http(s)`만 허용해 `javascript:`를 막는다.
- **저장하지 않은 변경 경고는 `beforeunload`만**: 탭 닫기·새로고침은 막지만 앱 안의 링크 이동은 막지 못한다. 에디터 안에는 앱 내 링크가 없어 현재는 충분하다.
- **날짜**: 2026-10-15

## D-027. 공개 사이트 UI 개편: 시안의 구조만 반영, 토큰은 유지

- **배경**: Figma 시안(Home, 이미지로 전달)으로 전체 UI를 바꾸고 싶다는 요청. Toss Design System(TDS Mobile)도 검토했다.
- **TDS는 적용하지 않았다**: `DESIGN.md`는 공개 페이지에서 관찰한 값을 모은 참고 문서였고, 모바일 앱용이라 Table·Sidebar·Dialog·데스크톱 레이아웃이 없다. Toss Product Sans는 재배포 권리가 확인되지 않는다. 대비를 계산하니 Primary `#3182f6`은 3.71:1, Muted `#8b95a1`은 3.04:1로 AA(4.5:1)에 못 미쳤다. 접근성이 이 프로젝트의 차별점이라 채택하지 않았다. 사용자가 최종 결정.
- **시안에서는 구조만 가져왔다**: 색은 시안이 아니라 `PORTFOLIO_DESIGN.md §2` 토큰을 그대로 썼다 (사용자 지시). 베이지 밴드는 `bg-surface`, 어두운 패널은 `bg-foreground`로 대체했고 새 색 토큰은 만들지 않았다.
- **Home 흐름 변경**: `Hero → In Focus → Selected Works → Blog Preview → About(+Toolkit) → Career → Contact`. Blog가 About 앞으로 왔다. 헤더는 `md` 이상에서 2단이고(높이 때문에 데스크톱 sticky 해제), 푸터는 메뉴 링크를 포함하도록 확장했다.
- **하위 페이지**는 공통 `PageHeader`(overline + 제목 + 우측 설명 + 굵은 구분선)로 Home과 같은 모양을 쓴다. 한 곳에서 바꾸면 6개 페이지가 함께 바뀐다.
- **만들지 않은 것**: About 책상 사진(에셋 없음), "관심 있는 주제부터" 섹션(콘텐츠 미정), 블로그 일러스트 썸네일(데이터 없음), 헤더 검색(기능 범위 밖). 시안의 문구·경력·수치는 `profile.ts`와 DB에서 읽고, 시안 값을 새로 쓰지 않았다.
- **부작용**: `ProfileLinks`의 순서가 Email 먼저로 바뀌어 `/contact`에도 반영된다.
- **검증**: `typecheck`, `lint`, `pnpm build` 통과. 화면은 개발 서버에서 직접 확인하는 단계가 남아 있다 (390 / 768 / 1440).
- **날짜**: 2026-10-17

## D-028. 모션: CSS 우선, 메뉴 exit와 스크롤 reveal에는 `motion`

- **원칙**: 기본은 CSS(`transition`/`@keyframes`). `motion`(framer-motion)은 드래그, stagger orchestration, layout animation, exit(`AnimatePresence`)처럼 JS 상태 추적이 필요한 경우에만 쓴다 (`CLAUDE.md §6 애니메이션`).
- **1차 시도는 CSS였다**: 스크롤 등장을 `animation-timeline: view()`로 구현했지만 Firefox가 지원하지 않아 그 브라우저에서는 효과가 없었다. 이어서 사용자가 `motion`을 설치하고 메뉴 exit와 reveal을 요청해 아래로 바꿨다.
- **메뉴 exit**: 공개 모바일 메뉴와 Admin 드로어를 Radix Dialog 그대로 두고 open 상태를 제어하며 `Overlay`·`Content`에 `forceMount`를 줘서 `AnimatePresence`가 exit 애니메이션이 끝날 때까지 마운트를 유지한다. 포커스 트랩·Esc·스크롤 잠금·포커스 복귀는 Radix가 계속 맡는다 (CLAUDE.md §1: Radix 동작을 직접 재구현하지 않는다).
- **Reveal**: `whileInView`(한 번만, `once`)로 아래에서 올라오며 나타나고, 카드·목록은 `delay`로 순서를 둔다. Firefox를 포함해 동작한다. trade-off: 서버 렌더가 `opacity:0`이라 JS 없이는 보이지 않는다 → **첫 화면 콘텐츠(In Focus)에는 쓰지 않아** LCP를 지킨다.
- **번들 관리**: `MotionProvider`(`LazyMotion` + `domAnimation`, `strict`)를 `SiteShell`과 Admin 보호 레이아웃에 한 번씩 두고 `m.*`만 쓴다. 풀 `motion.*`을 쓰면 `strict`가 에러를 낸다.
- **reduced motion**: `MotionConfig reducedMotion="user"`가 이동(x/y)을 끄고, `[data-reveal]`은 CSS(`!important`)로 즉시 보이게 한다. 읽기 진행바는 CSS 스크롤 타임라인이고 `no-preference` + `@supports`로 이중 게이트한다.
- **hover**: 프로젝트·In Focus 이미지 확대(1.03, 500ms), "→" 이동, 연락처 행의 ↗ 이동과 색 전환. 클릭할 수 없는 요소(Career 행)에는 hover 효과를 두지 않았다. 링크로 오해하기 때문이다.
- **범위 밖**: Admin은 장식 모션을 넣지 않았다.
- **검증**: `typecheck`, `lint`, `pnpm build` 통과. 프로덕션 서버의 HTML에서 `data-reveal` 요소가 `opacity:0`으로 렌더되는 것을 확인했다. 실제 움직임(메뉴 exit, reveal, reduced motion)과 번들 크기 영향은 아직 브라우저에서 확인·측정하지 않았다.
- **날짜**: 2026-10-17

## D-029. 컴포넌트 가이드 페이지: Storybook 대신 `/guide`

- **배경**: UI 컴포넌트를 한곳에서 상태별로 확인할 페이지가 없었다. `CLAUDE.md`는 Storybook을 MVP 이후로 미뤘다. 사용자가 KOSMCO 프로젝트(`ui/` + `app/guide/components/*`) 구조를 참고해 Storybook처럼 보이는 가이드 페이지를 요청했다 (2026-10-19).
- **KOSMCO에서 가져온 것은 구조뿐**: 사이드바 목록(그룹별) + 컴포넌트당 1페이지 + 데모 / Props 표 / 사용법 코드. 코드는 복사하지 않았다 (`CLAUDE.md §2`: KOSMCO는 참고용). SCSS·CSS Modules·`classnames` 대신 Tailwind와 현재 토큰, 뷰포트 배지는 JS 리스너 대신 CSS 범위 표시(`md:hidden` 등)로 바꿨다 (viewport JS 감지 금지).
- **Storybook을 쓰지 않은 이유**: 별도 빌드·설정·의존성이 커서 지금 단계에 과하다. 이 사이트의 primitive 10여 개는 일반 Next.js 페이지로 같은 토큰·같은 빌드에서 확인하는 편이 유지 비용이 작다. trade-off: Storybook의 controls·a11y 애드온·자동 문서화는 없다. 상태는 직접 나열한다.
- **위치와 노출**: `app/guide/`는 `(site)` 밖의 별도 레이아웃(SkipLink + 사이드바 + main). 도구 성격이라 `noindex`, sitemap 제외, `robots.txt`에 `/guide` Disallow. 프로덕션에서도 열리고, 지원처에 보여주려는 목적(사용자 요청, 2026-10-19)으로 헤더·모바일 메뉴·푸터에 "Components" 링크를 두었다 (`nav-items.ts`). 가이드 사이드바 맨 위에는 사이트로 돌아가는 링크가 있다. 검색 노출은 원하지 않아 noindex는 유지한다. 숨기려면 `notFound()`로 막고 링크를 지우면 된다.
- **새 페이지 규칙**: 컴포넌트를 추가하면 `app/guide/<slug>/page.tsx`와 `_components/guide-nav-items.ts`에 함께 추가한다. Props 표와 코드 예시는 수동이라 컴포넌트 API가 바뀌면 같이 고쳐야 한다.
- **다룬 것**: Colors, Typography, Responsive, MobileNav, Button, Form controls(Input·Textarea·Select·CheckboxField·FormField), Badge, Pagination, ExternalLink, EmptyState, ErrorState, Skeleton, ConfirmDelete. 색 값과 대비는 `PORTFOLIO_DESIGN.md §2`에서 옮긴 값이다. Tabs·MobileNav·Reveal·SubmitButton·MarkdownContent는 아직 넣지 않았다.
- **Home 소개 섹션 (2026-10-19)**: 헤더 링크만으로는 업체가 가이드의 목적을 알기 어려워, Selected Works 다음에 `ComponentGuide` 섹션을 넣었다. 헤더에 눈에 띄는 badge를 두는 안은 Projects·Blog 같은 핵심 메뉴와 위계가 어긋나고 헤더가 복잡해져 채택하지 않았다. 사용자가 정한 주제 칩 3개(컴포넌트 구조 / 상태 표현 / 반응형 적용)는 각각 `/guide/button`, `/guide/skeleton`, `/guide/responsive`로 연결한다. "반응형 적용"이 사실이 되도록 가이드에 `Responsive` 페이지(브레이크포인트 표, 열 수 데모, 실제 재배치 항목)를 추가했다. 색은 시안이 아니라 토큰(흰 surface + border)이다. 시안의 "FOR HIRING TEAMS" 라벨은 방문자를 한정해 보이므로 쓰지 않았다.
- **MobileNav 데모 (2026-10-19)**: 범용 Dialog primitive는 만들지 않았다. 사용처가 없고(`CLAUDE.md §6`: 2곳 이상에서 쓰일 때 공통화), 필요해지면 Radix 위의 얇은 래퍼로 충분하다. 대신 이미 있는 메뉴를 가이드에 보여 준다. `MobileNav`가 버튼과 메뉴 모두 `md:hidden`이라 데스크톱 폭에서는 열 수 없어서, 데모용 `alwaysVisible` prop을 추가했다 (기본값은 기존 동작이라 사이트 헤더는 그대로). `m.div`가 `LazyMotion` 없이 마운트되면 `strict`가 에러를 내므로 가이드 레이아웃에도 `MotionProvider`를 두었다. 가이드는 Radix가 처리하는 것(포커스 트랩·Esc·포커스 복귀·스크롤 잠금)과 이 프로젝트가 더한 것(forceMount + AnimatePresence exit, 모션 줄이기)을 나눠 설명한다. **검증**: 브라우저(Edge, 1280px)를 CDP로 조작해 버튼 표시, 메뉴 열림, Dialog 이름, 스크롤 잠금, Tab 12회 동안 포커스가 메뉴 안에 머무름, Esc로 닫힘, 포커스가 "메뉴 열기" 버튼으로 복귀, 콘솔·예외 오류 없음을 확인했다. 스크린 리더 낭독과 모바일 실기기는 확인하지 않았다.
- **한계**: ConfirmDelete 데모의 action은 아무것도 하지 않아 삭제 버튼을 눌러도 대화상자가 열린 채 남는다(실제 앱은 redirect). ErrorState 데모는 `role="alert"`라 페이지를 열 때 낭독된다.
- **검증**: `typecheck`, `lint`, `pnpm build` 통과. `next start`에서 12개 경로 200, noindex 메타와 robots Disallow 확인. 화면 모양(390 / 768 / 1440), 키보드 이동, 스크린 리더는 아직 직접 확인하지 않았다.
- **날짜**: 2026-10-19

## D-030. Pretendard 서브셋: 모바일 LCP 13초대 → 3초 안팎

- **발견**: 배포 URL을 Lighthouse 12.8.2(모바일 기본 프로필, 시뮬레이션 스로틀링)로 측정하자 5개 페이지 모두 LCP가 13.5–14.2초, 성능 50–70점이었다. 접근성·Best Practices·SEO는 전부 100. 페이지마다 LCP 요소가 달라도(h1, 이미지) 값이 비슷해 공통 원인을 의심했고, 전송량이 가장 큰 것이 Pretendard woff2 3개(각 약 770–790KB, 합계 약 2.3MB, 한글 전체 글리프)였다.
- **결정**: `next/font/local` 구조는 유지하고 폰트를 둘로 나눈다. `core`(KS X 1001 한글 중 **사이트 코드·콘텐츠에 실제로 쓰인 음절** + 영문·기호, 약 84KB × 3)는 preload하고, `hangul`(나머지 KS X 1001 음절, 약 130KB × 3)은 `preload: false` + `unicode-range: U+AC00-D7A3`로 둔다. 폰트 스택에서 core가 먼저라서 core에 없는 음절이 화면에 나올 때만 hangul 파일을 받는다. 생성은 `scripts/subset-pretendard.py`, 설정은 `lib/fonts/pretendard.ts`.
- **검토한 대안**: (1) KS X 1001만 남긴 한 벌 서브셋(각 약 200KB, 합계 610KB). 로컬에서 LCP가 5.7–6.0초로 남아 채택하지 않았다. (2) Pretendard dynamic-subset(조각 20여 개 + CSS `unicode-range`). 효과는 비슷하지만 `next/font`의 preload·폰트 관리를 거치지 않고 CSS를 직접 관리해야 해서 보류했다.
- **trade-off**: Admin에서 새 글을 쓰다 core에 없는 음절이 나오면 그 페이지에서 hangul 파일(약 130KB)을 추가로 받는다. KS X 1001 밖의 음절은 폰트에 없어 시스템 글꼴로 대체된다. 폰트 스택에 `Malgun Gothic` 등이 있어 깨지지는 않지만 글자 모양이 달라질 수 있다. 새 글을 많이 쓴 뒤에는 스크립트로 core를 다시 만든다.
- **변하지 않은 것**: 디자인 토큰, 굵기(400/600/700), 폰트 이름. OG 이미지용 `.woff`(`lib/seo/og-image.tsx`)는 서버에서만 읽어 그대로 둔다.
- **배포 후 측정 (2026-10-20, 같은 배포 URL, Lighthouse 12.8.2 모바일 프로필, 페이지당 1회)**: 성능 전 → 후 / LCP 전 → 후 — Home 50 → 85 / 14.2 → 3.3초, /projects 59 → 81 / 14.1 → 3.7초, /about 66 → 83 / 13.7 → 3.5초, /projects/[slug] 67 → 84 / 13.7 → 3.3초, /blog/[slug] 70 → 85 / 13.5 → 3.5초. 접근성·Best Practices·SEO 100 유지. 데스크톱은 5개 모두 성능 100 / LCP 0.7초(전 87–88점 / 2.3–2.4초). 폰트 전송량 약 2.3MB → 약 250KB(84KB × 3). (배포 전 로컬 빌드 측정은 LCP 2.9–3.4초로 비슷했다.)
- **한계**: 모바일 성능이 100이 아닌 것은 TBT 280–350ms와 LCP 3초대가 남아 있기 때문이며, 이번 변경은 폰트만 다뤘고 남은 원인은 확인하지 않았다. 페이지당 1회 측정이라 점수는 몇 점 단위 오차가 있다. LCP가 폰트 때문이라는 것은 용량·시간대와 폰트 축소 후 개선으로 판단한 것이고 다운로드를 막아 직접 검증하지는 않았다. core에 없는 음절 요청이 실제로 hangul 파일을 받는지도 브라우저에서 확인하지 않았다.
- **배포 사고**: 새 `Pretendard-Hangul-*.woff2`가 `.gitignore`의 `public/fonts/*` 허용 목록에 없어 첫 푸시의 Vercel 빌드가 실패했다. 허용 목록에 추가해 해결했다. 새 파일을 만든 뒤 `git status`로 추적 여부를 확인하지 않은 것이 원인이다.
- **날짜**: 2026-10-20

## D-031. 보안 점검: 응답 헤더 4종 추가, CSP는 보류

- **점검 범위**: 코드 리뷰. Admin 페이지·레이아웃, Server Action 4개 파일, `lib/admin/queries.ts`, Auth.js 설정, 공개 조회(DRAFT 차단), Markdown sanitize, `dangerouslySetInnerHTML` 2곳(Markdown 본문, JSON-LD), 원시 SQL 사용 여부. 배포 사이트는 비로그인 `/admin/dashboard`의 307, 로그인 페이지 noindex·no-store, 응답 헤더만 확인했다. **공격 시도, 인증 없이 Server Action을 직접 POST하는 테스트, 접근성 수동 점검은 하지 않았다.**
- **결과**: 모든 Server Action과 Admin 조회가 검증보다 먼저 `requireAdmin()`을 호출하고, 이 함수가 매번 DB에서 ADMIN 여부를 다시 확인한다. 심각한 취약점은 찾지 못했다.
- **추가한 것**: `next.config.ts`의 `headers()`로 `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`(Admin 클릭재킹 방지, 이 사이트는 자기 페이지를 iframe으로 쓰지 않는다), `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`(카메라·마이크·위치 차단). 로컬 `next start`에서 `/`, `/blog`, `/admin/login`, 리다이렉트 응답 모두에 나오는 것을 확인했다. 배포 후 확인은 아직 하지 않았다. HSTS는 Vercel이 이미 붙인다.
- **CSP는 보류**: Next.js가 만드는 인라인 스크립트 때문에 nonce 방식(요청마다 동적 렌더링이 필요해 정적 페이지의 이점이 줄어든다)이나 `unsafe-inline` 허용 중 하나를 골라야 한다. `unsafe-inline`은 XSS 방어 효과가 크게 줄어든다. Markdown은 sanitize를 거치고 raw HTML을 버리므로 당장의 위험은 낮다고 판단해 따로 결정하기로 했다.
- **그 밖의 변경**: 썸네일 경로 검증이 `..`를 막는다(`next/image`의 `src`로만 쓰여 실제 위험은 낮았다). 삭제 Action 3곳에 복사되어 있던 Prisma `P2025` 처리를 `isNotFound()`로 합쳤다.
- **남긴 것**: `id`·`direction` 인자의 zod 검증은 넣지 않았다(관리자 전용, Prisma 파라미터화, `direction`은 런타임 체크 있음). 로그인 허용 목록은 GitHub가 주는 이메일을 믿는다. GitHub가 공개 이메일에 인증된 주소만 허용한다고 알고 있지만 공식 문서로 확인하지는 않았다. 레이트 리밋은 검토하지 않았다.
- **날짜**: 2026-10-20
