import Image from "next/image";
import Link from "next/link";

import { categories, techById } from "@/content/tech";
import type { WorkCardData } from "@/content/work";

/**
 * A case study card.
 *
 * The whole card is a link, but only the title is the anchor — the rest is
 * covered by a stretched pseudo-element. That keeps the accessible name short
 * ("Stabilising a buy-now-pay-later app…" rather than the entire card's text)
 * while the full card stays clickable.
 */
export function WorkCard({ study, priority = false }: { study: WorkCardData; priority?: boolean }) {
  const headline = study.headline;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-hairline bg-raised transition-colors hover:border-edge">
      {study.image ? (
        <div className="relative aspect-16/10 overflow-hidden bg-surface">
          <Image
            src={study.image}
            alt={study.imageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="aspect-16/10 bg-surface"
          style={{
            backgroundImage: `radial-gradient(circle at 30% 30%, ${categories[study.category].color}22, transparent 60%)`,
          }}
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-2 text-2xs font-medium tracking-[0.14em] text-faint uppercase">
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full"
            style={{ backgroundColor: categories[study.category].color }}
          />
          {study.client} · {study.year}
        </p>

        <h3 className="mt-2 text-lg leading-snug font-semibold text-ink">
          <Link
            href={`/work/${study.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {study.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{study.summary}</p>

        {headline && (
          <p className="mt-4 text-sm text-ink">
            <span className="font-mono text-base font-medium text-accent">{headline.value}</span>{" "}
            <span className="text-muted">{headline.label.toLowerCase()}</span>
          </p>
        )}

        <ul className="mt-4 flex flex-wrap gap-1.5 pt-1">
          {study.stack.slice(0, 4).map((id) => {
            const t = techById.get(id);
            if (!t) return null;
            return (
              <li
                key={id}
                className="rounded-md border border-hairline px-2 py-0.5 text-2xs text-muted"
              >
                {t.name}
              </li>
            );
          })}
          {study.stack.length > 4 && (
            <li className="px-1 py-0.5 text-2xs text-faint">+{study.stack.length - 4}</li>
          )}
        </ul>
      </div>
    </article>
  );
}
