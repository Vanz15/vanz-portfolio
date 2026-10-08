import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Wraps children so they animate in on arrival, and back out on departure.
 *
 * Two modes, because one timeline cannot cover both positions on the page:
 * - `scroll` (default) — `animation-timeline: view()`. Fades in on entry and
 *   out on exit, in both scroll directions. Correct for anything below the fold.
 * - `load` — a one-shot time-based fade for content already on screen at
 *   scroll 0. A view() timeline has no range left there, so those blocks would
 *   otherwise resolve to `animation-name: none` and simply appear.
 *
 * Children are cloned with `--i` so a `load` group cascades in order.
 */
export function Reveal({
  children,
  className,
  mode = "scroll",
}: {
  children: ReactNode;
  className?: string;
  mode?: "scroll" | "load";
}) {
  const cls = mode === "load" ? "reveal-in" : "reveal";
  const items = Children.toArray(children);

  if (mode !== "load" && items.length === 1) {
    return <div className={cn(cls, className)}>{items[0]}</div>;
  }

  const indexed = items.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {
            ...(child.props as { style?: React.CSSProperties }).style,
            "--i": i,
          } as React.CSSProperties,
        })
      : child,
  );

  return <div className={cn(cls, className)}>{indexed}</div>;
}
