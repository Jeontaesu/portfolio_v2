import type { Element, Nodes, Root } from "hast";
import type { Plugin } from "unified";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function textOf(node: Nodes): string {
  if (node.type === "text") return node.value;
  if ("children" in node) return node.children.map(textOf).join("");
  return "";
}

function isTocHeading(node: Element): node is Element & { tagName: "h2" | "h3" } {
  return node.tagName === "h2" || node.tagName === "h3";
}

function collect(node: Nodes, items: TocItem[]) {
  if (node.type === "element" && isTocHeading(node)) {
    const id = node.properties.id;
    if (typeof id === "string") {
      items.push({
        id,
        text: textOf(node).trim(),
        level: node.tagName === "h2" ? 2 : 3,
      });
    }
    return;
  }
  if ("children" in node) {
    for (const child of node.children) collect(child, items);
  }
}

/** rehype plugin: reads h2/h3 (after rehype-slug assigned ids) into `file.data.toc`. */
export const rehypeToc: Plugin<[], Root> = () => (tree, file) => {
  const items: TocItem[] = [];
  collect(tree, items);
  file.data.toc = items;
};

declare module "vfile" {
  interface DataMap {
    toc: TocItem[];
  }
}
