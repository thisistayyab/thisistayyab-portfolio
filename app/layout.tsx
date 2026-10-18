import type { Metadata, Viewport } from "next"
import { GoogleAnalytics } from "@next/third-parties/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Bricolage_Grotesque, Outfit } from "next/font/google"

import { GlobalBackground } from "@/components/site/global-background"
import { GA_MEASUREMENT_ID, isGoogleAnalyticsEnabled } from "@/lib/google-analytics"
import { buildWebmasterVerificationMetadata } from "@/lib/webmaster-verification"
import {
  FEATURED_OG_ALT,
  FEATURED_OG_DIMENSIONS,
  featuredOgImageUrl,
  homeMetadata,
  SITE_BRAND,
  SITE_URL,
} from "@/lib/site"

import "./globals.css"

export const viewport: Viewport = {
  themeColor: "#020106",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
}

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
})

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_BRAND,
  title: {
    default: homeMetadata.title,
    template: "%s | Tayyab",
  },
  description: homeMetadata.description,
  category: "technology",
  alternates: {
    types: {
      "application/rss+xml": `${SITE_URL}/feed.xml`,
    },
  },
  authors: [{ name: "Tayyab", url: `${SITE_URL}/about` }],
  creator: "Tayyab",
  publisher: "Tayyab",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_BRAND,
    url: `${SITE_URL}/`,
    title: homeMetadata.title,
    description: homeMetadata.description,
    images: [
      {
        url: featuredOgImageUrl(),
        width: FEATURED_OG_DIMENSIONS.width,
        height: FEATURED_OG_DIMENSIONS.height,
        alt: FEATURED_OG_ALT,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: homeMetadata.title,
    description: homeMetadata.description,
    images: [featuredOgImageUrl()],
  },
  verification: buildWebmasterVerificationMetadata(),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${bricolage.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="relative min-h-full bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        <GlobalBackground />
        {children}
        <Analytics />
        <SpeedInsights />
        {isGoogleAnalyticsEnabled() ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      </body>
    </html>
  )
}
