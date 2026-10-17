import { Clock, Globe, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri"

import { GlassSurface } from "@/components/site/glass-surface"
import { contentCardClassName, navGlassClassName } from "@/components/site/site-styles"
import { profileEmail, profileSameAs } from "@/lib/site"
import { cn } from "@/lib/utils"

const socialLinks = [
  {
    label: "GitHub",
    href: profileSameAs[0],
    Icon: RiGithubFill,
    color: "#e2e8f0",
  },
  {
    label: "LinkedIn",
    href: profileSameAs[1],
    Icon: RiLinkedinFill,
    color: "#38bdf8",
  },
] as const

type ContactInfoPanelProps = {
  compact?: boolean
}

export function ContactInfoPanel({ compact = false }: ContactInfoPanelProps) {
  return (
    <aside className="flex flex-col gap-4" aria-label="Contact information">
      <GlassSurface
        rim="blue"
        className={cn(
          contentCardClassName,
          "rounded-2xl border border-white/10 p-5 sm:p-6",
        )}
      >
        <h3 className="text-sm font-semibold text-white">Direct contact</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          {compact
            ? "Share your project scope, timeline, and budget range if you have one."
            : "Available for full stack product work, SaaS builds, API development, and AI automation engagements."}
        </p>

        <a
          href={`mailto:${profileEmail}`}
          className={cn(
            "mt-5 flex gap-3 rounded-xl border border-white/10 p-4 no-underline transition-[border-color,box-shadow] duration-300",
            "hover:border-white/20",
            contentCardClassName,
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
            <span className="block truncate text-sm font-medium text-white">{profileEmail}</span>
          </span>
        </a>

        <div className="mt-4 flex flex-wrap gap-2">
          {socialLinks.map(({ label, href, Icon, color }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                contentCardClassName,
                "inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-slate-300 no-underline transition-colors hover:text-white",
              )}
            >
              <Icon size={16} style={{ color }} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </div>
      </GlassSurface>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
        <GlassSurface
          rim="violet"
          className={cn(contentCardClassName, "rounded-xl border border-white/10 p-4")}
        >
          <div className="flex gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-violet-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-white">Response time</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Usually within 24–48 hours on business days.
              </p>
            </div>
          </div>
        </GlassSurface>
        <GlassSurface
          rim="blue"
          className={cn(contentCardClassName, "rounded-xl border border-white/10 p-4")}
        >
          <div className="flex gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-blue-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-white">Location</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Pakistan · Remote worldwide
              </p>
            </div>
          </div>
        </GlassSurface>
      </div>

      {!compact && (
        <GlassSurface
          rim="purple"
          className={cn(contentCardClassName, "rounded-xl border border-white/10 p-4")}
        >
          <div className="flex gap-3">
            <Globe className="mt-0.5 size-5 shrink-0 text-purple-300" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium text-white">Working with clients</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                Startup teams, SaaS product owners, agencies, and businesses that need a dependable full stack
                engineer from discovery through launch.
              </p>
            </div>
          </div>
        </GlassSurface>
      )}
    </aside>
  )
}
