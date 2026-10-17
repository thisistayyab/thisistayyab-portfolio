import { ArrowRight, Briefcase, ExternalLink, Map, Rocket, type LucideIcon } from "lucide-react"
import Link from "next/link"

import { CtaLink } from "@/components/site/cta-link"
import { GlassSurface, type GlassRim } from "@/components/site/glass-surface"
import { contentCardClassName, statIconClassName } from "@/components/site/site-styles"
import { pageFragmentId } from "@/lib/json-ld-ids"
import { cn } from "@/lib/utils"

export type ExperienceIcon = "rocket" | "briefcase" | "compass"

export type CareerMilestone = {
  id: string
  slug: string
  kind: "freelance" | "client" | "vision"
  /** When client work was sourced through a platform (e.g. Upwork). */
  viaPlatform?: string
  phase: string
  roadmapYear: string
  roleTitle: string
  organization: string
  organizationUrl?: string
  periodLabel: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  platformLabel: string
  summary: string
  description: string
  responsibilities?: readonly string[]
  outcomes?: readonly string[]
  skills: readonly string[]
  rim: GlassRim
  accentBorderClass: string
  icon: ExperienceIcon
}

const milestoneIcons: Record<ExperienceIcon, LucideIcon> = {
  rocket: Rocket,
  briefcase: Briefcase,
  compass: Map,
}

function MilestoneIcon({ icon, rim, className }: { icon: ExperienceIcon; rim: GlassRim; className?: string }) {
  const Icon = milestoneIcons[icon]
  return (
    <span className={cn(statIconClassName(rim), "size-11 shrink-0 rounded-xl sm:size-12", className)} aria-hidden="true">
      <Icon className="size-5" strokeWidth={2} />
    </span>
  )
}

