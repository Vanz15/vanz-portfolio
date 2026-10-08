import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { site } from "@/lib/content";
import { PrintIn } from "./print-in";
import { Reveal } from "./reveal";
import { TypeText } from "./typetext";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./brand-icons";

const socials = [
  { label: "GitHub", href: site.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: site.links.instagram, Icon: InstagramIcon },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* graph-paper texture, fading out toward the bottom */}
      <div aria-hidden className="graph-paper absolute inset-0" />

      {/* Extra py leaves room for the portrait's drift; the section clips. */}
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 py-14 pb-20 md:min-h-[calc(100dvh-68px)] md:grid-cols-12 md:gap-8 md:px-8 md:pb-24 md:pt-20">
        {/* Left — typewriter greeting + identity.
            mode="load": these blocks sit above the fold, where a view()
            timeline has no range and they would simply appear. */}
        <Reveal mode="load" className="md:col-span-7">
          <p className="font-mono text-lg text-accent md:text-xl">
            <TypeText text="hi, i'm aivann" speed={70} trigger="mount" />
          </p>

          <h1 className="mt-5 max-w-[24ch] text-4xl font-semibold tracking-tighter md:text-5xl md:leading-[1.06]">
            <TypeText
              text="I find problems, build solutions, and ship them."
              speed={26}
              trigger="mount"
            />
          </h1>

          <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg">
            {site.tagline}
          </p>

          <div className="mt-9 flex items-center gap-5">
            <a
              href="#work"
              className="inline-flex h-11 cursor-pointer items-center rounded-full bg-accent px-7 text-sm font-medium text-white transition-all hover:-translate-y-px hover:bg-foreground hover:shadow-warm active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              see the work
            </a>
            <ul className="flex items-center gap-1.5" aria-label="Social profiles">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${label} profile`}
                    title={label}
                    className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-all hover:bg-accent-ink hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Right — polaroid portrait */}
        <div className="md:col-span-5">
          {/* drift on a wrapper: PrintIn's own keyframes write `transform`
              too, and two animations on one element fight over it. */}
          <div className="drift drift-hero">
            <PrintIn>
              <figure
                tabIndex={0}
                aria-label="Portrait of Aivann Martinez"
                className="portrait-shake relative mx-auto w-64 rounded-2xl bg-white p-3 shadow-warm md:w-full md:max-w-sm"
              >
                {/* tape strip */}
                <div
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-1 rounded-sm bg-accent-ink/80 shadow-sm"
                />
                <Image
                  src="/images/hero-portrait.jpg"
                  alt="Illustrated portrait of Aivann Martinez wearing a blue cap and glasses"
                  width={1200}
                  height={1698}
                  priority
                  sizes="(min-width: 768px) 384px, 256px"
                  className="rounded-xl object-cover"
                />
                {/* In normal flow, not absolute: an absolutely-positioned caption
                    grows upward when the text wraps and clips the white bottom
                    edge. As a flow child it reserves its own height. */}
                <figcaption className="mt-2 px-1 pb-3 text-center font-mono text-xs lowercase leading-snug tracking-wide text-muted-foreground">
                  {site.heroRole}
                </figcaption>
              </figure>
            </PrintIn>
          </div>
        </div>

        {/* scroll hint */}
        <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 md:block">
          <ArrowDown
            aria-hidden
            className="size-4 animate-bounce text-muted-foreground/60"
          />
        </div>
      </div>
    </section>
  );
}
