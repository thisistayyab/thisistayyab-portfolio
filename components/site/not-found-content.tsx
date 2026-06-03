import { ArrowLeft, ArrowRight, FileQuestion } from "lucide-react"
import Link from "next/link"

import { CtaLink } from "@/components/site/cta-link"
import { HeaderGraphBackground } from "@/components/site/header-graph-background"
import { navItems, SITE_NAME } from "@/lib/site"
import { cn } from "@/lib/utils"

const exploreLinks = navItems.filter((item) => item.href !== "/")

type NotFoundContentProps = {
  title?: string
  description?: string
  backHref?: string
  backLabel?: string
  className?: string
}

export function NotFoundContent({
  title = "Page not found",
  description = "The page you’re looking for doesn’t exist, was moved, or the URL has a typo. Try one of the links below or head back home.",
  backHref = "/",
  backLabel = "Back to home",
  className,
}: NotFoundContentProps) {
  return (
    <article className={cn("relative isolate overflow-x-clip", className)}>
      <header className="relative isolate overflow-hidden pt-[88px]">
        <HeaderGraphBackground />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020106]/90" />

        <div className="relative z-[2] mx-auto max-w-[1200px] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl pt-8 text-center">
            <p
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold tracking-[0.18em] text-blue-300/80 uppercase"
              aria-hidden="true"
            >
              <FileQuestion className="size-3.5" aria-hidden="true" />
              Error 404
            </p>

            <p
              className="mb-4 bg-gradient-to-r from-purple-400 via-violet-400 to-sky-400 bg-clip-text text-[clamp(4.5rem,18vw,7rem)] leading-none font-extrabold tracking-tight text-transparent"
              aria-hidden="true"
            >
              404
            </p>

            <h1 className="text-[clamp(1.75rem,5vw,2.5rem)] font-bold tracking-tight text-white">
              {title}
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400 sm:text-lg">
              {description}
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-3.5">
              <CtaLink href={backHref} title={`Return to ${SITE_NAME}`}>
                <ArrowLeft className="size-[1.05rem]" aria-hidden="true" />
                {backLabel}
              </CtaLink>
              <CtaLink href="/contact" variant="secondary" title="Contact Tayyab">
                Let&apos;s talk
                <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
              </CtaLink>
            </div>
          </div>
        </div>
      </header>

      <section
        className="relative mx-auto max-w-[1200px] px-4 pb-24 sm:px-6 lg:px-8"
        aria-labelledby="not-found-links-heading"
      >
        <div className="relative z-[2] mx-auto max-w-3xl">
          <h2
            id="not-found-links-heading"
            className="mb-6 text-center text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase"
          >
            Popular pages
          </h2>
          <ul className="grid list-none gap-2 sm:grid-cols-2">
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={item.description}
                  className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 no-underline transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="mt-1 text-xs leading-relaxed text-slate-500">
                    {item.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}
