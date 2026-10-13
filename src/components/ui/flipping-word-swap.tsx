"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import type { CSSProperties, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

const graphemeSegmenter =
  typeof Intl.Segmenter === "function"
    ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
    : null;

function segmentCharacters(text: string) {
  if (!graphemeSegmenter) return Array.from(text);
  return Array.from(graphemeSegmenter.segment(text), ({ segment }) => segment);
}

export interface FlippingWordSwapProps {
  /** Phrases cycled through in order, wrapping at the end. */
  words: string[];
  /** Duration of each character flip in milliseconds. */
  duration?: number;
  /** Delay between neighboring character flips in milliseconds. */
  stagger?: number;
  /** Advance to the next phrase on a loop, in milliseconds. Omit to swap only on interaction. */
  autoSwapMs?: number;
  /** Render an anchor to this href instead of a button. */
  href?: string;
  /** Accessible name for the control. Defaults to the phrase currently at rest. */
  label?: string;
  /** Additional classes applied to the interactive container. */
  className?: string;
  /** Additional classes applied only to the incoming phrase. */
  toClassName?: string;
  /** Inline styles applied to the interactive container. */
  style?: CSSProperties;
  /** Inline styles applied only to the incoming phrase. */
  toStyle?: CSSProperties;
}

export function FlippingWordSwap({
  words,
  duration = 400,
  stagger = 44,
  autoSwapMs,
  href,
  label,
  className,
  toClassName,
  style,
  toStyle,
}: FlippingWordSwapProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const outgoingRef = useRef<HTMLSpanElement>(null);
  const incomingRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const swappedRef = useRef(false);
  const directionRef = useRef<1 | -1>(1);
  const [index, setIndex] = useState(0);
  const [isSwapped, setIsSwapped] = useState(false);

  const nextIndex = (index + 1) % words.length;

  // Rebuilt whenever the phrase pair changes. Two layers only: the outgoing
  // phrase and the incoming one. Once a flip completes the pair shifts forward
  // and this rebuilds the timeline against the new pair.
  useEffect(() => {
    const outgoing = outgoingRef.current;
    const incoming = incomingRef.current;
    if (!outgoing || !incoming) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const resolvedDuration = prefersReducedMotion
      ? 0
      : Math.max(180, duration) / 1000;
    const resolvedStagger = prefersReducedMotion
      ? 0
      : Math.max(0, stagger) / 1000;

    const context = gsap.context(() => {
      gsap.set(outgoing, {
        rotationX: 0,
        opacity: 1,
        transformOrigin: "center top",
      });
      gsap.set(incoming, {
        rotationX: -82,
        opacity: 0,
        transformOrigin: "center bottom",
      });

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          if (directionRef.current !== 1) return;
          setIsSwapped(false);
          swappedRef.current = false;
          setIndex(nextIndex);
        },
      });

      timeline
        .to(outgoing, {
          rotationX: 82,
          opacity: 0,
          duration: resolvedDuration,
          stagger: resolvedStagger,
          ease: "power2.in",
        })
        .to(
          incoming,
          {
            rotationX: 0,
            opacity: 1,
            duration: resolvedDuration,
            stagger: resolvedStagger,
            ease: "power2.out",
          },
          `<${resolvedDuration * 0.62}`,
        );

      timelineRef.current = timeline;
    }, containerRef);

    return () => {
      timelineRef.current = null;
      context.revert();
    };
  }, [duration, stagger, index, nextIndex, words]);

  const updateSwap = useCallback((next: boolean) => {
    if (next === swappedRef.current) return;
    swappedRef.current = next;
    setIsSwapped(next);
    directionRef.current = next ? 1 : -1;
    if (next) {
      timelineRef.current?.play();
    } else {
      timelineRef.current?.reverse();
    }
  }, []);

  useEffect(() => {
    if (!autoSwapMs) return;
    // Auto-changing text is motion the visitor did not ask for, so it stays
    // off when they have already asked for less of it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => updateSwap(true), autoSwapMs);
    return () => window.clearInterval(id);
  }, [autoSwapMs, updateSwap]);

  // Every phrase is padded out to the length of the longest one so each swap
// animates over the same number of graphemes and the box never resizes.
// Padding goes after the text, never before, so the first character of every
// phrase lands on the same column: the A of "Aivann" against the S of
// "Software Developer".
const longest = Math.max(
    ...words.map((word) => segmentCharacters(word).length),
  );

  const renderCharacters = (text: string, layer: "outgoing" | "incoming") => {
    const characters = segmentCharacters(text);
    const missing = longest - characters.length;
    const padded = [
      ...characters,
      ...Array<string>(missing).fill("\u00a0"),
    ];
    return padded.map((character, position) => (
      <span
        key={`${layer}-${position}-${character}`}
        className="inline-block whitespace-pre [backface-visibility:hidden] [will-change:transform,opacity]"
      >
        {character === " " ? "\u00a0" : character}
      </span>
    ));
  };

  const shellClassName = cn(
    "relative inline-grid cursor-pointer select-none border-0 bg-transparent p-0 align-baseline font-[inherit] leading-[inherit] tracking-[inherit] text-[inherit]",
    "rounded-[0.08em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/30 focus-visible:ring-offset-2",
    className,
  );

  const interaction = {
    onMouseEnter: () => updateSwap(true),
    onMouseLeave: () => updateSwap(false),
    onFocus: (event: React.FocusEvent<HTMLElement>) => {
      if (event.currentTarget.matches(":focus-visible")) updateSwap(true);
    },
    onBlur: () => updateSwap(false),
    onPointerUp: (event: React.PointerEvent<HTMLElement>) => {
      if (event.pointerType !== "mouse") updateSwap(true);
    },
  };

  const layers = (
    <span className="col-start-1 row-start-1 inline-grid overflow-hidden [perspective:800px]">
      <span
        ref={outgoingRef}
        className="col-start-1 row-start-1 inline-flex items-baseline justify-start gap-[0.012em] whitespace-pre"
        aria-hidden="true"
      >
        {renderCharacters(words[index], "outgoing")}
      </span>
      <span
        ref={incomingRef}
        className={cn(
          "col-start-1 row-start-1 inline-flex items-baseline justify-start gap-[0.012em] whitespace-pre",
          toClassName,
        )}
        aria-hidden="true"
        style={toStyle}
      >
        {renderCharacters(words[nextIndex], "incoming")}
      </span>
    </span>
  );

  const name = label ?? words[index];

  // A link must not nest inside an existing anchor, so the component renders
  // itself as the anchor when href is given.
  if (href) {
    return (
      <a
        ref={containerRef as RefObject<HTMLAnchorElement>}
        href={href}
        className={shellClassName}
        aria-label={name}
        style={style}
        {...interaction}
      >
        {layers}
      </a>
    );
  }

  return (
    <button
      ref={containerRef as RefObject<HTMLButtonElement>}
      type="button"
      className={shellClassName}
      aria-label={name}
      aria-pressed={isSwapped}
      style={style}
      {...interaction}
    >
      {layers}
    </button>
  );
}