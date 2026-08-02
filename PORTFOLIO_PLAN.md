# Portfolio Rebuild Plan — "Immersive"

**Owner:** Galen Myburgh
**Created:** 2 August 2026
**Direction chosen:** Next.js rebuild · Playful 3D / immersive · Audience = recruiters + freelance clients + peer developers
**Companion doc:** `PORTFOLIO_AUDIT.md`

---

## 0. The strategic idea

You asked for a site that *demonstrates* your skill rather than lists it. That reframes every decision below.

The current site **tells** people you're an "AI-First Developer, Automation Engineer, Mobile App Architect, Payments Integration Specialist…" — ten titles in a rotating banner. A recruiter reads ten titles as zero titles.

The new site should **show** it. Three principles:

1. **The site is the portfolio piece.** A 60fps WebGL hero that scores 90+ on mobile Lighthouse is a harder engineering problem than any of your listed projects. If a peer developer opens DevTools and finds clean code, lazy-loaded shaders and a proper reduced-motion path, that lands harder than a skills grid.
2. **Every project becomes a case study with a number in it.** Not "built with Flutter + Supabase" but "cut guard check-in time from 4 minutes to 20 seconds across 200+ sites." Screenshots are a gallery; outcomes are a portfolio.
3. **Three audiences, one spine, three exits.** Same scroll for everyone, but three distinct calls to action: *Download CV* (recruiters), *Book a call* (clients), *Read the code* (peers). Don't build three sites.

**Positioning to commit to** — drop from ten rotating titles to one line plus three rotating specialisms:

> **Galen Myburgh — I build production mobile & web systems that handle money, scale and mess.**
> *Flutter & React · Payments integration · AI-assisted automation*

---

## 1. Target architecture

```
Framework      Next.js 16.2 (App Router, React 19, Turbopack)
Language       TypeScript (strict)
Styling        Tailwind CSS v4 + CSS custom properties for theming
Components     shadcn/ui (Radix primitives — accessibility for free)
Animation      Motion (framer-motion successor) + CSS scroll-driven animations
3D             react-three-fiber 9 + drei + postprocessing
Content        MDX case studies via Contentlayer (or plain MDX + gray-matter)
Forms          Server Action + Resend  (replaces the exposed EmailJS keys)
Analytics      Vercel Analytics + Speed Insights
Hosting        Vercel  (keep Netlify as a fallback)
Testing        Vitest + Playwright (visual regression on the 3 key routes)
Quality gate   ESLint + Prettier + axe-core in CI + Lighthouse CI budget
```

**Why Next.js over staying on CRA:** CRA is deprecated and unmaintained. You get server rendering (so Google can index your case studies), `next/image` (which alone fixes the 3.7 MB image payload), automatic route-level code splitting (so the 3D bundle never blocks first paint), and file-based routing that makes every project deep-linkable. It is also the single most-asked-about framework in interviews — building on it is itself a signal.

**Why not stay on styled-components:** v5 has known React 18+ concurrent rendering issues and no React Server Component support. Tailwind v4 keeps your existing token vocabulary (you already have spacing/type/radius scales in `Themes.js`) but compiles to zero runtime.

### Route map

```
/                        Immersive home — hero, capability rail, featured work, CTA
/work                    Filterable case study index
/work/[slug]             Full case study  ← the important page, and currently missing entirely
/about                   Story, timeline, values, photo, downloadable CV
/services                Freelance offer — for the client audience
/lab                     Experiments, shaders, code snippets — for the peer audience
/uses                    Hardware + software stack (cheap credibility, peers love it)
/contact                 Form + calendar embed
/api/og/[slug]           Dynamic Open Graph image generation
```

---

## 2. The immersive layer — concrete spec

You chose "Playful 3D / immersive." That is the highest-ceiling option and the easiest to get wrong. The rule that keeps it from becoming a novelty:

> **Every 3D element must encode real information. No decorative spinning cubes.**

### 2.1 Hero — "The Constellation"

An interactive WebGL scene where your **tech stack is a physical object**.

