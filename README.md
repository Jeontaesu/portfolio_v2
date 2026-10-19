# MEFLOWEB

웹 퍼블리셔로 11년간 일해 온 사람이 React · TypeScript · Next.js로 프론트엔드 개발까지 영역을 넓히고 있음을 **코드와 실제 서비스로 보여주기 위한** 포트폴리오 겸 기술 블로그입니다.

- **사이트**: https://portfolio-v2-ashen-eight.vercel.app
- **현재 단계**: Public 사이트(Phase 1)와 Phase 2(PostgreSQL, 관리자 로그인, Admin CMS)까지 배포 완료. 지금은 접근성·성능·보안 점검과 문서 정리 단계입니다.

## 주요 기능

- **Home**: Hero → In Focus → Selected Works → Blog Preview → About(+Toolkit) → Career → Contact (2단 헤더, 확장 푸터)
- **Projects**: Case Study 목록과 상세(Overview → Context → Role → Action → Result), 이전/다음 프로젝트 이동
- **Blog**: Markdown 글, 카테고리 필터(`?category=`), 목차, 코드 하이라이트
- **About · Career · Resume · Contact**: 경력 데이터 한 곳(`content/profile.ts`)에서 렌더링
- **SEO**: 페이지별 metadata·canonical·Open Graph, 빌드 시 생성하는 OG 이미지, sitemap, robots, JSON-LD
- **Admin**: GitHub 로그인(Auth.js), DB의 ADMIN 허용 목록 확인, `noindex`인 보호 영역. Dashboard(실집계), 글·프로젝트·카테고리 CRUD, Draft/Publish, Markdown Write/Preview, 프로젝트 정렬.
- **컴포넌트 가이드** (`/guide`): Colors · Typography · Responsive와 Button · Form controls · Badge · Pagination · EmptyState · ErrorState · Skeleton · ConfirmDelete 등 UI 컴포넌트를 상태별 데모, Props 표, 사용 코드로 보여 줍니다. Storybook 대신 같은 토큰·같은 빌드의 일반 페이지로 만들었고, 검색에는 노출하지 않습니다(`noindex`).
- **로딩·오류 상태**: `Skeleton`(`/blog`와 Admin 로딩 화면)과 `ErrorState`(공개·Admin 오류 화면)로 loading / empty / error 상태를 공통 컴포넌트로 처리합니다. 오류 원문은 화면에 보이지 않습니다.
- **모션**: 대부분의 hover·전환은 CSS이고, `motion`은 메뉴 닫힘(exit) 애니메이션과 스크롤 reveal에만 씁니다. `prefers-reduced-motion`을 존중하고, 첫 화면 콘텐츠(LCP)에는 reveal을 쓰지 않습니다.
- **접근성**: Skip link, 키보드로 쓸 수 있는 모바일 메뉴(Radix Dialog), `focus-visible` 스타일, 44px 터치 영역, WCAG 2.1 AA 대비를 맞춘 색상 토큰

## 기술 스택

| 영역      | 사용                                                                      |
| --------- | ------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript 6 (strict)                  |
| Styling   | Tailwind CSS v4 (`@theme` 디자인 토큰), `clsx` + `tailwind-merge`, CVA    |
| UI        | Radix UI primitives, lucide-react                                         |
| Content   | PostgreSQL(Neon) + Prisma, Markdown 렌더링(`unified` 파이프라인, `shiki`) |
| Auth      | Auth.js v5 + GitHub OAuth (허용 목록은 DB의 `User.role = ADMIN`)          |
| Font      | Pretendard (`next/font/local`)                                            |
| Motion    | CSS 우선, 메뉴 exit·스크롤 reveal은 `motion` (`LazyMotion` + `m.*`)       |
| Tooling   | ESLint, Prettier, pnpm                                                    |
| Deploy    | Vercel (GitHub 연동 자동 배포)                                            |

## 구조

```text
app/
  (site)/            Public 라우트. Home 섹션은 _components/
  admin/             Admin CMS (로그인 / 보호 영역)
  guide/             컴포넌트 가이드 (별도 레이아웃, noindex)
  sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx
components/
  ui/                도메인 무관 primitive (Button, Badge, Input, FormField, Skeleton, ErrorState, EmptyState ...)
  layout/            SiteShell, Header, Footer, MobileNav, SkipLink
  features/          blog/, projects/, career/
content/
  posts/*.md         블로그 글 (seed 원본)
  projects.ts        Case Study 메타데이터 (seed 원본)
  projects/*.md      Case Study 본문 (seed 원본)
  profile.ts         About · Career · Skills · 링크 (DB 대상 아님)
lib/
  content/           DB에서 콘텐츠 읽기 (server-only). 페이지는 이 함수로만 데이터를 읽는다
  db/                Prisma 클라이언트
  auth/              Auth.js 설정, 관리자 확인, requireAdmin()
  markdown/          Markdown → sanitize된 HTML, 목차 추출
  seo/               사이트 URL, metadata 헬퍼, OG 이미지
prisma/              schema, migrations, seed
docs/                설계 · 결정 기록
```

## 설계에서 신경 쓴 점

