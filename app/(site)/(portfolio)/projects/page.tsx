import { ArrowLeft, ArrowRight, Code2, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import type { PortfolioProject } from "@/components/site/project-card"
import { CtaLink } from "@/components/site/cta-link"
import { FaqSection } from "@/components/site/faq-section"
import { GlassSurface } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { ProjectWarmup } from "@/components/site/project-warmup"
import { ProjectsShowcase } from "@/components/site/projects-showcase"
import { ctaSecondaryClassName, navGlassClassName } from "@/components/site/site-styles"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { buildPageMetadata } from "@/lib/site-metadata"
import { auditblocProject, auditblocSeoKeywords } from "@/lib/data/auditbloc-project"
import { relayProject, relaySeoKeywords } from "@/lib/data/relay-project"
import { taylanceCrmProject, taylanceCrmSeoKeywords } from "@/lib/data/taylance-crm-project"
import { tillqorinProject, tillqorinSeoKeywords } from "@/lib/data/tillqorin-project"
import { youtubeDownloaderProject, youtubeDownloaderSeoKeywords } from "@/lib/data/youtube-downloader-project"
import { projectPortfolioUrl } from "@/lib/portfolio-project-json-ld"
import { projectImageUrl, SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const projectsPageIntro =
  "Explore production SaaS platforms, real-time web applications, and private client systems architected and built by Tayyab — a Full Stack Developer specializing in React, Next.js, TypeScript, Node.js, and PostgreSQL. Featured work includes Tillqorin POS (Commerce OS), AuditBloc (automated accessibility & compliance scanner), Taylance CRM (B2B pipeline & delivery workspace), and Relay (real-time WebRTC P2P file transfer)."

const projectsKeywords = [
  ...relaySeoKeywords,
  ...taylanceCrmSeoKeywords,
  ...youtubeDownloaderSeoKeywords,
  "Tayyab web development portfolio",
  "Tillqorin",
  "Tillqorin POS",
  "React portfolio projects",
  "Next.js project examples",
  "Node.js full stack projects",
  "SaaS web application portfolio",
  "Supabase React projects",
  "Express.js API projects",
  "freelance full stack portfolio",
  "production web apps",
  "Taylance CRM",
  "CRM dashboard development",
  "REST API portfolio examples",
  "web application case studies",
] as const

const portfolioProjects: PortfolioProject[] = [
  tillqorinProject,
  auditblocProject,
  taylanceCrmProject,
  relayProject,
  youtubeDownloaderProject,
  {
    id: 6,
    slug: "7opportunity",
    name: "7Opportunity",
    roleLabel: "Client delivery (NDA)",
    isClientWork: true,
    image: "/images/projects/tayyab-7opportunity-react-marketing-platform.webp",
    imageAlt: "7Opportunity client marketing and lead acquisition platform built by Tayyab",
    imageTitle: "7Opportunity marketing platform",
    link: "",
    description:
      "Private client engagement: engineered a high-converting growth and lead acquisition platform featuring interactive scroll-driven sections, lead capture workflows, and an Express.js + Supabase REST API backend. Optimized for Core Web Vitals (90+ Lighthouse scores) and mobile conversion. Delivered as white-label client work under NDA; full IP and internal production deployment belong to the client.",
    tags: [
      { label: "Client NDA", variant: "feature" },
      { label: "React", variant: "tech" },
      { label: "Express.js", variant: "tech" },
      { label: "Supabase", variant: "tech" },
      { label: "Lighthouse 90+", variant: "feature" },
    ],
    ctaLabel: "Private Client App",
    ctaDisabled: true,
    ctaDisabledReason: "Private client deployment under NDA — not publicly accessible.",
  },
  {
    id: 7,
    slug: "7options",
    name: "7Options",
    roleLabel: "Client delivery (NDA)",
    isClientWork: true,
    image: "/images/projects/7options.webp",
    imageAlt: "7Options subscription and billing management platform built by Tayyab",
    imageTitle: "7Options subscription platform",
    link: "",
    description:
      "Private client engagement: architected a full-stack subscription and account management SaaS platform with multi-tier billing plans, subscriber dashboards, payment webhooks, and role-based admin controls using React, Express.js, and Supabase. Delivered as white-label client work under NDA; full IP and internal production deployment belong to the client.",
    tags: [
      { label: "Client NDA", variant: "feature" },
      { label: "React", variant: "tech" },
      { label: "Express.js", variant: "tech" },
      { label: "Supabase", variant: "tech" },
      { label: "Subscriptions & Billing", variant: "feature" },
    ],
    ctaLabel: "Private Client App",
    ctaDisabled: true,
    ctaDisabledReason: "Private client deployment under NDA — not publicly accessible.",
  },
  {
    id: 8,
    slug: "7talenthub",
    name: "7TalentHub",
    roleLabel: "Client delivery (NDA)",
    isClientWork: true,
    image: "/images/projects/7talenthub.webp",
    imageAlt: "7TalentHub enterprise talent and HR CRM interface built by Tayyab",
    imageTitle: "7TalentHub CRM interface",
    link: "",
    description:
      "Private client engagement: built an internal enterprise HR and talent operations CRM for employee relations, candidate pipeline tracking, and team performance analytics using React, Node.js, and Supabase PostgreSQL. Delivered as white-label client work under NDA; full IP and internal production deployment belong to the client.",
    tags: [
      { label: "Client NDA", variant: "feature" },
      { label: "React", variant: "tech" },
      { label: "Node.js", variant: "tech" },
      { label: "Supabase", variant: "tech" },
      { label: "Enterprise CRM", variant: "feature" },
    ],
    ctaLabel: "Private Client App",
    ctaDisabled: true,
    ctaDisabledReason: "Private client deployment under NDA — not publicly accessible.",
  },
]

const projectsFaq = [
  {
    question: "What kind of projects are featured in this portfolio?",
    answer:
      "Every project listed here is a real production software product or private client system — including multi-tenant SaaS platforms, retail POS & billing software (Tillqorin POS), automated browser compliance scanners (AuditBloc), B2B CRM workspaces (Taylance CRM), and WebRTC real-time apps (Relay). Each flagship product includes a full engineering case study.",
  },
  {
    question: "What technologies do you use across these production builds?",
    answer:
      "React 19, Next.js (App Router), TypeScript, Tailwind CSS, Node.js, Express.js, FastAPI, PostgreSQL, Supabase (Auth & Row-Level Security), Redis, Socket.IO, WebRTC, Playwright, and Docker.",
  },
  {
    question: "Can I test the live applications right now?",
    answer:
      "Yes. Flagship products like Tillqorin POS (pos.taylancetech.com), AuditBloc (auditbloc.taylancetech.com), Taylance CRM (crm.taylancetech.com), and Relay (relay.thisistayyab.dev) are live in production and open to explore alongside their detailed architectural case studies.",
  },
  {
    question: "Why are some tools password-protected or marked as Client NDA?",
    answer:
      "Client deliveries (7Opportunity, 7Options, 7TalentHub) are proprietary business platforms built under client NDA / white-label agreements where the live deployment is internal to the client's organization. Personal media tools like the YouTube Video Downloader are protected by an APP_SECRET passphrase to comply with platform policies and prevent public server abuse.",
  },
  {
    question: "Can you build a similar SaaS product, POS, or custom CRM for my business?",
    answer:
      "Yes. I partner with startup founders, product teams, and businesses globally to take web applications from initial technical scope and database design through to production launch. Reach out via the contact page for a free project scope.",
  },
] as const

const PROJECTS_LIST_ID = `${SITE_URL}/projects#portfolio`

function buildProjectsItemListJsonLd(projects: PortfolioProject[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": PROJECTS_LIST_ID,
    name: "Tayyab Full Stack Web Development Portfolio",
    description: projectsPageIntro,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": projectPortfolioUrl(SITE_URL, project),
        name: project.name,
        description: project.description,
        url: project.ctaDisabled
          ? projectPortfolioUrl(SITE_URL, project)
          : project.detailPath
            ? projectPortfolioUrl(SITE_URL, project)
            : project.link || projectPortfolioUrl(SITE_URL, project),
        image: {
          "@type": "ImageObject",
          url: projectImageUrl(project.image),
          contentUrl: projectImageUrl(project.image),
          name: project.imageTitle,
          caption: project.imageAlt,
          description: project.imageAlt,
        },
        applicationCategory: project.applicationCategory ?? "WebApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        author: {
          "@type": "Person",
          "@id": `${SITE_URL}/about`,
          name: "Tayyab",
          url: `${SITE_URL}/about`,
          jobTitle: "Full Stack Developer",
        },
        ...(project.client
          ? {
              copyrightHolder: {
                "@type": "Organization",
                name: project.client,
              },
            }
          : project.isClientWork
            ? {
                maintainer: {
                  "@type": "Person",
                  "@id": `${SITE_URL}/about`,
                  name: "Tayyab",
                  url: `${SITE_URL}/about`,
                  jobTitle: "Full Stack Developer",
                },
              }
            : {}),
      },
    })),
  }
}

