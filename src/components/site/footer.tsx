import { site } from "@/lib/content";
import { Reveal } from "./reveal";
import { TypeText } from "./typetext";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/70 bg-surface">
      <div className="mx-auto max-w-6xl px-5 pt-20 md:px-8 md:pt-28">
        <Reveal>
          {/* third of the page's three small-caps labels */}
          <p className="section-label">contact</p>
          <h2 className="mt-3 max-w-[24ch] text-2xl font-semibold tracking-tight md:text-4xl">
            <TypeText text="Curious about something?\nLet&rsquo;s figure it out." speed={26} />
          </h2>
        </Reveal>

        <Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "GitHub", handle: site.links.handles.github, href: site.links.github },
              { label: "LinkedIn", handle: site.links.handles.linkedin, href: site.links.linkedin },
              {
                label: "Instagram",
                handle: site.links.handles.instagram,
                href: site.links.instagram,
              },
            ].map((link) => (
              <li key={link.label} className="flex flex-col gap-1">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit font-mono text-sm lowercase text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.handle}
                </a>
              </li>
            ))}
            {/* Email stays plain text — the address is the point, and there is
                nothing to click through to. */}
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Email
              </span>
              <span className="font-mono text-sm lowercase text-foreground">
                {site.links.emailAddress}
              </span>
            </li>
          </ul>
        </Reveal>

        <div className="mt-14 flex items-center justify-between border-t border-border/70 pt-6 pb-4">
          <p className="font-mono text-xs lowercase text-muted-foreground">
            © 2026 {site.name} — built with Next.js
          </p>
          <p className="font-mono text-xs lowercase text-muted-foreground">
            find · build · present
          </p>
        </div>
      </div>

      {/* Giant wordmark, cropped at the baseline */}
      <div aria-hidden className="select-none overflow-hidden">
        <p className="wordmark translate-y-[18%] whitespace-nowrap text-center font-semibold text-foreground/90">
          AIVANN
        </p>
      </div>
    </footer>
  );
}
