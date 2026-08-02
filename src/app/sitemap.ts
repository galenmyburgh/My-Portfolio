import type { MetadataRoute } from "next";

import { caseStudies } from "@/content/work";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "/", priority: 1 },
    { path: "/work", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.7 },
    { path: "/lab", priority: 0.5 },
    { path: "/uses", priority: 0.4 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...pages.map(({ path, priority }) => ({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...caseStudies.map((study) => ({
      url: `${siteUrl}/work/${study.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
