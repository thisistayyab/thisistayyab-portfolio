import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { ContactSection } from "@/components/site/contact-section"
import {
  buildContactBreadcrumbJsonLd,
  buildContactFaqJsonLd,
  buildContactPageJsonLd,
} from "@/components/site/contact-json-ld"
import { FaqSection } from "@/components/site/faq-section"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { buildPageMetadata } from "@/lib/site-metadata"
import { SITE_URL } from "@/lib/site"

const pageLead =
  "Reach out to discuss full stack software, SaaS products, APIs, or AI automation. Share your goals, timeline, and any technical context so we can plan the right next step."

const pageMetaDescription =
  "Contact Tayyab — full stack developer for SaaS, web applications, Node.js APIs, PostgreSQL, AI automation, and production deployments. Based in Pakistan, working with clients worldwide."

const contactKeywords = [
  "contact full stack developer",
  "hire React developer",
  "hire Next.js developer",
  "freelance software developer contact",
  "SaaS development inquiry",
  "AI automation developer contact",
] as const

const contactFaq = [
  {
    question: "What should I include in my message?",
    answer:
      "A short overview of the product, current stage (idea, MVP, or live app), preferred stack if you have one, timeline, and budget range. Links to designs or repos are helpful.",
  },
  {
    question: "Do you offer free discovery calls?",
    answer:
      "Yes. After you submit the form, we can schedule a brief call to confirm fit, scope, and how you prefer to work — fixed milestones or hourly.",
  },
  {
    question: "What is your typical availability?",
    answer:
      "I work with clients across time zones. You can expect an initial reply within 24–48 hours on business days.",
  },
] as const

export const metadata: Metadata = buildPageMetadata({
  title: "Contact | Hire Tayyab — Full Stack Developer",
  description: pageMetaDescription,
  canonicalPath: "/contact",
  keywords: contactKeywords,
  openGraph: {
    title: "Contact Tayyab | Full Stack Developer",
    description: pageMetaDescription,
  },
  twitter: { card: "summary" },
})

export default function ContactPage() {
  return (
    <>
      <JsonLd data={buildContactBreadcrumbJsonLd(SITE_URL)} />
      <JsonLd data={buildContactPageJsonLd(SITE_URL, pageMetaDescription)} />
      <JsonLd data={buildContactFaqJsonLd(contactFaq)} />

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

            <PageHeaderStagger className="mx-auto max-w-3xl text-center">
              <PageHeaderItem>
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
                  Contact
                </p>
              </PageHeaderItem>
              <PageHeaderItem>
                <h1
                  id="contact-page-heading"
                  className="mx-auto max-w-4xl text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.12] font-bold tracking-tight text-white"
                >
                  <span className="block">Let&apos;s discuss</span>
                  <span className="block bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                    your project
                  </span>
                </h1>
              </PageHeaderItem>
              <PageHeaderItem>
                <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
                <p className="text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.75]">
                  {pageLead}
                </p>
              </PageHeaderItem>
            </PageHeaderStagger>
          </div>
        </header>

        <MotionSection>
          <ContactSection />
        </MotionSection>

        <MotionSection className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6 lg:px-4">
          <FaqSection
            headingId="contact-faq-heading"
            title="Contact FAQ"
            description="Quick answers before you send a message."
            items={contactFaq}
            ctas={[
              {
                href: "/services",
                label: "View services",
                title: "Browse full stack development services",
              },
              {
                href: "/projects",
                label: "See projects",
                title: "View Tayyab's project portfolio",
                variant: "secondary",
              },
            ]}
          />
        </MotionSection>
      </article>
    </>
  )
}
