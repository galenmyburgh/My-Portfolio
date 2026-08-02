import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeScript } from "@/components/theme-script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site, siteUrl, socials } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  // Not preloaded. The mono face is only used for small accents — the logo,
  // stat figures, edge labels — none of which are the LCP element. Preloading
  // it put 32 KB in front of the text that actually decides LCP.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Mobile & Web Developer`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Mobile & Web Developer`,
    description: site.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Mobile & Web Developer`,
    description: site.tagline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070c17" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Mobile & Web Developer",
  description: site.tagline,
  url: siteUrl,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Pretoria", addressCountry: "ZA" },
  sameAs: [socials.github, socials.linkedin],
  knowsAbout: [
    "Flutter",
    "React",
    "Next.js",
    "Supabase",
    "Firebase",
    "Payments integration",
    "Computer vision",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-scroll-behavior: Next 16 no longer overrides scroll-behavior during
    // navigation unless asked. Without it, `scroll-behavior: smooth` makes every
    // route change animate a long scroll back to the top.
    <html
      lang="en-ZA"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrains.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col bg-canvas text-ink">
        <a
          href="#main"
          className="sr-only rounded-lg bg-accent px-4 py-2.5 font-medium text-on-accent focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-100"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
