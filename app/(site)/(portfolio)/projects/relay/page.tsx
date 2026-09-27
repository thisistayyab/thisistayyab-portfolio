import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react"
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
  RELAY_REPO,
  RELAY_URL,
  relayPageDescription,
  relayPageTitle,
  relayProject,
  relaySeoKeywords,
} from "@/lib/data/relay-project"
import {
  buildPortfolioProjectBreadcrumbJsonLd,
  buildPortfolioProjectSoftwareApplicationJsonLd,
} from "@/lib/portfolio-project-json-ld"
import { buildPageMetadata } from "@/lib/site-metadata"
import { projectImageUrl, SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const highlights = [
  "Instant peer-to-peer file transfer up to 100 MB directly between browser tabs using WebRTC",
  "Zero accounts or logins required — no phone numbers, personal credentials, or passwords",
  "Real-time shared notepad with live keystroke synchronization powered by Socket.IO",
  "True privacy: files flow directly device-to-device and never get saved on any server database",
  "Leave no trace: closing the browser tab leaves zero active sessions or cached personal data on public computers",
  "Fast room pairing via simple 6-digit room codes or shareable direct URLs",
] as const

const techStack = [
  "React and Tailwind CSS for a fast, responsive user interface",
  "WebRTC Data Channels for direct, encrypted browser-to-browser file transfers",
  "Socket.IO and WebSockets for real-time notepad text synchronization",
  "Node.js and Express for room coordination and WebRTC signaling",
  "Render Cloud for lightweight, reliable hosting",
] as const

export const metadata: Metadata = buildPageMetadata({
  title: relayPageTitle,
  description: relayPageDescription,
  canonicalPath: "/projects/relay",
  keywords: relaySeoKeywords,
  openGraph: {
    title: "Relay — Real-Time Text & P2P File Transfer | Built by Tayyab",
    description: relayPageDescription,
  },
  ogImage: {
    url: projectImageUrl(relayProject.image),
    alt: relayProject.imageAlt,
    width: 1280,
    height: 720,
    type: "image/webp",
  },
  twitter: {
    title: "Relay — Built by Tayyab",
    description: relayPageDescription,
  },
})

export default function RelayProjectPage() {
  const breadcrumbJsonLd = buildPortfolioProjectBreadcrumbJsonLd(
    SITE_URL,
    relayProject,
  )

  return (
    <>
      <JsonLd
        data={buildPortfolioProjectSoftwareApplicationJsonLd(
          relayProject,
          SITE_URL,
        )}
      />
      {breadcrumbJsonLd ? <JsonLd data={breadcrumbJsonLd} /> : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/projects/relay`,
          name: relayPageTitle,
          description: relayPageDescription,
          url: `${SITE_URL}/projects/relay`,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            url: SITE_URL,
            name: "Tayyab — Full Stack Developer",
          },
          about: { "@id": `${SITE_URL}/projects/relay` },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: projectImageUrl(relayProject.image),
            caption: relayProject.imageAlt,
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

        <p className="text-xs font-semibold tracking-[0.2em] text-violet-300/80 uppercase">
          Personal project · Open source
        </p>

        <h1 className="mt-3 text-[clamp(1.85rem,5vw,2.75rem)] font-bold tracking-tight text-white">
          Relay — Real-Time Text &amp; P2P File Sharing
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.85]">
          A privacy-first collaboration web app featuring live shared notepad sync and
          direct peer-to-peer file transfer up to 100 MB via WebRTC data channels.
          No accounts, no logins, and zero files stored on servers.
        </p>

        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
          <OptimizedPicture
            src={relayProject.image}
            alt={relayProject.imageAlt}
            title={relayProject.imageTitle}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        {/* The Motivation / Origin Story */}
        <section className="mt-10" aria-labelledby="relay-story-heading">
          <h2 id="relay-story-heading" className="text-lg font-semibold text-white">
            Why I built Relay
          </h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            <p>
              Whenever I worked on public computers in university labs or library
              terminals, I ran into the same frustrating barrier: I needed to transfer
              a piece of code, a lecture note, or a file between the lab machine and
              my own phone or laptop.
            </p>
            <p>
              The default solution for most students was scanning a QR code to open
              WhatsApp Web or logging into personal email. But doing that on a public
              machine always felt uncomfortable. Shared computers carry real privacy
              risks: people forget to log out, keyloggers can capture credentials,
              browser history syncs personal data, and anyone nearby can see private
              chats on a large monitor.
            </p>
            <p>
              I didn&apos;t feel good exposing my personal accounts just to send a quick
              file. So I built Relay to solve it: open a clean URL, pair devices in
              seconds with a short room code, paste text or drop a file, and close the
              tab. No phone number, no login, and zero traces left behind.
            </p>
          </div>
        </section>

        {/* Highlights */}
        <section className="mt-10" aria-labelledby="relay-highlights-heading">
          <h2 id="relay-highlights-heading" className="text-lg font-semibold text-white">
            What I built
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
            {highlights.map((item) => (
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
        <section className="mt-10" aria-labelledby="relay-stack-heading">
          <h2 id="relay-stack-heading" className="text-lg font-semibold text-white">
            Stack
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Relay technologies">
            {relayProject.tags.map((tag) => (
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
        <section className="mt-10" aria-labelledby="relay-tech-heading">
          <h2 id="relay-tech-heading" className="text-lg font-semibold text-white">
            Technologies I used
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
            href={RELAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Relay live web application"
            className={cn(ctaPrimaryClassName, "text-[0.88rem] px-5 py-3")}
          >
            Live view
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>

          <a
            href={RELAY_REPO}
            target="_blank"
            rel="noopener noreferrer"
            title="View source code on GitHub"
            className={cn(
              ctaSecondaryClassName,
              "text-[0.88rem] px-5 py-3 inline-flex items-center gap-2",
            )}
          >
            <RiGithubFill className="size-4.5" aria-hidden="true" />
            Source code (GitHub)
          </a>
        </div>

        <p className="mt-8 text-sm leading-relaxed text-slate-500">
          I built Relay as a personal utility to solve a real everyday problem. It is
          fully open-source and free for anyone who needs to quickly transfer files and
          notes between devices without compromising their privacy.
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
