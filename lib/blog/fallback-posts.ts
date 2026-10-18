import type { SitemapPostEntry } from "@/lib/blog/types"

/**
 * Built-in fallback post registry for sitemap and build-time static generation.
 * Ensures sitemap.xml and feeds NEVER drop articles even if the database is
 * unreachable at build time or during cold starts.
 */
export const FALLBACK_PUBLISHED_POSTS: SitemapPostEntry[] = [
  {
    slug: "how-to-hire-full-stack-developer-startup-2026",
    published_at: "2026-10-14T08:20:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/how-to-hire-full-stack-developer-startup-2026.avif",
  },
  {
    slug: "nextjs-16-app-router-production-guide",
    published_at: "2026-10-10T11:45:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/nextjs-16-app-router-production-guide.avif",
  },
  {
    slug: "react-vs-nextjs-2026-which-should-you-learn",
    published_at: "2026-10-06T15:10:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/react-vs-nextjs-2026-which-should-you-learn.avif",
  },
  {
    slug: "rest-api-nodejs-express-postgresql-complete-guide",
    published_at: "2026-10-01T09:35:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/rest-api-nodejs-express-postgresql-complete-guide.avif",
  },
  {
    slug: "supabase-vs-firebase-2026-comparison",
    published_at: "2026-09-26T14:05:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/supabase-vs-firebase-2026-comparison.avif",
  },
  {
    slug: "how-i-built-tillqorin-pos-commerce-os",
    published_at: "2026-09-20T10:50:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/how-i-built-tillqorin-pos-commerce-os.avif",
  },
  {
    slug: "automated-accessibility-testing-axe-core-playwright",
    published_at: "2026-09-14T16:25:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/automated-accessibility-testing-axe-core-playwright.avif",
  },
  {
    slug: "webrtc-peer-to-peer-file-transfer-tutorial",
    published_at: "2026-09-08T09:15:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/webrtc-peer-to-peer-file-transfer-tutorial.avif",
  },
  {
    slug: "core-web-vitals-optimization-nextjs-guide",
    published_at: "2026-09-02T13:40:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/core-web-vitals-optimization-nextjs-guide.avif",
  },
  {
    slug: "technical-seo-checklist-web-developers-2026",
    published_at: "2026-08-27T11:05:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/technical-seo-checklist-web-developers-2026.avif",
  },
  {
    slug: "leetcode-strategy-web-developers-1150-problems",
    published_at: "2026-08-20T15:55:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/leetcode-strategy-web-developers-1150-problems.avif",
  },
  {
    slug: "mern-vs-nextjs-full-stack-2026",
    published_at: "2026-08-12T10:30:00.000Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image: "/images/blog/mern-vs-nextjs-full-stack-2026.avif",
  },
  {
    slug: "google-stopped-sending-clicks",
    published_at: "2026-07-11T18:31:22.610Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image:
      "https://res.cloudinary.com/dxvs4jtl1/image/upload/v1783798255/TheZero-ClickInternetIsHere7ProvenWaystoGetWebsiteTraffic-thisistayyab_cao21w.webp",
  },
  {
    slug: "the-death-of-the-static-site-why-your-business-needs-an-agentic-web-presence-in-2026",
    published_at: "2026-02-09T18:22:43.799Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image:
      "https://res.cloudinary.com/dxvs4jtl1/image/upload/v1770661333/tech-trends_idvxjp.webp",
  },
  {
    slug: "your-website-is-invisible-to-40-of-your-customers-here-is-why",
    published_at: "2026-02-08T18:07:30.958Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image:
      "https://res.cloudinary.com/dxvs4jtl1/image/upload/v1770574002/SEO_War_hml3rl.webp",
  },
  {
    slug: "the-agentic-ai-wars-have-begun-gpt-5-3-codex-vs-claude-opus-4-6",
    published_at: "2026-02-07T11:23:10.255Z",
    updated_at: "2026-10-18T00:00:00.000Z",
    cover_image:
      "https://res.cloudinary.com/dxvs4jtl1/image/upload/v1770463260/gpt-vs-anthropic.webp",
  },
]
