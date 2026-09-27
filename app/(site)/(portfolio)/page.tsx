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
import Link from "next/link"
import { CtaLink } from "@/components/site/cta-link"
import { OptimizedPicture } from "@/components/site/optimized-picture"
import { GlassSurface, type GlassRim } from "@/components/site/glass-surface"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import type { PortfolioProject } from "@/components/site/project-card"
import {
  buildExperienceItemListJsonLd,
  ExperienceHomePreview,
} from "@/components/site/experience-roadmap"
import { ProjectsShowcase } from "@/components/site/projects-showcase"
import { buildServicesItemListJsonLd } from "@/components/site/services-json-ld"
import { BlogHomePreview } from "@/components/blog/blog-home-preview"
import { ContactHomePreview } from "@/components/site/contact-home-preview"
import { FaqSection } from "@/components/site/faq-section"
import { buildFaqJsonLd } from "@/components/site/faq-json-ld"
import { getFeaturedPosts } from "@/lib/blog/queries"
import { ServicesHomePreview } from "@/components/site/services-home-preview"
import { TechStackSection } from "@/components/site/tech-stack-section"
import { buildTestimonialsItemListJsonLd } from "@/components/site/testimonials-json-ld"
import { TestimonialsSection } from "@/components/site/testimonials-section"
import { careerRoadmapMilestones } from "@/app/(site)/(portfolio)/experience/page"
import { portfolioServices } from "@/app/(site)/(portfolio)/services/page"
import { testimonials as homeTestimonials } from "@/app/(site)/(portfolio)/testimonials/page"
import {
  glassBadgeClassName,
  heroTagClassName,
  navGlassClassName,
  statCardClassName,
  statIconClassName,
  statusBadgeClassName,
} from "@/components/site/site-styles"
import { buildPageMetadata } from "@/lib/site-metadata"
import { youtubeDownloaderProject } from "@/lib/data/youtube-downloader-project"
import { auditblocProject } from "@/lib/data/auditbloc-project"
import { relayProject } from "@/lib/data/relay-project"
import { tillqorinProject } from "@/lib/data/tillqorin-project"
import {
  buildPortfolioProjectSoftwareApplicationJsonLd,
  projectPortfolioUrl,
} from "@/lib/portfolio-project-json-ld"
import {
  homeMetadata,
  PROFILE_IMAGE,
  projectImageUrl,
  SITE_URL,
} from "@/lib/site"
import { cn } from "@/lib/utils"
import { FadeIn } from "@/components/motion/fade-in"
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-reveal"
import { ParallaxScroll } from "@/components/motion/parallax-scroll"
import { HeroStagger, HeroItem, HeroImageReveal, WordPullUp } from "@/components/motion/hero-reveal"

export const metadata: Metadata = buildPageMetadata({
  title: homeMetadata.title,
  description: homeMetadata.description,
  canonicalPath: "/",
  keywords: homeMetadata.keywords,
  openGraph: {
    title: homeMetadata.title,
    description: homeMetadata.description,
    type: "website",
  },
})

const homeTestimonialsIntro =
  "Client feedback from freelance and contract web development work on Tayyab's portfolio."

const homeServicesIntro =
  "Full stack software development by Tayyab: SaaS products, web applications, Node.js APIs, AI automation, PostgreSQL, deployment, and technical SEO."

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
  youtubeDownloaderProject,
  relayProject,
  auditblocProject,
  tillqorinProject,
]

