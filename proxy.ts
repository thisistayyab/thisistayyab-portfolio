import { type NextRequest, NextResponse } from "next/server"

import { updateSession } from "@/lib/supabase/middleware"

const ADMIN_PREFIX = "/dashboard"
const LOGIN_PATH = "/login"

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") || ""

  /** Enforce non-www canonical domain (fixes duplicate www vs non-www indexation). */
  if (host.startsWith("www.")) {
    const url = request.nextUrl.clone()
    url.host = host.replace(/^www\./, "")
    return NextResponse.redirect(url, 308)
  }

  /**
   * Enforce canonical thisistayyab.dev over default *.vercel.app domains in production.
   * Prevents duplicate content indexation in Google and Bing.
   */
  if (
    (host === "thisistayyab.vercel.app" ||
      (process.env.VERCEL_ENV === "production" && host.endsWith(".vercel.app"))) &&
    !host.includes("localhost")
  ) {
    const url = request.nextUrl.clone()
    url.protocol = "https:"
    url.host = "thisistayyab.dev"
    return NextResponse.redirect(url, 308)
  }

  const { pathname, searchParams } = request.nextUrl

  /** Stale `?s=` search-box crawl from a previous version of the site — no search feature exists now. */
  if (pathname === "/" && searchParams.has("s")) {
    return NextResponse.redirect(new URL("/", request.url), 308)
  }

  if (!pathname.startsWith(ADMIN_PREFIX) && pathname !== LOGIN_PATH) {
    return NextResponse.next()
  }

  const { response, user } = await updateSession(request)

  if (pathname.startsWith(ADMIN_PREFIX) && !user) {
    const loginUrl = new URL(LOGIN_PATH, request.url)
    loginUrl.searchParams.set("next", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname === LOGIN_PATH && user) {
    return NextResponse.redirect(new URL("/dashboard/blog", request.url))
  }

  return response
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap\\.xml|robots\\.txt|feed\\.xml|site\\.webmanifest|llms\\.txt|BingSiteAuth\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|woff2|pdf|ico|xml|txt|webmanifest)$).*)",
  ],
}

