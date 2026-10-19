import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import type { HomeTestimonial } from "@/components/site/testimonial-card"
import {
  buildTestimonialsBreadcrumbJsonLd,
  buildTestimonialsItemListJsonLd,
  buildTestimonialsWebPageJsonLd,
} from "@/components/site/testimonials-json-ld"
import { TestimonialsSection } from "@/components/site/testimonials-section"
import { MotionSection } from "@/components/motion/page-motion"
import { buildPageMetadata } from "@/lib/site-metadata"
import { SITE_URL } from "@/lib/site"

export const dynamic = "force-static"

const pageIntro =
  "Client feedback from freelance and contract web development work — communication, delivery, and production-ready builds."

export const testimonials: HomeTestimonial[] = [
  {
    name: "Christopher",
    role: "Business Owner",
    image: "/images/testimonials/client-1.webp",
    via: "Fiverr",
    viaUrl: "https://www.fiverr.com",
    rating: 5,
    quote: "Attentive and thorough; mission successfully completed.",
  },
]

export const metadata: Metadata = buildPageMetadata({
  title: "Testimonials | Client Reviews — Tayyab",
  description:
    "Read what clients say about working with Tayyab on React, Next.js, and full stack web development projects.",
  canonicalPath: "/testimonials",
  keywords: [
    "Tayyab client reviews",
    "full stack developer testimonials",
    "freelance developer feedback",
    "React developer reviews",
    "web development client testimonials",
    "Fiverr developer reviews",
    "Upwork developer feedback",
  ],
  openGraph: {
    title: "Client Testimonials | Tayyab — Full Stack Developer",
    description: pageIntro,
  },
})

export default function TestimonialsPage() {
  return (
    <>
      <JsonLd data={buildTestimonialsBreadcrumbJsonLd(SITE_URL)} />
      <JsonLd
        data={buildTestimonialsItemListJsonLd(testimonials, SITE_URL, "/testimonials", pageIntro)}
      />
      <JsonLd data={buildTestimonialsWebPageJsonLd(SITE_URL, pageIntro)} />

      <article className="relative z-[5]">
      <header className="relative isolate overflow-hidden pt-[88px]">
        <HeaderGraphBackground />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020106]/90" />

        <div className="relative z-[2] mx-auto max-w-[1200px] px-5 pb-4 sm:px-6 lg:px-4">
          <div className="mb-6 pt-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-slate-400 transition-all duration-300 hover:pl-2 hover:text-white"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Back to home
            </Link>
          </div>
        </div>
      </header>

      <MotionSection>
        <TestimonialsSection testimonials={testimonials} variant="page" headingLevel="h1" />
      </MotionSection>
      </article>
    </>
  )
}
