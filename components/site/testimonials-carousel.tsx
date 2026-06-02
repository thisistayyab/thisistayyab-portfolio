"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { TestimonialCard, type HomeTestimonial } from "@/components/site/testimonial-card"
import { cn } from "@/lib/utils"

type TestimonialsCarouselProps = {
  testimonials: HomeTestimonial[]
}

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => go(1), 6000)
    return () => window.clearInterval(timer)
  }, [go, paused])

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute top-1/2 -left-2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[rgba(8,12,26,0.92)] p-2.5 text-white/80 transition-colors hover:text-white md:-left-5 lg:flex"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute top-1/2 -right-2 z-20 hidden -translate-y-1/2 rounded-full border border-white/10 bg-[rgba(8,12,26,0.92)] p-2.5 text-white/80 transition-colors hover:text-white md:-right-5 lg:flex"
        aria-label="Next testimonial"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div className="grid grid-cols-1">
        {testimonials.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className={cn(
              "col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out",
              i === index
                ? "relative z-10 translate-x-0 opacity-100"
                : "pointer-events-none z-0 translate-x-3 opacity-0",
            )}
            aria-hidden={i !== index}
          >
            <TestimonialCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
        {testimonials.map((item, i) => (
          <button
            key={`${item.name}-${i}-dot`}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Review from ${item.name}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === index ? "w-8 bg-sky-400" : "w-2 bg-white/25 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  )
}
