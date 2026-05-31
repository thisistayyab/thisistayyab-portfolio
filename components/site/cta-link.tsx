import Link from "next/link"
import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type CtaLinkProps = {
  href: string
  variant?: "primary" | "secondary"
  download?: boolean
  title?: string
  className?: string
  children: ReactNode
}

export function CtaLink({
  href,
  variant = "primary",
  download,
  title,
  className,
  children,
}: CtaLinkProps) {
  const classes = cn(
    variant === "primary" ? "btn-cta-primary" : "btn-cta-secondary",
    className,
  )

  if (download || href.startsWith("http") || href.endsWith(".pdf")) {
    return (
      <a href={href} download={download} title={title} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} title={title} className={classes}>
      {children}
    </Link>
  )
}

export function NavCtaLink({
  href,
  active,
  className,
  children,
  title,
  onClick,
}: {
  href: string
  active?: boolean
  className?: string
  children: ReactNode
  title?: string
  onClick?: () => void
}) {
  return (
    <Link
      href={href}
      title={title}
      onClick={onClick}
      className={cn(
        "nav-cta group inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        active && "brightness-110",
        className,
      )}
    >
      {children}
    </Link>
  )
}
