import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { GlassSurface } from "@/components/site/glass-surface"
import type { GlassRim } from "@/components/site/site-styles"
import { contentCardClassName, statIconClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

export type ServicePreview = {
  slug: string
  title: string
  tagline: string
  icon: LucideIcon
  rim: GlassRim
}

type ServicePreviewCardProps = {
  service: ServicePreview
}

export function ServicePreviewCard({ service }: ServicePreviewCardProps) {
  const Icon = service.icon

  return (
    <Link
      href="/services"
      className={cn(
        contentCardClassName,
        "group flex h-full flex-col rounded-xl border border-white/10 p-4 no-underline sm:p-5",
      )}
    >
      <GlassSurface
        as="span"
        rim={service.rim}
        className={cn(statIconClassName(service.rim), "mb-3 size-10 rounded-lg")}
        aria-hidden="true"
      >
        <Icon className="relative z-[1] size-5" strokeWidth={2} />
      </GlassSurface>
      <h3 className="text-sm font-semibold leading-snug text-white group-hover:text-violet-200 sm:text-[0.95rem]">
        {service.title}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500">{service.tagline}</p>
    </Link>
  )
}
