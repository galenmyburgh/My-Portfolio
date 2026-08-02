import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name} — Mobile & Web Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card. Generated at build time rather than maintained as a PNG, so it
 * can never drift out of sync with the tagline it quotes.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#070c17",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#6aa6ff", fontSize: 30 }}>
          galen<span style={{ color: "#f1f5f9" }}>.</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#f1f5f9",
              fontSize: 62,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            I build production mobile &amp; web systems that handle money, scale and mess.
          </div>
          <div style={{ display: "flex", marginTop: 32, gap: 16 }}>
            {site.specialisms.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  border: "1px solid #33415c",
                  borderRadius: 999,
                  padding: "10px 22px",
                  color: "#c3cede",
                  fontSize: 24,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", color: "#94a3b8", fontSize: 26 }}>
          {site.name} · {site.location}
        </div>
      </div>
    ),
    size
  );
}
