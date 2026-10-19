# ARCHITECTURE.md

구현 구조 문서. 규칙·디렉터리 책임의 기준은 `CLAUDE.md §5`, 이 문서는 실제 구현이 생길 때마다 갱신한다.
현재 단계: Phase 2 진행 중 (Week 4 DB, Week 5 인증, Week 6–7 Admin CMS 구현). Public 사이트는 Phase 1로 배포 완료. 마지막 갱신: 2026-10-15.

각 항목은 **구현됨** / **설계만 있음**으로 구분한다.

## 1. 데이터 흐름 (Phase 1)

```text
PostgreSQL (Neon)  ←  prisma/seed.ts 가 content/ 의 파일을 1회 이전
        │  (Prisma + @prisma/adapter-pg, lib/db/client.ts)
lib/content/  ← 페이지는 이 함수로만 콘텐츠를 읽는다 (server-only)      [DB 조회로 전환됨]
        │
lib/markdown/ ← Markdown → sanitize된 HTML, 목차 추출                    [구현됨]
        │
app/(site)/   ← Server Component 기본, 빌드 시 정적 생성 (/blog 만 요청 시) [Home, Blog, Projects 구현]
```

- 콘텐츠 필드 이름은 `CLAUDE.md §7`의 모델과 동일하게 쓴다.
- `status = PUBLISHED`만 조회한다. DRAFT는 `lib/content/` 쿼리에서 걸러져 어떤 페이지에도 나오지 않는다.
- 파일 → DB 전환은 `lib/content/` 내부와 카테고리 목록을 받는 컴포넌트 props만 바꿨고, 나머지 페이지 코드는 유지했다 (D-024).
- 페이지는 빌드 시점의 DB 내용으로 정적 생성된다. Admin에서 수정한 내용을 반영하려면 Server Action에서 해당 경로를 revalidate해야 한다 (Week 6–7 작업).

**현재 실제 상태**: `lib/content/`는 `posts.ts`, `projects.ts`(DB 조회), `types.ts`(페이지가 받는 타입), `post-file.ts`(seed용 파일 파서)가 있고, `lib/db/client.ts`가 Prisma 클라이언트를 만든다. `lib/markdown/`은 `render.ts`와 `toc.ts`, `lib/seo/`는 `site.ts`, `metadata.ts`, `og-image.tsx`가 있다. About/Career/Resume/Contact/Footer는 아직 `content/profile.ts`를 직접 import한다 (경력·링크는 DB 대상이 아니다). `content/posts/*.md`, `content/projects.ts`, `content/projects/*.md`는 이제 **seed 원본**이다.

파이프라인 순서와 이유는 D-019. `status: DRAFT`는 `lib/content`에서 걸러져 어떤 페이지에도 노출되지 않는다.

## 2. 라우트 구현 현황

| 라우트 | 상태 |
|---|---|
| `/` | 구현됨 (모든 섹션이 실제 데이터에 연결됨) |
| `/blog` (`?category=`), `/blog/[slug]` | 구현됨 |
| `/projects`, `/projects/[slug]` | 구현됨 |
| `/admin/login`, `/admin/dashboard` | 구현됨 (GitHub 로그인, Dashboard는 DB 실집계) |
| `/admin/posts`, `/new`, `/[id]` | 구현됨 (검색·상태·카테고리 필터·페이지는 URL, 작성/수정/삭제, Write/Preview) |
| `/admin/projects`, `/new`, `/[id]` | 구현됨 (정렬 버튼, Featured 토글, 작성/수정/삭제) |
| `/admin/categories`, `/new`, `/[id]` | 구현됨 (삭제 시 글은 미분류) |
| `/about`, `/career`, `/resume`, `/contact` | 구현됨 (`content/profile.ts` 데이터. Resume PDF·Email·Velog 값 연결됨) |

| `/guide`, `/guide/<컴포넌트>` | 구현됨 (컴포넌트 가이드 13페이지, Responsive 포함. 공개 사이트 레이아웃과 분리, noindex, robots Disallow, sitemap 제외. 헤더·모바일 메뉴·푸터에서 "Components"로 링크. D-029) |

SEO 파일: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `blog/[slug]`·`projects/[slug]`의 `opengraph-image.tsx`, `app/not-found.tsx`, `app/(site)/error.tsx`. 페이지 metadata는 `lib/seo/metadata.ts`의 `pageMetadata()`로 title·description·canonical·Open Graph를 함께 만든다 (D-021).

