import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

type PortfolioCardProps = {
  glowColor?: string
  gradientColors?: string[]
  hoverScale?: boolean
  hoverLift?: boolean
  contentClassName?: string
  children: ReactNode
} & ComponentProps<"div">

export function PortfolioCard({
  className,
  glowColor = "#3b82f6",
  gradientColors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  hoverScale = true,
  hoverLift = true,
  contentClassName,
  children,
  style,
  ...props
}: PortfolioCardProps) {
  const gradientString = gradientColors.join(", ")
  const hoverTransform =
    hoverLift && hoverScale
      ? "group-hover:-translate-y-3 group-hover:scale-[1.02]"
      : hoverLift
        ? "group-hover:-translate-y-3"
        : hoverScale
          ? "group-hover:scale-[1.02]"
          : ""

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-[8px] border border-white/10 bg-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-[10px]",
        "transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[transform,box-shadow,border-color]",
        hoverTransform,
        hoverLift &&
          hoverScale &&
          "group-hover:border-blue-500/40 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.2),0_0_40px_rgba(59,130,246,0.15)]",
        className,
      )}
      style={
        {
          ...style,
          "--glow-color": glowColor,
          "--gradient-colors": gradientString,
        } as React.CSSProperties
      }
      {...props}
    >
      {gradientColors.length > 0 ? (
        <span
          className="absolute top-0 right-0 left-0 z-[2] h-1 origin-left scale-x-0 bg-gradient-to-r transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${gradientString})` }}
          aria-hidden="true"
        />
      ) : null}

      {glowColor !== "transparent" ? (
        <span
          className="pointer-events-none absolute -top-1/2 -left-1/2 z-0 h-[200%] w-[200%] opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
      ) : null}

      <div className={cn("relative z-[1]", contentClassName)}>{children}</div>
    </div>
  )
}
