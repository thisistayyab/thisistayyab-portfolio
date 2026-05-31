import {
  ArrowRight,
  Code2,
  Download,
  Rocket,
  Smile,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"

import { CtaLink } from "@/components/site/cta-link"
import { GlassSurface, navGlassClassName, type GlassRim } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import {
  homeMetadata,
  profileEmail,
  profileSameAs,
  SITE_URL,
} from "@/lib/site"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: homeMetadata.title,
  description: homeMetadata.description,
  keywords: [...homeMetadata.keywords],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: homeMetadata.title,
    description: homeMetadata.description,
    url: SITE_URL,
    type: "website",
  },
}

const heroTags = [
  "React Developer",
  "Next.js",
  "Node.js",
  "Full Stack for Hire",
  "REST API",
  "PostgreSQL",
  "Freelance Dev",
  "LeetCode 1150+",
] as const

const heroStats: {
  icon: LucideIcon
  value: string
  label: string
  tone: GlassRim
}[] = [
  { icon: Sparkles, value: "3+", label: "Years Experience", tone: "violet" },
  { icon: Rocket, value: "15+", label: "Projects Completed", tone: "purple" },
  { icon: Code2, value: "1150+", label: "Problems Solved", tone: "blue" },
  { icon: Smile, value: "100%", label: "Client Satisfaction", tone: "pink" },
]

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          name: "Tayyab",
          jobTitle: "Full Stack Developer | React & Node.js Expert",
          description:
            "Full stack developer specializing in React, Next.js, Node.js, and PostgreSQL. 3+ years experience building fast, scalable web applications. 1,150+ LeetCode problems solved. 15+ projects completed.",
          url: SITE_URL,
          image: `${SITE_URL}/images/about.avif`,
          knowsAbout: [
            "React",
            "Next.js",
            "Node.js",
            "PostgreSQL",
            "REST API",
            "TypeScript",
            "Full Stack Development",
            "Web Application Development",
          ],
          sameAs: [...profileSameAs],
          email: profileEmail,
        }}
      />

      <header
        className="relative isolate overflow-hidden bg-transparent pt-[88px]"
        itemScope
        itemType="https://schema.org/Person"
      >
        <HeaderGraphBackground />

        <div
          className="hero-section relative z-[1] mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-4"
          id="home"
        >
          <div className="hero-main">
            <div className="hero-content relative z-[2]">
              <p className="hero-eyebrow sr-only">Crafting Digital Excellence</p>

              <div className="hero-greeting-badge mb-7 inline-flex items-center gap-2.5">
                <span className="hero-wave" aria-hidden="true">
                  👋
                </span>
                <span className="text-[0.95rem] font-medium text-slate-100">
                  Hi, I&apos;m Tayyab
                </span>
              </div>

              <h1 className="hero-title mb-6" itemProp="jobTitle">
                <span className="hero-title-line text-white">Full Stack</span>
                <span className="hero-title-line hero-title-gradient">Developer</span>
                <span className="sr-only">
                  {" "}
                  — Tayyab | React Developer, Next.js Developer, Node.js Developer,
                  PostgreSQL, REST API, Full Stack Developer for Hire
                </span>
              </h1>

              <p className="hero-subtitle mb-5 max-w-[620px]">
                I design and build{" "}
                <strong className="hero-highlight font-semibold">
                  fast, scalable web applications
                </strong>{" "}
                that rank, perform, and convert — from pixel-perfect React frontends
                to production-grade Node.js backends.
              </p>

              <p
                className="hero-seo-text mb-6 max-w-[620px]"
                itemProp="description"
              >
                With <strong>3+ years of hands-on full stack development</strong>,
                I&apos;ve shipped real-world projects using React, Next.js, Node.js,
                and PostgreSQL. I write clean, maintainable code backed by a deep
                understanding of data structures — having solved{" "}
                <strong>1,150+ LeetCode problems</strong>. Whether you need a landing
                page, a SaaS dashboard, or a full backend API, I build solutions that
                are engineered to last.
              </p>

              <div className="flex flex-col gap-8">
                <ul
                  className="flex flex-wrap justify-center gap-2 p-0 lg:justify-start"
                  aria-label="Core skills and services"
                >
                  {heroTags.map((tag) => (
                    <li key={tag}>
                      <span className="hero-tag">{tag}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center justify-center gap-3.5 lg:justify-start">
                  <CtaLink
                    href="/projects"
                    title="View Tayyab's web development projects"
                  >
                    View My Work
                    <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
                  </CtaLink>
                  <CtaLink
                    href="/Tayyab-CV.pdf"
                    download
                    variant="secondary"
                    title="Download Tayyab's Full Stack Developer CV"
                  >
                    Download CV
                    <Download className="size-[1.05rem]" aria-hidden="true" />
                  </CtaLink>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-stage">
                <Image
                  src="/images/about.avif"
                  alt="Tayyab - Full Stack Web Developer and Computer Engineering Student portrait photo. Professional developer specializing in React, Node.js, Express, and MongoDB with 3+ years of experience."
                  title="Tayyab - Full Stack Web Developer"
                  width={540}
                  height={620}
                  priority
                  className="hero-portrait"
                  itemProp="image"
                />

                <div className="hero-greeting-badge hero-status-badge">
                  <span className="hero-status-dot shrink-0" aria-hidden="true" />
                  <span className="text-[0.95rem] font-medium text-slate-100">
                    Available for work
                  </span>
                </div>

                <GlassSurface
                  as="figure"
                  rim="nav"
                  className={cn("hero-code-card", navGlassClassName)}
                >
                  <figcaption className="sr-only">Developer profile code snippet</figcaption>
                  <pre>
                    <code>
                      <span className="hero-code-keyword">const</span>{" "}
                      <span className="hero-code-name">developer</span> = {"{"}
                      {"\n  "}
                      <span className="hero-code-key">name</span>:{" "}
                      <span className="hero-code-string">&quot;Tayyab&quot;</span>,
                      {"\n  "}
                      <span className="hero-code-key">role</span>:{" "}
                      <span className="hero-code-string">
                        &quot;Full Stack Developer&quot;
                      </span>
                      ,
                      {"\n  "}
                      <span className="hero-code-key">passion</span>:{" "}
                      <span className="hero-code-string">
                        &quot;Building amazing things on the web&quot;
                      </span>
                      {"\n}"}
                    </code>
                  </pre>
                </GlassSurface>
              </div>
            </div>
          </div>

          <section className="hero-stats" aria-label="Professional highlights">
            {heroStats.map(({ icon: Icon, value, label, tone }) => (
              <GlassSurface
                key={label}
                as="article"
                rim={tone}
                className={cn("hero-stat-card", navGlassClassName)}
              >
                <GlassSurface
                  as="span"
                  rim={tone}
                  className={cn(
                    "hero-stat-icon inline-flex size-11 shrink-0 items-center justify-center rounded-[0.7rem]",
                    "bg-[rgba(6,10,22,0.92)]",
                  )}
                  aria-hidden="true"
                >
                  <Icon className="hero-stat-icon-svg relative z-[1]" strokeWidth={2} />
                </GlassSurface>
                <div className="hero-stat-copy">
                  <p className="hero-stat-value">{value}</p>
                  <p className="hero-stat-label">{label}</p>
                </div>
              </GlassSurface>
            ))}
          </section>
        </div>
      </header>
    </>
  )
}
