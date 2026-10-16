/** Hero: statement on the left, a short note on the right (desktop), stacked on mobile. No decoration. */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page pt-12 pb-12 lg:pt-20 lg:pb-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">
          <p className="text-caption font-semibold tracking-[0.08em] text-primary uppercase">
            Building the web, documenting the process.
          </p>
          <h1 id="hero-title" className="mt-6 text-h1">
            UI를 이해하고 웹 서비스를 만드는 프론트엔드 개발자입니다.
          </h1>
        </div>
        <div className="lg:col-span-3 lg:col-start-10 lg:pt-10">
          <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
            The MEFLOWEB Archive
          </p>
          <p className="mt-3 text-body-sm text-secondary">
            실무에서 해결한 문제와 직접 만든 프로젝트의 과정과 기술의 배움을 차곡차곡 기록합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