- ~40 glowing nodes floating in 3D space, each a technology you use. Node size = depth of experience, colour = category (mobile / backend / cloud / AI).
- Nodes are connected by animated lines representing real relationships — Flutter→Supabase→Stripe traces an actual data path from your work.
- Cursor exerts gentle repulsion; the whole constellation parallaxes on mouse move and on device tilt (mobile gyroscope).
- Hovering a node lifts it, dims the rest, and shows a tooltip: *"Supabase — 6 production apps, RLS + edge functions."*
- Clicking a node filters the work section below to projects using it. **This is the key move:** the hero is not decoration, it is the site's primary navigation.
- Idle state: slow drift with a breathing bloom pass. Never static, never frantic.

*Implementation:* `<Points>` with a custom GLSL shader for the nodes (one draw call for all 40), `<Line>` from drei for connections, `EffectComposer` with a `Bloom` pass at low resolution. Target: < 8ms frame time on an M1, < 16ms on a 2021 mid-range Android.

**Mobile / reduced-motion fallback:** a pre-rendered animated SVG constellation with the same layout and the same click-to-filter behaviour. Same information, ~4 KB, zero WebGL. Ship this as the default and hydrate to 3D only when the device passes a capability check.

### 2.2 Scroll — "The Pipeline"

As the visitor scrolls from hero to work, the constellation **reorganises into a flow diagram**: idea → design → build → ship → monitor. Nodes migrate to positions along a pipeline, each stage lighting up as it enters the viewport, with a one-line description of how you work at that stage.

*Implementation:* scroll progress drives GPU-side lerp between two position buffers. Cheap, and the transition is the memorable moment of the site.

### 2.3 Project cards — "Device Dioramas"

Each project card contains a real 3D phone or laptop model with your actual screenshot mapped to the screen as a texture. Tilts to follow the cursor. On click, the device rotates and the camera dollies in as the route transitions to the case study.

*Implementation:* one shared low-poly GLB (~30 KB, Draco-compressed), instanced across all cards, screenshot swapped as a texture. Cards below the fold render as static `next/image` until they enter the viewport.

### 2.4 Case study pages — "Architecture, Animated"

For each project, an SVG architecture diagram that draws itself in as you scroll, with packets of light travelling along the connections to show data flow. This is the single highest-value illustration on the site for the peer-developer audience: it proves you understand systems, not just widgets.

*Implementation:* SVG + `stroke-dasharray` animation driven by scroll. No WebGL needed. Roughly 6 diagrams to author, one per case study.

### 2.5 Micro-interactions (the difference between "nice" and "wow")

| Element | Behaviour |
|---|---|
| Cursor | Custom blended-difference cursor that morphs to a label on interactive elements ("View case study", "Copy") |
| Page transitions | Shared-element morph via View Transitions API — the project card becomes the case study hero |
| Magnetic buttons | CTAs subtly attract the cursor within ~40px |
| Text reveals | Per-character mask reveal on headings, staggered, `IntersectionObserver`-driven |
| Scroll velocity | Slight skew on cards proportional to scroll speed — makes motion feel physical |
| Number counters | Stats count up on entry with spring easing |
| Theme toggle | Circular `clip-path` wipe from the button origin, not a crossfade |
| Contact form | Inline field-level validation, optimistic success state, real error handling |
| 404 page | The constellation, scattered — nodes drift apart, "this node doesn't exist" |
| Konami code | Peer-developer easter egg: switches the whole site into wireframe/debug mode showing component boundaries |

### 2.6 Motion discipline — non-negotiable

The current site has ~43 infinite animation loops and **zero** `prefers-reduced-motion` handling. Rules for the rebuild:

1. `@media (prefers-reduced-motion: reduce)` disables all non-essential motion, kills the WebGL loop, and shows static equivalents. Test this on every PR.
2. Animate only `transform` and `opacity`. Never `box-shadow`, never `filter`, never `width`.
3. Nothing loops forever above the fold except the hero — and the hero's loop pauses when the tab is hidden (`document.visibilityState`) and when scrolled out of view.
4. Every animation < 400ms unless it is scroll-driven.
5. Max 3 elements animating simultaneously in any viewport.

---

## 3. Phased roadmap

### Phase 0 — Stop the bleeding (½ day, do this today)

Cheap fixes to the *current* site so it isn't visibly broken while you build the new one.

