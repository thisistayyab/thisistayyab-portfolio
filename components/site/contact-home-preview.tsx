import { Clock, Mail } from "lucide-react"
import Link from "next/link"
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri"

import { NavCtaLink } from "@/components/site/cta-link"
import { NavOrb } from "@/components/site/nav-orb"
import { GlassSurface } from "@/components/site/glass-surface"
import { contentCardClassName, navGlassClassName } from "@/components/site/site-styles"
import { letsTalkDescription, profileEmail, profileSameAs } from "@/lib/site"
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
    title: "Email",
    description: "Fastest for a short hello",
    href: `mailto:${profileEmail}?subject=Project%20inquiry`,
    icon: Mail,
    rim: "blue",
    external: false,
  },
  {
    title: "GitHub",
    description: "Code and contributions",
    href: profileSameAs[0],
    icon: RiGithubFill,
    rim: "purple",
    external: true,
    iconClassName: "text-slate-200",
  },
  {
    title: "LinkedIn",
    description: "Professional network",
    href: profileSameAs[1],
    icon: RiLinkedinFill,
    rim: "blue",
    external: true,
    iconClassName: "text-sky-300",
  },
]

export function ContactHomePreview() {
  return (
    <section
      className="relative mx-auto max-w-[1200px] px-5 py-14 sm:px-6 lg:px-4 lg:py-16"
      aria-labelledby="home-contact-heading"
    >
      <div
        className="pointer-events-none absolute -left-20 top-1/3 h-56 w-56 rounded-full bg-blue-600/10 blur-[90px]"
        aria-hidden="true"
      />

      <div className="relative z-[2]">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-blue-300/80 uppercase">
            Contact
          </p>
          <h2
            id="home-contact-heading"
            className="text-[clamp(1.5rem,4vw,2.1rem)] leading-[1.2] font-bold tracking-tight text-white"
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              touch
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
            Email or connect on social. For a full project brief, use the contact page.
          </p>
        </div>

        <ul
          className="mx-auto grid max-w-3xl list-none grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
          role="list"
          aria-label="Quick contact options"
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
                    "group flex h-full flex-col rounded-xl border border-white/10 p-4 no-underline sm:p-5",
                  )}
                >
                  <GlassSurface
                    as="span"
                    rim={link.rim}
                    className={cn(
                      navGlassClassName,
                      "mb-3 flex size-10 items-center justify-center rounded-lg",
                    )}
                    aria-hidden="true"
                  >
                    <Icon className={cn("relative z-[1] size-5", link.iconClassName)} aria-hidden="true" />
                  </GlassSurface>
                  <h3 className="text-sm font-semibold text-white group-hover:text-violet-200">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{link.description}</p>
                </Link>
              </li>
            )
          })}
        </ul>

        <p className="mx-auto mt-6 flex max-w-md items-center justify-center gap-2 text-center text-xs text-slate-500">
          <Clock className="size-3.5 shrink-0 text-slate-600" aria-hidden="true" />
          Usually replies within 24–48 hours on business days
        </p>

        <div className="mt-8 flex justify-center">
          <NavCtaLink href="/contact" title={letsTalkDescription}>
            <NavOrb />
            <span>Let&apos;s Talk</span>
          </NavCtaLink>
        </div>
      </div>
    </section>
  )
}
