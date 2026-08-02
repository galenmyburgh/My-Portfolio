"use client";

import { useRootAttribute } from "@/lib/use-media-query";

type Theme = "light" | "dark";

/**
 * Theme switch.
 *
 * The circular wipe uses the View Transitions API where it exists, expanding
 * from the button itself. Where it doesn't (Firefox, older Safari), the theme
 * simply changes — the attribute flip is the actual behaviour and the
 * animation is decoration on top of it.
 */
export function ThemeToggle() {
  // The attribute on <html> is the source of truth — set before first paint by
  // the inline script, and mutated by this button. Reading it rather than
  // mirroring it in state means the two can never disagree.
  const attribute = useRootAttribute("data-theme");
  const theme: Theme = attribute === "dark" ? "dark" : "light";
  const mounted = attribute !== "";

  const apply = (next: Theme) => {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing. The theme still applies for this session.
    }
  };

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "dark" ? "light" : "dark";

    const reduced =
      document.documentElement.getAttribute("data-motion") === "reduce";

    if (reduced || !("startViewTransition" in document)) {
      apply(next);
      return;
    }

    // Expand the wipe from the button, out to whichever corner is furthest.
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => apply(next));

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`],
        },
        {
          duration: 380,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      // Before mount we don't know the theme, so don't announce a wrong one.
      aria-label={mounted ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Switch theme"}
      className="grid size-10 place-items-center rounded-full border border-hairline bg-raised text-muted transition-colors hover:border-edge hover:text-ink"
    >
      {/* Both icons ship; CSS picks one, so there is nothing to hydrate. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[18px] [html[data-theme=dark]_&]:hidden"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="hidden size-[18px] [html[data-theme=dark]_&]:block"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2Z" />
      </svg>
    </button>
  );
}
