---
title: 스크롤 등장 애니메이션을 CSS로 만들었다가 motion으로 바꾼 이유
slug: css-first-motion
category: frontend
excerpt: animation-timeline으로 만든 스크롤 reveal이 Firefox에서 동작하지 않아 motion으로 바꿨습니다. CSS 우선 원칙에서 JS 라이브러리를 쓰는 기준과 LCP, reduced motion 처리를 정리합니다.
publishedAt: 2026-10-17
status: PUBLISHED
---

## 문제

공개 사이트에 스크롤 등장 효과(reveal)를 넣기로 했습니다. 이 프로젝트의 기준은 "애니메이션은 CSS가 기본이고, JS 라이브러리는 CSS로 어렵거나 불가능한 경우에만" 쓰는 것입니다. CSS는 별도 번들 없이 브라우저가 처리해 가볍기 때문입니다.

그래서 처음에는 `animation-timeline: view()`로 구현했습니다. JS 없이 요소가 화면에 들어오는 진행도에 맞춰 애니메이션을 연결할 수 있습니다.

## 원인

`animation-timeline: view()`는 Firefox가 지원하지 않아 그 브라우저에서는 효과가 아예 나타나지 않았습니다. 효과가 없는 것은 점진적 향상으로 받아들일 수도 있지만, 이 사이트는 모든 브라우저에서 같은 인상을 주는 것이 목표였습니다.

## 해결

reveal은 `motion`의 `whileInView`(한 번만 실행)로 바꿨습니다. 메뉴를 닫을 때의 exit 애니메이션도 같은 라이브러리로 처리했습니다. 이 둘은 원칙에서 허용한 "JS로 상태를 추적해야 하는 경우"에 해당합니다.

- **메뉴 exit**: Radix Dialog를 그대로 두고 open 상태를 제어하며 `forceMount`를 줍니다. `AnimatePresence`가 exit 애니메이션이 끝날 때까지 마운트를 유지합니다. 포커스 트랩, Esc, 스크롤 잠금, 포커스 복귀는 계속 Radix가 맡아 직접 구현하지 않았습니다.
- **번들**: `LazyMotion`과 `m.*`만 쓰고 `strict` 모드를 켰습니다. 풀 `motion.*`을 import하면 에러가 나서 번들이 커지는 실수를 막아 줍니다.
- 읽기 진행바는 CSS 스크롤 타임라인을 그대로 두었습니다. 지원하지 않는 브라우저에서 진행바만 안 보이는 것은 콘텐츠에 영향이 없기 때문입니다.

## 놓치기 쉬운 두 가지

### LCP

`Reveal`은 서버가 렌더링할 때 `opacity: 0`입니다. JS가 실행되기 전까지 보이지 않으므로 첫 화면에 보이는 콘텐츠에 쓰면 LCP가 늦어집니다. 그래서 첫 화면의 In Focus 영역에는 적용하지 않고 그 아래 섹션에만 썼습니다.

### reduced motion

`prefers-reduced-motion`을 존중합니다. `MotionConfig reducedMotion="user"`가 이동(x, y)을 끄고, `[data-reveal]` 요소는 CSS의 `!important`로 즉시 보이게 했습니다. 읽기 진행바는 `no-preference`와 `@supports` 두 조건으로 게이트합니다. 모션을 줄이는 설정에서 콘텐츠가 숨겨진 채로 남아서는 안 되기 때문입니다.

## 선택 근거와 trade-off

- 의존성 `motion`이 추가되어 번들이 늘어납니다. `LazyMotion`으로 필요한 기능만 로드하게 했지만 0은 아닙니다.
- JS가 꺼져 있으면 reveal 영역이 보이지 않습니다. 그래서 중요한 첫 화면을 제외했습니다. 더 안전하게 하려면 `noscript` 대응이 필요하지만 아직 하지 않았습니다.
- 클릭할 수 없는 요소(Career 행)에는 hover 효과를 주지 않았습니다. 링크로 오해하기 때문입니다.

## 검증한 것과 하지 않은 것

`typecheck`, `lint`, `pnpm build`는 통과했고, 프로덕션 서버의 HTML에서 `data-reveal` 요소가 `opacity: 0`으로 렌더링되는 것을 확인했습니다. 실제 움직임(메뉴 exit, reveal, reduced motion)과 번들 크기에 미친 영향은 아직 브라우저에서 확인하거나 측정하지 않았습니다.
