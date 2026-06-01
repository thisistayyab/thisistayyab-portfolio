import { ChevronDown } from "lucide-react"

import { CtaLink } from "@/components/site/cta-link"
import { cn } from "@/lib/utils"

export type FaqItem = {
  question: string
  answer: string
}

export type FaqCta = {
  label: string
  href: string
  title?: string
  variant?: "primary" | "secondary"
}

type FaqSectionProps = {
  headingId: string
  title?: string
  description: string
  items: readonly FaqItem[]
  /** First item open by default for quicker answers without hiding SEO text from crawlers. */
  defaultOpenIndex?: number
  footerLead?: string
  ctas?: readonly FaqCta[]
  className?: string
}

export function FaqSection({
  headingId,
  title = "Frequently asked questions",
  description,
  items,
  defaultOpenIndex = 0,
  footerLead,
  ctas,
  className,
}: FaqSectionProps) {
  return (
    <section className={className} aria-labelledby={headingId}>
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <h2 id={headingId} className="text-2xl font-bold text-white">
          {title}
        </h2>
        <p className="mt-2 text-slate-400">{description}</p>

        <div className="mt-8 divide-y divide-white/10 border-t border-white/10">
          {items.map((item, index) => (
            <details
              key={item.question}
              className="group"
              open={index === defaultOpenIndex}
            >
              <summary
                className={cn(
                  "flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left",
                  "text-base font-semibold text-slate-200 transition-colors duration-200",
                  "hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020106]",
                  "[&::-webkit-details-marker]:hidden",
                )}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className="size-5 shrink-0 text-slate-400 transition-transform duration-300 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5">
                <p className="text-sm leading-relaxed text-slate-400 sm:text-base sm:leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        {footerLead && ctas && ctas.length > 0 ? (
          <div className="mt-8 border-t border-white/10 pt-8">
            <p className="text-center text-sm text-slate-400">{footerLead}</p>
            <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center">
              {ctas.map((cta) => (
                <CtaLink
                  key={cta.href + cta.label}
                  href={cta.href}
                  variant={cta.variant ?? "primary"}
                  title={cta.title}
                  className="justify-center text-[0.88rem] px-5 py-3 sm:min-w-[11rem]"
                >
                  {cta.label}
                </CtaLink>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
