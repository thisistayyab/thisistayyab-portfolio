import { type NextRequest, NextResponse } from "next/server"

import { updateSession } from "@/lib/supabase/middleware"

const ADMIN_PREFIX = "/dashboard"
const LOGIN_PATH = "/login"

export async function middleware(request: NextRequest) {
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
  matcher: ["/", "/dashboard/:path*", "/login"],
}
