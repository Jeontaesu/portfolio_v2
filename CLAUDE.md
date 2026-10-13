# CLAUDE.md — Personal Portfolio Platform

브랜드명: **MEFLOWEB**. 방문자용 포트폴리오 + 기술 블로그 + 관리자 CMS를 통합한 서비스형 웹 앱.
목적: 웹 퍼블리셔가 React / TypeScript / Next.js 기반 프론트엔드 개발자로 확장했음을 **코드와 실제 서비스로 증명**한다.
우선순위: 기능의 양 < 구조, 화려함 < 완성도, 복잡함 < 명확함.

**현재 단계: Phase 1 — 3주 안에 Public 사이트 배포** (DB·인증·Admin 없음). 범위는 §8.

관련 문서:
- 디자인 기준 → `docs/PORTFOLIO_DESIGN.md` (UI 작업 시 반드시 읽음)
- 일정·이직 전략 → `docs/ROADMAP.md` (코드 작업 시 읽지 않아도 됨)
- 기술 결정 기록 → `docs/DECISIONS.md` / 구현 구조 → `docs/ARCHITECTURE.md`

> `[TBD]` 표시는 아직 확정되지 않은 결정이다. 해당 작업에 착수할 때 사용자에게 확인하고, 확정되면 이 파일을 갱신한다.

---

## 1. 핵심 규칙 (자주 틀리는 것)

**NEVER**
- 사용자 승인 없이 기술 스택·DB 스키마 방향·인증 방식·URL·디자인 토큰을 크게 바꾸지 않는다.
- 페이지 전체를 Client Component로 만들지 않는다.
- 서버 데이터를 Zustand에 넣거나, 모든 fetch에 TanStack Query를 쓰지 않는다.
- UI 컴포넌트에서 Prisma를 직접 호출하지 않는다.
- 버튼/메뉴 숨김만으로 권한을 처리하지 않는다.
- `any`, `as any`로 타입 오류를 숨기지 않는다.
- 클릭 요소를 `div`로 만들지 않는다.
- Radix가 제공하는 focus·keyboard·ARIA 동작을 직접 재구현하지 않는다.
- 근거 없는 성과 수치, 가짜 Dashboard 숫자, 경험하지 않은 문제 해결 사례를 만들지 않는다.
- 실행하지 않은 검사를 통과했다고 보고하지 않는다.
- Phase 1에서 Phase 2 기능(DB, 인증, Admin)을 미리 만들거나 의존성을 설치하지 않는다.

**MUST**
- 작업 전 기존 컴포넌트·유틸·validation·Server Action·모델을 검색하고 재사용한다.
- 모든 mutation은 서버에서 입력 검증 + 권한 확인을 한다.
- 접근성·반응형·보안을 구현 단계에서 함께 처리한다 (후반으로 미루지 않음).
- 데이터 UI는 loading / empty / error / success 상태를 처리한다.
- 코드 작성 시 선택 이유와 trade-off를 사용자가 면접에서 설명할 수 있게 짧게 설명한다.

**PREFER**
- Server Component 기본, `"use client"` 경계는 최소화.
- 내부 mutation은 Server Actions, 외부 연동·Webhook·공개 API만 Route Handlers.
- Tailwind 유틸리티 + 디자인 토큰. 별도 CSS는 변수·keyframes·prose·외부 라이브러리 스타일에만.
- 요구사항을 충족하는 가장 작은 변경. 무관한 리팩터링 금지.

---

## 2. 기술 스택

