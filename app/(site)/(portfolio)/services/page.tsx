import { ArrowLeft } from "lucide-react"
import {
  Cloud,
  Code2,
  Database,
  LayoutTemplate,
  Plug,
  Search,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { FaqSection } from "@/components/site/faq-section"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import type { PortfolioService } from "@/components/site/service-card"
import {
  buildServicesBreadcrumbJsonLd,
  buildServicesFaqJsonLd,
  buildServicesItemListJsonLd,
  buildServicesWebPageJsonLd,
} from "@/components/site/services-json-ld"
import { ServicesSection } from "@/components/site/services-section"
import { buildPageMetadata } from "@/lib/site-metadata"
import { SITE_URL } from "@/lib/site"

/** Visible hero copy — keep distinct from the h1 to avoid repetition. */
const pageLead =
  "I deliver full stack software for teams that need production-grade systems: SaaS products, client platforms, internal tools, APIs, and AI automation — scoped clearly, communicated openly, and engineered for real-world use."

const pageStackNote =
  "Typical stack: React, Next.js, Node.js, and PostgreSQL — plus LLM integrations, workflow automation, Supabase, REST APIs, cloud deployment, and WordPress when it fits the product."

/** Metadata and JSON-LD — factual, not duplicated word-for-word in the hero. */
const pageMetaDescription =
  "Full stack developer Tayyab — SaaS products, web applications, Node.js APIs, PostgreSQL, AI automation, auth, deployment, and technical SEO for startups and product teams."

const servicesKeywords = [
  "hire full stack developer",
  "full stack software engineer",
  "SaaS product development",
  "AI automation developer",
  "LLM integration services",
  "React development services",
  "Next.js development services",
  "Node.js API development",
  "PostgreSQL database developer",
  "freelance software developer",
] as const

export const portfolioServices: PortfolioService[] = [
  {
    slug: "full-stack-product-development",
    title: "Full stack product development",
    tagline: "SaaS, dashboards, platforms",
    description:
      "End-to-end software: React or Next.js interfaces, Node.js services, and PostgreSQL data layers — designed for active users and long-term product growth.",
    features: [
      "Product MVPs and SaaS dashboards",
      "Server components and App Router (Next.js)",
      "REST APIs with validation and auth",
      "CI-ready repos and clean handoff",
    ],
    icon: Code2,
    rim: "blue",
  },
  {
    slug: "ai-automation",
    title: "AI automation & integrations",
    tagline: "Workflows, agents, LLM APIs",
    description:
      "Practical AI inside your product: automated workflows, LLM-backed features, and integrations that save time — wired into your Node.js services and existing data.",
    features: [
      "OpenAI and Anthropic API integration",
      "Background jobs and webhook pipelines",
      "Document Q&A and RAG-style patterns",
      "Guardrails and human review where needed",
    ],
    icon: Sparkles,
    rim: "pink",
  },
  {
    slug: "responsive-ui-development",
    title: "Responsive UI development",
    tagline: "Mobile-first, accessible interfaces",
    description:
      "Interfaces that work on every screen size: thoughtful layouts, consistent components, and accessibility built in from the start.",
    features: [
      "Tailwind CSS and component libraries",
      "WCAG-minded markup and focus states",
      "Design-to-code from Figma or wireframes",
      "Cross-browser QA on real devices",
    ],
    icon: Smartphone,
    rim: "violet",
  },
  {
    slug: "database-design",
    title: "Database design & optimization",
    tagline: "PostgreSQL, Supabase, MongoDB",
    description:
      "Database schemas, migrations, and queries that stay fast as your data grows, with sensible relationships, indexes, and safe upgrade paths.",
    features: [
      "PostgreSQL schema and migrations",
      "Query tuning and indexing strategy",
      "Supabase / Prisma integration",
      "Backup and data integrity practices",
    ],
    icon: Database,
    rim: "purple",
  },
  {
    slug: "cloud-deployment",
    title: "Cloud deployment & DevOps",
    tagline: "Vercel, AWS-ready pipelines",
    description:
      "Hosting, environments, and deployment workflows so every release follows a repeatable process instead of last-minute manual steps.",
    features: [
      "Vercel and Node hosting setup",
      "Environment variables and secrets",
      "Preview deployments per branch",
      "Monitoring hooks and rollback plan",
    ],
    icon: Cloud,
    rim: "blue",
  },
  {
    slug: "seo-and-performance",
    title: "SEO & Core Web Vitals",
    tagline: "Discoverable, fast pages",
    description:
      "Technical SEO and performance work built into the product: clean HTML, metadata, sitemaps, structured data where it matches the page, and faster Core Web Vitals.",
    features: [
      "Next.js metadata and canonical URLs",
      "JSON-LD where it matches visible content",
      "Image optimization and lazy loading",
      "Lighthouse and CWV improvements",
    ],
    icon: Search,
    rim: "pink",
  },
  {
    slug: "security-authentication",
    title: "Security & authentication",
    tagline: "Sessions, OAuth, protected APIs",
    description:
      "Authentication and API protection implemented with care: sessions or tokens, role checks, validation, and defaults that keep user data private.",
    features: [
      "Login, signup, and password reset",
      "OAuth and third-party providers",
      "Rate limiting and input validation",
      "HTTPS, CORS, and env hygiene",
    ],
    icon: Shield,
    rim: "violet",
  },
  {
    slug: "api-development",
    title: "API development & integrations",
    tagline: "REST, webhooks, third-party APIs",
    description:
      "Backends other teams can integrate with: documented REST endpoints, solid error handling, and connections to payments, email, CRMs, or internal tools.",
    features: [
      "REST API design and versioning",
      "Webhook receivers and retries",
      "Stripe and email provider setup",
      "Postman/OpenAPI documentation",
    ],
    icon: Plug,
    rim: "blue",
  },
  {
    slug: "wordpress-development",
    title: "WordPress development",
    tagline: "Themes, plugins, WooCommerce",
    description:
      "When WordPress is the right tool: custom themes, plugin work, WooCommerce setups, and performance fixes without unnecessary plugin bloat.",
    features: [
      "Custom theme development",
      "Plugin customization",
      "WooCommerce setup",
      "Migration and speed fixes",
    ],
    icon: LayoutTemplate,
    rim: "purple",
  },
]

const servicesFaq = [
  {
    question: "What types of projects do you take on?",
    answer:
      "SaaS platforms, admin dashboards, client portals, internal tools, production APIs, and AI automation (workflows, LLM features, integrations). Engagements range from new product builds to extending systems already in production.",
  },
  {
    question: "Do you work with fixed scope or hourly?",
    answer:
      "Both. Small, well-defined tasks often work hourly. Larger builds use milestone-based fixed scope so you know what each phase delivers before the next starts.",
  },
  {
    question: "Can you improve an existing codebase?",
    answer:
      "Yes. Audits, refactors, performance fixes, and feature work on live apps are common. I start with a read-only review so we do not break production blindly.",
  },
  {
    question: "Do you handle SEO for new sites?",
    answer:
      "Technical SEO is part of how I build: semantic structure, metadata, sitemaps, performance, and structured data that reflects what is actually on the page — not hidden keyword blocks.",
  },
] as const

export const metadata: Metadata = buildPageMetadata({
  title: "Services | Full Stack Developer & Software Engineer — Tayyab",
  description: pageMetaDescription,
  canonicalPath: "/services",
  keywords: servicesKeywords,
  openGraph: {
    title: "Full Stack Development Services | Tayyab",
    description: pageMetaDescription,
  },
})

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={buildServicesBreadcrumbJsonLd(SITE_URL)} />
      <JsonLd
        data={buildServicesItemListJsonLd(
          portfolioServices,
          SITE_URL,
          "/services",
          pageMetaDescription,
        )}
      />
      <JsonLd data={buildServicesWebPageJsonLd(SITE_URL, pageMetaDescription)} />
      <JsonLd data={buildServicesFaqJsonLd(servicesFaq)} />

      <article className="relative z-[5]">
        <header className="relative isolate overflow-hidden pt-[88px]">
          <HeaderGraphBackground />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020106]/90" />

          <div className="relative z-[2] mx-auto max-w-[1200px] px-5 pb-12 sm:px-6 lg:px-4">
            <div className="mb-10 pt-6">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-400 transition-all duration-300 hover:pl-2 hover:text-white"
              >
                <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
                Back to home
              </Link>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
                Services
              </p>
              <h1
                id="services-page-heading"
                className="mx-auto max-w-4xl text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.12] font-bold tracking-tight text-white"
              >
                <span className="block">Full stack software</span>
                <span className="block bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  built to ship
                </span>
              </h1>
              <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
              <p className="text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.75]">
                {pageLead}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate-500">{pageStackNote}</p>
            </div>
          </div>
        </header>

        <ServicesSection services={portfolioServices} showEngagement className="pt-4" />

        <div className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:px-4">
          <FaqSection
            headingId="services-faq-heading"
            title="Services FAQ"
            description="Answers about scope, timelines, and how I work with new clients."
            items={servicesFaq}
            ctas={[
              {
                href: "/contact",
                label: "Discuss your project",
                title: "Contact Tayyab for full stack software development",
              },
              {
                href: "/projects",
                label: "View project work",
                title: "See Tayyab's full stack project portfolio",
                variant: "secondary",
              },
            ]}
          />
        </div>
      </article>
    </>
  )
}
