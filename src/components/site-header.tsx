"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ThemeToggle } from "./theme-toggle";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/lab", label: "Lab" },
  { href: "/uses", label: "Uses" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const listRef = useRef<HTMLUListElement>(null);
  // The sliding pill that sits behind the active/hovered link.
  const [pill, setPill] = useState<{ left: number; width: number; visible: boolean }>({
    left: 0,
    width: 0,
    visible: false,
  });

  // Close the mobile menu on navigation. Derived during render by comparing
  // against the previous pathname — the effect-and-setState version renders the
  // stale open menu for a frame before closing it.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // The header condenses once you leave the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  /** Move the pill to a given link, or back to the active one. */
  const moveTo = (element: HTMLElement | null) => {
    const list = listRef.current;
    if (!list) return;

    const target =
      element ?? (list.querySelector('[aria-current="page"]') as HTMLElement | null);

    if (!target) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }

    setPill({
      left: target.offsetLeft,
      width: target.offsetWidth,
      visible: true,
    });
  };

  // Settle the pill on the active link whenever the route changes.
  useEffect(() => {
    const id = requestAnimationFrame(() => moveTo(null));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <header data-scrolled={scrolled} className="sticky top-0 z-50">
      {/* The bar floats with a gap above and beside it, so page content would
          otherwise slide through that gap. This scrim is full-bleed and opaque
          where it matters, fading out at the bottom edge so there is no hard
          line under the bar. A translucent scrim is not enough here: 15% of
          near-white body text over a near-black canvas is still legible. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100%+0.5rem)] bg-canvas transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,#000_0%,#000_70%,transparent_100%)] ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Outer element owns the centring; the inner one is the floating bar, so
          the two never fight over the same margin utilities. */}
      <div
        className={`mx-auto max-w-6xl transition-[padding] duration-300 ${
          scrolled ? "px-3 pt-2 sm:px-4 sm:pt-3" : "px-4 pt-0 sm:px-6"
        }`}
      >
        <div
          className={`flex items-center gap-3 transition-all duration-300 ${
            scrolled
              ? "h-14 rounded-2xl border border-hairline bg-surface/90 px-3 shadow-lg shadow-black/5 backdrop-blur-xl"
              : "h-16 rounded-2xl border border-transparent px-0"
          }`}
        >
        <Link
          href="/"
          aria-label="Galen Myburgh, home"
          className="group flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight text-ink"
        >
          {/* The constellation mark, reduced to three nodes. */}
          <span className="relative grid size-8 shrink-0 place-items-center rounded-lg bg-accent/10 ring-1 ring-accent/20 transition-colors group-hover:bg-accent/15">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 overflow-visible">
              <g stroke="currentColor" strokeWidth="1.1" className="text-accent/45">
                <line x1="6" y1="7" x2="17" y2="11" />
                <line x1="17" y1="11" x2="9" y2="18" />
                <line x1="6" y1="7" x2="9" y2="18" />
              </g>
              <circle cx="6" cy="7" r="2.6" className="fill-accent" />
              <circle cx="17" cy="11" r="2" className="fill-cat-data" />
              <circle cx="9" cy="18" r="2" className="fill-cat-web" />
            </svg>
          </span>
          <span className="hidden sm:inline">
            galen<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop nav: a sliding pill tracks hover, and settles on the current page. */}
        <nav aria-label="Main" className="ml-auto hidden md:block">
          <ul
            ref={listRef}
            onMouseLeave={() => moveTo(null)}
            className="relative flex items-center gap-0.5 rounded-full border border-hairline bg-surface/60 p-1 backdrop-blur-sm"
          >
            <span
              aria-hidden="true"
              className="absolute top-1 bottom-1 rounded-full bg-raised shadow-sm ring-1 ring-hairline transition-all duration-300 ease-out-expo"
              style={{
                left: pill.left,
                width: pill.width,
                opacity: pill.visible ? 1 : 0,
              }}
            />
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onMouseEnter={(e) => moveTo(e.currentTarget)}
                  onFocus={(e) => moveTo(e.currentTarget)}
                  className={`relative z-10 block rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-3">
          <Link
            href="/contact"
            className="group relative hidden overflow-hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-on-accent transition-colors hover:bg-accent-hover sm:inline-flex sm:items-center sm:gap-1.5"
          >
            Get in touch
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" />
            </svg>
          </Link>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-hairline bg-raised text-muted transition-colors hover:text-ink md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-hairline bg-canvas/95 shadow-xl backdrop-blur-xl md:hidden"
          style={{ marginInline: "0.75rem" }}
        >
          <ul className="p-2">
            {[...nav, { href: "/contact", label: "Contact" }].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  style={{ animationDelay: `${i * 35}ms` }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors ${
                    isActive(item.href)
                      ? "bg-surface text-ink"
                      : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {item.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="size-3.5 opacity-40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 3.5 10.5 8 6 12.5" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
