"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { techById, type CategoryId } from "@/content/tech";
import { canRenderWebGL } from "@/lib/capability";

const BackdropGL = dynamic(() => import("./backdrop-gl").then((m) => m.BackdropGL), {
  ssr: false,
});

/**
 * Full-bleed WebGL field behind the hero.
 *
 * Three things keep this from being the usual "impressive shader, unreadable
 * page" trade:
 *
 *   1. It never ships unless `canRenderWebGL()` says yes — same gate as the
 *      constellation, so reduced-motion, save-data, low-memory and phones all
 *      get nothing, and nothing is lost because it carries no content.
 *   2. It loads after first paint, so it cannot delay LCP. The headline is the
 *      LCP element and it is plain server-rendered HTML.
 *   3. A scrim sits between the canvas and the text. The shader's own alpha is
 *      already biased down on the light theme; this guarantees the contrast
 *      ratio regardless of what the noise happens to be doing.
 */
export function HeroBackdrop({ selected }: { selected: string | null }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const schedule =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
    const handle = schedule(() => setEnabled(canRenderWebGL()));
    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
  }, []);

  const selectedCategory: CategoryId | null = selected
    ? (techById.get(selected)?.category ?? null)
    : null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {enabled && (
        <div className="absolute inset-0 animate-[fadeIn_1.2s_ease-out]">
          <BackdropGL selectedCategory={selectedCategory} />
        </div>
      )}

      {/* Readability scrim. Vertical gradient so the field is strongest at the
          top and clears out before the body copy and the stats row. */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas/20 via-canvas/45 to-canvas" />

      {/* Horizontal falloff on the text side only, so the constellation on the
          right keeps its contrast against the field. */}
      <div className="absolute inset-0 bg-gradient-to-r from-canvas/95 via-canvas/55 to-transparent lg:via-canvas/25" />
    </div>
  );
}
