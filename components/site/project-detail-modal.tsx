"use client"

import { ExternalLink, Lock, ShieldAlert, X } from "lucide-react"
import Link from "next/link"
import { RiGithubFill } from "react-icons/ri"
import { useEffect } from "react"

import type { PortfolioProject } from "@/components/site/project-card"
import { OptimizedPicture } from "@/components/site/optimized-picture"
import { ctaPrimaryClassName } from "@/components/site/site-styles"
import { SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

type ProjectDetailModalProps = {
  project: PortfolioProject | null
  onClose: () => void
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-[rgba(6,8,14,0.88)] p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      aria-describedby="project-modal-description"
    >
      <article
        className={cn(
          "relative max-h-[90vh] w-full max-w-[720px] overflow-y-auto rounded-2xl border border-white/10",
          "bg-[rgba(14,16,24,0.96)] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_40px_rgba(59,130,246,0.12)] sm:p-8",
        )}
        onClick={(event) => event.stopPropagation()}
        itemScope
        itemType="https://schema.org/SoftwareApplication"
      >
        <button
          type="button"
          className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/20 hover:bg-white/10"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X className="size-5" aria-hidden="true" />
        </button>

        <div className="relative mb-6 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
          <OptimizedPicture
            src={project.image}
            alt={project.imageAlt}
            title={project.imageTitle}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            itemProp="image"
          />
        </div>

        <h2
          id="project-modal-title"
          className="pr-10 text-2xl font-bold text-white sm:text-3xl"
          itemProp="name"
        >
          {project.name}
        </h2>


        <p
          id="project-modal-description"
          className="mt-4 text-base leading-relaxed text-slate-400"
          itemProp="description"
        >
          {project.description}
        </p>

        <link
          itemProp="url"
          href={
            project.ctaDisabled ? `${SITE_URL}/projects#${project.slug}` : project.link || `${SITE_URL}/projects#${project.slug}`
          }
        />

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-semibold tracking-[0.14em] text-slate-500 uppercase">
            Stack &amp; highlights
          </h3>
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
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
        </div>


        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.githubUrl && project.hideCardLiveLink ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${project.name} on GitHub`}
              className={cn(ctaPrimaryClassName, "inline-flex items-center gap-2 text-[0.88rem] px-5 py-3")}
            >
              <RiGithubFill className="size-4.5" aria-hidden="true" />
              Source Code (GitHub)
            </a>
          ) : null}

          {!project.hideCardLiveLink && (project.ctaDisabled || project.link) ? (
            project.ctaDisabled ? (
              <button
                type="button"
                disabled
                title={
                  project.ctaDisabledReason ??
                  "This client application is internal and not available to the public."
                }
                aria-label={`${project.ctaLabel} — unavailable, internal client application`}
                className={cn(
                  ctaPrimaryClassName,
                  "inline-flex cursor-not-allowed opacity-45 saturate-50",
                  "hover:translate-y-0 hover:shadow-[0_10px_30px_rgba(99,102,241,0.35),0_0_40px_rgba(59,130,246,0.18)]",
                )}
              >
                {project.ctaLabel}
                <ExternalLink className="size-4" aria-hidden="true" />
              </button>
            ) : (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title={`Open ${project.name}`}
                className={cn(ctaPrimaryClassName, "inline-flex")}
              >
                {project.ctaLabel}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            )
          ) : null}

          {project.githubUrl && !project.hideCardLiveLink ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${project.name} on GitHub`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[0.88rem] font-medium text-white transition hover:border-white/30 hover:bg-white/10"
            >
              <RiGithubFill className="size-4" aria-hidden="true" />
              Source Code (GitHub)
            </a>
          ) : null}

          {project.detailPath ? (
            <Link
              href={project.detailPath}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[0.88rem] font-medium text-slate-300 transition hover:border-white/30 hover:text-white hover:bg-white/10"
            >
              Read Full Case Study
            </Link>
          ) : null}
        </div>
      </article>
    </div>
  )
}
