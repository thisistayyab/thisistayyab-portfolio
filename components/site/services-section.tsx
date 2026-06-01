import { NavCtaLink } from "@/components/site/cta-link"
import { NavOrb } from "@/components/site/nav-orb"
import { ServiceCard, type PortfolioService } from "@/components/site/service-card"
import { contentCardClassName, navGlassClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

const engagementSteps = [
  {
    step: "01",
    title: "Scope & timeline",
    detail: "We agree on goals, stack, milestones, and what done looks like for each phase.",
  },
  {
    step: "02",
    title: "Build & review",
    detail: "You get regular updates and review points, not weeks of silence.",
  },
  {
    step: "03",
    title: "Launch & support",
    detail: "Deploy to production, document what was built, and plan fixes after go-live.",
  },
] as const

type ServicesSectionProps = {
  services: PortfolioService[]
  showEngagement?: boolean
  className?: string
}

export function ServicesSection({
  services,
  showEngagement = false,
  className,
}: ServicesSectionProps) {
  return (
    <section
      className={cn(
        "relative mx-auto max-w-[1200px] scroll-mt-28 px-5 pb-20 sm:px-6 lg:px-4",
        className,
      )}
      aria-labelledby="services-grid-heading"
    >
      <h2 id="services-grid-heading" className="sr-only">
        Full stack software development services offered by Tayyab
      </h2>

      <ul
        className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        role="list"
      >
        {services.map((service) => (
          <li key={service.slug} className="list-none">
            <ServiceCard service={service} contactHref="/contact" />
          </li>
        ))}
      </ul>

      {showEngagement && (
        <div className="mt-16">
          <h3 className="text-center text-lg font-semibold text-white sm:text-xl">
            How engagements work
          </h3>
          <ol className="mt-8 grid list-none grid-cols-1 gap-4 sm:grid-cols-3">
            {engagementSteps.map((item) => (
              <li key={item.step}>
                <div
                  className={cn(
                    navGlassClassName,
                    contentCardClassName,
                    "h-full rounded-2xl border border-white/10 p-5",
                  )}
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-violet-300/80">
                    {item.step}
                  </span>
                  <p className="mt-2 font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <NavCtaLink href="/contact" title="Contact Tayyab to hire a full stack web developer">
          <NavOrb />
          <span>Start a project</span>
        </NavCtaLink>
      </div>
    </section>
  )
}
