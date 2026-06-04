"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

import {
  ctaPrimaryClassName,
  ctaSecondaryClassName,
  navCtaClassName,
} from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

type CtaLinkProps = {
  href: string
  variant?: "primary" | "secondary"
  download?: boolean
  title?: string
  className?: string
  children: ReactNode
}

const MotionLink = motion(Link as any)

export function CtaLink({
  href,
  variant = "primary",
  download,
  title,
  className,
  children,
}: CtaLinkProps) {
  const classes = cn(
    variant === "primary" ? ctaPrimaryClassName : ctaSecondaryClassName,
    className,
  )

  const animationProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { type: "spring" as const, stiffness: 400, damping: 25 }
  }

  if (download || href.startsWith("http") || href.endsWith(".pdf")) {
    return (
      <motion.a href={href} download={download} title={title} className={classes} {...animationProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <MotionLink href={href} title={title} className={classes} {...animationProps}>
      {children}
    </MotionLink>
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
        navCtaClassName,
        "group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        active &&
          "shadow-[0_0_36px_rgba(59,130,246,0.24),inset_0_1px_0_rgba(59,130,246,0.2),inset_0_-1px_0_rgba(139,92,246,0.18)]",
        className,
      )}
    >
      {children}
    </Link>
  )
}
