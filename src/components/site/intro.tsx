import { site } from "@/lib/content";
import { Reveal } from "./reveal";
import { Stagger } from "./stagger";
import { TypeText } from "./typetext";

const pillars = [
  {
    key: "01 — find",
    title: "Find the problem",
    text: "Look for friction worth solving, not trends worth following.",
  },
  {
    key: "02 — build",
    title: "Build & improve",
    text: "Make the first version work, then keep making it better.",
  },
  {
    key: "03 — present",
    title: "Present the work",
    text: "Make the thinking visible. Document it, demo it, and stand behind the decisions.",
  },
];

export function Intro() {
  return (
    <section aria-label="Introduction" className="border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          <p className="max-w-[62ch] text-lg leading-relaxed md:text-xl">
            <TypeText text={site.intro} speed={14} cursor />
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3">
            {pillars.map((pillar) => (
              <div
                key={pillar.key}
                className="border-t-2 border-foreground/80 pt-5"
              >
                <p className="font-mono text-xs tracking-[0.14em] text-accent">
                  {pillar.key}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pillar.text}
                </p>
              </div>
            ))}
        </Stagger>
      </div>
    </section>
  );
}
