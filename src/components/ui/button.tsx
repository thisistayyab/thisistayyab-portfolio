import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden uppercase tracking-[0.5px] min-h-[48px]",
  {
    variants: {
      variant: {
        default: "text-white bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.1))] border-[1.5px] border-[rgba(59,130,246,0.5)] hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] hover:border-[rgba(59,130,246,0.8)] hover:-translate-y-0.5 [&[style*='--glow-primary']]:hover:shadow-[0_0_20px_var(--glow-primary),0_0_40px_var(--glow-secondary)] [&:not([style*='--glow-primary'])]:hover:shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(139,92,246,0.3)]",
        destructive:
          "text-white bg-[linear-gradient(135deg,rgba(239,68,68,0.1),rgba(220,38,38,0.1))] border-[1.5px] border-[rgba(239,68,68,0.5)] hover:bg-[linear-gradient(135deg,rgba(239,68,68,0.2),rgba(220,38,38,0.2))] hover:border-[rgba(239,68,68,0.8)] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(220,38,38,0.3)] backdrop-blur-[10px]",
        outline:
          "border-[1.5px] border-white/20 bg-white/5 backdrop-blur-[10px] text-white shadow-xs hover:bg-white/10 hover:border-white/40 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,255,255,0.1),0_0_40px_rgba(255,255,255,0.05)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-auto py-[0.8rem] px-[1.6rem] text-[0.9rem] has-[>svg]:px-4",
        sm: "h-auto rounded-[8px] gap-1.5 px-4 py-2.5 text-[0.85rem] has-[>svg]:px-3 min-h-[40px]",
        lg: "h-auto rounded-[8px] px-8 py-4 text-base has-[>svg]:px-6 min-h-[52px]",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
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
  glowColor?: string // Custom glow color for hover effects (e.g., "#3b82f6", "#8b5cf6")
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
  
  // Calculate glow colors from glowColor prop or use defaults
  // glowColor can be in format: "rgba(59, 130, 246, 0.6)" or "#3b82f6" or "rgb(59, 130, 246)"
  const getSecondaryGlow = (color: string): string => {
    // Extract RGB values from rgba/rgb format
    const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
    if (rgbaMatch) {
      const r = Math.min(255, parseInt(rgbaMatch[1]) + 30)
      const g = Math.min(255, parseInt(rgbaMatch[2]) + 30)
      const b = Math.min(255, parseInt(rgbaMatch[3]) + 30)
      return `rgba(${r}, ${g}, ${b}, 0.3)`
    }
    // If hex color, convert to rgba with opacity
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
    // Extract RGB values
    let r = 59, g = 130, b = 246; // Default blue
    
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

    // Create gradient colors
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

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        style={customStyle}
        {...props}
      />
    )
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      style={customStyle}
      {...props}
    >
      {/* Top gradient border (glassy line) on hover */}
      {(variant === "default" || variant === "destructive") && (
        <span
          className="button-glassy-line absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r scale-x-0 origin-left transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-[2] will-change-transform pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${gradientString})`,
          } as React.CSSProperties}
          aria-hidden="true"
        />
      )}
      {props.children}
    </Comp>
  )
}

export { Button, buttonVariants }
