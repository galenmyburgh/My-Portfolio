import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { Reveal } from "@/components/reveal";
import { categories, techById } from "@/content/tech";
import { caseStudies, getCaseStudy, visibleOutcomes } from "@/content/work";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

// Next 16: params is a Promise in pages, layouts, route handlers and metadata.
export async function generateMetadata(props: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) return {};

  return {
    title: study.title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      url: `/work/${study.slug}`,
    },
  };
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const outcomes = visibleOutcomes(study);
  const index = caseStudies.findIndex((s) => s.slug === slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.summary,
    author: { "@type": "Person", name: site.name },
    dateCreated: study.year,
    keywords: study.stack.map((id) => techById.get(id)?.name).filter(Boolean).join(", "),
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/work" className="text-muted transition-colors hover:text-ink">
          ← All work
        </Link>
      </nav>

      <header className="mt-6">
        <p className="flex items-center gap-2 text-2xs font-medium tracking-[0.14em] text-faint uppercase">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: categories[study.category].color }}
          />
          {study.client} · {study.timeline}
        </p>

        <h1 className="mt-3 text-balance text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-4xl">
          {study.title}
        </h1>

        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{study.summary}</p>

        <dl className="mt-8 grid gap-4 border-y border-hairline py-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-faint">Role</dt>
            <dd className="mt-0.5 text-ink">{study.role}</dd>
          </div>
          <div>
            <dt className="text-faint">Team</dt>
            <dd className="mt-0.5 text-ink">{study.team}</dd>
          </div>
          <div>
            <dt className="text-faint">Timeline</dt>
            <dd className="mt-0.5 text-ink">{study.timeline}</dd>
          </div>
        </dl>
      </header>

      {study.image && (
        <Image
          src={study.image}
          alt={study.imageAlt ?? ""}
          width={1200}
          height={750}
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="mt-8 rounded-xl border border-hairline bg-surface"
        />
      )}

      {outcomes.length > 0 && (
        <Reveal>
          <section aria-labelledby="outcomes" className="mt-12">
            <h2 id="outcomes" className="sr-only">
              Outcomes
            </h2>
            <dl className="grid gap-5 rounded-xl border border-hairline bg-surface p-6 sm:grid-cols-2">
              {outcomes.map((outcome) => (
                <div key={outcome.label}>
                  <dt className="text-sm text-muted">{outcome.label}</dt>
                  <dd
                    className={`mt-1 font-mono text-2xl font-medium ${
                      outcome.needsInput ? "text-cat-web" : "text-ink"
                    }`}
                  >
                    {outcome.value}
                    {outcome.needsInput && (
                      <span className="ml-2 align-middle text-2xs font-sans text-faint">
                        (dev only — hidden in production)
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </Reveal>
      )}

      <div className="mt-12 space-y-10">
        <Section heading="The problem">{study.problem}</Section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-ink">Constraints</h2>
          <ul className="mt-3 space-y-2">
            {study.constraints.map((c) => (
              <li key={c} className="flex gap-3 text-muted">
                <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-edge" />
                <span className="leading-relaxed">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        <Section heading="Approach">{study.approach}</Section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-ink">
            What I rejected, and why
          </h2>
          <div className="mt-4 space-y-4">
            {study.rejected.map((r) => (
              <div key={r.option} className="rounded-lg border border-hairline bg-surface p-4">
                <p className="font-medium text-ink line-through decoration-faint decoration-1">
                  {r.option}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.why}</p>
              </div>
            ))}
          </div>
        </section>

        {study.architecture && (
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink">Architecture</h2>
            <ArchitectureDiagram
              architecture={study.architecture}
              caption={`How ${study.client} fits together — dashed boxes are systems I did not own.`}
            />
          </section>
        )}

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-ink">The hard part</h2>
          <p className="mt-3 border-l-2 border-accent pl-5 text-pretty leading-relaxed text-muted">
            {study.hardPart}
          </p>
        </section>

        <Section heading="What I'd do differently">{study.learned}</Section>

        <section>
          <h2 className="text-xl font-semibold tracking-tight text-ink">Stack</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {study.stack.map((id) => {
              const t = techById.get(id);
              if (!t) return null;
              return (
                <li
                  key={id}
                  className="flex items-center gap-2 rounded-lg border border-hairline bg-surface px-3 py-1.5 text-sm text-muted"
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
        </section>

        {study.links && study.links.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-ink">Links</h2>
            <ul className="mt-3 space-y-2">
              {study.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <nav
        aria-label="More work"
        className="mt-16 flex items-center justify-between gap-4 border-t border-hairline pt-6"
      >
        <Link href="/work" className="text-sm text-muted transition-colors hover:text-ink">
          ← All work
        </Link>
        <Link href={`/work/${next.slug}`} className="text-right text-sm">
          <span className="block text-faint">Next case study</span>
          <span className="text-accent underline decoration-hairline underline-offset-4">
            {next.client} →
          </span>
        </Link>
      </nav>
    </article>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-ink">{heading}</h2>
      <p className="mt-3 text-pretty leading-relaxed text-muted">{children}</p>
    </section>
  );
}
