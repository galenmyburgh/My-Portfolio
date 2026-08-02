/**
 * Accessibility gate.
 *
 * Loads every route in a headless browser, in both themes, and fails the run on
 * any WCAG 2.0/2.1 A or AA violation.
 *
 * Two things this gets right that a naive setup does not:
 *
 *  1. The theme is set through localStorage *before* the page loads, so the
 *     blocking theme script applies it on the first paint. Flipping the theme
 *     after load means axe samples colours mid-transition and reports contrast
 *     failures that do not exist.
 *  2. It runs against `next start`, not `next dev`, because the dev overlay
 *     injects its own markup.
 *
 * Usage:  npm run build && npm start &   then   npm run audit:a11y
 */

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const BASE = process.env.AUDIT_URL ?? "http://localhost:3000";

const ROUTES = [
  "/",
  "/work",
  "/work/payflex",
  "/work/tripleblue-rebuild",
  "/work/athlenote",
  "/work/camera-analytics",
  "/work/cw-guarding",
  "/work/mewzo",
  "/about",
  "/services",
  "/lab",
  "/uses",
  "/contact",
  "/this-route-does-not-exist",
];

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

const browser = await chromium.launch();
let failures = 0;

for (const theme of ["light", "dark"]) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  // Runs before any page script, so the theme is correct on the first paint.
  await context.addInitScript((value) => {
    try {
      localStorage.setItem("theme", value);
    } catch {}
  }, theme);

  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });

    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();

    if (violations.length > 0) {
      failures += violations.length;
      console.error(`\n✗ ${theme}  ${route}`);
      for (const v of violations) {
        console.error(`    [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node(s))`);
        for (const node of v.nodes.slice(0, 3)) {
          console.error(`        ${node.target.join(" ")}`);
        }
      }
    } else {
      console.log(`✓ ${theme}  ${route}`);
    }
  }

  await context.close();
}

await browser.close();

if (failures > 0) {
  console.error(`\n${failures} accessibility violation(s). Failing.`);
  process.exit(1);
}

console.log(`\nNo violations across ${ROUTES.length} routes × 2 themes.`);
