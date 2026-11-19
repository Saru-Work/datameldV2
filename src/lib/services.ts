// Content for the standalone service pages (/services/*). Each page targets one
// search intent, so keep titles, headings and copy focused on that service.

export type ServicePage = {
  slug: "web-app-development" | "mobile-app-development";
  name: string;
  shortName: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  intro: string;
  builds: { title: string; description: string }[];
  stack: string[];
  stackNote: string;
  reasons: { title: string; description: string }[];
  project?: { client: string; url: string; summary: string };
  faqs: { q: string; a: string }[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "web-app-development",
    name: "Web application development",
    shortName: "Web apps",
    metaTitle: "Web App Development Company in Sri Lanka",
    metaDescription:
      "Custom web application development from Jaffna, Sri Lanka. DataMeld designs and builds customer portals, SaaS products, dashboards and websites with React, Next.js and Python.",
    eyebrow: "Web app development",
    h1: "Custom web app development",
    h1Accent: "from Jaffna, Sri Lanka.",
    intro:
      "DataMeld designs and builds web applications for startups and enterprises: customer portals, SaaS products, internal tools and fast marketing websites. You work directly with the four people who design and write your product, from the first prototype to production on the cloud.",
    builds: [
      {
        title: "SaaS products & MVPs",
        description: "Turn an idea into a working product. We scope a first release you can put in front of real users quickly, then grow it sprint by sprint.",
      },
      {
        title: "Customer portals & platforms",
        description: "Sign-up, accounts, profiles, search, messaging and payments: the core of platforms like the Viwahaa.com matrimony web app we built.",
      },
      {
        title: "Dashboards & internal tools",
        description: "Replace spreadsheets and manual work with tools your team actually enjoys using, connected to the data you already have.",
      },
      {
        title: "Business & studio websites",
        description: "Fast, search-friendly websites that show your work the way it deserves, like the Foxla Productions studio site.",
      },
    ],
    stack: ["React", "Next.js", "Python", "AWS", "Hostinger"],
    stackNote:
      "We pick proven, widely used technology so your product is fast, secure and easy for any future team to maintain.",
    reasons: [
      {
        title: "Built for search and speed",
        description: "Server-rendered pages, clean markup and Core Web Vitals in mind from day one, so your web app is quick and easy for Google to index.",
      },
      {
        title: "Direct access to builders",
        description: "No account managers in between. You talk to the people designing and writing your web app.",
      },
      {
        title: "You own the code",
        description: "Full source code, documentation and hosting access are handed over to you.",
      },
      {
        title: "Secure by default",
        description: "HTTPS everywhere, least-privilege access and careful handling of your users' data.",
      },
    ],
    project: {
      client: "Viwahaa Matrimony",
      url: "https://viwahaa.com",
      summary: "We designed and built the Viwahaa.com web app for an online matrimony service.",
    },
    faqs: [
      {
        q: "How long does it take to build a web app?",
        a: "Most projects follow our four-step process: discovery in week one, design in weeks two to three, build in weeks three to six, and a first launch from around week six. Larger platforms continue in two-week sprints after launch.",
      },
      {
        q: "What technologies do you use for web development?",
        a: "We mainly build with React and Next.js on the front end and Python on the back end, deployed to AWS or Hostinger depending on your needs and budget.",
      },
      {
        q: "Do you work with clients outside Sri Lanka?",
        a: "Yes. We are based in Jaffna, Sri Lanka and work remotely with startups and businesses anywhere, with regular demos and full visibility in your tools.",
      },
      {
        q: "Will I own the source code?",
        a: "Yes. You receive the full source code, documentation and access to every account and server we set up for your project.",
      },
      {
        q: "Can you improve or take over an existing website or web app?",
        a: "Yes. Discovery starts with a technical audit of what you have, so we can recommend whether to improve, extend or rebuild it.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile app development",
    shortName: "Mobile apps",
    metaTitle: "iOS & Android App Development in Sri Lanka",
    metaDescription:
      "iOS and Android app development from Jaffna, Sri Lanka. DataMeld builds cross-platform mobile apps with Flutter from a single codebase and ships them to the App Store and Google Play.",
    eyebrow: "Mobile app development",
    h1: "iOS & Android app development",
    h1Accent: "with one Flutter codebase.",
    intro:
      "DataMeld designs and builds mobile apps for startups and growing businesses. Using Flutter, we ship native-quality iOS and Android apps from a single codebase, so you launch on both app stores faster and maintain one product instead of two.",
    builds: [
      {
        title: "Cross-platform apps",
        description: "One Flutter codebase, two native apps. Consistent design and features on iPhone and Android without paying for two teams.",
      },
      {
        title: "MVPs for startups",
        description: "A focused first version you can test with real users, then improve in two-week sprints based on what they do.",
      },
      {
        title: "Companion apps for your web platform",
        description: "Give your customers a mobile app that shares accounts and data with your existing web app or backend.",
      },
      {
        title: "App store launch & maintenance",
        description: "We handle App Store and Google Play submission, then keep your app updated for new OS versions and devices.",
      },
    ],
    stack: ["Flutter", "Dart", "iOS", "Android"],
    stackNote:
      "Flutter compiles to native code on both platforms, giving smooth performance with a single, maintainable codebase.",
    reasons: [
      {
        title: "Two platforms, one budget",
        description: "Building with Flutter means one codebase for iOS and Android, which keeps cost and timelines down.",
      },
      {
        title: "Direct access to builders",
        description: "You talk to the people who design and write your app. No account managers in between.",
      },
      {
        title: "You own the code",
        description: "Full source code, documentation and store account access are handed over to you.",
      },
      {
        title: "Secure by default",
        description: "Least-privilege access and careful handling of your users' data on device and in the cloud.",
      },
    ],
    faqs: [
      {
        q: "Do you build apps for both iOS and Android?",
        a: "Yes. We use Flutter to build iOS and Android apps from a single codebase, and we publish them to both the Apple App Store and Google Play.",
      },
      {
        q: "How long does it take to build a mobile app?",
        a: "We follow the same four-step process as our web projects: discovery in week one, design in weeks two to three, build in weeks three to six, and launch from around week six. Complex apps continue in two-week sprints.",
      },
      {
        q: "Why Flutter instead of separate native apps?",
        a: "Flutter gives near-native performance with one codebase, so new features ship to both platforms at once and maintenance costs less over the life of the app.",
      },
      {
        q: "Can the app connect to my existing website or system?",
        a: "Yes. We regularly connect apps to existing backends and APIs, or build the backend alongside the app if you don't have one yet.",
      },
      {
        q: "Will I own the app and its source code?",
        a: "Yes. You get the full source code, documentation and ownership of the App Store and Google Play listings.",
      },
    ],
  },
];

export const getServicePage = (slug: ServicePage["slug"]) => servicePages.find((s) => s.slug === slug)!;
