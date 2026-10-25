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
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "thisistayyab.dev" }],
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
      { source: "/feed", destination: "/feed.xml", permanent: true },
      { source: "/rss", destination: "/feed.xml", permanent: true },
      { source: "/rss.xml", destination: "/feed.xml", permanent: true },

      // Legacy admin paths redirect to home.
      { source: "/dashboard", destination: "/", permanent: true },
      { source: "/dashboard/:path*", destination: "/", permanent: true },
      { source: "/login", destination: "/", permanent: true },

      // Retired blog slugs permanently redirect to the closest canonical article or hub.
      {
        source: "/blog/nextjs-16-app-router-production-guide",
        destination: "/blog/core-web-vitals-optimization-nextjs-guide",
        permanent: true,
      },
      { source: "/blog/react-vs-nextjs-2026-which-should-you-learn", destination: "/blog", permanent: true },
      { source: "/blog/rest-api-nodejs-express-postgresql-complete-guide", destination: "/blog", permanent: true },
      { source: "/blog/supabase-vs-firebase-2026-comparison", destination: "/blog", permanent: true },
      { source: "/blog/mern-vs-nextjs-full-stack-2026", destination: "/blog", permanent: true },
      { source: "/blog/leetcode-strategy-web-developers-1150-problems", destination: "/about", permanent: true },
      { source: "/blog/the-agentic-ai-wars-have-begun-gpt-5-3-codex-vs-claude-opus-4-6", destination: "/blog", permanent: true },
      {
        source: "/blog/technical-seo-checklist-web-developers-2026",
        destination: "/blog/core-web-vitals-optimization-nextjs-guide",
        permanent: true,
      },
      {
        source: "/blog/google-stopped-sending-clicks",
        destination: "/blog/ai-overviews-cut-clicks-what-small-sites-should-publish-instead",
        permanent: true,
      },
      {
        source: "/blog/the-death-of-the-static-site-why-your-business-needs-an-agentic-web-presence-in-2026",
        destination: "/blog/ai-overviews-cut-clicks-what-small-sites-should-publish-instead",
        permanent: true,
      },
      {
        source: "/blog/your-website-is-invisible-to-40-of-your-customers-here-is-why",
        destination: "/blog/ada-title-ii-web-accessibility-deadline-2027",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
