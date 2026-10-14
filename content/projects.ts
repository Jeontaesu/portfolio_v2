import type { ProjectMeta } from "@/lib/content/types";

// Case Study metadata. The body lives in content/projects/<slug>.md.
// Add an entry only for a project that has a real, publishable write-up (CLAUDE.md §9).
// Source: the owner's career statement. `startedAt` is omitted until the project-level period is confirmed.
export const projects: readonly ProjectMeta[] = [
  {
    title: "범농협 운영지원센터 · 포털사이트 구축 / 이관",
    slug: "nonghyup-portal",
    summary:
      "농협 최초 포털사이트 구축과 운영지원센터 2.0 리뉴얼에서 반응형 UI와 모션 인터랙션, CMS 관리자 화면을 퍼블리싱했습니다.",
    techStack: ["Pug", "HTML", "SCSS", "GSAP", "GitHub", "Wizard", "반응형"],
    role: "웹 퍼블리셔 (프레임아웃)",
    featured: true,
    sortOrder: 1,
    status: "PUBLISHED",
  },
  {
    title: "드시모네몰 쇼핑몰 리뉴얼",
    slug: "dsimone-mall",
    summary:
      "레거시 소스를 분석해 Vue 기반 신규 구조로 옮기고, 컴포넌트화로 오픈 이후 운영 효율을 높였습니다.",
    techStack: ["Vue", "SCSS", "GitLab", "적응형"],
    role: "웹 퍼블리셔 (프레임아웃)",
    featured: true,
    sortOrder: 2,
    status: "PUBLISHED",
  },
  {
    title: "우리카드 통합단말 시스템 구축",
    slug: "woori-card-terminal",
    summary:
      "WebSquare 플랫폼 위에서 통합 단말 시스템 화면을 타이트한 일정에 맞춰 퍼블리싱했습니다.",
    techStack: ["WebSquare", "SVN"],
    role: "웹 퍼블리셔 (프레임아웃)",
    featured: true,
    sortOrder: 3,
    status: "PUBLISHED",
  },
];
