"use client";

import { useMemo, useState } from "react";

import { WorkCard } from "@/components/work-card";
import { Reveal } from "@/components/reveal";
import { categories, type CategoryId } from "@/content/tech";
import type { WorkCardData } from "@/content/work";

type Filter = CategoryId | "all";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  ...(Object.entries(categories) as [CategoryId, { label: string }][]).map(([id, meta]) => ({
    id,
    label: meta.label,
  })),
];

export function WorkIndex({ studies }: { studies: WorkCardData[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  // Only offer a filter that would actually return something.
  const available = useMemo(
    () => filters.filter((f) => f.id === "all" || studies.some((s) => s.category === f.id)),
    [studies]
  );

  const shown = filter === "all" ? studies : studies.filter((s) => s.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter case studies" className="mt-8 flex flex-wrap gap-2">
        {available.map((f) => {
          const active = filter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                active
                  ? "border-accent bg-accent text-on-accent"
                  : "border-hairline text-muted hover:border-edge hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="mt-4 text-sm text-faint">
        {shown.length} {shown.length === 1 ? "case study" : "case studies"}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((study, i) => (
          <Reveal key={study.slug} delay={i * 60}>
            <WorkCard study={study} priority={i < 3} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
