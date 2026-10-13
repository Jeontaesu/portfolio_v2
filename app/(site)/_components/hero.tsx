import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="container-page py-20 lg:py-32">
      <p className="text-caption font-semibold tracking-[0.08em] text-secondary uppercase">
        Frontend Developer &amp; Web Publisher
      </p>
      <h1 id="hero-title" className="mt-6 max-w-5xl text-display">
        UI를 이해하고 웹 서비스를 만드는 프론트엔드 개발자입니다.
      </h1>
      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link href="/projects">
            View Projects <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="secondary">
          <Link href="/about">About Me</Link>
        </Button>
      </div>
    </section>
  );
}
