import type { BlogAuthor, BlogPostMeta } from "@/lib/blog/types"

/** Matches the `Person` entity in `lib/person-json-ld.ts` so author signals consolidate. */
export const BLOG_AUTHOR: BlogAuthor = {
  name: "Tayyab",
  avatarUrl: "/images/about.webp",
}

/**
 * Single source of truth for blog metadata. Each entry needs a matching body
 * component registered in `lib/blog/content/index.ts`, which fails the build
 * if one is missing.
 *
 * Publishing a post: add the entry and its body component, then deploy.
 * Retiring a post: remove both and add a permanent redirect in `next.config.ts`
 * to the closest related page.
 */
export const BLOG_POSTS: readonly BlogPostMeta[] = [
  {
    slug: "ada-title-ii-web-accessibility-deadline-2027",
    title: "ADA Title II Web Accessibility: The Deadline Moved to April 2027",
    excerpt:
      "The DOJ extended its web and mobile app rule to April 2027 and April 2028. What changed, who is actually liable, and what to build with the extra year.",
    coverImage: "/images/blog/ada-title-ii-web-accessibility-deadline-2027.webp",
    publishedAt: "2026-10-25T11:05:00Z",
    updatedAt: "2026-10-25T11:05:00Z",
    readTimeMinutes: 14,
    seoTitle: "ADA Title II Web Accessibility Deadline: April 2027",
    seoDescription:
      "DOJ extended ADA Title II web accessibility compliance to April 2027 and 2028. WCAG 2.1 AA scope, the five exceptions, and a month-by-month remediation plan.",
    seoKeywords: [
      "ADA Title II compliance deadline",
      "ADA website accessibility 2027",
      "WCAG 2.1 AA requirement",
      "DOJ web accessibility rule",
      "public sector website accessibility",
      "accessibility remediation plan",
    ],
    tags: ["Accessibility", "Compliance"],
    faq: [
      {
        question: "Did the ADA Title II compliance deadline move?",
        answer:
          "Yes. On April 20, 2026, the Department of Justice issued an interim final rule moving the compliance date for public entities with a population of 50,000 or more from April 24, 2026 to April 26, 2027. Entities under 50,000 and special district governments now have until April 26, 2028.",
      },
      {
        question: "Does ADA Title II apply to private businesses?",
        answer:
          "Directly, no — Title II covers state and local governments. Private businesses are covered by Title III, unless they build or operate web content or mobile apps under contract with a state or local government, in which case the Title II standard flows through the procurement contract.",
      },
      {
        question: "Why WCAG 2.1 AA and not WCAG 2.2?",
        answer:
          "The DOJ locked the technical standard to WCAG 2.1 Level AA when drafting the rule so regulated entities had a fixed specification to build against. Meeting WCAG 2.2 AA automatically satisfies WCAG 2.1 AA because 2.2 is backward-compatible.",
      },
      {
        question: "Can an accessibility overlay widget make a site compliant?",
        answer:
          "No. Overlay widgets do not remediate underlying DOM structure, form labels, keyboard traps, or PDF tags, and the FTC fined a major overlay vendor $1 million in 2025 for deceptive compliance claims.",
      },
    ],
  },
  {
    slug: "ai-overviews-cut-clicks-what-small-sites-should-publish-instead",
    title: "AI Overviews Cut Clicks 58%: What Small Sites Should Publish Instead",
    excerpt:
      "The 2026 data on AI Overviews, llms.txt, and AI referral traffic — and why shipping interactive tools and engineering case studies beats generic blog posts.",
    coverImage:
      "/images/blog/ai-overviews-cut-clicks-what-small-sites-should-publish-instead.webp",
    publishedAt: "2026-10-25T08:15:00Z",
    updatedAt: "2026-10-25T08:15:00Z",
    readTimeMinutes: 13,
    seoTitle: "AI Overviews Cut Clicks 58% — What to Publish Instead",
    seoDescription:
      "AI Overviews cut clicks 58% at position one. What Ahrefs and Similarweb data show, and why shipping interactive tools and deep case studies wins in 2026.",
    seoKeywords: [
      "AI Overviews",
      "AI Overviews click through rate",
      "SEO in 2026",
      "llms.txt",
      "AI referral traffic",
      "answer engine optimization",
      "zero click search",
    ],
    tags: ["SEO & Performance", "AI Search"],
    faq: [
      {
        question: "How much do AI Overviews reduce click-through rate?",
        answer:
          "Across 300,000 informational keywords studied by Ahrefs, the average position-one organic click-through rate dropped from 3.9% on queries without an AI Overview to 1.6% on queries with one — a 58% reduction.",
      },
      {
        question: "Does llms.txt improve rankings in ChatGPT or Perplexity?",
        answer:
          "On its own, llms.txt is a lightweight machine-readability index rather than a ranking booster. It helps document site structure alongside sitemap.xml and JSON-LD, but real search and AI citations come from original data, live tools, and production case studies.",
      },
      {
        question: "Should a developer portfolio or small SaaS stop writing blog posts?",
        answer:
          "Stop publishing generic definitional essays that summarize existing documentation. Keep publishing original engineering case studies, dated regulatory or benchmark analysis, and interactive tools that require a visit to use.",
      },
    ],
  },
  {
    slug: "how-to-hire-full-stack-developer-startup-2026",
    title: "How to Hire a Full Stack Developer for Your Startup in 2026",
    excerpt:
      "A practical 2026 hiring guide for startups: where to find full stack developers, what stacks to look for, red flags to avoid, and how to scope your first build.",
    coverImage: "/images/blog/how-to-hire-full-stack-developer-startup-2026.webp",
    publishedAt: "2026-05-21T08:50:00Z",
    updatedAt: "2026-10-18T06:24:21Z",
    readTimeMinutes: 18,
    seoTitle: "How to Hire a Full Stack Developer for Your Startup (2026)",
    seoDescription:
      "Learn how startups should hire a full stack developer in 2026 — stacks, portfolios, red flags, budgets, and the questions that reveal real engineering skill.",
    seoKeywords: [
      "hire full stack developer",
      "hire developer for startup",
      "freelance full stack developer",
      "React developer for hire",
      "how to hire a web developer",
      "full stack hiring guide",
    ],
    tags: ["Full Stack", "Hiring"],
    faq: [
      {
        question: "Should I hire a generalist or two specialists (frontend + backend) for an MVP?",
        answer:
          "For an MVP, one strong full stack generalist is almost always faster and more cost-effective. The coordination overhead of two specialists on a small codebase outweighs the depth advantage until the product has validated traction.",
      },
      {
        question: "How do I evaluate a developer if I am a non-technical founder?",
        answer:
          "Inspect live deployed URLs on your phone, test unglamorous flows like validation errors and page refreshes, ask for a walkthrough of a past production bug, and start with a paid one-to-two-week milestone before committing to a long contract.",
      },
      {
        question: "Should I require TypeScript for a new startup codebase in 2026?",
        answer:
          "Yes. TypeScript catches data-shape mismatches at build time, makes refactoring safe when product requirements shift, and is the standard across modern React, Next.js, and Node.js teams.",
      },
    ],
  },
  {
    slug: "how-i-built-tillqorin-pos-commerce-os",
    title: "Case Study: Building Tillqorin POS — a Web Commerce OS for Retail",
    excerpt:
      "How Tillqorin POS was built: React + Vite frontend, Express API, Supabase database — covering inventory, invoicing, thermal receipt printing, and offline-tolerant retail UIs.",
    coverImage: "/images/blog/how-i-built-tillqorin-pos-commerce-os.webp",
    publishedAt: "2026-04-07T13:30:00Z",
    updatedAt: "2026-10-18T06:24:21Z",
    readTimeMinutes: 13,
    seoTitle: "How I Built Tillqorin POS — Web Commerce OS Case Study",
    seoDescription:
      "Case study: building Tillqorin POS with React, Vite, Express, and Supabase — transactions, inventory integrity, thermal receipt printing, and real analytics.",
    seoKeywords: [
      "Tillqorin POS",
      "POS system case study",
      "retail web app development",
      "inventory management build",
      "thermal receipt printing web app",
      "Supabase POS",
      "React commerce application",
    ],
    tags: ["Case Study", "Full Stack"],
    faq: [
      {
        question: "Why did you choose React + Vite over Next.js for Tillqorin POS?",
        answer:
          "A POS register is an authenticated, long-lived single-page workspace behind a login screen. It does not need public URL indexing, and a Vite SPA keeps the client bundle lean and fast for barcode-scanner and keyboard-driven checkout workflows.",
      },
      {
        question: "Why keep an Express API server when using Supabase?",
        answer:
          "Transactional multi-table checkouts, server-side invoice number sequences, and background jobs like email receipts and CSV exports are cleaner to test, version, and secure in a dedicated Node.js + Express layer than scattering logic across client calls.",
      },
      {
        question: "How does thermal receipt printing work from a browser?",
        answer:
          "Tillqorin uses dedicated print stylesheets (@media print) sized to 80mm and 58mm thermal rolls with monospace alignment, zero margins, and page-break controls so cashiers can print cleanly through the standard browser print dialog.",
      },
    ],
  },
  {
    slug: "automated-accessibility-testing-axe-core-playwright",
    title: "Automated Web Accessibility Testing with axe-core and Playwright",
    excerpt:
      "How to automate WCAG accessibility audits with Playwright and axe-core: setup, custom rules, CI integration, GDPR cookie checks, and what automation still cannot catch.",
    coverImage: "/images/blog/automated-accessibility-testing-axe-core-playwright.webp",
    publishedAt: "2026-03-18T10:05:00Z",
    updatedAt: "2026-10-18T06:24:21Z",
    readTimeMinutes: 13,
    seoTitle: "Automated Accessibility Testing — axe-core & Playwright",
    seoDescription:
      "Automate WCAG audits with Playwright and axe-core: setup, multi-state scanning, cookie banner checks, CI integration, and manual test limits.",
    seoKeywords: [
      "automated accessibility testing",
      "axe-core Playwright",
      "WCAG compliance checker",
      "accessibility audit automation",
      "GDPR cookie banner testing",
      "web accessibility scanner",
      "AuditBloc",
    ],
    tags: ["Accessibility", "SEO & Performance"],
    faq: [
      {
        question: "What percentage of WCAG issues can axe-core catch automatically?",
        answer:
          "Roughly 30% to 40% of WCAG criteria by count, and up to 50% of common real-world violations by volume. The remaining criteria require human judgment on reading order, alt-text accuracy, and keyboard usability.",
      },
      {
        question: "Does passing an automated axe-core scan make a website ADA compliant?",
        answer:
          "No. Passing an automated scan eliminates the machine-detectable violations that trigger most demand letters, but full WCAG 2.1 AA compliance also requires manual keyboard and screen-reader verification.",
      },
      {
        question: "Why run axe-core inside Playwright instead of a static HTML checker?",
        answer:
          "Playwright renders the real page in a headless browser, executes client-side JavaScript, computes actual CSS contrast ratios, and lets you open modals, drawers, and form error states before running axe-core.",
      },
    ],
  },
  {
    slug: "webrtc-peer-to-peer-file-transfer-tutorial",
    title: "WebRTC Peer-to-Peer File Transfer: How to Build It (Relay Case Study)",
    excerpt:
      "Build browser-to-browser file transfer with WebRTC data channels — signaling explained, chunking large files, why no server sees the data, and privacy-by-design architecture.",
    coverImage: "/images/blog/webrtc-peer-to-peer-file-transfer-tutorial.webp",
    publishedAt: "2026-02-09T15:40:00Z",
    updatedAt: "2026-10-18T06:24:21Z",
    readTimeMinutes: 14,
    seoTitle: "WebRTC Peer-to-Peer File Transfer Tutorial (with Relay)",
    seoDescription:
      "Build browser-to-browser file transfer with WebRTC: signaling, NAT traversal, chunked transfers, buffered channels, and a privacy-first architecture case study.",
    seoKeywords: [
      "WebRTC file transfer",
      "peer to peer file sharing browser",
      "WebRTC data channels",
      "Socket.IO tutorial",
      "privacy-first file transfer",
      "WebRTC signaling",
      "Relay app",
    ],
    tags: ["Real-Time & WebRTC", "Case Study"],
    faq: [
      {
        question: "Are WebRTC data channels encrypted by default?",
        answer:
          "Yes. Every WebRTC data channel is mandatorily encrypted end-to-end between the two browsers using DTLS (Datagram Transport Layer Security). Neither the signaling server nor STUN servers can read the payload.",
      },
      {
        question: "Why do you need backpressure control when sending files over WebRTC?",
        answer:
          "Reading a multi-hundred-megabyte file from disk is much faster than network upload speed. Monitoring RTCDataChannel.bufferedAmountLowThreshold prevents the sender's SCTP buffer from overflowing and dropping the channel.",
      },
      {
        question: "What happens when two peers are behind strict symmetric NATs?",
        answer:
          "Direct peer-to-peer hole punching via STUN fails on symmetric NATs (roughly 10% to 15% of enterprise or cellular networks), requiring a TURN relay server that forwards the DTLS-encrypted packets without decrypting them.",
      },
    ],
  },
  {
    slug: "core-web-vitals-optimization-nextjs-guide",
    title: "Core Web Vitals & Technical SEO for Next.js: The Complete Guide",
    excerpt:
      "Fixing LCP, INP, and CLS in Next.js — plus the technical SEO checklist that goes with them: canonicals, structured data, sitemaps, hreflang, and migrations.",
    coverImage: "/images/blog/core-web-vitals-optimization-nextjs-guide.webp",
    publishedAt: "2026-01-14T09:25:00Z",
    updatedAt: "2026-10-25T08:20:00Z",
    readTimeMinutes: 25,
    seoTitle: "Core Web Vitals & Technical SEO for Next.js — Full Guide",
    seoDescription:
      "Practical Core Web Vitals fixes for Next.js and the technical SEO checklist that ships with them: LCP, INP, CLS, canonicals, JSON-LD, and sitemaps.",
    seoKeywords: [
      "Core Web Vitals",
      "Next.js performance optimization",
      "LCP optimization",
      "INP interaction to next paint",
      "CLS fix",
      "Next.js image optimization",
      "technical SEO checklist",
      "structured data JSON-LD",
      "sitemap best practices",
      "llms.txt",
      "canonical tags",
      "hreflang",
    ],
    tags: ["SEO & Performance", "Next.js"],
    faq: [
      {
        question: "Why does my Lighthouse score say 98 while Search Console says Core Web Vitals failed?",
        answer:
          "Lighthouse is a single synthetic lab run on simulated hardware, whereas Google Search Console reports the 75th percentile of real user Chrome sessions (CrUX) across real mobile devices, networks, and geographic regions.",
      },
      {
        question: "What are the passing thresholds for LCP, INP, and CLS?",
        answer:
          "At the 75th percentile of real-user page loads, Largest Contentful Paint (LCP) must be 2.5 seconds or under, Interaction to Next Paint (INP) must be 200 milliseconds or under, and Cumulative Layout Shift (CLS) must be 0.1 or under.",
      },
      {
        question: "Should sitemap lastmod use the build timestamp?",
        answer:
          "No. Setting every URL's lastmod to the deployment time trains crawlers to distrust your sitemap freshness signals. Only update lastmod when the page's primary content meaningfully changes.",
      },
    ],
  },
]
