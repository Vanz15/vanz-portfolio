import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { Intro } from "@/components/site/intro";
import { Work } from "@/components/site/work";
import { Skills } from "@/components/site/skills";
import { Research } from "@/components/site/research";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/site/smooth-scroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <Work />
        <Skills />
        <Research />
      </main>
      <Footer />
    </>
  );
}