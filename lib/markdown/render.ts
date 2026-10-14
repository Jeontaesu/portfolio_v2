import "server-only";

import type { Element } from "hast";
import rehypeShiki from "@shikijs/rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { rehypeToc, type TocItem } from "./toc";

export type RenderedMarkdown = {
  html: string;
  toc: TocItem[];
};

/**
 * Order matters:
 * 1. remark-rehype without raw HTML: raw HTML in markdown is dropped, not passed through.
 * 2. rehype-sanitize (default GitHub schema) runs first, on content that can contain anything.
 * 3. rehype-slug runs after sanitize. Sanitize prefixes ids with "user-content-", which would
 *    break TOC anchors, so ids are assigned afterwards from the already-clean heading text.
 * 4. shiki runs last. Its input is the sanitized AST and it only emits its own class/style/tabindex,
 *    so the sanitize allowlist does not need to be widened.
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeSlug)
  .use(rehypeToc)
  .use(rehypeShiki, {
    theme: "github-light",
    defaultLanguage: "text",
    fallbackLanguage: "text",
    transformers: [
      {
        // Scrollable code must be keyboard-reachable and named (shiki sets tabindex="0" by default).
        pre(node: Element) {
          node.properties.tabindex = 0;
          node.properties.role = "region";
          node.properties["aria-label"] = "코드 블록";
        },
      },
    ],
  })
  .use(rehypeStringify);

export async function renderMarkdown(source: string): Promise<RenderedMarkdown> {
  const file = await processor.process(source);
  return { html: String(file), toc: file.data.toc ?? [] };
}
