import { Check } from "lucide-react"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { GlassSurface } from "@/components/site/glass-surface"
import type { GlassRim } from "@/components/site/site-styles"
import { contentCardClassName, statIconClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

export type PortfolioService = {
  slug: string
  title: string
  tagline: string
  description: string
  features: readonly string[]
  icon: LucideIcon
  rim: GlassRim
}

type ServiceCardProps = {
  service: PortfolioService
  /** Link target for "Discuss this service" */
  contactHref?: string
}

export function ServiceCard({ service, contactHref = "/contact" }: ServiceCardProps) {
  const Icon = service.icon

  return (
    <article
      id={service.slug}
      className={cn(
        contentCardClassName,
        "flex h-full scroll-mt-28 flex-col rounded-2xl border border-white/10 p-6 sm:p-7",
      )}
    >
      <GlassSurface
        as="span"
        rim={service.rim}
        className={cn(statIconClassName(service.rim), "mb-5 size-12 rounded-xl")}
        aria-hidden="true"
      >
        <Icon className="relative z-[1] size-6" strokeWidth={2} />
      </GlassSurface>

      <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">{service.title}</h3>
      <p className="mt-1 text-sm font-medium text-violet-300/80">{service.tagline}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{service.description}</p>

      <ul className="mt-5 list-none space-y-2 border-t border-white/8 pt-5">
        {service.features.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm text-slate-400">
            <Check className="mt-0.5 size-4 shrink-0 text-emerald-400/90" aria-hidden="true" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={contactHref}
        className="mt-6 inline-flex text-sm font-semibold text-violet-300/90 no-underline transition-colors hover:text-violet-200"
      >
        Discuss this service →
      </Link>
    </article>
  )
}
