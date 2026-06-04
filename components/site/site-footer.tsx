import { Mail, MapPin } from "lucide-react"
import type { ComponentType } from "react"
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri"
import { SiLeetcode } from "react-icons/si"
import Link from "next/link"

import { JsonLd } from "@/components/site/json-ld"
import { SocialIcon } from "@/components/site/social-icon"
import { NavCtaLink } from "@/components/site/cta-link"
import { NavOrb } from "@/components/site/nav-orb"
import { GlassSurface } from "@/components/site/glass-surface"
import { contentCardClassName, navGlassClassName } from "@/components/site/site-styles"
import { letsTalkDescription, letsTalkHref, navItems, profileEmail, SITE_NAME, SITE_URL } from "@/lib/site"
import { cn } from "@/lib/utils"

const TAYLANCE_TECH_URL = "https://taylancetech.com"

const footerSocialLinks: {
  Icon: ComponentType<{ size?: number }>
  href: string
  ariaLabel: string
  color: string
  platformName: string
}[] = [
  {
    Icon: RiGithubFill,
    href: "https://github.com/thisistayyab",
    ariaLabel: "GitHub profile",
    color: "#e2e8f0",
    platformName: "GitHub",
  },
  {
    Icon: RiLinkedinFill,
    href: "https://www.linkedin.com/in/thisistayyab/",
    ariaLabel: "LinkedIn profile",
    color: "#38bdf8",
    platformName: "LinkedIn",
  },
  {
    Icon: SiLeetcode,
    href: "https://leetcode.com/u/thisistayyab/",
    ariaLabel: "LeetCode profile",
    color: "#fbbf24",
    platformName: "LeetCode",
  },
]

const exploreLinks = [
  ...navItems.filter((item) => item.href !== "/contact"),
  { label: "Privacy", href: "/privacy", description: "Privacy policy" },
  { label: "Terms", href: "/terms", description: "Terms of service" },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const mid = Math.ceil(exploreLinks.length / 2)
  const exploreCol1 = exploreLinks.slice(0, mid)
  const exploreCol2 = exploreLinks.slice(mid)

  return (
    <footer
      className="relative z-[2] mt-auto border-t border-white/10"
      role="contentinfo"
      aria-label="Site footer"
    >
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WPFooter",
          "@id": SITE_URL,
          url: SITE_URL,
          copyrightYear: year,
          copyrightHolder: {
            "@type": "Person",
            name: "Tayyab",
            url: SITE_URL,
            email: profileEmail,
          },
        }}
      />

      <div
        className="pointer-events-none absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-6 lg:px-4 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div>
              <Link
                href="/"
                className="font-brand text-xl font-semibold text-white no-underline transition-colors hover:text-violet-300 sm:text-2xl"
              >
                {SITE_NAME}
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 sm:text-[0.95rem]">
                Full stack developer building fast, reliable web products with React, Next.js, and
                Node.js.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Founder at{" "}
                <Link
                  href={TAYLANCE_TECH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-300/90 transition-colors hover:text-violet-200"
                >
                  Taylance Tech
                </Link>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {footerSocialLinks.map((link) => (
                <SocialIcon
                  key={link.href}
                  Icon={link.Icon}
                  size={42}
                  iconSize={20}
                  href={link.href}
                  ariaLabel={link.ariaLabel}
                  color={link.color}
                  platformName={link.platformName}
                  className={cn(
                    contentCardClassName,
                    "rounded-xl border-white/10 !bg-[rgba(8,12,26,0.88)] backdrop-blur-none",
                    "hover:!translate-y-0 hover:!scale-100",
                  )}
                />
              ))}
            </div>

            <NavCtaLink
              href={letsTalkHref}
              title={letsTalkDescription}
              className="w-fit"
            >
              <NavOrb />
              <span>Let&apos;s Talk</span>
            </NavCtaLink>
          </div>

          <div className="lg:col-span-4">
            <h2 className="text-sm font-semibold tracking-wide text-white">Explore</h2>
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1">
              <ul className="list-none space-y-2.5">
                {exploreCol1.map((item) => (
                  <li key={item.href}>
                    <FooterNavLink href={item.href} label={item.label} />
                  </li>
                ))}
              </ul>
              <ul className="list-none space-y-2.5">
                {exploreCol2.map((item) => (
                  <li key={item.href}>
                    <FooterNavLink href={item.href} label={item.label} />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold tracking-wide text-white">Contact</h2>
            <div className="mt-4 flex flex-col gap-3">
              <a
                href={`mailto:${profileEmail}`}
                className={cn(
                  contentCardClassName,
                  "group flex gap-3 rounded-xl border border-white/10 p-4 no-underline transition-[border-color,box-shadow] duration-300",
                  "hover:border-white/20",
                )}
              >
                <span
                  className={cn(
                    navGlassClassName,
                    "flex size-10 shrink-0 items-center justify-center rounded-lg text-blue-300",
                  )}
                  aria-hidden="true"
                >
                  <Mail className="size-5" strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-slate-500">Email</span>
                  <span className="block truncate text-sm font-medium text-white group-hover:text-violet-200">
                    {profileEmail}
                  </span>
                </span>
              </a>

              <GlassSurface
                rim="violet"
                className={cn(contentCardClassName, "rounded-xl border border-white/10 p-4")}
              >
                <div className="flex gap-3">
                  <span
                    className={cn(
                      navGlassClassName,
                      "flex size-10 shrink-0 items-center justify-center rounded-lg text-violet-300",
                    )}
                    aria-hidden="true"
                  >
                    <MapPin className="size-5" strokeWidth={2} />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">Location</span>
                    <span className="block text-sm font-medium text-white">Pakistan · Remote</span>
                  </span>
                </div>
              </GlassSurface>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8 bg-[rgba(4,6,14,0.65)]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-3 px-5 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-4">
          <p className="text-xs text-slate-500 sm:text-sm">
            &copy; {year} Tayyab. All rights reserved.
          </p>
          <nav
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm"
            aria-label="Legal"
          >
            <Link
              href="/privacy"
              className="transition-colors hover:text-slate-300"
              title="Privacy Policy"
            >
              Privacy
            </Link>
            <span className="text-slate-700" aria-hidden="true">
              ·
            </span>
            <Link
              href="/terms"
              className="transition-colors hover:text-slate-300"
              title="Terms of Service"
            >
              Terms
            </Link>
            <span className="hidden text-slate-700 sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="hidden sm:inline">Built with Next.js · Available worldwide</span>
          </nav>
        </div>
      </div>
    </footer>
  )
}

function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      title={label}
      className="group inline-flex items-center gap-2 text-sm text-slate-400 no-underline transition-colors duration-200 hover:text-white"
    >
      <span
        className="size-1 shrink-0 rounded-full bg-transparent transition-colors group-hover:bg-violet-400"
        aria-hidden="true"
      />
      {label}
    </Link>
  )
}
