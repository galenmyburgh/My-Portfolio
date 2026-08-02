import type { Metadata } from "next";

import { WorkIndex } from "./work-index";
import { pendingNumbers, workCards } from "@/content/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: a buy-now-pay-later app stabilised, a product migrated off low-code, payment flows, and camera analytics at the edge.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Work</h1>
      <p className="mt-3 max-w-2xl text-pretty text-muted">
        Six projects, written up properly — whose problem it was, what the constraints
        were, what I rejected and why, the one genuinely hard part, and what changed as a
        result.
      </p>

      {/* Development-only. Production builds strip unfilled placeholders entirely,
          so this banner is the only thing that will nag about them. */}
      {process.env.NODE_ENV !== "production" && pendingNumbers.length > 0 && (
        <aside className="mt-8 rounded-lg border border-cat-web/40 bg-cat-web/5 p-4 text-sm">
          <p className="font-medium text-ink">
            {pendingNumbers.length} outcome{pendingNumbers.length === 1 ? "" : "s"} still need real
            numbers
          </p>
          <ul className="mt-2 space-y-1 text-muted">
            {pendingNumbers.map((p) => (
              <li key={`${p.slug}-${p.label}`}>
                <span className="font-mono text-xs text-faint">{p.slug}</span> — {p.label}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-faint">
            Shown in development only. Edit src/content/work.ts.
          </p>
        </aside>
      )}

      <WorkIndex studies={workCards()} />
    </div>
  );
}
