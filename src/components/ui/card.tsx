import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.ComponentProps<"div"> {
  glowColor?: string; // Primary glow color (e.g., "#3b82f6" or "rgba(59, 130, 246, 0.1)"). If not provided, uses default blue glow.
  gradientColors?: string[]; // Array of colors for gradient border (default: ["#3b82f6", "#8b5cf6", "#ec4899"])
  hoverScale?: boolean; // Whether to scale on hover (default: true)
  hoverLift?: boolean; // Whether to lift on hover (default: true)
  contentClassName?: string; // Optional class for the inner content wrapper
}

function Card({
  className,
  glowColor = "#3b82f6",
  gradientColors = ["#3b82f6", "#8b5cf6", "#ec4899"],
  hoverScale = true,
  hoverLift = true,
  contentClassName,
  style,
  ...props
}: CardProps) {
  const gradientString = gradientColors.join(", ");
  const hoverTransform = hoverLift && hoverScale
    ? "group-hover:-translate-y-3 group-hover:scale-[1.02]"
    : hoverLift
      ? "group-hover:-translate-y-3"
      : hoverScale
        ? "group-hover:scale-[1.02]"
        : "";

  // Calculate translateY value: -12px = -translate-y-3 (0.75rem = 12px)

  return (
    <div
      data-slot="card"
      className={cn(
        "portfolio-card group relative overflow-hidden rounded-[8px] bg-white/5 backdrop-blur-[10px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[transform,box-shadow,border-color]",
        hoverTransform,
        hoverLift && hoverScale && "group-hover:border-[rgba(59,130,246,0.4)] group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.2),0_0_40px_rgba(59,130,246,0.15)]",
        className
      )}
      style={
        {
          ...style,
          '--glow-color': glowColor,
          '--gradient-colors': gradientString,
        } as React.CSSProperties & {
          '--glow-color': string;
          '--gradient-colors': string;
        }
      }
      {...props}
    >
      {/* Top gradient border - decorative */}
      {gradientColors.length > 0 && (
        <span
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r scale-x-0 origin-left transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-x-100 z-[2] will-change-transform"
          style={{
            background: `linear-gradient(90deg, ${gradientString})`,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      )}

      {/* Radial glow background - decorative */}
      {glowColor !== "transparent" && (
        <span
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,var(--glow-color)_0%,transparent_70%)] opacity-0 transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] pointer-events-none z-0 group-hover:opacity-100 will-change-opacity"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      )}

      {/* Card content */}
      <div className={cn("relative z-[1]", contentClassName)}>
        {props.children}
      </div>
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
