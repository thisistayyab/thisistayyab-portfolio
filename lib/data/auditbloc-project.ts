import type { PortfolioProject } from "@/components/site/project-card"

export const AUDITBLOC_URL = "https://auditbloc.taylancetech.com"

export const auditblocSeoKeywords = [
  "AuditBloc",
  "AuditBloc accessibility scanner",
  "web accessibility scanner",
  "WCAG compliance checker",
  "WCAG 2.2 audit tool",
  "GDPR cookie audit",
  "AI disclosure checker",
  "automated accessibility testing",
  "website compliance tool",
  "accessibility audit service",
  "Playwright accessibility",
  "axe-core scanner",
  "Next.js accessibility tool",
  "Tayyab AuditBloc",
  "free accessibility checker online",
] as const

export const auditblocProject: PortfolioProject = {
  id: 2,
  slug: "auditbloc",
  name: "AuditBloc",
  roleLabel: "Full-stack product",
  image: "/images/projects/auditbloc.webp",
  imageAlt:
    "AuditBloc web accessibility scanner dashboard showing automated WCAG, GDPR cookie, and AI disclosure check results, built by full stack developer Tayyab",
  imageTitle: "AuditBloc accessibility scanner",
  link: AUDITBLOC_URL,
  detailPath: "/projects/auditbloc",
  alternateName: ["AuditBloc Scanner", "AuditBloc Compliance Tool"],
  applicationCategory: "BusinessApplication",
  seoKeywords: auditblocSeoKeywords,
  description:
    "I built AuditBloc as a free web accessibility and compliance scanner. It audits websites for WCAG accessibility issues, GDPR cookie banner problems, and AI content disclosure, then reports results in a clear dashboard. Built with Next.js 16, Playwright browser automation, axe-core accessibility testing, and Supabase.",
  tags: [
    { label: "Full-stack product", variant: "feature" },
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
  "AuditBloc — Web Accessibility & Compliance Scanner I Built | Full Stack Portfolio"

export const auditblocPageDescription =
  "AuditBloc is a free web accessibility and compliance scanner I built with Next.js, Playwright, and axe-core. It checks WCAG compliance, GDPR cookie banners, and AI content disclosure automatically."
