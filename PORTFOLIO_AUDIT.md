# Portfolio Audit — End to End

**Date:** 2 August 2026
**Repo:** `galenmyburgh/My-Portfolio`
**Stack audited:** Create React App 5.0.1, React 18, styled-components 5, Framer Motion 12, MUI 5
**Source size:** ~4,956 lines across 29 files · Bundle: 528 KB JS + 28 KB CSS (unsplit)

---

## Executive summary

The site works, but a large part of its styling is silently broken and a lot of the code is unused template residue. The single most important finding:

> **Roughly half the site's colours never render.** Components reference theme tokens that do not exist.

`src/utils/Themes.js` exports `textPrimary`, `textSecondary`, `cardBackground`. Twelve components consume `theme.text_primary`, `theme.text_secondary`, `theme.card`, `theme.white`, `theme.soft2`. Every one of those resolves to `undefined`. Worse, patterns like `theme.text_primary + 80` produce the literal CSS string `"undefined80"`, which browsers discard. Cards, timelines, tags and the entire Projects/Experience/Education/Certifications area are falling back to inherited colour rather than the design system.

Second most important: **the Projects modal is entirely un-themed and hardcoded to white** (`#ffffff` background, `#000000` text). In dark mode it is unreadable.

Third: **the hero's primary CTA does nothing.** `HeroBtn` is a `styled(motion.a)` receiving react-scroll props (`to`, `smooth`, `spy`) that it does not understand — no `href`, no scroll handler. Your main conversion button is a dead element.

Below, findings are grouped by severity. File and line references are exact.

---

## P0 — Broken, user-visible

| # | Issue | Location |
|---|---|---|
| 1 | **Theme token mismatch — 51 references.** `text_primary` (24×), `text_secondary` (17×), `card` (5×), plus `white`, `text_black`, `soft2` are consumed but never exported. All resolve to `undefined`. | `Experience/index.js:45,56` · `Education/index.js:46,57` · `Certifications/index.js:45,56` · `Footer/index.js:25,52,73,83` · `Cards/ProjectCards.jsx:9,10,21,45,68,84,98,107,127,129` · `Cards/ExperienceCard.jsx:20,98,107,116,139` · `Cards/EducationCard.jsx:20,96,105,114,123` · `Projects/ProjectsStyle.js:35,46,55,57` · `Skills/index.js` · `Contact/index.js` |
| 2 | **`undefined + alpha` string concat.** `theme.text_secondary + 99` → `"undefined99"`. Invalid CSS, silently dropped. | `ProjectCards.jsx:98,107` · `ExperienceCard.jsx:20,98` and siblings |
| 3 | **Hero CTA is a no-op.** react-scroll props passed to a plain anchor. Also triggers React unknown-attribute warnings. | `HeroSection/index.js:189–198` + `HeroStyle.js:191` |
| 4 | **Project modal unreadable in dark mode.** Fully hardcoded `#ffffff` / `#000000` / `#007bff`, no theme access. | `ProjectDetails/index.jsx:29,30,41,64,97,121,161,183,185,195` |
| 5 | **Typewriter is a synchronous render loop.** `setTimeout(() => {}, speed)` is an empty no-op; `setDisplayText` fires immediately in the effect body, so text types at render speed, not the intended 100ms. | `HeroSection/index.js:54–76` |
| 6 | **Scroll listener leak.** `window.addEventListener("scroll", …)` sits in the render body with no `useEffect` and no cleanup. Every render adds a listener; every scroll causes a render. Unbounded growth. | `scrollToTop/index.js:33` |
| 7 | **Broken anchor.** Footer links to `#about`; the `About` component is never imported in `App.js`, so that ID does not exist. | `Footer/index.js:93` |
| 8 | **Certifications render through `EducationCard`**, which hardcodes a "Grade:" row. Certifications have no grade → renders "Grade:" followed by nothing. | `Certifications/index.js:90` + `EducationCard.jsx:137–142` |
| 9 | **Someone else's Twitter handle.** `twitter: "https://twitter.com/RishavChanda"` — the original template author. Live in your footer. | `constants.js:15` |
| 10 | **Truncated data.** `"Full Stack Mobi"` — cut off mid-word. | `constants.js:8` |
| 11 | **Broken image render.** `experience.doc` (a document URL) rendered as `<img src>`. | `ExperienceCard.jsx:178–179` |
| 12 | **Duplicate `"build"` key in package.json.** The second wins and sets `CI=false`, which suppresses the warnings that would have surfaced most of this list. | `package.json` |

