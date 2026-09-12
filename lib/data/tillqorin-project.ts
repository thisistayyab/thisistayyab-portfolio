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
  "inventory management software",
  "thermal receipt printing",
  "Supabase POS",
  "React POS application",
  "Tayyab Tillqorin",
  "Taylance Tech Tillqorin",
] as const

export const tillqorinProject: PortfolioProject = {
  id: 1,
  slug: "tillqorin",
  name: "Tillqorin",
  roleLabel: "Studio product",
  image: "/images/projects/tillqorin.webp",
  imageAlt:
    "Tillqorin Commerce OS retail dashboard on a POS monitor with receipt printer and card terminal — built by Tayyab at Taylance Tech",
  imageTitle: "Tillqorin — commerce OS for retail",
  link: TILLQORIN_MARKETING_URL,
  appUrl: TILLQORIN_APP_URL,
  detailPath: "/projects/tillqorin",
  alternateName: ["Tillqorin Commerce OS", "Tillqorin POS"],
  applicationCategory: "BusinessApplication",
  publisher: {
    name: "Taylance Tech",
    url: "https://taylancetech.com",
  },
  seoKeywords: tillqorinSeoKeywords,
  description:
    "Tillqorin is Taylance Tech's in-house POS and billing platform — sales orders, purchases, inventory, accounts, analytics, and thermal receipt printing. I led full-stack development with React, Vite, Express.js, and Supabase. Product marketing at taylancetech.com; live app at pos.taylancetech.com.",
  tags: [
    { label: "Studio product", variant: "feature" },
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
  "Tillqorin is a web POS and billing platform I built at Taylance Tech — sales, purchases, inventory, accounts, analytics, and thermal receipts. React, Vite, Express.js, and Supabase."
