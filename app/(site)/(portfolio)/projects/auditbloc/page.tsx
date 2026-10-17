import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { CtaLink } from "@/components/site/cta-link"
import { JsonLd } from "@/components/site/json-ld"
import { OptimizedPicture } from "@/components/site/optimized-picture"
import { ctaPrimaryClassName } from "@/components/site/site-styles"
import {
  AUDITBLOC_URL,
  auditblocPageDescription,
  auditblocPageTitle,
  auditblocProject,
  auditblocSeoKeywords,
} from "@/lib/data/auditbloc-project"
import {
  buildPortfolioProjectBreadcrumbJsonLd,
  buildPortfolioProjectSoftwareApplicationJsonLd,
} from "@/lib/portfolio-project-json-ld"
import { buildPageMetadata } from "@/lib/site-metadata"
import { projectImageUrl, SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const highlights = [
  "Scans websites for WCAG accessibility issues automatically",
  "Checks GDPR cookie banners and AI content disclosure",
  "Uses Playwright to control browsers like a real user",
  "Free for anyone to use - no account required",
  "Shows results in a clear, easy-to-understand dashboard",
  "Includes detailed guides on accessibility and compliance",
] as const

const techStack = [
  "Next.js 16 with App Router",
  "React 19 and TypeScript",
  "Playwright for browser automation",
  "axe-core for accessibility testing",
  "Supabase for authentication and database",
  "Redis for email verification codes",
  "Nodemailer for sending emails",
  "Tailwind CSS for styling",
  "Docker for deployment",
] as const

export const metadata: Metadata = buildPageMetadata({
  title: auditblocPageTitle,
  description: auditblocPageDescription,
  canonicalPath: "/projects/auditbloc",
  keywords: auditblocSeoKeywords,
  openGraph: {
    title: "AuditBloc — Accessibility Scanner I Built",
    description: auditblocPageDescription,
  },
  ogImage: {
    url: projectImageUrl(auditblocProject.image),
    alt: auditblocProject.imageAlt,
    width: 1280,
    height: 642,
    type: "image/jpeg",
  },
  twitter: {
    title: "AuditBloc — Accessibility Scanner I Built",
    description: auditblocPageDescription,
  },
})

export default function AuditblocProjectPage() {
  const breadcrumbJsonLd = buildPortfolioProjectBreadcrumbJsonLd(SITE_URL, auditblocProject)

  return (
    <>
      <JsonLd data={buildPortfolioProjectSoftwareApplicationJsonLd(auditblocProject, SITE_URL)} />
      {breadcrumbJsonLd ? <JsonLd data={breadcrumbJsonLd} /> : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/projects/auditbloc`,
          name: auditblocPageTitle,
          description: auditblocPageDescription,
          url: `${SITE_URL}/projects/auditbloc`,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "Tayyab — Full Stack Developer",
          },
          about: { "@id": `${SITE_URL}/projects/auditbloc` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: projectImageUrl(auditblocProject.image),
            caption: auditblocProject.imageAlt,
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
          Full-stack product · Web accessibility &amp; compliance scanner
        </p>

        <h1 className="mt-3 text-[clamp(1.85rem,5vw,2.75rem)] font-bold tracking-tight text-white">
          AuditBloc — Web Accessibility Scanner
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.85]">
          I built AuditBloc as a free web accessibility and compliance scanner. It audits websites for WCAG accessibility issues, GDPR cookie banner problems, and AI content disclosure, then reports results in a clear dashboard. I used Next.js 16, Playwright for browser automation, axe-core for accessibility testing, and Supabase for the backend.
        </p>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
          <OptimizedPicture
            src={auditblocProject.image}
            alt={auditblocProject.imageAlt}
            title={auditblocProject.imageTitle}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <section className="mt-10" aria-labelledby="auditbloc-highlights-heading">
          <h2 id="auditbloc-highlights-heading" className="text-lg font-semibold text-white">
            What I built
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

        <section className="mt-10" aria-labelledby="auditbloc-stack-heading">
          <h2 id="auditbloc-stack-heading" className="text-lg font-semibold text-white">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="AuditBloc technologies">
            {auditblocProject.tags.map((tag) => (
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

        <section className="mt-10" aria-labelledby="auditbloc-tech-heading">
          <h2 id="auditbloc-tech-heading" className="text-lg font-semibold text-white">
            Technologies I used
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400 sm:text-base">
            {techStack.map((tech) => (
              <li key={tech} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-400/80"
                  aria-hidden="true"
                />
                {tech}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={AUDITBLOC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ctaPrimaryClassName, "text-[0.88rem] px-5 py-3")}
          >
            Live scanner
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-slate-500">
          AuditBloc is a full stack web application I built and maintain — from the Playwright
          scanning engine to the user interface and all the educational content.
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
