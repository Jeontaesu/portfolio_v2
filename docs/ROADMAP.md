# ROADMAP.md

일정, 이직 준비, 블로그 계획. 코드 규칙은 `CLAUDE.md`, 범위 정의는 `CLAUDE.md §8`이 기준이다.

**목표: 3주 안에 Public 사이트 배포 → 바로 지원 시작 → Phase 2(Admin CMS)는 지원과 병행**

| 단계 | 기간 | 결과물 | 지원 대상 |
|---|---|---|---|
| Phase 1 | 10/12 – 11/1 (3주) | 배포된 포트폴리오 URL, Case Study 3–4개, 블로그 글 2개 | Web Publisher, UI Developer |
| Phase 2 | 11/2 – 12/6 (약 5주) | Admin CMS, DB, 인증 | + Junior Frontend, 혼합 포지션 |

---

## 1. 포지셔닝

**성장 경로**: Web Publisher → UI Developer → Frontend Developer

> 퍼블리싱을 잘하는 데 그치지 않고, UI에 대한 이해를 기반으로 프론트엔드 개발까지 확장한 사람.

Phase 1만으로 보여줄 것: UI 구현 완성도, 접근성, 반응형, React/TypeScript/Next.js로 만든 실제 배포 서비스.
Phase 2에서 추가할 것: 인증·권한, DB·CRUD, 상태·데이터 흐름 설계.

---

## 2. Phase 1 — 3주 계획

주 12–15시간, 총 약 40시간 기준. **코드와 콘텐츠를 첫 주부터 병행**한다. 일정의 실제 병목은 Case Study 글쓰기다.

### Week 1 (10/12 – 10/18) — 기반 + 첫 배포

| 개발 | 콘텐츠 |
|---|---|
| `CLAUDE.md`의 `[TBD]` 결정 (패키지 매니저, 버전, Tailwind 버전, 아이콘, Markdown 스택) | Selected Works 3–4개 선정 |
| Next.js 생성, TypeScript strict, ESLint/Prettier, Git | Case Study #1 초안 |
| 토큰(`globals.css`), Pretendard, `cn()` | Case Study #2 초안 |
| Figma: Variables + Home Desktop/Mobile (2–3일 안에 끝냄) | |
| Button, Badge, SiteHeader, SiteFooter, MobileNav, SkipLink | |
| Home 섹션 골격 (임시 데이터) | |
| **빈 사이트라도 Vercel에 첫 배포** (배포 파이프라인 확인) | |

### Week 2 (10/19 – 10/25) — 페이지 구현

| 개발 | 콘텐츠 |
|---|---|
| `lib/content/`, Markdown 렌더링, 목차 | Case Study #3 (+#4) 초안 |
| Projects 목록·상세 (Case Study 레이아웃) | `content/profile.ts`: About, Career, Skills |
| Blog 목록·상세, Category 필터 | 블로그 글 2개 초안 |
| About, Career, Resume(PDF), Contact | 이력서 PDF 1차 |
| Home에 실제 콘텐츠 연결 | |

### Week 3 (10/26 – 11/1) — 품질 + 배포 + 지원

| 개발 | 이직 준비 |
|---|---|
| Metadata, OG 이미지, sitemap, robots, not-found | Case Study·블로그 최종 교정 |
| 키보드·스크린 리더·대비 점검 | 이력서에 포트폴리오 URL 추가 |
| 390 / 768 / 1440 반응형 점검 | README 작성 |
| Lighthouse (Performance·Accessibility·SEO) | GitHub 저장소 공개 |
| Production 배포, 실기기 확인 | **11/1까지 첫 지원** |

### 시간이 부족할 때 줄이는 순서
1. Career 별도 페이지 → Home Career 섹션으로 대체
2. Blog Category 필터 → 목록만
3. Case Study 4개 → 3개
4. Figma Home → 토큰만 만들고 코드에서 디자인

**줄이지 않는 것**: 접근성, 반응형, SEO 기본, 배포. 이것이 지원 대상 포지션에서 평가받는 핵심이다.

### Phase 1에서 하지 않는 것
DB, 인증, Admin, Contact 폼, 댓글, 검색, 다크모드, 애니메이션 라이브러리, Storybook, 나머지 Figma 페이지.

---

## 3. Phase 2 — 지원과 병행 (약 5주)

