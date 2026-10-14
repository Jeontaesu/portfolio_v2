# MEFLOWEB

웹 퍼블리셔로 11년간 일해 온 사람이 React · TypeScript · Next.js로 프론트엔드 개발까지 영역을 넓히고 있음을 **코드와 실제 서비스로 보여주기 위한** 포트폴리오 겸 기술 블로그입니다.

- **사이트**: https://portfolio-v2-ashen-eight.vercel.app
- **현재 단계**: Phase 1. DB·인증 없이 정적 콘텐츠로 Public 사이트를 배포하는 단계입니다. Admin CMS는 Phase 2에서 만듭니다.

## 주요 기능

- **Home**: Hero → Selected Works → About → Career → Blog Preview → Contact
- **Projects**: Case Study 목록과 상세(Overview → Context → Role → Action → Result), 이전/다음 프로젝트 이동
- **Blog**: Markdown 글, 카테고리 필터(`?category=`), 목차, 코드 하이라이트
- **About · Career · Resume · Contact**: 경력 데이터 한 곳(`content/profile.ts`)에서 렌더링
- **SEO**: 페이지별 metadata·canonical·Open Graph, 빌드 시 생성하는 OG 이미지, sitemap, robots, JSON-LD
- **접근성**: Skip link, 키보드로 쓸 수 있는 모바일 메뉴(Radix Dialog), `focus-visible` 스타일, 44px 터치 영역, WCAG 2.1 AA 대비를 맞춘 색상 토큰

## 기술 스택

| 영역      | 사용                                                                   |
| --------- | ---------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19, TypeScript 6 (strict)               |
| Styling   | Tailwind CSS v4 (`@theme` 디자인 토큰), `clsx` + `tailwind-merge`, CVA |
| UI        | Radix UI primitives, lucide-react                                      |
| Content   | Markdown + frontmatter (`gray-matter`), `unified` 파이프라인, `shiki`  |
| Font      | Pretendard (`next/font/local`)                                         |
| Tooling   | ESLint, Prettier, pnpm                                                 |
| Deploy    | Vercel (GitHub 연동 자동 배포)                                         |

## 구조

```text
app/
  (site)/            Public 라우트. Home 섹션은 _components/
  sitemap.ts, robots.ts, opengraph-image.tsx, not-found.tsx
components/
  ui/                도메인 무관 primitive (Button, Badge, ExternalLink, MarkdownContent)
  layout/            SiteShell, Header, Footer, MobileNav, SkipLink
  features/          blog/, projects/, career/
content/
  posts/*.md         블로그 글
  projects.ts        Case Study 메타데이터
  projects/*.md      Case Study 본문
  profile.ts         About · Career · Skills · 링크
lib/
  content/           콘텐츠 읽기 (server-only). 페이지는 이 함수로만 데이터를 읽는다
  markdown/          Markdown → sanitize된 HTML, 목차 추출
  seo/               사이트 URL, metadata 헬퍼, OG 이미지
docs/                설계 · 결정 기록
```

## 설계에서 신경 쓴 점

- **Server Component 기본**: 클라이언트 컴포넌트는 모바일 메뉴, 현재 메뉴 표시, 오류 경계 3개뿐입니다. 반응형은 JS 없이 CSS로 처리합니다.
- **콘텐츠 경계**: 페이지는 `lib/content/`의 함수(`getPosts`, `getProject` 등)로만 데이터를 읽습니다. 필드 이름을 이후 DB 모델과 맞춰 두어, Phase 2에서는 이 함수 내부만 DB 조회로 바꾸는 것이 목표입니다.
- **Markdown 보안**: Markdown 안의 raw HTML은 버리고, `rehype-sanitize`를 거친 결과만 렌더링합니다. 플러그인 순서가 바뀌어 목차 링크가 깨지면 빌드가 실패하도록 검증을 넣었습니다.
- **DRAFT 차단**: `status: DRAFT`인 글은 콘텐츠 계층에서 걸러 어떤 페이지와 sitemap에도 나오지 않습니다.
- **Preview 배포 noindex**: Vercel Preview URL은 검색 엔진이 수집하지 않도록 막습니다.

결정마다의 이유와 trade-off는 [`docs/DECISIONS.md`](docs/DECISIONS.md), 구현 구조는 [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)에 정리했습니다.

## 로컬 실행

필요: Node 24 이상, pnpm 12.11.2 (`packageManager` 필드로 고정)

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

| 명령어           | 설명                                        |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | 개발 서버                                   |
| `pnpm build`     | 프로덕션 빌드 (OG 이미지·sitemap 생성 포함) |
| `pnpm start`     | 빌드 결과 실행                              |
| `pnpm lint`      | ESLint                                      |
| `pnpm typecheck` | `next typegen && tsc --noEmit`              |
| `pnpm format`    | Prettier                                    |

환경 변수는 필요 없습니다. 커스텀 도메인을 붙일 때만 `NEXT_PUBLIC_SITE_URL`을 설정합니다 (`.env.example` 참고).

## 콘텐츠 추가

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

frontmatter가 잘못되면 빌드가 어떤 파일의 어떤 필드인지 알려 주며 실패합니다.

**Case Study**: `content/projects.ts`에 메타데이터를 추가하고, 본문은 `content/projects/<slug>.md`에 씁니다.

## 로드맵

- [x] Phase 1: Public 사이트 배포 (Home, Projects, Blog, About, Career, Resume, Contact, SEO)
- [ ] Phase 2: PostgreSQL + Prisma, Auth.js, Admin CMS (글·프로젝트 CRUD, Draft/Publish)