const homeFaq = [
  {
    question: "Who is Tayyab and what does he specialize in?",
    answer:
      "Tayyab is a full stack web developer and co-founder at Taylance Tech with 3+ years of experience specializing in React, Next.js (App Router), TypeScript, Node.js, Express, and PostgreSQL. He builds production-grade SaaS platforms, real-time collaboration applications with WebSockets & WebRTC, REST APIs, database architecture, and technical SEO.",
  },
  {
    question: "What are Tayyab's featured production projects?",
    answer:
      "Tayyab's flagship projects include Relay (a privacy-first real-time text notepad and WebRTC peer-to-peer file transfer tool at relay.thisistayyab.dev), Tillqorin POS (a retail commerce OS and web billing platform at pos.taylancetech.com), and AuditBloc (an automated web accessibility WCAG, GDPR cookie, and AI disclosure scanner at auditbloc.taylancetech.com).",
  },
  {
    question: "Is Tayyab available for freelance, contract, or full-time roles?",
    answer:
      "Yes. Tayyab is actively available for freelance software projects, contract development, and technical consulting for startups and companies worldwide. He can take projects from initial concept through architecture, design, and cloud deployment.",
  },
  {
    question: "What is Tayyab's background in Data Structures and Algorithms?",
    answer:
      "Tayyab has solved over 1,150+ problems on LeetCode using C++, demonstrating deep expertise in algorithmic design, time/space complexity optimization, and scalable computational problem-solving.",
  },
  {
    question: "How does Tayyab approach web performance, SEO, and accessibility?",
    answer:
      "Every application is built following strict web performance and Core Web Vitals standards, responsive mobile-first layouts with Tailwind CSS, Schema.org JSON-LD structured data, WCAG accessibility compliance, and optimized static asset delivery with modern image formats (AVIF/WebP).",
  },
  {
    question: "How can I hire Tayyab or discuss a project?",
    answer:
      "You can get in touch directly via the contact form on this site at https://thisistayyab.dev/contact, connect on LinkedIn at https://www.linkedin.com/in/thisistayyab/, or email tayyab@taylancetech.com to schedule a consultation.",
  },
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

export default async function HomePage() {
  const featuredBlogPosts = await getFeaturedPosts(3)
  return (
    <>
      <JsonLd data={buildExperienceItemListJsonLd(careerRoadmapMilestones, SITE_URL, "/")} />

      {homeTestimonials.length > 0 && (
        <JsonLd
          data={buildTestimonialsItemListJsonLd(
            homeTestimonials,
            SITE_URL,
            "/",
            homeTestimonialsIntro,
          )}
        />
      )}

      <JsonLd
        data={buildServicesItemListJsonLd(
          portfolioServices,
          SITE_URL,
          "/",
          homeServicesIntro,
        )}
      />

      <JsonLd data={buildPortfolioProjectSoftwareApplicationJsonLd(youtubeDownloaderProject, SITE_URL)} />
      <JsonLd data={buildPortfolioProjectSoftwareApplicationJsonLd(relayProject, SITE_URL)} />
      <JsonLd data={buildPortfolioProjectSoftwareApplicationJsonLd(auditblocProject, SITE_URL)} />
      <JsonLd data={buildPortfolioProjectSoftwareApplicationJsonLd(tillqorinProject, SITE_URL)} />
      <JsonLd data={buildFaqJsonLd(homeFaq)} />

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
              "@id": projectPortfolioUrl(SITE_URL, project),
              name: project.name,
              description: project.description,
              url: project.link || projectPortfolioUrl(SITE_URL, project),
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

      <header
        className="relative isolate bg-transparent pt-[88px]"
      >
        <HeaderGraphBackground />

        <div
          className="relative z-[1] mx-auto flex min-h-[calc(100dvh-108px)] w-full min-w-0 max-w-[1200px] flex-col gap-8 px-4 pb-10 sm:px-6 lg:px-8"
          id="home"
        >
          <div className="grid min-w-0 flex-1 grid-cols-1 items-center gap-10 pt-6 max-lg:justify-items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:gap-4 lg:pt-8">
            <HeroStagger className="relative z-[2] w-full min-w-0 max-w-full text-left max-lg:flex max-lg:flex-col max-lg:items-stretch max-lg:text-center">
              <p className="sr-only text-[0.72rem] font-semibold tracking-[0.22em] text-slate-400/85 uppercase">
                Crafting Digital Excellence
              </p>

              <HeroItem>
                <div
                  className={cn(
                    glassBadgeClassName,
                    "mb-7 inline-flex w-fit max-w-full items-center gap-2.5 max-lg:mx-auto",
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
              </HeroItem>

              <HeroItem>
                <h1 className="mb-6 w-full max-w-full text-[clamp(2.25rem,7.5vw,4.75rem)] leading-[1.02] font-extrabold tracking-tight sm:text-[clamp(2.75rem,7.5vw,4.75rem)] sm:leading-[0.98] lg:tracking-[-0.03em]">
                  <WordPullUp text="Full Stack" className="block text-white" />
                  <span className="block bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text pb-[0.04em] text-transparent">
                    Developer
                  </span>
                </h1>
              </HeroItem>
              <p className="sr-only">
                Tayyab — full stack developer for hire. React, Next.js, Node.js, PostgreSQL, and
                REST APIs.
              </p>

              <HeroItem>
                <p className="mb-5 w-full max-w-[620px] text-[clamp(1rem,2.2vw,1.125rem)] leading-[1.65] text-slate-400 max-lg:mx-auto">
                  I design and build{" "}
                  <strong className="font-semibold text-cyan-300">
                    fast, scalable web applications
                  </strong>{" "}
                  that rank, perform, and convert — from pixel-perfect React frontends
                  to production-grade Node.js backends.
                </p>
              </HeroItem>

              <HeroItem>
                <p
                  className="mb-6 w-full max-w-[620px] text-[0.92rem] leading-[1.75] text-slate-400/82 max-lg:mx-auto [&_strong]:font-semibold [&_strong]:text-slate-300"
                  itemProp="description"
                >
                With <strong>3+ years shipping code that handles real traffic</strong>,
                I&apos;ve turned product ideas into live applications using React, Next.js,
                Node.js, and PostgreSQL. My engineering decisions are backed by deep
                algorithmic practice — <strong>1,150+ LeetCode problems solved</strong>.
                Whether you need a landing page, a SaaS dashboard, or a full backend API,
                I deliver software that&apos;s built to last.
              </p>
              </HeroItem>

              <HeroItem>
                <div className="flex w-full min-w-0 max-w-full flex-col gap-8">
                  <StaggerContainer
                  className="flex w-full min-w-0 flex-wrap justify-center gap-2 p-0 lg:justify-start"
                  aria-label="Core skills and services"
                >
                  {heroTags.map((tag) => (
                    <StaggerItem key={tag}>
                      <span className={heroTagClassName}>{tag}</span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>

                <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-3.5 lg:justify-start">
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
              </HeroItem>
            </HeroStagger>

            <div className="relative mx-auto flex min-h-[380px] w-full min-w-0 max-w-full items-end justify-center overflow-x-clip sm:max-w-[620px] lg:mx-0 lg:min-h-[560px] lg:max-w-none lg:justify-end lg:overflow-visible">
              <HeroImageReveal className="relative mx-auto w-full min-w-0 max-w-[min(100%,580px)] min-h-[clamp(400px,78vw,580px)] sm:max-w-[620px] sm:min-h-[clamp(440px,62vw,580px)] lg:ml-auto lg:mr-[-0.5rem] lg:w-[min(100%,640px)] lg:min-h-[480px]">
                <ParallaxScroll offset={30}>
                  <OptimizedPicture
                    src={PROFILE_IMAGE}
                    alt="Professional portrait of Tayyab, full stack developer"
                    title="Tayyab — Full Stack Developer"
                    width={540}
                    height={620}
                    priority
                    pictureClassName="relative z-[2] mx-auto w-[min(100%,460px)] sm:w-[min(100%,500px)] lg:-ml-4 lg:mr-auto lg:w-[min(100%,540px)]"
                    className="mx-auto block w-full object-contain object-bottom drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)] [mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)]"
                    itemProp="image"
                  />
                </ParallaxScroll>

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
              </HeroImageReveal>
            </div>
          </div>

          <StaggerContainer
            className="mt-auto grid grid-cols-2 gap-3.5 pt-2 lg:grid-cols-4 lg:gap-4"
            aria-label="Professional highlights"
          >
            {heroStats.map(({ icon: Icon, value, label, tone }) => (
              <StaggerItem key={label}>
                <GlassSurface
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
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </header>

      <section
        className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-4"
        aria-labelledby="home-about-heading"
      >
        <FadeIn className="relative z-[2] mx-auto max-w-3xl text-center">
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
            who partners with startups, SaaS teams, and growing businesses to turn product
            ideas into{" "}
            <strong className="font-semibold text-slate-200">
              reliable, well-architected software
            </strong>.
          </p>

          <p className="mb-5 text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
            From responsive React interfaces and RESTful APIs to PostgreSQL data layers
            and cloud deployments, I own the full delivery cycle. Every decision —
            from component architecture to database indexing — is guided by a focus on{" "}
            <strong className="font-semibold text-slate-200">
              performance, maintainability, and long-term value
            </strong>.{" "}
            If you&apos;re looking to{" "}
            <strong className="font-semibold text-slate-200">
              hire a developer who treats your product like their own
            </strong>{" "}
            — let&apos;s talk.
          </p>

          <div className="mt-2 flex justify-center">
            <CtaLink href="/about" title="Read Tayyab's full professional background and achievements">
              Learn more about Tayyab
              <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
            </CtaLink>
          </div>
        </FadeIn>
      </section>

      <FadeIn>
        <TechStackSection />
      </FadeIn>

      <section
        id="project"
        className="relative mx-auto max-w-[1200px] px-5 py-20 sm:px-6 lg:px-4"
        aria-labelledby="home-projects-heading"
      >
        <FadeIn className="relative z-[2]">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-blue-300/70 uppercase">
              Projects
            </p>

            <h2
              id="home-projects-heading"
              className="mx-auto max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
            >
              <span className="block">Production software for</span>
              <span className="block">
                <span className="whitespace-nowrap bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                  live operations
                </span>
              </span>
            </h2>

            <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />

            <p className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
              Deployed{" "}
              <strong className="font-semibold text-slate-200">production web applications</strong>{" "}
              — including{" "}
              <a
                href="https://relay.thisistayyab.dev"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-violet-300 underline decoration-violet-400/35 underline-offset-2 hover:text-violet-200"
              >
                Relay
              </a>
              ,{" "}
              <Link
                href="/projects/auditbloc"
                className="font-semibold text-violet-300 underline decoration-violet-400/35 underline-offset-2 hover:text-violet-200"
              >
                AuditBloc
              </Link>
              ,{" "}
              <Link
                href="/projects/tillqorin"
                className="font-semibold text-violet-300 underline decoration-violet-400/35 underline-offset-2 hover:text-violet-200"
              >
                Tillqorin POS
              </Link>
              , SaaS dashboards, REST APIs, Supabase backends, and client work built with React,
              Next.js, Node.js, and PostgreSQL.
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
        </FadeIn>
      </section>

      <FadeIn>
        <ExperienceHomePreview
          latestMilestone={careerRoadmapMilestones[0]}
          upcomingMilestones={careerRoadmapMilestones.slice(1, 4)}
        />
      </FadeIn>

      <FadeIn>
        <TestimonialsSection testimonials={homeTestimonials} variant="home" />
      </FadeIn>

      <FadeIn>
        <ServicesHomePreview services={portfolioServices} />
      </FadeIn>

      <FadeIn>
        <BlogHomePreview posts={featuredBlogPosts} />
      </FadeIn>

      <FadeIn>
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <FaqSection
            headingId="home-faq-heading"
            title="Frequently asked questions"
            description="Clear answers about my full stack development experience, featured production products, and availability for hire."
            items={homeFaq}
            footerLead="Have a project in mind or want to discuss a role?"
            ctas={[
              {
                label: "Get in touch",
                href: "/contact",
                title: "Contact Tayyab for projects or roles",
                variant: "primary",
              },
              {
                label: "View all projects",
                href: "/projects",
                title: "Browse complete project portfolio",
                variant: "secondary",
              },
            ]}
          />
        </div>
      </FadeIn>

      <FadeIn>
        <ContactHomePreview />
      </FadeIn>
    </>
  )
}