| 영역 | 선택 |
|---|---|
| Framework | Next.js App Router, React, TypeScript (strict) |
| Styling | Tailwind CSS, CSS Variables, `cn()` (`clsx` + `tailwind-merge`), 필요할 때만 CVA |
| UI 기반 | Radix UI primitives, shadcn/ui 방식의 source-based composition (디자인은 자체 토큰으로) |
| State | Server data → URL search params → `useState`/`useReducer` → Server Actions → TanStack Query(필요 시) → Zustand(필요 시) |
| Server | Server Components (Phase 1), Server Actions·Route Handlers (Phase 2). 별도 Node 서버 없음 |
| Content (Phase 1) | `content/`의 TS 데이터 + Markdown 파일(frontmatter). 빌드 시 정적 생성 |
| Markdown | `gray-matter`(frontmatter) + `unified` 파이프라인(`remark-parse` → `remark-gfm` → `remark-rehype` → `rehype-slug` → `rehype-sanitize` → `rehype-stringify`) + `shiki` 4.5.0(`@shikijs/rehype`, 빌드 시 정적 하이라이트). 목차는 heading AST에서 `lib/markdown/`의 자체 함수로 추출. sanitize 허용 목록은 shiki 출력(class, style)과 코드 블록 `tabindex`가 잘리지 않게 맞춘다. 패키지 버전은 설치 시점에 확인해 고정 |
| DB / Auth (Phase 2) | PostgreSQL, Prisma, Auth.js |
| Validation (Phase 2) | `[TBD]` 권장: Zod (폼·Server Action 공용 스키마) |
| 이미지 저장 | P0: URL 또는 `public/` 정적 경로. 업로드(P1)는 외부 스토리지 필요 (Vercel 파일시스템은 영구 저장 안 됨) |
| Font | Pretendard, `next/font/local` |
| Deploy | Vercel + PostgreSQL 호스팅 `[TBD]` |
| Tooling | ESLint, Prettier, Git/GitHub. Storybook은 MVP 이후 판단 |

**버전 (2026-10-13 npm registry / nodejs.org 확인, 근거는 `docs/DECISIONS.md`)**

| 항목 | 확정 |
|---|---|
| Node | 24 LTS (v24.21.0 기준, `.nvmrc` + `engines`, Vercel도 24) |
| 패키지 매니저 | pnpm 12.11.2 (`packageManager` 필드로 고정, corepack) |
| Next.js | 16.4.0 (App Router) |
| React | 19.3.0 |
| Tailwind CSS | v4.3.3 — 토큰은 `globals.css`의 `@theme`에서 정의, `tailwind.config` 없음 |
| TypeScript | **6.0.3** (7.0.2는 typescript-eslint 8.71.1 미지원으로 ESLint 실행 불가, D-006). strict + `noUncheckedIndexedAccess` |
| 아이콘 | `lucide-react` 1.55.0 하나로 통일 |
| 프로젝트 구조 | `src/` 사용 안 함 — 루트에 `app/`, `components/`, `content/`, `lib/` |
| 저장소 | `portfolio/`를 독립 Git 저장소로 분리 (KOSMCO 프로젝트와 분리, 아래 참고) |

- 저장소 분리 전에는 GitHub 공개·Vercel 연결을 하지 않는다. 기존 KOSMCO 프로젝트는 참고용이며 수정·복사하지 않는다.
- Auth.js 버전은 Phase 2 착수 시 확정한다.
새 라이브러리 제안 시: 필요성 → 현재 스택으로 안 되는 이유 → 복잡도·유지보수 비용 순으로 설명한다.

---

## 3. 명령어

pnpm 기준. Phase 1 스크립트는 `package.json`과 일치하며, Phase 2 줄은 아직 목표다.

```bash
pnpm dev                 # 개발 서버
pnpm build               # 프로덕션 빌드
pnpm lint                # ESLint
pnpm typecheck           # next typegen && tsc --noEmit
pnpm format              # Prettier
# Phase 2
pnpm prisma migrate dev  # 스키마 변경 → migration
pnpm prisma db seed      # 시드 데이터
```

---

## 4. 라우트

