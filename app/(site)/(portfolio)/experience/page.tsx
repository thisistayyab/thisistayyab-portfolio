import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import {
  buildExperienceItemListJsonLd,
  buildExperienceWebPageJsonLd,
  ExperienceRoadmap,
  type CareerMilestone,
} from "@/components/site/experience-roadmap"
import { buildFaqJsonLd } from "@/components/site/faq-json-ld"
import { FaqSection } from "@/components/site/faq-section"
import { GlassSurface } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { navGlassClassName } from "@/components/site/site-styles"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { buildPageMetadata } from "@/lib/site-metadata"
import { SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

/** Full career roadmap — exported for home preview (single source of truth). */
export const careerRoadmapMilestones: CareerMilestone[] = [
  {
    id: "freelance-fullstack",
    slug: "freelance-fullstack",
    kind: "freelance",
    phase: "Freelance & product work",
    roadmapYear: "2026",
    roleTitle: "Full Stack Developer",
    organization: "Freelance & Contract — Remote",
    periodLabel: "Jan 2026 — Present",
    startDate: "2026-01-01",
    isCurrent: true,
    platformLabel: "Global clients · Remote delivery",
    summary:
      "Freelance and contract full stack delivery for web, mobile, SaaS, and AI products — alongside shipping production apps like Tillqorin POS, AuditBloc, and Taylance CRM.",
    description:
      "I work as a full stack developer on freelance and contract engagements, and I ship my own production web products — React and Next.js front ends, Node.js APIs, and deployments built to last.",
    responsibilities: [
      "Product planning, architecture, and delivery.",
      "React, Next.js, and Node.js development.",
      "SEO, performance, and production launches.",
    ],
    outcomes: [
      "Launched Tillqorin POS, AuditBloc, and Taylance CRM.",
      "Delivered client and personal products end to end.",
    ],
    skills: ["Next.js", "React", "Node.js", "SaaS", "AI integration", "SEO", "Product delivery"],
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
    roleTitle: "Freelance Full Stack Developer",
    organization: "Independent — client & agency contracts",
    periodLabel: "Oct 2024 — Present",
    startDate: "2024-10-01",
    isCurrent: true,
    platformLabel: "Project-based delivery",
    summary:
      "First paid client work — building and shipping complete web apps end to end.",
    description:
      "I took briefs from agencies and direct clients, built the React front end and Node.js API, deployed, and supported after launch.",
    responsibilities: [
      "Build features from briefs or wireframes.",
      "Add auth, payments, and integrations when needed.",
      "Deploy and support after launch.",
    ],
    outcomes: [
      "First paid full stack delivery, shipped end to end.",
      "Client work since then has come through agency contracts and referrals.",
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
    organization: "From first commit to client delivery",
    periodLabel: "Since 2023",
    startDate: "2023-01-01",
    isCurrent: false,
    platformLabel: "Learning & first clients",
    summary:
      "Built the React and Node.js foundation that powers every project I ship today.",
    description:
      "I focused on React, Node.js, and freelance delivery — and on the goal of shipping my own full stack products.",
    outcomes: [
      "First freelance clients in 2023.",
      "Three years of client work before moving into full-time freelance and product delivery.",
    ],
    skills: ["React", "Node.js", "Problem solving", "Freelance discipline", "Product thinking"],
    rim: "violet",
    accentBorderClass: "border-l-violet-400/40",
    icon: "compass",
  },
]

const experiencePageIntro =
  "Tayyab's career as a full stack developer — freelance and contract delivery for global clients, production web products including Tillqorin POS, AuditBloc, and Taylance CRM, and selected client projects."

const experienceMetaDescription =
  "Tayyab's full stack developer career timeline: freelance & Upwork contracts, Order AI LLC, and shipping Tillqorin POS, AuditBloc, and Taylance CRM."

const experienceKeywords = [
  "Tayyab full stack developer experience",
  "React developer career history",
  "Node.js freelance developer roadmap",
  "freelance full stack developer",
  "Upwork full stack developer",
  "agency contract developer experience",
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
      "I work as a full stack developer — shipping production web products like Tillqorin POS, AuditBloc, and Taylance CRM while taking freelance contract work through agency partnerships and direct clients.",
  },
  {
    question: "When did you start working as a full stack developer?",
    answer:
      "I started building full stack applications in 2023 and delivered client work through agency contracts before expanding into full-time freelance and product development in 2026.",
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
    answer:
      "Yes. I work with clients worldwide through agency contracts and direct engagements.",
  },
] as const

export const metadata: Metadata = buildPageMetadata({
  title: "Experience | Full Stack Developer Career Roadmap — Tayyab",
  description: experienceMetaDescription,
  canonicalPath: "/experience",
  keywords: experienceKeywords,
  openGraph: {
    title: "Full Stack Developer Experience & Career Roadmap | Tayyab",
    description: experienceMetaDescription,
  },
  twitter: {
    title: "Career Roadmap | Tayyab — React & Node.js Full Stack Developer",
    description: experienceMetaDescription,
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
      <JsonLd data={buildFaqJsonLd(experienceFaq)} />

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
              Newest roles first — current freelance and product work, then Upwork, client
              contracts, and where it started in 2023.
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Career summary stats">
              {[
                { value: "3+", label: "Years shipping" },
                { value: "15+", label: "Projects shipped" },
                { value: "2023", label: "First client work" },
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
            description="Quick answers about my roles, work, and client projects."
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
