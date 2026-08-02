/**
 * Decides whether this device gets the WebGL constellation.
 *
 * The bias is deliberately conservative: the SVG constellation is the real
 * thing, complete and interactive, so declining the upgrade costs a visitor
 * nothing. Shipping a stuttering WebGL scene to a mid-range Android, on the
 * other hand, costs them battery and costs the site its credibility.
 */

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

export function canRenderWebGL(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Reduced motion. An animated scene is exactly what they asked not to see.
  if (document.documentElement.getAttribute("data-motion") === "reduce") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  // 2. Data saver / slow connection — don't spend their bytes on decoration.
  const connection = (
    navigator as Navigator & { connection?: NetworkInformation }
  ).connection;
  if (connection?.saveData) return false;
  if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return false;

  // 3. Device capability. These are hints, not guarantees, and both are absent
  //    on Safari — hence the frame-rate watchdog in the renderer itself, which
  //    is the check that actually protects the visitor.
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof memory === "number" && memory < 4) return false;

  const cores = navigator.hardwareConcurrency;
  if (typeof cores === "number" && cores < 4) return false;

  // 4. Small screens: the constellation is a fraction of the viewport there,
  //    so the upgrade is barely visible and the cost is the same.
  if (window.matchMedia("(max-width: 640px)").matches) return false;

  // 5. WebGL2 itself. Probe on a throwaway canvas and release it immediately.
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) return false;
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}
