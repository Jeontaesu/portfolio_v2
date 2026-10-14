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
- Footer·Contact는 `content/profile.ts`에 값이 있는 링크만 렌더링한다. Velog URL과 이메일은 `[TBD]`(사용자 제공 대기).
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
- **링크**: Velog, Notion을 `ProfileLinks` 한 곳에서 Footer·Contact·`/contact`에 노출한다. Email은 값이 없어 아직 숨긴다.
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