## 2-1. 인증 구조 (Week 5)

```text
lib/auth/config.ts   NextAuth: GitHub 하나, JWT 세션, signIn 콜백이 DB의 ADMIN 허용 목록 확인
lib/auth/admin.ts    findAdminByEmail / findAdminById (User.role = ADMIN)
lib/auth/guard.ts    getAdmin() (null 가능), requireAdmin() (없으면 /admin/login으로 redirect)
app/api/auth/[...nextauth]/route.ts   Auth.js 핸들러
```

- 변수: `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` (Production은 Vercel, 로컬은 `.env.local`에 별도 OAuth App).
- 세션 JWT는 힌트이고 권한은 요청마다 DB로 확인한다. 보호할 Server Action·Route Handler는 첫 줄에서 `requireAdmin()`을 호출한다.

## 2-2. Admin CMS 구조 (Week 6–7)

```text
lib/validations/     Zod 스키마 (post, project, category, common)
lib/admin/queries.ts 관리자 읽기 (각 함수가 requireAdmin 호출)
lib/admin/actions/   Server Action: post, project, category, preview (각각 requireAdmin + Zod 검증)
lib/admin/form-state.ts, revalidate.ts   폼 결과 타입, 공개 페이지 재검증
components/layout/   admin-sidebar, admin-nav-links, admin-mobile-nav (lg 미만은 Drawer)
components/features/ blog/(post-form, post-table, category-form), projects/project-form, dashboard/stat-card, admin/(markdown-editor, form-status)
components/ui/       input, select, textarea, checkbox-field, form-field, submit-button, confirm-delete, empty-state, pagination
```

- 흐름: 폼 → `useActionState` → Server Action → `requireAdmin()` → Zod → Prisma → `revalidatePublicSite()` → redirect/성공 메시지. 선택 이유는 D-026.
- 상태: Admin 라우트에 `loading.tsx`, `error.tsx`(일반 문구만)가 있고, 목록은 empty / 필터 결과 없음 상태를 처리한다.

## 3. 렌더링 경계

- 기본은 Server Component. `"use client"`는 상호작용이 필요한 말단 컴포넌트에만 둔다.
- Public의 Client Component는 3개다 (`(site)/error.tsx`는 Next 요구사항). Admin에는 상호작용이 필요한 폼·네비게이션·다이얼로그만 Client다 (`post-form`, `project-form`, `category-form`, `markdown-editor`, `form-status`, `submit-button`, `confirm-delete`, `admin-nav-links`, `admin-mobile-nav`, 보호 영역 `error.tsx`).
  - `components/layout/mobile-nav.tsx` — Radix Dialog 상태 (열림/닫힘).
  - `components/layout/nav-link.tsx` — `usePathname()`으로 `aria-current` 계산.
- 반응형은 CSS로 처리하고 viewport JS 감지는 쓰지 않는다. 헤더는 `md`(768px)에서 데스크톱 메뉴와 모바일 메뉴를 CSS(`hidden md:block` / `md:hidden`)로 전환한다.
- 캐싱 설정은 쓰지 않는다. `cacheComponents`, `partialPrefetching`은 제거했다 (D-013).

## 4. 레이아웃 구조

```text
app/layout.tsx            <html lang="ko">, Pretendard(next/font/local), <body> 기본 스타일, 기본 metadata
└─ app/(site)/layout.tsx  SiteShell: SkipLink → SiteHeader → <main id="main-content"> → SiteFooter
   (app/not-found.tsx도 SiteShell을 직접 사용)
   └─ app/(site)/page.tsx Hero → InFocus → SelectedWorks → ComponentGuide → BlogPreview → About → Career → Contact
```

- `<main>`은 `tabIndex={-1}`로 SkipLink의 이동 대상이 된다 (`outline-none`).
- Home 섹션은 `app/(site)/_components/`에 둔다 (Home 전용이라 라우트 가까이에 위치). 현재: `hero`, `in-focus`, `selected-works`, `component-guide`, `about`, `career`, `blog-preview`, `contact`, `section-header`.
- Admin은 `app/admin/`에 별도 레이아웃이다 (Public과 레이아웃 공유 안 함, primitive와 SkipLink만 공유).
  - `app/admin/layout.tsx`: `noindex` metadata만.
  - `app/admin/login/`: 보호 영역 밖.
  - `app/admin/(protected)/layout.tsx`: `requireAdmin()` 후 헤더·로그아웃. 각 페이지도 `requireAdmin()`을 다시 호출한다 (D-025).

