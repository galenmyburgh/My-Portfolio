/**
 * Case studies.
 *
 * The old site listed projects: a screenshot, a paragraph, some tags. This is
 * the structure that turns a gallery into a portfolio — every entry has to
 * answer whose problem it solved, what was hard about it, and what changed as
 * a result.
 *
 * ── READ THIS BEFORE LAUNCH ────────────────────────────────────────────────
 *
 * 1. NUMBERS. `outcomes` entries marked `needsInput: true` are placeholders.
 *    They render visibly unfinished in development and are *skipped entirely*
 *    in production builds, so an unfilled placeholder can never reach a
 *    recruiter. Replace the value, drop the flag.
 *
 * 2. PROSE. Everything in `approach`, `rejected`, `hardPart` and `learned` is
 *    a DRAFT written from Galen's short project summaries. The shape is right;
 *    the specifics are inference, not testimony. Some technical details are
 *    plausible reconstructions rather than things Galen said he did.
 *
 *    Read every one and rewrite it in your own words before this ships. A case
 *    study you can't defend line by line in an interview is worse than no case
 *    study at all — `reviewNotes` on each entry lists what to check first.
 *
 * 3. Facts drawn directly from the CV (crash rate, download count, dates,
 *    stack, roles) are marked in `reviewNotes` as sourced.
 * ───────────────────────────────────────────────────────────────────────────
 */

import type { CategoryId } from "./tech";

export type Outcome = {
  /** The number itself. Short — it renders large. */
  value: string;
  /** What the number measures. */
  label: string;
  /** True while `value` is a placeholder awaiting a real figure. */
  needsInput?: boolean;
};

