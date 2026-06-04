import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import type { PortfolioProject } from "@/components/site/project-card"
import { FaqSection } from "@/components/site/faq-section"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { JsonLd } from "@/components/site/json-ld"
import { ProjectsShowcase } from "@/components/site/projects-showcase"
import { MotionSection, PageHeaderItem, PageHeaderStagger } from "@/components/motion/page-motion"
import { buildPageMetadata } from "@/lib/site-metadata"
import { projectImageUrl, SITE_URL } from "@/lib/site"

const projectsPageIntro =
  "Explore full-stack web applications, SaaS products, and client projects built by Tayyab — a React, Next.js, and Node.js developer. Each project ships with production-grade APIs, databases, and user experiences designed for real traffic, SEO, and long-term maintainability."

const projectsKeywords = [
  "Tayyab web development portfolio",
  "React portfolio projects",
  "Next.js project examples",
  "Node.js full stack projects",
  "SaaS web application portfolio",
  "Supabase React projects",
  "Express.js API projects",
  "freelance full stack portfolio",
  "production web apps",
] as const

const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: "taylance-tech",
    name: "Taylance Tech",
    roleLabel: "My company",
    image: "/images/projects/taylance-tech.webp",
    imageAlt:
      "Taylance Tech software studio homepage screenshot — founder-led Next.js website for web, mobile, and SaaS built by Tayyab, full stack web developer",
    imageTitle: "Taylance Tech founder-led studio | Tayyab full stack web developer portfolio",
    link: "https://taylancetech.com/",
    description:
      "The company I founded and launched: Taylance Tech is a founder-led software studio offering web, mobile, SaaS, and AI automation for startups. I designed and built this Next.js site for performance, SEO, and clear positioning — it is fully my product and brand.",
    tags: [
      { label: "My company", variant: "feature" },
      { label: "Next.js", variant: "tech" },
      { label: "Founder-led", variant: "feature" },
      { label: "SaaS studio", variant: "feature" },
      { label: "SEO", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
  {
    id: 2,
    slug: "taylance-crm",
    name: "Taylance CRM",
    roleLabel: "Studio product",
    image: "/images/projects/taylance-crm.webp",
    imageAlt:
      "Taylance CRM dashboard screenshot — React and Express.js full stack CRM product built by Tayyab under the Taylance Tech software studio",
    imageTitle: "Taylance CRM React dashboard | Tayyab full stack portfolio project",
    link: "https://taylancecrm.vercel.app/",
    description:
      "A full-featured CRM product under the Taylance Tech studio: manage clients, leads, and projects from one dashboard. Built with React, Express.js, and Material UI — my own product, not client work.",
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
    slug: "7opportunity",
    name: "7Opportunity",
    roleLabel: "Client project",
    isClientWork: true,
    image: "/images/projects/tayyab-7opportunity-react-marketing-platform.webp",
    imageAlt:
      "7Opportunity marketing platform homepage screenshot — freelance client web application built by Tayyab with React, Express.js, and Supabase, optimized for mobile and Lighthouse performance",
    imageTitle:
      "7Opportunity React marketing platform screenshot | Client project by Tayyab full stack developer",
    link: "",
    description:
      "Freelance client project: a marketing platform with scroll-driven sections, lead-focused layout, and an Express.js + Supabase API backend. Built for strong mobile performance and Lighthouse scores. I list my development role only; the product and IP belong to the client. The live app is internal to the client and not linked here.",
    tags: [
      { label: "Client project", variant: "feature" },
      { label: "React", variant: "tech" },
      { label: "Express.js", variant: "tech" },
      { label: "Supabase", variant: "tech" },
      { label: "Lighthouse 90+", variant: "feature" },
    ],
    ctaLabel: "Internal site",
    ctaDisabled: true,
    ctaDisabledReason: "Client internal application — not publicly accessible.",
  },
  {
    id: 4,
    slug: "7options",
    name: "7Options",
    roleLabel: "Client project",
    isClientWork: true,
    image: "/images/projects/7options.webp",
    imageAlt:
      "7Options subscription and billing dashboard screenshot — freelance client SaaS built by Tayyab with React, Express.js, Supabase, and payment integrations",
    imageTitle:
      "7Options React subscription platform | Client project by Tayyab full stack developer",
    link: "https://7options.vercel.app/",
    description:
      "Freelance client project: a full stack subscription and account management platform with user dashboards, plans, payments, and admin workflows. Delivered without a formal IP contract; ownership stays with the client. A public demo is available at the link below.",
    tags: [
      { label: "Client project", variant: "feature" },
      { label: "React", variant: "tech" },
      { label: "Express.js", variant: "tech" },
      { label: "Supabase", variant: "tech" },
      { label: "Payments", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
  {
    id: 5,
    slug: "7talenthub",
    name: "7TalentHub",
    roleLabel: "Client project",
    isClientWork: true,
    image: "/images/projects/7talenthub.webp",
    imageAlt:
      "7TalentHub company CRM interface screenshot — internal freelance client application built by Tayyab with React, Node.js, and Supabase for talent and employee management",
    imageTitle:
      "7TalentHub React CRM screenshot | Internal client project by Tayyab full stack developer",
    link: "",
    description:
      "Freelance client project: a company CRM for employee relations, talent tracking, and performance analytics. Built with React, Node.js, and Supabase. I list my development role only; the product and IP belong to the client. The live app is internal and not linked here.",
    tags: [
      { label: "Client project", variant: "feature" },
      { label: "React", variant: "tech" },
      { label: "Node.js", variant: "tech" },
      { label: "Supabase", variant: "tech" },
      { label: "CRM", variant: "feature" },
    ],
    ctaLabel: "Internal site",
    ctaDisabled: true,
    ctaDisabledReason: "Client internal application — not publicly accessible.",
  },
  {
    id: 6,
    slug: "notehub",
    name: "NoteHub",
    image: "/images/projects/notehub.webp",
    imageAlt:
      "NoteHub note-taking application screenshot — full stack React and Express.js web app with MongoDB built by Tayyab for creating and organizing user notes",
    imageTitle: "NoteHub React note-taking app | Tayyab full stack web developer portfolio",
    link: "https://notehub-thisistayyab.vercel.app/",
    description:
      "NoteHub is a modern note-taking web application that allows users to create, organize, and edit notes seamlessly in a clean, distraction-free interface. Built with React and Express.js, the app connects to a MongoDB database for secure storage and retrieval of user notes.",
    tags: [
      { label: "React", variant: "tech" },
      { label: "Express.js", variant: "tech" },
      { label: "MongoDB", variant: "tech" },
      { label: "REST API", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
  {
    id: 7,
    slug: "leetcode-profile",
    name: "LeetCode Profile",
    image: "/images/projects/leetcode-profile.webp",
    imageAlt:
      "Tayyab LeetCode developer profile screenshot showing 1,150+ solved algorithm and data structure problems in C++ — competitive programming portfolio",
    imageTitle: "Tayyab LeetCode profile | 1150+ DSA problems solved — full stack developer",
    link: "https://leetcode.com/u/thisistayyab/",
    description:
      "My LeetCode profile reflects a strong foundation in Data Structures and Algorithms with over 1,150+ problems solved. This extensive problem-solving practice demonstrates deep expertise in algorithm design, time complexity optimization, and mastery of programming paradigms using C++ as the primary language.",
    tags: [
      { label: "Algorithms", variant: "tech" },
      { label: "Data Structures", variant: "tech" },
      { label: "C++", variant: "tech" },
      { label: "1150+ Solved", variant: "feature" },
    ],
    ctaLabel: "View Profile",
  },
  {
    id: 8,
    slug: "taynio-chat",
    name: "Taynio Chat",
    image: "/images/projects/taynio-chat.webp",
    imageAlt:
      "Taynio Chat real-time messaging application screenshot — React and Node.js web app with Socket.IO built by Tayyab for instant chat and presence",
    imageTitle: "Taynio Chat React real-time messaging app | Tayyab full stack portfolio",
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
  {
    id: 9,
    slug: "newswave",
    name: "NewsWave",
    image: "/images/projects/newswave.webp",
    imageAlt:
      "NewsWave news aggregator homepage screenshot — React web application with live third-party news API integration built by Tayyab",
    imageTitle: "NewsWave React news aggregator | Tayyab full stack developer portfolio",
    link: "https://newswave-thisistayyab.netlify.app/",
    description:
      "NewsWave is a dynamic news aggregator application designed to keep users informed with the latest headlines from around the world. Built with React and integrated with third-party news APIs, it fetches live articles and presents them in a structured, visually appealing layout.",
    tags: [
      { label: "React", variant: "tech" },
      { label: "REST API", variant: "tech" },
      { label: "Bootstrap", variant: "tech" },
      { label: "Responsive Design", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
  {
    id: 10,
    slug: "editwave",
    name: "EditWave",
    image: "/images/projects/editwave.webp",
    imageAlt:
      "EditWave in-browser text editor screenshot — React rich editing web application with responsive UI built by Tayyab",
    imageTitle: "EditWave React browser text editor | Tayyab full stack portfolio project",
    link: "https://thisistayyab.github.io/EditWave/",
    description:
      "EditWave is a browser-based text editor web application designed to offer a smooth and modern editing experience. With a clean and minimalistic UI, it supports real-time text manipulation and formatting, making it ideal for quick note-taking or drafting documents.",
    tags: [
      { label: "React", variant: "tech" },
      { label: "JavaScript", variant: "tech" },
      { label: "Bootstrap", variant: "tech" },
      { label: "Responsive Design", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
  {
    id: 11,
    slug: "shahid-portfolio",
    name: "Shahid's Portfolio",
    image: "/images/projects/shahid-portfolio.webp",
    imageAlt:
      "Shahid personal portfolio website screenshot — React developer portfolio with modern responsive UI built by Tayyab",
    imageTitle: "Shahid React portfolio website | Tayyab full stack web developer project",
    link: "https://thisistayyab.github.io/kashif-project/",
    description:
      "Shahid's Portfolio is a modern personal branding website built to showcase projects, achievements, and skills with elegance. Developed with React, JavaScript, and CSS, the portfolio highlights clean UI design principles with smooth transitions, hover effects, and a modular layout.",
    tags: [
      { label: "React", variant: "tech" },
      { label: "CSS", variant: "tech" },
      { label: "JavaScript", variant: "tech" },
      { label: "Responsive Design", variant: "feature" },
    ],
    ctaLabel: "Live View",
  },
]

const projectsFaq = [
  {
    question: "What kind of projects are these?",
    answer:
      "Live web apps and products — SaaS tools, APIs, CRMs, and marketing sites. Built for real use, not mockups.",
  },
  {
    question: "What technologies do you use most?",
    answer: "React, Next.js, TypeScript, Node.js, PostgreSQL, MongoDB, and Supabase.",
  },
  {
    question: "Are these deployed projects?",
    answer: "Yes. Most have a live link or a public repo.",
  },
  {
    question: 'What does "Client project" mean?',
    answer:
      "I built it for a client as freelance work. They own the product; I am listed as the developer.",
  },
] as const

function buildProjectsItemListJsonLd(projects: PortfolioProject[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/projects`,
    name: "Tayyab Full Stack Web Development Portfolio",
    description: projectsPageIntro,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        "@id": project.link || `${SITE_URL}/projects`,
        name: project.name,
        description: project.description,
        url: project.ctaDisabled ? `${SITE_URL}/projects` : project.link,
        image: {
          "@type": "ImageObject",
          url: projectImageUrl(project.image),
          contentUrl: projectImageUrl(project.image),
          name: project.imageTitle,
          caption: project.imageAlt,
          description: project.imageAlt,
        },
        applicationCategory: "WebApplication",
        operatingSystem: "Web Browser",
        author: {
          "@type": "Person",
          name: "Tayyab",
          url: SITE_URL,
          jobTitle: "Full Stack Web Developer",
        },
        ...(project.client
          ? {
              copyrightHolder: {
                "@type": "Organization",
                name: project.client,
              },
            }
          : project.isClientWork
            ? {
                maintainer: {
                  "@type": "Person",
                  name: "Tayyab",
                  url: SITE_URL,
                  jobTitle: "Full Stack Web Developer",
                },
              }
            : {}),
      },
    })),
  }
}

export const metadata: Metadata = buildPageMetadata({
  title: "Projects | Full Stack Web Development Portfolio — React, Next.js & Node.js",
  description:
    "Browse Tayyab's full-stack web development portfolio: Taylance Tech studio, Taylance CRM, React and Node.js apps, client work, and production-ready demos.",
  canonicalPath: "/projects",
  keywords: projectsKeywords,
  openGraph: {
    title: "Web Development Projects | Tayyab — React & Node.js Portfolio",
    description: projectsPageIntro,
  },
  ogImage: {
    url: `${SITE_URL}/images/projects/taylance-tech.avif`,
    alt: "Taylance Tech — founder-led software studio",
  },
  twitter: {
    title: "Full Stack Web Development Projects | Tayyab",
    description: projectsPageIntro,
  },
})

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE_URL}/projects` },
          ],
        }}
      />
      <JsonLd data={buildProjectsItemListJsonLd(portfolioProjects)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/projects`,
          name: "Tayyab Web Development Projects",
          description: projectsPageIntro,
          url: `${SITE_URL}/projects`,
          isPartOf: { "@type": "WebSite", url: SITE_URL, name: "Tayyab Portfolio" },
          about: {
            "@type": "Person",
            name: "Tayyab",
            jobTitle: "Full Stack Web Developer",
            url: SITE_URL,
          },
          mainEntity: { "@id": `${SITE_URL}/projects` },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: projectsFaq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />

      <article className="relative z-[5]" itemScope itemType="https://schema.org/CollectionPage">
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
                  Portfolio
                </p>
              </PageHeaderItem>
              <PageHeaderItem>
                <h1 className="text-[clamp(2rem,5.5vw,3.25rem)] leading-[1.08] font-bold tracking-tight text-white">
                  Full stack web development projects
                </h1>
              </PageHeaderItem>
              <PageHeaderItem>
                <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
                <p className="text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.8]">
                  {projectsPageIntro}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-500">
                  React · Next.js · Node.js · TypeScript · PostgreSQL · MongoDB · Supabase · REST
                  APIs · SaaS · Real-time apps
                </p>
              </PageHeaderItem>
            </PageHeaderStagger>
          </div>
        </header>

        <MotionSection
          className="mx-auto max-w-[1200px] px-5 pb-16 sm:px-6 lg:px-4"
          aria-labelledby="projects-grid-heading"
        >
          <h2 id="projects-grid-heading" className="sr-only">
            All portfolio projects by Tayyab
          </h2>
          <ProjectsShowcase
            projects={portfolioProjects}
            listLabel="Full stack web development portfolio projects"
          />
        </MotionSection>

        <MotionSection>
        <FaqSection
          className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-6 lg:px-4"
          headingId="projects-faq-heading"
          description="Quick answers about this portfolio."
          items={projectsFaq}
          footerLead="Want to know more about how I work?"
          ctas={[
            {
              label: "About Tayyab",
              href: "/about",
              title: "Read Tayyab's full stack developer background and story",
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
