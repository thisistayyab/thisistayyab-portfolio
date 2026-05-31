import type { ComponentPropsWithoutRef, ElementType } from "react"

import type { GlassRim } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

export type { GlassRim }

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
