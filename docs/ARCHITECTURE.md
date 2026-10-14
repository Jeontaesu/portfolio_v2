# ARCHITECTURE.md

구현 구조 문서. 규칙·디렉터리 책임의 기준은 `CLAUDE.md §5`, 이 문서는 실제 구현이 생길 때마다 갱신한다.
현재 단계: Phase 1 (DB·인증·Admin 없음). 마지막 갱신: 2026-10-14 (Home 골격 + 공통 레이아웃 구현 시점).

각 항목은 **구현됨** / **설계만 있음**으로 구분한다.

## 1. 데이터 흐름 (Phase 1)

```text
content/*.md, content/*.ts
        │  (빌드 시 읽기)
lib/content/  ← 페이지는 이 함수로만 콘텐츠를 읽는다 (server-only)      [posts·projects 구현됨]
        │
lib/markdown/ ← Markdown → sanitize된 HTML, 목차 추출                    [구현됨]
        │
app/(site)/   ← Server Component 기본, 정적 생성                         [Home, Blog, Projects 구현]
```

- 콘텐츠 필드 이름은 `CLAUDE.md §7`의 모델과 동일하게 쓴다.
- `status: DRAFT`는 빌드에서 제외한다.
- 이후 단계에서 DB로 옮길 때는 `lib/content/` 내부만 바꾸고 페이지 코드는 유지한다.

**현재 실제 상태**: `lib/content/`는 `posts.ts`, `projects.ts`, `types.ts`가 있고, `lib/markdown/`은 `render.ts`(파이프라인)와 `toc.ts`가 있다. `lib/seo/`는 비어 있다. `content/posts/`, `content/projects/`에는 아직 실제 글이 없고 `content/projects.ts`는 빈 배열이다. About/Career/Resume/Contact/Footer는 `content/profile.ts`를 직접 import한다 (경력은 `career`, 링크·기술은 `profile`). 콘텐츠가 이 한 파일이라 `lib/content/`로 감싸는 것은 CMS화 시점으로 미룬다.

파이프라인 순서와 이유는 D-019. `status: DRAFT`는 `lib/content`에서 걸러져 어떤 페이지에도 노출되지 않는다.

## 2. 라우트 구현 현황

| 라우트 | 상태 |
|---|---|
| `/` | 구현됨 (Selected Works·Blog Preview는 실제 데이터 연결, About·Career는 골격) |
| `/blog` (`?category=`), `/blog/[slug]` | 구현됨 (콘텐츠 없음: empty state) |
| `/projects`, `/projects/[slug]` | 구현됨 (콘텐츠 없음: empty state) |
| `/about`, `/career`, `/resume`, `/contact` | 구현됨 (`content/profile.ts` 데이터. Resume PDF와 Email은 값이 없어 숨김/안내 상태) |

헤더 네비게이션(`components/layout/nav-items.ts`)은 `/projects`, `/blog`, `/about`, `/career`, `/contact`를 가리키지만 해당 페이지가 아직 없어 현재는 404가 된다. `not-found.tsx`, `sitemap.ts`, `robots.ts`도 아직 없다.

## 3. 렌더링 경계

- 기본은 Server Component. `"use client"`는 상호작용이 필요한 말단 컴포넌트에만 둔다.
- 현재 Client Component는 2개뿐이다.
  - `components/layout/mobile-nav.tsx` — Radix Dialog 상태 (열림/닫힘).
  - `components/layout/nav-link.tsx` — `usePathname()`으로 `aria-current` 계산.
- 반응형은 CSS로 처리하고 viewport JS 감지는 쓰지 않는다. 헤더는 `md`(768px)에서 데스크톱 메뉴와 모바일 메뉴를 CSS(`hidden md:block` / `md:hidden`)로 전환한다.
- 캐싱 설정은 쓰지 않는다. `cacheComponents`, `partialPrefetching`은 제거했다 (D-013).

## 4. 레이아웃 구조

```text
app/layout.tsx            <html lang="ko">, Pretendard(next/font/local), <body> 기본 스타일, 기본 metadata
└─ app/(site)/layout.tsx  SkipLink → SiteHeader → <main id="main-content"> → SiteFooter
   └─ app/(site)/page.tsx Hero → SelectedWorks → About → Career → BlogPreview → Contact
```

- `<main>`은 `tabIndex={-1}`로 SkipLink의 이동 대상이 된다 (`outline-none`).
- Home 섹션은 `app/(site)/_components/`에 둔다 (Home 전용이라 라우트 가까이에 위치). 현재: `hero`, `selected-works`, `about`, `career`, `blog-preview`, `contact`, `section-header`.
- Admin은 Phase 2에서 `app/admin/`에 별도 레이아웃으로 추가한다 (Public과 레이아웃 공유 안 함).

## 5. 컴포넌트 구조

```text
components/
  ui/       badge, button, external-link, markdown-content   도메인 무관 primitive
  layout/   site-header, site-footer, mobile-nav, nav-link, skip-link, profile-links, nav-items.ts
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
| 설치된 UI 의존성 | `@radix-ui/react-dialog`, `@radix-ui/react-slot`, `class-variance-authority`, `lucide-react`, `clsx`, `tailwind-merge` |

Markdown 의존성(`gray-matter`, `unified` 계열, `shiki`, `vfile`, `server-only`)은 정확한 버전으로 고정해 설치했다. DB·인증 관련 패키지는 Phase 2 전까지 설치하지 않는다.

## 8. 배포

- Vercel 프로젝트: https://vercel.com/jeontaesus-projects/portfolio-v2
- Production: https://portfolio-v2-ashen-eight.vercel.app
- GitHub(`Jeontaesu/portfolio_v2`) 연동 자동 배포. `main` → Production, 그 외 브랜치·PR → Preview. 이유와 trade-off는 D-018.
- `vercel.json` 없음. 환경 변수 없음 (`NEXT_PUBLIC_SITE_URL`은 Week 3 SEO 작업 시 추가).

## 9. 변경 이력

구조가 바뀐 이유와 영향을 짧게 남긴다. 기술 선택의 이유는 `docs/DECISIONS.md`에 둔다.

- **2026-10-14 (4)**: 경력기술서 기반으로 `content/profile.ts`를 채우고 About·Career·Resume·Contact 라우트, Velog·Notion 링크를 추가했다 (D-020).
- **2026-10-14 (3)**: Markdown 파이프라인, `lib/content`, Blog·Projects 라우트 추가 (D-019).
- **2026-10-14 (2)**: Vercel 첫 배포 완료, GitHub 자동 배포 방식을 §8에 기록했다.
- **2026-10-14**: "코드 없음" 상태의 설계 문서를 실제 구현 기준으로 갱신. Home 골격, 공통 레이아웃(SkipLink / Header / MobileNav / Footer), 토큰, UI primitive 3종이 구현되어 있음을 반영하고, 미구현 영역(`lib/*`, 하위 라우트, SEO 파일)을 명시했다.