| 주차 | 내용 |
|---|---|
| 4 (11/2 –) | PostgreSQL, Prisma schema·migration, seed로 `content/` 데이터 이전, `lib/content/` 내부를 DB 조회로 교체 |
| 5 | Auth.js, Admin role, `requireAdmin()`, 보호 레이아웃 |
| 6 | Admin 레이아웃, Dashboard(실데이터), Post 목록 |
| 7 | Post·Project·Category CRUD, Draft/Publish, Write/Preview |
| 8 | 권한·보안 재점검, 접근성, 배포, Junior Frontend 포지션 지원 확대 |

면접이 잡히면 Phase 2보다 면접 준비를 우선한다.

---

## 4. 블로그

런칭 시 최소 2개. 실제로 겪은 것만 쓴다. 구조: `문제 → 원인 → 해결 → 선택 근거/trade-off → 결과`

Phase 1에서 실제로 겪게 될 주제 후보:
- 디자인 토큰의 색상 대비 검증 — Success/Warning 텍스트 토큰을 따로 만든 이유
- DB 없이 Markdown 파일로 블로그 만들기, 그리고 나중에 DB로 옮기기 쉽게 설계한 방법
- 퍼블리셔가 Next.js로 처음 만든 사이트에서 Server Component를 기본값으로 둔 이유
- 접근성 실무 경험을 React 컴포넌트로 옮기기 (focus, skip link, 모바일 메뉴)

Phase 2 주제 후보: 파일 → DB 이전, Server Action vs Route Handler, Auth.js 권한 설계, Prisma 삭제 정책.

---

## 5. 경력 프로젝트 정리

구조: **상황 → 행동 → 결과**. 기간·역할·수치는 근거가 있는 것만. 공개 불가 자료 금지.

**Phase 1에서 Case Study로 쓸 3–4개를 먼저 고른다.** 기준: 접근성 / 금융권 / 글로벌·커머스 성격이 겹치지 않게.

| 프로젝트 | 유형 | 기간 | 역할 | Case Study 후보 | 정리 |
|---|---|---|---|---|---|
| 범농협 운영지원센터 / 포털사이트 | 구축 | | | | ☐ |
| 드시모네몰 | 쇼핑몰 구축 | | | | ☐ |
| 전북은행 | 운영 | | | | ☐ |
| 광주은행 | 구축 / 웹 접근성 | | | | ☐ |
| SK hynix | 운영 | | | | ☐ |
| 인바디 베트남 법인사이트 | 구축 | | | | ☐ |
| BX-AFS | 사이트 구축 | | | | ☐ |
| 연세대학교 뉴스 / 브로슈어 | 구축 | | | | ☐ |
| 밝은세상안과 AI 마이크로사이트 | 구축 | | | | ☐ |
| 하나캐피탈 | 운영 | | | | ☐ |
| 한국후지필름몰 | 리뉴얼 | | | | ☐ |
| 우리카드 통합단말 시스템 | 구축 (WebSquare) | | | | ☐ |

나머지는 Career 페이지에 한 줄 요약으로만 둔다.

---

## 6. 산출물 체크

**Phase 1 (11/1)**
- [x] 배포된 포트폴리오 URL
- [x] Case Study 3–4개 (3개 게시)
- [x] 블로그 글 2개
- [ ] GitHub 공개 저장소 + README (소개, 스택, 로컬 실행, 배포 링크)
- [ ] 이력서 PDF (포트폴리오 URL 포함)
- [ ] Lighthouse 결과 캡처

**Phase 2**
- [x] Admin CMS, Prisma schema + migration
- [x] `docs/DECISIONS.md`
- [x] README 업데이트 (환경 변수, 아키텍처)

---

## 7. 면접 대비 질문

Phase 1 배포 시점에 답할 수 있어야 하는 것:
1. 왜 React, TypeScript, Next.js App Router인가?
2. Server / Client Component를 어떻게 구분했는가?
3. 왜 Tailwind인가? 기존 SCSS 경험과 무엇이 달랐는가?
4. Radix UI와 shadcn/ui를 어떻게 활용했는가?
5. 접근성, SEO, 성능을 어떻게 고려했는가? (Lighthouse 결과로 답변)
6. 왜 DB 없이 먼저 배포했는가? 이후 확장은 어떻게 설계했는가?

Phase 2 이후 추가:
7. 상태 관리 기준, 8. Server Action vs Route Handler, 9. Prisma·PostgreSQL 구성, 10. 인증·권한 처리, 11. 개발 중 문제 해결 사례
