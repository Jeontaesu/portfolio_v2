import { SectionHeader } from "./section-header";

// Placeholder data — real Case Studies replace this in Week 2 (content/projects.ts).
const PLACEHOLDERS = [
  { no: "01", span: "lg:col-span-8" },
  { no: "02", span: "lg:col-span-4" },
  { no: "03", span: "lg:col-span-5" },
  { no: "04", span: "lg:col-span-7" },
];

export function SelectedWorks() {
  return (
    <section aria-labelledby="works-title" className="container-page py-20 lg:py-32">
      <SectionHeader
        id="works-title"
        overline="Selected Works"
        title="실무에서 해결했던 문제와 직접 만든 프로젝트를 소개합니다."
      />
      <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
        {PLACEHOLDERS.map((item) => (
          <li key={item.no} className={item.span}>
            <div
              className="aspect-[4/3] border border-border bg-surface"
              role="img"
              aria-label="프로젝트 이미지 자리"
            />
            <p className="mt-4 text-caption font-semibold text-secondary">{item.no}</p>
            <h3 className="mt-1 text-h3">프로젝트 제목 (준비 중)</h3>
            <p className="mt-2 text-body-sm text-secondary">Case Study 작성 후 연결됩니다.</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
