"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis instance, published on `window.__lenis` for scroll-lock consumers.
 * Namespaced because Lenis already declares `window.lenis` with an incompatible
 * type, and an interface cannot widen an existing property.
 */
export type LenisHandle = {
  stop: () => void;
  start: () => void;
};

declare global {
  interface Window {
    __lenis?: LenisHandle;
  }
}

/**
 * Smooth scroll via Lenis, wrapping native scroll so `position: sticky`, anchor
 * links and accessibility keep working.
 */
export function SmoothScroll() {
  useEffect(() => {
    // offset 0 so an anchored section lands at its top edge, directly under the
    // sticky nav. A non-zero offset scrolls past it and tucks the heading up
    // behind the header.
    const lenis = new Lenis({ autoRaf: true, anchors: { offset: 0 } });
    window.__lenis = lenis;

    return () => {
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}