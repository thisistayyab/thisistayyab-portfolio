import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Lock,
  Scale,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { RiGithubFill } from "react-icons/ri"

import { CtaLink } from "@/components/site/cta-link"
import { JsonLd } from "@/components/site/json-ld"
import { OptimizedPicture } from "@/components/site/optimized-picture"
import {
  ctaPrimaryClassName,
  ctaSecondaryClassName,
} from "@/components/site/site-styles"
import {
  YOUTUBE_DOWNLOADER_REPO,
  YOUTUBE_DOWNLOADER_URL,
  youtubeDownloaderPageDescription,
  youtubeDownloaderPageTitle,
  youtubeDownloaderProject,
  youtubeDownloaderSeoKeywords,
} from "@/lib/data/youtube-downloader-project"
import {
  buildPortfolioProjectBreadcrumbJsonLd,
  buildPortfolioProjectSoftwareApplicationJsonLd,
} from "@/lib/portfolio-project-json-ld"
import { buildPageMetadata } from "@/lib/site-metadata"
import { projectImageUrl, SITE_URL } from "@/lib/site"
import { ProjectWarmup } from "@/components/site/project-warmup"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const keyFeatures = [
  "Direct download to your device: The video or audio downloads straight to your computer or phone.",
  "No videos kept on the server: Temporary files are deleted immediately after the download finishes.",
  "High quality formats: Download full HD, 4K, or convert audio to MP3 using FFmpeg.",
  "Live progress updates: Watch the download speed, percentage, and time left in real time.",
  "Password protected: Completely locked with a secret key so only I can use it.",
  "In-app cookie updater: Quickly update YouTube cookies right from the browser whenever bot checks appear.",
] as const

const techStack = [
  "Next.js 16 with App Router",
  "React 19 & TypeScript",
  "yt-dlp for video extraction",
  "FFmpeg for audio & video conversion",
  "Render Cloud for hosting",
  "Tailwind CSS for clean UI",
] as const

export const metadata: Metadata = buildPageMetadata({
  title: youtubeDownloaderPageTitle,
  description: youtubeDownloaderPageDescription,
  canonicalPath: "/projects/youtube-downloader",
  keywords: youtubeDownloaderSeoKeywords,
  openGraph: {
    title: "YouTube Video Downloader — Private Tool Built by Tayyab",
    description: youtubeDownloaderPageDescription,
  },
  ogImage: {
    url: projectImageUrl(youtubeDownloaderProject.image),
    alt: youtubeDownloaderProject.imageAlt,
    width: 1280,
    height: 714,
    type: "image/jpeg",
  },
  twitter: {
    title: "YouTube Video Downloader — Built by Tayyab",
    description: youtubeDownloaderPageDescription,
  },
})

