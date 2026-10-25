import type { MetadataRoute } from "next"

import { SITE_URL } from "@/lib/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/webmaster/", "/assets-archive/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
          "Amazonbot",
        ],
        allow: "/",
        disallow: ["/api/", "/webmaster/", "/assets-archive/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}

