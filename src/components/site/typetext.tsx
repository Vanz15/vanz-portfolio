"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Types `text` character by character.
 * trigger="mount" fires on load; trigger="view" (default) fires on first
 * scroll into view, via rect checks rather than IntersectionObserver so the
 * state cannot stall when the webview stops producing frames.
 *
 * The full string goes in `aria-label`, so the animation is decorative.
 * `cursor` appends a caret that blinks once typing finishes.
 */
export function TypeText({
  text,
  className,
  speed = 24,
  trigger = "view",
  cursor = false,
}: {
  text: string;
  className?: string;
  speed?: number;
  trigger?: "mount" | "view";
  cursor?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    let started = false; // per-effect-run, so React StrictMode is safe

    const start = () => {
      if (started) return;
      started = true;
      let i = 0;
      timer = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, speed);
    };

    if (trigger === "mount") {
      start();
      return () => {
        if (timer) clearInterval(timer);
      };
    }

    const el = ref.current;
    if (!el) return;

    const inView = () => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < window.innerHeight * 0.9 &&
        rect.bottom > window.innerHeight * 0.1
      );
    };
    const check = () => {
      if (inView()) {
        start();
        window.removeEventListener("scroll", check);
        window.removeEventListener("resize", check);
      }
    };

    check(); // element already in view? type immediately
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, trigger]);

  return (
    <span ref={ref} className={cn(className)} aria-label={text}>
      <span aria-hidden>
        {text.slice(0, count)}
        {cursor && (
          <span
            className={cn("typewriter-caret", done && "typewriter-caret-blink")}
          >
            |
          </span>
        )}
      </span>
    </span>
  );
}
