# Handover

Two separate pieces of work. The live CRA site was repaired in place, and a
Next.js rebuild was built alongside it in `portfolio-next/`. **Nothing has been
committed and nothing has been deployed** — the swap is deliberately left for
you to trigger.

---

## 1. Read this before publishing anything

I drafted six case studies from your CV and project notes. The *structure* is
right and the numbers that came from your CV are real. But the narrative detail
— the approach sections, the "what I rejected" options, and especially the
"hard part" paragraphs — is **inference, not testimony**. I reconstructed
plausible technical detail from one-line project summaries.

For example, the Payflex case study explains the Store Directory's performance
problem in terms of marker rebuilds and server-side clustering. That is a
credible reconstruction. It is not something you told me.

Every case study in `portfolio-next/src/content/work.ts` carries a
`reviewNotes` field, never rendered, splitting each entry into `sourced` and
`inferred`. Work through them and rewrite the inferred parts in your own words.

> A case study you cannot defend line by line in an interview is worse than no
> case study at all. An interviewer who asks "walk me through that clustering
> decision" will find out in about ten seconds.

Separately, outcome figures marked `needsInput: true` are placeholders. They are
**stripped from production builds**, so they cannot leak to a visitor — but each
one is a number that would make the work land harder. `/work` lists them in
development.

---

## 2. AI tooling — added

Gemini, ChatGPT/Codex, Claude Code and Cursor are now four named nodes in the
constellation (AI & automation category) and a dedicated **"AI in the loop"**
section on `/uses`. They replace the single vague "AI-assisted dev" node.

The notes on each — what you reach for it *for* — are **drafted, like the case
studies**. Every developer lists these four; being specific about what each is
good for is the only part that isn't generic, so it's worth ten minutes putting
them in your own words. They're in `src/content/tech.ts` and `src/app/uses/page.tsx`.

Selecting one in the constellation returns no case studies (none is *built on* a
coding tool), so that empty state now explains why and links to `/uses` and
`/lab` rather than dead-ending.

## 3. What I need from you

Domain is set: **galenmyburgh.com**, wired into both apps, verified in the
generated canonicals, Open Graph tags, `robots.txt` and `sitemap.xml`.

**One thing to confirm.** You wrote *"not currently busy with BSc Honours in
Computer Science at the University of Pretoria"*, then described its modules. I
read that as "**now** currently busy with" and both sites now say you are
enrolled and reading toward digital forensics and cyber security. If that's
wrong, it is a claim about your credentials on a public site — tell me and I'll
change it immediately.

Two dates I had to assume: the Honours start (**2026**), and that Codelyn
finishing in January 2026 means the company is dormant rather than closed. The
`/services` page still offers freelance work on that basis.


| Thing                 | Why                                                                |
| --------------------- | ------------------------------------------------------------------ |
| **Case study review** | See above. This is the one that matters.                            |
| **Real outcome numbers** | Users, latency, time saved, conversion, error rates.            |
| **Hardware for `/uses`** | The software list is accurate; the hardware section is a stub.   |
| **Rates for `/services`** | Left out deliberately. Clients who can't find pricing usually assume the worst and don't ask. |
| **Codelyn outcome numbers** | The four client engagements are described but carry no results. Even one — cards issued, technicians using it, pumps under control — would lift them. |

---

## 4. Company logos — researched and corrected

You were right: I'd given the Tripleblue full-stack role and Codelyn the
**Payflex** icon, and Tripleblue Frontend was showing the **Softechware** logo.
Fixed on both sites, using real assets pulled from source and served locally
rather than hotlinked:

| Company | Source |
| --- | --- |
| Tripleblue | Official mark from `triple.blue` |
| Payflex | Official brand mark from `payflex.co.za` |
| Softechware | Site icon from `softechware.co.za` (256px frame) |
| Bowlsmaster | Fairtree Bowls Master app icon — thanks for the Fairtree pointer |
| Fix Glass | App icon from `fix.glass` |
| University of Pretoria, Akademia | Official marks, downsized |
| Codelyn | A 'C' monogram, as you asked |
| Batsamayi, Firebrain, schools, certs | No public asset — a monogram tile |

All normalised to 128px, stripped, 88 KB total. `CompanyMark` renders a real
logo where one exists and a monogram tile where it doesn't, so the rows stay
even either way.

Two useful things fell out of the research:

- **Tripleblue is `triple.blue` — AI agents for property management** (HOA / VvE
  / WEG). That means **DMS = Document Management System**, and the "DMS Germany
  counterpart" is the German-market build. I've left the site wording as yours;
  say the word and I'll make it explicit.
- **Bowlsmaster is Fairtree Bowls Master**, a bowls club management app.

## 5. Live site (CRA) — fixed in place

The current site had problems worth fixing regardless of the rebuild.

