import { FileText } from "lucide-react";

/**
 * Thesis abstract card. The one-page PDF is public; the full manuscript is not,
 * so visitors are pointed at the author instead.
 */
export function PaperRequest({
  abstractSrc,
  abstractThumb,
  title,
  authors,
  meta,
}: {
  abstractSrc: string;
  abstractThumb: string;
  title: string;
  authors: string;
  meta: string;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4">
      <a
        href={abstractSrc}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={abstractThumb}
          alt={`Abstract of ${title}`}
          loading="lazy"
          className="h-14 w-28 shrink-0 rounded-md border border-border object-cover"
        />
        <span className="min-w-0">
          <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            read the abstract
          </span>
          {/* Two-line clamp: the paper title is long, and a hard `truncate`
              cut it mid-word at this card width. */}
          <span className="mt-0.5 line-clamp-2 text-sm leading-snug text-foreground">
            {title}
          </span>
          <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
            {authors}
            {meta ? ` · ${meta}` : ""}
          </span>
        </span>
        <FileText
          className="ml-auto size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </a>

      <p className="px-1 font-mono text-[11px] lowercase tracking-wide text-muted-foreground">
        email the author for the full paper version
      </p>
    </div>
  );
}