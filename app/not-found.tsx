import { ArrowLeft, ArrowRight, Compass } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { CtaLink } from "@/components/site/cta-link"
import { GlassSurface } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteNav } from "@/components/site/site-nav"
import { navGlassClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "404 — Page Not Found | Tayyab",
  description:
    "The page you requested could not be found. Explore Tayyab's full stack web development projects, engineering articles, and services.",
  robots: {
    index: false,
    follow: true,
  },
}

const quickDestinations = [
  {
    title: "Production Projects",
    description: "Case studies for Tillqorin POS, AuditBloc, Taylance CRM, and Relay.",
    href: "/projects",
  },
  {
    title: "Services & Scoping",
    description: "Full stack SaaS, Next.js APIs, AI automation, and WCAG remediation.",
    href: "/services",
  },
  {
    title: "Engineering Blog",
    description: "Deep-dive guides on Next.js Core Web Vitals, WebRTC, and ADA Title II.",
    href: "/blog",
  },
  {
    title: "Start a Project",
    description: "Reach out directly for freelance, contract, or consulting work.",
    href: "/contact",
  },
] as const

export default function NotFound() {
  return (
    <div className="relative z-[1] flex min-h-dvh flex-col">
      <SiteNav />
      <main className="relative flex min-w-0 flex-1 flex-col justify-center overflow-x-clip pt-28 pb-20">
        <HeaderGraphBackground />
        <div className="relative z-[2] mx-auto w-full max-w-3xl px-5 text-center sm:px-6">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.18em] text-violet-200 uppercase">
            <Compass className="size-3.5 text-cyan-300" aria-hidden="true" />
            Error 404
          </div>

          <h1 className="text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.1] font-bold tracking-tight text-white">
            Page not found
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            The link you followed may have moved or no longer exists. Here are the main sections of
            my portfolio:
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <CtaLink href="/" title="Return to Tayyab's portfolio home page">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Home
            </CtaLink>
            <CtaLink href="/contact" variant="secondary" title="Contact Tayyab for a project">
              Start a Project
              <ArrowRight className="size-4" aria-hidden="true" />
            </CtaLink>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {quickDestinations.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="group block h-full no-underline">
                  <GlassSurface
                    rim="blue"
                    className={cn(
                      navGlassClassName,
                      "flex h-full flex-col justify-between rounded-2xl p-5 transition-transform duration-300 group-hover:-translate-y-0.5",
                    )}
                  >
                    <div>
                      <h2 className="flex items-center justify-between text-base font-semibold text-white group-hover:text-cyan-300">
                        {item.title}
                        <ArrowRight
                          className="size-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-cyan-300"
                          aria-hidden="true"
                        />
                      </h2>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </GlassSurface>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