---

## P1 — Accessibility (currently unshippable for an employer audit)

- **No visible focus anywhere.** GlobalStyles strips `outline` from inputs and `border` from buttons. The replacement is written as a `.focus-visible` *class*, not the `:focus-visible` pseudo-class — so it never applies. Keyboard navigation is invisible.
- **No content image has `alt`.** `ExperienceCard.jsx:151,179` · `EducationCard.jsx:135` · `ProjectCards.jsx:140,153` · `ProjectDetails/index.jsx:311,331`.
- **Project cards are mouse-only.** `onClick` on a bare `<div>` with no `role="button"`, `tabIndex`, or key handler (`ProjectCards.jsx:139`). The whole Projects section is unreachable by keyboard.
- **Modal is not a dialog.** Close control is a bare SVG with no `<button>`, no focus, no `aria-label` (`ProjectDetails/index.jsx:283–298`). No `aria-labelledby`, no focus trap, no Escape handling.
- **Zero heading structure.** Every section title is a `styled.div`. Screen readers get no landmarks. Meanwhile there are **two `<h1>`s** (`HeroStyle.js:76` and `Footer/index.js:28`).
- **No semantic sectioning.** No `<main>`, no `<section>`, no skip link. Sections are `<div id="…">`.
- **Invalid link targets.** `target="display"` (`Footer/index.js:101–104`) and `target="new"` (`ProjectDetails/index.jsx:333,336`) are not `_blank`, and none carry `rel="noopener noreferrer"`.
- **No `prefers-reduced-motion` guard anywhere.** Verified by grep. There are ~10 continuously looping animations plus AOS globally. For a vestibular-sensitive visitor this site is actively hostile.
- **Icon-only controls with no accessible name:** scroll-to-top button, mobile menu toggle (also missing `aria-expanded`/`aria-controls`), all four footer social links.
- **Contrast failures.** `Tag` is white on `#007bff` at 14px ≈ 3.1:1 (fails WCAG AA). The `+80`/`+99` alpha suffixes were *intended* to drop text to 50–60% opacity — where they resolve, they fail AA.

---

## P2 — Performance

- **Artificial 1.5-second loading gate.** `App.js:38,51–53` blocks the entire app behind a `setTimeout` that serves no purpose. This is the single largest Lighthouse hit — it directly adds 1.5s to FCP and LCP.
- **`Math.random()` during render.** `HeroSection/index.js:133–135`, `App.js:94–105`. Every re-render repositions all 20 particles — visible jitter, and it defeats memoisation entirely.
- **~43 simultaneous infinite Framer Motion loops** (23 on the loader, 20 in the hero).
- **Animating non-composited properties.** `box-shadow` keyframes on every nav link (`NavbarStyledComponent.js:262,266,414,418`), `filter: drop-shadow` on the logo. Forces paint every frame.
- **`backdrop-filter: blur()` used 7×**, several stacked on top of always-animating pseudo-elements → continuous re-blur.
- **Base64 images inlined into the JS bundle.** `constants.js:76,171,203` and many more. Parsed as JavaScript, separately uncacheable, cannot be lazy-loaded or served as WebP.
- **Unoptimised images in `public/`:** `cwGuardingPlatform_screenshot.png` 1.28 MB · `gmNew.JPG` 1.07 MB · `pf_screenshot.png` 900 KB · `stw_screenshot.png` 436 KB. **~3.7 MB of images**, none with `loading="lazy"`, `srcset`, or width/height attributes.
- **No code splitting.** No `React.lazy` anywhere. The rarely-opened slideshow modal and its CSS ship in the main bundle.
- **Dead weight in `package.json`:** `react-router-dom` (zero uses), `typewriter-effect` (hand-rolled instead), `react-particles` + `tsparticles-slim` (unused), `react-slick` + `slick-carousel` (unused), `emailjs` (duplicate of `@emailjs/browser`).
- **Invisible animation burning CPU.** `Nav::before` shimmer at `z-index: -1` behind a solid opaque background inside `overflow: hidden` — it animates forever and paints nothing.

---

## P3 — Structure & SEO

