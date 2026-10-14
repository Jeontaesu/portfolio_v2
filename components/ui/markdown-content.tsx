type MarkdownContentProps = {
  /** HTML produced by lib/markdown renderMarkdown — already sanitized. Never pass other HTML here. */
  html: string;
};

export function MarkdownContent({ html }: MarkdownContentProps) {
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
