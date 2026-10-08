import { ExternalLink } from "lucide-react";
import { site } from "@/lib/content";
import { Reveal } from "./reveal";
import { RevealLines } from "./reveal-lines";
import { Stagger } from "./stagger";

export function Research() {
  return (
    <section id="research" className="border-t border-border/70">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <RevealLines className="md:col-span-5">
            <span className="inline-flex w-fit items-center rounded-full border border-border px-2.5 py-1 font-mono text-[11px] lowercase tracking-[0.14em] text-muted-foreground">
              case study
            </span>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-4xl">
              Looking beyond
              <br className="hidden md:inline" /> model accuracy.
            </h2>
            <p className="mt-5 max-w-[50ch] text-[15px] leading-relaxed text-muted-foreground">
              A pneumonia classifier can be highly accurate and still be
              looking at the wrong things.
              <br className="hidden md:inline" /> My undergraduate thesis asked
              whether we could detect that behavior and measure a
              <br className="hidden md:inline" /> model&rsquo;s reliability before
              it is deployed in a clinical setting.
            </p>
            <a
              href={site.links.gaxRepo}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex cursor-pointer items-center gap-1.5 font-mono text-[13px] lowercase text-accent transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              gax-safety on github
              <ExternalLink className="size-3.5" aria-hidden />
            </a>
          </RevealLines>

          <Reveal className="md:col-span-7">
            <figure className="rounded-2xl border border-border bg-surface p-7 md:p-9">
              <Stagger
                as="blockquote"
                className="space-y-4 text-[15px] leading-relaxed"
              >
                <p>
                  We trained eight ResNet34 variants on 14,863 chest X-rays from
                  the RSNA Pneumonia Detection Challenge — test accuracy up to
                  93.14% — then generated GAX-based interpretable confidence
                  maps and compared them against true lung regions from a
                  segmentation model.
                </p>
                <p>
                  I defined the <strong>Cheating Score</strong>: the share of a
                  model&apos;s positive evidence that falls outside the lung
                  fields — shortcut learning you&apos;d never see in the
                  accuracy number.
                </p>
                <p className="border-l-2 border-accent pl-4 font-medium">
                  Result: accuracy and cheating rose together across all eight
                  variants. At the standard safety threshold, 96 of 100
                  correctly classified pneumonia cases relied on shortcut
                  learning instead of evidence from the lungs. Performance alone
                  is not reliability.
                </p>
              </Stagger>
              {/* APA 7 reference-style citation */}
              <figcaption className="mt-5 border-l-2 border-border pl-4 font-mono text-xs leading-relaxed text-muted-foreground">
                Martinez, A. H. P., &amp; Talaue, A. J. V. (2026).{" "}
                <span className="italic">
                  Quantifying the reliability of a pneumonia-diagnosing ResNet34
                  model via GAX-based interpretable confidence maps
                </span>
                . Unpublished undergraduate thesis, University of the
                Philippines &mdash; Baguio.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