function RoadmapNode({
  milestone,
  compact,
  variant = "full",
}: {
  milestone: CareerMilestone
  compact?: boolean
  variant?: "full" | "preview"
}) {
  const isPreview = variant === "preview"
  const headingId = `roadmap-${milestone.slug}-title`

  return (
    <article
      id={`experience-${milestone.slug}`}
      aria-labelledby={headingId}
      itemScope
      itemType={
        milestone.kind === "vision"
          ? "https://schema.org/CreativeWork"
          : "https://schema.org/OrganizationRole"
      }
      className={cn("group/card relative isolate flex h-full flex-col", compact && "opacity-90")}
    >
      {milestone.kind !== "vision" ? (
        <>
          <meta itemProp="startDate" content={milestone.startDate} />
          {milestone.endDate ? <meta itemProp="endDate" content={milestone.endDate} /> : null}
        </>
      ) : null}

      <GlassSurface
        rim={milestone.rim}
        className={cn(
          contentCardClassName,
          "flex h-full flex-1 flex-col rounded-2xl border border-white/10 border-l-[3px]",
          milestone.accentBorderClass,
          compact ? "p-5 sm:p-6" : "p-6 sm:p-8",
          milestone.kind === "vision" && "border-dashed border-l-violet-400/50 bg-[rgba(8,12,26,0.55)]",
          milestone.kind === "client" && "border-l-amber-500/70 bg-[rgba(12,10,8,0.4)]",
        )}
      >
        <div className="flex gap-3 sm:gap-4">
          <MilestoneIcon icon={milestone.icon} rim={milestone.rim} className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-slate-400 uppercase">
              {milestone.phase}
            </p>
            <h3
              id={headingId}
              className={cn(
                "mt-1 font-semibold tracking-tight text-white",
                compact ? "text-lg" : "text-xl sm:text-2xl",
              )}
              itemProp={milestone.kind === "vision" ? "name" : "roleName"}
            >
              {milestone.roleTitle}
            </h3>
            {milestone.kind !== "vision" ? (
              <div className="mt-1">
                <p
                  className="text-sm text-slate-300"
                  itemProp="memberOf"
                  itemScope
                  itemType="https://schema.org/Organization"
                >
                  {milestone.organizationUrl ? (
                    <Link
                      href={milestone.organizationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-1 break-words hover:text-white"
                      itemProp="url"
                    >
                      <span itemProp="name">{milestone.organization}</span>
                      <ExternalLink className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span itemProp="name">{milestone.organization}</span>
                  )}
                </p>
                {milestone.viaPlatform ? (
                  <p className="mt-1 text-xs text-amber-200/75">
                    Contract delivered via {milestone.viaPlatform}
                  </p>
                ) : null}
              </div>
            ) : (
              <p className="mt-1 text-sm text-violet-200/90">{milestone.organization}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {milestone.isCurrent ? (
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/35 bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-emerald-300 uppercase">
                  <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.75)]" />
                  Current
                </span>
              ) : null}
              {milestone.kind === "client" ? (
                <span className="inline-flex shrink-0 rounded-full border border-amber-500/35 bg-amber-500/10 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-amber-200/90 uppercase">
                  Confidential
                </span>
              ) : null}
              <time
                className="inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] leading-snug text-slate-400"
                dateTime={milestone.startDate}
              >
                {milestone.periodLabel}
              </time>
            </div>
          </div>
        </div>

        {!compact ? (
          <>
            <p className="mt-5 text-sm leading-[1.8] text-slate-400 sm:text-[0.95rem]" itemProp="description">
              {isPreview ? milestone.summary : milestone.description}
            </p>

            {!isPreview && milestone.responsibilities && milestone.responsibilities.length > 0 ? (
              <div className="mt-6 border-t border-white/8 pt-5">
                <h4 className="mb-3 text-xs font-semibold tracking-[0.12em] text-slate-300 uppercase">
                  Responsibilities
                </h4>
                <ul className="space-y-2.5">
                  {milestone.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-slate-400 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-indigo-400/90 before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {!isPreview && milestone.outcomes && milestone.outcomes.length > 0 ? (
              <div className="mt-5">
                <h4 className="mb-3 text-xs font-semibold tracking-[0.12em] text-slate-300 uppercase">
                  Highlights
                </h4>
                <ul className="space-y-2.5">
                  {milestone.outcomes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-slate-400 before:mt-2 before:size-1.5 before:shrink-0 before:rounded-full before:bg-violet-400/80 before:content-['']"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label={`Skills at ${milestone.organization}`}>
              {milestone.skills.map((skill) => (
                <li key={skill}>
                  <span className="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.05em] text-slate-300 uppercase">
                    {skill}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-2">{milestone.summary}</p>
        )}
      </GlassSurface>
    </article>
  )
}

type ExperienceRoadmapProps = {
  milestones: CareerMilestone[]
  listLabel?: string
}

export function ExperienceRoadmap({
  milestones,
  listLabel = "Career roadmap — newest to oldest",
}: ExperienceRoadmapProps) {
  return (
    <ol className="relative mx-auto max-w-3xl list-none md:max-w-none" aria-label={listLabel}>
      <div
        className="pointer-events-none absolute top-2 bottom-2 left-[calc(0.85rem+1.25rem)] w-px -translate-x-1/2 bg-gradient-to-b from-violet-400/90 via-indigo-500/45 to-slate-600/25 md:left-1/2"
        aria-hidden="true"
      />

      {milestones.map((milestone, index) => {
        const isLatest = index === 0
        const onRight = index % 2 === 0

        return (
          <li
            key={milestone.id}
            className={cn(
              "relative list-none pb-14 last:pb-0 md:pb-20",
              "md:grid md:grid-cols-2 md:gap-x-12",
            )}
          >
            <div
              className={cn(
                "absolute top-9 z-[2] flex size-10 -translate-x-1/2 items-center justify-center rounded-full border-2 md:top-10",
                "left-[calc(0.85rem+1.25rem)] md:left-1/2",
                isLatest
                  ? "border-violet-400 bg-violet-500/25 shadow-[0_0_28px_rgba(139,92,246,0.5)]"
                  : milestone.kind === "vision"
                    ? "border-violet-500/35 bg-[rgba(8,12,26,0.95)]"
                    : milestone.kind === "client"
                      ? "border-amber-500/40 bg-[rgba(12,10,8,0.95)]"
                      : "border-white/20 bg-[rgba(8,12,26,0.95)]",
              )}
              aria-hidden="true"
            >
              <span
                className={cn(
                  "size-2.5 rounded-full",
                  isLatest
                    ? "bg-violet-200"
                    : milestone.kind === "vision"
                      ? "bg-violet-500/45"
                      : milestone.kind === "client"
                        ? "bg-amber-400/70"
                        : "bg-slate-400",
                )}
              />
            </div>

            <div
              className={cn(
                "mb-4 hidden items-center gap-3 md:mb-0 md:flex md:min-h-[5.5rem] md:flex-col md:justify-center",
                onRight ? "md:col-start-1 md:items-end md:pr-8 md:text-right" : "md:col-start-2 md:items-start md:pl-8",
              )}
            >
              <span
                className={cn(
                  "font-mono text-2xl font-bold tracking-tight sm:text-3xl",
                  isLatest ? "text-violet-300" : "text-white/20",
                )}
              >
                {milestone.roadmapYear}
              </span>
              <span className="text-[0.65rem] font-semibold tracking-[0.12em] text-slate-500 uppercase md:max-w-[10rem]">
                {milestone.platformLabel}
              </span>
            </div>

            <div
              className={cn(
                "min-w-0 pl-11 sm:pl-12 md:pl-0",
                onRight ? "md:col-start-2 md:pl-8" : "md:col-start-1 md:pr-8",
              )}
            >
              <p className="mb-2 font-mono text-sm font-semibold text-violet-300/90 md:hidden">
                {milestone.roadmapYear}
              </p>
              <RoadmapNode milestone={milestone} />
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function RoadmapPreviewTimeline({ milestones }: { milestones: CareerMilestone[] }) {
  return (
    <ol className="relative list-none space-y-4" aria-label="Earlier career milestones">
      <div
        className="pointer-events-none absolute top-3 bottom-3 left-[calc(1.125rem/2)] w-px -translate-x-1/2 bg-gradient-to-b from-indigo-500/60 to-slate-600/20"
        aria-hidden="true"
      />
      {milestones.map((milestone) => (
        <li key={milestone.id} className="grid list-none grid-cols-[1.125rem_minmax(0,1fr)] items-center gap-3">
          <div className="flex justify-center">
            <span
              className="relative z-[1] flex size-[1.125rem] shrink-0 items-center justify-center rounded-full border border-white/15 bg-[rgba(8,12,26,0.95)]"
              aria-hidden="true"
            >
              <span className="size-1.5 rounded-full bg-slate-500" />
            </span>
          </div>
          <div className="min-w-0 rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-[border-color] duration-300 hover:border-white/15">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-mono text-xs text-violet-300/85">{milestone.roadmapYear}</p>
                <p className="mt-1 text-sm font-semibold text-white">{milestone.roleTitle}</p>
                <p className="text-xs text-slate-400">{milestone.organization}</p>
                {milestone.viaPlatform ? (
                  <p className="mt-0.5 text-[0.65rem] text-amber-200/70">Via {milestone.viaPlatform}</p>
                ) : null}
              </div>
              <span className="flex shrink-0 flex-wrap justify-end gap-1">
                {milestone.isCurrent ? (
                  <span className="text-[0.6rem] font-semibold text-emerald-300/90 uppercase">Current</span>
                ) : null}
                {milestone.kind === "client" ? (
                  <span className="text-[0.6rem] font-semibold text-amber-200/80 uppercase">Confidential</span>
                ) : null}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

type ExperienceHomePreviewProps = {
  latestMilestone: CareerMilestone
  upcomingMilestones: CareerMilestone[]
}

export function ExperienceHomePreview({
  latestMilestone,
  upcomingMilestones,
}: ExperienceHomePreviewProps) {
  return (
    <section
      id="experience"
      className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-6 lg:px-4"
      aria-labelledby="home-experience-heading"
    >
      <div
        className="pointer-events-none absolute top-12 left-1/2 h-72 w-[min(100%,720px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.14),transparent_68%)]"
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-violet-300/80 uppercase">
            Experience
          </p>
          <h2
            id="home-experience-heading"
            className="mx-auto max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-white"
          >
            <span className="block">
              Current role &{" "}
              <span className="whitespace-nowrap bg-gradient-to-r from-purple-400 via-violet-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent">
                career roadmap
              </span>
            </span>
          </h2>
          <div className="mx-auto mt-6 mb-6 h-px w-12 bg-white/15" aria-hidden="true" />
          <p className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
            Where I work today — freelance and contract full stack delivery for global clients,
            plus production web products shipped end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex min-h-0 flex-col">
            <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.14em] text-emerald-300/90 uppercase">
              Most recent role
            </p>
            <div className="flex flex-1 flex-col [&_article]:flex [&_article]:h-full [&_article]:flex-1">
              <RoadmapNode milestone={latestMilestone} variant="preview" />
            </div>
          </div>

          <div className="flex min-h-0 flex-col">
            <p className="mb-3 text-[0.68rem] font-semibold tracking-[0.14em] text-slate-400 uppercase">
              Roadmap preview
            </p>
            <GlassSurface
              rim="blue"
              className={cn(
                contentCardClassName,
                "flex h-full flex-1 flex-col rounded-2xl border border-white/10 p-5 sm:p-6",
              )}
            >
              <div className="flex flex-1 flex-col justify-center">
                <RoadmapPreviewTimeline milestones={upcomingMilestones} />
              </div>
              <p className="mt-5 shrink-0 border-t border-white/8 pt-4 text-center text-xs text-slate-500">
                Includes the 2023 full stack foundation on the full roadmap
              </p>
            </GlassSurface>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <CtaLink
            href="/experience"
            title="View Tayyab's complete full stack developer career roadmap and work history"
          >
            View full career roadmap
            <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
          </CtaLink>
          <CtaLink
            href="/about"
            variant="secondary"
            title="Read Tayyab's full stack developer background and story"
          >
            About Tayyab
          </CtaLink>
        </div>
      </div>
    </section>
  )
}

export function experienceListId(siteUrl: string, pagePath: string) {
  return pageFragmentId(siteUrl, pagePath === "/" ? "/" : "/experience", "career-roadmap")
}

export function buildExperienceItemListJsonLd(
  milestones: CareerMilestone[],
  siteUrl: string,
  pagePath: string,
) {
  const baseId = experienceListId(siteUrl, pagePath)

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": baseId,
    name: "Tayyab Full Stack Developer Career Roadmap",
    description:
      "Professional experience of Tayyab: freelance and contract full stack delivery for global clients, production web products including Tillqorin POS, AuditBloc, and Taylance CRM, and confidential Upwork contract work for Order AI LLC.",
    numberOfItems: milestones.filter((m) => m.kind !== "vision").length,
    itemListElement: milestones
      .filter((m) => m.kind !== "vision")
      .map((milestone, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "OrganizationRole",
          "@id": `${siteUrl}/experience#${milestone.id}`,
          roleName: milestone.roleTitle,
          description: milestone.description,
          startDate: milestone.startDate,
          ...(milestone.endDate ? { endDate: milestone.endDate } : {}),
          memberOf: {
            "@type": "Organization",
            name: milestone.organization,
            ...(milestone.organizationUrl ? { url: milestone.organizationUrl } : {}),
          },
        },
      })),
  }
}

export function buildExperienceWebPageJsonLd(
  siteUrl: string,
  pageTitle: string,
  pageDescription: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/experience`,
    name: pageTitle,
    description: pageDescription,
    url: `${siteUrl}/experience`,
    isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: `${siteUrl}/`, name: "Tayyab — Full Stack Developer" },
    about: {
      "@type": "Person",
      "@id": `${siteUrl}/about`,
      name: "Tayyab",
      jobTitle: "Full Stack Web Developer",
      url: `${siteUrl}/about`,
    },
    mainEntity: { "@id": experienceListId(siteUrl, "/experience") },
  }
}
