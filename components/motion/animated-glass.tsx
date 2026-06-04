"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedGlassProps {
  children: ReactNode
  className?: string
  scaleOnHover?: boolean
}

export function AnimatedGlass({
  children,
  className,
  scaleOnHover = true,
}: AnimatedGlassProps) {
  return (
    <motion.div
      whileHover={scaleOnHover ? { scale: 1.02 } : undefined}
      whileTap={scaleOnHover ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
