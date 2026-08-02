import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first — roughly 20% smaller than WebP on the photographic content
    // here, and every browser we support falls back cleanly.
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // SAMEORIGIN rather than DENY: still blocks cross-origin framing
          // (which is the clickjacking risk), while leaving same-origin tooling
          // — the accessibility audit harness, preview embeds — able to work.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
