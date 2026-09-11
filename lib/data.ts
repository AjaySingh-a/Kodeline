export type Project = {
  slug: string;
  num: string;
  title: string;
  category: string;
  teaserDesc: string;
  tags: string[];
  thumb: string; // 16/8 card image, work list + pinned showcase
  heroImg: string; // 82vh top banner on detail page
  banner: { src: string; fit: "cover" | "contain" }; // 70vh mid banner on detail page
  intro: string;
  paragraphs: string[];
  scopeTags: string[];
  externalLabel?: string;
  externalHref?: string;
  app?: { title: string; description: string; href: string };
  builtFor?: string;
  gallery?: { src: string; caption?: string }[]; // selected screens grid on detail page
  panels?: { src: string; caption?: string }[]; // horizontal scroll strip (replaces the mid banner)
};

export const projects: Project[] = [
  {
    slug: "isf",
    num: "01",
    title: "Inspiring Seniors Foundation",
    category: "NGO · Delhi · 2024",
    teaserDesc:
      "A website and Android app for an NGO reimagining ageing in India — a digital presence for a community built around living well later in life.",
    tags: ["Website", "Mobile App", "NGO", "UI/UX"],
    thumb: "/isf-thumb.jpg",
    heroImg: "/isf-hero.jpg",
    banner: { src: "/isf-banner.jpg", fit: "cover" },
    intro: "A website and Android app for an NGO reimagining ageing in India.",
    paragraphs: [
      "Members, volunteers, and partners join the foundation, discover health-and-wellness programs, and take part in a community built around three pillars — Health & Wellness, Purposeful Engagement, and Life-long Learning.",
      "At the centre sits the Health Hub — one place to explore programs and resources, kept warm, legible, and effortless for an older audience.",
      "We designed and built the marketing site end to end: templated pages, a single type and colour system, and a responsive layout that holds from desktop down to phone.",
    ],
    scopeTags: ["Website", "Mobile App", "UI/UX", "Front-end", "Design System"],
    externalLabel: "inspiringseniors.org ↗",
    externalHref: "https://inspiringseniors.org",
    app: {
      title: "ISF on Android",
      description: "Alongside the website, we designed and developed the Inspiring Seniors Foundation Android app. Available on Google Play.",
      href: "https://play.google.com/store/apps/details?id=org.inspiringseniors.isf",
    },
    panels: [
      { src: "/isf-p1.jpg", caption: "Home" },
      { src: "/isf-p2.jpg", caption: "About Us" },
      { src: "/isf-p6.jpg", caption: "Our Pillars" },
      { src: "/isf-p3.jpg", caption: "Purposeful Engagement" },
      { src: "/isf-p4.jpg", caption: "Health & Wellness" },
      { src: "/isf-p5.jpg", caption: "Life-long Learning" },
      { src: "/isf-p7.jpg", caption: "Get Involved" },
      { src: "/isf-p8.jpg", caption: "Partners" },
    ],
    gallery: [
      { src: "/isf-g1.jpg", caption: "Purposeful Engagement — pillar page" },
      { src: "/isf-g2.jpg", caption: "The Health Hub" },
      { src: "/isf-g3.jpg", caption: "Get Involved" },
      { src: "/isf-thumb.jpg", caption: "Desktop and mobile" },
    ],
  },
  {
    slug: "ooter",
    num: "02",
    title: "OOTER",
    category: "AdTech · India · 2025",
    teaserDesc:
      "A mobile app that digitises booking outdoor advertising — search available hoardings, check real availability, book and pay, and get proof the ad went live.",
    tags: ["Mobile App", "AdTech", "React Native", "UI/UX"],
    thumb: "/ooter-hero.jpg",
    heroImg: "/ooter-hero.jpg",
    banner: { src: "/ooter-banner.jpg", fit: "cover" },
    intro: "A mobile app that digitises booking outdoor advertising — hoardings and billboards.",
    paragraphs: [
      "Advertisers get real-time visibility into available media, instant booking, and live tracking of their campaigns from a single app.",
      "A separate Vendorboard lets media owners list their hoardings, manage orders, and track payouts.",
      "Verified media images keep everything honest — you see exactly what you're booking, where it is, and proof that it went live.",
    ],
    scopeTags: ["Mobile App", "React Native", "UI/UX", "Vendor Portal"],
    externalLabel: "Play Store ↗",
    externalHref: "https://play.google.com/store/apps/details?id=com.ooter.app",
    builtFor: "Built for Adbook Communication Pvt. Ltd.",
    gallery: [
      { src: "/ooter-g1.jpg", caption: "Quick search across locations" },
      { src: "/ooter-g2.jpg", caption: "Book hoardings and billboards" },
      { src: "/ooter-g4.jpg", caption: "Listing management" },
      { src: "/ooter-g5.jpg", caption: "Chat and email support" },
      { src: "/ooter-g6.jpg", caption: "Vendorboard dashboard" },
    ],
  },
  {
    slug: "sama",
    num: "03",
    title: "Sama Elite Matrimony",
    category: "Matrimony · India · 2025",
    teaserDesc:
      "A founder-led matchmaking platform where every profile is verified before it is shown, and every introduction is based on mutual consent.",
    tags: ["Website", "Matrimony", "UI/UX", "Next.js"],
    thumb: "/sama-banner.jpg",
    heroImg: "/sama-hero.jpg",
    banner: { src: "/sama-banner.jpg", fit: "cover" },
    intro: "A private matchmaking platform, built on trust.",
    paragraphs: [
      "Every profile is personally reviewed and verified before it is ever shown to another member. Members express interest; nothing is shared until both people choose each other.",
      "The interface follows Sama's brand exactly — Cormorant Garamond over deep green, gold, and cream, with the calm, procedural tone of the guidelines and none of the urgency of a dating app.",
      "We built the marketing site and member flow in Next.js: verification, membership plans, curated introductions, and a design system drawn straight from the brand guide.",
    ],
    scopeTags: ["Website", "Brand-led UI", "Next.js", "Design System"],
    gallery: [
      { src: "/sama-g1.jpg", caption: "About — a private matchmaking platform" },
      { src: "/sama-g2.jpg", caption: "Responsive down to mobile" },
      { src: "/sama-g5.jpg", caption: "Wordmark — Cormorant Garamond" },
      { src: "/sama-g3.jpg", caption: "Imagery direction — quiet, editorial" },
      { src: "/sama-g4.jpg", caption: "Brand in action" },
    ],
  },
];

