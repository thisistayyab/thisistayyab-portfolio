import type { PortfolioProject } from "@/components/site/project-card"

export const TAYLANCE_CRM_URL = "https://crm.taylancetech.com/"

export const taylanceCrmSeoKeywords = [
  "Taylance CRM",
  "CRM web application",
  "custom CRM developer",
  "sales pipeline dashboard",
  "client and lead management software",
  "project tracking CRM",
  "React CRM dashboard",
  "Express.js REST API",
  "role-based access control CRM",
  "B2B lead management system",
  "Tayyab Taylance CRM",
  "full stack CRM development",
] as const

export const taylanceCrmProject: PortfolioProject = {
  id: 5,
  slug: "taylance-crm",
  name: "Taylance CRM",
  roleLabel: "Full-stack product",
  image: "/images/projects/taylance-crm.webp",
  imageAlt:
    "Taylance CRM dashboard for managing clients, leads, and projects, built by full stack developer Tayyab with React, Express.js, and Material UI",
  imageTitle: "Taylance CRM — Clients, Leads & Projects Dashboard",
  link: TAYLANCE_CRM_URL,
  detailPath: "/projects/taylance-crm",
  alternateName: ["Taylance CRM Dashboard", "Taylance Lead & Project CRM"],
  applicationCategory: "BusinessApplication",
  seoKeywords: taylanceCrmSeoKeywords,
  description:
    "Taylance CRM is a full-featured B2B customer relationship and operations platform I architected and built end to end to manage clients, sales pipelines, leads, and project delivery from a unified dashboard. Built with React, Express.js, Node.js, and Material UI with role-based access control and real-time pipeline analytics.",
  tags: [
    { label: "Full-stack product", variant: "feature" },
    { label: "React", variant: "tech" },
    { label: "Node.js", variant: "tech" },
    { label: "Express.js", variant: "tech" },
    { label: "Material UI", variant: "tech" },
    { label: "CRM & pipelines", variant: "feature" },
    { label: "Role-based auth", variant: "feature" },
  ],
  ctaLabel: "Live CRM app",
}

export const taylanceCrmPageTitle =
  "Taylance CRM — Clients, Leads & Projects Platform Built by Tayyab | Full Stack Portfolio"

export const taylanceCrmPageDescription =
  "Case study of Taylance CRM: a B2B client, lead pipeline, and project management web application built by Full Stack Developer Tayyab using React, Node.js, Express.js, and Material UI."
