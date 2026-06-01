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
import { GlassSurface, type GlassRim } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import type { PortfolioProject } from "@/components/site/project-card"
import {
  buildExperienceItemListJsonLd,
  ExperienceHomePreview,
} from "@/components/site/experience-roadmap"
import { ProjectsShowcase } from "@/components/site/projects-showcase"
import { careerRoadmapMilestones } from "@/app/(site)/(portfolio)/experience/page"
import {
  glassBadgeClassName,
  heroTagClassName,
  navGlassClassName,
  statCardClassName,
  statIconClassName,
  statusBadgeClassName,
} from "@/components/site/site-styles"
import {
  homeMetadata,
  profileEmail,
  profileSameAs,
  projectImageUrl,
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

const homeFeaturedProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: "taylance-tech",
    name: "Taylance Tech",
    roleLabel: "My company",
    image: "/images/projects/taylance-tech.webp",
    imageAlt:
      "Taylance Tech software studio homepage screenshot — founder-led Next.js website built by Tayyab, full stack web developer",
    imageTitle: "Taylance Tech founder-led studio | Tayyab full stack web developer portfolio",
    link: "https://taylancetech.com/",
    description:
      "The company I founded and launched: a founder-led software studio for web, mobile, SaaS, and AI automation. Built with Next.js for performance and SEO — fully my product and brand.",
    tags: [
      { label: "My company", variant: "feature" },
      { label: "Next.js", variant: "tech" },
      { label: "Founder-led", variant: "feature" },
      { label: "SaaS studio", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
  {
    id: 2,
    slug: "taylance-crm",
    name: "Taylance CRM",
    roleLabel: "Studio product",
    image: "/images/projects/taylance-crm.jpg",
    imageAlt:
      "Taylance CRM dashboard screenshot — React and Express.js CRM built by Tayyab under Taylance Tech studio",
    imageTitle: "Taylance CRM React dashboard | Tayyab featured portfolio project",
    link: "https://taylancecrm.vercel.app/",
    description:
      "A CRM product under my Taylance Tech studio: clients, leads, and projects in one dashboard. React, Express.js, and Material UI — my own product.",
    tags: [
      { label: "Studio product", variant: "feature" },
      { label: "React", variant: "tech" },
      { label: "Express.js", variant: "tech" },
      { label: "REST API", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
  {
    id: 3,
    slug: "taynio-chat",
    name: "Taynio Chat",
    image: "/images/projects/taynio-chat.png",
    imageAlt:
      "Taynio Chat real-time messaging application screenshot — React, Node.js, and Socket.IO app built by Tayyab",
    imageTitle: "Taynio Chat React messaging app | Tayyab featured full stack project",
    link: "https://github.com/thisistayyab/Taynio-chat",
    description:
      "Taynio Chat is a real-time messaging application built with React, Node.js, and Socket.IO, designed for fast, secure, and reliable communication. It enables instant message exchange, active user presence detection, and seamless real-time updates without page reloads.",
    tags: [
      { label: "React", variant: "tech" },
      { label: "Node.js", variant: "tech" },
      { label: "Socket.IO", variant: "tech" },
      { label: "Real-time", variant: "feature" },
    ],
    ctaLabel: "Repo Link",
  },
]

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
      <JsonLd data={buildExperienceItemListJsonLd(careerRoadmapMilestones, SITE_URL, "/")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Featured Web Development Projects by Tayyab",
          itemListElement: homeFeaturedProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareApplication",
              name: project.name,
              description: project.description,
              url: project.link,
              image: {
                "@type": "ImageObject",
                url: projectImageUrl(project.image),
                contentUrl: projectImageUrl(project.image),
                name: project.imageTitle,
                caption: project.imageAlt,
                description: project.imageAlt,
              },
              applicationCategory: "WebApplication",
            },
          })),
        }}
      />

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
          className="relative z-[1] mx-auto flex min-h-[calc(100dvh-108px)] max-w-[1200px] flex-col gap-8 px-5 pb-10 sm:px-6 lg:px-4"
          id="home"
        >
          <div className="grid flex-1 grid-cols-1 items-center gap-10 pt-6 max-lg:justify-items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-4 lg:pt-8">
            <div className="relative z-[2] text-left max-lg:flex max-lg:flex-col max-lg:items-center max-lg:text-center">
              <p className="sr-only text-[0.72rem] font-semibold tracking-[0.22em] text-slate-400/85 uppercase">
                Crafting Digital Excellence
              </p>

              <div
                className={cn(
                  glassBadgeClassName,
                  "mb-7 inline-flex items-center gap-2.5",
                )}
              >
                <span
                  className="inline-flex drop-shadow-[0_0_8px_rgba(251,146,60,0.45)]"
                  aria-hidden="true"
                >
                  👋
                </span>
                <span className="text-[0.95rem] font-medium text-slate-100">
                  Hi, I&apos;m Tayyab
                </span>
              </div>

              <h1
                className="mb-6 text-[clamp(2.75rem,7.5vw,4.75rem)] leading-[0.98] font-extrabold tracking-[-0.03em]"
                itemProp="jobTitle"
              >
                <span className="block text-white">Full Stack</span>
                <span className="block bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  Developer
                </span>
                <span className="sr-only">
                  {" "}
                  — Tayyab | React Developer, Next.js Developer, Node.js Developer,
                  PostgreSQL, REST API, Full Stack Developer for Hire
                </span>
              </h1>

              <p className="mb-5 max-w-[620px] text-[clamp(1rem,2.2vw,1.125rem)] leading-[1.65] text-slate-400 max-lg:mx-auto">
                I design and build{" "}
                <strong className="font-semibold text-cyan-300">
                  fast, scalable web applications
                </strong>{" "}
                that rank, perform, and convert — from pixel-perfect React frontends
                to production-grade Node.js backends.
              </p>

              <p
                className="mb-6 max-w-[620px] text-[0.92rem] leading-[1.75] text-slate-400/82 max-lg:mx-auto [&_strong]:font-semibold [&_strong]:text-slate-300"
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
                      <span className={heroTagClassName}>{tag}</span>
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

            <div className="relative mx-auto flex min-h-[380px] w-full max-w-[620px] items-end justify-center lg:mx-0 lg:min-h-[560px] lg:max-w-none lg:justify-end">
              <div className="relative mx-auto w-[min(100%,580px)] min-h-[clamp(400px,78vw,580px)] sm:w-[min(100%,620px)] sm:min-h-[clamp(440px,62vw,580px)] lg:ml-auto lg:mr-[-0.5rem] lg:w-[min(100%,640px)] lg:min-h-[480px]">
                <Image
                  src="/images/about.avif"
                  alt="Tayyab - Full Stack Web Developer and Computer Engineering Student portrait photo. Professional developer specializing in React, Node.js, Express, and MongoDB with 3+ years of experience."
                  title="Tayyab - Full Stack Web Developer"
                  width={540}
                  height={620}
                  priority
                  className="relative z-[2] mx-auto block w-[min(100%,460px)] object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)] [mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)] sm:w-[min(100%,500px)] lg:-ml-4 lg:mr-auto lg:w-[min(100%,540px)]"
                  itemProp="image"
                />

                <div
                  className={cn(
                    statusBadgeClassName,
                    "absolute bottom-7 left-1/2 z-[6] inline-flex -translate-x-1/2 items-center gap-2.5 lg:right-6 lg:bottom-10 lg:left-auto lg:translate-x-0",
                  )}
                >
                  <span
                    className="size-[0.55rem] shrink-0 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.85)]"
                    aria-hidden="true"
                  />
                  <span className="text-[0.95rem] font-medium text-slate-100">
                    Available for work
                  </span>
                </div>

                <GlassSurface
                  as="figure"
                  rim="nav"
                  className={cn(
                    navGlassClassName,
                    "absolute right-1 bottom-[4.75rem] z-[5] m-0 hidden w-[min(248px,88vw)] max-w-[calc(100%-1rem)] -rotate-[7deg] origin-center rounded-2xl p-4 sm:block sm:top-[47%] sm:right-[-2%] sm:bottom-auto sm:w-[min(250px,38vw)] md:top-[45%] md:right-[-3%] md:w-[255px] lg:top-[44%] lg:right-[-2%] lg:w-[268px] xl:top-[43%] xl:right-[-4%]",
                  )}
                >
                  <figcaption className="sr-only">Developer profile code snippet</figcaption>
                  <pre className="relative z-[1] m-0 font-mono text-[0.68rem] leading-[1.55] whitespace-pre-wrap">
                    <code>
                      <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-300">developer</span> = {"{"}
                      {"\n  "}
                      <span className="text-fuchsia-400">name</span>:{" "}
                      <span className="text-green-300">&quot;Tayyab&quot;</span>,
                      {"\n  "}
                      <span className="text-fuchsia-400">role</span>:{" "}
                      <span className="text-green-300">
                        &quot;Full Stack Developer&quot;
                      </span>
                      ,
                      {"\n  "}
                      <span className="text-fuchsia-400">passion</span>:{" "}
                      <span className="text-green-300">
                        &quot;Building amazing things on the web&quot;
                      </span>
                      {"\n}"}
                    </code>
                  </pre>
                </GlassSurface>
              </div>
            </div>
          </div>

          <section
            className="mt-auto grid grid-cols-2 gap-3.5 pt-2 lg:grid-cols-4 lg:gap-4"
            aria-label="Professional highlights"
          >
            {heroStats.map(({ icon: Icon, value, label, tone }) => (
              <GlassSurface
                key={label}
                as="article"
                rim={tone}
                className={statCardClassName}
              >
                <GlassSurface
                  as="span"
                  rim={tone}
                  className={statIconClassName(tone)}
                  aria-hidden="true"
                >
                  <Icon className="relative z-[1] size-5 sm:size-[1.35rem]" strokeWidth={2} />
                </GlassSurface>
                <div className="flex min-w-0 flex-col gap-[0.2rem]">
                  <p className="m-0 text-[clamp(1.35rem,3.2vw,1.65rem)] leading-[1.05] font-bold text-white">
                    {value}
                  </p>
                  <p className="m-0 text-[clamp(0.72rem,2vw,0.82rem)] leading-[1.35] text-slate-50/82">
                    {label}
                  </p>
                </div>
              </GlassSurface>
            ))}
          </section>
        </div>
      </header>

      <section
        className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-4"
        aria-labelledby="home-about-heading"
      >
        <div className="relative z-[2] mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
            About
          </p>

          <h2
            id="home-about-heading"
            className="mx-auto mb-6 max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
          >
            <span className="block">
              Full stack developer who ships{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                real products
              </span>
            </span>
            <span className="block">— not just code</span>
          </h2>

          <div className="mx-auto mb-8 h-px w-12 bg-white/15" aria-hidden="true" />

          <p className="mb-5 text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
            I&apos;m Tayyab — a{" "}
            <strong className="font-semibold text-slate-200">full stack web developer</strong>{" "}
            with 3+ years of experience building production-ready{" "}
            <strong className="font-semibold text-slate-200">
              React and Node.js applications
            </strong>{" "}
            for startups, SaaS products, and growing businesses.
          </p>

          <p className="mb-5 text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
            My work spans the entire stack: responsive React UIs, REST and GraphQL APIs,
            PostgreSQL databases, and cloud deployments. I don&apos;t just write code — I
            think about{" "}
            <strong className="font-semibold text-slate-200">
              performance, maintainability, and scalability
            </strong>{" "}
            from day one. Having solved over{" "}
            <strong className="font-semibold text-slate-200">1,150+ LeetCode problems</strong>,
            I bring strong algorithmic thinking to every backend challenge, whether it&apos;s
            optimizing queries, designing data models, or building features that hold up under
            real traffic. If you&apos;re looking to{" "}
            <strong className="font-semibold text-slate-200">
              hire a full stack developer
            </strong>{" "}
            who ships clean, tested, production-grade software — let&apos;s talk.
          </p>

          <div className="mt-2 flex justify-center">
            <CtaLink href="/about" title="Read Tayyab's full professional background and achievements">
              Learn more about Tayyab
              <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </section>

      <section
        id="project"
        className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-4"
        aria-labelledby="home-projects-heading"
      >
        <div className="relative z-[2]">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
              Projects
            </p>

            <h2
              id="home-projects-heading"
              className="mx-auto max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
            >
              <span className="block">
                Live products built with{" "}
                <span className="whitespace-nowrap bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  real users
                </span>
              </span>
              <span className="block">in mind</span>
            </h2>

            <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />

            <p className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
              Deployed{" "}
              <strong className="font-semibold text-slate-200">full-stack web applications</strong>{" "}
              built with React, Next.js, Node.js, and PostgreSQL — used by real people, not just UI
              mockups or tutorial clones. Explore SaaS dashboards, REST APIs, Supabase backends,
              and production-ready client work.
            </p>
          </div>

          <ProjectsShowcase
            projects={homeFeaturedProjects}
            listLabel="Featured full stack web development projects"
          />

          <div className="mt-10 flex justify-center">
            <CtaLink
              href="/projects"
              title="View Tayyab's complete web development project portfolio"
            >
              View all projects
              <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
            </CtaLink>
          </div>
        </div>
      </section>

      <ExperienceHomePreview
        latestMilestone={careerRoadmapMilestones[0]}
        upcomingMilestones={careerRoadmapMilestones.slice(1, 4)}
      />
    </>
  )
}
