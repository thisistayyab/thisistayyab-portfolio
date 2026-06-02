import type { ComponentType } from "react"

import { cn } from "@/lib/utils"

type SocialIconProps = {
  Icon: ComponentType<{ size?: number }>
  size?: number
  iconSize?: number
  href: string
  ariaLabel: string
  color: string
  platformName?: string
  title?: string
  className?: string
}

function isExternalLink(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

export function SocialIcon({
  Icon,
  size = 48,
  iconSize,
  href,
  ariaLabel,
  color,
  platformName = "Social Media",
  title,
  className,
}: SocialIconProps) {
  const effectiveIconSize = iconSize ?? Math.round(size * 0.5)
  const external = isExternalLink(href)
  const tooltipTitle = title ?? `${ariaLabel} - Connect with Tayyab on ${platformName}`

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      role="link"
      title={tooltipTitle}
      rel={external ? "noopener noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      itemProp="sameAs"
      className={cn(
        "social-icon group relative z-[1] flex items-center justify-center overflow-hidden rounded-[8px] border border-white/10 bg-white/5 no-underline shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[10px]",
        "transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:-translate-y-[5px] hover:scale-110 hover:border-[var(--icon-hover-color)]/40 hover:bg-white/5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--icon-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
      style={
        {
          width: size,
          height: size,
          "--icon-color": color,
          "--icon-hover-color": color,
        } as React.CSSProperties
      }
    >
      <span
        className="absolute top-0 right-0 left-0 z-[2] h-[3px] origin-left scale-x-0 rounded-t-lg bg-gradient-to-r from-[var(--icon-hover-color)] to-white transition-transform duration-[400ms] ease-in-out group-hover:scale-x-100"
        aria-hidden="true"
      />

      <span
        className="pointer-events-none absolute -top-1/2 -left-1/2 z-0 h-[200%] w-[200%] opacity-0 transition-opacity duration-[400ms] ease-in-out group-hover:opacity-20"
        style={{
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <span
        className="relative z-[1] transition-transform duration-300 ease-in-out"
        style={{ color }}
        aria-hidden="true"
      >
        <Icon size={effectiveIconSize} aria-hidden="true" />
      </span>

      <span className="sr-only">
        {external ? "Opens in new tab" : ""} {platformName} profile link
      </span>
    </a>
  )
}
