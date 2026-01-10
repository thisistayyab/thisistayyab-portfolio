import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[8px] text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden uppercase tracking-[0.5px] min-h-[48px]",
  {
    variants: {
      variant: {
        default: "text-white bg-[linear-gradient(135deg,rgba(59,130,246,0.1),rgba(139,92,246,0.1))] border-[1.5px] border-[rgba(59,130,246,0.5)] hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] hover:border-[rgba(59,130,246,0.8)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(139,92,246,0.3)] hover:-translate-y-0.5",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
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

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
