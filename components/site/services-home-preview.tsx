import { ArrowRight } from "lucide-react"

import { CtaLink } from "@/components/site/cta-link"
import { ServicePreviewCard } from "@/components/site/service-preview-card"
import type { PortfolioService } from "@/components/site/service-card"

const HOME_PREVIEW_COUNT = 4

type ServicesHomePreviewProps = {
  services: PortfolioService[]
}

export function ServicesHomePreview({ services }: ServicesHomePreviewProps) {
  const preview = services.slice(0, HOME_PREVIEW_COUNT)

  return (
    <section
      id="services"
      className="relative mx-auto max-w-[1200px] scroll-mt-28 px-5 py-14 sm:px-6 lg:scroll-mt-32 lg:px-4 lg:py-16"
      aria-labelledby="home-services-heading"
    >
      <div
        className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-[90px]"
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
            Services
          </p>
          <h2
            id="home-services-heading"
            className="text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.2] font-bold tracking-tight text-white"
          >
            Software I ship for{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              clients
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
            Full stack delivery across SaaS, platforms, APIs, and AI automation. Scope, process,
            and FAQ on the services page.
          </p>
        </div>

        <ul
          className="grid list-none grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
          role="list"
          aria-label="Featured full stack development services"
        >
          {preview.map((service) => (
            <li key={service.slug} className="list-none">
              <ServicePreviewCard service={service} />
            </li>
          ))}
        </ul>

        <div className="mt-8 flex justify-center">
          <CtaLink href="/services" title="View all full stack development services">
            All services
            <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
          </CtaLink>
        </div>
      </div>
    </section>
  )
}
