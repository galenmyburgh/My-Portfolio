import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Freelance mobile and web development — Flutter and React builds, payments integration, and rescuing products that have outgrown low-code.",
  alternates: { canonical: "/services" },
};

/**
 * NOTE: rates are deliberately left out until you decide them. Add a
 * "what it costs" block here — clients who can't find pricing usually assume
 * the worst and don't ask.
 */
const services = [
  {
    title: "Mobile app builds",
    body: "Flutter for Android and iOS, from an empty repo to both stores. Includes release setup, crash reporting and the store submission work that always takes longer than people expect.",
    good: "You have a product to build and want one person accountable for it shipping.",
  },
  {
    title: "Getting off low-code",
    body: "FlutterFlow or Bubble got you to market and is now the thing holding you back. I've done this migration: keep the original running and shipping while its replacement is built alongside it, then cut over at feature parity.",
    good: "Your workarounds cost more than the rebuild would.",
  },
  {
    title: "Payments integration",
    body: "Checkout, subscriptions and entitlements — Paystack, RevenueCat, store billing. The work here is the failure cases: lost confirmations, safe retries, and never double-charging anyone.",
    good: "Money moves through your product and you want it to be boring.",
  },
  {
    title: "Rescue and stabilise",
    body: "An app that crashes, a codebase nobody wants to touch. Instrument it first so the priority order comes from data, then refactor incrementally while features keep shipping.",
    good: "The next feature keeps costing more than the last one.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Services</h1>
      <p className="mt-3 max-w-2xl text-pretty text-muted">
        I take on a small number of freelance projects alongside full-time work. That
        means I&apos;m selective, and it means I&apos;ll tell you if your project is a bad
        fit rather than take it anyway.
      </p>

      <div className="mt-12 space-y-6">
        {services.map((service) => (
          <section
            key={service.title}
            className="rounded-xl border border-hairline bg-surface p-6"
          >
            <h2 className="text-lg font-semibold text-ink">{service.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">{service.body}</p>
            <p className="mt-3 text-sm text-faint">
              <span className="font-medium text-muted">Good fit if:</span> {service.good}
            </p>
          </section>
        ))}
      </div>

      <section aria-labelledby="how" className="mt-16">
        <h2 id="how" className="text-2xl font-semibold tracking-tight text-ink">
          How it works
        </h2>
        <ol className="mt-6 space-y-5">
          {[
            ["A call", "Half an hour. What you're building, what's in the way, whether I'm the right person. No charge and no pitch."],
            ["A written scope", "What I'll build, what I won't, what I need from you, and what it costs. Fixed price where the scope is clear, day rate where it isn't."],
            ["Build in the open", "You get a running build early and often. If something turns out to be a bad idea, you hear it from me before it's expensive."],
            ["Handover", "Documented, deployed, and yours. I'd rather you didn't need me afterwards."],
          ].map(([title, body], i) => (
            <li key={title} className="flex gap-4">
              <span className="font-mono text-sm text-accent">0{i + 1}</span>
              <div>
                <p className="font-medium text-ink">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-12 rounded-xl border border-hairline bg-surface p-6">
        <h2 className="text-lg font-semibold text-ink">Start with a call</h2>
        <p className="mt-2 text-sm text-muted">
          Tell me what you&apos;re building and what&apos;s in the way.
        </p>
        <Link
          href="/contact"
          className="mt-4 inline-block rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover"
        >
          Get in touch
        </Link>
      </div>
    </div>
  );
}
