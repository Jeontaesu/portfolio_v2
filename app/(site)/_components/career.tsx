import { SectionHeader } from "./section-header";

// Placeholder — the real timeline comes from content/profile.ts once the history is confirmed.
export function Career() {
  return (
    <section aria-labelledby="career-title" className="container-page py-20 lg:py-32">
      <SectionHeader
        id="career-title"
        overline="Career"
        title="역할과 기술이 어떻게 성장해 왔는지 보여줍니다."
      />
      <p className="mt-12 border-t border-border pt-8 text-body text-secondary">
        경력 타임라인은 실제 이력 확정 후 채워집니다.
      </p>
    </section>
  );
}
