import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Cascades its direct children on scroll: each fades up just after the one above
 * it, then back out in the same order on the way out.
 *
 * The child index is written to `--i` and the offsets live in one CSS rule
 * (`.stagger > *`), so call sites stay declarative. Children are cloned, not
 * wrapped, so they remain direct DOM children — a wrapper would break both the
 * `> *` selector and the parent's layout.
 *
 * Children must be block-level; inline elements cannot be transformed reliably.
 */
export function Stagger({
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

  return <Tag className={cn("stagger", className)}>{indexed}</Tag>;
}