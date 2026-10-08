import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveals its children one line at a time as the group scrolls through view,
 * then hides them again in reverse order on the way out.
 *
 * Children are cloned with an `--i` index and `globals.css` animates each one
 * over its own slice of a shared view-timeline. Phase comes from scroll
 * position, not elapsed time, so the sequence reverses correctly on scroll-up.
 *
 * Wrapped text works: a multi-line child still animates as one block, so split
 * paragraphs into one element per line before passing them in.
 */
export function RevealLines({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl" | "blockquote";
}) {
  const indexed = Children.toArray(children).map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: {
            ...(child.props as { style?: React.CSSProperties }).style,
            "--i": i,
          } as React.CSSProperties,
        })
      : child,
  );

  return <Tag className={cn("reveal-lines", className)}>{indexed}</Tag>;
}