```text
Public — Phase 1 (app/(site)/)  Admin — Phase 2 (app/admin/)
/                               /admin/login
/about                          /admin/dashboard
/career                         /admin/posts, /new, /[id]
/projects, /projects/[slug]     /admin/projects, /new, /[id]
/blog, /blog/[slug]             /admin/categories
/resume                         /admin/comments   ─┐
/contact                        /admin/media       ├ Phase 2 이후
                                /admin/settings   ─┘
```

- Home 흐름: `Hero → Selected Works → About → Career → Blog Preview → Contact → Footer` (Skills는 About 안에 포함)
- Phase 1의 `/resume`은 PDF 다운로드 링크 + 요약, `/contact`는 이메일·GitHub 링크만 (폼 없음).
- Public과 Admin은 레이아웃을 공유하지 않는다. primitive(Button, Input, Dialog 등)만 공유.
- MVP 이후 라우트는 사이드바에서 숨기거나 disabled로 표시한다.
- Admin은 `noindex`, Public만 SEO 대상.

---

## 5. 디렉터리와 책임

```text
app/
  (site)/              Public 라우트, Home 섹션은 _components/
  admin/               (Phase 2) login/ 은 밖에, 보호 영역은 (protected)/
  layout.tsx, globals.css(토큰), not-found.tsx, sitemap.ts, robots.ts
components/
  ui/                  도메인 무관 primitive (Button, Badge, Dialog, ...)
  layout/              SiteHeader, SiteFooter, MobileNav, SkipLink
  features/            projects/, blog/ (Phase 2: dashboard/)
content/
  posts/*.md           블로그 글 (frontmatter: title, slug, category, excerpt, publishedAt, status)
  projects/*.md        Case Study 본문
  projects.ts          프로젝트 메타 (featured, sortOrder, role, period, techStack)
  profile.ts           About, Career, Skills, 링크
lib/
  content/             content/ 읽기·파싱 함수 (getPosts, getProject...) — server-only
  markdown/            Markdown → HTML, 목차 추출
  seo/                 metadata 헬퍼
  utils/cn.ts
  db/, auth/, validations/   (Phase 2)
prisma/                (Phase 2)
public/
  fonts/, images/projects/, resume.pdf
docs/
```

- 페이지는 `lib/content/` 함수로만 콘텐츠를 읽는다. Phase 2에서 이 함수 내부만 DB 조회로 바꾸면 페이지 코드는 유지된다.
- 라우트 전용 컴포넌트는 그 라우트 가까이에 둔다. 2곳 이상에서 실제로 쓰일 때 `components/`로 올린다.
- 다른 컴포넌트의 class를 복사하지 말고 컴포넌트 자체를 재사용한다.
- 구조의 큰 변경은 이유와 영향을 먼저 제시한다.

---

## 6. 코딩 규칙

### 컴포넌트 / TypeScript
- Props는 의미 있는 variant API로 설계한다: `<Button variant="primary" size="lg" />`. boolean prop 남발 금지.
- Compound pattern(Root/Trigger/Content)은 하위 요소가 상태를 공유할 때만. 단순 Button·Badge에는 쓰지 않는다.
- `asChild` 사용 시 자식이 props와 ref를 전달받는지 확인한다.
- 유연한 children은 `ReactNode`.

### 렌더링
- `loading.tsx`, `error.tsx`, `not-found.tsx`, Metadata를 라우트 특성에 맞게 둔다.
- 캐싱·revalidation은 의도적으로 결정하고, 게시/수정 Server Action 이후 관련 경로를 revalidate한다.
- `generateStaticParams`는 렌더링 전략에 맞을 때만.
- viewport JS 감지는 피한다 (hydration mismatch). 반응형은 CSS로.

