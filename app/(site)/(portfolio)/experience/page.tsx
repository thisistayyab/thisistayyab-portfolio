import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import {
  buildExperienceItemListJsonLd,
  buildExperienceWebPageJsonLd,
  ExperienceRoadmap,
  type CareerMilestone,
} from "@/components/site/experience-roadmap"
import { FaqSection } from "@/components/site/faq-section"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { GlassSurface } from "@/components/site/glass-surface"
import { navGlassClassName } from "@/components/site/site-styles"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { buildPageMetadata } from "@/lib/site-metadata"
import { SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const TAYLANCE_TECH_URL = "https://taylancetech.com"

/** Full career roadmap — exported for home preview (single source of truth). */
export const careerRoadmapMilestones: CareerMilestone[] = [
  {
    id: "taylance-tech",
    slug: "taylance-tech",
    kind: "founder",
    phase: "Studio launch",
    roadmapYear: "2026",
    roleTitle: "Founder & Full Stack Developer",
    organization: "Taylance Tech",
    organizationUrl: TAYLANCE_TECH_URL,
    periodLabel: "Founded 2026 · Vision since 2023",
    startDate: "2026-01-01",
    isCurrent: true,
    platformLabel: "Founder-led software studio",
    summary:
      "My software studio for web, SaaS, and AI products — launched in 2026, planned since 2023.",
    description:
      "I run Taylance Tech as a founder-led studio. I build full-stack products for startups: React and Next.js front ends, Node.js APIs, and deployments built to last.",
    responsibilities: [
      "Product planning, architecture, and delivery.",
      "React, Next.js, and Node.js development.",
      "SEO, performance, and production launches.",
    ],
    outcomes: [
      "Launched taylancetech.com and Taylance CRM.",
      "Delivered client and studio products end to end.",
    ],
    skills: ["Next.js", "React", "Node.js", "SaaS", "AI integration", "SEO", "Founder-led"],
    rim: "violet",
    accentBorderClass: "border-l-violet-500",
    icon: "rocket",
  },
  {
    id: "upwork",
    slug: "upwork",
    kind: "freelance",
    phase: "Freelance growth",
    roadmapYear: "2025",
    roleTitle: "Full Stack Developer",
    organization: "Upwork",
    organizationUrl: "https://www.upwork.com/",
    periodLabel: "Dec 2025 — Present",
    startDate: "2025-12-09",
    isCurrent: true,
    platformLabel: "Hourly contracts · International clients",
    summary:
      "Hourly full-stack developer for international clients on Upwork.",
    description:
      "I build production web apps on Upwork: React front ends, Node.js APIs, databases, and performance fixes. Client contracts are listed separately on this roadmap.",
    responsibilities: [
      "Scope work and ship on schedule.",
      "Build React UIs and Node.js APIs.",
      "Improve speed, stability, and deployments.",
    ],
    outcomes: [
      "Shipped multiple live products for clients.",
      "Strong feedback for clear communication and delivery.",
    ],
    skills: ["React", "Node.js", "MERN", "REST APIs", "PostgreSQL", "Performance"],
    rim: "blue",
    accentBorderClass: "border-l-emerald-500",
    icon: "briefcase",
  },
  {
    id: "upwork-order-ai-llc",
    slug: "order-ai-llc-upwork",
    kind: "client",
    phase: "Upwork · Client contract",
    roadmapYear: "2025",
    roleTitle: "Full Stack Developer",
    organization: "Order AI LLC",
    viaPlatform: "Upwork",
    periodLabel: "2025 — Present · Via Upwork",
    startDate: "2025-06-01",
    isCurrent: true,
    platformLabel: "Confidential client · Hospitality ordering tech",
    summary:
      "Ongoing Upwork contract. I am the developer; the product belongs to the client.",
    description:
      "Full-stack work for Order AI LLC through Upwork. The product is confidential, so it is not listed in my public projects — only this experience entry.",
    responsibilities: [
      "React and TypeScript front-end development.",
      "APIs, data layers, and backend integrations.",
      "Delivery under NDA and client IP terms.",
    ],
    outcomes: [
      "Active production features in progress.",
      "Work credited here without public links or screenshots.",
    ],
    skills: ["React", "TypeScript", "Supabase", "REST APIs", "Upwork contract", "Confidential"],
    rim: "blue",
    accentBorderClass: "border-l-amber-500",
    icon: "briefcase",
  },
  {
    id: "fiverr",
    slug: "fiverr",
    kind: "freelance",
    phase: "Freelance foundation",
    roadmapYear: "2024",
    roleTitle: "Full Stack Developer",
    organization: "Fiverr",
    organizationUrl: "https://www.fiverr.com/",
    periodLabel: "Oct 2024 — Present",
    startDate: "2024-10-01",
    isCurrent: true,
    platformLabel: "Project-based delivery",
    summary:
      "Full-stack web apps for clients worldwide on Fiverr.",
    description:
      "I deliver complete MERN projects on Fiverr: UI, APIs, databases, hosting, and fixes after launch.",
    responsibilities: [
      "Build features from briefs or wireframes.",
      "Add auth, payments, and integrations when needed.",
      "Deploy and support after launch.",
    ],
    outcomes: [
      "15+ shipped projects in this portfolio.",
      "Consistent five-star client reviews.",
    ],
    skills: ["HTML5", "CSS3", "React", "Express.js", "MongoDB", "REST APIs"],
    rim: "purple",
    accentBorderClass: "border-l-[#1dbf73]",
    icon: "briefcase",
  },
  {
    id: "vision-2023",
    slug: "vision-2023",
    kind: "vision",
    phase: "Origin",
    roadmapYear: "2023",
    roleTitle: "Full stack foundation",
    organization: "Path to Taylance Tech",
    periodLabel: "Vision since 2023",
    startDate: "2023-01-01",
    isCurrent: false,
    platformLabel: "Before the studio",
    summary:
      "Started building toward my own software studio in 2023.",
    description:
      "I focused on React, Node.js, and freelance delivery — and on the goal of launching Taylance Tech.",
    outcomes: [
      "Studio vision set in 2023, launched in 2026.",
      "Three years of client work before founding Taylance Tech.",
    ],
    skills: ["React", "Node.js", "Problem solving", "Freelance discipline", "Product thinking"],
    rim: "violet",
    accentBorderClass: "border-l-violet-400/40",
    icon: "compass",
  },
]

const experiencePageIntro =
  "Tayyab's career as a full stack developer — founder of Taylance Tech (2026), freelance on Upwork and Fiverr, and selected client work."

const experienceKeywords = [
  "Tayyab full stack developer experience",
  "React developer career history",
  "Node.js freelance developer roadmap",
  "Taylance Tech founder",
  "Upwork full stack developer",
  "Fiverr web developer experience",
  "software engineer career timeline",
  "MERN stack developer work history",
  "remote full stack developer",
  "Upwork contract developer",
  "confidential client development",
] as const

const experienceFaq = [
  {
    question: "What do you do today?",
    answer:
      "I am Founder and Full Stack Developer at Taylance Tech. I also take freelance work on Upwork and Fiverr.",
  },
  {
    question: "When did you start Taylance Tech?",
    answer:
      "The studio launched in 2026. I had planned it since 2023 while building skills through freelance work.",
  },
  {
    question: "Why is Order AI LLC not in Projects?",
    answer:
      "It is confidential Upwork client work. I list my role here only — not the product, links, or screenshots.",
  },
  {
    question: "What is your main tech stack?",
    answer: "React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, and Supabase.",
  },
  {
    question: "Do you work with clients remotely?",
    answer: "Yes. I work with clients worldwide through Upwork, Fiverr, and Taylance Tech.",
  },
] as const

export const metadata: Metadata = buildPageMetadata({
  title: "Experience | Full Stack Developer Career Roadmap — Tayyab",
  description: experiencePageIntro,
  canonicalPath: "/experience",
  keywords: experienceKeywords,
  openGraph: {
    title: "Full Stack Developer Experience & Career Roadmap | Tayyab",
    description: experiencePageIntro,
  },
  twitter: {
    title: "Career Roadmap | Tayyab — React & Node.js Full Stack Developer",
    description: experiencePageIntro,
  },
})

export default function ExperiencePage() {
  const pageTitle = "Tayyab Full Stack Developer Experience & Career Roadmap"

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Experience", item: `${SITE_URL}/experience` },
          ],
        }}
      />
      <JsonLd data={buildExperienceItemListJsonLd(careerRoadmapMilestones, SITE_URL, "/experience")} />
      <JsonLd data={buildExperienceWebPageJsonLd(SITE_URL, pageTitle, experiencePageIntro)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: experienceFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />

      <article itemScope itemType="https://schema.org/WebPage">
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
                <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-violet-300/80 uppercase">
                  Career roadmap
                </p>
              </PageHeaderItem>
              <PageHeaderItem>
                <h1
                  className="text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.1] font-bold tracking-tight text-white"
                  itemProp="name"
                >
                  Full stack developer{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
                    experience timeline
                  </span>
                </h1>
              </PageHeaderItem>
              <PageHeaderItem>
                <p
                  className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.85]"
                  itemProp="description"
                >
                  {experiencePageIntro}
                </p>
              </PageHeaderItem>
            </PageHeaderStagger>
          </div>
        </header>

        <MotionSection
          className="relative mx-auto max-w-[1200px] px-5 pb-12 sm:px-6 lg:px-4"
          aria-labelledby="roadmap-heading"
        >
          <GlassSurface
            rim="blue"
            className={cn(navGlassClassName, "mb-12 rounded-2xl p-6 sm:p-8")}
          >
            <h2 id="roadmap-heading" className="sr-only">
              Professional experience roadmap
            </h2>
            <p className="text-sm leading-relaxed text-slate-400 sm:text-base sm:leading-[1.8]">
              Newest roles first — Taylance Tech, then Upwork, client contracts, Fiverr, and where it
              started in 2023.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Career summary stats">
              {[
                { value: "3+", label: "Years shipping" },
                { value: "2026", label: "Studio founded" },
                { value: "2023", label: "Vision started" },
                { value: "Remote", label: "Global delivery" },
              ].map(({ value, label }) => (
                <li
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 text-center"
                >
                  <p className="text-lg font-bold text-white">{value}</p>
                  <p className="mt-0.5 text-[0.65rem] text-slate-500 uppercase tracking-wide">{label}</p>
                </li>
              ))}
            </ul>
          </GlassSurface>

          <div id="roadmap" className="scroll-mt-28">
            <ExperienceRoadmap milestones={careerRoadmapMilestones} />
          </div>
        </MotionSection>

        <MotionSection className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6 lg:px-4">
        <FaqSection
          headingId="experience-faq-heading"
          description="Quick answers about my roles, studio, and client work."
          items={experienceFaq}
          footerLead="See public project examples"
          ctas={[
            {
              label: "View all projects",
              href: "/projects",
              title: "Browse Tayyab's full stack web development project portfolio",
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
