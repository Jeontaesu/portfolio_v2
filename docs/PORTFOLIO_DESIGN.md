# PORTFOLIO_DESIGN.md

개인 포트폴리오 플랫폼의 디자인 기준. Figma 설계와 React 구현이 같은 토큰·컴포넌트 이름을 쓰도록 하는 것이 목적이다.

**컨셉: Editorial Portfolio × Modern SaaS CMS**

| | Public | Admin |
|---|---|---|
| 성격 | Clean Minimal + Editorial | Modern SaaS Dashboard |
| 키워드 | Typography, Whitespace, Large Image, Grid, Case Study | Dense Info, Table, Form, Filter, Sidebar, Badge |
| 보여줄 역량 | UI / 퍼블리싱 / 접근성 | React · TypeScript · Next.js 서비스 개발 |

두 영역은 토큰과 UI primitive를 공유하고, 레이아웃과 정보 밀도만 다르게 한다.

> 이 문서의 와이어프레임에 들어간 문구·날짜·숫자는 **샘플**이다. 실제 콘텐츠는 `CLAUDE.md §9 콘텐츠 작성 규칙`을 따른다.

---

## 1. 디자인 우선순위

1. Information Architecture
2. Design System / Component Consistency
3. Accessibility
4. Responsive
5. Typography
6. Case Study storytelling
7. Visual polish

**하지 않는 것**: Neon, 과한 Gradient, 3D, 개발자 포트폴리오 클리셰(터미널 흉내 등), 모든 요소의 radius, 모든 카드의 shadow, 애니메이션 남발.
**다크모드**: MVP 범위 아님. 토큰을 CSS 변수로 두어 이후 확장 가능하게만 한다.

---

## 2. Design Tokens

### 2.1 Color

Figma Variable 이름, CSS 변수, Tailwind 클래스를 1:1로 맞춘다.

| Figma | CSS Variable | Tailwind | Value | 용도 |
|---|---|---|---|---|
| Primary | `--primary` | `bg-primary` `text-primary` | `#2563EB` | CTA, 링크, 주요 액션 |
| Primary Hover | `--primary-hover` | `hover:bg-primary-hover` | `#1D4ED8` | Hover / Active |
| On Primary | `--primary-foreground` | `text-primary-foreground` | `#FFFFFF` | Primary 위 텍스트 |
| Background | `--background` | `bg-background` | `#FAFAFA` | Public 페이지 배경 |
| Surface | `--surface` | `bg-surface` | `#FFFFFF` | Card, Panel, Admin 본문 |
| Foreground | `--foreground` | `text-foreground` | `#111827` | 본문, 제목 |
| Secondary | `--secondary` | `text-secondary` | `#4B5563` | 보조 텍스트 |
| Muted | `--muted` | `text-muted` | `#6B7280` | Caption, metadata |
| Border | `--border` | `border-border` | `#E5E7EB` | Divider, 테두리 (장식용) |
| Success | `--success` | `bg-success` | `#16A34A` | 아이콘, 점, 배경 강조 |
| Success Text | `--success-text` | `text-success-text` | `#15803D` | 성공 상태 **텍스트** |
| Warning | `--warning` | `bg-warning` | `#D97706` | 아이콘, 점, 배경 강조 |
| Warning Text | `--warning-text` | `text-warning-text` | `#B45309` | 경고 상태 **텍스트** |
| Error | `--destructive` | `text-destructive` `bg-destructive` | `#DC2626` | 오류, 삭제 |
| Focus Ring | `--ring` | `ring-ring` | `#2563EB` | focus-visible outline |

Success / Warning 원색은 텍스트로 쓰지 않는다 (대비 미달, 아래 표 참고).

### 2.2 색상 대비 (WCAG 2.1)

기준: 일반 텍스트 4.5:1, 큰 텍스트(24px+ 또는 18.66px+ Bold)·UI 경계 3:1.

