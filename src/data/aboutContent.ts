export type TextSegment = {
  text: string;
  bold?: boolean;
};

export const homeAboutPreview = {
  eyebrow: 'About',
  headingBefore: 'Full stack developer who ships',
  headingHighlight: 'real products',
  headingAfter: '— not just code',
  paragraphs: [
    [
      { text: "I'm Tayyab — a ", bold: false },
      { text: 'full stack web developer', bold: true },
      { text: ' with 3+ years of experience building production-ready ', bold: false },
      { text: 'React and Node.js applications', bold: true },
      {
        text: ' for startups, SaaS products, and growing businesses.',
        bold: false,
      },
    ],
    [
      { text: 'My work spans the entire stack: responsive React UIs, REST and GraphQL APIs, PostgreSQL databases, and cloud deployments. I don\'t just write code — I think about ', bold: false },
      { text: 'performance, maintainability, and scalability', bold: true },
      { text: ' from day one. Having solved over ', bold: false },
      { text: '1,150+ LeetCode problems', bold: true },
      {
        text: ", I bring strong algorithmic thinking to every backend challenge, whether it's optimizing queries, designing data models, or building features that hold up under real traffic. If you're looking to ",
        bold: false,
      },
      { text: 'hire a full stack developer', bold: true },
      { text: ' who ships clean, tested, production-grade software — let\'s talk.', bold: false },
    ],
  ] satisfies readonly TextSegment[][],
  ctaLabel: 'Learn more about Tayyab',
  ctaHref: '/about',
} as const;

export interface AboutSection {
  id: string;
  title: string;
  paragraphs: readonly string[];
  list?: readonly string[];
}

export const aboutPageContent = {
  h1: 'About Tayyab',
  intro:
    "I'm a full stack web developer with 3+ years of experience shipping React and Node.js apps for startups, SaaS teams, and growing businesses.",
  sections: [
    {
      id: 'background',
      title: 'What I do',
      paragraphs: [
        "I build across the full stack — React frontends, Node.js APIs, PostgreSQL databases, and deployments that stay up under real traffic.",
        "Most of my work has been through Upwork, Fiverr, and Taylance Tech, where I take projects from idea to production without cutting corners on testing or code quality.",
      ],
    },
    {
      id: 'achievements',
      title: 'Track record',
      paragraphs: ['A few numbers that matter on client work:'],
      list: [
        '3+ years building full stack web applications',
        '15+ projects shipped end to end',
        '1,150+ LeetCode problems solved',
        '100% client satisfaction on completed freelance jobs',
      ],
    },
    {
      id: 'expertise',
      title: 'Stack I work with',
      paragraphs: [
        'I stay close to tools I can ship with quickly and maintain long after launch.',
      ],
      list: [
        'React, Next.js, TypeScript, Tailwind CSS',
        'Node.js, Express, REST and GraphQL APIs',
        'PostgreSQL, MongoDB, schema and query design',
        'Git, deployments, and performance tuning',
      ],
    },
    {
      id: 'approach',
      title: 'How I work',
      paragraphs: [
        "I like clear scope, regular updates, and code that's easy for the next person to pick up.",
        "Whether it's a landing page, a dashboard, or a backend API — I care about performance and maintainability from the first commit.",
      ],
    },
  ] satisfies readonly AboutSection[],
  leetcodeQuote:
    "I've solved 1,150+ LeetCode problems. That shows up in production when I'm debugging slow queries, shaping data models, or building features that need to scale.",
} as const;
