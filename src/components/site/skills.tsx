import { site, skillGroups } from "@/lib/content";
import { Reveal } from "./reveal";
import { RevealLines } from "./reveal-lines";
import { Stagger } from "./stagger";

export function Skills() {
  return (
    <section id="skills" className="border-t border-border/70">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <RevealLines>
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl">
              Skills, experiences,
              <br className="hidden md:inline" /> and everything in between.
            </h2>
          </RevealLines>

          <Reveal>
            <div className="mt-10 border-l-2 border-accent pl-4">
              <p className="font-mono text-xs tracking-[0.12em] text-accent">
                {site.education.period}
              </p>
              <p className="mt-1 text-sm font-medium">{site.education.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {site.education.detail}
              </p>
            </div>
          </Reveal>

          <Stagger>
            <ul className="mt-8 space-y-5">
              {site.experience.map((entry) => (
                <li key={entry.title} className="border-l-2 border-border pl-4">
                  <p className="font-mono text-xs tracking-[0.12em] text-accent">
                    {entry.period}
                  </p>
                  <p className="mt-1 text-sm font-medium">{entry.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {entry.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Stagger>
        </div>

        <Stagger className="space-y-8 md:col-span-7">
            {skillGroups.map((group) => (
              <div key={group.label} className="border-t border-border/70 pt-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {group.label}
                </h3>
                <p className="mt-2.5 text-[15px] leading-loose text-foreground/90">
                  {group.items.join("  ·  ")}
                </p>
              </div>
            ))}

            <div className="border-t border-border/70 pt-4">
              <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                certificates
              </h3>
              <ul className="mt-2.5 space-y-1.5">
                {site.certifications.map((cert) => (
                  <li key={cert} className="text-[15px] text-foreground/90">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
        </Stagger>
      </div>
    </section>
  );
}
