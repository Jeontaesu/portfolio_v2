---
title: DB 없이 Markdown 파일로 블로그 만들기, sanitize와 목차 id 순서 문제
slug: markdown-blog-without-db
category: frontend
excerpt: DB 없이 Markdown 파일로 블로그를 만들며 sanitize와 heading id, 목차 수집 순서에 따라 목차 링크가 깨지는 것을 재현하고, 빌드 시점 검증으로 막은 과정을 정리합니다.
publishedAt: 2026-10-14
status: PUBLISHED
---

## 문제

포트폴리오를 3주 안에 배포해야 해서 1단계에서는 DB와 인증을 만들지 않기로 했습니다. 블로그 글은 `content/posts/*.md` 파일로 두고 빌드 시점에 HTML로 바꿉니다. 이때 두 가지를 지켜야 했습니다.

1. Markdown에 섞인 HTML이 그대로 출력되면 안 됩니다 (XSS).
2. 글 상단의 목차 링크(`#제목`)가 본문 heading과 정확히 연결되어야 합니다.

처음 계획한 파이프라인 순서는 `rehype-slug`(heading에 id 부여) → `rehype-sanitize`였습니다.

## 원인

`rehype-sanitize`의 기본 스키마는 `id` 속성 앞에 `user-content-` 접두사를 붙입니다. 사용자가 넣은 id가 페이지의 다른 요소와 충돌하는 것(DOM clobbering)을 막기 위한 동작입니다.

처음에는 이 동작 때문에 목차가 깨질 것이라고 예상했는데, 실제로 순서를 바꿔 빌드해 보니 **목차를 어디서 수집하느냐**에 따라 결과가 달랐습니다.

| 순서                        | heading id          | 목차 링크            | 결과                         |
| --------------------------- | ------------------- | -------------------- | ---------------------------- |
| slug → sanitize → 목차 수집 | `user-content-문제` | `#user-content-문제` | 링크는 맞지만 URL이 지저분함 |
| slug → 목차 수집 → sanitize | `user-content-문제` | `#문제`              | 링크 6개 중 6개 깨짐         |

첫 번째는 목차를 최종 트리에서 읽기 때문에 일치합니다. 두 번째는 sanitize가 id를 바꾸기 전에 목차를 만들어서 링크와 id가 어긋납니다. 플러그인을 하나 추가하거나 순서를 정리하다가 쉽게 만들 수 있는 실수이고, 화면에서는 클릭해도 아무 일도 일어나지 않아 눈에 띄지 않을 수 있습니다.

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
- id는 sanitize 뒤에 붙이므로 `user-content-` 접두사 없이 `#문제`처럼 읽기 쉬운 URL이 됩니다.
- 코드 하이라이트(shiki)를 sanitize 뒤에 두면, shiki가 만드는 `class`, `style`, `tabindex`를 허용 목록에 추가하지 않아도 됩니다. shiki의 입력은 이미 정제된 트리이고 출력은 shiki가 직접 이스케이프해 만듭니다.

순서만 믿지 않고 **빌드 시점 검증**도 넣었습니다. 목차의 모든 id가 최종 HTML에 `id="…"`로 존재하는지 확인하고, 없으면 빌드를 실패시킵니다.

```ts
const missing = toc.filter((item) => !html.includes(`id="${item.id}"`));
if (missing.length > 0) {
  throw new Error(
    `[markdown] TOC ids missing from output HTML: ${missing.map((m) => m.id).join(", ")}`,
  );
}
```

위의 두 번째 순서로 일부러 되돌려 빌드했을 때 이 검증이 빌드를 실패시키는 것을 확인했습니다.

## 선택 근거와 trade-off

- `next-mdx-remote` 같은 라이브러리를 쓰는 방법도 있었습니다. 대신 직접 `unified` 파이프라인을 조립해서 각 단계가 무엇을 하는지 설명할 수 있게 했습니다. 코드는 늘었습니다.
- 검증은 문자열 포함 여부만 확인하는 단순한 방식입니다. 자동 테스트 대신 빌드 실패로 막는 대신, 글이 없는 상태에서는 실행되지 않습니다.
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

이 확인은 빌드 결과 HTML을 직접 열어 본 것입니다. 이후에는 위의 빌드 시점 검증이 목차 링크 오류를 잡아 줍니다.
