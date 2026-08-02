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
    id: "tripleblue",
    company: "Tripleblue",
    title: "Full-Stack Developer",
    start: "May 2024",
    end: "Present",
    current: true,
    logo: "/logos/tripleblue.svg",
    summary:
      "Rebuilt Tripleblue's web and mobile products off FlutterFlow onto a custom Next.js and Flutter stack backed by Supabase, while keeping the original platform live and shipping.",
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
    id: "akademia",
    institution: "Akademia",
    qualification: "BSc Computer Science",
    start: "2023",
    end: "2025",
    result: "In progress",
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
  { value: "6", label: "Case studies you can read in full" },
] as const;
