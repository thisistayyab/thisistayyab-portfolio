import type { Metadata } from "next"

/**
 * Search Console / Bing Webmaster verification via env vars.
 *
 * Google (HTML meta tag): set GOOGLE_SITE_VERIFICATION to the content value only
 * (the string inside content="..." from Search Console).
 *
 * Google (HTML file): set both GOOGLE_SITE_VERIFICATION_FILE=googleXXXX.html
 * and GOOGLE_SITE_VERIFICATION (same token as in the file body).
 *
 * Bing (XML file): commit public/BingSiteAuth.xml (served at /BingSiteAuth.xml)
 * Bing (meta tag, optional instead of file): BING_SITE_VERIFICATION
 */
function trimEnv(name: string): string | undefined {
  const value = process.env[name]?.trim()
  return value && value.length > 0 ? value : undefined
}

export function getGoogleSiteVerificationToken() {
  return trimEnv("GOOGLE_SITE_VERIFICATION")
}

export function getGoogleSiteVerificationFilename() {
  return trimEnv("GOOGLE_SITE_VERIFICATION_FILE")
}

export function getBingSiteVerificationToken() {
  return trimEnv("BING_SITE_VERIFICATION")
}

export function getYandexSiteVerificationToken() {
  return trimEnv("YANDEX_SITE_VERIFICATION")
}

/** Next.js metadata.verification for root layout */
export function buildWebmasterVerificationMetadata(): Metadata["verification"] {
  const google = getGoogleSiteVerificationToken()
  const other: Record<string, string> = {}

  const bing = getBingSiteVerificationToken()
  if (bing) {
    other["msvalidate.01"] = bing
  }

  const yandex = getYandexSiteVerificationToken()
  if (yandex) {
    other.yandex = yandex
  }

  const verification: Metadata["verification"] = {}
  if (google) verification.google = google
  if (Object.keys(other).length > 0) verification.other = other

  return Object.keys(verification).length > 0 ? verification : undefined
}

export function googleVerificationFileBody(): string | null {
  const filename = getGoogleSiteVerificationFilename()
  if (!filename) return null
  return `google-site-verification: ${filename}`
}

export function isGoogleVerificationFileConfigured() {
  return Boolean(getGoogleSiteVerificationFilename() && googleVerificationFileBody())
}