**Broken and user-visible**

- **Roughly half the site's colours never rendered.** 51 references to
  `theme.text_primary`, `text_secondary`, `card`, `white`, `soft2` resolved to
  `undefined`. Added as aliases in `Themes.js`.
- **The hero's main CTA did nothing** — react-scroll props on a plain anchor,
  no `href`. Now a real link to `#contact`.
- **The hero photo 404'd on any case-sensitive host.** The file was `gmNew.JPG`;
  the code asked for `/gmNew.jpg`. Two project screenshots had the same problem.
  This works on your Mac and breaks on Netlify.
- **Someone else's links were live on your site.** The template author's Twitter
  in the footer, and their GitHub repos attached to *nine* of your projects —
  "CDOR" linked to `github.com/rishavchanda/Trackify`.
- The project modal was hardcoded white-on-black and ignored the theme.
- `"Full Stack Mobi"` — truncated mid-word.
- Education timeline had a variable-shadowing bug (`education.map((education …))`
  made `education.length` undefined), so the connector line drew past the last item.
- The 1.5s artificial loading gate is gone; it added 1.5s to LCP before a byte of
  content rendered.
- Scroll listener was registered in the render body with no cleanup — one more
  listener per render, forever.
- Live project links ("View Live" / "View Code") were never rendered at all, so
  `softechware.co.za`, `cdor.co.za` and the rest were invisible to visitors.

**Accessibility**

- Focus rings were written as a `.focus-visible` *class*, which never matched.
  Keyboard navigation was completely invisible. Now `:focus-visible`.
- Project cards were `onClick` on a bare `<div>` — the entire Projects section
  was unreachable by keyboard. Now proper `role`, `tabIndex`, key handling.
- Added `prefers-reduced-motion` handling (there was none, against ~43 infinite
  animation loops), `alt` text, `aria-label`s on icon-only controls, real heading
  hierarchy, a skip link, and `rel="noopener"` on external links.
- Tags were white on `#007bff` — 3.1:1, failing AA. Now 6.7:1.

**Performance and hygiene**

- Images: **3.9 MB → 600 KB**. Your hero photo was a 4061×6091 JPEG (24
  megapixels) served for a ~400px slot. Screenshots were opaque PNGs, converted
  to JPEG.
- Removed 9 unused dependencies and ~700 lines of dead code.
- Fixed the duplicate `"build"` key in `package.json` that was silently setting
  `CI=false` and suppressing the warnings hiding most of the above. The build now
  passes with warnings-as-errors.
- Replaced the failing default CRA test with two real ones. `npm test` passes.
- EmailJS keys moved to env vars — **but see the security note below.**
- Real SEO metadata, Open Graph tags and JSON-LD, pointing at `galenmyburgh.com`.

### Security note on the EmailJS keys

The audit called these "exposed secrets that need rotating". That is half right,
and the half it gets wrong matters: **EmailJS browser keys are public by
design.** They ship in the client bundle of every EmailJS integration. Rotating
them changes nothing, because the new key is equally public.

The control that actually protects your quota is the **domain allowlist** in the
EmailJS dashboard (Account → Security → Allowed domains). Set it to your live
domain (`galenmyburgh.com`). I've moved the keys to environment variables so they're out of the repo,
but that is hygiene, not a fix.

The rebuild removes the problem entirely — the contact form is a Server Action
and the API key never reaches the browser.

---

## 6. The rebuild

Next.js 16.2.12, React 19, Tailwind v4, TypeScript strict. See
`portfolio-next/README.md` for how it's put together.

**Verified, not asserted:**

- Lighthouse mobile: Performance 94–95, **Accessibility 100, Best Practices 100,
  SEO 100**. CLS 0, TBT 10ms.
- **Zero axe violations** across 14 routes × both themes (WCAG 2.0/2.1 A + AA),
  runnable as `npm run audit:a11y`.
- 109 focusable elements, every one with an accessible name; skip link first.
- Reduced-motion path tested: transitions collapse to zero, WebGL never loads.
- Typecheck, lint and build all clean.

**Two budgets from the plan are not met**, and I'd rather say so than quietly
move the goalposts:

- First-load JS is ~165 KB gzipped against a 130 KB budget. A route with almost
  no client code of its own measures ~152 KB — that's the Next 16 + React 19
  floor. My code is ~13 KB of it.
- LCP reads ~3.0 s against a 2.0 s budget. *Observed* LCP is ~109 ms; the 3.0 s
  is Lighthouse's simulated slow-4G projection of that same framework payload.
  It's identical on desktop and mobile and across every route, which is the
  signature of the simulation, not the page.

Both are framework weight. If they matter more than Next.js does, that's a
framework conversation, not a tuning one.

