// Profile data. Fill in only values that are real: components render a link only when it is set.
// Source: the owner's career statement (경력기술서). Do not add figures that are not backed by it.
// Salary is private and never goes here.

export type CareerProject = {
  name: string;
  /** Display text as written, e.g. "2024.06 — 2025.07". Omitted when the source has no period. */
  period?: string;
  tech: readonly string[];
  work: readonly string[];
  /** Qualitative outcomes only. Numeric claims are added once their basis is confirmed. */
  result?: readonly string[];
};

export type CareerEntry = {
  company: string;
  /** Team / department / position as written in the career record. */
  position: string;
  /** Only set when the career record states it. */
  employment?: "프리랜서";
  /** YYYY-MM */
  startedAt: string;
  endedAt?: string;
  summary: string;
  skills: readonly string[];
  projects: readonly CareerProject[];
};

export const profile = {
  brand: "MEFLOWEB",
  tagline: "Frontend Developer & Web Publisher",
  links: {
    github: "https://github.com/Jeontaesu",
    velog: "https://velog.io/@meflow/posts",
    notion:
      "https://amusing-bugle-9be.notion.site/dc7b50a46631412b9a9d6fee9876b2f2?v=eebf0f2a2bc843ba902865cfcbf7d447",
    email: "jts50@naver.com" as string | undefined,
  },
  /** Total career as of 2026-10 (11 years 1 month). */
  careerYears: 11,
  /** Path under public/ once the PDF exists, e.g. "/resume.pdf". Undefined hides the download link. */
  resumePdf: "/resume_jeontaesu.pdf" as string | undefined,
  skills: {
    working: [
      {
        label: "마크업 · 스타일",
        items: ["HTML5", "CSS3", "SCSS", "Pug", "반응형 · 적응형 웹"],
      },
      {
        label: "스크립트 · 프레임워크",
        items: ["JavaScript", "jQuery", "Vue.js", "React (협업 퍼블리싱)", "GSAP", "WebSquare"],
      },
      { label: "도구 · 협업", items: ["Gulp", "GitHub", "GitLab", "SVN"] },
      { label: "품질", items: ["웹 접근성 (WCAG 2.1)", "웹표준"] },
    ],
    learning: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
  },
} as const;

