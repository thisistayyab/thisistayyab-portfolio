import type { Metadata } from "next"
import { Bricolage_Grotesque, Outfit } from "next/font/google"

import { GlobalBackground } from "@/components/site/global-background"
import {
  FEATURED_OG_ALT,
  FEATURED_OG_DIMENSIONS,
  featuredOgImageUrl,
  homeMetadata,
  SITE_URL,
} from "@/lib/site"

import "./globals.css"

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
  applicationName: "Tayyab Portfolio",
  title: {
    default: homeMetadata.title,
    template: "%s | Tayyab",
  },
  description: homeMetadata.description,
  keywords: [...homeMetadata.keywords],
  authors: [{ name: "Tayyab", url: SITE_URL }],
  creator: "Tayyab",
  manifest: "/site.webmanifest",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "256x256" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Tayyab — Full Stack Developer",
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
    >
      <body className="relative min-h-full bg-background font-sans text-foreground">
        <GlobalBackground />
        {children}
      </body>
    </html>
  )
}
