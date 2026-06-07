import type { NextConfig } from "next"

function webmasterRewrites(): { source: string; destination: string }[] {
  const rewrites: { source: string; destination: string }[] = []

  const googleFile = process.env.GOOGLE_SITE_VERIFICATION_FILE?.trim()
  if (googleFile) {
    rewrites.push({
      source: `/${googleFile}`,
      destination: "/webmaster/google-file",
    })
  }

  return rewrites
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "thisistayyab.dev" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async rewrites() {
    return webmasterRewrites()
  },
  async redirects() {
    return [
      { source: "/insights", destination: "/blog", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/profiles", destination: "/about", permanent: true },
      { source: "/profile", destination: "/about", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/project", destination: "/projects", permanent: true },
      { source: "/portfolio", destination: "/projects", permanent: true },
      { source: "/testimonial", destination: "/testimonials", permanent: true },
      { source: "/testimonial/:path*", destination: "/testimonials", permanent: true },
      { source: "/service", destination: "/services", permanent: true },
      { source: "/resume", destination: "/Tayyab-CV.pdf", permanent: true },
      { source: "/cv", destination: "/Tayyab-CV.pdf", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ]
  },
}

export default nextConfig
