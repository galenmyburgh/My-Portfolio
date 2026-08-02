import Link from "next/link";

import { site, socials } from "@/lib/site";

const columns = [
  {
    heading: "Site",
    links: [
      { href: "/work", label: "Work" },
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
    ],
  },
  {
    heading: "More",
    links: [
      { href: "/lab", label: "Lab" },
      { href: "/uses", label: "Uses" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

const external = [
  { href: socials.github, label: "GitHub" },
  { href: socials.linkedin, label: "LinkedIn" },
  { href: socials.instagram, label: "Instagram" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <p className="font-mono text-sm text-ink">
            galen<span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
          <p className="mt-3 text-sm text-faint">{site.location}</p>
        </div>

        {columns.map((column) => (
          <nav key={column.heading} aria-label={column.heading}>
            <h2 className="text-2xs font-medium tracking-[0.14em] text-faint uppercase">
              {column.heading}
            </h2>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <nav aria-label="Elsewhere">
          <h2 className="text-2xs font-medium tracking-[0.14em] text-faint uppercase">
            Elsewhere
          </h2>
          <ul className="mt-3 space-y-2">
            {external.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-sm text-faint sm:px-8">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>
            Built with Next.js and too much attention to frame time.{" "}
            <a
              href="https://github.com/galenmyburgh/My-Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
            >
              Read the code
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
