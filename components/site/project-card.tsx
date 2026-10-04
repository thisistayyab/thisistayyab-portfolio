import { ExternalLink } from "lucide-react"
import { RiGithubFill } from "react-icons/ri"
import Link from "next/link"

import { OptimizedPicture } from "@/components/site/optimized-picture"
import { ctaPrimaryClassName, ctaSecondaryClassName } from "@/components/site/site-styles"
import { projectImageUrl } from "@/lib/site"
import { cn } from "@/lib/utils"

export type ProjectTag = {
  label: string
  variant: "tech" | "feature"
}

export type PortfolioProject = {
  id: number
  slug: string
  name: string
  image: string
  /** Descriptive alt text for accessibility and image SEO. */
  imageAlt: string
  /** Short title for the image element and ImageObject schema name. */
  imageTitle: string
  link: string
  description: string
  tags: ProjectTag[]
  ctaLabel: string
  /** When true, primary CTA is shown disabled (e.g. internal client apps). */
  ctaDisabled?: boolean
  /** Tooltip when the primary CTA is disabled. */
  ctaDisabledReason?: string
  /** Client or company name when it may be shown publicly. */
  client?: string
  /** Shown on card — e.g. client project vs personal work. */
  roleLabel?: string
  /** True when built for a client (no formal contract / unnamed client). */
  isClientWork?: boolean
  /** Indexable project page on this site (e.g. /projects/tillqorin). */
  detailPath?: string
  /** Live product URL, distinct from marketing `link`. */
  appUrl?: string
  alternateName?: string | readonly string[]
  applicationCategory?: string
  publisher?: { name: string; url: string }
  seoKeywords?: readonly string[]
  githubUrl?: string
  deploymentStatus?: string
  complianceNotice?: string
  hideCardLiveLink?: boolean
}

const EXCERPT_LENGTH = 120

function excerpt(text: string) {
  if (text.length <= EXCERPT_LENGTH) return text
  const trimmed = text.slice(0, EXCERPT_LENGTH).trim()
  const lastSpace = trimmed.lastIndexOf(" ")
  const base = lastSpace > 80 ? trimmed.slice(0, lastSpace) : trimmed
  return `${base}…`
}

const PROJECT_CARD_IMAGE_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 320px"

type ProjectCardProps = {
  project: PortfolioProject
  onLearnMore: (project: PortfolioProject) => void
  /** LCP candidates — first row on projects grid. */
  priority?: boolean
}

export function ProjectCard({ project, onLearnMore, priority }: ProjectCardProps) {
  const cardExcerpt = excerpt(project.description)
  const displayTags = project.tags.slice(0, 5)
  const imageAbsoluteUrl = projectImageUrl(project.image)

  return (
    <article
      id={project.slug}
      className={cn(
        "group isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/10",
        "bg-[rgba(8,12,26,0.78)] shadow-[0_8px_32px_rgba(0,0,0,0.18)]",
        "transition-[border-color,box-shadow] duration-300 ease-out",
        "hover:border-white/20",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,0.28),0_0_32px_rgba(59,130,246,0.12)]",
      )}
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      <meta itemProp="applicationCategory" content="WebApplication" />
      <meta itemProp="operatingSystem" content="Web Browser" />

      <div className="relative aspect-[16/10] overflow-hidden bg-[linear-gradient(135deg,#12141c,#1a1d2b)]">
        <meta itemProp="contentUrl" content={imageAbsoluteUrl} />
        <OptimizedPicture
          src={project.image}
          alt={project.imageAlt}
          title={project.imageTitle}
          fill
          sizes={PROJECT_CARD_IMAGE_SIZES}
          priority={priority}
          className="transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.03]"
          itemProp="image"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0c10]/90 via-[#0a0c10]/20 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3
          className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          itemProp="name"
        >
          {project.name}
        </h3>

        {project.roleLabel || project.client ? (
          <p className="mt-1 text-xs font-medium tracking-wide text-violet-300/90 uppercase">
            {[project.roleLabel, project.client].filter(Boolean).join(" · ")}
          </p>
        ) : null}


        <p
          className="mt-2 min-h-[4.75rem] flex-1 text-sm leading-relaxed text-slate-400 line-clamp-3 sm:min-h-[5.1rem] sm:text-[0.95rem] sm:leading-[1.75]"
          title={project.description}
        >
          {cardExcerpt}
        </p>
        <p className="sr-only" itemProp="description">
          {project.description}
        </p>

        <ul
          className="mt-4 flex min-h-8 flex-wrap gap-2"
          aria-label={`${project.name} technologies and features`}
        >
          {displayTags.map((tag) => (
            <li key={tag.label}>
              <span
                className={
                  tag.variant === "feature"
                    ? "rounded-full border border-cyan-500/35 bg-cyan-500/[0.06] px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-cyan-300/90 uppercase"
                    : "rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.08em] text-slate-300 uppercase"
                }
              >
                {tag.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-3">
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
                  "cursor-not-allowed text-[0.88rem] px-5 py-3 opacity-45 saturate-50",
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
                title={`Open ${project.name} — opens in a new tab`}
                aria-label={`Open ${project.name} live site`}
                className={cn(ctaPrimaryClassName, "text-[0.88rem] px-5 py-3")}
                itemProp="url"
              >
                {project.ctaLabel}
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            )
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`View ${project.name} on GitHub — opens in a new tab`}
              aria-label={`Open ${project.name} GitHub repository`}
              className={cn(ctaSecondaryClassName, "text-[0.88rem] px-3.5 py-3 inline-flex items-center gap-1.5")}
            >
              <RiGithubFill className="size-4 shrink-0" aria-hidden="true" />
              <span>Repository</span>
            </a>
          ) : null}
          {project.detailPath ? (
            <Link
              href={project.detailPath}
              className={cn(
                project.hideCardLiveLink ? ctaPrimaryClassName : ctaSecondaryClassName,
                "text-[0.88rem] px-5 py-3"
              )}
              aria-label={`Read full details about ${project.name}`}
            >
              Learn more
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => onLearnMore(project)}
              className={cn(
                project.hideCardLiveLink ? ctaPrimaryClassName : ctaSecondaryClassName,
                "cursor-pointer border-0 text-[0.88rem] px-5 py-3"
              )}
              aria-label={`Read full details about ${project.name}`}
            >
              Learn more
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
