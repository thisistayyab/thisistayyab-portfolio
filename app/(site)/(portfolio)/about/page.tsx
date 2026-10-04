import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Code2,
  Database,
  Download,
  Globe,
  Layers,
  LineChart,
  MapPin,
  Rocket,
  Shield,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { RiGithubFill, RiLinkedinFill, RiMailLine } from "react-icons/ri"
import { SiLeetcode } from "react-icons/si"

import { CtaLink } from "@/components/site/cta-link"
import { OptimizedPicture } from "@/components/site/optimized-picture"
import { GlassSurface, type GlassRim } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { FaqSection } from "@/components/site/faq-section"
import { buildFaqJsonLd } from "@/components/site/faq-json-ld"
import { SocialIcon } from "@/components/site/social-icon"
import {
  glassBadgeClassName,
  heroTagClassName,
  navGlassClassName,
  statCardClassName,
  statIconClassName,
} from "@/components/site/site-styles"
import { buildPersonJsonLd } from "@/lib/person-json-ld"
import { buildPageMetadata } from "@/lib/site-metadata"
import { PROFILE_IMAGE, profileEmail, profileSameAs, SITE_URL } from "@/lib/site"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { cn } from "@/lib/utils"

const TAYLANCE_TECH_URL = "https://taylancetech.com"

const aboutInlineLinkClassName =
  "font-medium text-violet-300 underline decoration-violet-400/40 underline-offset-2 transition-colors hover:text-violet-200 hover:decoration-violet-300/60"

const aboutSubtitle =
  "Co-Founder & Lead Developer at Taylance Tech and full stack developer specializing in React, Next.js, Node.js, and PostgreSQL — helping startups, SaaS companies, and growing businesses turn ideas into polished, maintainable software."

const aboutKeywords = [
  "Tayyab full stack developer",
  "React developer for hire",
  "Next.js developer",
  "Node.js developer",
  "PostgreSQL developer",
  "freelance web developer",
  "SaaS developer",
  "REST API development",
  "web application development",
  "TypeScript developer",
] as const

const aboutStatCards: {
  icon: LucideIcon
  value: string
  label: string
  tone: GlassRim
}[] = [
  { icon: Sparkles, value: "3+", label: "Years in Production", tone: "violet" },
  { icon: Rocket, value: "15+", label: "Projects Shipped", tone: "purple" },
  { icon: Code2, value: "1150+", label: "Problems Solved", tone: "blue" },
  { icon: LineChart, value: "5.0", label: "Fiverr Rating", tone: "pink" },
]

const aboutExpertisePillars: {
  icon: LucideIcon
  title: string
  description: string
  rim: GlassRim
}[] = [
  {
    icon: Layers,
    title: "Frontend Engineering",
    description:
      "Pixel-accurate React and Next.js interfaces with TypeScript, Tailwind CSS, and accessibility built in from the start — optimized for Core Web Vitals and conversion.",
    rim: "violet",
  },
  {
    icon: Zap,
    title: "Backend & APIs",
    description:
      "RESTful APIs with Node.js, Express, and FastAPI — structured for clarity, security, and scale — from authentication flows to third-party integrations.",
    rim: "blue",
  },
  {
    icon: Database,
    title: "Data & Performance",
    description:
      "PostgreSQL and MongoDB schema design, query tuning, and caching strategies that keep applications fast as data grows — informed by deep problem-solving practice.",
    rim: "purple",
  },
  {
    icon: Globe,
    title: "Deployment & Delivery",
    description:
      "End-to-end delivery from scoped milestones to production deployment, with clean Git workflows, testing discipline, and documentation your team can rely on.",
    rim: "pink",
  },
]

const aboutSkillGroups = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI", "SEO"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "REST APIs", "FastAPI", "Authentication", "Webhooks"],
  },
  {
    category: "Data & Tools",
    skills: ["PostgreSQL", "MongoDB", "Prisma", "Git", "Docker", "CI/CD"],
  },
] as const

