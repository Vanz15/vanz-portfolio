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
 * With `parts`, the elements inside each child cascade as well — the rule,
 * label, heading and copy of a card arrive one after another and leave the same
 * way. Each child then carries its own timeline (see `.stagger-parts`), so a
 * dozen lines never share one schedule. The child itself only slides: fading it
 * would fade its lines as one group and undo the sequence.
 *
 * Children must be block-level; inline elements cannot be transformed reliably.
 */
export function Stagger({
  children,
  className,
  as: Tag = "div",
  parts = false,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "dl" | "blockquote";
  /** Cascade the elements inside each child too, not only the children. */
  parts?: boolean;
}) {
  const indexed = Children.toArray(children).map((child, i) => {
    if (!isValidElement(child)) return child;

    const el = child as React.ReactElement<{
      style?: React.CSSProperties;
      children?: ReactNode;
    }>;
    const style = el.props.style;

    if (!parts) {
      return cloneElement(el, { style: { ...style, "--i": i } as React.CSSProperties });
    }

    // `--c` is the card's column slot: its own top rule is the first thing to
    // travel, then its lines follow from slot 1 — while the columns still
    // cascade across the grid instead of all three moving as one row.
    const inner = Children.toArray(el.props.children).map((part, j) => {
      if (!isValidElement(part)) return part;
      const partEl = part as React.ReactElement<{ style?: React.CSSProperties }>;
      return cloneElement(partEl, {
        style: {
          ...(partEl.props as { style?: React.CSSProperties }).style,
          "--i": j + 1,
          "--c": i,
        } as React.CSSProperties,
      });
    });

    return cloneElement(
      el,
      { style: { ...style, "--c": i } as React.CSSProperties },
      inner,
    );
  });

  return (
    <Tag className={cn("stagger", parts && "stagger-parts", className)}>
      {indexed}
    </Tag>
  );
}