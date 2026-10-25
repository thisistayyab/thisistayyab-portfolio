import { ArrowRight, CheckCircle2, Code2, ShieldCheck, Zap } from "lucide-react"

import { CtaLink, NavCtaLink } from "@/components/site/cta-link"
import { NavOrb } from "@/components/site/nav-orb"
import { TestimonialCard, type HomeTestimonial } from "@/components/site/testimonial-card"
import { TestimonialsCarousel } from "@/components/site/testimonials-carousel"

export type { HomeTestimonial } from "@/components/site/testimonial-card"

const deliveryGuarantees = [
  {
    icon: ShieldCheck,
    title: "Verified Reviews, From Shipped Work",
    detail:
      "Five-star reviews from projects built and shipped end to end, on Fiverr and Upwork contracts — real clients with real context, not a screenshot of a badge.",
  },
  {
    icon: Code2,
    title: "Live Production Proof, Not Just Mockups",
    detail:
      "Every flagship system in this portfolio — Tillqorin POS, AuditBloc, Taylance CRM, and Relay — runs in production with real APIs and databases.",
  },
  {
    icon: Zap,
    title: "Milestone Scope & Clean Handoff",
    detail:
      "Written technical scope before kickoff, weekly staging demos you can click through, clean Git commit history, and 100% repository & cloud ownership.",
  },
] as const

type TestimonialsSectionProps = {
  testimonials: HomeTestimonial[]
  /** Home preview: anchor id + link to full page */
  variant?: "home" | "page"
  /** Page route uses h1; home preview uses h2 under the hero h1. */
  headingLevel?: "h1" | "h2"
}

export function TestimonialsSection({
  testimonials,
  variant = "page",
  headingLevel,
}: TestimonialsSectionProps) {
  const isHome = variant === "home"
  const headingId = isHome ? "home-testimonials-heading" : "testimonials-page-heading"
  const HeadingTag = headingLevel ?? (isHome ? "h2" : "h1")

  return (
    <section
      id={isHome ? "testimonials" : undefined}
      className="relative mx-auto max-w-[1200px] scroll-mt-28 px-5 py-20 sm:px-6 lg:scroll-mt-32 lg:px-4"
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute top-1/4 -left-24 h-64 w-64 rounded-full bg-violet-600/12 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[110px]"
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-12">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-emerald-300/80 uppercase">
            Client Trust &amp; Reviews
          </p>
          <HeadingTag
            id={headingId}
            className="mx-auto max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
          >
            <span className="block">
              What clients say about{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-emerald-300 via-teal-300 to-sky-400 bg-clip-text text-transparent">
                working together
              </span>
            </span>
          </HeadingTag>
          <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
          <p className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
            Client feedback and delivery standards from freelance and contract web projects.
          </p>
        </div>

        {testimonials.length === 0 ? (
          <p className="mx-auto max-w-lg text-center text-sm text-slate-500">
            No reviews listed yet. Reach out if you&apos;d like references from recent projects.
          </p>
        ) : testimonials.length === 1 ? (
          <TestimonialCard item={testimonials[0]} />
        ) : (
          <TestimonialsCarousel testimonials={testimonials} />
        )}

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {deliveryGuarantees.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-[rgba(8,12,26,0.72)] p-5 sm:p-6"
              >
                <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-300">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isHome && (
            <CtaLink
              href="/experience"
              variant="secondary"
              title="View Tayyab's full contract and production engineering history"
            >
              <CheckCircle2 className="size-[1.05rem] text-emerald-300" aria-hidden="true" />
              View Contract &amp; Delivery History
              <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
            </CtaLink>
          )}
          <NavCtaLink href="/contact" title="Contact Tayyab to discuss your web project">
            <NavOrb />
            <span>Start a project</span>
          </NavCtaLink>
        </div>
      </div>
    </section>
  )
}
