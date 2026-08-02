import type { Metadata } from "next";

import { Reveal } from "@/components/reveal";
import { certifications, education, roles } from "@/content/career";
import { resumeUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Galen Myburgh — mobile and web developer in Pretoria. Five years of Flutter and React, payments integration, and a BSc in progress.",
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
          I gravitate toward systems where correctness has consequences — payments,
          background processing, anything where &quot;mostly working&quot; is a synonym
          for broken. I&apos;m finishing a BSc in Computer Science at Akademia alongside
          full-time work, and I&apos;m based in {site.location}.
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
              <p className="text-sm text-faint">
                {role.start} – {role.end}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-ink">
                {role.title}{" "}
                <span className="font-normal text-muted">at {role.company}</span>
              </h3>
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

      <section aria-labelledby="study" className="mt-16">
        <h2 id="study" className="text-2xl font-semibold tracking-tight text-ink">
          Study &amp; certification
        </h2>

        <ul className="mt-6 divide-y divide-hairline">
          {[...education, ...certifications].map((item) => (
            <li key={item.id} className="grid gap-2 py-5 sm:grid-cols-[1fr_2fr]">
              <div>
                <p className="text-sm text-faint">
                  {item.start === item.end ? item.start : `${item.start} – ${item.end}`}
                </p>
                <p className="mt-0.5 font-medium text-ink">{item.institution}</p>
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
