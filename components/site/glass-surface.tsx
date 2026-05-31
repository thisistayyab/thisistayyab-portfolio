import type { ComponentPropsWithoutRef, ElementType } from "react"

import { cn } from "@/lib/utils"

/** Same dark glass fill as the floating navbar capsule */
export const navGlassClassName =
  "bg-[rgba(8,12,26,0.72)] shadow-[0_10px_36px_rgba(0,0,0,0.45),0_0_32px_rgba(59,130,246,0.12),0_0_48px_rgba(139,92,246,0.08)] backdrop-blur-[24px] backdrop-saturate-[170%]"

export type GlassRim = "default" | "nav" | "violet" | "purple" | "blue" | "pink"

type GlassSurfaceProps<T extends ElementType = "div"> = {
  as?: T
  rim?: GlassRim
} & ComponentPropsWithoutRef<T>

const rimClasses: Record<GlassRim, string> = {
  default: "glass-rim",
  nav: "glass-rim glass-rim-nav",
  violet: "glass-rim glass-rim-violet",
  purple: "glass-rim glass-rim-purple",
  blue: "glass-rim glass-rim-blue",
  pink: "glass-rim glass-rim-pink",
}

export function GlassSurface<T extends ElementType = "div">({
  as,
  rim = "default",
  className,
  children,
  ...props
}: GlassSurfaceProps<T>) {
  const Component = as ?? "div"

  return (
    <Component
      className={cn(
        "relative isolate overflow-hidden border-0",
        rimClasses[rim],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
