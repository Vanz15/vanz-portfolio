"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import type { CaseStudy } from "@/lib/content";

/**
 * Click-to-play video card. `preload="none"` keeps the clip unfetched until the
 * poster is clicked; `playsInline` stops it taking over the screen on phones.
 */
export function CaseVideo({
  video,
  alt,
}: {
  video: NonNullable<CaseStudy["video"]>;
  alt: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  // Pause when out of view.
  useEffect(() => {
    if (!playing) return;
    const el = ref.current;
    if (!el) return;

    const stop = () => {
      if (!document.contains(el)) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        el.pause();
        el.currentTime = 0;
        setPlaying(false);
      }
    };

    window.addEventListener("scroll", stop, { passive: true });
    return () => window.removeEventListener("scroll", stop);
  }, [playing]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={video.poster}
        preload="none"
        playsInline
        controls={playing}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        aria-label={alt}
      >
        <source src={video.src} type="video/mp4" />
        Your browser can&rsquo;t play this video.{" "}
        <a href={video.src} download>
          Download it instead.
        </a>
        .
      </video>

      {!playing && (
        <button
          type="button"
          onClick={() => {
            const el = ref.current;
            if (!el) return;
            void el.play();
          }}
          className="group absolute inset-0 flex cursor-pointer items-end justify-between bg-gradient-to-t from-foreground/45 via-transparent to-transparent p-4 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span className="pointer-events-none inline-flex items-center gap-2 rounded-full bg-background/85 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground backdrop-blur-sm transition-transform group-hover:scale-[1.03]">
            <Play className="size-3 fill-current" aria-hidden />
            {video.label}
          </span>
          <span className="pointer-events-none font-mono text-[11px] text-background/90 tabular-nums">
            {video.duration}
          </span>
        </button>
      )}
    </div>
  );
}