"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { ReactNode } from "react"

type HeroStaggerProps = HTMLMotionProps<"div"> & {
  children: ReactNode
}

export function HeroStagger({ children, className, ...props }: HeroStaggerProps) {
  return (
    <motion.div
      {...props}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

type HeroItemProps = HTMLMotionProps<"div"> & {
  children: ReactNode
}

export function HeroItem({ children, className, ...props }: HeroItemProps) {
  return (
    <motion.div
      {...props}
      variants={{
        hidden: { opacity: 1, y: 12, scale: 0.99 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 140,
            damping: 18,
            mass: 0.9,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function HeroImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.55,
        delay: 0,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function WordPullUp({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.05, delayChildren: 0 },
        },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: 10, opacity: 1 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 150, damping: 16 },
            },
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : null}
        </motion.span>
      ))}
    </motion.span>
  )
}