const aboutPrinciples: {
  step: string
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    step: "01",
    icon: Users,
    title: "Clear communication",
    description:
      "Regular updates, honest timelines, and scope defined upfront — so you always know where the project stands and what comes next.",
  },
  {
    step: "02",
    icon: Shield,
    title: "Quality by default",
    description:
      "Typed code, tested critical paths, and patterns that make future changes safe — not shortcuts that create debt after launch.",
  },
  {
    step: "03",
    icon: Brain,
    title: "Problem-first thinking",
    description:
      "I focus on the business outcome first, then choose the right technical approach — whether that is a landing page, dashboard, or full platform.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Ship and iterate",
    description:
      "MVP to production with room to grow — architecture and code structured so new features land quickly without breaking what works.",
  },
]

const aboutSocialLinks = [
  {
    Icon: RiMailLine,
    iconSize: 20,
    href: `mailto:${profileEmail}?subject=Let's%20Connect&body=Hi%20Tayyab,%0D%0A%0D%0A`,
    ariaLabel: "Email Me",
    color: "#0078d4",
    platformName: "Email",
  },
  {
    Icon: RiGithubFill,
    iconSize: 20,
    href: "https://github.com/thisistayyab",
    ariaLabel: "GitHub Profile",
    color: "#ffffff",
    platformName: "GitHub",
  },
  {
    Icon: RiLinkedinFill,
    iconSize: 20,
    href: "https://www.linkedin.com/in/thisistayyab/",
    ariaLabel: "LinkedIn Profile",
    color: "#0077b5",
    platformName: "LinkedIn",
  },
  {
    Icon: SiLeetcode,
    iconSize: 20,
    href: "https://leetcode.com/u/thisistayyab/",
    ariaLabel: "LeetCode Profile",
    color: "#ffa116",
    platformName: "LeetCode",
  },
] as const

const aboutFaq = [
  {
    question: "What is Tayyab's role as co-founder at Taylance Tech?",
    answer:
      "As co-founder and lead software engineer at Taylance Tech, Tayyab leads full-stack application development, software architecture, technical SEO, and product delivery across agency client work and studio SaaS products including Tillqorin POS and AuditBloc.",
  },
  {
    question: "What technologies and tools does Tayyab work with on a daily basis?",
    answer:
      "Tayyab works daily with modern TypeScript, React 19, Next.js (App Router), Node.js, Express, PostgreSQL, Supabase, Tailwind CSS, Playwright, Docker, and C++ for computational problem-solving.",
  },
  {
    question: "Can Tayyab collaborate across different international time zones?",
    answer:
      "Yes. Tayyab collaborates with startups, product teams, and clients globally (US, UK, Europe, Asia), utilizing clear asynchronous updates, structured Git workflows, and scheduled check-ins for dependable delivery.",
  },
  {
    question: "What distinguishes Tayyab's engineering approach?",
    answer:
      "A relentless focus on performance, maintainability, and clean architecture. Having solved 1,150+ LeetCode algorithmic challenges, Tayyab builds optimized, bug-free systems paired with modern UX design, strict TypeScript typing, and automated testing.",
  },
] as const

