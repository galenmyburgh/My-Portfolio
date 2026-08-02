<div align="center">

<img src="public/logos/codelyn.svg" width="76" alt="" />

# galenmyburgh.com

**A portfolio that tries to be a portfolio piece.**

Mobile &amp; web developer in Pretoria — Flutter and React, payments and NFC, AI products.

[**Live site**](https://galenmyburgh.com) · [Case studies](https://galenmyburgh.com/work) · [About](https://galenmyburgh.com/about) · [Lab](https://galenmyburgh.com/lab)

<br />

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-087EA4?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Three.js](https://img.shields.io/badge/three.js-WebGL-000000?style=for-the-badge&logo=threedotjs&logoColor=white)

<br />

<table>
<tr>
<td align="center"><strong>92–95</strong><br /><sub>Lighthouse<br />performance</sub></td>
<td align="center"><strong>100</strong><br /><sub>Accessibility</sub></td>
<td align="center"><strong>100</strong><br /><sub>Best practices</sub></td>
<td align="center"><strong>100</strong><br /><sub>SEO</sub></td>
<td align="center"><strong>0</strong><br /><sub>Layout shift</sub></td>
<td align="center"><strong>0</strong><br /><sub>axe violations<br />14 routes × 2 themes</sub></td>
</tr>
</table>

</div>

---

## The idea

Most developer portfolios *tell* you the person can build things. This one tries to *show* it, and the whole site is arranged around one decision:

> **Every visual element has to carry information. Nothing is decoration.**

The clearest expression of that is the hero. It looks like an ornamental particle field. It is actually the site's primary navigation:

- Every node is a technology I've shipped with, sized by depth of experience and coloured by category.
- Every edge is a **real** relationship from one of the case studies — `Flutter → NFC → Payments` traces the Batsamayi wallet; `Python → OpenCV → Computer Vision` traces the camera analytics work.
- **Clicking a node filters the case studies below it.**

Adding one entry to [`src/content/tech.ts`](src/content/tech.ts) makes a technology appear as a constellation node, a filter chip and a tag — one colour, everywhere, from one source of truth.

## Things worth opening DevTools for

<table>
<tr><td width="30%"><strong>3D that costs nothing</strong></td>
<td>The constellation renders three ways from one deterministic layout: <strong>SVG with real HTML buttons</strong> (the default, a few KB, carries the whole interaction), <strong>WebGL</strong> layered <em>behind those same buttons</em> on capable hardware, and <strong>decorative dots</strong> on phones where 40 overlapping tap targets would be bad UI. The 3D version is never more capable — or less accessible — than the SVG one.</td></tr>

<tr><td><strong>The hero field</strong></td>
<td>A full-bleed WebGL aurora behind the headline — domain-warped fBm, four octaves, rendered at a capped DPR of 1 because it's a soft gradient and nobody can tell. It is coloured by sampling <em>the same five category colours</em> the constellation uses, and <strong>select a technology and the field warms toward that category's colour</strong>. Without that it would just be a lava lamp.</td></tr>

<tr><td><strong>A frame-rate watchdog</strong></td>
<td>The WebGL layer samples its own frame times and switches itself off if the device can't hold ~40fps. The SVG constellation is already underneath it, so degrading costs the visitor nothing.</td></tr>

<tr><td><strong>No <code>drei</code>, no post-processing</strong></td>
<td>The glow is a <code>smoothstep</code> in the fragment shader rather than a bloom pass, and the scene is one <code>Points</code> draw call plus one <code>LineSegments</code>. That's a ~129 KB deferred chunk instead of ~250 KB — and it's never in the critical path.</td></tr>

<tr><td><strong>One motion switch</strong></td>
<td>A blocking script sets <code>data-theme</code> and <code>data-motion</code> on <code>&lt;html&gt;</code> before first paint. CSS and JavaScript read the <em>same two attributes</em>, so they cannot disagree about whether to animate. Components read them via <code>useSyncExternalStore</code> rather than mirroring them into React state.</td></tr>

<tr><td><strong>Fails visible, not blank</strong></td>
<td>Scroll-reveal is guarded behind <code>html.js</code>. If JavaScript fails, content is simply <em>visible</em> — the previous version of this site left the entire page at <code>opacity: 0</code> in that case.</td></tr>

<tr><td><strong>Self-laying-out diagrams</strong></td>
<td>Case studies describe their architecture as nodes and edges only. A longest-path layering assigns columns at render time and the diagram draws itself in on scroll, so adding a service is one line of data rather than a coordinate rewrite.</td></tr>

<tr><td><strong>Named tools, not "AI-first"</strong></td>
<td>Claude Code, Cursor, ChatGPT/Codex and Gemini are each a node in the graph with a note on <em>what it's actually for</em> — agentic multi-file work, inline editing, drafting, long-context reading. Anyone can claim to be AI-first; saying which tool earns its place in which situation is the part that isn't generic.</td></tr>

<tr><td><strong>Placeholders can't ship</strong></td>
<td>Unverified metrics are marked <code>needsInput</code> in the content layer. They render visibly unfinished in development and are <strong>stripped from production builds</strong>, so a <code>NUMBER NEEDED</code> can never reach a visitor.</td></tr>
</table>

## Stack

| | |
| --- | --- |
| **Framework** | Next.js 16.2 (App Router, React 19, Turbopack) |
| **Language** | TypeScript, strict |
| **Styling** | Tailwind v4 — tokens as CSS custom properties, zero runtime |
| **3D** | three.js directly, custom GLSL, behind a capability gate |
| **Content** | Typed modules — no CMS, no markdown pipeline |
| **Forms** | Server Action + Resend, with honeypot and rate limiting |
| **Quality** | ESLint, `tsc --noEmit`, axe via Playwright |

## Running it

```bash
npm install
npm run dev
```

| Script | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run check` | Typecheck → lint → build |
| `npm run audit:a11y` | axe on every route, both themes, non-zero exit on any violation |

Full detail in [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md).

## Two budgets I didn't hit

Worth stating plainly, because a portfolio that only reports its wins isn't evidence of anything:

- **First-load JS is ~165 KB gzipped** against a 130 KB target. A route with almost no client code of its own measures ~152 KB — that's the Next 16 + React 19 floor. Application code is ~13 KB of it. The target isn't reachable on this framework.
- **Lighthouse reports LCP ~3.0 s** against a 2.0 s target. *Observed* LCP is ~109 ms; the 3.0 s figure is Lighthouse's simulated slow-4G projection of that same framework payload. It comes out identical on desktop, mobile and every route — the signature of the model rather than the page.

Both are framework weight. Fixing them is a framework conversation, not a tuning one.

## Repo layout

```
src/app/           Routes — App Router
src/content/       All copy, as typed data — tech graph, case studies, career
src/components/    UI, including the three constellation renderers
src/lib/           Deterministic layout, capability detection, site config
scripts/a11y.mjs   The accessibility gate
public/logos/      Company marks, served locally rather than hotlinked
docs/              Developer documentation
```

<div align="center">
<sub>Built with Next.js and too much attention to frame time.</sub>
</div>
