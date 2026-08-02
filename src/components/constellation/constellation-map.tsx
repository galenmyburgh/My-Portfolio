"use client";

import { useId, useMemo, useState } from "react";

import { categories } from "@/content/tech";
import { constellation, type Node } from "@/lib/constellation";

/**
 * The constellation, as SVG.
 *
 * This is the *default* renderer, not a fallback — it ships on every device, is
 * a few KB, needs no WebGL, and carries the full interaction. The 3D layer
 * upgrades it on capable hardware; nothing is lost if it never loads.
 *
 * Accessibility approach: the edges are a decorative SVG layer, and every node
 * is a real positioned <button>. That means tab order, focus rings, Enter and
 * Space, and screen reader semantics all work without reimplementing them.
 */

type Props = {
  selected: string | null;
  onSelect: (id: string | null) => void;
  /** Tech ids to emphasise — everything else dims. */
  related?: Set<string>;
  /**
   * False when the WebGL layer is drawing the nodes and edges. The buttons stay
   * — they are still the entire interaction and accessibility surface — they
   * just stop painting anything on top of the canvas.
   */
  showDots?: boolean;
  className?: string;
};

// -1..1 → 0..100%, with padding so nodes near the edge aren't clipped.
// Rounded so the SSR markup and the hydrated markup serialise identically.
const toPercent = (v: number) => Math.round((50 + v * 44) * 1e3) / 1e3;

export function ConstellationMap({
  selected,
  onSelect,
  related,
  showDots = true,
  className,
}: Props) {
  const titleId = useId();
  const [hovered, setHovered] = useState<string | null>(null);
  const { nodes, edges } = constellation;

  const active = hovered ?? selected;

  const neighbours = useMemo(() => {
    if (!active) return null;
    const set = new Set<string>([active]);
    for (const { from, to } of edges) {
      if (from.id === active) set.add(to.id);
      if (to.id === active) set.add(from.id);
    }
    return set;
  }, [active, edges]);

  const isDimmed = (node: Node) => {
    if (related && !related.has(node.id)) return true;
    if (neighbours && !neighbours.has(node.id)) return true;
    return false;
  };

  const activeNode = active ? nodes.find((n) => n.id === active) : null;

  return (
    <div className={`relative aspect-square w-full ${className ?? ""}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full transition-opacity duration-700"
        style={{ opacity: showDots ? 1 : 0 }}
      >
        <title id={titleId}>Technology relationship map</title>
        {edges.map(({ from, to }, i) => {
          const lit = neighbours ? neighbours.has(from.id) && neighbours.has(to.id) : false;
          return (
            <line
              key={i}
              x1={toPercent(from.x)}
              y1={toPercent(from.y)}
              x2={toPercent(to.x)}
              y2={toPercent(to.y)}
              stroke={lit ? "var(--accent)" : "var(--edge)"}
              strokeWidth={lit ? 0.34 : 0.16}
              opacity={neighbours ? (lit ? 0.95 : 0.14) : 0.42}
              className="transition-[opacity,stroke-width] duration-300"
            />
          );
        })}
      </svg>

      {/*
        Below 640px the map is a ~370px square holding forty nodes. Tap targets
        that size necessarily overlap, so on phones the map is decorative and
        the technology list below it is the control. Above 640px the nodes are
        real buttons and the list is the secondary path.
      */}
      <ul className="absolute inset-0 hidden list-none sm:block">
        {nodes.map((node) => {
          const dimmed = isDimmed(node);
          const isSelected = selected === node.id;
          const size = node.r * 2;

          return (
            <li
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${toPercent(node.x)}%`, top: `${toPercent(node.y)}%` }}
            >
              <button
                type="button"
                onClick={() => onSelect(isSelected ? null : node.id)}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                aria-pressed={isSelected}
                title={node.note}
                className="group relative grid place-items-center rounded-full transition-opacity duration-300"
                style={{
                  // 28px rather than the usual 44px minimum. At 44px the hit
                  // areas of 40 clustered nodes overlap each other, so the
                  // *effective* target ends up smaller than the nominal one.
                  // The full-size equivalent control is the technology list
                  // below the map, which is what WCAG 2.5.8 asks for.
                  width: `max(${size}px, 1.75rem)`,
                  height: `max(${size}px, 1.75rem)`,
                  opacity: dimmed ? 0.28 : 1,
                }}
              >
                {/* Touch target stays 44px even when the dot is small. */}
                <span
                  aria-hidden="true"
                  className="rounded-full transition-[transform,opacity] duration-300 group-hover:scale-125 group-focus-visible:scale-125"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    // When WebGL is drawing, keep a ring on hover/focus/selection
                    // so the interaction still has a visible target, but leave
                    // the resting dot to the canvas.
                    opacity: showDots || isSelected || hovered === node.id ? 1 : 0,
                    backgroundColor: showDots ? categories[node.category].color : "transparent",
                    boxShadow: isSelected
                      ? `0 0 0 3px var(--canvas), 0 0 0 5px ${categories[node.category].color}`
                      : showDots
                        ? `0 0 ${node.r * 1.6}px ${categories[node.category].color}`
                        : `0 0 0 2px ${categories[node.category].color}`,
                  }}
                />
                <span className="sr-only">
                  {node.name} — {categories[node.category].label}. {node.note}
                  {isSelected ? " (filter active)" : ""}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Phone-sized decorative layer, matching the buttons above it exactly. */}
      <div aria-hidden="true" className="absolute inset-0 sm:hidden">
        {showDots &&
          nodes.map((node) => (
            <span
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${toPercent(node.x)}%`,
                top: `${toPercent(node.y)}%`,
                width: `${node.r * 2}px`,
                height: `${node.r * 2}px`,
                backgroundColor: categories[node.category].color,
                opacity: selected && selected !== node.id ? 0.3 : 1,
              }}
            />
          ))}
      </div>

      {/* Tooltip. Rendered outside the buttons so it is never clipped by them,
          and aria-hidden because the button's own label already says all this. */}
      {activeNode && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute z-10 w-52 -translate-x-1/2 rounded-lg border border-hairline bg-raised p-3 shadow-lg"
          style={{
            left: `${Math.min(Math.max(toPercent(activeNode.x), 18), 82)}%`,
            top: `calc(${toPercent(activeNode.y)}% + ${activeNode.r + 14}px)`,
          }}
        >
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: categories[activeNode.category].color }}
            />
            {activeNode.name}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted">{activeNode.note}</p>
        </div>
      )}
    </div>
  );
}
