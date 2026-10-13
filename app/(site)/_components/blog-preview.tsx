import { SectionHeader } from "./section-header";

// Empty state until the first posts exist (Week 2: lib/content getPosts).
export function BlogPreview() {
  return (
    <section aria-labelledby="blog-title" className="container-page py-20 lg:py-32">
      <SectionHeader id="blog-title" overline="Technical Blog" title="최근 글" />
      <p className="mt-12 border-t border-border pt-8 text-body text-secondary">
        아직 게시된 글이 없습니다.
      </p>
    </section>
  );
}
