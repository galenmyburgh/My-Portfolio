import Link from "next/link";

import { Hero } from "@/components/home/hero";
import { Reveal } from "@/components/reveal";
import { roles } from "@/content/career";
import { workCards } from "@/content/work";

export default function HomePage() {
  return (
    <>
      <Hero studies={workCards()} />

      <section aria-labelledby="how-heading" className="border-y border-hairline bg-surface">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 id="how-heading" className="text-2xl font-semibold tracking-tight text-ink">
            How I work
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Most of what goes wrong on a project goes wrong before anyone writes code, so
            this is the part I take seriously.
          </p>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                stage: "Understand",
                body: "Whose problem is this, how bad is it, and what happens if we do nothing? A brief that can't answer those isn't ready to build against.",
              },
              {
                stage: "Build",
                body: "Ship something real early, against real data. Boring code a stranger can change in six months beats clever code only I can.",
              },
              {
                stage: "Watch",
                body: "Crash reporting and analytics from day one. At Payflex, Crashlytics decided what got refactored — without that signal you are guessing.",
              },
            ].map((item, i) => (
              <Reveal as="li" key={item.stage} delay={i * 90}>
                <p className="font-mono text-sm text-accent">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{item.stage}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="now-heading" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
          <h2 id="now-heading" className="text-2xl font-semibold tracking-tight text-ink">
            Where I&apos;ve worked
          </h2>
          <Link
            href="/about"
            className="text-sm text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
          >
            Full history →
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-hairline">
          {roles.slice(0, 3).map((role, i) => (
            <Reveal as="li" key={role.id} delay={i * 70}>
              <div className="grid gap-2 py-5 sm:grid-cols-[1fr_2fr]">
                <div>
                  <p className="font-medium text-ink">{role.company}</p>
                  <p className="text-sm text-faint">
                    {role.start} – {role.end}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-ink">{role.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{role.summary}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>
    </>
  );
}
