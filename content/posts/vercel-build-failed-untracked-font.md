---
title: 로컬 빌드는 통과했는데 Vercel 배포만 ENOENT로 실패한 이유
slug: vercel-enoent
category: web
excerpt: OG 이미지가 읽는 폰트 파일이 .gitignore에 걸려 커밋되지 않았고, 로컬 빌드는 통과했지만 Vercel 빌드는 ENOENT로 실패했습니다. 원인과 재발 방지 절차를 정리합니다.
publishedAt: 2026-10-14
status: PUBLISHED
---

## 문제

블로그 글과 Case Study마다 OG 이미지를 `next/og`로 빌드 시점에 만들도록 했습니다. 로컬에서는 `pnpm build`가 통과했는데, 같은 코드를 push하자 Vercel 배포가 `ENOENT`로 실패했습니다.

## 원인

OG 이미지를 그리는 Satori가 `public/fonts/Pretendard-*.ttf` 파일을 직접 읽고 있었습니다. 그런데 `.gitignore`는 woff2 파일만 커밋하도록 허용 목록을 두고 있었습니다.

- 로컬에는 TTF 파일이 있으므로 빌드가 통과했습니다.
- 저장소에는 TTF가 없으므로 Vercel이 clone한 코드에는 파일이 없었습니다.

즉 "내 컴퓨터에 있는 파일"에 빌드가 의존하고 있었습니다. 코드 자체에는 오류가 없어서 로컬 검사(typecheck, lint, build)로는 잡을 수 없는 종류의 문제입니다.

## 해결

Satori가 woff2를 읽지 못해 TTF를 쓰고 있었는데, 크기가 큰 TTF를 허용 목록에 넣는 대신 WOFF(Regular, Bold)로 바꿨습니다. 각각 약 1.1MB로 TTF의 절반 이하입니다. 그리고 `.gitignore` 허용 목록에 이 파일들을 추가해 커밋되도록 했습니다.

## 재발 방지

빌드가 저장소 밖에 있을 수 있는 파일을 읽도록 바꿨을 때는, push 전에 커밋된 파일만 있는 새 clone에서 빌드해 봅니다.

```bash
git clone <repo> fresh && cd fresh
pnpm install --frozen-lockfile
pnpm build
```

이번 수정도 같은 방법으로 확인한 뒤 push했습니다.

## 선택 근거와 trade-off

- 폰트를 외부 URL에서 받아 오는 방법도 있었지만, 빌드가 네트워크 상태에 좌우되는 것이 싫어 저장소에 포함시켰습니다. 저장소 크기가 폰트만큼 늘어납니다.
- 새 clone 빌드는 수동 절차입니다. CI가 있으면 자동으로 막을 수 있지만, 아직 CI를 두지 않았습니다.
- OG 이미지 함수 번들에도 폰트가 포함되므로 번들 크기가 늘어나는 비용이 있습니다.

## 결과

수정 후 배포가 Ready 상태가 되었고, 실제 도메인에서 공개 페이지가 모두 200을 반환하는 것을 확인했습니다. 없는 경로는 사이트 레이아웃을 가진 404로 응답했고, robots, sitemap, canonical, OG 이미지도 프로덕션 도메인으로 나왔습니다.
