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
            staggerChildren: 0.15,
            delayChildren: 0.2,
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
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            mass: 1,
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
      initial={{ opacity: 0, scale: 0.8, rotate: -5, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
      transition={{
        duration: 1.2,
        delay: 0.4,
        ease: [0.16, 1, 0.3, 1], // Custom exponential out
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
          transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
      }}
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: { type: "spring", stiffness: 120, damping: 14 },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}
