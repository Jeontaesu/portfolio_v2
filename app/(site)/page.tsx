import { About } from "./_components/about";
import { BlogPreview } from "./_components/blog-preview";
import { Career } from "./_components/career";
import { ComponentGuide } from "./_components/component-guide";
import { Contact } from "./_components/contact";
import { Hero } from "./_components/hero";
import { InFocus } from "./_components/in-focus";
import { SelectedWorks } from "./_components/selected-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <InFocus />
      <SelectedWorks />
      <ComponentGuide />
      <BlogPreview />
      <About />
      <Career />
      <Contact />
    </>
  );
}