| 조합 | #FFFFFF 위 | #FAFAFA 위 | 판정 |
|---|---:|---:|---|
| Foreground `#111827` | 17.74 | 17.00 | AAA |
| Secondary `#4B5563` | 7.56 | 7.24 | AAA |
| Primary `#2563EB` | 5.17 | 4.95 | AA |
| Primary Hover `#1D4ED8` | 6.70 | 6.42 | AA |
| Muted `#6B7280` | 4.83 | 4.63 | AA (여유 적음 — 12px 이하에서는 Secondary 권장) |
| Error `#DC2626` | 4.83 | 4.63 | AA |
| Success Text `#15803D` | 5.02 | 4.81 | AA |
| Warning Text `#B45309` | 5.02 | 4.81 | AA |
| Success `#16A34A` | 3.30 | 3.16 | 텍스트 불가, 아이콘·큰 텍스트만 |
| Warning `#D97706` | 3.19 | 3.05 | 텍스트 불가, 아이콘·큰 텍스트만 |
| 흰 텍스트 on Primary | 5.17 | — | AA |
| 흰 텍스트 on Error | 4.83 | — | AA |
| Border `#E5E7EB` | 1.24 | 1.19 | 장식용. Input 테두리처럼 식별이 필요한 경계는 `--muted`(#6B7280, 4.83)를 쓴다 (D-026) |

Badge 등 tinted 배경(예: success 10% 배경 + Success Text)은 실제 배경색 기준으로 다시 측정한다.

### 2.3 Typography

폰트: **Pretendard** (`next/font/local`, variable font). 숫자·코드는 monospace `[TBD]`.

| Token | Desktop | Mobile | Line Height | Weight | Tailwind |
|---|---:|---:|---:|---|---|
| Display | 72 | 40 | 1.1 | 700 | `text-display` |
| H1 | 56 | 36 | 1.15 | 700 | `text-h1` |
| H2 | 40 | 30 | 1.2 | 700 | `text-h2` |
| H3 | 28 | 24 | 1.3 | 600 | `text-h3` |
| H4 | 20 | 18 | 1.4 | 600 | `text-h4` |
| Body Large | 18 | 17 | 1.7 | 400 | `text-body-lg` |
| Body | 16 | 16 | 1.7 | 400 | `text-body` |
| Body Small | 14 | 14 | 1.5 | 400 | `text-body-sm` |
| Caption | 12 | 12 | 1.4 | 400 | `text-caption` |

- 한글 본문은 `word-break: keep-all`.
- Overline 라벨(SELECTED WORKS 등)은 Caption/Body Small + uppercase + letter-spacing 0.08em.
- Mobile 값은 `lg` 미만에서 적용.

### 2.4 Spacing

4px 기반, Tailwind 기본 스케일 사용.

| 용도 | 값 |
|---|---|
| 컴포넌트 내부 간격 | 4 · 8 · 12 · 16 |
| 요소 그룹 간격 | 24 · 32 |
| 섹션 내부 블록 간격 | 48 · 64 |
| Public 섹션 간 간격 | Desktop 128–160 / Mobile 80 |
| Admin 페이지 패딩 | Desktop 32 / Mobile 16 |

### 2.5 Radius · Shadow · Border

| Token | 값 | 용도 |
|---|---|---|
| `radius-sm` | 8px | Button, Input, Badge |
| `radius-md` | 12px | Card, Dropdown |
| `radius-lg` | 16px | Dialog, 큰 이미지 |

- Editorial 영역(Public 이미지, 리스트)은 radius 0 허용.
- 구분은 Border 우선. Shadow는 Dropdown, Popover, Dialog, Toast 등 실제로 떠 있는 요소에만.

---

## 3. Layout · Breakpoint

| Breakpoint | Tailwind | 폭 | Grid | 좌우 패딩 |
|---|---|---|---|---|
| Mobile | 기본 | < 768 | 4 col | 20px |
| Tablet | `md` | 768–1023 | 8 col | 32px |
| Desktop | `lg` | ≥ 1024 | 12 col | 40px |
| Wide | `xl` | ≥ 1280 | 12 col | 40px |

- Container: `max-width: 1280px` (패딩 포함, 콘텐츠 영역 1200px). Gutter 24px.
- Figma 기준 프레임: Desktop 1440×1024, Tablet 768×1024, Mobile 390×844.
- Header 높이: Desktop 80px / Mobile 64px.
- 블로그 본문 최대 폭: 720px (Mobile은 유동).
- Admin: Sidebar 240px 고정 + Main flex. `lg` 미만에서 Sidebar는 Drawer(Radix Dialog)로 전환.
- 터치 타겟 최소 44×44px.
- Mobile은 축소가 아니라 재배치: Header Nav → Menu Button, Project Grid → 1열, Admin Table → 핵심 열만 또는 카드 리스트.

---

## 4. Components

### 4.1 목록과 코드 위치

| 분류 | 컴포넌트 | 코드 위치 |
|---|---|---|
| Primitive | Button, Input, Textarea, Select, Checkbox, Badge, Card, Tabs, Table, Pagination, Toast, Skeleton | `components/ui/` |
| Overlay (Radix) | Dialog, AlertDialog, DropdownMenu, Tooltip | `components/ui/` |
| Form | FormField (Label + Control + Description + Error) | `components/ui/` |
| Feedback | EmptyState, ErrorState | `components/ui/` |
| Layout | Header, Footer, MobileNav, AdminSidebar, AdminHeader, Breadcrumb, SkipLink | `components/layout/` |
| Projects | ProjectCard, ProjectList, ProjectCaseStudy | `components/features/projects/` |
| Blog | PostListItem, PostList, PostContent(prose), TableOfContents, CategoryFilter | `components/features/blog/` |
| Admin | DashboardStatCard, RecentPosts, PostTable, PostEditor, PostPreview, ProjectTable | `components/features/dashboard/`, `.../blog/`, `.../projects/` |

Figma 컴포넌트 이름 = React 컴포넌트 이름. Figma variant 속성 = React prop 이름 (예: `variant`, `size`, `state`).

### 4.2 상태 정의

| 컴포넌트 | Variants / Sizes | States |
|---|---|---|
| Button | primary · secondary · ghost · destructive / sm · md · lg | default · hover · active · focus · disabled · loading |
| Input / Textarea / Select | — / md | default · focus · invalid · disabled |
| Badge | neutral · success · warning · destructive · primary | — |
| Table | — | loading(Skeleton) · empty · error · selected row |
| 데이터 영역 공통 | — | loading · empty · error · success |

- focus: 2px `--ring` outline + 2px offset. 모든 interactive 요소 공통.
- invalid: `--destructive` 테두리 + 아이콘 + 텍스트 메시지 (색만으로 표현하지 않음).
- loading Button: 폭 유지, spinner + `aria-busy`.
- 상태 Badge: `Published`(success), `Draft`(neutral).

---

## 5. Public 화면

### 5.1 Header

> md 이상은 2단(위: 로고·태그라인·Resume / 아래: Home·Projects·Blog·About·Career, 우측 Contact). 높이가 커서 모바일에서만 sticky. 아래 도식은 이전 1단 구조.

```text
ME FLOW                       Projects  Blog  About  Career  Contact
```

- 현재 페이지는 `aria-current="page"` + 시각적 표시.
- 외부 링크(GitHub, Velog 등)만 `↗` 아이콘을 붙이고, 새 창이면 sr-only로 "새 창" 안내.
- Mobile: Logo + Menu Button → 전체 화면 메뉴(Radix Dialog, focus trap, Esc 닫기).

### 5.2 Home

순서: `Hero → In Focus → Selected Works → Blog Preview → About(+Toolkit) → Career → Contact → Footer`

> 2026-10-17 Figma 시안(`mefloweb · 에디토리얼 포트폴리오`)의 구조를 반영했다. 색은 시안이 아니라 §2 토큰을 그대로 쓴다. 시안의 책상 사진(About)과 주제별 읽기 섹션은 에셋·콘텐츠가 없어 아직 만들지 않았다. 아래 와이어프레임은 이전 구조이며 순서만 갱신했다.

**Hero**
```text
FRONTEND DEVELOPER
& WEB PUBLISHER

UI를 이해하고 웹 서비스를 만드는
프론트엔드 개발자입니다.

[ View Projects → ]   [ About Me ]
```
- 메시지: Web Publisher → Frontend Developer 확장. 퍼블리셔 경력을 숨기지 않는다.
- Display 타이포 + 넓은 여백. 장식 이미지·배경 효과 없음.

**Selected Works** (`featured = true` 프로젝트)
```text
SELECTED WORKS
실무에서 해결했던 문제와 직접 만든 프로젝트를 소개합니다.
────────────────────────────
[ Large Image ]
01  프로젝트명
Web / Accessibility / Responsive
한 줄 요약
View Case Study →
```
- 큰 이미지 중심. 모든 항목을 같은 카드로 반복하지 않고 Grid 변형(2/3 + 1/3, 전폭 등)으로 Editorial 리듬.

**About**
```text
ABOUT ME
웹을 만드는 것에서 시작해
웹 서비스를 만드는 개발자로 확장하고 있습니다.
────────────────────────────
WEB PUBLISHER   →   FRONTEND DEVELOPER
(실무 경력)          (현재 확장 중)
────────────────────────────
실무 사용: HTML · CSS/SCSS · JavaScript · jQuery
학습·적용 중: React · TypeScript · Next.js · Tailwind CSS
```
- 기술은 숙련도를 사실대로 구분해 표기한다.

**Career** (Timeline)
- 연도별 회사·역할과 대표 프로젝트를 표시. 실제 이력으로 채운다 `[TBD]`.
- 프로젝트 나열보다 역할·기술의 성장 흐름을 강조. 상세는 `/career`.

**Blog Preview** — 카드 대신 Editorial List, 최근 3개
```text
TECHNICAL BLOG
────────────────────────────
NEXT.JS · 2026.10.05
Server Action과 Route Handler의 차이
────────────────────────────
View all →
```

**Footer**
```text
ME FLOW — Frontend Developer & Web Publisher
GitHub ↗   Velog ↗   Email
© 2026 ME FLOW
```

### 5.3 Project Detail (Case Study)

갤러리가 아니라 문제 해결 과정을 보여준다. 구조는 `CLAUDE.md §9`와 동일.

```text
PROJECT / 01
프로젝트명
2024 — 2025 · Web Publisher
HTML / SCSS / JavaScript / jQuery
[Visit Website ↗]

[ Hero Image ]

OVERVIEW          한두 문단 요약
                  ROLE · PERIOD · TECHNOLOGY (메타 정보 그리드)

01 / CONTEXT      상황과 문제
02 / ROLE         담당 범위와 기여
03 / ACTION       해결 과정 (번호 목록)
04 / RESULT       결과 (근거 있는 정량 또는 정성)
05 / LESSONS      배운 점

← 이전 프로젝트          다음 프로젝트 →
```

- 섹션 라벨 `01 / CONTEXT`는 시각 요소이고, 실제 heading은 `h2`로 마크업한다.
- 내부 자료·비공개 화면은 사용하지 않는다.

### 5.4 Blog List

```text
BLOG
[ ALL ] [ FRONTEND ] [ CSS ] [ WEB ] [ STUDY ]      ← Category (P0)
────────────────────────────
NEXT.JS · 2026.10.05 · 8 min read                   ← Tag (P1)
Server Action을 사용하면서 발생했던 문제와 해결 과정
────────────────────────────
```

- **Category(큰 분류, P0)**: Frontend · CSS · Web · Study
- **Tag(세부 기술, P1)**: React, TypeScript, Next.js, Tailwind, Accessibility, Performance, SEO 등
- 필터는 URL search param(`?category=frontend`)으로 동작, 링크로 구현.
- 빈 결과: "이 카테고리에 아직 글이 없습니다" + 전체 보기 링크.

### 5.5 Blog Detail

```text
← Back to Blog
FRONTEND · NEXT.JS
Server Action과 Route Handler의 차이
2026.10.05 · 8 min read
────────────────────────────
목차 (Desktop: 우측 sticky / Mobile: 상단 접힘)
────────────────────────────
본문 (max 720px, prose 스타일)
```

- 읽기 중심(Vercel Docs / Medium 참고). heading 위계, 코드 블록 가로 스크롤, 링크 밑줄 유지.
- 코드 블록은 키보드로 스크롤 가능해야 함(`tabindex="0"` + label).

---

## 6. Admin 화면 (Phase 2)

Phase 1에서는 디자인·구현하지 않는다. Phase 2 착수 시 이 섹션을 기준으로 Figma 작업을 시작한다.

### 6.1 Layout

```text
┌──────────────┬────────────────────────────────────┐
│ ME FLOW ADMIN│ Page Title              [Primary CTA]│
│              │                                      │
│ Dashboard    │ Content                              │
│ Content      │                                      │
│  ├ Posts     │                                      │
│  ├ Projects  │                                      │
│  └ Categories│                                      │
│ ─ ─ ─ ─ ─ ─  │                                      │
│ Comments  P1 │  ← MVP에서는 숨김 또는 disabled      │
│ Media     P2 │                                      │
│ Settings  P2 │                                      │
│              │                                      │
│ [사이트 보기↗] [로그아웃]                            │
└──────────────┴────────────────────────────────────┘
```

- 배경 Surface(`#FFFFFF`) 기반, 정보 밀도 높게. Body Small(14px)을 기본 텍스트로 허용.

### 6.2 Dashboard

```text
┌ POSTS ─────┐ ┌ PROJECTS ──┐ ┌ DRAFTS ────┐
│ 24         │ │ 12         │ │ 3          │
│ 18 published│ │ 9 published│ │ 작성 중     │
└────────────┘ └────────────┘ └────────────┘

Recent Posts (최근 수정 5개, 제목 · 상태 Badge · 수정일)
```

- **P0는 DB에서 실제로 집계 가능한 값만**: 게시글 수, 프로젝트 수, 게시/초안 수, 최근 게시글.
- 조회수(VIEWS), 증감률(+12%)은 P2. 데이터가 생기기 전에는 카드를 만들지 않는다.
- 0건일 때 EmptyState: "첫 게시글을 작성해보세요" + New Post 버튼.

### 6.3 Post Management

```text
Posts                                         [+ New Post]
[Search posts...]   [Status ▾]  [Category ▾]
────────────────────────────────────────────────
□  Title                     Category   Status      Updated
□  Next.js Server Action     Frontend   Published   10.05   •••
□  React State Management    Frontend   Draft       10.01   •••
────────────────────────────────────────────────
                 ← 1 2 3 →
```

- 검색·필터·페이지는 URL search params.
- 행 액션(•••): 수정, 미리보기, 삭제. 삭제는 AlertDialog 확인.
- 일괄 선택(Checkbox)은 일괄 작업이 생길 때 추가 (P1).
- Mobile: 제목 + 상태 + 액션만 남긴 리스트형.

### 6.4 Post Editor

```text
← Posts            Edit Post            [Save Draft] [Publish]

Title     [                                         ]
Slug      [ nextjs-server-action-route-handler      ]  ← 제목에서 자동 생성, 수정 가능
Category  [ Frontend ▾ ]
Excerpt   [                                         ]
Thumbnail [ URL                                     ]  ← 업로드는 P1

Content
[ Write | Preview ]                                    ← P0: 탭 전환
┌─────────────────────────────────────────────┐
│ Markdown textarea                            │
└─────────────────────────────────────────────┘
```

- P0: textarea + Preview 탭. 툴바·2-column 동시 보기는 P1.
- 저장 중 버튼 loading, 성공 시 Toast, 실패 시 필드 오류 + 상단 요약.
- 저장하지 않은 변경이 있을 때 이탈 경고.

### 6.5 Project Management

- 목록은 썸네일 포함 테이블 또는 카드(Blog보다 이미지 비중 높게).
- 정렬: 위/아래 이동 버튼 (키보드 접근 가능). 드래그 정렬은 P1, 도입 시에도 버튼 대안 유지.
- Featured 토글, 공개 상태 Badge.
- Editor 필드: Title, Slug, Summary, Thumbnail, Tech Stack, Role, Period, GitHub URL, Demo URL, Featured, Status, Content(Markdown).

---

## 7. 접근성 체크 (Figma 단계부터)

- [ ] 모든 텍스트·UI 조합이 §2.2 대비 기준 충족
- [ ] 모든 interactive 요소에 focus 상태 프레임
- [ ] hover / active / disabled / loading / error / empty 상태 프레임
- [ ] 폼: 보이는 label, 오류 메시지 위치, 필수 표시
- [ ] 색 외의 수단(아이콘·텍스트)으로 상태 전달
- [ ] Dialog: 열릴 때 focus 위치, 닫힐 때 복귀 위치
- [ ] 터치 타겟 44px 이상
- [ ] heading 순서(h1 → h2 → h3)를 프레임에 주석으로 표시
- [ ] Skip link 위치 정의

금융권 웹 접근성 실무 경험을 차별점으로 삼는다. 이 체크리스트와 대비 표는 Case Study 자료로도 활용한다.

---

## 8. Figma 파일 구조와 제작 범위

```text
ME FLOW Portfolio
├── 00. Cover
├── 01. Design System   (Variables: color, type, spacing, radius)
├── 02. Components      (§4 목록, variant 속성 = React prop)
├── 03. Public
├── 04. Admin
├── 05. Responsive      (Mobile / Tablet)
└── 06. Prototype
```

**Phase 1 — 3주 일정에 맞춘 최소 범위 (Week 1 초반 2–3일 안에)**
- 01. Design System: Variables(color, type, spacing, radius)만
- 02. Components: Button, Badge, ProjectCard, PostListItem
- 03. Public: **Home** Desktop + Mobile 2 frames
- 나머지 페이지(Project Detail, Blog, Blog Detail, About, Career)는 **Figma 없이 코드에서 바로** 이 문서의 와이어프레임과 토큰으로 구현한다.

배포 후 실제 화면을 캡처해 Figma에 정리하면 "디자인 → 코드 → 디자인 시스템 역정리" 과정 자체를 포트폴리오 자료로 쓸 수 있다.

**Phase 2**
- Desktop: Admin Dashboard, Post Management, Post Editor, Login
- Mobile: Admin Dashboard
