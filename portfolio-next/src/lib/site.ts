/**
 * Single source of truth for anything that needs the site's own address —
 * canonical tags, Open Graph URLs, the sitemap, JSON-LD.
 *
 * Set NEXT_PUBLIC_SITE_URL in the host's environment. The localhost fallback
 * only ever applies in development; a production build without it would emit
 * localhost canonicals, so `npm run build` fails loudly instead (see below).
 */

const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

if (!fromEnv && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, Open Graph tags and the " +
      "sitemap all need the real origin — set it in the host's environment " +
      "(e.g. https://example.com) before building."
  );
}

export const siteUrl = fromEnv ?? "http://localhost:3000";

export const site = {
  url: siteUrl,
  name: "Galen Myburgh",
  /** One line, not ten rotating titles. */
  tagline: "I build production mobile and web systems that handle money, scale and mess.",
  specialisms: ["Flutter & React", "Payments integration", "AI-assisted automation"],
  description:
    "Galen Myburgh builds production mobile and web systems — Flutter and React apps, " +
    "payments integrations and AI-assisted automation. Based in South Africa.",
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
