import { imageSeoUrl } from "@/lib/image"

export const SITE_URL = "https://thisistayyab.dev"
/** Consistent brand across metadata, JSON-LD, manifest, and nav. */
export const SITE_BRAND = "Tayyab — Full Stack Developer"
export const SITE_NAME = SITE_BRAND

/** Absolute URL for a static project screenshot (SEO / JSON-LD) — prefers AVIF. */
export function projectImageUrl(path: string) {
  return imageSeoUrl(path, SITE_URL)
}

/** Hero / profile portrait — stylized cutout (AVIF + WebP under /public/images/about.*). */
export const PROFILE_IMAGE = "/images/about.avif" as const

/** Full hero banner for link previews (Open Graph / Twitter) — 1200×630 JPG. */
export const FEATURED_OG_IMAGE = "/images/og.jpg" as const
export const FEATURED_OG_DIMENSIONS = { width: 1200, height: 630 } as const
export const FEATURED_OG_ALT =
  "Tayyab — Full Stack Developer | React, Next.js & Node.js" as const

export function featuredOgImageUrl(siteUrl: string = SITE_URL) {
  return `${siteUrl}${FEATURED_OG_IMAGE}`
}

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
    href: "/experience",
    description: "Explore Tayyab's professional experience and career journey",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    description: "Read client testimonials and feedback about Tayyab's work",
  },
  {
    label: "Services",
    href: "/services",
    description:
      "Browse full stack software services — SaaS, APIs, AI automation, React, Next.js, Node.js, and PostgreSQL",
  },
  {
    label: "Blog",
    href: "/blog",
    description:
      "Read articles on full stack development, React, Next.js, Node.js, SaaS, and AI automation",
  },
  {
    label: "Contact",
    href: "/contact",
    description:
      "Contact Tayyab for full stack software, SaaS, API, and AI automation projects",
  },
]

/** Navbar + footer CTA */
export const letsTalkHref = "/contact"
export const letsTalkDescription =
  "Get in touch with Tayyab for full stack software, SaaS, API, and AI automation projects"

export const profileSameAs = [
  "https://github.com/thisistayyab",
  "https://www.linkedin.com/in/thisistayyab/",
  "https://leetcode.com/u/thisistayyab/",
] as const

export const profileEmail = "thisistayyab@outlook.com"

export const homeMetadata = {
  /** 50–60 chars for SERP title (SEO tools). */
  title: "Tayyab | Full Stack Developer for Hire — React, Next.js, Node.js",
  /** ~155 chars — within meta description limits (AIOSEO flags 160+). */
  description:
    "Hire Tayyab — full stack web developer for fast, scalable React, Next.js & Node.js web apps: SaaS platforms, REST APIs, Tillqorin POS, AuditBloc. 3+ yrs, 15+ projects.",
  keywords: [
    "Tayyab",
    "Tayyab full stack developer",
    "Tillqorin",
    "Tillqorin POS developer",
    "full stack developer",
    "React developer",
    "React developer for hire",
    "Next.js developer",
    "Next.js developer for hire",
    "Node.js developer",
    "Node.js backend developer",
    "PostgreSQL developer",
    "REST API developer",
    "freelance web developer",
    "freelance full stack developer",
    "full stack for hire",
    "web application development services",
    "SaaS developer",
    "SaaS product development",
    "web app developer",
    "hire web developer",
    "portfolio",
  ],
} as const
