/**
 * The technology graph.
 *
 * This one file drives three things: the constellation nodes in the hero, the
 * filter chips on /work, and the tag colours on every case study card. Adding a
 * technology here makes it appear in all three, in the same colour, with the
 * same meaning.
 *
 * `weight` is a self-assessment of depth (1 = have used it, 5 = have shipped
 * and maintained production systems in it) and only controls node size.
 * `note` is what shows in the constellation tooltip — keep it to things that
 * are actually true and checkable against the case studies.
 */

export const categories = {
  mobile: { label: "Mobile", color: "var(--cat-mobile)" },
  web: { label: "Web", color: "var(--cat-web)" },
  data: { label: "Data & backend", color: "var(--cat-data)" },
  hardware: { label: "Hardware & IoT", color: "var(--cat-hardware)" },
  cloud: { label: "Cloud & tooling", color: "var(--cat-cloud)" },
  ai: { label: "AI & automation", color: "var(--cat-ai)" },
} as const;

export type CategoryId = keyof typeof categories;

export type Tech = {
  id: string;
  name: string;
  category: CategoryId;
  weight: 1 | 2 | 3 | 4 | 5;
  note: string;
};

export const tech: Tech[] = [
  // --- Mobile -------------------------------------------------------------
  { id: "flutter", name: "Flutter", category: "mobile", weight: 5, note: "Primary stack. Payflex rewrite and the full Tripleblue mobile rebuild." },
  { id: "dart", name: "Dart", category: "mobile", weight: 5, note: "Primary language since 2021. Clean Architecture layering, async, platform channels." },
  { id: "flutterflow", name: "FlutterFlow", category: "mobile", weight: 5, note: "Five client apps shipped on it — and I migrated Tripleblue off it when it outgrew it." },
  { id: "android", name: "Android", category: "mobile", weight: 4, note: "Native builds, release signing, Play Console. Java and Kotlin before Flutter." },
  { id: "ios", name: "iOS", category: "mobile", weight: 4, note: "App Store releases, background audio, file persistence quirks." },
  { id: "kotlin", name: "Kotlin", category: "mobile", weight: 3, note: "Native Android work before moving to Flutter." },
  { id: "java", name: "Java", category: "mobile", weight: 3, note: "Android before Kotlin. Still the fallback for legacy modules." },
  { id: "swift", name: "Swift", category: "mobile", weight: 2, note: "Enough to debug and patch the native iOS side of a Flutter app." },
  { id: "revenuecat", name: "RevenueCat", category: "mobile", weight: 3, note: "Subscriptions and entitlements on Athlenote, across both stores." },
  { id: "maps", name: "Maps & navigation", category: "mobile", weight: 4, note: "Payflex store directory, and turn-by-turn routing for Fix Glass technicians in the UK." },

  // --- Hardware & IoT -----------------------------------------------------
  { id: "nfc", name: "NFC", category: "hardware", weight: 4, note: "Paired physical NFC card readers to a Flutter app for Batsamayi's cashless wallet." },
  { id: "esp", name: "ESP modules", category: "hardware", weight: 3, note: "Firebrain: shutting down industrial fire pumps from a phone, through an ESP module on the hardware." },
  { id: "iot", name: "IoT integration", category: "hardware", weight: 3, note: "Getting apps and physical equipment to agree with each other, reliably, in the field." },
  { id: "offlinefirst", name: "Offline-first", category: "hardware", weight: 4, note: "Wallets that settle on-device and apps that keep working when the signal doesn't." },

  // --- Web ----------------------------------------------------------------
  { id: "react", name: "React", category: "web", weight: 5, note: "Component architecture, hooks, the parts of rendering that bite." },
  { id: "nextjs", name: "Next.js", category: "web", weight: 4, note: "App Router, server components. This site, and the Tripleblue web rebuild." },
  { id: "typescript", name: "TypeScript", category: "web", weight: 4, note: "Strict mode. Types as the contract between the UI and the data layer." },
  { id: "javascript", name: "JavaScript", category: "web", weight: 5, note: "The substrate under all of the above." },
  { id: "html", name: "HTML", category: "web", weight: 5, note: "Semantics and landmarks first — it is most of accessibility for free." },
  { id: "css", name: "CSS", category: "web", weight: 4, note: "Modern layout, custom properties, compositor-friendly animation." },
  { id: "tailwind", name: "Tailwind", category: "web", weight: 4, note: "v4, token-driven. Zero runtime, unlike the styled-components it replaced." },
  { id: "mui", name: "Material UI", category: "web", weight: 3, note: "Component library work on earlier React builds." },
  { id: "figma", name: "Figma", category: "web", weight: 4, note: "Working from designer handoff to pixel-accurate implementation." },
  { id: "wordpress", name: "WordPress", category: "web", weight: 4, note: "Five client sites delivered. Elementor, Divi, cPanel, the whole pipeline." },

  // --- Data & backend -----------------------------------------------------
  { id: "supabase", name: "Supabase", category: "data", weight: 4, note: "Schema design, row-level security, auth. Backend for the Tripleblue rebuild." },
  { id: "firebase", name: "Firebase", category: "data", weight: 5, note: "Firestore, Auth, Cloud Functions, Crashlytics, FCM across most client apps." },
  { id: "postgres", name: "PostgreSQL", category: "data", weight: 3, note: "Under Supabase. Views, policies, and SQL I can actually read." },
  { id: "mysql", name: "MySQL", category: "data", weight: 3, note: "Relational modelling and queries on earlier platform work." },
  { id: "nodejs", name: "Node.js", category: "data", weight: 3, note: "Cloud Functions, small services, build tooling." },
  { id: "csharp", name: "C#", category: "data", weight: 2, note: "Enough to work alongside the .NET backend team at Payflex." },
  { id: "python", name: "Python", category: "data", weight: 4, note: "Computer vision and automation. The camera analytics platform is Python." },
  { id: "rest", name: "REST APIs", category: "data", weight: 5, note: "Consuming, designing and debugging them. Most integration work lives here." },
  { id: "payments", name: "Payments", category: "data", weight: 4, note: "Payflex BNPL, Paystack checkout, RevenueCat subscriptions. Money is unforgiving." },
  { id: "paystack", name: "Paystack", category: "data", weight: 3, note: "Full checkout integration on Mewzo — the first time I handled real money." },
  { id: "whatsapp", name: "WhatsApp API", category: "data", weight: 3, note: "Firebrain alerts: routing fire-pump events to whichever technician is actually on call." },

  // --- Cloud & tooling ----------------------------------------------------
  { id: "aws", name: "AWS", category: "cloud", weight: 2, note: "Certified Cloud Practitioner. Core services, pricing and the security model." },
  { id: "azure", name: "Azure", category: "cloud", weight: 2, note: "AZ-900 certified. Architecture, governance and cost fundamentals." },
  { id: "docker", name: "Docker", category: "cloud", weight: 3, note: "Reproducible local environments and deployment images." },
  { id: "git", name: "Git", category: "cloud", weight: 5, note: "Branching, review, release hygiene across every project here." },
  { id: "cloudfunctions", name: "Cloud Functions", category: "cloud", weight: 4, note: "Push notification fan-out, scheduled jobs, stock reconciliation." },
  { id: "netlify", name: "CI/CD", category: "cloud", weight: 3, note: "Netlify and Vercel pipelines, preview deploys, environment separation." },
  { id: "cleanarch", name: "Clean Architecture", category: "cloud", weight: 4, note: "Led the Payflex migration to it. Layer boundaries that survive a team." },

  // --- AI & automation ----------------------------------------------------
  { id: "opencv", name: "OpenCV", category: "ai", weight: 3, note: "Real-time motion detection and object recognition on edge devices." },
  { id: "cv", name: "Computer Vision", category: "ai", weight: 3, note: "The camera analytics platform: detection, alerting, camera health." },
  { id: "aiagents", name: "AI agents", category: "ai", weight: 4, note: "Tripleblue's knowledge agent and AI Notes — building AI into the product, not around it." },
  { id: "claudecode", name: "Claude Code", category: "ai", weight: 4, note: "Agentic work in the terminal — multi-file refactors, migrations, and reviews across a whole repo." },
  { id: "cursor", name: "Cursor", category: "ai", weight: 4, note: "Day-to-day editor. AI in the loop where I'm already working rather than in a browser tab." },
  { id: "codex", name: "ChatGPT / Codex", category: "ai", weight: 3, note: "Generating and stress-testing implementations, and talking through an approach before committing to it." },
  { id: "gemini", name: "Gemini", category: "ai", weight: 3, note: "Long-context work — reading large codebases and documents in one pass." },
  { id: "automation", name: "Automation", category: "ai", weight: 4, note: "Buildship flows, scheduled reconciliation, generated SQL views." },
];