export const metadata: Metadata = buildPageMetadata({
  title: "About Tayyab | Full Stack Developer — React & Next.js",
  description:
    "Meet Tayyab — co-founder of Taylance Tech and full stack developer (React, Next.js, Node.js). 3+ years, 15+ projects, 1,150+ LeetCode. Available for hire.",
  canonicalPath: "/about",
  keywords: aboutKeywords,
  openGraph: {
    type: "profile",
    title: "About Tayyab | Full Stack Web Developer",
    description: aboutSubtitle,
  },
})

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
          ],
        }}
      />
      <JsonLd data={buildPersonJsonLd(SITE_URL, aboutSubtitle)} />
      <JsonLd data={buildFaqJsonLd(aboutFaq)} />

      <article
        className="relative z-[5]"
        itemScope
        itemType="https://schema.org/ProfilePage"
      >
        <meta itemProp="name" content="About Tayyab" />
        <meta itemProp="url" content={`${SITE_URL}/about`} />

        <header className="relative isolate overflow-hidden pt-[88px]">
          <HeaderGraphBackground />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020106]/90" />

          <div className="relative z-[2] mx-auto max-w-[1200px] px-5 pb-16 sm:px-6 lg:px-4 lg:pb-20">
            <div className="mb-10 pt-6">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-400 transition-all duration-300 hover:pl-2 hover:text-white"
              >
                <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
                Back to home
              </Link>
            </div>

            <PageHeaderStagger
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16"
              itemScope
              itemType="https://schema.org/Person"
              itemProp="mainEntity"
            >
              <meta itemProp="name" content="Tayyab" />
              <meta
                itemProp="jobTitle"
                content="Co-Founder & Lead Developer at Taylance Tech"
              />
              <meta itemProp="url" content={`${SITE_URL}/about`} />
              <meta itemProp="description" content={aboutSubtitle} />
              {profileSameAs.map((url) => (
                <meta key={url} itemProp="sameAs" content={url} />
              ))}

              <PageHeaderItem>
              <div>
                <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-blue-300/80 uppercase">
                  About Tayyab
                </p>

                <h1 className="max-w-3xl text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.08] font-bold tracking-tight text-white">
                  I build{" "}
                  <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                    fast, scalable web applications
                  </span>{" "}
                  that teams can trust in production.
                </h1>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300/90">
                  {aboutSubtitle}
                </p>

                <p className="mt-4 max-w-2xl text-base leading-[1.85] text-slate-400">
                  I&apos;m Tayyab, a full stack web developer with 3+ years of hands-on experience
                  delivering production-ready applications for clients on Upwork and Fiverr. A studio
                  I&apos;ve envisioned since 2023 became real when I launched{" "}
                  <a
                    href={TAYLANCE_TECH_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={aboutInlineLinkClassName}
                  >
                    Taylance Tech
                  </a>{" "}
                  in 2026 — to help businesses ship React and Node.js products with
                  reliable engineering, clear communication, and code built for the long term. My
                  work spans responsive interfaces, robust APIs, PostgreSQL data layers, and
                  deployments engineered for real-world traffic.
                </p>

                <p className="mt-4 max-w-2xl text-base leading-[1.85] text-slate-400">
                  What sets my approach apart is a balance of product thinking and engineering
                  depth. Having solved 1,150+ LeetCode problems, I bring strong algorithmic
                  reasoning to debugging, database design, and performance optimization — so the
                  software I ship is not only functional, but built to last.
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  {aboutKeywords.slice(0, 6).map((tag) => (
                    <span key={tag} className={heroTagClassName}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="size-4 shrink-0 text-violet-400/80" aria-hidden="true" />
                  Available for remote freelance &amp; contract work worldwide
                </p>
              </div>
              </PageHeaderItem>

              <PageHeaderItem>
              <div className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:max-w-none">
                <div
                  className="pointer-events-none absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35)_0%,rgba(59,130,246,0.12)_45%,transparent_70%)] blur-2xl"
                  aria-hidden="true"
                />
                <GlassSurface
                  rim="violet"
                  className={cn(
                    navGlassClassName,
                    "rounded-2xl p-3 shadow-[0_24px_64px_rgba(0,0,0,0.45),0_0_48px_rgba(139,92,246,0.15)]",
                  )}
                >
                  <OptimizedPicture
                    src={PROFILE_IMAGE}
                    alt="Professional portrait of Tayyab, full stack developer"
                    title="Tayyab — Full Stack Developer"
                    width={340}
                    height={420}
                    priority
                    className="block w-full rounded-xl object-cover"
                    itemProp="image"
                  />
                  <div
                    className={cn(
                      glassBadgeClassName,
                      "absolute bottom-6 left-1/2 flex w-[calc(100%-2rem)] -translate-x-1/2 justify-center text-center text-xs font-medium text-slate-200",
                    )}
                  >
                    Co-Founder & Lead Developer, Taylance Tech
                  </div>
                </GlassSurface>
              </div>
              </PageHeaderItem>
            </PageHeaderStagger>
          </div>
        </header>

        <MotionSection
          className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-4"
          aria-label="Professional metrics"
        >
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {aboutStatCards.map(({ icon: Icon, value, label, tone }) => (
              <li key={label}>
                <GlassSurface rim={tone} className={statCardClassName}>
                  <span className={statIconClassName(tone)} aria-hidden="true">
                    <Icon className="size-5 sm:size-[1.35rem]" strokeWidth={2} />
                  </span>
                  <div className="min-w-0 text-left">
                    <p className="text-xl font-bold text-white sm:text-[1.35rem]">{value}</p>
                    <p className="text-xs text-slate-400 sm:text-sm">{label}</p>
                  </div>
                </GlassSurface>
              </li>
            ))}
          </ul>
        </MotionSection>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-4"
          aria-labelledby="expertise-heading"
        >
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-violet-300/80 uppercase">
              Core expertise
            </p>
            <h2
              id="expertise-heading"
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight text-white"
            >
              What I bring to every project
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              End-to-end full stack development — from user-facing interfaces to production
              infrastructure — with a focus on performance, maintainability, and business impact.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
            {aboutExpertisePillars.map(({ icon: Icon, title, description, rim }) => (
              <li key={title}>
                <GlassSurface
                  rim={rim}
                  className={cn(
                    navGlassClassName,
                    "h-full rounded-2xl p-6 transition-transform duration-300 ease-out hover:-translate-y-1 lg:p-7",
                  )}
                >
                  <span
                    className={cn(statIconClassName(rim), "mb-5 size-12 rounded-xl")}
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-[1.75] text-slate-400 sm:text-[0.95rem]">
                    {description}
                  </p>
                </GlassSurface>
              </li>
            ))}
          </ul>
        </MotionSection>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:px-4"
          aria-labelledby="background-heading"
        >
          <GlassSurface
            rim="blue"
            className={cn(navGlassClassName, "rounded-2xl p-8 sm:p-10 lg:p-12")}
          >
            <h2
              id="background-heading"
              className="mb-6 text-2xl font-bold text-white sm:text-3xl"
            >
              Professional background
            </h2>
            <div className="space-y-5">
              <p className="text-base leading-[1.85] text-slate-400 sm:text-[1.05rem]">
                Over the past three years, I&apos;ve partnered with founders, product teams, and
                agencies to deliver web applications across industries — from SaaS dashboards and
                e-commerce flows to internal tools and client-facing portals. Every engagement has
                reinforced one principle: great software is measured by how reliably it serves
                users after launch.
              </p>
              <p className="text-base leading-[1.85] text-slate-400 sm:text-[1.05rem]">
                My freelance work on Upwork and Fiverr has earned consistent five-star feedback,
                with clients citing responsiveness, technical clarity, and on-time delivery.
                Building on that experience, I fulfilled a goal I&apos;ve held since 2023 by
                co-founding{" "}
                <a
                  href={TAYLANCE_TECH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={aboutInlineLinkClassName}
                >
                  Taylance Tech
                </a>{" "}
                in 2026 — a co-founder-led software agency for web, mobile, SaaS, AI automation, and
                UI/UX, where code quality, thoughtful architecture, and long-term maintainability
                come first.
              </p>
              <p className="text-base leading-[1.85] text-slate-400 sm:text-[1.05rem]">
                Whether you need a senior developer for a greenfield build, help rescuing a legacy
                codebase, or a reliable partner for ongoing feature work — I bring the same
                standard: professional communication, clean engineering, and software you&apos;re
                proud to put in front of customers.
              </p>
            </div>
          </GlassSurface>
        </MotionSection>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:px-4"
          aria-labelledby="skills-heading"
        >
          <div className="mb-10 max-w-xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
              Technical stack
            </p>
            <h2 id="skills-heading" className="text-2xl font-bold text-white sm:text-3xl">
              Tools I ship with confidently
            </h2>
            <p className="mt-3 text-slate-400">
              A focused stack chosen for speed, reliability, and long-term maintainability — not
              trend-chasing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {aboutSkillGroups.map(({ category, skills }) => (
              <GlassSurface
                key={category}
                rim="default"
                className={cn(navGlassClassName, "rounded-2xl p-6")}
              >
                <h3 className="mb-4 text-sm font-semibold tracking-wide text-violet-300 uppercase">
                  {category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <li key={skill}>
                      <span className={heroTagClassName}>{skill}</span>
                    </li>
                  ))}
                </ul>
              </GlassSurface>
            ))}
          </div>
        </MotionSection>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:px-4"
          aria-labelledby="principles-heading"
        >
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-violet-300/80 uppercase">
              Working style
            </p>
            <h2
              id="principles-heading"
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white"
            >
              How I work with clients
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {aboutPrinciples.map(({ step, icon: Icon, title, description }) => (
              <li key={step}>
                <GlassSurface
                  rim="purple"
                  className={cn(navGlassClassName, "flex h-full flex-col rounded-2xl p-6")}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-3xl font-bold text-violet-400/40">{step}</span>
                    <span className={statIconClassName("purple")} aria-hidden="true">
                      <Icon className="size-5" strokeWidth={2} />
                    </span>
                  </div>
                  <h3 className="mb-2 font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{description}</p>
                </GlassSurface>
              </li>
            ))}
          </ol>
        </MotionSection>

        <MotionSection className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:px-4">
          <blockquote
            className={cn(
              "relative overflow-hidden rounded-2xl border-0 p-8 sm:p-10",
              "bg-gradient-to-br from-violet-950/40 via-indigo-950/30 to-slate-950/50",
              "shadow-[0_20px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(139,92,246,0.2)]",
            )}
          >
            <div
              className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-violet-500/10 blur-3xl"
              aria-hidden="true"
            />
            <p className="relative text-lg leading-[1.75] font-medium text-slate-200 sm:text-xl">
              &ldquo;Strong fundamentals show up where it matters — faster root-cause analysis,
              smarter data modeling, and features that scale without rewrites. That is the edge
              1,150+ hours of deliberate practice brings to every project.&rdquo;
            </p>
            <footer className="relative mt-5 text-sm text-violet-300/80">
              — Tayyab on engineering discipline
            </footer>
          </blockquote>
        </MotionSection>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-20 sm:px-6 lg:px-4"
          aria-labelledby="about-faq-heading"
        >
          <div className="mx-auto max-w-4xl">
            <FaqSection
              headingId="about-faq-heading"
              title="About Tayyab — FAQ"
              description="Quick answers about Tayyab's role, stack, and how he works with clients."
              items={aboutFaq}
              ctas={[
                {
                  label: "View projects",
                  href: "/projects",
                  title: "Browse Tayyab's full stack project portfolio",
                },
                {
                  label: "Get in touch",
                  href: "/contact",
                  variant: "secondary",
                  title: "Contact Tayyab for freelance or contract web development",
                },
              ]}
            />
          </div>
        </MotionSection>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6 lg:px-4"
          aria-labelledby="about-cta-heading"
        >
          <GlassSurface
            rim="nav"
            className={cn(
              navGlassClassName,
              "rounded-2xl px-6 py-10 text-center sm:px-10 sm:py-12",
            )}
          >
            <h2 id="about-cta-heading" className="text-2xl font-bold text-white sm:text-3xl">
              Ready to build something great?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-400">
              Download my CV, explore shipped projects, or reach out to discuss your next React,
              Next.js, or Node.js initiative.
            </p>

            <nav
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
              aria-label="About page actions"
            >
              <CtaLink
                href="/Tayyab-CV.pdf"
                download
                title="Download Tayyab's Full Stack Developer CV"
              >
                Download CV
                <Download className="size-[1.05rem]" aria-hidden="true" />
              </CtaLink>
              <CtaLink
                href="/projects"
                variant="secondary"
                title="View Tayyab's web development portfolio"
              >
                View projects
                <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
              </CtaLink>
              <CtaLink
                href="/contact"
                variant="secondary"
                title="Contact Tayyab for web development work"
              >
                Get in touch
              </CtaLink>
            </nav>

            <div
              className="mt-8 flex items-center justify-center gap-3"
              role="list"
              aria-label="Social profiles"
            >
              {aboutSocialLinks.map((link) => (
                <div key={link.href} role="listitem">
                  <SocialIcon
                    Icon={link.Icon}
                    size={44}
                    iconSize={link.iconSize}
                    href={link.href}
                    ariaLabel={link.ariaLabel}
                    color={link.color}
                    platformName={link.platformName}
                  />
                </div>
              ))}
            </div>
          </GlassSurface>
        </MotionSection>
      </article>
    </>
  )
}
