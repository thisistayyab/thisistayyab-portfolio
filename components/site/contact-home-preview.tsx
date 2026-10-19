import { CheckCircle2, Clock, Mail } from "lucide-react"
import Link from "next/link"
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri"

import { ContactForm } from "@/components/site/contact-form"
import { GlassSurface } from "@/components/site/glass-surface"
import { contentCardClassName, navGlassClassName } from "@/components/site/site-styles"
import { profileEmail, profileSameAs } from "@/lib/site"
import { cn } from "@/lib/utils"

type QuickLink = {
  title: string
  description: string
  href: string
  icon: typeof Mail | typeof RiGithubFill
  rim: "blue" | "purple"
  external: boolean
  iconClassName?: string
}

const quickLinks: QuickLink[] = [
  {
    title: "Direct Email",
    description: profileEmail,
    href: `mailto:${profileEmail}?subject=Project%20Inquiry`,
    icon: Mail,
    rim: "blue",
    external: false,
    iconClassName: "text-cyan-300",
  },
  {
    title: "LinkedIn",
    description: "Connect & message directly",
    href: profileSameAs[1],
    icon: RiLinkedinFill,
    rim: "blue",
    external: true,
    iconClassName: "text-sky-300",
  },
  {
    title: "GitHub",
    description: "Review production repositories",
    href: profileSameAs[0],
    icon: RiGithubFill,
    rim: "purple",
    external: true,
    iconClassName: "text-slate-200",
  },
]

const hiringHighlights = [
  "Direct 1-on-1 engineering — no agency middlemen",
  "Clear milestone-based scope before writing code",
  "Full source code, database & deployment handoff",
] as const

export function ContactHomePreview() {
  return (
    <section
      id="contact-section"
      className="relative mx-auto max-w-[1200px] px-5 py-16 sm:px-6 lg:px-4 lg:py-20"
      aria-labelledby="home-contact-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-56 w-56 rounded-full bg-blue-600/10 blur-[90px]"
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
            Start a Project
          </p>
          <h2
            id="home-contact-heading"
            className="text-[clamp(1.65rem,4.2vw,2.35rem)] leading-[1.15] font-bold tracking-tight text-white"
          >
            Have a product to build or scale?{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              Let&apos;s talk
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            Send your project details below or reach out via email or LinkedIn for a free
            technical scope and timeline estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-5">
            <ul
              className="grid list-none grid-cols-1 gap-3"
              role="list"
              aria-label="Direct contact channels"
            >
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.title} className="list-none">
                    <Link
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cn(
                        contentCardClassName,
                        "group flex items-center gap-4 rounded-xl border border-white/10 p-4 no-underline transition-colors hover:border-white/25",
                      )}
                    >
                      <GlassSurface
                        as="span"
                        rim={link.rim}
                        className={cn(
                          navGlassClassName,
                          "flex size-11 shrink-0 items-center justify-center rounded-lg",
                        )}
                        aria-hidden="true"
                      >
                        <Icon
                          className={cn("relative z-[1] size-5", link.iconClassName)}
                          aria-hidden="true"
                        />
                      </GlassSurface>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-white group-hover:text-cyan-200">
                          {link.title}
                        </h3>
                        <p className="mt-0.5 truncate text-xs text-slate-400">{link.description}</p>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
              <p className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                What to expect when you reach out
              </p>
              <ul className="mt-3 space-y-2.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
                {hiringHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3 text-xs text-emerald-300/90">
                <Clock className="size-3.5 shrink-0" aria-hidden="true" />
                Usually replies within a few hours (same business day)
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-7 lg:col-span-7">
            <ContactForm formId="home-contact-form" />
          </div>
        </div>
      </div>
    </section>
  )
}
