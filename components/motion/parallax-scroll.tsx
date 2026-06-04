"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"

interface ParallaxScrollProps {
  children: ReactNode
  className?: string
  offset?: number
}

export function ParallaxScroll({ children, className, offset = 50 }: ParallaxScrollProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // When scrollYProgress goes from 0 to 1, translate from -offset to +offset
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
