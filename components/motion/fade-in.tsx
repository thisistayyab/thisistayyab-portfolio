"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

export function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
  const directions = {
    up: { y: 18, x: 0 },
    down: { y: -18, x: 0 },
    left: { x: 18, y: 0 },
    right: { x: -18, y: 0 },
    none: { x: 0, y: 0 },
  }

  return (
    <motion.div
      initial={{
        opacity: 1,
        ...directions[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "-4% 0px" }}
      transition={{
        duration: 0.45,
        delay: Math.min(delay, 0.15),
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
