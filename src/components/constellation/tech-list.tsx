"use client";

import { useState } from "react";

import { categories, tech } from "@/content/tech";
import { useMediaQuery } from "@/lib/use-media-query";

/**
 * The constellation's equivalent control.
 *
 * Two reasons this exists, and neither is box-ticking:
 *
 * 1. On a phone the constellation is a small square holding forty dots. Tapping
 *    a specific one is genuinely unpleasant, and the dots' hit areas overlap.
 * 2. WCAG 2.5.8 allows undersized targets when an equivalent control that meets
 *    the size requirement is available on the same page. This is that control —
 *    full-size chips, same selection state, same result.
 *
 * Collapsed by default on desktop so it doesn't compete with the map; open by
 * default on small screens, where it is the better interface.
 */
export function TechList({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
}) {
  // On phones this is the only way to filter, so it starts open there.
  const isPhone = useMediaQuery("(max-width: 639px)");
  const [userToggled, setUserToggled] = useState<boolean | null>(null);
  const open = userToggled ?? isPhone;

  return (
    <details
      className="group mt-4 [&[open]]:pb-2"
      open={open}
      onToggle={(e) => setUserToggled((e.currentTarget as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer list-none rounded-lg px-3 py-2 text-center text-sm text-muted transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
        <span className="underline decoration-hairline underline-offset-4">
          <span className="sm:hidden">Filter by technology</span>
          <span className="hidden sm:inline">Or pick from the full list</span>
        </span>
        <span aria-hidden="true" className="ml-1.5 inline-block transition-transform group-open:rotate-180">
          ↓
        </span>
      </summary>

      <ul className="mt-3 flex flex-wrap justify-center gap-2">
        {tech.map((item) => {
          const active = selected === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(active ? null : item.id)}
                aria-pressed={active}
                className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                  active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-hairline text-muted hover:border-edge hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor: active ? "currentColor" : categories[item.category].color,
                  }}
                />
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