### 스타일
- Mobile-first. 기준 폭 390px / Desktop 컨테이너·breakpoint는 디자인 문서 기준.
- 내부 여백 `padding`, 자식 간격 `gap`, 예외적 외부 간격만 `margin`.
- 토큰 외 색상을 새로 만들지 않는다. 상태 텍스트는 `*-text` 토큰을 쓴다 (대비 기준).
- 애니메이션은 CSS 우선, `prefers-reduced-motion` 대응. 애니메이션 라이브러리 추가 금지(복잡한 인터랙션 제외).
- 아이콘은 `lucide-react` 하나로 통일. 개별 import만 사용한다. 장식 아이콘은 `aria-hidden`, 의미 있으면 라벨 제공.
- shadcn/ui 소스를 가져올 때 색상 토큰 이름을 매핑한다: 이 프로젝트의 `--secondary`는 **보조 텍스트 색**이며 shadcn의 secondary(배경색)와 의미가 다르다. 가져온 코드의 `bg-secondary`·`text-secondary-foreground` 등을 그대로 쓰지 말고 `docs/PORTFOLIO_DESIGN.md` 토큰에 맞게 고친다.
- 타이포 Mobile 값은 `lg` 미만에 적용되므로 태블릿(768–1023px)은 레이아웃은 8열, 글자 크기는 Mobile 값이다 (의도된 동작).
- Input 등 식별이 필요한 경계선 색은 해당 컴포넌트 작업 시 확정한다 (`--border`는 대비 1.24라 장식용). `[TBD]`

### 접근성 (Public·Admin 동일 기준)
- Semantic HTML (`header`, `nav`, `main`, `article`, `section`, 목록 요소).
- `focus-visible` 스타일 유지, skip link 제공, 키보드 동작(Tab/Enter/Space/Esc/방향키).
- ARIA는 semantic HTML로 부족할 때만.
- 이미지: 의미 있으면 설명적 `alt`, 장식이면 `alt=""`.
- 스크린 리더 전용 텍스트는 `sr-only` (display:none 금지).
- 폼: label 연결, `aria-describedby`로 오류 연결, disabled/submitting/success 상태.

### 보안
- 비밀 값은 환경 변수. `.env*`는 commit 금지 (`.env.example`만 commit).
- Markdown → HTML 렌더링 결과는 sanitize. `dangerouslySetInnerHTML`은 sanitize된 콘텐츠에만.
- 사용자에게는 일반 오류 메시지, 원본 DB 오류·stack trace는 서버 로그에만.
- 권한 검사는 Admin 페이지 + 모든 Server Action + Route Handler + 보호된 조회에서 각각 수행.

### SEO / 성능
- Public 페이지: title, description, Open Graph, canonical, sitemap, robots.txt, 관련 시 JSON-LD.
- `next/image` 사용, 필요한 필드만 select, 불필요한 클라이언트 JS·의존성 제거.

---

## 7. 데이터 모델 (초안)

**Phase 1**: DB 없음. 아래 필드 이름을 `content/`의 TS 타입과 frontmatter에 그대로 사용해 Phase 2 이전 비용을 줄인다. `status: DRAFT` 글은 빌드에서 제외한다.

**Phase 2**: 최종 schema는 관계·필수 여부·인덱스·삭제 정책 검토 후 확정한다. 필요가 확인되기 전까지 테이블을 늘리지 않는다.

```text
User      id, email(unique), name, role(ADMIN | VIEWER), createdAt
Post      id, title, slug(unique), excerpt, content(markdown), thumbnail?,
          status(DRAFT | PUBLISHED), publishedAt?, authorId → User,
          categoryId? → Category, createdAt, updatedAt
Category  id, name(unique), slug(unique)
Project   id, title, slug(unique), summary, content(markdown), thumbnail?,
          techStack(string[]), role, startedAt, endedAt?, githubUrl?, demoUrl?,
          featured(bool), sortOrder(int), status(DRAFT | PUBLISHED),
          createdAt, updatedAt
Comment   (P1) id, postId → Post, author, content, createdAt
```