**The Tripleblue full-stack role was overstated in my first pass** — I wrote
that you took ownership of the whole stack and the Supabase backend. Corrected:
it's AI product work (Knowledge Agent, AI Notes, the DMS Germany counterpart,
the AI note-taking mobile app). I don't know what DMS expands to, so it's
described using your wording.

**Positioning, settled.** The three specialisms are now
**"Flutter & React · Payments & NFC · AI products"**, your call after I laid out
the options. Hardware & IoT is deliberately a supporting act rather than a
headline — it's still a constellation category, a `/services` offer and four
client write-ups on `/about`, it just doesn't lead. One line in `src/lib/site.ts`
if you change your mind.

The constellation gained a sixth category (*Hardware & IoT*) and nodes for NFC,
ESP modules, IoT integration, offline-first, Maps & navigation, WhatsApp API and
AI agents. Cluster angles are derived rather than hand-tuned now, so a seventh
category rebalances the layout instead of landing on an existing one.

The four Codelyn engagements are on `/about` as short, honest write-ups rather
than full case studies — a case study has to say what was hard and what changed,
and I'm not inventing those answers again. Promote any of them to `work.ts` once
you've written one up. Batsamayi and Firebrain are the two I'd pick: an offline
NFC wallet and remote industrial control are the most distinctive things on your
CV.

**The hero WebGL field.** Full-bleed aurora behind the headline: domain-warped
noise, coloured from the same five category colours as the constellation, and it
biases toward whichever category you select — so it carries information rather
than being wallpaper. Same capability gate as the constellation, so phones,
reduced-motion, save-data and low-memory devices never load it, and it shares the
existing three.js chunk so it adds no new bundle.

Two bugs worth recording because they are easy to hit again:

- `smoothstep(1.6, 0.05, x)` is **undefined behaviour** — GLSL requires
  `edge0 < edge1`. To fade outward, write `1.0 - smoothstep(0.15, 1.5, x)`.
  Mine returned ~0 on this driver, which renders a completely invisible layer.
- Blending five palette colours with wide Gaussians averages them to **grey**.
  The bands have to be tight or the whole field desaturates.

I also found and fixed a target-size regression while testing this: shrinking the
constellation hit areas to 28px earlier stopped them overlapping on phones but
left them overlapping on desktop. The layout now runs a relaxation pass that
enforces a minimum separation between nodes, so they cannot collide at any size.
Desktop accessibility is back to 100.

**Design decisions worth knowing about:**

- **The constellation is the navigation.** Clicking a technology filters the
  case studies below it. It ships as SVG with real HTML buttons; WebGL is an
  optional visual upgrade layered *behind* those same buttons, so 3D never costs
  accessibility. On phones the map is decorative and a full-size technology list
  is the control — forty overlapping tap targets is bad UI, not just a failing
  audit.
- **I skipped `drei` and `postprocessing`** despite the plan naming them. The
  glow is three lines of GLSL instead of a bloom pass; the 3D chunk is ~129 KB
  instead of ~250 KB, and it stays under budget.
- **Ten rotating titles became one line plus three specialisms**, as the plan
  proposed.
- **"100% Client Satisfaction" is gone.** The three stats are now countable from
  your own CV. Please still sanity-check them.

**Not built:** the custom cursor, magnetic buttons, scroll-velocity skew and the
Konami-code debug mode. These are Phase 3 polish; the structural work was worth
more of the session. The `/lab` page is a real page but currently documents this
site's internals rather than separate experiments.

---

## 7. Deploying

I have not done this — it changes what deploys, and you should look at it first.

```bash
cd portfolio-next && npm install && npm run check   # confirm it's green
npm run dev                                          # click around
```

When you're satisfied:

1. Set `RESEND_API_KEY` in your host's environment if you want the contact form
   live. `galenmyburgh.com` is already baked in as the default origin, so
   `NEXT_PUBLIC_SITE_URL` only needs setting on preview deployments (so they
   don't advertise production canonicals).
2. Move `portfolio-next/*` to the repo root, deleting the CRA `src/`, `build/`,
   `public/index.html` and the CRA entries in `package.json`.
3. Point the host at the Next.js build. On Netlify that means the
   `@netlify/plugin-nextjs` plugin; Vercel needs no configuration.
4. Add redirects from any old URLs, and submit `sitemap.xml` to Search Console.

Also worth doing:

- `build/` is committed to git while also being listed in `.gitignore`. I ran
  `git rm -r --cached build` (untracked, files left on disk) but did **not**
  commit it — verify your Netlify build command is `npm run build` first.
- `npm audit` reports 3 high-severity advisories in `postcss` and `sharp`, both
  transitive dependencies *inside Next.js itself*. `npm audit fix --force` would
  "fix" them by downgrading Next to v9. Leave them; they're build-time only.
