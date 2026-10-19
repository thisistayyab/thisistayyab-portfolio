"use client"

import { useEffect } from "react"

const WARMUP_URLS = [
  "https://relay.thisistayyab.dev/",
  "https://downloader.thisistayyab.dev/",
] as const

/**
 * Silently sends a low-priority no-cors request after initial page hydration
 * so free-tier cloud containers (e.g. Render) begin waking up before the user clicks "Live View".
 */
export function ProjectWarmup({ urls = WARMUP_URLS }: { urls?: readonly string[] }) {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      for (const url of urls) {
        fetch(url, { mode: "no-cors", cache: "no-store", priority: "low" }).catch(() => {
          // Ignore network/CORS errors on background warmup ping
        })
      }
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [urls])

  return null
}
