import { About } from "./_components/about";
import { BlogPreview } from "./_components/blog-preview";
import { Career } from "./_components/career";
import { Contact } from "./_components/contact";
import { Hero } from "./_components/hero";
import { SelectedWorks } from "./_components/selected-works";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWorks />
      <About />
      <Career />
      <BlogPreview />
      <Contact />
    </>
  );
}
