/**
 * Single source of truth for anything that needs the site's own address —
 * canonical tags, Open Graph URLs, the sitemap, JSON-LD.
 *
 * `NEXT_PUBLIC_SITE_URL` overrides this, which is what preview deployments
 * should set so they don't advertise production canonicals. The default is the
 * real origin rather than localhost: a fresh clone with no `.env.local` then
 * still builds something correct, and the failure mode of a missed env var is
 * "canonicals point at production" instead of "canonicals point at localhost".
 */

const PRODUCTION_ORIGIN = "https://galenmyburgh.com";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || PRODUCTION_ORIGIN;

export const site = {
  url: siteUrl,
  name: "Galen Myburgh",
  /** One line, not ten rotating titles. */
  tagline: "I build production mobile and web systems that handle money, scale and mess.",
  /**
   * Three, not ten — a visitor who reads ten titles reads none of them.
   *
   * Hardware & IoT is deliberately *not* here despite being distinctive. It's a
   * supporting act rather than a headline: still a constellation category, a
   * `/services` offer, and four client write-ups on `/about`. The three that
   * made the cut are the ones with the longest runway — the stack, the current
   * work, and the thread that runs from Mewzo through Payflex to Batsamayi.
   */
  specialisms: ["Flutter & React", "Payments & NFC", "AI products"],
  description:
    "Galen Myburgh builds production mobile and web systems — Flutter and React apps, " +
    "payments and NFC integrations, and AI products. Based in South Africa.",
  locale: "en_ZA",
  email: "galen.myburgh46@gmail.com",
  location: "Pretoria, South Africa",
} as const;

export const socials = {
  github: "https://github.com/galenmyburgh",
  linkedin: "https://www.linkedin.com/in/galen-myburgh-537340193/",
  instagram: "https://www.instagram.com/galenmyburgh/",
  facebook: "https://www.facebook.com/galen.myburgh",
} as const;

/**
 * The CV currently lives on Google Drive. That link is fragile and leaks a
 * Drive file ID — replace it with a file served from /public and this constant
 * is the only thing that has to change.
 */
export const resumeUrl =
  "https://drive.google.com/file/d/1ffZrcMcn8UatXGIaautbbqpV7ADNaETA/view?usp=sharing";

export const absoluteUrl = (path: string) =>
  new URL(path.startsWith("/") ? path : `/${path}`, siteUrl).toString();
