import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { CtaLink } from "@/components/site/cta-link"
import { JsonLd } from "@/components/site/json-ld"
import { OptimizedPicture } from "@/components/site/optimized-picture"
import { ctaPrimaryClassName } from "@/components/site/site-styles"
import {
  TILLQORIN_APP_URL,
  TILLQORIN_MARKETING_URL,
  tillqorinPageDescription,
  tillqorinPageTitle,
  tillqorinProject,
  tillqorinSeoKeywords,
} from "@/lib/data/tillqorin-project"
import {
  buildPortfolioProjectBreadcrumbJsonLd,
  buildPortfolioProjectSoftwareApplicationJsonLd,
} from "@/lib/portfolio-project-json-ld"
import { buildPageMetadata } from "@/lib/site-metadata"
import { projectImageUrl, SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const highlights = [
  "Sales orders, purchases, inventory, and accounts in one web app",
  "Analytics dashboard for revenue, expenses, and net profit trends",
  "Thermal, A4, and A5 invoice printing with branded receipts",
  "Barcode label printing and Excel export across key reports",
  "Deployed in production at pos.taylancetech.com with a Supabase-backed API",
] as const

export const metadata: Metadata = buildPageMetadata({
  title: tillqorinPageTitle,
  description: tillqorinPageDescription,
  canonicalPath: "/projects/tillqorin",
  keywords: tillqorinSeoKeywords,
  openGraph: {
    title: "Tillqorin POS — Commerce OS | Built by Tayyab",
    description: tillqorinPageDescription,
  },
  ogImage: {
    url: projectImageUrl(tillqorinProject.image),
    alt: tillqorinProject.imageAlt,
    width: 1280,
    height: 720,
    type: "image/jpeg",
  },
  twitter: {
    title: "Tillqorin POS — Commerce OS Built by Tayyab",
    description: tillqorinPageDescription,
  },
})

export default function TillqorinProjectPage() {
  const breadcrumbJsonLd = buildPortfolioProjectBreadcrumbJsonLd(SITE_URL, tillqorinProject)

  return (
    <>
      <JsonLd data={buildPortfolioProjectSoftwareApplicationJsonLd(tillqorinProject, SITE_URL)} />
      {breadcrumbJsonLd ? <JsonLd data={breadcrumbJsonLd} /> : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/projects/tillqorin`,
          name: tillqorinPageTitle,
          description: tillqorinPageDescription,
          url: `${SITE_URL}/projects/tillqorin`,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "Tayyab — Full Stack Developer",
          },
          about: { "@id": `${SITE_URL}/projects/tillqorin` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: projectImageUrl(tillqorinProject.image),
            caption: tillqorinProject.imageAlt,
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
          Full-stack product · POS &amp; commerce platform
        </p>

        <h1 className="mt-3 text-[clamp(1.85rem,5vw,2.75rem)] font-bold tracking-tight text-white">
          Tillqorin — POS &amp; Commerce OS for Retail
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.85]">
          {tillqorinProject.description}
        </p>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
          <OptimizedPicture
            src={tillqorinProject.image}
            alt={tillqorinProject.imageAlt}
            title={tillqorinProject.imageTitle}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <section className="mt-10" aria-labelledby="tillqorin-highlights-heading">
          <h2 id="tillqorin-highlights-heading" className="text-lg font-semibold text-white">
            What Tillqorin includes
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400/80"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="tillqorin-stack-heading">
          <h2 id="tillqorin-stack-heading" className="text-lg font-semibold text-white">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tillqorin technologies">
            {tillqorinProject.tags.map((tag) => (
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
            href={TILLQORIN_MARKETING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ctaPrimaryClassName, "text-[0.88rem] px-5 py-3")}
          >
            Product page
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          <a
            href={TILLQORIN_APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ctaPrimaryClassName, "text-[0.88rem] px-5 py-3")}
          >
            Live POS app
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-slate-500">
          Tillqorin is a full stack web application I architected, built, and shipped end to end —
          from the database schema and REST API to the retail dashboard and invoice printing system.
        </p>

        <div className="mt-10 flex justify-center">
          <CtaLink href="/projects" title="View all portfolio projects">
            View all projects
            <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
          </CtaLink>
        </div>
      </article>
    </>
  )
}