export default function YoutubeDownloaderProjectPage() {
  const breadcrumbJsonLd = buildPortfolioProjectBreadcrumbJsonLd(
    SITE_URL,
    youtubeDownloaderProject,
  )

  return (
    <>
      <ProjectWarmup />
      <JsonLd
        data={buildPortfolioProjectSoftwareApplicationJsonLd(
          youtubeDownloaderProject,
          SITE_URL,
        )}
      />
      {breadcrumbJsonLd ? <JsonLd data={breadcrumbJsonLd} /> : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/projects/youtube-downloader`,
          name: youtubeDownloaderPageTitle,
          description: youtubeDownloaderPageDescription,
          url: `${SITE_URL}/projects/youtube-downloader`,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "Tayyab — Full Stack Developer",
          },
          about: { "@id": `${SITE_URL}/projects/youtube-downloader` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: projectImageUrl(youtubeDownloaderProject.image),
            caption: youtubeDownloaderProject.imageAlt,
          },
        }}
      />

      <article className="relative mx-auto max-w-3xl px-5 py-24 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          All projects
        </Link>

        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-xs font-semibold tracking-[0.2em] text-violet-300/80 uppercase">
            Personal project
          </p>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/25 bg-amber-500/10 px-2.5 py-0.5 text-[0.7rem] font-medium text-amber-300">
            <Lock className="size-3" aria-hidden="true" />
            Private deployment · Password Protected
          </span>
        </div>

        <h1 className="mt-3 text-[clamp(1.85rem,5vw,2.75rem)] font-bold tracking-tight text-white">
          YouTube Video &amp; Audio Downloader
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.85]">
          A clean and fast web app to download YouTube videos and audio in high quality.
          Built with Next.js 16, TypeScript, yt-dlp, and FFmpeg. Runs in the cloud with
          real-time progress tracking, low memory usage, and full password protection.
        </p>

        {/* Live Deployment Notice */}
        <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/[0.07] p-5 backdrop-blur-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
              <Server className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-sm font-semibold tracking-wide text-white uppercase sm:text-base">
                Live Deployment (Private Access Only)
              </h2>
              <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                This app is running live at{" "}
                <a
                  href={YOUTUBE_DOWNLOADER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-amber-300 underline underline-offset-2 hover:text-amber-200"
                >
                  downloader.thisistayyab.dev
                </a>
                . Because public downloaders can violate YouTube terms and waste bandwidth,
                the entire site is password-protected. Only authorized users with the
                password can log in and use it.
              </p>
            </div>
          </div>
        </div>

        {/* Preview Image */}
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
          <OptimizedPicture
            src={youtubeDownloaderProject.image}
            alt={youtubeDownloaderProject.imageAlt}
            title={youtubeDownloaderProject.imageTitle}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* YouTube & Google Policies Section */}
        <section
          className="mt-12 rounded-2xl border border-cyan-500/20 bg-cyan-950/20 p-6 sm:p-7"
          aria-labelledby="legal-policy-heading"
        >
          <div className="flex items-center gap-2.5 text-cyan-300">
            <Scale className="size-5 shrink-0" />
            <h2 id="legal-policy-heading" className="text-lg font-bold tracking-tight text-white">
              Following YouTube &amp; Google Policies
            </h2>
          </div>

          <div className="mt-4 space-y-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
            <p>
              I built this project with clear rules to respect Google and YouTube terms:
            </p>

            <div className="space-y-3 rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-start gap-2.5">
                <Lock className="mt-0.5 size-4 shrink-0 text-amber-400" />
                <p>
                  <strong className="text-white">Why it is password protected:</strong>{" "}
                  YouTube’s Terms of Service do not allow public automated downloading.
                  Public download tools get IP-blocked and cause heavy server abuse.
                  Locking this app with a secret password ensures it stays private and cannot
                  be abused by the public.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <p>
                  <strong className="text-white">No videos saved on the server:</strong>{" "}
                  The server never stores or hosts videos. While processing, the file is temporarily
                  streamed to your browser and immediately deleted from the server once
                  the download finishes.
                </p>
              </div>

              <div className="flex items-start gap-2.5">
                <Zap className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                <p>
                  <strong className="text-white">Made for personal use and backups:</strong>{" "}
                  This tool is meant for personal backups — like saving copies of my own uploaded
                  videos, public domain content, or educational research under fair use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mt-10" aria-labelledby="downloader-features-heading">
          <h2
            id="downloader-features-heading"
            className="text-lg font-semibold text-white"
          >
            How It Works
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            {keyFeatures.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-400/80"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Stack */}
        <section className="mt-10" aria-labelledby="downloader-stack-heading">
          <h2 id="downloader-stack-heading" className="text-lg font-semibold text-white">
            Stack
          </h2>
          <ul
            className="mt-4 flex flex-wrap gap-2"
            aria-label="YouTube Downloader technologies"
          >
            {youtubeDownloaderProject.tags.map((tag) => (
              <li key={tag.label}>
                <span
                  className={
                    tag.variant === "feature"
                      ? "rounded-full border border-cyan-500/35 bg-cyan-500/[0.06] px-3 py-1 text-sm font-medium text-cyan-300/90"
                      : "rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-sm font-medium text-slate-300"
                  }
                >
                  {tag.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies List */}
        <section className="mt-10" aria-labelledby="downloader-tech-heading">
          <h2 id="downloader-tech-heading" className="text-lg font-semibold text-white">
            Technologies Used
          </h2>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400 sm:text-base">
            {techStack.map((tech) => (
              <li key={tech} className="flex gap-3">
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan-400/80"
                  aria-hidden="true"
                />
                {tech}
              </li>
            ))}
          </ul>
        </section>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={YOUTUBE_DOWNLOADER_REPO}
            target="_blank"
            rel="noopener noreferrer"
            title="View source code on GitHub"
            className={cn(ctaPrimaryClassName, "text-[0.88rem] px-5 py-3 inline-flex items-center gap-2")}
          >
            <RiGithubFill className="size-4.5" aria-hidden="true" />
            View Source Code (GitHub)
          </a>

          <a
            href={YOUTUBE_DOWNLOADER_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open deployed application (Password Protected)"
            className={cn(
              ctaSecondaryClassName,
              "text-[0.88rem] px-5 py-3 inline-flex items-center gap-1.5",
            )}
          >
            Live App (Locked)
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-slate-500">
          Built and maintained by Tayyab as a private, high-performance media utility.
        </p>

        <div className="mt-10 flex justify-center">
          <CtaLink href="/projects" title="View all portfolio projects">
            View all projects
            <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
          </CtaLink>
        </div>
      </article>
    </>
  )
}
