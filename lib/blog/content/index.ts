import { createElement, type ComponentType, type ReactElement } from "react"

import { BLOG_POSTS } from "@/lib/blog/posts"

import { AdaTitleIiWebAccessibilityDeadline2027Body } from "./ada-title-ii-web-accessibility-deadline-2027"
import { AiOverviewsCutClicksWhatSmallSitesShouldPublishInsteadBody } from "./ai-overviews-cut-clicks-what-small-sites-should-publish-instead"
import { AutomatedAccessibilityTestingAxeCorePlaywrightBody } from "./automated-accessibility-testing-axe-core-playwright"
import { CoreWebVitalsOptimizationNextjsGuideBody } from "./core-web-vitals-optimization-nextjs-guide"
import { HowIBuiltTillqorinPosCommerceOsBody } from "./how-i-built-tillqorin-pos-commerce-os"
import { HowToHireFullStackDeveloperStartup2026Body } from "./how-to-hire-full-stack-developer-startup-2026"
import { WebrtcPeerToPeerFileTransferTutorialBody } from "./webrtc-peer-to-peer-file-transfer-tutorial"

/**
 * Article bodies, one component per post. Every entry in `BLOG_POSTS` needs a
 * body: the check below fails the build instead of shipping an empty article.
 */
const BLOG_POST_BODIES: Record<string, ComponentType> = {
  "ada-title-ii-web-accessibility-deadline-2027": AdaTitleIiWebAccessibilityDeadline2027Body,
  "ai-overviews-cut-clicks-what-small-sites-should-publish-instead": AiOverviewsCutClicksWhatSmallSitesShouldPublishInsteadBody,
  "automated-accessibility-testing-axe-core-playwright": AutomatedAccessibilityTestingAxeCorePlaywrightBody,
  "core-web-vitals-optimization-nextjs-guide": CoreWebVitalsOptimizationNextjsGuideBody,
  "how-i-built-tillqorin-pos-commerce-os": HowIBuiltTillqorinPosCommerceOsBody,
  "how-to-hire-full-stack-developer-startup-2026": HowToHireFullStackDeveloperStartup2026Body,
  "webrtc-peer-to-peer-file-transfer-tutorial": WebrtcPeerToPeerFileTransferTutorialBody,
}

const missing = BLOG_POSTS.filter((post) => !BLOG_POST_BODIES[post.slug]).map((post) => post.slug)

if (missing.length > 0) {
  throw new Error(`Missing article body for: ${missing.join(", ")}`)
}

/** Returns an element rather than a component so the route never creates a component during render. */
export function renderBlogPostBody(slug: string): ReactElement | null {
  const Body = BLOG_POST_BODIES[slug]

  return Body ? createElement(Body) : null
}
