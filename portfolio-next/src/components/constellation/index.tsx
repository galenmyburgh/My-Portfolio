"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { ConstellationMap } from "./constellation-map";
import { canRenderWebGL } from "@/lib/capability";

/**
 * The constellation, with its optional upgrade.
 *
 * Order of events:
 *   1. Server renders the SVG constellation. Complete and interactive.
 *   2. On the client, a capability check runs.
 *   3. If it passes, the WebGL chunk is fetched and rendered *behind* the
 *      buttons; the SVG dots fade out and the buttons become invisible hit
 *      targets over the canvas.
 *
 * The 3D chunk is never in the critical path, and if it fails to load, throws,
 * or is too slow, step 1 is still on screen.
 */

const ConstellationGL = dynamic(
  () => import("./constellation-gl").then((m) => m.ConstellationGL),
  { ssr: false }
);

export function Constellation({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  const [enhanced, setEnhanced] = useState(false);

  useEffect(() => {
    // Defer past first paint so the check never competes with LCP.
    const schedule =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 400));
    const handle = schedule(() => setEnhanced(canRenderWebGL()));

    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
  }, []);

  return (
    <div className="relative aspect-square w-full">
      {enhanced && <ConstellationGL className="absolute inset-0 size-full" />}
      <ConstellationMap
        selected={selected}
        onSelect={onSelect}
        showDots={!enhanced}
        className="absolute inset-0"
      />
    </div>
  );
}
