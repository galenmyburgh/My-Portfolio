# Lewe — Repo Name & Scaffolding Prompt

## Repo name

**`lewe-app`** — decided.

Leaves room for `lewe-api` or `lewe-mobile` later, and names the product rather than the stack. Deploys to `lewe.galenmyburgh.com`.

**Supabase project name:** `lewe-prod` (add `lewe-dev` later if you want a second environment).

---

## The scaffolding prompt

Paste this into Claude Code / Cursor in an empty `lewe-app` repo.

---

You are building **Lewe**, a private, invite-only lifestyle and growth app for exactly two people — me (Galen) and my wife. It will be deployed at `lewe.galenmyburgh.com`. Nobody else will ever have an account. Build it end to end, production quality, mobile-first.

### Stack — non-negotiable

- **Next.js 15** (App Router, TypeScript, strict mode)
- **Tailwind CSS v4** + **shadcn/ui** for components
- **Supabase** for Postgres, Auth, Storage, and Row Level Security
- `@supabase/ssr` for auth (NOT the deprecated `auth-helpers-nextjs`)
- **Zod** for all input validation, **React Hook Form** for forms
- **TanStack Query** for client-side data fetching and cache
- **Lucide** icons, **Recharts** for progress charts
- **Vercel** as the deploy target

### Product scope

Three pillars, each a top-level section:

1. **Training** — fitness plans. A plan has a name, goal, duration, and a set of workouts. A workout has exercises with sets/reps/weight. Log completed sessions against a plan and see streaks and volume over time.
2. **Geloof (Faith)** — religious plans. Reading plans (e.g. a Bible plan with daily passages), prayer list, reflection journal entries, and a daily check-in.
3. **Groei (Growth)** — personal growth. Goals with milestones, habits with daily/weekly cadence and streak tracking, and a reading/learning list.

Cross-cutting:

- **Dashboard** — today's view across all three pillars: what's due, current streaks, a weekly progress ring.
- **Household model** — the two of us belong to one household. Some content is shared (we can both see and encourage each other's plans), some is private (journal entries, reflections). Every table must explicitly declare which it is.
- **Check-ins** — a single unified `check_ins` table that any plan type can write to, so the dashboard and streak logic stay simple.

### Data model

Design the schema yourself, but it must include:

- `households` — one row for us.
- `profiles` — extends `auth.users`, holds `household_id`, display name, avatar URL. Auto-created by a trigger on `auth.users` insert.
- Domain tables per pillar, each carrying `household_id` and `owner_id`.
- `check_ins` — polymorphic-ish table with `entity_type`, `entity_id`, `completed_at`, `notes`.
- Every table: `id uuid default gen_random_uuid()`, `created_at`, `updated_at` with a trigger.

Write it as proper SQL migrations in `supabase/migrations/`, not ad-hoc SQL run in the dashboard. Generate TypeScript types from the schema into `src/types/database.ts`.

### Security — treat this as the most important part

The Supabase anon key ships to the browser, so RLS is the only thing standing between my data and the internet. Therefore:

- **RLS enabled on every single table.** No exceptions. A table without RLS is publicly readable.
- Two policy shapes, applied deliberately per table:
  - *Household-shared:* `household_id = (select household_id from profiles where id = auth.uid())`
  - *Owner-private:* `owner_id = auth.uid()`
- Separate policies for SELECT / INSERT / UPDATE / DELETE — no blanket `FOR ALL` policies.
- Wrap `auth.uid()` in a `select` inside policies so Postgres caches it per-statement (real performance difference at scale).
- **Public signups disabled.** I will create the two accounts manually. Additionally add a DB-level guard so a row can't be created for an unknown email.
- The `service_role` key must never appear in client code, in `NEXT_PUBLIC_*` vars, or in any component. Server-only, and only if genuinely needed.
- Middleware protects every route except `/login`. Unauthenticated users get redirected; there is no public marketing page.
- Enable leaked-password protection and set a sane password policy in Supabase Auth config.
- Add a `SECURITY.md` documenting which tables are shared vs private and why.

After building the schema, run the Supabase advisors and fix every warning they surface.

### Mobile responsiveness — equally important

This will be used on a phone, standing in a gym, far more than on a desktop. So:

- **Design mobile-first.** Write the base styles for a 375px viewport, then layer `sm:` / `md:` / `lg:` on top. Never design desktop-down.
- **Bottom tab navigation on mobile** (Dashboard / Training / Geloof / Groei / Profile), transitioning to a sidebar at `md:` and up. The bottom bar must sit above the iOS home indicator — use `env(safe-area-inset-bottom)`.
- **Touch targets minimum 44×44px.** No tiny icon buttons.
- Use `dvh` not `vh` so mobile browser chrome doesn't break full-height layouts.
- Forms: correct `inputMode` and `type` on every input so phones show the right keyboard (numeric for reps/weight).
- Any table-shaped data must collapse into stacked cards below `md:` — no horizontal scrolling tables.
- Sheets/drawers from the bottom on mobile, dialogs centred on desktop.
- **Ship it as an installable PWA**: manifest, icons, theme colour, `apple-mobile-web-app-capable`, so it can live on the home screen and feel native.
- Test every screen at 375px, 390px, 768px, and 1440px before calling it done.

### Design direction

Calm and focused, not a loud fitness app. Dark mode as the default with a light option, both driven by CSS variables. Generous whitespace, one restrained accent colour, clear typographic hierarchy. Subtle motion only — a fade or slide on route change, nothing bouncy. Every list has a considered empty state that tells me what to do next, and every async surface has a skeleton loader rather than a spinner.

### Engineering standards

- Server Components by default; `"use client"` only where interactivity genuinely requires it.
- Mutations via Server Actions with Zod validation on the server side — never trust the client.
- Optimistic UI for check-ins and habit ticks; they must feel instant.
- Sensible folder structure: `src/app`, `src/components/ui`, `src/components/<feature>`, `src/lib`, `src/hooks`, `src/types`.
- Error boundaries and `loading.tsx` at each route segment.
- `.env.example` committed, `.env.local` gitignored.
- ESLint + Prettier configured and passing.
- A `README.md` covering local setup, migration workflow, and deploying to Vercel with the custom domain.

### How to proceed

1. Confirm the data model and the shared-vs-private split with me before writing migrations.
2. Scaffold the project and get auth + protected routes working end to end first.
3. Then build the three pillars one at a time, fully finished — schema, RLS, UI, mobile layout — before moving to the next.
4. Finish with the dashboard, which depends on all three.
5. Run the Supabase security advisors and resolve everything they flag.

Do not stub things out with "TODO" and move on. Each pillar should be genuinely usable when you say it's done.

---

## Before you run it

- Create the Supabase project first and have the project URL + anon key ready.
- Point the `lewe` CNAME at Vercel once the first deploy is up.
- Turn off public signups in Supabase Auth **before** the app is ever publicly reachable.