- **No router.** `react-router-dom@6.3.0` is installed and never used. `src/index.js` renders `<App/>` directly.
- **Projects are not deep-linkable.** The detail view is a `useState` modal. The URL never changes, back button doesn't close it, nothing is shareable, and Google cannot index any of your project work.
- **Essentially no SEO.** `public/index.html:10` still reads *"Web site created using create-react-app"*. No Open Graph, no Twitter card, no canonical, no JSON-LD, no sitemap. `theme-color` is `#000000` while the app is blue. `apple-touch-icon` points at a non-existent `HeroImage.jpg`.
- **Dead code (~700 lines):** `About/` (never imported, yet linked from the footer) · `HeroBgAnimation/` (365 lines of animated SVG, never imported — and contains a broken 5-digit hex `fill="#46737"` at line 57) · `themes/default.js` (orphan legacy theme) · `reportWebVitals.js` (never called) · `logo.svg` · `App.test.js` (default CRA test that fails against this App) · 60 lines of commented-out `ImageSlider` in `ProjectDetails/index.jsx:205–266`.
- **Massive duplication.** `Title`/`Desc` styled-components are defined **six times**, byte-identical. `Experience/`, `Education/` and `Certifications/` are copy-paste clones differing only in the data array. `EducationCard` and `ExperienceCard` are ~90% identical.
- **Components literally named `index`.** `const index = () => …` in Experience, Education, Certifications — lowercase, and in Experience it collides conceptually with the map index param.
- **Conflicting global CSS.** `index.css` sets a system font stack; `App.css:1` imports Poppins, `:7` applies it to `*`, then `:15` sets `Montserrat` on body — a font that is never loaded. Scrollbar colours are hardcoded dark and ignore the theme.
- **No theme persistence.** `darkMode` defaults to `false` with no `localStorage` and no `prefers-color-scheme` check. Dark mode resets on every reload.
- **Fragile theme detection.** The navbar decides light vs dark by string-comparing `theme.body === '#0f172a'`. Change one hex and the navbar silently flips.
- **Layout magic numbers.** `padding-top: 180px` with the comment *"Much more breathing room"*, hand-tuned against a navbar whose height changes on scroll.
- **`build/` is committed to git** while also being listed in `.gitignore`.

---

## P4 — Content

- **Unsubstantiated stats.** "5+ Years / 50+ Projects / **100% Client Satisfaction**" (`HeroSection/index.js:114–118`). Recruiters read "100% client satisfaction" as filler. Real, specific numbers beat round ones.
- **Generic hero copy.** *"Passionate about creating innovative digital experiences… Let's build something amazing together."* This is template boilerplate and says nothing about you.
- **Inconsistent role lists.** `constants.js:3–9` has 4 Flutter/Android roles; `HeroSection/index.js:41–52` hardcodes a different list of 10. `Bio.roles` is unused.
- **Ten rotating titles is too many.** "AI-First Developer", "Automation Engineer", "Mobile App Architect", "Payments Integration Specialist", "React & Flutter Expert", "Supabase Solutions Builder", "Cloud Platform Engineer", "Technical Innovator", "Product-Focused Coder", "Python Visioneer". Dilutes positioning — a visitor can't tell what you actually are. Three is the ceiling.
- **Template section copy.** *"My education has been a journey of self-discovery and growth."*
- **Hardcoded copyright year** — "© 2025", currently 2026.
- **Projects show no outcomes.** Screenshots and tech tags only. No problem statement, no constraint, no result. That is the difference between a gallery and a portfolio.
- **Resume is a raw Google Drive link** — fragile, and exposes a Drive file ID.

---

## What is actually good here

Worth keeping and building on:

- The **design token structure** in `Themes.js` is well thought out — spacing scale, type scale, radius scale, breakpoints, animation easings. It just isn't wired up correctly. The vocabulary carries straight over to Tailwind.
- **Framer Motion is already a dependency** and the variant patterns in `Navbar` and `HeroSection` (`containerVariants`/`itemVariants` with `staggerChildren`) are the right idiom.
- **`constants.js` is a genuine content layer** — data is separated from presentation. That structure ports cleanly to MDX or a CMS.
- Your **actual project set is strong**: a guarding platform, payments integration, Supabase work, Flutter apps. The substance is there; the presentation is under-selling it.

---

## Scale of the problem

```
Broken / dead code           ~1,400 lines   (28% of src)
Duplicated definitions         ~600 lines   (12% of src)
Unused dependencies            6 packages
Unoptimised image payload      ~3.7 MB
Estimated Lighthouse perf      35–50 (mobile)
Estimated Lighthouse a11y      ~60
Estimated Lighthouse SEO       ~70
```

See `PORTFOLIO_PLAN.md` for the rebuild roadmap.
