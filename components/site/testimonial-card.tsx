import { MessageSquareQuote, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { GlassSurface } from "@/components/site/glass-surface"
import { contentCardClassName } from "@/components/site/site-styles"
import { cn } from "@/lib/utils"

export type HomeTestimonial = {
  name: string
  role: string
  quote: string
  rating?: number
  image?: string
  via?: string
  viaUrl?: string
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-transparent text-white/15",
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

function ClientAvatar({
  name,
  role,
  image,
}: {
  name: string
  role: string
  image?: string
}) {
  if (image) {
    return (
      <div className="relative size-20 shrink-0 overflow-hidden rounded-full ring-2 ring-white/15 sm:size-24">
        <Image
          src={image}
          alt={`${name}, ${role}`}
          width={96}
          height={96}
          className="size-full object-cover"
        />
      </div>
    )
  }

  return (
    <div
      className="flex size-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-blue-500/25 text-2xl font-bold text-white ring-2 ring-white/15 sm:size-24"
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  )
}

export function TestimonialCard({ item }: { item: HomeTestimonial }) {
  const rating = item.rating ?? 5

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:gap-8">
      <GlassSurface
        rim="blue"
        className={cn(
          contentCardClassName,
          "flex min-h-[260px] flex-col rounded-2xl border border-white/10 p-6 sm:p-8",
        )}
      >
        <MessageSquareQuote
          className="size-10 text-blue-400/25"
          strokeWidth={1.25}
          aria-hidden="true"
        />
        <figure className="mt-4 flex flex-1 flex-col">
          <blockquote className="flex-1">
            <p className="text-[clamp(1.05rem,2.8vw,1.3rem)] leading-[1.65] font-medium text-slate-100">
              {item.quote}
            </p>
          </blockquote>
          <figcaption className="sr-only">
            {item.name}, {item.role}
          </figcaption>
        </figure>
      </GlassSurface>

      <GlassSurface
        rim="violet"
        className={cn(
          contentCardClassName,
          "flex flex-col items-center rounded-2xl border border-white/10 p-6 text-center sm:p-7",
        )}
      >
        <ClientAvatar name={item.name} role={item.role} image={item.image} />
        <p className="mt-5 text-lg font-semibold text-white">{item.name}</p>
        <p className="mt-1 text-sm text-slate-400">{item.role}</p>
        <div className="mt-4">
          <StarRating rating={rating} />
        </div>
        {item.via && (
          <p className="mt-5 text-sm text-slate-500">
            Review on{" "}
            {item.viaUrl ? (
              <Link
                href={item.viaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-violet-300/90 no-underline transition-colors hover:text-violet-200"
              >
                {item.via}
              </Link>
            ) : (
              <span className="font-medium text-slate-400">{item.via}</span>
            )}
          </p>
        )}
      </GlassSurface>
    </div>
  )
}
