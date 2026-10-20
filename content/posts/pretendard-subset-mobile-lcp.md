---
title: Lighthouse 모바일 LCP 14초의 원인은 한글 웹폰트 2.3MB였다
slug: pretendard-subset-mobile-lcp
category: web
excerpt: 접근성 100점인 사이트가 모바일 성능에서 50점이 나온 원인을 추적했습니다. 한글 웹폰트를 사이트에 쓰인 글자만 남기도록 나눠 LCP를 14초대에서 3초 안팎으로 줄인 과정과 trade-off를 정리합니다.
publishedAt: 2026-10-20
status: PUBLISHED
---

## 문제

배포한 사이트를 Lighthouse(모바일 기본 프로필)로 측정했습니다. 접근성·Best Practices·SEO는 10번의 측정 모두 100점이었는데, 모바일 성능은 50–70점이었습니다.

| 페이지           | 성능(모바일) | LCP    |
| ---------------- | ------------ | ------ |
| Home             | 50           | 14.2초 |
| /projects        | 59           | 14.1초 |
| /about           | 66           | 13.7초 |
| /projects/[slug] | 67           | 13.7초 |
| /blog/[slug]     | 70           | 13.5초 |

같은 페이지를 데스크톱 프로필로 측정하면 LCP가 2.3–2.4초, 성능 87–88점이었습니다. 접근성은 신경 써서 만들었는데, 느린 모바일 회선에서는 첫 화면이 14초 가까이 걸린다는 뜻입니다.

## 원인

LCP 요소는 페이지마다 달랐습니다(`/about`은 `h1`, Home은 프로젝트 이미지). 그런데 값은 모든 페이지에서 비슷했습니다. 페이지마다 원인이 다르다면 값이 이렇게 비슷하기 어렵다고 보고, 모든 페이지가 공유하는 자원을 네트워크 요청에서 크기순으로 봤습니다.

가장 큰 것은 Pretendard woff2 3개(Regular, SemiBold, Bold)였습니다. 각각 약 770–790KB, 합계 약 2.3MB입니다. 한글 전체 글리프가 들어 있는 정적 폰트였습니다. Lighthouse 모바일의 시뮬레이션 회선(약 1.6Mbps)으로는 이 용량만 받는 데 10초 넘게 걸립니다.

여기서 한 가지 오해가 있었습니다. `font-display: swap`이라 글자는 시스템 글꼴로 먼저 보이니 LCP에는 영향이 적을 거라고 생각했습니다. 실제로 FCP는 1초대였습니다. 하지만 폰트 교체 단계에서 LCP가 다시 잡히는 것으로 보였고, 1단계 서브셋 이후에도 LCP가 FCP보다 훨씬 늦게 남았습니다.

다만 용량과 시간대가 맞는다는 근거로 세운 추정이고, 다운로드를 막아서 직접 검증한 것은 아닙니다. 폰트를 줄이자 LCP가 함께 줄어든 것이 간접 근거입니다.

## 해결

디자인 토큰과 굵기(400/600/700)는 그대로 두고 폰트 파일만 바꿨습니다. 두 단계로 진행했습니다.

**1단계: KS X 1001 서브셋**

한글 상용 2,350자와 영문·기호만 남기도록 fonttools(`pyftsubset`)로 서브셋했습니다. 파일당 약 780KB가 약 200KB(합계 610KB)로 줄었습니다. 로컬 프로덕션 빌드에서 LCP가 5.7–6.0초로 내려왔지만 아직 느렸습니다.

**2단계: 사이트에 쓰인 글자만 먼저, 나머지는 필요할 때**

폰트를 둘로 나눴습니다.

- `core`: 사이트 코드와 콘텐츠에 실제로 쓰인 글자(파일당 약 84KB). preload합니다.
- `hangul`: 나머지 KS X 1001 음절(파일당 약 130KB). `preload: false`, `unicode-range: U+AC00-D7A3`로 둡니다.

폰트 스택에서 `core`를 먼저 두면, 브라우저는 `core`에 없는 글자가 화면에 나올 때만 `hangul` 파일을 받습니다.

