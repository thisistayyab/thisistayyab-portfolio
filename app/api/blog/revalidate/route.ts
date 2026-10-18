import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

import { BLOG_INDEX_PATH } from "@/lib/blog/config"
import { createSupabaseServerClient } from "@/lib/supabase/server"

async function isAuthorized(request: Request): Promise<boolean> {
  const secretHeader = request.headers.get("x-revalidate-secret")
  const url = new URL(request.url)
  const secretQuery = url.searchParams.get("secret")
  const expectedSecret = process.env.REVALIDATE_SECRET

  if (expectedSecret && (secretHeader === expectedSecret || secretQuery === expectedSecret)) {
    return true
  }

  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return Boolean(user)
  } catch {
    return false
  }
}

async function handleRevalidation(request: Request, slug?: string) {
  const revalidatedPaths = [BLOG_INDEX_PATH, "/", "/sitemap.xml", "/feed.xml"]

  revalidatePath(BLOG_INDEX_PATH)
  revalidatePath("/")
  revalidatePath("/sitemap.xml")
  revalidatePath("/feed.xml")

  if (slug) {
    const postPath = `${BLOG_INDEX_PATH}/${slug}`
    revalidatePath(postPath)
    revalidatedPaths.push(postPath)
  }

  return NextResponse.json({
    ok: true,
    revalidated: revalidatedPaths,
    now: new Date().toISOString(),
  })
}

/**
 * On-demand revalidation endpoint.
 * Accepts requests from the admin CMS or external webhook triggers (e.g. Supabase DB webhooks).
 */
export async function POST(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  let slug: string | undefined
  const url = new URL(request.url)
  slug = url.searchParams.get("slug") ?? undefined

  if (!slug) {
    try {
      const body = (await request.json()) as { slug?: string }
      slug = body.slug
    } catch {
      // no body — will revalidate default listing and sitemap paths
    }
  }

  return handleRevalidation(request, slug)
}

export async function GET(request: Request) {
  if (!(await isAuthorized(request))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const url = new URL(request.url)
  const slug = url.searchParams.get("slug") ?? undefined

  return handleRevalidation(request, slug)
}

