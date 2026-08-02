import type { Metadata } from "next";

import { ContactForm } from "./contact-form";
import { site, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Galen Myburgh about a role, a project, or a call.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        Get in touch
      </h1>
      <p className="mt-3 max-w-xl text-pretty text-muted">
        Hiring, a freelance project, or a question about something on this site — all
        welcome. I read everything and reply to anything that isn&apos;t a template.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <ContactForm />

        <aside className="space-y-6 text-sm">
          <div>
            <h2 className="text-2xs font-medium tracking-[0.14em] text-faint uppercase">
              Direct
            </h2>
            <p className="mt-2">
              <a
                href={`mailto:${site.email}`}
                className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
              >
                {site.email}
              </a>
            </p>
            <p className="mt-1 text-muted">{site.location}</p>
          </div>

          <div>
            <h2 className="text-2xs font-medium tracking-[0.14em] text-faint uppercase">
              Elsewhere
            </h2>
            <ul className="mt-2 space-y-1.5">
              <li>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted transition-colors hover:text-ink"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xs font-medium tracking-[0.14em] text-faint uppercase">
              What helps
            </h2>
            <ul className="mt-2 space-y-1.5 text-muted">
              <li>What you&apos;re building, and for whom</li>
              <li>What&apos;s currently in the way</li>
              <li>Rough timeline, if there is one</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
