import { cn } from "@/lib/utils";

/**
 * Fades its child in on viewport entry and back out on exit, in both scroll
 * directions. Driven by `animation-timeline: view()` in globals.css — no JS.
 *
 * No `delay` prop: phase comes from viewport position, not elapsed time. Use
 * <Stagger> to cascade siblings.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("reveal", className)}>{children}</div>;
}