export type CaseStudy = {
  slug: string;
  /** Outcome-focused, not tech-focused. */
  title: string;
  client: string;
  /** One sentence that could stand alone in a search result. */
  summary: string;
  year: string;
  timeline: string;
  role: string;
  team: string;
  /** Tech ids from content/tech.ts — these drive filtering and tag colour. */
  stack: string[];
  category: CategoryId;
  featured: boolean;
  image?: string;
  imageAlt?: string;
  links?: { label: string; href: string }[];

  problem: string;
  constraints: string[];
  approach: string;
  /** What was considered and deliberately not done. Signals judgement. */
  rejected: { option: string; why: string }[];
  /** The one genuinely difficult thing. Peers read this first. */
  hardPart: string;
  outcomes: Outcome[];
  learned: string;
  /**
   * Never rendered. A checklist of what in this entry is sourced from the CV
   * versus inferred while drafting, so the prose can be verified line by line.
   */
  reviewNotes: { sourced: string[]; inferred: string[] };
  /** Nodes and edges for the animated architecture diagram. */
  architecture?: {
    nodes: { id: string; label: string; kind: "client" | "service" | "store" | "external" }[];
    edges: { from: string; to: string; label?: string }[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "payflex",
    title: "Stabilising a buy-now-pay-later app used by 400,000+ people",
    client: "Payflex",
    summary:
      "Migrated a legacy consumer payments app to Clean Architecture and cut its crash rate by more than 40% without pausing feature delivery.",
    year: "2024",
    timeline: "April – July 2024",
    role: "Flutter Developer (full-time contract)",
    team: "Cross-functional — Flutter, .NET backend, QA, product, design",
    stack: ["flutter", "dart", "cleanarch", "firebase", "payments", "maps", "android", "ios", "csharp"],
    category: "mobile",
    featured: true,
    image: "/work/payflex.jpg",
    imageAlt: "Payflex app screens showing the spend limit view and the store directory",
    problem:
      "Payflex is a buy-now-pay-later service; the app is how customers check their spend limit and find stores that accept it. The codebase had grown organically to the point where business logic, networking and UI were tangled together in the same widgets. Crashes were frequent enough to show up in store reviews, and every new feature made the next one more expensive to add.",
    constraints: [
      "The app was live with 400k+ downloads — no big-bang rewrite was acceptable",
      "Feature delivery could not stop while the migration happened",
      "Payments flows are regulated: incorrect state is a financial problem, not a cosmetic one",
      "Backend was .NET and owned by a separate team, so contracts were fixed",
    ],
    approach:
      "We migrated incrementally rather than rewriting. Clean Architecture layers were introduced feature by feature — a new feature was built in the new structure, and an existing feature was pulled across whenever it had to be touched anyway. That kept the release train running and meant the migration paid for itself as it went. Crashlytics drove the priority order: the crashes costing the most sessions got refactored first, so stability improved from the first weeks rather than at the end.",
    rejected: [
      {
        option: "A full rewrite in a new codebase",
        why: "Feature delivery would have frozen for months on a live product, and every unmigrated edge case would have surfaced at once at cutover.",
      },
      {
        option: "Leaving the legacy structure and only fixing crashes",
        why: "It treats the symptom. The crash rate was a consequence of untestable, tangled state — fixing crashes individually would have kept re-introducing them.",
      },
    ],
    hardPart:
      "The Store Directory. It renders hundreds of merchant locations as interactive Google Maps markers, and the naive implementation rebuilt every marker whenever the map moved — which pinned the main thread and dropped frames on mid-range Android. The fix was to decouple marker identity from map state so markers were only recreated when the underlying merchant set actually changed, and to cluster server-side rather than in the client. Getting this right while the map, the user's location and the filter state all changed independently was the genuinely difficult part.",
    outcomes: [
      { value: "40%+", label: "Reduction in crash rate (Firebase Crashlytics)" },
      { value: "400k+", label: "Downloads on the app at time of work" },
      { value: "NUMBER NEEDED", label: "Store Directory frame time, before → after", needsInput: true },
      { value: "NUMBER NEEDED", label: "Features shipped during the migration", needsInput: true },
    ],
    learned:
      "Incremental migration is slower on paper and faster in practice, but only if you have a signal telling you where to go next. Crashlytics was that signal. Without it we would have refactored by intuition — probably the code that annoyed us most rather than the code that was costing users the most sessions.",
    reviewNotes: {
      sourced: [
        "400k+ downloads, 40%+ crash reduction via Crashlytics, Clean Architecture migration, Store Directory with Google Maps markers, .NET backend team — all from the CV",
        "Dates, role and contract nature",
      ],
      inferred: [
        "That the migration was incremental rather than a rewrite — CHECK: is this how it actually went?",
        "That Crashlytics drove the refactor priority order",
        "The entire Store Directory hard-part explanation (marker rebuild on map move, server-side clustering) is a plausible reconstruction, NOT something you stated. Replace with what actually made it hard.",
        "The two 'rejected' options and their reasoning",
      ],
    },
    architecture: {
      nodes: [
        { id: "app", label: "Flutter app", kind: "client" },
        { id: "presentation", label: "Presentation", kind: "service" },
        { id: "domain", label: "Domain (use cases)", kind: "service" },
        { id: "data", label: "Data (repositories)", kind: "service" },
        { id: "api", label: ".NET API", kind: "external" },
        { id: "maps", label: "Google Maps", kind: "external" },
        { id: "crashlytics", label: "Crashlytics", kind: "external" },
      ],
      edges: [
        { from: "app", to: "presentation" },
        { from: "presentation", to: "domain", label: "use cases" },
        { from: "domain", to: "data", label: "interfaces" },
        { from: "data", to: "api", label: "REST" },
        { from: "presentation", to: "maps", label: "markers" },
        { from: "app", to: "crashlytics", label: "telemetry" },
      ],
    },
  },

  {
    slug: "tripleblue-rebuild",
    title: "Taking a product off low-code without losing a feature",
    client: "Tripleblue",
    summary:
      "Rebuilt a FlutterFlow web and mobile product as a custom Next.js and Flutter stack on Supabase, at full feature parity, while the original stayed live.",
    year: "2024 – 2025",
    timeline: "May 2024 – present",
    role: "Full-Stack Developer",
    team: "Small product team with a dedicated designer",
    stack: ["flutter", "react", "nextjs", "typescript", "supabase", "postgres", "figma", "flutterflow", "ios", "android"],
    category: "web",
    featured: true,
    image: "/work/tripleblue.jpg",
    imageAlt: "Tripleblue web platform and mobile app screens",
    problem:
      "Tripleblue's first version was built in FlutterFlow, which got the product in front of users quickly. It then hit the ceiling that low-code platforms have: the features that mattered next — reliable background audio recording, offline access, a data model that could evolve — were the ones the platform made hardest. The product could not grow without leaving the tool it was born in.",
    constraints: [
      "The existing platform had real users and had to stay live and stable throughout",
      "Feature parity was non-negotiable — a rebuild that lost capability is a downgrade",
      "Two clients to rebuild, web and mobile, against one backend",
      "Designer-led: implementation had to match Figma closely, not approximately",
    ],
    approach:
      "I kept the FlutterFlow version maintained and shipping while building its replacement alongside it — bugs in the old platform still got fixed, including the native audio and iOS file persistence issues. The web app was rebuilt in Next.js and the mobile app in Flutter, both against a Supabase backend whose schema was designed properly rather than inherited from the low-code tool's assumptions. Reusable component structures came first, so that the second half of the rebuild went faster than the first.",
    rejected: [
      {
        option: "Staying on FlutterFlow and working around the limits",
        why: "The workarounds were already the majority of the effort. Background audio and offline storage weren't features the platform was missing — they were features it actively fought.",
      },
      {
        option: "Rebuilding web and mobile against the existing data model",
        why: "The schema encoded low-code constraints. Carrying it forward would have meant paying for those decisions permanently.",
      },
    ],
    hardPart:
      "Background audio recording that survives the OS. On iOS, an app that is recording can be suspended, and files written before suspension can end up in locations that don't persist the way you expect. Getting recording to continue reliably in the background, and getting the resulting file to still be there afterwards, meant working below the framework abstraction — audio session configuration, correct file destinations, and handling the interruptions the OS raises for calls and other audio. This is the class of problem low-code platforms cannot reach, and it's why the rebuild was necessary rather than merely nice.",
    outcomes: [
      { value: "100%", label: "Feature parity at cutover" },
      { value: "2", label: "Clients rebuilt (web + mobile) on one backend" },
      { value: "NUMBER NEEDED", label: "Page load / app start, before → after", needsInput: true },
      { value: "NUMBER NEEDED", label: "Active users on the rebuilt platform", needsInput: true },
    ],
    learned:
      "Low-code is a good answer to 'can we prove this works' and a bad answer to 'can this grow'. The mistake isn't starting there — it's not noticing the moment the workarounds cost more than the rebuild would. Keeping the old platform alive during the rebuild was worth every hour it cost, because it removed the deadline pressure that makes rewrites go wrong.",
    reviewNotes: {
      sourced: [
        "FlutterFlow → Next.js/Supabase web rebuild and Flutter mobile rebuild, full feature parity, native background audio and iOS file persistence bugs, Figma-led design, reusable component structures, improved Supabase data modelling — all from the CV",
      ],
      inferred: [
        "That the old platform was deliberately kept live as a strategy (CV says you maintained it — check the framing)",
        "The audio-session / file-destination explanation in hardPart is a reconstruction. Replace with the actual fix.",
        "Both 'rejected' options",
        "'2 clients on one backend' — confirm both really share the Supabase backend",
      ],
    },
    architecture: {
      nodes: [
        { id: "web", label: "Next.js web", kind: "client" },
        { id: "mobile", label: "Flutter mobile", kind: "client" },
        { id: "supabase", label: "Supabase", kind: "service" },
        { id: "postgres", label: "PostgreSQL + RLS", kind: "store" },
        { id: "storage", label: "Object storage", kind: "store" },
        { id: "audio", label: "Native audio session", kind: "external" },
      ],
      edges: [
        { from: "web", to: "supabase", label: "auth + data" },
        { from: "mobile", to: "supabase", label: "auth + data" },
        { from: "supabase", to: "postgres", label: "row-level security" },
        { from: "mobile", to: "audio", label: "background recording" },
        { from: "mobile", to: "storage", label: "upload" },
        { from: "supabase", to: "storage" },
      ],
    },
  },

  {
    slug: "athlenote",
    title: "A voice-first training journal athletes actually fill in",
    client: "Athlenote",
    summary:
      "Built and shipped a subscription sports journaling app to both stores, using voice capture to remove the friction that kills training logs.",
    year: "2024",
    timeline: "2024",
    role: "Sole developer",
    team: "Solo, working with the founder",
    stack: ["flutterflow", "firebase", "revenuecat", "payments", "ios", "android"],
    category: "mobile",
    featured: true,
    image: "/work/athlenote.jpg",
    imageAlt: "Athlenote app screens showing the AI sports mentor interface",
    problem:
      "Training journals fail for a boring reason: nobody wants to type paragraphs after a hard session. The value of the log is in the detail, and the moment you ask a tired athlete to type, the detail disappears. The product needed a capture method that costs the user almost nothing at the moment they're least willing to spend effort.",
    constraints: [
      "Solo build on a founder's budget — every hour had to go into the product, not the plumbing",
      "Subscriptions had to work identically on iOS and Android, including restore",
      "Voice recording had to be reliable enough to trust with the only copy of a session",
      "App Store review for a subscription app is unforgiving about restore and pricing clarity",
    ],
    approach:
      "FlutterFlow was the right call here, and that's a judgement about context rather than about the tool: a solo developer on a budget gets a real product in front of real athletes far faster, and the app's demands sat inside what the platform does well. Voice capture became the primary input rather than an alternative one. Subscriptions went through RevenueCat instead of being hand-rolled against two different store APIs, which is where most of the risk in a subscription app actually lives.",
    rejected: [
      {
        option: "Hand-rolling store subscriptions",
        why: "Two store APIs, two sets of receipt validation, two restore flows and two sets of edge cases — for a solo build that is most of the budget spent on something RevenueCat already does correctly.",
      },
      {
        option: "Custom Flutter from the start",
        why: "It would have been the better codebase and the worse decision. The product needed to reach athletes and find out whether voice-first capture worked at all before earning a hand-built foundation.",
      },
    ],
    hardPart:
      "Entitlement state that is correct in every case. A subscription app has more states than it first appears: subscribed, expired, in grace period, billing-retry, refunded, restored on a new device, and bought on one platform but opened on the other. Each one has to resolve to the right answer about what the user can see, and getting it wrong in either direction is bad — locking out a paying athlete, or giving away the product. Building it so that entitlement is derived from one source of truth rather than checked ad hoc in each screen was the difference between it working and it mostly working.",
    outcomes: [
      { value: "2", label: "App stores shipped to" },
      { value: "NUMBER NEEDED", label: "Downloads / active athletes", needsInput: true },
      { value: "NUMBER NEEDED", label: "Trial-to-paid conversion", needsInput: true },
      { value: "NUMBER NEEDED", label: "Median time to log a session (vs typing)", needsInput: true },
    ],
    learned:
      "Choosing the less impressive tool was the right engineering decision, and I'd defend it in an interview. The interesting question was never 'is FlutterFlow good enough' — it was 'what is the cheapest way to find out whether athletes will actually log sessions by voice'. Optimising the codebase before answering that would have been optimising the wrong thing.",
    reviewNotes: {
      sourced: ["FlutterFlow, Firebase, RevenueCat, voice recording, iOS + Android — all from the CV project tags"],
      inferred: [
        "The whole 'typing kills training logs' problem framing — is voice-first actually the product thesis?",
        "The entitlement-state hardPart. Did you hit these cases, or is checkout simpler than this?",
        "'Solo, working with the founder' — confirm the team shape",
        "Both 'rejected' options and the learned reflection",
      ],
    },
    architecture: {
      nodes: [
        { id: "app", label: "FlutterFlow app", kind: "client" },
        { id: "auth", label: "Firebase Auth", kind: "service" },
        { id: "store", label: "Firestore", kind: "store" },
        { id: "files", label: "Cloud Storage", kind: "store" },
        { id: "rc", label: "RevenueCat", kind: "external" },
        { id: "stores", label: "App Store / Play", kind: "external" },
      ],
      edges: [
        { from: "app", to: "auth" },
        { from: "app", to: "store", label: "sessions" },
        { from: "app", to: "files", label: "voice notes" },
        { from: "app", to: "rc", label: "entitlements" },
        { from: "rc", to: "stores", label: "receipt validation" },
      ],
    },
  },

  {
    slug: "camera-analytics",
    title: "Turning dumb security cameras into something that reports",
    client: "Internal / SME security",
    summary:
      "A Python and OpenCV analytics layer that adds motion detection, object recognition and health monitoring to existing camera hardware.",
    year: "2024",
    timeline: "2024",
    role: "Sole developer",
    team: "Solo",
    stack: ["python", "opencv", "cv", "automation", "docker", "rest"],
    category: "ai",
    featured: true,
    image: "/work/camera-analytics.jpg",
    imageAlt: "Camera analytics dashboard showing detected events and camera health",
    problem:
      "Small businesses have cameras that record and nothing else. Footage is only useful after something has already gone wrong, and only if someone sits and watches it. Worse, a camera that has quietly stopped working looks exactly like a camera where nothing is happening — so failures go unnoticed until the day the footage is needed.",
    constraints: [
      "Had to work with the cameras clients already owned — replacing hardware was not on the table",
      "Runs on edge devices, so the compute budget is small and fixed",
      "False positives are the failure mode that kills these systems: alert fatigue makes people ignore everything",
      "No reliable bandwidth assumption — it cannot depend on streaming everything to a server",
    ],
    approach:
      "Detection runs at the edge, on the device next to the camera, so only events travel over the network rather than continuous video. Motion detection acts as a cheap first pass and object recognition only runs on frames that pass it, which is what makes the compute budget work. Alongside detection, the system tracks camera health — a camera that stops producing frames raises an event just like an intruder would, because a silently dead camera is the more common and more expensive failure.",
    rejected: [
      {
        option: "Streaming all footage to a server for central processing",
        why: "It assumes bandwidth these sites don't have, and it moves the cost from a one-off edge device to a permanent data bill.",
      },
      {
        option: "Running object recognition on every frame",
        why: "The edge compute budget doesn't allow it, and it isn't needed — the overwhelming majority of frames contain nothing.",
      },
    ],
    hardPart:
      "Making the alerts trustworthy. A system that cries wolf gets muted, and a muted system is worth nothing — so precision matters far more than recall here. Most naive motion detection fires on changing light, moving foliage, rain and insects near the lens. Getting the false positive rate low enough that a human still reads the alerts, without tuning it so tight that it misses real events, was the whole difficulty of the project, and it's much more about understanding the specific site than about the algorithm.",
    outcomes: [
      { value: "Edge", label: "Runs on-device, no continuous upload" },
      { value: "NUMBER NEEDED", label: "False positive rate after tuning", needsInput: true },
      { value: "NUMBER NEEDED", label: "Cameras / sites deployed to", needsInput: true },
      { value: "NUMBER NEEDED", label: "Detection latency", needsInput: true },
    ],
    learned:
      "The hard part of an ML-adjacent product is almost never the model. It was the alerting policy, the health monitoring and the tuning against one specific site's conditions — the unglamorous work that decides whether anyone keeps the system switched on.",
    reviewNotes: {
      sourced: [
        "Python + OpenCV, real-time motion detection, object recognition, event-based alerts, backend dashboard, camera health tracking, edge devices, SME security — all from the CV description",
      ],
      inferred: [
        "The two-stage motion-then-recognition pipeline as a compute-budget decision",
        "The false-positive/alert-fatigue framing as the hardest part",
        "Bandwidth constraints and the 'events not video' design",
        "Both 'rejected' options",
      ],
    },
    architecture: {
      nodes: [
        { id: "cam", label: "IP cameras", kind: "external" },
        { id: "edge", label: "Edge device", kind: "client" },
        { id: "motion", label: "Motion pass", kind: "service" },
        { id: "detect", label: "Object recognition", kind: "service" },
        { id: "events", label: "Event store", kind: "store" },
        { id: "dash", label: "Dashboard", kind: "client" },
      ],
      edges: [
        { from: "cam", to: "edge", label: "RTSP" },
        { from: "edge", to: "motion", label: "every frame" },
        { from: "motion", to: "detect", label: "candidate frames only" },
        { from: "detect", to: "events", label: "events, not video" },
        { from: "events", to: "dash" },
        { from: "edge", to: "events", label: "camera health" },
      ],
    },
  },

  {
    slug: "cw-guarding",
    title: "Getting guard check-ins off paper and into real time",
    client: "CW Guarding",
    summary:
      "A FlutterFlow and Firebase platform for guard management, with push-driven dispatch replacing radio and paper logs.",
    year: "2023",
    timeline: "March 2023",
    role: "Sole developer",
    team: "Solo",
    stack: ["flutterflow", "firebase", "cloudfunctions", "android", "automation"],
    category: "mobile",
    featured: false,
    problem:
      "Guarding operations ran on radio calls and paper logs. Control room staff had no reliable picture of who was on site, when they had last checked in, or whether an incident had been acknowledged — and reconstructing any of it after the fact meant reading handwriting.",
    constraints: [
      "Guards use low-end Android devices on patchy mobile data",
      "Control room staff are not technical and turnover is high, so the UI has to be obvious",
      "An incident notification that arrives late is worse than useless",
      "This was one of my first complete projects — I was learning the platform while building on it",
    ],
    approach:
      "Check-ins and incidents became structured records rather than radio traffic, with push notifications carrying dispatch to the right guard rather than broadcasting to everyone. Cloud Functions handled the fan-out server-side so the sending device didn't need to know the recipient list, and the control room got a live view rather than a report they had to ask for.",
    rejected: [
      {
        option: "Client-side notification sending",
        why: "It puts the recipient list and the credentials on the guard's device, and it silently fails whenever that device is offline — which is exactly when dispatch matters.",
      },
    ],
    hardPart:
      "Notification delivery you can actually rely on. Push is best-effort by design: devices sleep, Android kills background work aggressively on low-end hardware, and mobile data drops mid-patrol. Making dispatch dependable meant treating delivery as unreliable and building acknowledgement into the flow, so the control room sees whether a notification was received rather than assuming it was.",
    outcomes: [
      { value: "NUMBER NEEDED", label: "Sites / guards using it", needsInput: true },
      { value: "NUMBER NEEDED", label: "Check-in time, paper → app", needsInput: true },
      { value: "NUMBER NEEDED", label: "Incident acknowledgement time", needsInput: true },
    ],
    learned:
      "This project taught me that push notifications are a delivery attempt, not a delivery. Every system I've built since treats acknowledgement as the thing that matters and the notification as merely the prompt.",
    reviewNotes: {
      sourced: [
        "FlutterFlow, Firebase, push notifications, CRUD, 'one of my first completed projects' — from the CV",
      ],
      inferred: [
        "The entire paper/radio problem framing — is this what CW Guarding actually replaced?",
        "Cloud Functions doing server-side fan-out",
        "The acknowledgement mechanism in hardPart",
        "Low-end Android / patchy data constraints",
      ],
    },
  },

  {
    slug: "mewzo",
    title: "First time handling other people's money",
    client: "Mewzo",
    summary:
      "A marketplace app with full Paystack checkout — the project where payment integration stopped being theoretical.",
    year: "2021",
    timeline: "June 2021",
    role: "Sole developer",
    team: "Solo",
    stack: ["flutterflow", "firebase", "paystack", "payments", "rest"],
    category: "data",
    featured: false,
    problem:
      "A marketplace is only a marketplace once money can move through it. Everything else — listings, search, profiles — is a catalogue until checkout works, and checkout is the one part where being approximately right is the same as being wrong.",
    constraints: [
      "Real payments, so failure states matter more than the happy path",
      "Payment provider APIs that assume a server you may not have",
      "Mobile network conditions where a request can succeed while the response never arrives",
    ],
    approach:
      "Checkout was built against Paystack's API with the failure cases treated as the primary design problem rather than an afterthought — what the app does when a payment succeeds but the confirmation is lost, when the user backgrounds the app mid-flow, and when a retry might double-charge.",
    rejected: [
      {
        option: "Treating a successful HTTP response as the source of truth",
        why: "The response is the least reliable part of the flow on mobile data. The provider's record of the transaction is the truth; the app's job is to reconcile with it.",
      },
    ],
    hardPart:
      "Not double-charging anyone. On a flaky connection, an app can genuinely not know whether a payment went through, and the naive reaction — let the user tap again — is how people get charged twice. Making the flow idempotent, so that a retry reconciles against the transaction that may already exist rather than creating a new one, was the lesson that has carried into every payments integration since.",
    outcomes: [
      { value: "NUMBER NEEDED", label: "Transactions processed", needsInput: true },
      { value: "NUMBER NEEDED", label: "Checkout completion rate", needsInput: true },
    ],
    learned:
      "Payments taught me to design for the ambiguous state first. In most software, an unclear result is an inconvenience; in payments it's someone's money. That instinct — assume the response is lost, make the retry safe — is the single most transferable thing I've learned.",
    reviewNotes: {
      sourced: [
        "Marketplace app, Paystack API, 'laid the foundation for using different API calls for completing payments' — from the CV",
      ],
      inferred: [
        "The idempotency / double-charge hardPart. Did you actually build retry reconciliation, or is this aspirational?",
        "The rejected option about HTTP responses as source of truth",
        "If you did not handle these cases, say so — 'here is what I'd do differently now' is a stronger answer than implying you got it right in 2021",
      ],
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

/**
 * The subset a card needs.
 *
 * Client components must take *this*, never the full CaseStudy. Passing whole
 * entries across the server/client boundary serialises every word of prose,
 * every rejected option and every review note into the JavaScript bundle —
 * measured at ~40 KB gzipped for six studies, to render six cards.
 */
export type WorkCardData = Pick<
  CaseStudy,
  "slug" | "title" | "client" | "summary" | "year" | "stack" | "category" | "image" | "imageAlt" | "featured"
> & { headline?: Outcome };

export const toCardData = (study: CaseStudy): WorkCardData => ({
  slug: study.slug,
  title: study.title,
  client: study.client,
  summary: study.summary,
  year: study.year,
  stack: study.stack,
  category: study.category,
  image: study.image,
  imageAlt: study.imageAlt,
  featured: study.featured,
  headline: visibleOutcomes(study).find((o) => !o.needsInput),
});

export const workCards = (): WorkCardData[] => caseStudies.map(toCardData);

/**
 * Placeholders are development-only. In a production build they're stripped, so
 * an unfilled `NUMBER NEEDED` can never be shown to a visitor.
 */
export const visibleOutcomes = (study: CaseStudy) =>
  process.env.NODE_ENV === "production"
    ? study.outcomes.filter((o) => !o.needsInput)
    : study.outcomes;

/** Used by the build check and the /work page's dev-only banner. */
export const pendingNumbers = caseStudies.flatMap((study) =>
  study.outcomes
    .filter((o) => o.needsInput)
    .map((o) => ({ slug: study.slug, label: o.label }))
);
