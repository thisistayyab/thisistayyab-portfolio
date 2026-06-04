"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

/**
 * Light page enter on navigation. Skipped on `/` (home has its own hero motion).
 * Used by the (portfolio) layout and explicitly on `/blog` — not on `/blog/[slug]` posts.
 */
export function PortfolioMotionLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  if (isHome) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  )
}
