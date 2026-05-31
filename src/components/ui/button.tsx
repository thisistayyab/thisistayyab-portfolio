import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  {
    variants: {
      variant: {
        default:
          "group relative overflow-hidden rounded-[8px] text-sm uppercase tracking-[0.5px] min-h-[48px] text-white bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.1))] border-[1.5px] border-[rgba(59,130,246,0.5)] hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] hover:border-[rgba(59,130,246,0.8)] hover:-translate-y-0.5 [&[style*='--glow-primary']]:hover:shadow-[0_0_20px_var(--glow-primary),0_0_40px_var(--glow-secondary)] [&:not([style*='--glow-primary'])]:hover:shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(139,92,246,0.3)] [&_svg:not([class*='size-'])]:size-4",
        destructive:
          "group relative overflow-hidden rounded-[8px] text-sm uppercase tracking-[0.5px] min-h-[48px] text-white bg-[linear-gradient(135deg,rgba(239,68,68,0.1),rgba(220,38,38,0.1))] border-[1.5px] border-[rgba(239,68,68,0.5)] hover:bg-[linear-gradient(135deg,rgba(239,68,68,0.2),rgba(220,38,38,0.2))] hover:border-[rgba(239,68,68,0.8)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(220,38,38,0.3)] backdrop-blur-[10px] [&_svg:not([class*='size-'])]:size-4",
        outline:
          "rounded-[8px] text-sm uppercase tracking-[0.5px] min-h-[48px] border-[1.5px] border-white/20 bg-white/5 backdrop-blur-[10px] text-white shadow-xs hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_40px_rgba(255,255,255,0.05)] [&_svg:not([class*='size-'])]:size-4",
        secondary:
          "rounded-[8px] text-sm min-h-[48px] bg-secondary text-secondary-foreground hover:bg-secondary/80 [&_svg:not([class*='size-'])]:size-4",
        ghost:
          "rounded-[8px] text-sm min-h-[48px] hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 [&_svg:not([class*='size-'])]:size-4",
        link:
          "min-h-0 h-auto rounded-none p-0 text-primary underline-offset-4 hover:underline normal-case tracking-normal [&_svg:not([class*='size-'])]:size-4",
        cta: "btn-cta-primary normal-case tracking-normal cursor-pointer",
        ctaSecondary: "btn-cta-secondary normal-case tracking-normal cursor-pointer",
        ctaLink: "btn-cta-link cursor-pointer",
      },
      size: {
        default: "h-auto py-[0.8rem] px-[1.6rem] text-[0.9rem] has-[>svg]:px-4",
        sm: "h-auto rounded-[8px] gap-1.5 px-4 py-2.5 text-[0.85rem] has-[>svg]:px-3 min-h-[40px]",
        lg: "h-auto rounded-[8px] px-8 py-4 text-base has-[>svg]:px-6 min-h-[52px]",
        cta: "[&_svg:not([class*='size-'])]:size-[0.95rem]",
        icon: "size-9 min-h-0",
        "icon-sm": "size-8 min-h-0",
        "icon-lg": "size-10 min-h-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ButtonProps extends React.ComponentProps<"button">, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  glowColor?: string
}

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  glowColor,
  style,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const getSecondaryGlow = (color: string): string => {
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (rgbaMatch) {
      const r = Math.min(255, parseInt(rgbaMatch[1]) + 30)
      const g = Math.min(255, parseInt(rgbaMatch[2]) + 30)
      const b = Math.min(255, parseInt(rgbaMatch[3]) + 30)
      return `rgba(${r}, ${g}, ${b}, 0.3)`
    }
    if (color.startsWith('#')) {
      const hex = color.replace('#', '')
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      return `rgba(${r}, ${g}, ${b}, 0.3)`
    }
    return "rgba(139, 92, 246, 0.3)"
  }

  const getGradientColors = (color: string): string[] => {
    let r = 59, g = 130, b = 246

    if (color.startsWith('#')) {
      const hex = color.replace('#', '')
      r = parseInt(hex.substring(0, 2), 16)
      g = parseInt(hex.substring(2, 4), 16)
      b = parseInt(hex.substring(4, 6), 16)
    } else {
      const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (rgbaMatch) {
        r = parseInt(rgbaMatch[1])
        g = parseInt(rgbaMatch[2])
        b = parseInt(rgbaMatch[3])
      }
    }

    const primary = `rgb(${r}, ${g}, ${b})`
    const secondaryR = Math.min(255, r + 50)
    const secondaryG = Math.min(255, g + 50)
    const secondaryB = Math.min(255, b + 50)
    const secondary = `rgb(${secondaryR}, ${secondaryG}, ${secondaryB})`

    return [primary, secondary]
  }

  const primaryGlow = glowColor || "rgba(59, 130, 246, 0.6)"
  const secondaryGlow = glowColor ? getSecondaryGlow(glowColor) : "rgba(139, 92, 246, 0.3)"
  const gradientColors = glowColor ? getGradientColors(glowColor) : ["#3b82f6", "#8b5cf6"]
  const gradientString = gradientColors.join(", ")

  const customStyle = glowColor
    ? {
        ...style,
        '--glow-primary': primaryGlow,
        '--glow-secondary': secondaryGlow,
        '--gradient-colors': gradientString,
      } as React.CSSProperties & {
        '--glow-primary': string;
        '--glow-secondary': string;
        '--gradient-colors': string;
      }
    : style

  const resolvedSize =
    variant === 'cta' || variant === 'ctaSecondary' || variant === 'ctaLink'
      ? size === 'default'
        ? 'cta'
        : size
      : size

  const showGlassyLine =
    !asChild && (variant === "default" || variant === "destructive")

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={resolvedSize}
        className={cn(buttonVariants({ variant, size: resolvedSize, className }))}
        style={customStyle}
        {...props}
      />
    )
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={resolvedSize}
      className={cn(buttonVariants({ variant, size: resolvedSize, className }))}
      style={customStyle}
      {...props}
    >
      {showGlassyLine ? (
        <span
          className="button-glassy-line absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-[2] will-change-transform pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${gradientString})`,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      ) : null}
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants }
