import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses",
  description: "The hardware, editor, and tools Galen Myburgh actually uses day to day.",
  alternates: { canonical: "/uses" },
};

/**
 * NOTE: hardware is a placeholder — fill in what you actually use. Everything
 * else is drawn from the tech list and is accurate.
 */
const groups = [
  {
    heading: "Editor & terminal",
    items: [
      { name: "VS Code", note: "Primary editor. Dart, TypeScript and Tailwind extensions." },
      { name: "Cursor", note: "Primary AI editor — see below." },
      { name: "Android Studio", note: "For anything that needs the emulator, profiler or Gradle." },
      { name: "Xcode", note: "iOS builds, signing, and the native debugging Flutter can't reach." },
    ],
  },
  {
    // NOTE: these are drafted. Rewrite each in your own words — "what I actually
    // reach for it for" is the part that separates this from every other list of
    // AI tool logos.
    heading: "AI in the loop",
    items: [
      {
        name: "Claude Code",
        note: "Agentic work in the terminal. Multi-file refactors, migrations and reviews where the change spans more of the repo than fits in a chat window.",
      },
      {
        name: "Cursor",
        note: "The default editor. Inline completion and edits where I'm already working, rather than copying between a browser tab and the file.",
      },
      {
        name: "ChatGPT / Codex",
        note: "Drafting an implementation, then arguing with it. Most useful before I've committed to an approach, when the cost of being wrong is still zero.",
      },
      {
        name: "Gemini",
        note: "Long-context reading — a large codebase or a pile of documentation in one pass, when the question is 'where does this actually happen'.",
      },
    ],
  },
  {
    heading: "Build & ship",
    items: [
      { name: "Flutter + Dart", note: "Default for mobile unless there's a reason not to." },
      { name: "Next.js + TypeScript", note: "Default for web. App Router, strict mode." },
      { name: "Supabase", note: "Postgres with row-level security when I want SQL and auth without running servers." },
      { name: "Firebase", note: "Firestore, Cloud Functions, Crashlytics, FCM." },
      { name: "Docker", note: "Reproducible environments, so 'works on my machine' stays true elsewhere." },
      { name: "Git + GitHub", note: "Small commits, real messages, review before merge." },
    ],
  },
  {
    heading: "Design & debug",
    items: [
      { name: "Figma", note: "Reading designer handoff, measuring, exporting." },
      { name: "Firebase Crashlytics", note: "Decides what I fix next, more reliably than my intuition does." },
      { name: "Charles / DevTools", note: "When the bug is on the wire rather than in the code." },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Uses</h1>
      <p className="mt-3 max-w-2xl text-pretty text-muted">
        What I actually reach for. Not an aspirational list — if it&apos;s here, I&apos;ve
        shipped something with it. That includes the AI tooling: it&apos;s in the daily
        loop, and I think being specific about what each one is good for is more useful
        than claiming to be &quot;AI-first&quot;.
      </p>

      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <section key={group.heading} aria-labelledby={group.heading}>
            <h2
              id={group.heading}
              className="text-2xs font-medium tracking-[0.14em] text-faint uppercase"
            >
              {group.heading}
            </h2>
            <ul className="mt-4 divide-y divide-hairline">
              {group.items.map((item) => (
                <li key={item.name} className="grid gap-1 py-4 sm:grid-cols-[1fr_2fr] sm:gap-6">
                  <p className="font-medium text-ink">{item.name}</p>
                  <p className="text-sm leading-relaxed text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
