import { tech, techEdges, type Tech } from "@/content/tech";

/**
 * Layout for the hero constellation.
 *
 * Computed once, deterministically, and shared by both renderers — the SVG
 * fallback and the WebGL version draw the *same* constellation, so upgrading
 * from one to the other is not a visual jump.
 *
 * Determinism matters for a second reason: the old site called Math.random()
 * during render, so every state change teleported the particles. A seeded PRNG
 * gives the organic scatter without that.
 */

/** mulberry32 — small, fast, and stable across runs. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Node = Tech & {
  /** Normalised to -1..1 on both axes, and -1..1 depth. */
  x: number;
  y: number;
  z: number;
  /** Render radius, derived from weight. */
  r: number;
};

export type Edge = { from: Node; to: Node };

/**
 * Categories are laid out as loose clusters around the centre so that related
 * technologies sit near each other and the edges between them stay short —
 * a random scatter produces a hairball, which reads as decoration.
 */
const CLUSTER_ORDER = ["mobile", "web", "data", "cloud", "ai", "hardware"] as const;

// Evenly spaced around the centre, starting at the top. Derived rather than
// hand-tuned so adding a category re-balances the whole layout instead of
// dropping a cluster on top of an existing one.
const clusterAngles: Record<string, number> = Object.fromEntries(
  CLUSTER_ORDER.map((id, i) => [id, -Math.PI / 2 + (i * 2 * Math.PI) / CLUSTER_ORDER.length])
);

export function buildConstellation(): { nodes: Node[]; edges: Edge[] } {
  const rand = seeded(20260802);

  const byCategory = new Map<string, Tech[]>();
  for (const t of tech) {
    const list = byCategory.get(t.category) ?? [];
    list.push(t);
    byCategory.set(t.category, list);
  }

  const nodes: Node[] = [];

  for (const [category, members] of byCategory) {
    const base = clusterAngles[category] ?? 0;
    // Cluster centre, pushed out from the origin.
    const cx = Math.cos(base) * 0.52;
    const cy = Math.sin(base) * 0.42;

    members.forEach((t, i) => {
      // Spread members around their cluster centre on a golden-angle spiral,
      // which fills space evenly without the banding a uniform ring gives.
      const angle = i * 2.399963 + rand() * 0.6;
      const spread = 0.16 + Math.sqrt(i / Math.max(members.length, 1)) * 0.34;

      nodes.push({
        ...t,
        // Rounded on purpose. Full-precision floats serialise differently in
        // the SSR HTML and the client's style attribute ("65.1580948065175%"
        // vs "65.1581%"), which React reports as a hydration mismatch.
        x: round(clamp(cx + Math.cos(angle) * spread + (rand() - 0.5) * 0.06)),
        y: round(clamp(cy + Math.sin(angle) * spread * 0.82 + (rand() - 0.5) * 0.06)),
        z: round((rand() - 0.5) * 1.6),
        // Heavier nodes read as more prominent, but the range is deliberately
        // narrow — the sizes should suggest depth, not shout it.
        r: round(3.1 + t.weight * 1.15),
      });
    });
  }

  // Relaxation pass.
  //
  // Clustered layout looks right but packs nodes close enough that their 28px
  // hit areas overlap, and an overlapped target is a smaller *effective* target
  // — which is a real WCAG 2.5.8 failure, not a technicality. A few iterations
  // of pushing apart any pair closer than `MIN_SEPARATION` fixes it while
  // leaving the cluster structure intact.
  //
  // 0.135 units ≈ 32px in the rendered map at its usual desktop size.
  const MIN_SEPARATION = 0.135;

  for (let pass = 0; pass < 60; pass++) {
    let moved = false;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) || 0.0001;
        if (dist >= MIN_SEPARATION) continue;

        const push = (MIN_SEPARATION - dist) / 2;
        const nx = (dx / dist) * push;
        const ny = (dy / dist) * push;

        a.x = clamp(a.x - nx);
        a.y = clamp(a.y - ny);
        b.x = clamp(b.x + nx);
        b.y = clamp(b.y + ny);
        moved = true;
      }
    }

    if (!moved) break;
  }

  // Re-round after relaxation, or the hydration mismatch comes back.
  for (const n of nodes) {
    n.x = round(n.x);
    n.y = round(n.y);
  }

  const index = new Map(nodes.map((n) => [n.id, n]));

  const edges: Edge[] = [];
  for (const [a, b] of techEdges) {
    const from = index.get(a);
    const to = index.get(b);
    if (from && to) edges.push({ from, to });
  }

  return { nodes, edges };
}

const clamp = (v: number) => Math.max(-0.97, Math.min(0.97, v));

/** Four decimals is well below a sub-pixel at any realistic viewport width. */
const round = (v: number) => Math.round(v * 1e4) / 1e4;

/** Precomputed once at module load — this never changes between renders. */
export const constellation = buildConstellation();

/** Which case studies use a given technology. Powers click-to-filter. */
export function studiesUsing(techId: string, studies: { slug: string; stack: string[] }[]) {
  return studies.filter((s) => s.stack.includes(techId)).map((s) => s.slug);
}
