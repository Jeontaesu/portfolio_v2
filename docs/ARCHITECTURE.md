# ARCHITECTURE.md

구현 구조 문서. 규칙·디렉터리 책임의 기준은 `CLAUDE.md §5`, 이 문서는 실제 구현이 생길 때마다 갱신한다.
현재 단계: Phase 2 진행 중 (Week 4: DB 연동). Public 사이트는 Phase 1로 배포 완료. 마지막 갱신: 2026-10-15.

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
| `/about`, `/career`, `/resume`, `/contact` | 구현됨 (`content/profile.ts` 데이터. Resume PDF와 Email은 값이 없어 숨김/안내 상태) |

SEO 파일: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`, `blog/[slug]`·`projects/[slug]`의 `opengraph-image.tsx`, `app/not-found.tsx`, `app/(site)/error.tsx`. 페이지 metadata는 `lib/seo/metadata.ts`의 `pageMetadata()`로 title·description·canonical·Open Graph를 함께 만든다 (D-021).

## 3. 렌더링 경계

- 기본은 Server Component. `"use client"`는 상호작용이 필요한 말단 컴포넌트에만 둔다.
- 현재 Client Component는 3개다 (`(site)/error.tsx`는 Next 요구사항).
  - `components/layout/mobile-nav.tsx` — Radix Dialog 상태 (열림/닫힘).
  - `components/layout/nav-link.tsx` — `usePathname()`으로 `aria-current` 계산.
- 반응형은 CSS로 처리하고 viewport JS 감지는 쓰지 않는다. 헤더는 `md`(768px)에서 데스크톱 메뉴와 모바일 메뉴를 CSS(`hidden md:block` / `md:hidden`)로 전환한다.
- 캐싱 설정은 쓰지 않는다. `cacheComponents`, `partialPrefetching`은 제거했다 (D-013).

## 4. 레이아웃 구조

```text
app/layout.tsx            <html lang="ko">, Pretendard(next/font/local), <body> 기본 스타일, 기본 metadata
└─ app/(site)/layout.tsx  SiteShell: SkipLink → SiteHeader → <main id="main-content"> → SiteFooter
   (app/not-found.tsx도 SiteShell을 직접 사용)
   └─ app/(site)/page.tsx Hero → SelectedWorks → About → Career → BlogPreview → Contact
```

- `<main>`은 `tabIndex={-1}`로 SkipLink의 이동 대상이 된다 (`outline-none`).
- Home 섹션은 `app/(site)/_components/`에 둔다 (Home 전용이라 라우트 가까이에 위치). 현재: `hero`, `selected-works`, `about`, `career`, `blog-preview`, `contact`, `section-header`.
- Admin은 Phase 2에서 `app/admin/`에 별도 레이아웃으로 추가한다 (Public과 레이아웃 공유 안 함).

## 5. 컴포넌트 구조

```text
components/
  ui/       badge, button, external-link, markdown-content   도메인 무관 primitive
  layout/   site-shell, site-header, site-footer, mobile-nav, nav-link, skip-link, profile-links, nav-items.ts
  features/ blog/ (category-filter, post-list-item, table-of-contents)
            projects/ (project-grid)
            career/ (career-timeline)
```

- **Button, Badge**: CVA로 variant × size를 정의한다. CVA는 이 두 곳에만 쓴다 (D-016).
- **Badge**: tinted 배경 대신 흰 surface + 상태 텍스트 토큰 + 점 (D-015).
- **ExternalLink**: `target="_blank"`, `rel="noopener noreferrer"`, `↗` 아이콘, sr-only "(새 창)". 외부 링크는 이 컴포넌트로만 만든다.
- **NavLink / NAV_ITEMS**: 데스크톱·모바일 메뉴가 같은 목록과 같은 링크 컴포넌트를 쓴다.
- **MobileNav**: Radix Dialog로 focus trap, Esc, 스크롤 잠금, 포커스 복귀를 처리한다. 직접 구현하지 않는다. Radix 1.3은 스크롤 잠금을 `Dialog.Overlay`가 담당하므로 전체 화면 Content여도 Overlay를 렌더링해야 한다 (D-017).
- 값이 없는 링크(Velog, Email)는 `Contact`와 `SiteFooter`가 렌더링하지 않는다. 값은 `content/profile.ts`에서 온다.

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
| 설치된 UI 의존성 | `@radix-ui/react-dialog`, `@radix-ui/react-slot`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge` |

DB 스크립트: `pnpm db:migrate`(개발, migration 생성), `db:deploy`(적용만), `db:seed`, `db:studio`. 인증 패키지(Auth.js)는 Week 5에 설치한다. Markdown 의존성(`gray-matter`, `unified` 계열, `shiki`, `vfile`, `server-only`)은 정확한 버전으로 고정해 설치했다. 

## 8. 배포

- Vercel 프로젝트: https://vercel.com/jeontaesus-projects/portfolio-v2
- Production: https://portfolio-v2-ashen-eight.vercel.app
- GitHub(`Jeontaesu/portfolio_v2`) 연동 자동 배포. `main` → Production, 그 외 브랜치·PR → Preview. 이유와 trade-off는 D-018.
- `vercel.json` 없음. 환경 변수 없음: 사이트 URL은 Vercel의 `VERCEL_PROJECT_PRODUCTION_URL`을 쓰고, 커스텀 도메인을 붙일 때만 `NEXT_PUBLIC_SITE_URL`을 설정한다. Preview는 noindex (D-021).

## 9. 변경 이력

구조가 바뀐 이유와 영향을 짧게 남긴다. 기술 선택의 이유는 `docs/DECISIONS.md`에 둔다.

- **2026-10-15**: Prisma schema·init migration, DB 클라이언트, seed, `lib/content/`의 DB 조회 전환, 카테고리 DB화 (D-024).
- **2026-10-14 (5)**: SEO(metadata·canonical·OG 이미지·sitemap·robots·JSON-LD), not-found, error 경계 추가. `SiteShell` 분리 (D-021).
- **2026-10-14 (4)**: 경력기술서 기반으로 `content/profile.ts`를 채우고 About·Career·Resume·Contact 라우트, Velog·Notion 링크를 추가했다 (D-020).
- **2026-10-14 (3)**: Markdown 파이프라인, `lib/content`, Blog·Projects 라우트 추가 (D-019).
- **2026-10-14 (2)**: Vercel 첫 배포 완료, GitHub 자동 배포 방식을 §8에 기록했다.
- **2026-10-14**: "코드 없음" 상태의 설계 문서를 실제 구현 기준으로 갱신. Home 골격, 공통 레이아웃(SkipLink / Header / MobileNav / Footer), 토큰, UI primitive 3종이 구현되어 있음을 반영하고, 미구현 영역(`lib/*`, 하위 라우트, SEO 파일)을 명시했다.
