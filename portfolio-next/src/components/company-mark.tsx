import Image from "next/image";

/**
 * A company's mark, in a uniform tile.
 *
 * Real logos vary wildly — square app icons, wide wordmarks, coats of arms, and
 * for private clients, nothing at all. Rather than let that decide the layout,
 * every mark sits in the same rounded tile and is contained inside it. Where no
 * asset exists, a monogram in the same tile keeps the row even.
 *
 * Logos are served from /public/logos rather than hotlinked, so a client
 * redesigning their site can't silently break this page.
 */
export function CompanyMark({
  name,
  logo,
  size = 44,
}: {
  name: string;
  logo?: string;
  size?: number;
}) {
  // "Fix Glass (UK)" → "FG", "Payflex" → "P". Two letters at most.
  const initials = name
    .replace(/\(.*?\)/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className="grid shrink-0 place-items-center overflow-hidden rounded-xl border border-hairline bg-raised"
      style={{ width: size, height: size }}
    >
      {logo ? (
        <Image
          src={logo}
          alt=""
          width={size}
          height={size}
          // Decorative: the company name is always adjacent as real text.
          aria-hidden="true"
          className="size-full object-contain p-1.5"
        />
      ) : (
        <span
          aria-hidden="true"
          className="font-mono font-medium text-muted"
          style={{ fontSize: size * 0.34 }}
        >
          {initials}
        </span>
      )}
    </span>
  );
}
