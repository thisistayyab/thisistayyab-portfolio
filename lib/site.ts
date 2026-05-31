export const SITE_URL = "https://thisistayyab.dev"
export const SITE_NAME = "Tayyab's Portfolio"

export interface NavItem {
  label: string
  href: string
  description: string
}

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    description:
      "Return to the home page showcasing Tayyab's portfolio introduction and overview",
  },
  {
    label: "About",
    href: "/about",
    description:
      "Learn about Tayyab's background, skills, and experience as a Full Stack Developer",
  },
  {
    label: "Projects",
    href: "/projects",
    description: "View Tayyab's portfolio of web development projects and applications",
  },
  {
    label: "Experience",
    href: "/#experience",
    description: "Explore Tayyab's professional experience and career journey",
  },
  {
    label: "Testimonials",
    href: "/#client",
    description: "Read client testimonials and feedback about Tayyab's work",
  },
  {
    label: "Services",
    href: "/#services",
    description:
      "Browse professional web development services including full-stack development, React, Node.js, and SEO optimization",
  },
  {
    label: "Insights",
    href: "/blog",
    description: "Read articles and tips on web development, React, Node.js, and performance",
  },
  {
    label: "Contact",
    href: "/#contact",
    description:
      "Get in touch with Tayyab for web development projects and opportunities",
  },
]

export const profileSameAs = [
  "https://github.com/thisistayyab",
  "https://www.linkedin.com/in/thisistayyab/",
  "https://leetcode.com/u/thisistayyab/",
] as const

export const profileEmail = "thisistayyab@outlook.com"

export const homeMetadata = {
  title: "Tayyab - Full Stack Developer | React, Next.js & Node.js Expert",
  description:
    "Hire Tayyab — full stack developer building fast, scalable web apps with React, Next.js, Node.js, and PostgreSQL. 3+ years experience, 1,150+ LeetCode problems, 15+ projects completed.",
  keywords: [
    "Tayyab",
    "Full Stack Developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "PostgreSQL developer",
    "REST API developer",
    "freelance web developer",
    "full stack for hire",
    "web application development",
    "SaaS developer",
    "portfolio",
  ],
} as const
