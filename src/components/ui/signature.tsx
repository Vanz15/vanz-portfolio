"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
// opentype.js ships CommonJS with no default export, so the namespace import is
// what actually binds — `import opentype from` fails the production build.
import * as opentype from "opentype.js";
import { cn } from "@/lib/utils";

interface SignatureProps {
  /** Text to generate signature for */
  text?: string;
  /** Color of the signature path */
  color?: string;
  /** Font size of the signature */
  fontSize?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view */
  inView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
}

export function Signature({
  text = "Signature",
  color = "currentColor",
  fontSize = 32,
  duration = 1.5,
  delay = 0,
  className,
  inView = false,
  once = true,
  fontUrl,
}: SignatureProps) {
  const [paths, setPaths] = useState<string[]>([]);
  // Real ink bounds of the rendered outlines. Everything else about the box is
  // a guess that this face breaks.
  const [bounds, setBounds] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const horizontalPadding = fontSize * 0.1;
  const topMargin = fontSize * 1.5; // Shift down
  const baseline = topMargin;
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    async function load() {
      try {
        let font;
        const fontPaths = fontUrl
          ? [fontUrl]
          : ["/LastoriaBoldRegular.otf"];

        for (const path of fontPaths) {
          try {
            // opentype 2.x deprecates load() in favour of fetching the buffer
            // and parsing it, so fetch first and parse locally.
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            font = opentype.parse(await response.arrayBuffer());
            break;
          } catch {
            // Try next path
          }
        }

        if (!font) {
          throw new Error("Font could not be loaded from any path");
        }

        let x = horizontalPadding;
        const newPaths: string[] = [];
        // Measured against the real outlines, not assumed. This face has
        // ascenders that rise above the assumed baseline box and a descender
        // that falls below it, so a fixed fontSize * 3 window clips the A.
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (const char of text) {
          const glyph = font.charToGlyph(char);
          const path = glyph.getPath(x, baseline, fontSize);
          const box = path.getBoundingBox();
          minX = Math.min(minX, box.x1);
          minY = Math.min(minY, box.y1);
          maxX = Math.max(maxX, box.x2);
          maxY = Math.max(maxY, box.y2);
          newPaths.push(path.toPathData(3));

          const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
          x += advanceWidth * (fontSize / font.unitsPerEm);
        }

        if (!Number.isFinite(minX)) throw new Error("No glyph outlines");

        const pad = fontSize * 0.12;
        setPaths(newPaths);
        setBounds({
          x: minX - pad,
          y: minY - pad,
          width: maxX - minX + pad * 2,
          height: maxY - minY + pad * 2,
        });
      } catch (error) {
        console.error("Signature component font load error:", error);
        setPaths([]);
        setBounds(null);
      }
    }

    load();
  }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  // Nothing can be drawn until the OTF has resolved in the browser, and on a
// failed load nothing ever will be. Either way the SVG would be an empty box, so
// fall back to the plain wordmark until there are glyph outlines to stroke.
if (paths.length === 0 || !bounds) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-full w-full items-center justify-center font-semibold uppercase leading-[0.8] text-foreground/90",
        "text-[clamp(2.5rem,12vw,11rem)]",
        className,
      )}
    >
      {text}
    </span>
  );
}

return (
    <motion.svg
      key={paths.length}
      viewBox={`${bounds.x} ${bounds.y} ${bounds.width} ${bounds.height}`}
      fill="none"
      className={cn("text-foreground overflow-visible", className)}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="white"
              strokeWidth={fontSize * 0.22}
              fill="none"
              variants={variants}
              transition={{
                pathLength: {
                  delay: delay + i * 0.2,
                  duration,
                  ease: "easeInOut",
                },
                opacity: {
                  delay: delay + i * 0.2 + 0.01,
                  duration: 0.01,
                },
              }}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </mask>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={2}
          fill="none"
          variants={variants}
          transition={{
            pathLength: {
              delay: delay + i * 0.2,
              duration,
              ease: "easeInOut",
            },
            opacity: {
              delay: delay + i * 0.2 + 0.01,
              duration: 0.01,
            },
          }}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      ))}

      {/* Neighbouring glyphs meet along two hairline edges ~1.3 user units apart, a
          break that shows once the SVG is scaled up. A stroke in user units
          (not non-scaling-stroke, so it scales with the drawing) closes them. */}
      <g mask={`url(#${maskId})`}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill={color}
            stroke={color}
            strokeWidth={fontSize * 0.06}
            strokeLinejoin="round"
          />
        ))}
      </g>
    </motion.svg>
  );
}
