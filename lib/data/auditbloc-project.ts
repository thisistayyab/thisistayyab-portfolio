import type { PortfolioProject } from "@/components/site/project-card"

export const AUDITBLOC_URL = "https://auditbloc.taylancetech.com"

export const auditblocSeoKeywords = [
  "AuditBloc",
  "AuditBloc accessibility scanner",
  "web accessibility scanner",
  "WCAG compliance checker",
  "GDPR cookie audit",
  "AI disclosure checker",
  "automated accessibility testing",
  "website compliance tool",
  "Playwright accessibility",
  "axe-core scanner",
  "Next.js accessibility tool",
  "Tayyab AuditBloc",
  "Taylance Tech AuditBloc",
] as const

export const auditblocProject: PortfolioProject = {
  id: 0,
  slug: "auditbloc",
  name: "AuditBloc",
  roleLabel: "Studio product",
  image: "/images/projects/auditbloc.webp",
  imageAlt:
    "AuditBloc scanner dashboard showing accessibility check results — built by Tayyab",
  imageTitle: "AuditBloc accessibility scanner",
  link: AUDITBLOC_URL,
  detailPath: "/projects/auditbloc",
  alternateName: ["AuditBloc Scanner", "AuditBloc Compliance Tool"],
  applicationCategory: "BusinessApplication",
  publisher: {
    name: "Taylance Tech",
    url: "https://taylancetech.com",
  },
  seoKeywords: auditblocSeoKeywords,
  description:
    "I built AuditBloc as a free web accessibility and compliance scanner for Taylance Tech. It checks websites for WCAG accessibility issues, GDPR cookie banner problems, and AI content disclosure. I used Next.js 16, Playwright for browser automation, axe-core for accessibility testing, and Supabase for the backend.",
  tags: [
    { label: "Studio product", variant: "feature" },
    { label: "Next.js 16", variant: "tech" },
    { label: "Playwright", variant: "tech" },
    { label: "axe-core", variant: "tech" },
    { label: "Supabase", variant: "tech" },
    { label: "WCAG compliance", variant: "feature" },
    { label: "GDPR compliance", variant: "feature" },
    { label: "Docker", variant: "tech" },
  ],
  ctaLabel: "Live scanner",
}

export const auditblocPageTitle =
  "AuditBloc — Accessibility Scanner I Built | Full Stack Portfolio"

export const auditblocPageDescription =
  "I built AuditBloc as a free web accessibility scanner using Next.js, Playwright, and axe-core. It checks WCAG compliance, GDPR cookies, and AI disclosure. Part of Taylance Tech products."
