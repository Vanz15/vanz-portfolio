import { ArrowUpRight } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/lib/content";
import { CaseVideo } from "./case-video";
import { PaperRequest } from "./paper-request";
import { Stagger } from "./stagger";
import { Reveal } from "./reveal";
import { TypeText } from "./typetext";

const stepLabel: Record<string, string> = {
  problem: "the problem",
  approach: "the approach",
  built: "what i built",
  improved: "how i made it better",
  presented: "how i presented it",
};

function CaseImage({ study }: { study: CaseStudy }) {
  if (study.video) {
    return <CaseVideo video={study.video} alt={study.imageAlt} />;
  }
  if (study.paper) {
    return (
      <PaperRequest
        abstractSrc={study.paper.abstractSrc}
        abstractThumb={study.paper.abstractThumb}
        title={study.paper.title}
        authors={study.paper.authors}
        meta={study.meta}
      />
    );
  }
  if (study.image) {
    // A wide capture (a workflow canvas, a dashboard strip) is letterboxed
    // rather than cropped: object-contain inside a padded band keeps every
    // node label visible, and the band is capped in height so it tucks under
    // the card meta instead of stretching to match the steps column.
    if (study.wideImage) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={study.image}
          alt={study.imageAlt}
          loading="lazy"
          className="max-h-56 w-full self-start rounded-2xl border border-border bg-surface object-contain p-2"
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={study.image}
        alt={study.imageAlt}
        loading="lazy"
        className="h-full w-full rounded-2xl border border-border object-cover"
      />
    );
  }
  return (
    <div className="flex h-full min-h-44 w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-surface">
      {/* TODO: replace with real screenshot — {study.imageAlt}, 1600×1000 */}
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
        screenshot placeholder
      </p>
      <p className="font-mono text-[11px] text-muted-foreground/70">
        {study.number} · 1600×1000
      </p>
    </div>
  );
}

function CaseRow({ study }: { study: CaseStudy }) {
  return (
    <article className="grid grid-cols-1 gap-10 py-12 md:grid-cols-12 md:py-16">
      {/* meta column — stretches so both columns end at the same height */}
      <div className="flex flex-col md:col-span-5">
        <p
          aria-hidden
          className="font-mono text-4xl leading-none text-border md:text-5xl"
        >
          {study.number}
        </p>
        <h3 className="mt-4 text-xl font-semibold tracking-tight md:text-2xl">
          {study.title}
        </h3>
        <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
          {study.subtitle}
        </p>
        <p className="mt-4 font-mono text-xs lowercase tracking-wide text-muted-foreground">
          {study.meta}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
          {study.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] lowercase text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {study.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex cursor-pointer items-center gap-1 font-mono text-[13px] lowercase text-accent transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {link.label}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ))}
        </div>

        <div className="mt-auto flex flex-1 flex-col pt-8">
          <CaseImage study={study} />
        </div>
      </div>

      {/* five steps — each row cascades in as the block scrolls through */}
      <Stagger className="space-y-6 md:col-span-7" as="dl">
        {study.steps.map((step) => (
          <div key={step.label} className="grid grid-cols-1 gap-1 sm:grid-cols-12">
            <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground sm:col-span-3 sm:pt-1">
              {stepLabel[step.label]}
            </dt>
            <dd className="text-[15px] leading-relaxed text-foreground/90 sm:col-span-9">
              {step.text}
            </dd>
          </div>
        ))}
      </Stagger>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <Reveal>
          {/* one of the page's three small-caps labels */}
          <p className="section-label">selected works</p>
          <h2 className="mt-3 max-w-[38ch] text-2xl font-semibold tracking-tight md:text-4xl">
            <TypeText
              text="A collection of problems I found worth solving, things I built to solve them, and the thinking behind every decision."
              speed={16}
            />
          </h2>
        </Reveal>

        <div className="mt-12 divide-y divide-border/70 border-y border-border/70">
          {caseStudies.map((study) => (
            <Reveal key={study.number}>
              <CaseRow study={study} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