export const career: readonly CareerEntry[] = [
  {
    company: "프레임아웃",
    position: "IX NEXT 과장",
    startedAt: "2025-07",
    endedAt: "2026-10",
    summary: "파견 프로젝트의 구축 퍼블리싱을 담당했습니다.",
    skills: ["GUI", "반응형 웹", "웹표준 · 웹 접근성"],
    projects: [
      {
        name: "범농협 운영지원센터 · 포털사이트 구축 / 이관",
        tech: ["Pug", "HTML", "SCSS", "GitHub", "Wizard", "GSAP", "반응형"],
        work: [
          "범농협 운영지원센터 2.0 리뉴얼 퍼블리싱",
          "농협 포털사이트 신규 구축 및 운영사이트 이관",
          "Wizard CMS 기반 관리자 화면 및 콘텐츠 관리 기능 퍼블리싱",
          "반응형 웹, 웹 접근성을 고려한 UI 구현",
          "모션 인터랙션을 활용한 메인 페이지 UX 개선",
        ],
        result: [
          "농협 최초 포털사이트 구축 프로젝트에 참여해 신규 서비스 UI를 구현",
          "컴포넌트 기반 퍼블리싱 구조를 적용해 유지보수성 확보",
        ],
      },
      {
        name: "드시모네몰(쇼핑몰) 리뉴얼",
        tech: ["Vue", "SCSS", "GitLab", "적응형"],
        work: [
          "레거시 소스 분석 후 신규 아키텍처로 마이그레이션",
          "최대한의 컴포넌트화로 오픈 이후 운영 효율성 확보",
        ],
        result: ["운영팀의 편의성과 유지보수성 향상"],
      },
      {
        name: "우리카드 통합단말 시스템 구축",
        tech: ["WebSquare", "SVN"],
        work: [
          "WebSquare 플랫폼을 활용한 통합 단말 시스템 퍼블리싱",
          "타이트한 개발 일정에 맞춘 효율적인 작업 진행",
        ],
        result: ["일정을 준수해 안정적으로 시스템 구축 완료"],
      },
      {
        name: "롯데월드 차세대 시스템 구축",
        tech: ["React", "SCSS", "GitLab"],
        work: [
          "React 기반 대규모 서비스 환경에서 UI 컴포넌트 퍼블리싱 및 SCSS 스타일링",
          "디자인 시안을 분석해 React 컴포넌트 단위로 마크업·스타일 구현",
          "퍼블리싱 산출물을 개발팀 작업 환경에 맞춰 연동 지원",
        ],
        result: [
          "React 프로젝트 협업 프로세스를 실무에서 경험하며 퍼블리싱과 프론트엔드 개발 간 연결 역량 확보",
        ],
      },
    ],
  },
  {
    company: "디플러",
    position: "프론트엔드개발",
    employment: "프리랜서",
    startedAt: "2023-09",
    endedAt: "2025-07",
    summary: "사이트 구축과 운영 퍼블리싱을 담당했습니다.",
    skills: ["반응형 웹", "웹표준 · 웹 접근성", "GUI"],
    projects: [
      {
        name: "동아쏘시오홀딩스 일호재단 웹사이트 구축",
        period: "2025.05 — 2025.07",
        tech: ["HTML5", "SCSS", "JavaScript", "GitHub", "반응형 웹"],
        work: [
          "재단 브랜드의 보수적 이미지를 벗어난 현대적 UI 설계 및 구현",
          "사용자 상호작용을 높이는 인터랙션 요소 추가",
          "모든 디바이스에 최적화된 반응형 웹사이트 구축",
        ],
      },
      {
        name: "밝은세상안과 웹사이트 리뉴얼 및 운영",
        period: "2024.06 — 2025.07",
        tech: ["HTML5", "CSS3", "JavaScript", "반응형 웹"],
        work: ["PC/모바일 웹 리뉴얼 및 퍼블리싱", "UX 개선 중심 인터랙션 적용"],
      },
      {
        name: "연세대학교 브로슈어 기반 마이크로사이트 구축",
        period: "2024.11 — 2025.01",
        tech: ["Pug", "SCSS", "JavaScript", "Gulp", "GitHub", "반응형 웹"],
        work: ["디자인 중심 브로슈어 웹 구현", "사용자를 위한 인터랙션 요소 설계"],
        result: ["연세대학교 공식 마케팅 자료로 활용"],
      },
      {
        name: "연세대학교 연세소식 웹사이트 구축",
        period: "2024.08 — 2024.10",
        tech: ["Pug", "SCSS", "JavaScript", "Gulp", "GitHub", "반응형 웹"],
        work: ["뉴스 콘텐츠 중심 게시판 레이아웃 설계", "인터랙션 적용을 통한 가독성 향상"],
      },
      {
        name: "인바디 베트남 법인 사이트 구축",
        period: "2024.07 — 2024.09",
        tech: ["Pug", "HTML5", "SCSS", "JavaScript", "GitHub", "Gulp", "반응형 웹"],
        work: ["현지 맞춤형 반응형 웹사이트 구축", "다양한 디바이스 최적화를 위한 UI 설계"],
      },
      {
        name: "BX-AFS 웹사이트 구축",
        period: "2024.06 — 2024.09",
        tech: ["Pug", "HTML5", "SCSS", "JavaScript", "Gulp", "GitHub"],
        work: [
          "금융 기업용 반응형 웹사이트 구축",
          "Pug 기반 컴포넌트 단위 구조화로 작업 효율 증대",
        ],
      },
      {
        name: "한국후지필름몰 고도화",
        period: "2024.04 — 2024.12",
        tech: ["HTML5", "SCSS", "JavaScript", "적응형 웹"],
        work: ["모바일 메인 리뉴얼 및 프로모션 페이지 퍼블리싱", "UI/UX 최적화 및 속도 개선"],
        result: ["모바일 UX 일관성 확보"],
      },
      {
        name: "동아쏘시오홀딩스 및 계열사 운영",
        period: "2024.04 — 2025.07",
        tech: ["HTML5", "CSS3", "Gulp", "JavaScript"],
        work: [
          "동아쏘시오홀딩스, 동아제약 등 계열사 페이지 퍼블리싱",
          "브랜드별 UI 전략 반영 및 일관성 유지",
        ],
      },
      {
        name: "SK하이닉스 운영",
        period: "2024.02 ~",
        tech: ["HTML5", "CSS3", "JavaScript"],
        work: ["신규 페이지 퍼블리싱 및 기존 사이트 일관성 유지"],
      },
      {
        name: "하나캐피탈 운영 및 고도화",
        period: "2024.02 ~",
        tech: ["Vue.js", "SCSS", "JavaScript"],
        work: [
          "Vue 기반 웹사이트의 신규 페이지 및 컴포넌트 개발",
          "기존 Vue 컴포넌트 재사용으로 퍼블리싱 효율 최적화",
        ],
        result: ["클라이언트가 자체 유지보수할 수 있는 구조로 구성"],
      },
      {
        name: "광주은행 웹/앱 구축 및 웹 접근성 프로젝트",
        period: "2023.12 — 2024.02",
        tech: ["HTML5", "CSS3", "JavaScript", "jQuery", "웹 접근성 (WCAG 2.1)"],
        work: [
          "웹 접근성 기준 적용 (대체 텍스트, 키보드 네비게이션, 명도 대비 등)",
          "모바일 웹/앱 리뉴얼 퍼블리싱",
        ],
        result: ["웹 접근성 마크 획득"],
      },
      {
        name: "전북은행 운영 및 유지보수",
        period: "2023.09 — 2023.12",
        tech: ["HTML5", "CSS3", "JavaScript", "jQuery"],
        work: ["금융기관 웹/앱 유지보수 및 기능 개선", "긴급 요청 이슈 대응"],
        result: ["안정성 유지로 계약 연장"],
      },
    ],
  },
  {
    company: "디자인 펀치",
    position: "기획개발팀",
    employment: "프리랜서",
    startedAt: "2020-09",
    endedAt: "2023-03",
    summary: "사이트 구축과 운영 퍼블리싱을 담당했습니다.",
    skills: ["반응형 웹", "웹표준 · 웹 접근성", "GUI"],
    projects: [],
  },
  {
    company: "다한웹 디자인",
    position: "대리",
    startedAt: "2015-05",
    endedAt: "2021-11",
    summary: "웹디자인과 웹퍼블리싱을 담당했습니다.",
    skills: ["GUI", "반응형 웹"],
    projects: [],
  },
];
