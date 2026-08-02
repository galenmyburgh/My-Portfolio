"use client";

import { useEffect, useRef, useState } from "react";

import type { CaseStudy } from "@/content/work";

type Architecture = NonNullable<CaseStudy["architecture"]>;

const kindStyles = {
  client: { fill: "var(--wash)", stroke: "var(--accent)" },
  service: { fill: "var(--raised)", stroke: "var(--edge)" },
  store: { fill: "var(--raised)", stroke: "var(--cat-data)" },
  external: { fill: "transparent", stroke: "var(--faint)" },
} as const;

const NODE_W = 148;
const NODE_H = 46;
const COL_GAP = 66;
const ROW_GAP = 22;

/**
 * Architecture diagram that draws itself in on scroll.
 *
 * Deliberately SVG rather than WebGL — this is the highest-value illustration
 * on the site for a peer developer, and it needs to be crisp at any zoom,
 * selectable, printable and readable without a GPU.
 *
 * Layout is a simple longest-path layering: a node sits one column right of
 * everything that feeds it. Good enough for diagrams this size, and it means
 * the content file only has to describe nodes and edges, not coordinates.
 */
export function ArchitectureDiagram({
  architecture,
  caption,
}: {
  architecture: Architecture;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No reduced-motion branch needed: the CSS already collapses these
    // transitions to zero under data-motion="reduce", so the diagram simply
    // appears complete the moment it scrolls into view.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  const { nodes, edges } = architecture;

  // Assign each node to a column: one past the deepest of its inputs.
  const column = new Map<string, number>();
  for (const n of nodes) column.set(n.id, 0);
  for (let pass = 0; pass < nodes.length; pass++) {
    let changed = false;
    for (const e of edges) {
      const next = (column.get(e.from) ?? 0) + 1;
      if (next > (column.get(e.to) ?? 0)) {
        column.set(e.to, next);
        changed = true;
      }
    }
    if (!changed) break;
  }

  const columns = new Map<number, string[]>();
  for (const n of nodes) {
    const c = column.get(n.id) ?? 0;
    columns.set(c, [...(columns.get(c) ?? []), n.id]);
  }

  const position = new Map<string, { x: number; y: number }>();
  const tallest = Math.max(...[...columns.values()].map((c) => c.length));

  for (const [col, ids] of columns) {
    const height = ids.length * NODE_H + (ids.length - 1) * ROW_GAP;
    const top = (tallest * NODE_H + (tallest - 1) * ROW_GAP - height) / 2;
    ids.forEach((id, i) => {
      position.set(id, {
        x: col * (NODE_W + COL_GAP),
        y: top + i * (NODE_H + ROW_GAP),
      });
    });
  }

  const width = (Math.max(...columns.keys()) + 1) * (NODE_W + COL_GAP) - COL_GAP;
  const height = tallest * NODE_H + (tallest - 1) * ROW_GAP;

  return (
    <figure ref={ref} className="my-10">
      <div
        className="overflow-x-auto rounded-xl border border-hairline bg-surface p-5"
        // Scrollable regions need to be keyboard-reachable, otherwise a keyboard
        // user can never see the right-hand side of a wide diagram.
        tabIndex={0}
        role="region"
        aria-label={caption}
      >
        <svg
          viewBox={`-8 -8 ${width + 16} ${height + 16}`}
          role="img"
          aria-label={caption}
          className="h-auto w-full"
          // Hold the diagram at its natural size and let the wrapper scroll.
          // Scaling to fit made a five-column diagram render at 8px text — the
          // whole point of this illustration is that it is readable.
          style={{ minWidth: `${width}px` }}
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L8 4 L0 8 z" fill="var(--faint)" />
            </marker>
          </defs>

          {edges.map((edge, i) => {
            const a = position.get(edge.from);
            const b = position.get(edge.to);
            if (!a || !b) return null;

            const x1 = a.x + NODE_W;
            const y1 = a.y + NODE_H / 2;
            const x2 = b.x;
            const y2 = b.y + NODE_H / 2;
            const mid = (x1 + x2) / 2;
            const d = `M ${x1} ${y1} C ${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;

            return (
              <g key={`${edge.from}-${edge.to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--edge)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrow)"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={drawn ? 0 : 1}
                  style={{
                    transition: "stroke-dashoffset 700ms var(--ease-out-expo)",
                    transitionDelay: `${200 + i * 110}ms`,
                  }}
                />
                {edge.label && (
                  <text
                    x={mid}
                    y={(y1 + y2) / 2 - 6}
                    textAnchor="middle"
                    className="fill-[var(--faint)] font-mono"
                    style={{
                      fontSize: 10,
                      opacity: drawn ? 1 : 0,
                      transition: "opacity 400ms",
                      transitionDelay: `${500 + i * 110}ms`,
                    }}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {nodes.map((node, i) => {
            const p = position.get(node.id);
            if (!p) return null;
            const style = kindStyles[node.kind];

            return (
              <g
                key={node.id}
                style={{
                  opacity: drawn ? 1 : 0,
                  transition: "opacity 400ms var(--ease-out-expo)",
                  transitionDelay: `${i * 70}ms`,
                }}
              >
                <rect
                  x={p.x}
                  y={p.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={8}
                  fill={style.fill}
                  stroke={style.stroke}
                  strokeWidth="1.5"
                  strokeDasharray={node.kind === "external" ? "4 3" : undefined}
                />
                <text
                  x={p.x + NODE_W / 2}
                  y={p.y + NODE_H / 2 + 4}
                  textAnchor="middle"
                  className="fill-[var(--ink)]"
                  style={{ fontSize: 12.5, fontWeight: 500 }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption className="mt-2 text-sm text-faint">{caption}</figcaption>
    </figure>
  );
}