```ts
export const pretendardCore = localFont({
  src: [/* Regular / SemiBold / Bold */],
  declarations: [{ prop: "unicode-range", value: "U+20-7E,U+AC02,..." }],
  variable: "--font-pretendard",
  display: "swap",
});

export const pretendardHangul = localFont({
  src: [/* ... */],
  declarations: [{ prop: "unicode-range", value: "U+AC00-D7A3" }],
  variable: "--font-pretendard-hangul",
  display: "swap",
  preload: false,
});
```

```css
--font-sans:
  var(--font-pretendard), var(--font-pretendard-hangul), system-ui, "Malgun Gothic", sans-serif;
```

`next/font`는 옵션을 리터럴로만 받습니다. 처음에는 `weights.map(...)`과 상수로 정리했다가 `Font loader values must be explicitly written literals` 에러로 빌드가 실패해서, 반복되더라도 값을 직접 풀어 썼습니다.

## 선택 근거와 trade-off

- **dynamic-subset을 쓰지 않은 이유**: Pretendard에는 조각 20여 개를 `unicode-range`로 나눈 배포본이 있습니다. 효과는 비슷하지만 `next/font`의 preload와 폰트 관리를 거치지 않고 CSS를 직접 관리해야 해서 보류했습니다.
- **대가**: Admin에서 새 글을 쓰다가 `core`에 없는 음절이 나오면 그 페이지에서 `hangul` 파일(약 130KB)을 추가로 받습니다. KS X 1001 밖의 음절은 폰트에 없어서 시스템 글꼴로 대체됩니다. 폰트 스택에 대체 글꼴을 넣어 깨지지는 않지만 글자 모양이 달라질 수 있습니다.
- **재생성**: 글을 많이 쓴 뒤에는 스크립트(`scripts/subset-pretendard.py`)로 `core` 범위를 다시 만들 수 있습니다.

## 결과

배포한 뒤 처음과 같은 URL, 같은 Lighthouse 모바일 프로필로 다시 측정했습니다.

| 페이지           | 성능 (전 → 후) | LCP (전 → 후)  |
| ---------------- | -------------- | -------------- |
| Home             | 50 → 85        | 14.2초 → 3.3초 |
| /projects        | 59 → 81        | 14.1초 → 3.7초 |
| /about           | 66 → 83        | 13.7초 → 3.5초 |
| /projects/[slug] | 67 → 84        | 13.7초 → 3.3초 |
| /blog/[slug]     | 70 → 85        | 13.5초 → 3.5초 |

- 폰트 전송량은 약 2.3MB에서 약 250KB(84KB × 3)가 되었습니다.
- 접근성·Best Practices·SEO는 모두 100점을 유지했습니다.
- 데스크톱 프로필은 5개 페이지 모두 성능 100점, LCP 0.7초입니다 (전: 87–88점, 2.3–2.4초).

한계도 있습니다.

- 모바일 성능이 100점이 아닌 이유는 TBT(280–350ms)와 LCP 3초대가 남아 있기 때문입니다. 이번 변경은 폰트만 다뤘고, 남은 부분은 원인을 아직 확인하지 않았습니다.
- 측정은 페이지당 1회입니다. 이전 로컬 측정에서 같은 페이지의 TBT가 크게 흔들린 적이 있어서, 점수는 몇 점 단위의 오차가 있다고 봐야 합니다.
- `core`에 없는 음절이 실제로 `hangul` 파일을 받는지는 브라우저에서 확인하지 않았습니다.

## 배운 점

접근성과 SEO 점수가 100이어도 성능은 따로 측정해야 한다는 것을 확인했습니다. 점수가 낮을 때는 페이지별 원인을 찾기 전에, 값이 비슷하게 나온다면 공통 자원부터 크기순으로 보는 편이 빨랐습니다. 그리고 `font-display: swap`이 FCP를 지켜 줘도 LCP까지 지켜 주지는 못한다는 점을 이 측정에서 알게 되었습니다.
