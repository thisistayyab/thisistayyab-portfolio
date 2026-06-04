import { googleVerificationFileBody, isGoogleVerificationFileConfigured } from "@/lib/webmaster-verification"

/** Google Search Console HTML-file verification (rewritten from /google*.html). */
export function GET() {
  const body = googleVerificationFileBody()
  if (!isGoogleVerificationFileConfigured() || !body) {
    return new Response("Not configured", { status: 404 })
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  })
}
