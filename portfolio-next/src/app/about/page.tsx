import type { Metadata } from "next";
import Link from "next/link";

import { CompanyMark } from "@/components/company-mark";
import { Reveal } from "@/components/reveal";
import { certifications, education, engagements, roles } from "@/content/career";
import { categories, techById } from "@/content/tech";
import { resumeUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Galen Myburgh — mobile and web developer in Pretoria. Five years of Flutter and React, payments and NFC integration, AI products, BSc Computer Science, Honours in progress.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">About</h1>

      <div className="mt-6 space-y-5 text-pretty leading-relaxed text-muted">
        <p>
          I started in tech support — the kind where someone hands you a machine that
          doesn&apos;t work and expects it to work by the afternoon. That turns out to be
          good training for software: you learn to reproduce a problem before theorising
          about it, and you learn that the user&apos;s description of the fault is
          evidence, not diagnosis.
        </p>
        <p>
          Since 2021 I&apos;ve been building mobile and web products, mostly in Flutter
          and React. The work I&apos;m proudest of isn&apos;t the prettiest: it&apos;s a
          buy-now-pay-later app whose crash rate I helped cut by more than 40% while it
          was live for hundreds of thousands of people, and a product I moved off low-code
          without losing a single feature.
        </p>
        <p>
          Through my own company, Codelyn, I spent a year contracting on the kind of work
          that doesn&apos;t fit in a browser tab — pairing NFC card readers to a wallet
          that settles offline, shutting industrial fire pumps down from a phone through
          an ESP module, routing windscreen technicians between jobs in the UK. Software
          that has to agree with a physical object is a different discipline, and I like it.
        </p>
        <p>
          Right now I&apos;m at Tripleblue working on AI products — their knowledge agent
          and AI Notes, plus the note-taking mobile app and the German DMS counterpart.
          The interesting problem there isn&apos;t the model. It&apos;s everything around
          it: what the product does when the answer is wrong, and how a user can tell.
        </p>
        <p>
          I gravitate toward systems where correctness has consequences — payments,
          hardware, background processing, anything where &quot;mostly working&quot; is a
          synonym for broken. I finished a BSc in Computer Science at Akademia in 2025 and
          I&apos;m now reading for a BSc Honours at the University of Pretoria, moving
          toward digital forensics and cyber security. Based in {site.location}.
        </p>
      </div>

      <p className="mt-8">
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
        >
          Download CV
        </a>
      </p>

      <section aria-labelledby="experience" className="mt-16">
        <h2 id="experience" className="text-2xl font-semibold tracking-tight text-ink">
          Experience
        </h2>

        <ol className="mt-6 space-y-8 border-l border-hairline pl-6">
          {roles.map((role, i) => (
            <Reveal as="li" key={role.id} delay={i * 60} className="relative">
              <span
                aria-hidden="true"
                className={`absolute -left-[1.8125rem] top-2 size-2.5 rounded-full border-2 border-canvas ${
                  role.current ? "bg-accent" : "bg-edge"
                }`}
              />
              <div className="flex items-start gap-3">
                <CompanyMark name={role.company} logo={role.logo} />
                <div>
                  <p className="text-sm text-faint">
                    {role.start} – {role.end}
                  </p>
                  <h3 className="text-lg leading-snug font-semibold text-ink">
                    {role.title}{" "}
                    <span className="font-normal text-muted">at {role.company}</span>
                  </h3>
                </div>
              </div>
              <p className="mt-2 leading-relaxed text-muted">{role.summary}</p>
              {role.highlights.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {role.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 size-1 shrink-0 rounded-full bg-edge"
                      />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </section>

      <section aria-labelledby="freelance" className="mt-16">
        <h2 id="freelance" className="text-2xl font-semibold tracking-tight text-ink">
          Freelance clients
        </h2>
        <p className="mt-2 text-muted">
          Through Codelyn, 2025–2026. Short write-ups — the full case studies in{" "}
          <Link
            href="/work"
            className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
          >
            Work
          </Link>{" "}
          go deeper.
        </p>

        <ul className="mt-6 space-y-5">
          {engagements.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 60}>
              <div className="rounded-xl border border-hairline bg-surface p-5">
                <div className="flex items-center gap-3">
                  <CompanyMark name={item.client} logo={item.logo} size={38} />
                  <h3 className="font-semibold text-ink">{item.client}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.stack.map((id) => {
                    const t = techById.get(id);
                    if (!t) return null;
                    return (
                      <li
                        key={id}
                        className="flex items-center gap-1.5 rounded-md border border-hairline px-2 py-0.5 text-2xs text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full"
                          style={{ backgroundColor: categories[t.category].color }}
                        />
                        {t.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="study" className="mt-16">
        <h2 id="study" className="text-2xl font-semibold tracking-tight text-ink">
          Study &amp; certification
        </h2>

        <ul className="mt-6 divide-y divide-hairline">
          {[...education, ...certifications].map((item) => (
            <li key={item.id} className="grid gap-2 py-5 sm:grid-cols-[1fr_2fr]">
              <div className="flex items-start gap-3">
                <CompanyMark name={item.institution} logo={item.logo} size={38} />
                <div>
                  <p className="text-sm text-faint">
                    {item.start === item.end ? item.start : `${item.start} – ${item.end}`}
                  </p>
                  <p className="mt-0.5 font-medium text-ink">{item.institution}</p>
                </div>
              </div>
              <div>
                <p className="font-medium text-ink">
                  {item.qualification}
                  {item.result && (
                    <span className="ml-2 rounded-md border border-hairline px-2 py-0.5 text-2xs font-normal text-muted">
                      {item.result}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
