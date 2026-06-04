import type { Metadata } from "next"

import {
  FEATURED_OG_ALT,
  FEATURED_OG_DIMENSIONS,
  featuredOgImageUrl,
  SITE_URL,
} from "@/lib/site"

type OgImage = {
  url: string
  alt: string
  width?: number
  height?: number
  type?: string
}

export type PageMetadataInput = {
  /** Full document title (not combined with the root layout template). */
  title: string
  description: string
  canonicalPath: string
  keywords?: readonly string[]
  openGraph?: {
    type?: "website" | "profile" | "article"
    title?: string
    description?: string
  }
  ogImage?: OgImage | string
  twitter?: {
    card?: "summary" | "summary_large_image"
    title?: string
    description?: string
  }
}

const defaultOgImage = (): OgImage => ({
  url: featuredOgImageUrl(),
  alt: FEATURED_OG_ALT,
  width: FEATURED_OG_DIMENSIONS.width,
  height: FEATURED_OG_DIMENSIONS.height,
  type: "image/jpeg",
})

function resolveOgImages(ogImage?: OgImage | string): OgImage[] {
  if (!ogImage) return [defaultOgImage()]
  if (typeof ogImage === "string") {
    return [{ url: ogImage, alt: FEATURED_OG_ALT, ...FEATURED_OG_DIMENSIONS, type: "image/jpeg" }]
  }
  const defaults = defaultOgImage()
  return [
    {
      ...defaults,
      ...ogImage,
      alt: ogImage.alt || defaults.alt,
      width: ogImage.width ?? defaults.width,
      height: ogImage.height ?? defaults.height,
      type: ogImage.type ?? defaults.type,
    },
  ]
}

/** Consistent page metadata: absolute titles, canonical, Open Graph, and Twitter. */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const canonical = `${SITE_URL}${input.canonicalPath}`
  const ogTitle = input.openGraph?.title ?? input.title
  const ogDescription = input.openGraph?.description ?? input.description
  const images = resolveOgImages(input.ogImage)
  const twitterCard = input.twitter?.card ?? "summary_large_image"

  return {
    title: { absolute: input.title },
    description: input.description,
    keywords: input.keywords ? [...input.keywords] : undefined,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonical,
      type: input.openGraph?.type ?? "website",
      images,
    },
    twitter: {
      card: twitterCard,
      title: input.twitter?.title ?? ogTitle,
      description: input.twitter?.description ?? ogDescription,
      images:
        twitterCard === "summary_large_image" ? images.map((img) => img.url) : undefined,
    },
  }
}
