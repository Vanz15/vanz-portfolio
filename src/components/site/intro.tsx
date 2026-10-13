import { site } from "@/lib/content";
import { KineticTextReveal } from "@/components/ui/kinetic-text-reveal";
import { Stagger } from "./stagger";

/** Last word starts at (words - 1) * stagger, then fades in over FADE_SECONDS. */
const LAND_SECONDS = 3;
const FADE_SECONDS = 0.72;
const WORD_COUNT = site.intro.trim().split(/\s+/).length;
const STAGGER = (LAND_SECONDS - FADE_SECONDS) / (WORD_COUNT - 1);

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
        {/* The kinetic reveal owns this block's entrance and exit, so it replaces the
            scroll-fade Reveal rather than stacking with it. Stagger is derived
            from the copy so the paragraph always lands in LAND_SECONDS no
            matter how long the intro grows. */}
        <p className="max-w-[62ch] text-lg leading-relaxed md:text-xl">
          <KineticTextReveal
            text={site.intro}
            splitBy="words"
            direction="up"
            distance={16}
            stagger={STAGGER}
            transition={{ duration: FADE_SECONDS, ease: [0.22, 1, 0.36, 1] }}
            blur
            trigger="view"
          />
        </p>

        <Stagger
          parts
          className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-3"
        >
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
