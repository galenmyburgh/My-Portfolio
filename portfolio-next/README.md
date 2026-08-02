# Portfolio — Galen Myburgh

Next.js 16 (App Router), TypeScript, Tailwind v4, with an optional WebGL layer.

```bash
npm install
cp .env.example .env.local     # set NEXT_PUBLIC_SITE_URL at minimum
npm run dev
```

| Script               | What it does                                                          |
| -------------------- | --------------------------------------------------------------------- |
| `npm run dev`        | Dev server                                                            |
| `npm run build`      | Production build (throws without `NEXT_PUBLIC_SITE_URL`)              |
| `npm run check`      | Typecheck + lint + build                                              |
| `npm run audit:a11y` | axe on every route, both themes; exits non-zero on any violation      |

The a11y audit runs against the production server, not `next dev`:

```bash
npm run build && npm start &
AUDIT_URL=http://localhost:3000 npm run audit:a11y
```

## Environment

| Variable               | Required     | Notes                                                                                                         |
| ---------------------- | ------------ | ------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | yes          | Absolute origin, no trailing slash. Canonicals, OG tags and the sitemap derive from it. The build fails loudly without it rather than shipping localhost canonicals. |
| `RESEND_API_KEY`       | for the form | Server-side only. Without it the contact form tells visitors to email directly instead of failing silently.    |
| `CONTACT_TO_EMAIL`     | no           | Defaults to the address in `src/lib/site.ts`.                                                                 |

## Where the content lives

All copy is data. Nothing user-facing is hard-coded in a component.

```
src/content/
  tech.ts      Technology graph — drives the constellation, /work filters, tag colours
  work.ts      Case studies
  career.ts    Roles, education, certifications, hero stats
src/lib/site.ts  Name, tagline, socials, CV link
```

**Adding a technology** to `tech.ts` makes it appear as a constellation node, a
filter chip and a tag — in one colour, everywhere.

**Adding a case study** to `work.ts` gives you a card, a statically generated
page at `/work/<slug>`, a sitemap entry and full metadata. Include an
`architecture` block and the diagram lays itself out from nodes and edges — you
never write coordinates.

### Unfinished numbers

Outcomes marked `needsInput: true` are placeholders. They render visibly
unfinished in development and are **stripped from production builds**, so an
unfilled placeholder can never reach a visitor. `/work` lists what's outstanding
when running in development.

Every case study also carries `reviewNotes`, which is never rendered. It records
which claims came from the CV and which were inferred while drafting. Read it
before publishing — see `HANDOVER.md` in the repo root.

## Architecture notes

**Theme and motion.** An inline blocking script sets `data-theme` and
`data-motion` on `<html>` before first paint — no flash of the wrong theme. CSS
and JavaScript read those same two attributes, so they cannot disagree.
Components read them through `useSyncExternalStore`
(`src/lib/use-media-query.ts`) rather than mirroring them into React state.

**The constellation** renders three ways from one deterministic, seeded layout
(`src/lib/constellation.ts` — no `Math.random()` during render):

1. **SVG plus real HTML buttons.** The default. Ships everywhere, a few KB, and
   carries the entire interaction and accessibility surface.
2. **WebGL**, loaded only if `src/lib/capability.ts` approves — WebGL2, ≥4 GB
   RAM, ≥4 cores, not reduced-motion, not save-data, not a phone. It draws
   *visuals only*; the buttons stay on top, so the 3D version is never more
   capable or less accessible. A frame-rate watchdog switches it off if the
   device cannot hold ~40fps.
3. **Decorative dots** below 640px, where forty overlapping tap targets would be
   poor UI. The technology list becomes the control there.

Three's `Points` and `LineSegments` are used directly rather than pulling in
drei and postprocessing: the glow is a `smoothstep` in the fragment shader
instead of a bloom pass, which is the difference between a ~129 KB chunk and a
~250 KB one.

**Scroll reveal** uses one shared `IntersectionObserver` for the whole page and
is guarded behind `html.js`, so a JavaScript failure leaves content *visible*
rather than permanently transparent.

## Budgets

Lighthouse, mobile, simulated slow 4G, against `next start`:

| Metric               | Budget   | Actual                                 |
| -------------------- | -------- | -------------------------------------- |
| Performance          | ≥ 90     | 94–95                                  |
| Accessibility        | 100      | 100                                    |
| Best Practices       | 100      | 100                                    |
| SEO                  | 100      | 100                                    |
| CLS                  | < 0.05   | 0                                      |
| TBT                  | < 150 ms | 10 ms                                  |
| First-load JS (home) | < 130 KB | ~165 KB gz — see below                 |
| 3D chunk (deferred)  | < 200 KB | ~129 KB gz, never in the critical path |
| LCP (simulated 4G)   | < 2.0 s  | ~3.0 s — see below                     |

Two budgets are not met, for structural reasons rather than tuning ones:

- **First-load JS.** `/about`, which has almost no client code of its own,
  measures ~152 KB gzipped. That is the Next 16 App Router + React 19 baseline;
  application code adds only ~13 KB on the heaviest route. 130 KB is not
  reachable on this framework.
- **LCP.** *Observed* LCP is ~109 ms. The ~3.0 s figure is Lighthouse's
  simulated slow-4G projection and is dominated by the modelled transfer time of
  that same framework JavaScript. It comes out identical on desktop and mobile
  and across every route, which is the signature of the model rather than of the
  page.

If either number matters more than the framework does, the honest levers are
fewer client components or a lighter framework — not further tuning.