- [ ] Fix the theme token mismatch — add `text_primary`/`text_secondary`/`card` aliases to `Themes.js`, or rename all 51 consumers. **Aliases take 5 minutes.**
- [ ] Replace `RishavChanda` Twitter link with yours (or remove it)
- [ ] Fix `"Full Stack Mobi"` → `"Full Stack Mobile Developer"`
- [ ] Fix hero CTA — make `HeroBtn` an actual `<a href="#contact">`
- [ ] Delete the 1.5s artificial loading gate
- [ ] Wrap the scroll listener in `useEffect` with cleanup
- [ ] Fix the `#about` footer link (point it at `#skills` or render the About section)
- [ ] Update copyright to 2026
- [ ] Rotate the EmailJS keys — they're committed in `Contact/index.js`
- [ ] Fix `public/index.html` meta description and title

### Phase 1 — Foundation (Week 1)

- [ ] `create-next-app` with TypeScript, Tailwind v4, App Router, ESLint
- [ ] Port design tokens from `Themes.js` → Tailwind theme + CSS custom properties
- [ ] Theme system: light/dark/system, persisted, `prefers-color-scheme` default, no flash of wrong theme
- [ ] Layout shell — semantic `<header>/<main>/<footer>`, skip link, real heading hierarchy
- [ ] Migrate `constants.js` → typed content modules (`content/projects/*.mdx`, `content/experience.ts`)
- [ ] Image pipeline: convert the 3.7 MB of PNG/JPG to AVIF+WebP, wire through `next/image`
- [ ] SEO baseline: metadata API, OG images, `sitemap.ts`, `robots.ts`, JSON-LD `Person` + `CreativeWork` schema
- [ ] CI: ESLint, TypeScript, Playwright smoke test, Lighthouse CI with a budget

**Exit criteria:** static site, all content migrated, Lighthouse 95+ across the board, zero 3D yet.

### Phase 2 — Content & case studies (Week 1–2, runs parallel)

This is the part that actually gets you hired, and the part most likely to slip. Do it in writing before you do it in code.

For **each** of your ~6 strongest projects, write:

```
Title            One line, outcome-focused
Role             What you specifically did
Timeline         Duration + team size
The problem      2–3 sentences. Whose pain, how bad
Constraints      Budget, legacy systems, offline, compliance, deadline
Approach         Key decisions and — crucially — what you rejected and why
Architecture     Diagram + 3-line explanation
Hard part        The one genuinely difficult thing. Peers read this first
Outcome          NUMBERS. Users, latency, revenue, time saved, error rate
Learned          Honest reflection. Signals seniority more than any success story
Stack            Tech list with rationale
Links            Live / App Store / GitHub / write-up
```

Prioritise: **CW Guarding Platform**, **Athlenote**, the **payments integration** work, **STW**, and one AI/automation piece.

**Also write:**
- [ ] A real bio to replace *"Passionate about creating innovative digital experiences"*
- [ ] Three honest stats to replace "100% Client Satisfaction" — e.g. "6 apps in production · 4 years shipping Flutter · 12k+ end users"
- [ ] `/services` page if you want freelance work: what you do, how you work, what it costs, how to start
- [ ] `/uses` page — 30 minutes of work, disproportionate credibility with peers

### Phase 3 — Motion layer (Week 2)

- [ ] Motion (framer-motion) install; shared variant library so animations are consistent
- [ ] Scroll-driven reveals via `IntersectionObserver` — replace AOS entirely
- [ ] Text reveal, magnetic buttons, custom cursor, scroll-velocity skew
- [ ] View Transitions API for route changes with shared-element morph
- [ ] `prefers-reduced-motion` path implemented **and tested** before moving on

### Phase 4 — 3D layer (Week 2–3)

- [ ] r3f + drei + postprocessing, isolated behind `next/dynamic` with `ssr: false`
- [ ] Capability detection: WebGL2 support, device memory, `hardwareConcurrency`, connection type. Falls back to SVG on failure.
- [ ] Build the Constellation hero (§2.1)
- [ ] Build the Pipeline scroll transition (§2.2)
- [ ] Build Device Diorama cards (§2.3)
- [ ] Author 6 animated architecture diagrams (§2.4)
- [ ] Performance pass: adaptive DPR, frameloop `demand` where possible, pause on tab blur, throttle on low-end devices

