"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Portrait entrance: a clip-path sweep downward, then one soft bounce when it
 * lands. Decorative — the image is legible from the start, and reduced-motion
 * users get it immediately.
 */
export function PrintIn({
  children,
  className,
  duration = 1100,
}: {
  children: React.ReactNode;
  className?: string;
  /** Length of the sweep, in ms. The bounce follows it. */
  duration?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "printing" | "bounce">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion is handled purely in CSS (the media query forces the
    // printed state and kills the animation), so there is no JS branch here —
    // calling setState synchronously in an effect would cascade renders.
    //
    // Two frames: one to commit the initial (hidden) state, one to start the
    // transition. Without this the browser coalesces both and nothing animates.
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("printing"));
    });

    const bounceTimer = window.setTimeout(() => setPhase("bounce"), duration);

    return () => {
      cancelAnimationFrame(raf1);
      window.clearTimeout(bounceTimer);
    };
  }, [duration]);

  return (
    <div
      ref={ref}
      className={cn(
        "print-in",
        phase === "printing" && "is-printing",
        phase === "bounce" && "is-printed",
        className,
      )}
    >
      {children}
    </div>
  );
}