/**
 * Roles, study and certifications. Ported from the old `constants.js`, with
 * the copy tightened — the previous version had template filler
 * ("my education has been a journey of self-discovery") and a role title that
 * had been truncated mid-word.
 */

export type Role = {
  id: string;
  company: string;
  title: string;
  start: string;
  end: string;
  /** True for the current position. */
  current?: boolean;
  logo?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const roles: Role[] = [
  {
    id: "tripleblue-fullstack",
    company: "Tripleblue",
    title: "Full-Stack Developer",
    start: "July 2025",
    end: "Present",
    current: true,
    logo: "/logos/tripleblue.svg",
    summary:
      "Moved onto Tripleblue's AI products — the knowledge agent and AI Notes — alongside the German DMS counterpart and the AI note-taking mobile app.",
    highlights: [
      "Improving the AI Knowledge Agent",
      "Feature work on AI Notes",
      "Assisted in building the DMS Germany counterpart",
      "Maintaining the AI note-taking mobile app",
    ],
    stack: ["flutter", "react", "nextjs", "supabase", "typescript", "aiagents"],
  },
  {
    id: "codelyn",
    company: "Codelyn (Pty) Ltd",
    title: "Founder & Freelance Developer",
    start: "April 2025",
    end: "January 2026",
    summary:
      "My own company, contracting to four clients across mobile, hardware integration and payments — including NFC card readers, ESP-based industrial control and a UK field-service app.",
    highlights: [
      "Firebrain (Softechware) — mobile app, web app and backend, shutting down fire pumps from the phone via an ESP module, with WhatsApp alerts to on-call technicians",
      "Batsamayi — paired physical NFC card readers to a Flutter app for a cashless wallet that works without connectivity",
      "Fix Glass (UK) — added Maps and turn-by-turn navigation to the Flutter app their windscreen technicians use in the field",
      "Bowlsmaster — feature work and improvements on their Flutter app",
    ],
    stack: ["flutter", "dart", "nfc", "esp", "iot", "maps", "whatsapp", "payments", "firebase"],
  },
  {
    id: "tripleblue-frontend",
    company: "Tripleblue",
    title: "Frontend Developer",
    start: "May 2024",
    end: "July 2025",
    logo: "/logos/tripleblue.svg",
    summary:
      "Rebuilt Tripleblue's web and mobile products off FlutterFlow onto a custom Next.js and Flutter stack, while keeping the original platform live and shipping.",
    highlights: [
      "Rewrote the web app in React/Next.js with a Supabase backend, replacing the low-code original",
      "Rewrote the mobile app in Flutter at full feature parity — agenda sync, background audio, offline storage",
      "Fixed platform-specific defects in the legacy app, including native background audio recording and iOS file persistence",
      "Introduced reusable component structures and improved the Supabase data model",
    ],
    stack: ["flutter", "react", "nextjs", "supabase", "typescript", "figma", "flutterflow"],
  },
  {
    id: "payflex",
    company: "Payflex",
    title: "Flutter Developer",
    start: "April 2024",
    end: "July 2024",
    logo: "/logos/payflex.svg",
    summary:
      "Contributed to the rewrite and stabilisation of the customer-facing Payflex app, a buy-now-pay-later product with over 400,000 downloads.",
    highlights: [
      "Helped migrate the codebase to Clean Architecture for maintainability and scale",
      "Built the Store Directory module with interactive Google Maps markers",
      "Improved app stability by over 40%, measured in Firebase Crashlytics",
      "Worked across QA, .NET backend and product to ship on both Android and iOS",
    ],
    stack: ["flutter", "dart", "cleanarch", "firebase", "android", "ios", "payments"],
  },
  {
    id: "softechware-dev",
    company: "Softechware",
    title: "Frontend Developer",
    start: "August 2021",
    end: "Present",
    current: true,
    summary:
      "Building cross-platform mobile applications in Flutter and Dart, alongside client web work.",
    highlights: [
      "Delivered client mobile apps with Flutter, FlutterFlow and Firebase",
      "Rebuilt the Softechware corporate site in React from Figma designs",
      "Delivered five WordPress client sites end to end, including hosting and forms",
    ],
    stack: ["flutter", "flutterflow", "react", "wordpress", "firebase", "css"],
  },
  {
    id: "up-aim",
    company: "University of Pretoria",
    title: "AIM Lab Technician",
    start: "January 2021",
    end: "January 2023",
    logo: "/logos/up.png",
    summary:
      "Kept the computer labs running and supported students and staff on hardware, software and access issues.",
    highlights: [
      "Maintained lab hardware and imaging across a high-traffic teaching environment",
      "Provided in-person and remote technical support under time pressure",
    ],
    stack: ["git"],
  },
  {
    id: "softechware-support",
    company: "Softechware",
    title: "Tech Support (in-person & remote)",
    start: "July 2020",
    end: "July 2021",
    summary:
      "Hardware troubleshooting, network operations and remote assistance for business clients.",
    highlights: [
      "Diagnosed and resolved hardware and network faults on site",
      "Ran remote support sessions via AnyDesk and TeamViewer",
    ],
    stack: [],
  },
];

export type Study = {
  id: string;
  institution: string;
  qualification: string;
  start: string;
  end: string;
  result?: string;
  detail: string;
  logo?: string;
};

export const education: Study[] = [
  {
    id: "up-honours",
    institution: "University of Pretoria",
    qualification: "BSc Honours, Computer Science",
    start: "2026",
    end: "Present",
    result: "In progress",
    detail:
      "Specialising toward digital forensics and cyber security alongside advanced computer science coursework.",
    logo: "/logos/up.png",
  },
  {
    id: "akademia",
    institution: "Akademia",
    qualification: "BSc Computer Science",
    start: "2023",
    end: "2025",
    result: "Completed",
    detail:
      "Software development, algorithms, databases, cloud computing and systems architecture.",
    logo: "/logos/akademia.png",
  },
  {
    id: "zwartkop",
    institution: "Hoërskool Zwartkop",
    qualification: "National Senior Certificate",
    start: "2016",
    end: "2020",
    result: "4 distinctions",
    detail:
      "Mathematics, Physical Science, Accounting, Information Technology, Computer Applications Technology, Afrikaans, English, Life Orientation.",
    logo: "/logos/zwartkop.jpg",
  },
];

export const certifications: Study[] = [
  {
    id: "aws-ccp",
    institution: "Amazon Web Services",
    qualification: "AWS Certified Cloud Practitioner",
    start: "2024",
    end: "2024",
    result: "Passed",
    detail: "Cloud concepts, security and compliance, core services, pricing and support.",
    logo: "/logos/aws.png",
  },
  {
    id: "az-900",
    institution: "Microsoft",
    qualification: "AZ-900 Azure Fundamentals",
    start: "2023",
    end: "2023",
    result: "Passed",
    detail: "Cloud concepts, Azure architecture and services, management and governance.",
    logo: "/logos/azure.svg",
  },
];

/**
 * Hero stats. These replace "5+ years / 50+ projects / 100% client satisfaction",
 * which read as filler because two of the three were unfalsifiable.
 *
 * Every number here is countable from the case studies and CV above. If you
 * change a number, change the thing it counts.
 */
export const stats = [
  { value: "400k+", label: "Downloads on apps I've shipped to" },
  { value: "5", label: "Years shipping Flutter in production" },
  { value: "10", label: "Products delivered for clients" },
] as const;

/**
 * Freelance engagements through Codelyn.
 *
 * Deliberately *not* full case studies. A case study in `work.ts` has to answer
 * what was hard and what changed, and inventing those answers would be worse
 * than showing breadth honestly. Promote any of these to `work.ts` once the
 * write-up exists.
 */
export type Engagement = {
  id: string;
  client: string;
  summary: string;
  stack: string[];
};

export const engagements: Engagement[] = [
  {
    id: "firebrain",
    client: "Firebrain (Softechware)",
    summary:
      "Mobile app, web app and backend for an industrial fire-pump system. Technicians shut pumps down from the app via an ESP module on the hardware, and WhatsApp alerts route to whoever is on call.",
    stack: ["flutter", "esp", "iot", "whatsapp", "firebase", "nodejs"],
  },
  {
    id: "batsamayi",
    client: "Batsamayi",
    summary:
      "A cashless payments app built on physical NFC cards. I paired the card hardware to the Flutter app and set up wallets that hold and settle value on the device, so a transaction does not need connectivity to complete.",
    stack: ["flutter", "nfc", "payments", "dart"],
  },
  {
    id: "fixglass",
    client: "Fix Glass (UK)",
    summary:
      "Field-service app for windscreen technicians. I improved the existing Flutter app and added Maps with turn-by-turn navigation, so technicians route between jobs from inside the app rather than switching to another one.",
    stack: ["flutter", "maps", "ios", "android"],
  },
  {
    id: "bowlsmaster",
    client: "Bowlsmaster",
    summary: "Feature work and improvements on their Flutter application.",
    stack: ["flutter", "dart"],
  },
];