**Hard budget:** the 3D chunk must be **< 200 KB gzipped** and must never be in the critical path. If the hero can't hit 60fps on a Pixel 6a, it ships as SVG-only on mobile.

### Phase 5 — Polish & launch (Week 3)

- [ ] Full keyboard navigation audit — tab through every interactive element
- [ ] Screen reader pass (VoiceOver + NVDA) on home, `/work`, one case study
- [ ] axe-core: zero violations
- [ ] Cross-browser: Safari (worst for backdrop-filter and View Transitions), Firefox, Chrome, iOS Safari, Android Chrome
- [ ] Lighthouse mobile: Performance ≥ 90, A11y 100, Best Practices 100, SEO 100
- [ ] Contact form → Server Action + Resend, with spam protection and rate limiting
- [ ] Analytics + Speed Insights
- [ ] Deploy to Vercel, custom domain, redirects from old URLs
- [ ] Submit sitemap to Search Console

### Phase 6 — Ongoing

- [ ] `/blog` with 3–4 technical posts (biggest long-term SEO and credibility lever)
- [ ] GitHub contribution graph pulled live via API
- [ ] Live Spotify / current-project status widget
- [ ] Case study for the portfolio site itself — meta, and it works

---

## 4. Performance budget (enforced in CI)

| Metric | Budget |
|---|---|
| LCP (mobile, 4G) | < 2.0s |
| CLS | < 0.05 |
| INP | < 150ms |
| First-load JS (home) | < 130 KB gzipped |
| 3D chunk (deferred) | < 200 KB gzipped |
| Total image payload above fold | < 200 KB |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse A11y | 100 |

The current site fails almost all of these. The 1.5s artificial loader alone blows the LCP budget before a single byte of content renders.

---

## 5. Effort estimate

| Phase | Effort | Can run parallel |
|---|---|---|
| 0 — Emergency fixes | 4 hours | — |
| 1 — Foundation | 4–5 days | — |
| 2 — Content | 3–4 days | ✅ with 1 & 3 |
| 3 — Motion | 3 days | — |
| 4 — 3D | 5–6 days | — |
| 5 — Polish & launch | 3 days | — |
| **Total** | **~3 weeks focused**, 5–6 weeks part-time | |

---

## 6. Risks and how to defuse them

| Risk | Mitigation |
|---|---|
| **3D becomes a performance disaster** | Build Phase 1 as a complete, shippable static site first. The 3D layer is strictly additive and can be cut without breaking anything. Budget enforced in CI. |
| **Content phase stalls the whole project** | Write the 6 case studies in plain markdown *before* Phase 4. If they aren't written by end of week 2, ship with 3 and add the rest later. |
| **"Immersive" reads as gimmicky to a recruiter** | Every 3D element carries information (hero = navigation, cards = real screenshots, diagrams = real architecture). Recruiters can also reach a plain, fast `/work` index in one click. |
| **Scope creep** | `/blog`, GitHub graph and Spotify widget are explicitly Phase 6. Not before launch. |
| **Safari breaks the effects** | Test Safari at the *end of every phase*, not at the end of the project. It is the browser most likely to break `backdrop-filter`, View Transitions and WebGL2 features. |
| **Exposed secrets** | EmailJS keys are already committed. Rotate them in Phase 0 and move to a Server Action + env vars in the rebuild. |

---

## 7. First three things to do

1. **Run Phase 0** (4 hours) — the current live site has a dead CTA, another person's Twitter link, and half its colours missing. Fix that today regardless of what happens next.
2. **Write one case study** in markdown, longhand, before writing any new code. If you can't make one project sound compelling in prose, no amount of WebGL will save it.
3. **Scaffold the Next.js app** and port the design tokens. Everything else builds on that.

---

## Sources

- [Next.js releases](https://nextjs.org/blog) — current stable 16.2.x (July 2026)
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber/releases) — v9.7, pairs with React 19
- [@react-three/fiber on npm](https://www.npmjs.com/package/@react-three/fiber)
