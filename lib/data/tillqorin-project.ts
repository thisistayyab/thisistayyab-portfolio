import type { PortfolioProject } from "@/components/site/project-card"

export const TILLQORIN_MARKETING_URL = "https://taylancetech.com/products/tillqorin"
export const TILLQORIN_APP_URL = "https://pos.taylancetech.com"

export const tillqorinSeoKeywords = [
  "Tillqorin",
  "Tillqorin POS",
  "Tillqorin Commerce OS",
  "POS software developer",
  "retail billing software",
  "web POS system",
  "point of sale web application",
  "inventory management software",
  "invoicing and billing platform",
  "thermal receipt printing",
  "barcode inventory system",
  "retail analytics dashboard",
  "Supabase POS",
  "React POS application",
  "Tayyab Tillqorin",
  "POS system built with Supabase",
] as const

export const tillqorinProject: PortfolioProject = {
  id: 3,
  slug: "tillqorin",
  name: "Tillqorin",
  roleLabel: "Full-stack product",
  image: "/images/projects/tillqorin.webp",
  imageAlt:
    "Tillqorin Commerce OS retail dashboard on a POS monitor with receipt printer and card terminal, built by full stack developer Tayyab",
  imageTitle: "Tillqorin — commerce OS for retail",
  link: TILLQORIN_MARKETING_URL,
  appUrl: TILLQORIN_APP_URL,
  detailPath: "/projects/tillqorin",
  alternateName: ["Tillqorin Commerce OS", "Tillqorin POS"],
  applicationCategory: "BusinessApplication",
  seoKeywords: tillqorinSeoKeywords,
  description:
    "Tillqorin is a web-based POS, invoicing, and inventory management platform I built end to end — sales orders, purchases, accounts, sales analytics, and thermal receipt printing. I led full-stack development with React, Vite, Express.js, and Supabase. Live app at pos.taylancetech.com.",
  tags: [
    { label: "Full-stack product", variant: "feature" },
    { label: "React", variant: "tech" },
    { label: "TypeScript", variant: "tech" },
    { label: "Supabase", variant: "tech" },
    { label: "POS & billing", variant: "feature" },
  ],
  ctaLabel: "Product page",
}

export const tillqorinPageTitle =
  "Tillqorin POS — Commerce OS Built by Tayyab | Full Stack Portfolio"

export const tillqorinPageDescription =
  "Tillqorin is a web POS and billing platform I built — sales, purchases, inventory, accounts, analytics, and thermal receipts. React, Vite, Express.js, and Supabase."
