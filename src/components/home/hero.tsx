"use client";

import Link from "next/link";
import { useState } from "react";

import { Constellation } from "@/components/constellation";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { TechList } from "@/components/constellation/tech-list";
import { WorkCard } from "@/components/work-card";
import { Reveal } from "@/components/reveal";
import { categories, techById } from "@/content/tech";
import { stats } from "@/content/career";
import type { WorkCardData } from "@/content/work";
import { site, resumeUrl } from "@/lib/site";

/**
 * Hero + featured work.
 *
 * These are one component because the constellation *is* the navigation for
 * the work section — selecting a technology filters the case studies below it.
 * Splitting them would mean lifting the selection into a context for no gain.
 */
/** `studies` arrives from the server as card data only — see WorkCardData. */
export function Hero({ studies }: { studies: WorkCardData[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = selected
    ? studies.filter((s) => s.stack.includes(selected))
    : studies.filter((s) => s.featured);

  const selectedTech = selected ? techById.get(selected) : null;

  return (
    <>
      <section className="relative isolate px-5 pt-14 pb-8 sm:px-8 sm:pt-20">
        <HeroBackdrop selected={selected} />
        <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="font-mono text-sm text-accent">Galen Myburgh</p>

            <h1 className="mt-4 text-balance text-4xl leading-[1.08] font-semibold tracking-tight text-ink sm:text-5xl">
              I build production mobile &amp; web systems that handle{" "}
              <span className="text-accent">money, scale and mess.</span>
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Five years shipping Flutter and React — a buy-now-pay-later app used by
              hundreds of thousands of people, a cashless wallet that settles on an NFC
              card with no signal, and the AI products I work on now. Mostly the kind of
              system where being approximately right is the same as being wrong.
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {site.specialisms.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-hairline bg-surface px-3 py-1 text-sm text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>

            {/* Three audiences, three exits. */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
              >
                Read the case studies
              </Link>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-edge px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface"
              >
                Download CV
              </a>
              <Link
                href="/contact"
                className="rounded-lg px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                Book a call
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-hairline pt-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block font-mono text-2xl font-medium text-ink">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-faint">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <Constellation selected={selected} onSelect={setSelected} />

            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {Object.entries(categories).map(([id, meta]) => (
                <span key={id} className="flex items-center gap-1.5 text-xs text-faint">
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full"
                    style={{ backgroundColor: meta.color }}
                  />
                  {meta.label}
                </span>
              ))}
            </div>

            <p className="mt-3 text-center text-sm text-faint">
              Every node is something I&apos;ve shipped with. Pick one to filter the work.
            </p>

            <TechList selected={selected} onSelect={setSelected} />
          </div>
        </div>
        </div>
      </section>

      <section
        id="work"
        aria-labelledby="featured-heading"
        className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
          <div>
            <h2 id="featured-heading" className="text-2xl font-semibold tracking-tight text-ink">
              {selectedTech ? `Work using ${selectedTech.name}` : "Selected work"}
            </h2>
            <p aria-live="polite" className="mt-1 text-sm text-muted">
              {selectedTech
                ? `${filtered.length} ${filtered.length === 1 ? "case study" : "case studies"} — ${selectedTech.note}`
                : "Full write-ups: the problem, the constraints, what was hard, what changed."}
            </p>
          </div>

          {selectedTech ? (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="rounded-lg border border-edge px-4 py-2 text-sm text-ink transition-colors hover:bg-surface"
            >
              Clear filter
            </button>
          ) : (
            <Link
              href="/work"
              className="text-sm text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
            >
              All work →
            </Link>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((study, i) => (
              <Reveal key={study.slug} delay={i * 70}>
                <WorkCard study={study} priority={i === 0} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-hairline bg-surface p-6">
            <p className="text-muted">
              No case study is built <em>on</em> {selectedTech?.name} — it&apos;s part of
              how the work gets made rather than what it&apos;s made of.
            </p>
            <p className="mt-3 text-sm text-muted">
              {selectedTech?.note}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <Link
                href="/uses"
                className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
              >
                What I use it for →
              </Link>
              <Link
                href="/lab"
                className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
              >
                How this site was built →
              </Link>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-muted underline decoration-hairline underline-offset-4 hover:text-ink"
              >
                Show everything
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
