import { ArrowRight } from "lucide-react"

import { CtaLink, NavCtaLink } from "@/components/site/cta-link"
import { NavOrb } from "@/components/site/nav-orb"
import { TestimonialCard, type HomeTestimonial } from "@/components/site/testimonial-card"
import { TestimonialsCarousel } from "@/components/site/testimonials-carousel"

export type { HomeTestimonial } from "@/components/site/testimonial-card"

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
            Testimonials
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
            Feedback from clients on freelance and contract web projects.
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

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isHome && (
            <CtaLink
              href="/testimonials"
              variant="secondary"
              title="Read all client testimonials"
            >
              All testimonials
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