export const getProject = (slug: string) => projects.find(p => p.slug === slug);
export const nextProject = (slug: string) =>
  projects[(projects.findIndex(p => p.slug === slug) + 1) % projects.length];

export const servicesTeaser = [
  { n: "01", t: "Web & App Development", d: "Landing pages to full-stack web and cross-platform mobile apps." },
  { n: "02", t: "UI/UX Design", d: "Brand identity, interfaces, and clickable prototypes." },
  { n: "03", t: "AI Integration", d: "Chatbots, smart search, document automation, personalised content." },
];

export const servicesFull = [
  {
    n: "01",
    t: "Web & App Development",
    d: "From a single landing page to full-stack web platforms and cross-platform mobile apps — designed, built, and shipped by the same two people.",
    points: ["Marketing & landing pages", "Full-stack web applications", "Cross-platform mobile apps", "Performance, SEO & analytics"],
  },
  {
    n: "02",
    t: "UI/UX Design",
    d: "Brand and interface work that stays consistent from the first sketch through to the shipped product.",
    points: ["Brand identity & visual systems", "Interface & interaction design", "Clickable prototypes", "Design systems & handoff"],
  },
  {
    n: "03",
    t: "AI Integration",
    d: "Practical AI woven into your product where it genuinely helps — not for its own sake.",
    points: ["Chatbots & assistants", "Smart search", "Document automation", "Personalised content"],
  },
];

export const process = [
  { n: "01", t: "Discovery call", d: "A free 20-minute call to understand exactly what you need." },
  { n: "02", t: "Fixed price in 24 hrs", d: "A clear, fixed quote within a day — no hidden costs." },
  { n: "03", t: "Design & build", d: "We design and build together, with weekly progress updates." },
  { n: "04", t: "Launch & hand over", d: "We ship, hand everything over, and stay close after." },
];

export const team = [
  {
    initial: "A",
    name: "Ajay",
    role: "Design & Tech Lead",
    bio: "CS graduate with an AI specialisation. Leads all development — web, app, and AI integration. Has shipped full-stack products and AI-powered tools used by real teams. Obsessed with writing clean code that's fast and easy to maintain.",
  },
  {
    initial: "D",
    name: "Dev",
    role: "Design & Client Lead",
    bio: "CS graduate with an AI specialisation. Leads design and client relationships. Handles everything from wireframes and UI to scoping and delivery. When you work with Kodeline, you talk directly to the person building your product.",
  },
];

export const heroLines = ["Design.", "Develop.", "Deliver."];

export const heroTagline =
  "Kodeline is a design and development studio building digital experiences that are clean, functional, and impactful.";
