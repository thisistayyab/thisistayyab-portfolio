"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react"

import { TestimonialCard, type HomeTestimonial } from "@/components/site/testimonial-card"
import { cn } from "@/lib/utils"

type TestimonialsCarouselProps = {
  testimonials: HomeTestimonial[]
}

const SWIPE_THRESHOLD_PX = 45

export function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartXRef = useRef<number | null>(null)
  const count = testimonials.length

  const go = useCallback(
    (delta: number) => {
      setIndex((prev) => (prev + delta + count) % count)
    },
    [count],
  )

  useEffect(() => {
    if (paused || isDragging || count <= 1) return
    const timer = window.setInterval(() => go(1), 6000)
    return () => window.clearInterval(timer)
  }, [count, go, isDragging, paused])

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return
    dragStartXRef.current = e.clientX
    setIsDragging(true)
    setDragOffset(0)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartXRef.current === null) return
    const deltaX = e.clientX - dragStartXRef.current
    setDragOffset(deltaX)
  }

  const finishDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartXRef.current === null) return
    const deltaX = e.clientX - dragStartXRef.current
    if (deltaX <= -SWIPE_THRESHOLD_PX) {
      go(1)
    } else if (deltaX >= SWIPE_THRESHOLD_PX) {
      go(-1)
    }
    dragStartXRef.current = null
    setIsDragging(false)
    setDragOffset(0)
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <button
        type="button"
        onClick={() => go(-1)}
        className="absolute top-1/2 -left-2 z-20 hidden -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-[rgba(8,12,26,0.92)] p-2.5 text-white/80 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white md:-left-5 lg:flex"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        className="absolute top-1/2 -right-2 z-20 hidden -translate-y-1/2 cursor-pointer rounded-full border border-white/10 bg-[rgba(8,12,26,0.92)] p-2.5 text-white/80 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white md:-right-5 lg:flex"
        aria-label="Next testimonial"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div
        className=" cursor-grab overflow-hidden touch-pan-y select-none active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
      >
        <div
          className={cn(
            "flex w-full",
            !isDragging && "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          )}
          style={{
            transform: `translate3d(calc(-${index * 100}% + ${dragOffset}px), 0, 0)`,
          }}
        >
          {testimonials.map((item, i) => (
            <div
              key={`${item.name}-${i}`}
              className="w-full shrink-0 px-0.5"
              aria-hidden={i !== index}
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
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
              "h-2 cursor-pointer rounded-full transition-all duration-300",
              i === index ? "w-8 bg-sky-400" : "w-2 bg-white/25 hover:bg-white/40",
            )}
          />
        ))}
      </div>
    </div>
  )
}