export const metadata: Metadata = buildPageMetadata({
  title: "Web Development Projects | React & Next.js Portfolio",
  description:
    "Full stack portfolio: Tillqorin POS, AuditBloc, Relay, Taylance CRM, and production React and Node.js projects with real APIs and databases.",
  canonicalPath: "/projects",
  keywords: [...auditblocSeoKeywords, ...tillqorinSeoKeywords, ...projectsKeywords],
  openGraph: {
    title: "Web Development Projects | Full Stack Developer Tayyab",
    description:
      "Full stack portfolio featuring Tillqorin POS, AuditBloc, Relay, Taylance CRM, React and Node.js apps, and production-ready web projects.",
  },
  ogImage: {
    url: `${SITE_URL}/images/og.jpg`,
    alt: "Tayyab — Full Stack Developer Portfolio",
    width: 1200,
    height: 630,
    type: "image/jpeg",
  },
  twitter: {
    title: "Full Stack Web Development Projects | Tayyab",
    description:
      "Full stack portfolio: Tillqorin POS, AuditBloc, Relay, Taylance CRM, React and Node.js apps, and production-ready web projects.",
  },
})

export default function ProjectsPage() {
  return (
    <>
      <ProjectWarmup />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          ],
        }}
      />
      <JsonLd data={buildProjectsItemListJsonLd(portfolioProjects)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/projects`,
          name: "Tayyab Web Development Projects",
          description: projectsPageIntro,
          url: `${SITE_URL}/projects`,
          isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: "Tayyab — Full Stack Developer" },
          about: {
            "@type": "Person",
            "@id": `${SITE_URL}/about`,
            name: "Tayyab",
            jobTitle: "Full Stack Web Developer",
            url: `${SITE_URL}/about`,
          },
          mainEntity: { "@id": PROJECTS_LIST_ID },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: projectsFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      <article className="relative z-[5]" itemScope itemType="https://schema.org/CollectionPage">
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

            <PageHeaderStagger className="mx-auto max-w-3xl text-center">
              <PageHeaderItem>
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
                  Portfolio
                </p>
              </PageHeaderItem>
              <PageHeaderItem>
                <h1 className="text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.08] font-bold tracking-tight text-white">
                  Full stack web development projects
                </h1>
              </PageHeaderItem>
              <PageHeaderItem>
                <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
                <p className="text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.8]">
                  {projectsPageIntro}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  React · Next.js · Node.js · TypeScript · PostgreSQL · MongoDB · Supabase · REST
                  APIs · SaaS · Real-time apps
                </p>
              </PageHeaderItem>
            </PageHeaderStagger>
          </div>
        </header>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-6 lg:px-4"
          aria-labelledby="projects-grid-heading"
        >
          <h2 id="projects-grid-heading" className="sr-only">
            All portfolio projects by Tayyab
          </h2>
          <ProjectsShowcase
            projects={portfolioProjects}
            listLabel="Full stack web development portfolio projects"
          />
        </MotionSection>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-6 lg:px-4"
          aria-labelledby="engineering-depth-heading"
        >
          <GlassSurface
            rim="violet"
            className={cn(
              navGlassClassName,
              "flex flex-col justify-between gap-6 rounded-2xl p-6 sm:p-8 lg:flex-row lg:items-center",
            )}
          >
            <div className="max-w-2xl">
              <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase">
                <Code2 className="size-4 text-cyan-300" aria-hidden="true" />
                Algorithmic &amp; Systems Foundation
              </p>
              <h2
                id="engineering-depth-heading"
                className="text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                1,150+ LeetCode Challenges Solved in C++ — Applied to Production Architecture
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-300/90 sm:text-base">
                Every SaaS platform, database schema, and real-time API above is backed by rigorous
                data structures and algorithmic problem-solving — ensuring low-latency queries,
                predictable memory usage, and clean edge-case handling in production.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <CtaLink
                href="/contact"
                title="Request a free technical scope for your web application"
              >
                Start a Similar Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </CtaLink>
              <a
                href="https://leetcode.com/u/thisistayyab/"
                target="_blank"
                rel="noopener noreferrer"
                title="View Tayyab's verified LeetCode profile (1,150+ problems solved)"
                className={cn(ctaSecondaryClassName, "inline-flex items-center gap-2 text-sm px-5 py-3")}
              >
                LeetCode Profile
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </div>
          </GlassSurface>
        </MotionSection>

        <MotionSection>
        <FaqSection
          className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6 lg:px-4"
          headingId="projects-faq-heading"
          description="Quick answers about this portfolio."
          items={projectsFaq}
          footerLead="Want to know more about how I work?"
          ctas={[
            {
              label: "About Tayyab",
              href: "/about",
              title: "Read Tayyab's full stack developer background and story",
            },
            {
              label: "Get in touch",
              href: "/contact",
              variant: "secondary",
              title: "Contact Tayyab for freelance or contract web development",
            },
          ]}
        />
        </MotionSection>
      </article>
    </>
  )
}
