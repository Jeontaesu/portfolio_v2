---
title: DB 없이 Markdown 파일로 블로그 만들기, sanitize와 목차 id 순서 문제
slug: markdown-blog-without-db
category: frontend
excerpt: 포트폴리오 1단계에서는 DB 없이 Markdown 파일로 블로그를 만들었습니다. 파이프라인에서 sanitize와 heading id 부여 순서를 바꾼 이유와, 나중에 DB로 옮기기 쉽게 경계를 나눈 방법을 정리합니다.
publishedAt: 2026-10-14
status: DRAFT
---

## 문제

포트폴리오를 3주 안에 배포해야 해서 1단계에서는 DB와 인증을 만들지 않기로 했습니다. 블로그 글은 `content/posts/*.md` 파일로 두고 빌드 시점에 HTML로 바꿉니다. 이때 두 가지를 지켜야 했습니다.

1. Markdown에 섞인 HTML이 그대로 출력되면 안 됩니다 (XSS).
2. 글 상단의 목차 링크(`#제목`)가 본문 heading과 정확히 연결되어야 합니다.

처음 계획한 파이프라인 순서는 `rehype-slug`(heading에 id 부여) → `rehype-sanitize`였습니다.

## 원인

`rehype-sanitize`의 기본 스키마는 `id` 속성 앞에 `user-content-` 접두사를 붙입니다. 사용자가 넣은 id가 페이지의 다른 요소와 충돌하는 것(DOM clobbering)을 막기 위한 동작입니다.

계획한 순서대로라면 slug가 만든 `id="첫-번째-제목"`이 sanitize를 거치며 `user-content-첫-번째-제목`이 됩니다. 반면 목차는 `#첫-번째-제목`으로 연결하니 앵커가 어긋납니다. 이 순서로는 구현하지 않았고, 스키마 동작을 확인한 뒤 순서를 바꿨습니다.

## 해결

sanitize를 먼저 하고, 그 뒤에 id를 붙이도록 순서를 바꿨습니다.

```ts
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype) // 마크다운 안의 raw HTML은 통과시키지 않음
  .use(rehypeSanitize)
  .use(rehypeSlug)
  .use(rehypeToc) // heading id로 목차 수집
  .use(rehypeShiki, { theme: "github-light" })
  .use(rehypeStringify);
```

이 순서의 효과는 세 가지입니다.

- 외부에서 올 수 있는 입력은 sanitize가 먼저 정리합니다.
- id는 이미 정제된 heading 텍스트로 만들어지므로, 접두사 없이 목차 링크와 일치합니다.
- 코드 하이라이트(shiki)를 sanitize 뒤에 두면, shiki가 만드는 `class`, `style`, `tabindex`를 허용 목록에 추가하지 않아도 됩니다. shiki의 입력은 이미 정제된 트리이고 출력은 shiki가 직접 이스케이프해 만듭니다.

## 선택 근거와 trade-off

- `next-mdx-remote` 같은 라이브러리를 쓰는 방법도 있었습니다. 대신 직접 `unified` 파이프라인을 조립해서 각 단계가 무엇을 하는지 설명할 수 있게 했습니다. 코드는 늘었습니다.
- shiki를 sanitize 뒤에 두는 순서는 허용 목록 관리를 줄여 주지만, "sanitize 이후에 HTML이 생긴다"는 점을 코드 주석으로 남겨야 합니다. 이후 단계에 다른 플러그인을 추가할 때 다시 확인이 필요합니다.
- 코드 블록은 가로 스크롤이 생기므로 키보드로 접근할 수 있게 `tabindex="0"`과 `aria-label`을 붙였습니다.

## 나중에 DB로 옮기기 쉽게 한 설계

페이지는 파일을 직접 읽지 않고 `lib/content/`의 함수(`getPosts`, `getPost`)로만 글을 읽습니다. 글의 필드 이름도 이후 DB 모델과 같게 맞췄습니다. 2단계에서 DB를 붙일 때는 이 함수 내부만 바꾸고 페이지 코드는 유지하는 것이 목표입니다. 아직 DB로 옮기지는 않았으므로, 이 설계가 실제로 비용을 줄였는지는 2단계에서 확인해야 합니다.

`status: DRAFT`인 글은 `lib/content/`에서 걸러서, 어떤 페이지에서도 노출되지 않게 했습니다.

## 결과

임시 글을 만들어 빌드한 결과를 확인했습니다.

- `<script>` 태그와 `onerror` 속성이 출력 HTML에 남지 않았습니다.
- 목차 링크와 본문 heading id가 일치했습니다.
- 코드 블록에 `tabindex="0"`이 붙었습니다.
- DRAFT 글은 정적 생성 대상에서 빠졌습니다.

이 확인은 빌드 결과 HTML을 직접 열어 본 것이고, 자동 테스트로 만들지는 않았습니다.
