export const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#process", label: "Process" },
  { href: "/#work", label: "Work" },
  { href: "/#why", label: "Why us" },
  { href: "/#clients", label: "Clients" },
];

/** Each tone pairs a soft tint (surfaces) with a saturated colour (marks, numbers). */
export const tones = {
  blue: { soft: "#e6e9ee", strong: "#1f2633" },
  mint: { soft: "#e1eee7", strong: "#1d7a52" },
  peach: { soft: "#eaebee", strong: "#4b515b" },
  violet: { soft: "#e4e6eb", strong: "#343a46" },
  butter: { soft: "#eeeff1", strong: "#868c96" },
  rose: { soft: "#ebecef", strong: "#6a707a" },
} as const;

export type Tone = keyof typeof tones;

export const showcaseTabs = [
  { label: "Web platform", tone: "blue" },
  { label: "Mobile app", tone: "mint" },
  { label: "Data pipeline", tone: "peach" },
  { label: "AI assistant", tone: "violet" },
  { label: "Cloud", tone: "butter" },
] as const;

export const heroWords = ["web applications", "mobile apps"];

export const clients: { name: string; url: string; tone: Tone }[] = [
  { name: "Viwahaa Matrimony", url: "https://viwahaa.com", tone: "blue" },
  { name: "Foxla Productions", url: "https://foxlaproductions.studio", tone: "violet" },
];

export const steps = [
  {
    title: "Discover",
    when: "Week 1",
    accent: "the real problem",
    outputs: ["Scoped roadmap", "Risk register", "Tech audit"],
    tone: "blue" as Tone,
    description:
      "Workshops, user interviews and a technical audit. We leave week one with a scoped plan, a risk list and a clear definition of done.",
  },
  {
    title: "Design",
    when: "Weeks 2–3",
    accent: "what users need",
    outputs: ["Clickable prototype", "Design system", "User tests"],
    tone: "violet" as Tone,
    description:
      "Clickable prototypes and a component system validated with real users before a single line of production code.",
  },
  {
    title: "Build",
    when: "Weeks 3–6",
    accent: "in small releases",
    outputs: ["Fortnightly demos", "Automated tests", "CI/CD"],
    tone: "mint" as Tone,
    description:
      "Two-week sprints with working software every cycle. Reviewed code, automated tests and full visibility in your tools.",
  },
  {
    title: "Launch",
    when: "Week 6 onward",
    accent: "and keep improving",
    outputs: ["Zero-downtime deploys", "Monitoring", "Growth experiments"],
    tone: "peach" as Tone,
    description:
      "Zero-downtime releases, monitoring from day one, and a team that stays to iterate as your product and audience grow.",
  },
];

export const capabilities = [
  {
    title: "Direct access to builders",
    tone: "blue" as Tone,
    description: "You talk to the four people who design and write your product. No account managers in between.",
    icon: "user",
  },
  {
    title: "Quality over shortcuts",
    tone: "mint" as Tone,
    description: "Clean, reviewed code and careful testing, so what we ship keeps working after launch.",
    icon: "calendar",
  },
  {
    title: "You own the code",
    tone: "butter" as Tone,
    description: "Full source code, documentation and access handed over to you.",
    icon: "key",
  },
  {
    title: "Secure by default",
    tone: "rose" as Tone,
    description: "HTTPS everywhere, least-privilege access and careful handling of your users' data.",
    icon: "lock",
  },
];

export const caseStudies: {
  client: string;
  url?: string;
  tone: Tone;
  category: string;
  summary: string;
  headline: string;
  stats: { value: string; label: string }[];
}[] = [
  {
    client: "Viwahaa Matrimony",
    url: "https://viwahaa.com",
    tone: "blue",
    category: "Web app",
    summary: "We designed and built the Viwahaa.com web app for an online matrimony service.",
    headline: "A matrimony platform, built for the web.",
    stats: [],
  },
  {
    client: "Foxla Productions",
    url: "https://foxlaproductions.studio",
    tone: "violet",
    category: "Website",
    summary: "We designed and built the Foxla Productions studio website.",
    headline: "A studio website that shows the work.",
    stats: [],
  },
];

export const testimonials = [
  {
    quote:
      "DataMeld built our matrimony platform from the ground up. They understood our members, delivered on time and are still the first people we call.",
    name: "J. Suthaskaran",
    company: "Viwahaa.com",
    tone: "blue" as Tone,
  },
  {
    quote:
      "Clear communication, honest timelines and a site that finally shows our work the way it deserves. Working with DataMeld was effortless.",
    name: "N. Niruban",
    company: "foxlaproductions.com",
    tone: "violet" as Tone,
  },
];

export const footerLinks: { label: string; href: string }[][] = [
  [
    { label: "Web app development", href: "/services/web-app-development" },
    { label: "Mobile app development", href: "/services/mobile-app-development" },
  ],
  [
    { label: "About", href: "/#why" },
    { label: "Case studies", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Careers", href: "mailto:saruatwork@gmail.com?subject=Careers%20at%20DataMeld" },
    { label: "Contact", href: "#contact" },
  ],
];