export const techById = new Map(tech.map((t) => [t.id, t]));

/**
 * Real relationships, not decoration. Each edge is a path that actually exists
 * in one of the case studies — Flutter → Supabase → Payments traces the
 * Tripleblue stack; Python → OpenCV → Computer Vision traces the analytics work.
 */
export const techEdges: ReadonlyArray<readonly [string, string]> = [
  ["flutter", "dart"],
  ["flutter", "firebase"],
  ["flutter", "android"],
  ["flutter", "ios"],
  ["flutter", "cleanarch"],
  ["flutterflow", "firebase"],
  ["flutterflow", "flutter"],
  ["flutterflow", "supabase"],
  ["android", "kotlin"],
  ["kotlin", "java"],
  ["ios", "swift"],
  ["ios", "revenuecat"],
  ["revenuecat", "payments"],
  ["maps", "flutter"],
  ["maps", "android"],

  // Hardware — the Codelyn contracts. Flutter talking to physical equipment.
  ["nfc", "flutter"],
  ["nfc", "payments"],
  ["nfc", "offlinefirst"],
  ["esp", "iot"],
  ["esp", "whatsapp"],
  ["iot", "flutter"],
  ["iot", "automation"],
  ["offlinefirst", "flutter"],
  ["offlinefirst", "supabase"],
  ["whatsapp", "rest"],
  ["whatsapp", "cloudfunctions"],

  ["react", "javascript"],
  ["react", "nextjs"],
  ["nextjs", "typescript"],
  ["nextjs", "tailwind"],
  ["nextjs", "supabase"],
  ["typescript", "javascript"],
  ["javascript", "html"],
  ["html", "css"],
  ["css", "tailwind"],
  ["react", "mui"],
  ["figma", "react"],
  ["figma", "flutter"],
  ["wordpress", "css"],

  ["supabase", "postgres"],
  ["supabase", "rest"],
  ["firebase", "cloudfunctions"],
  ["firebase", "nodejs"],
  ["cloudfunctions", "nodejs"],
  ["cloudfunctions", "automation"],
  ["rest", "payments"],
  ["payments", "paystack"],
  ["payments", "csharp"],
  ["nodejs", "mysql"],

  ["python", "opencv"],
  ["opencv", "cv"],
  ["python", "automation"],
  ["automation", "claudecode"],
  ["claudecode", "typescript"],
  ["claudecode", "cursor"],
  ["cursor", "typescript"],
  ["codex", "cursor"],
  ["gemini", "codex"],
  ["gemini", "aiagents"],
  ["aiagents", "nextjs"],
  ["aiagents", "flutter"],
  ["aiagents", "supabase"],
  ["aiagents", "claudecode"],

  ["docker", "netlify"],
  ["git", "netlify"],
  ["aws", "docker"],
  ["azure", "aws"],
  ["cleanarch", "typescript"],
];
