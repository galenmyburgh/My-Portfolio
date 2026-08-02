import type { Metadata } from "next";
import Link from "next/link";

import { socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Experiments and notes — how the constellation on the home page works, and other things worth writing down.",
  alternates: { canonical: "/lab" },
};

/**
 * NOTE: this page currently documents this site's own internals, which is
 * genuinely the most interesting thing here for a peer developer. Add
 * experiments as you build them; the page is designed to grow.
 */
const entries = [
  {
    title: "The constellation is the navigation",
    body: "The hero isn't decoration — every node is a technology, every edge is a real path from one of the case studies, and clicking a node filters the work below. It ships as positioned HTML buttons over an SVG edge layer, so it is tab-navigable and screen-reader-readable before any WebGL loads.",
    tag: "This site",
  },
  {
    title: "Deterministic layout, no Math.random in render",
    body: "Node positions come from a seeded PRNG (mulberry32) computed once at module load. The previous version of this site called Math.random() during render, so every state change teleported the particles — a good example of a bug that looks like a design choice.",
    tag: "This site",
  },
  {
    title: "One motion switch, read by both CSS and JS",
    body: "A blocking script sets data-motion=\"reduce\" on <html> before first paint. CSS uses it to disable transitions; JavaScript reads the same attribute to skip the WebGL loop and the view transitions. One source of truth means the two can't disagree.",
    tag: "This site",
  },
  {
    title: "Architecture diagrams that lay themselves out",
    body: "Case studies describe architecture as nodes and edges only. A longest-path layering assigns columns at render time, so adding a service to a diagram is one line of data rather than a coordinate rewrite. They draw in on scroll with stroke-dasharray.",
    tag: "This site",
  },
];

export default function LabPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Lab</h1>
      <p className="mt-3 max-w-2xl text-pretty text-muted">
        Notes on things I&apos;ve built, starting with this site. If you&apos;ve got
        DevTools open already, this is the page for you.
      </p>

      <ul className="mt-12 space-y-6">
        {entries.map((entry) => (
          <li key={entry.title} className="rounded-xl border border-hairline bg-surface p-6">
            <p className="font-mono text-2xs tracking-[0.14em] text-faint uppercase">
              {entry.tag}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-ink">{entry.title}</h2>
            <p className="mt-2 leading-relaxed text-muted">{entry.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-muted">
        The whole thing is open source —{" "}
        <a
          href="https://github.com/galenmyburgh/My-Portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
        >
          read the code
        </a>
        , or see{" "}
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
        >
          the rest of my GitHub
        </a>
        . For finished work, the{" "}
        <Link
          href="/work"
          className="text-accent underline decoration-hairline underline-offset-4 hover:decoration-current"
        >
          case studies
        </Link>{" "}
        go deeper.
      </p>
    </div>
  );
}
