import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { CtaLink } from "@/components/site/cta-link"
import { JsonLd } from "@/components/site/json-ld"
import { OptimizedPicture } from "@/components/site/optimized-picture"
import { ctaPrimaryClassName, ctaSecondaryClassName } from "@/components/site/site-styles"
import {
  TAYLANCE_CRM_URL,
  taylanceCrmPageDescription,
  taylanceCrmPageTitle,
  taylanceCrmProject,
  taylanceCrmSeoKeywords,
} from "@/lib/data/taylance-crm-project"
import {
  buildPortfolioProjectBreadcrumbJsonLd,
  buildPortfolioProjectSoftwareApplicationJsonLd,
} from "@/lib/portfolio-project-json-ld"
import { buildPageMetadata } from "@/lib/site-metadata"
import { projectImageUrl, SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const highlights = [
  "Unified B2B workspace connecting lead capture, deal qualification, client onboarding, and active project milestones",
  "Role-based access control (RBAC) separating executive revenue views, account managers, and delivery engineers",
  "Interactive pipeline tracking with stage conversion metrics, follow-up reminders, and activity audit logs",
  "Client account portal views summarizing contract scope, deliverables, invoices, and communication history",
  "RESTful Express.js backend engineered for predictable query performance, validation, and secure JWT session handling",
  "Responsive Material UI component system optimized for high-density data tables, quick filtering, and keyboard workflows",
] as const

const architecturePillars = [
  {
    title: "Pipeline-to-Delivery Continuity",
    detail:
      "Most teams lose context when a closed sales lead is handed off to engineering. I designed the data model so a qualified lead converts directly into a client workspace and project board without duplicate data entry.",
  },
  {
    title: "Role-Scoped API Security",
    detail:
      "Every Express.js endpoint enforces role and ownership permissions at the middleware and query layer so sales reps, project leads, and administrators only access authorized records.",
  },
  {
    title: "High-Density Operational UI",
    detail:
      "Built with React and customized Material UI data views so account managers can filter hundreds of leads, update deal stages, and log client calls in seconds.",
  },
] as const

export const metadata: Metadata = buildPageMetadata({
  title: taylanceCrmPageTitle,
  description: taylanceCrmPageDescription,
  canonicalPath: "/projects/taylance-crm",
  keywords: taylanceCrmSeoKeywords,
  openGraph: {
    title: "Taylance CRM — Clients, Leads & Projects Platform | Built by Tayyab",
    description: taylanceCrmPageDescription,
  },
  ogImage: {
    url: projectImageUrl(taylanceCrmProject.image),
    alt: taylanceCrmProject.imageAlt,
    width: 1280,
    height: 720,
    type: "image/webp",
  },
  twitter: {
    title: "Taylance CRM — Built by Tayyab",
    description: taylanceCrmPageDescription,
  },
})

export default function TaylanceCrmProjectPage() {
  const breadcrumbJsonLd = buildPortfolioProjectBreadcrumbJsonLd(SITE_URL, taylanceCrmProject)

  return (
    <>
      <JsonLd data={buildPortfolioProjectSoftwareApplicationJsonLd(taylanceCrmProject, SITE_URL)} />
      {breadcrumbJsonLd ? <JsonLd data={breadcrumbJsonLd} /> : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/projects/taylance-crm`,
          name: taylanceCrmPageTitle,
          description: taylanceCrmPageDescription,
          url: `${SITE_URL}/projects/taylance-crm`,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "Tayyab — Full Stack Developer",
          },
          about: { "@id": `${SITE_URL}/projects/taylance-crm` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: projectImageUrl(taylanceCrmProject.image),
            caption: taylanceCrmProject.imageAlt,
          },
        }}
      />

      <article className="relative mx-auto max-w-3xl px-5 py-24 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <p className="text-xs font-semibold tracking-[0.2em] text-violet-300/80 uppercase">
          Full-stack product · B2B CRM &amp; operations platform
        </p>

        <h1 className="mt-3 text-[clamp(1.85rem,5vw,2.75rem)] font-bold tracking-tight text-white">
          Taylance CRM — Clients, Leads &amp; Projects Dashboard
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.85]">
          {taylanceCrmProject.description}
        </p>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
          <OptimizedPicture
            src={taylanceCrmProject.image}
            alt={taylanceCrmProject.imageAlt}
            title={taylanceCrmProject.imageTitle}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <section className="mt-10" aria-labelledby="crm-problem-heading">
          <h2 id="crm-problem-heading" className="text-lg font-semibold text-white">
            The Engineering Problem It Solves
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            <p>
              Service agencies and B2B product teams frequently split their operations across
              disconnected spreadsheets, chat threads, and generic task boards. Sales reps track
              inbound leads in one tool while project managers track delivery milestones in another,
              creating blind spots around deal status, client communication, and team capacity.
            </p>
            <p>
              I architected and built Taylance CRM as a centralized operational system where lead
              capture, pipeline qualification, client records, and active project execution live in
              a single, fast web application.
            </p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="crm-highlights-heading">
          <h2 id="crm-highlights-heading" className="text-lg font-semibold text-white">
            Core Capabilities I Built
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <CheckCircle2
                  className="mt-1 size-4 shrink-0 text-cyan-400"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="crm-architecture-heading">
          <h2 id="crm-architecture-heading" className="text-lg font-semibold text-white">
            Architecture &amp; Technical Decisions
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {architecturePillars.map((pillar) => (
              <div
                key={pillar.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <h3 className="text-sm font-semibold text-white">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10" aria-labelledby="crm-stack-heading">
          <h2 id="crm-stack-heading" className="text-lg font-semibold text-white">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Taylance CRM technologies">
            {taylanceCrmProject.tags.map((tag) => (
              <li key={tag.label}>
                <span
                  className={
                    tag.variant === "feature"
                      ? "rounded-full border border-cyan-500/35 bg-cyan-500/[0.06] px-3 py-1 text-sm font-medium text-cyan-300/90"
                      : "rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-sm font-medium text-slate-300"
                  }
                >
                  {tag.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={TAYLANCE_CRM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ctaPrimaryClassName, "text-[0.88rem] px-5 py-3")}
          >
            Live CRM app
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          <Link
            href="/contact?project=Custom+CRM+%26+Internal+Dashboard"
            className={cn(ctaSecondaryClassName, "text-[0.88rem] px-5 py-3")}
          >
            Need a custom CRM or dashboard? Let&apos;s talk
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/[0.07] via-slate-900/60 to-violet-500/[0.07] p-6">
          <h2 className="text-base font-semibold text-white sm:text-lg">
            Looking to build a custom CRM, admin portal, or SaaS dashboard?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            I design and ship custom internal tools, multi-tenant B2B dashboards, and role-based
            workflows tailored to how your team actually operates.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <CtaLink href="/contact?project=Custom+CRM+or+SaaS+Dashboard" title="Start a CRM or dashboard project">
              Request a Free Project Scope
              <ArrowRight className="size-4" aria-hidden="true" />
            </CtaLink>
            <CtaLink href="/projects" variant="secondary" title="View all portfolio projects">
              View all projects
            </CtaLink>
          </div>
        </div>
      </article>
    </>
  )
}