- slug: 영문 소문자 kebab-case, unique. 공개 URL에 사용.
- Category 삭제 시 게시글은 `categoryId = null` (SetNull). `[TBD]` 확정 필요.
- 공개 페이지는 `status = PUBLISHED`만 조회. 정렬: Post `publishedAt desc`, Project `sortOrder asc`.
- Home Selected Works = `featured = true` 프로젝트.
- About / Career / Resume 콘텐츠 출처: P0는 `content/profile.ts`의 정적 데이터 (§5 구조와 동일), CMS화는 이후. 값이 없는 항목(링크 등)은 렌더링하지 않는다.
- 이후 후보: Tag, PostTag(P1), Media, View, Like(P2).

---

## 8. 범위

| 단계 | 범위 |
|---|---|
| **Phase 1** (3주, 배포) | Home, About, Career, Projects 목록·상세(Case Study 3–4개), Blog 목록·상세(Markdown 파일, Category 필터), Resume(PDF), Contact(링크), 반응형·접근성, SEO(metadata, OG, sitemap, robots), Vercel 배포 |
| **Phase 2** (지원과 병행) | PostgreSQL+Prisma, Auth.js, Admin(Dashboard 실데이터, Post·Project·Category CRUD, Draft/Publish), 콘텐츠를 파일에서 DB로 이전 |
| **이후** | 태그, 검색, 이미지 업로드, Editor/Preview 고도화, 댓글, 조회수, Storybook, CI/CD |

- 다음 단계 기능은 현재 단계가 배포되기 전에 시작하지 않는다.
- Phase 1에서 시간이 부족하면 줄이는 순서 (`docs/ROADMAP.md`와 동일): Career 별도 페이지(Home Career 섹션으로 대체) → Blog Category 필터(목록만) → Case Study 4→3개 → Figma Home(토큰만). 접근성·반응형·SEO·배포는 줄이지 않는다.
- 일정은 `docs/ROADMAP.md`.

---

## 9. 콘텐츠 작성 규칙

- 아직 구현·숙련하지 않은 기술을 숙련한 것처럼 쓰지 않는다. "학습 중", "적용 중" 등 사실대로.
- 회사 프로젝트는 공개 가능한 범위(개요, 역할, 기술, 문제·해결·결과)만. 소스코드·내부 자료 금지.
- 기간·역할·기여도·수치는 근거가 있는 것만. 정량 데이터가 없으면 확인 가능한 정성적 결과.
- Case Study 구조: `Overview → Context → Role → Action → Result → Lessons Learned` (경력 설명은 상황→행동→결과 우선)
- 블로그 글 구조: `문제 → 원인 → 해결 → 선택 근거/trade-off → 결과`

---

## 10. 작업 절차

**작업 전**
1. 이 파일에서 관련 규칙 확인. UI 작업이면 `docs/PORTFOLIO_DESIGN.md` 확인.
2. 실제 폴더 구조와 기존 코드 확인, 재사용 대상 검색.
3. 가장 작은 안전한 변경 범위 결정. `[TBD]` 항목에 걸리면 먼저 질문.

**작업 후 (Definition of Done — 해당 항목만)**
- [ ] 기능 동작 + edge case 처리
- [ ] loading / empty / error / success 상태
- [ ] `typecheck`, `lint` 통과 (도구 미설정 시 설정하거나 "미실행"으로 보고)
- [ ] Mobile / Tablet / Desktop 확인
- [ ] Semantic HTML, 키보드, focus, label, alt, ARIA 확인
- [ ] 서버 측 검증·권한 검사
- [ ] 민감 정보·내부 오류 미노출
- [ ] 관련 문서 갱신 (`[TBD]` 해소 시 이 파일 포함)

**보고 형식**: 변경 파일 / 주요 결정과 이유 / 검사 결과(미실행 명시) / 남은 작업.

---

## 11. Git

- Conventional Commits: `feat:`, `fix:`, `refactor:`, `style:`, `docs:`, `chore:`
- 한 commit에 무관한 변경을 섞지 않는다.