- **Server Component 기본**: 클라이언트 컴포넌트는 메뉴(모바일 메뉴·Admin 드로어·현재 메뉴 표시), 폼·에디터, 모션 래퍼(`Reveal`, `MotionProvider`), 오류 경계로 한정합니다. 페이지 전체를 클라이언트로 만들지 않고, 반응형은 JS 없이 CSS로 처리합니다.
- **콘텐츠 경계**: 페이지는 `lib/content/`의 함수(`getPosts`, `getProject` 등)로만 데이터를 읽습니다. 처음엔 파일에서 읽다가 Phase 2에서 이 함수 내부만 DB 조회로 바꿨고, 페이지 코드는 거의 그대로 유지했습니다. 기존 파일은 `prisma/seed.ts`가 DB로 옮기는 원본으로 남아 있습니다.
- **관리자 권한은 요청마다 DB로 확인**: 세션(JWT)은 힌트일 뿐이라, 보호된 페이지와 Server Action은 `requireAdmin()`으로 DB의 ADMIN 여부를 다시 확인합니다. 관리자를 제거하면 바로 접근이 막힙니다.
- **Markdown 보안**: Markdown 안의 raw HTML은 버리고, `rehype-sanitize`를 거친 결과만 렌더링합니다. 플러그인 순서가 바뀌어 목차 링크가 깨지면 빌드가 실패하도록 검증을 넣었습니다.
- **DRAFT 차단**: `status: DRAFT`인 글은 콘텐츠 계층에서 걸러 어떤 페이지와 sitemap에도 나오지 않습니다.
- **Preview 배포 noindex**: Vercel Preview URL은 검색 엔진이 수집하지 않도록 막습니다.

결정마다의 이유와 trade-off는 [`docs/DECISIONS.md`](docs/DECISIONS.md), 구현 구조는 [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)에 정리했습니다.

## 로컬 실행

필요: Node 24 이상(`.nvmrc`), pnpm 12.11.2(`packageManager` 필드), Neon PostgreSQL

```bash
pnpm install        # postinstall에서 Prisma 클라이언트 생성 (pnpm build도 먼저 생성)
cp .env.example .env.local   # 값 채우기 (아래)
pnpm dev            # http://localhost:3000
```

### 환경 변수 (`.env.local`)

| 변수                                   | 설명                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| `DATABASE_URL`                         | Neon pooled 연결 문자열. 앱 런타임이 사용                                              |
| `DATABASE_URL_UNPOOLED`                | Neon direct 연결 문자열. migration·seed가 사용                                         |
| `ADMIN_EMAIL`                          | seed가 ADMIN으로 만드는 계정의 이메일 (GitHub 계정 이메일과 동일)                      |
| `AUTH_SECRET`                          | `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`          |
| `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` | 로컬 전용 GitHub OAuth App (callback `http://localhost:3000/api/auth/callback/github`) |
| `NEXT_PUBLIC_SITE_URL`                 | 선택. 커스텀 도메인을 붙일 때만                                                        |

로컬에서는 운영 DB 대신 **Neon의 별도 branch**를 연결하세요. migration과 seed가 운영 데이터를 건드리지 않습니다. 비어 있는 DB라면 `pnpm db:deploy` → `pnpm db:seed`를 실행합니다. seed는 다시 실행해도 이미 있는 행을 덮어쓰지 않습니다.

Windows에서 Node를 직접 설치했다면 nvm-windows의 전환이 막힐 수 있고, corepack 0.36은 pnpm 12 실행 파일을 찾지 못했습니다. 이 환경에서는 `npm install -g pnpm@12.11.2`로 설치했습니다.

| 명령어            | 설명                                                             |
| ----------------- | ---------------------------------------------------------------- |
| `pnpm dev`        | 개발 서버                                                        |
| `pnpm build`      | Prisma 클라이언트 생성 후 프로덕션 빌드 (OG 이미지·sitemap 포함) |
| `pnpm start`      | 빌드 결과 실행                                                   |
| `pnpm lint`       | ESLint                                                           |
| `pnpm typecheck`  | `next typegen && tsc --noEmit`                                   |
| `pnpm format`     | Prettier                                                         |
| `pnpm db:migrate` | 개발용 migration 생성·적용                                       |
| `pnpm db:deploy`  | migration 적용만                                                 |
| `pnpm db:seed`    | `content/`의 파일을 DB로 이전                                    |
| `pnpm db:studio`  | Prisma Studio                                                    |

## 콘텐츠 추가

글과 프로젝트는 DB에서 읽습니다. `/admin`에서 작성하는 것이 기본이고, 아래 파일 방식은 처음 DB를 채우는 seed용입니다. seed는 같은 slug의 기존 행을 덮어쓰지 않습니다.

**블로그 글**: `content/posts/<slug>.md`

```markdown
---
title: 글 제목
slug: my-post # 영문 소문자 kebab-case
category: frontend # frontend | css | web | study
excerpt: 목록과 검색 결과에 보일 요약
publishedAt: 2026-10-14
status: DRAFT # 공개하려면 PUBLISHED
---
```

frontmatter가 잘못되면 seed가 어떤 파일의 어떤 필드인지 알려 주며 실패합니다.

**Case Study**: `content/projects.ts`에 메타데이터를 추가하고, 본문은 `content/projects/<slug>.md`에 씁니다.

## 로드맵

- [x] Phase 1: Public 사이트 배포 (Home, Projects, Blog, About, Career, Resume, Contact, SEO)
- [x] Phase 2: PostgreSQL + Prisma, 파일 → DB 이전, Auth.js 관리자 로그인, Admin CMS(CRUD, Draft/Publish)
- [ ] 이후: 태그, 검색, 이미지 업로드, 댓글, 조회수