## 5. 컴포넌트 구조

```text
components/
  ui/       badge, button, external-link, markdown-content, skeleton, error-state 외 폼·피드백 primitive   도메인 무관 primitive
  layout/   site-shell, site-header, site-footer, mobile-nav, nav-link, skip-link, profile-links, nav-items.ts
  features/ blog/ (category-filter, post-list-item, table-of-contents)
            projects/ (project-grid)
            career/ (career-timeline)
```

- **Button, Badge**: CVA로 variant × size를 정의한다. CVA는 이 두 곳에만 쓴다 (D-016).
- **Skeleton / SkeletonRegion**: 블록은 `aria-hidden`이고 펄스는 `motion-safe:animate-pulse`. 묶음을 `SkeletonRegion`(`role="status"` + sr-only 문구)으로 감싸 로딩을 한 번만 알린다. 사용처: Admin `loading.tsx`, `/blog/loading.tsx`. 공개 사이트의 다른 라우트는 정적 생성이라 loading 상태가 없고, 요청 시 렌더링되는 `/blog`만 해당한다.
- **ErrorState**: `variant="page"`(overline + h1, 공개 `error.tsx`) / `"inline"`(Admin). `role="alert"`, 일반 문구만. 재시도 버튼은 호출하는 `error.tsx`(Client)가 `action`으로 넘긴다.
- **Badge**: tinted 배경 대신 흰 surface + 상태 텍스트 토큰 + 점 (D-015).
- **ExternalLink**: `target="_blank"`, `rel="noopener noreferrer"`, `↗` 아이콘, sr-only "(새 창)". 외부 링크는 이 컴포넌트로만 만든다.
- **NavLink / NAV_ITEMS**: 데스크톱·모바일 메뉴가 같은 목록과 같은 링크 컴포넌트를 쓴다.
- **MobileNav**: Radix Dialog로 focus trap, Esc, 스크롤 잠금, 포커스 복귀를 처리한다. 직접 구현하지 않는다. Radix 1.3은 스크롤 잠금을 `Dialog.Overlay`가 담당하므로 전체 화면 Content여도 Overlay를 렌더링해야 한다 (D-017).
- 값이 없는 링크는 `Contact`와 `SiteFooter`가 렌더링하지 않는다. 값은 `content/profile.ts`에서 온다.

## 6. 스타일 구조

- 토큰은 `app/globals.css`에서 정의한다 (Tailwind v4, `tailwind.config` 없음). 값은 `docs/PORTFOLIO_DESIGN.md §2`.
  - `:root`에 CSS 변수 → `@theme inline`에서 `--color-*`, `--text-*`, `--radius-*`로 매핑 → Tailwind 유틸리티가 생성된다.
  - 타이포 크기는 `--fs-*` 변수로 두고 `@media (min-width: 1024px)`에서 Desktop 값으로 바꾼다. 그래서 `lg` 미만(태블릿 포함)은 Mobile 크기다.
- `container-page`: `@utility`로 정의한 페이지 컨테이너 (max 1280px, 좌우 패딩 20 / 32 / 40).
- `@layer base`: `word-break: keep-all`, 전역 `:focus-visible` outline(2px `--ring`, offset 2px), `prefers-reduced-motion` 대응.
- `cn()`은 `lib/utils/cn.ts` (`clsx` + `tailwind-merge`).
- Tailwind 처리는 `next.config.ts`의 `turbopack.rules`에서 `@tailwindcss/turbopack` 로더로 한다.

## 7. 설정과 도구

| 항목 | 상태 |
|---|---|
| TypeScript 6.0.3 strict | 적용 (D-006) |
| ESLint 9 + `eslint-config-next` | 설정됨 |
| Prettier + tailwind 플러그인 | 설정됨, `CLAUDE.md`·`docs/` 제외 (D-014) |
| 스크립트 | `dev`, `build`, `start`, `lint`, `typecheck`, `format`, `format:check` |
| 런타임 | Node >=24, pnpm 12.11.2 (`packageManager`) |
| DB | PostgreSQL(Neon). Prisma 7.10.0 (`prisma-client` generator, `@prisma/adapter-pg`). 생성된 클라이언트는 `lib/db/generated`(git 제외, `postinstall`에서 생성). 런타임은 pooled `DATABASE_URL`, migration·seed는 `DATABASE_URL_UNPOOLED` |
| 설치된 UI 의존성 | `@radix-ui/react-dialog`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-tabs`, `@radix-ui/react-slot`, `zod`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge` |

DB 스크립트: `pnpm db:migrate`(개발, migration 생성), `db:deploy`(적용만), `db:seed`, `db:studio`. 인증은 `next-auth` 5.0.0-beta.32 (D-025). Markdown 의존성(`gray-matter`, `unified` 계열, `shiki`, `vfile`, `server-only`)은 정확한 버전으로 고정해 설치했다. 

## 8. 배포

- Vercel 프로젝트: https://vercel.com/jeontaesus-projects/portfolio-v2
- Production: https://portfolio-v2-ashen-eight.vercel.app
- GitHub(`Jeontaesu/portfolio_v2`) 연동 자동 배포. `main` → Production, 그 외 브랜치·PR → Preview. 이유와 trade-off는 D-018.
- `vercel.json` 없음. 환경 변수 없음: 사이트 URL은 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`을 쓰고, 커스텀 도메인을 붙일 때만 `NEXT_PUBLIC_SITE_URL`을 설정한다. Preview는 noindex (D-021).

## 9. 변경 이력

구조가 바뀐 이유와 영향을 짧게 남긴다. 기술 선택의 이유는 `docs/DECISIONS.md`에 둔다.

- **2026-10-19 (3)**: Home에 `ComponentGuide` 섹션(Selected Works 다음)과 가이드 `Responsive` 페이지 추가. 섹션의 주제 링크 3개는 각각 가이드의 해당 페이지로 연결 (D-029).
- **2026-10-19 (2)**: 컴포넌트 가이드 `/guide` 추가 (`app/guide/`: 레이아웃, `_components/`의 GuideNav·GuidePage·Demo·PropsTable·CodeBlock·BreakpointBadge, 컴포넌트별 페이지). `ErrorState`에 `headingLevel` 추가. 새 페이지는 `app/guide/<slug>/page.tsx`와 `guide-nav-items.ts` 항목을 함께 추가한다 (D-029).
- **2026-10-19**: `Skeleton`·`SkeletonRegion`·`ErrorState` 추가, Admin/공개 `error.tsx`와 Admin `loading.tsx`를 이 컴포넌트로 교체, `/blog/loading.tsx` 신설. 의존성 추가 없음.
- **2026-10-15 (3)**: Admin CMS(사이드바 셸, Dashboard 집계, 글·프로젝트·카테고리 CRUD, Markdown Preview, 삭제 확인)와 Zod 검증 추가. `/admin/posts` 목록 제목 레벨을 h2로 정리 (D-026).
- **2026-10-15 (2)**: Auth.js v5 + GitHub 로그인, `requireAdmin()` 가드, `/admin/login`·보호된 Admin 레이아웃·Dashboard 자리 표시, robots에서 `/admin` 차단 (D-025).
- **2026-10-15**: Prisma schema·init migration, DB 클라이언트, seed, `lib/content/`의 DB 조회 전환, 카테고리 DB화 (D-024).
- **2026-10-14 (5)**: SEO(metadata·canonical·OG 이미지·sitemap·robots·JSON-LD), not-found, error 경계 추가. `SiteShell` 분리 (D-021).
- **2026-10-14 (4)**: 경력기술서 기반으로 `content/profile.ts`를 채우고 About·Career·Resume·Contact 라우트, Velog·Notion 링크를 추가했다 (D-020).
- **2026-10-14 (3)**: Markdown 파이프라인, `lib/content`, Blog·Projects 라우트 추가 (D-019).
- **2026-10-14 (2)**: Vercel 첫 배포 완료, GitHub 자동 배포 방식을 §8에 기록했다.
- **2026-10-14**: "코드 없음" 상태의 설계 문서를 실제 구현 기준으로 갱신. Home 골격, 공통 레이아웃(SkipLink / Header / MobileNav / Footer), 토큰, UI primitive 3종이 구현되어 있음을 반영하고, 미구현 영역(`lib/*`, 하위 라우트, SEO 파일)을 명시했다.
