import Link from "next/link"

export function CoreWebVitalsOptimizationNextjsGuideBody() {
  return (
    <>
      <p>
        A Next.js site can score 99 in a local Lighthouse run on a MacBook Pro and still fail Google
        Search Console&apos;s <strong>Core Web Vitals</strong> assessment in the real world — or sit
        unindexed for weeks because a subtle canonical, sitemap, or redirect mistake split its crawl
        signals in half. Performance and technical SEO are not two separate checklists; in the
        Next.js App Router, they are governed by the exact same rendering, asset-loading, and HTTP
        response decisions.
      </p>
      <p>
        This guide combines the exact <strong>Core Web Vitals (LCP, INP, CLS)</strong> fixes and the{" "}
        <strong>production technical SEO architecture</strong> I use on{" "}
        <Link href="/">thisistayyab.dev</Link> and client Next.js applications into a single
        engineering reference.
      </p>

      <h2 id="lab-vs-field-data">
        Part 1: Why Lab Scores Lie — Field Data (CrUX) and the 75th Percentile Rule
      </h2>
      <p>
        Google does not rank pages based on what Lighthouse reports on your developer machine. Search
        ranking signals use <strong>Chrome User Experience Report (CrUX)</strong> field data
        evaluated at the <strong>75th percentile (p75)</strong> of real user loads over a rolling
        28-day window:
      </p>
      <ul>
        <li>
          <strong>Largest Contentful Paint (LCP):</strong> Must be <strong>&le; 2.5 seconds</strong>{" "}
          at p75. Measures how quickly the main hero image or headline block renders on screen.
        </li>
        <li>
          <strong>Interaction to Next Paint (INP):</strong> Must be{" "}
          <strong>&le; 200 milliseconds</strong> at p75. Replaced First Input Delay (FID) and
          measures the worst-case main-thread latency across <em>every</em> click, tap, and key
          press during the entire page visit.
        </li>
        <li>
          <strong>Cumulative Layout Shift (CLS):</strong> Must be <strong>&le; 0.1</strong> at p75.
          Measures unexpected visual movement of visible elements after initial paint.
        </li>
      </ul>
      <p>
        Because Google evaluates the 75th percentile, if 70% of your visitors are on fast desktop
        connections (LCP 1.1s) and 30% are on mid-tier Android phones over 4G (LCP 3.4s), your URL
        group fails. Every optimization below targets that p75 mobile tail.
      </p>

      <h2 id="fixing-lcp-in-nextjs">
        Part 2: Fixing Largest Contentful Paint (LCP) in Next.js App Router
      </h2>
      <p>
        An LCP budget of 2,500ms breaks down into four sub-phases: <strong>TTFB</strong> (Time to
        First Byte), <strong>Resource Load Delay</strong>, <strong>Resource Load Duration</strong>,
        and <strong>Element Render Delay</strong>. When LCP exceeds 2.5s in Next.js, one of these
        four mistakes is almost always the culprit:
      </p>

      <h3>1. Missing Priority and Sizes on the Hero Image</h3>
      <p>
        By default, images may wait until layout completes before the browser discovers their
        priority. On your above-the-fold hero image (whether using <code>next/image</code> or a
        static <code>&lt;picture&gt;</code> element serving AVIF + WebP), always set explicit{" "}
        <code>priority</code> (which injects a <code>&lt;link rel=&quot;preload&quot;&gt;</code>{" "}
        hint and <code>fetchPriority=&quot;high&quot;</code>), never set{" "}
        <code>loading=&quot;lazy&quot;</code> on an above-the-fold image, and always provide an
        accurate <code>sizes</code> attribute:
      </p>
      <pre>
        <code>{`<Image
  src="/images/projects/tillqorin.webp"
  alt="Tillqorin POS retail register and inventory dashboard"
  width={1280}
  height={800}
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 720px"
  className="h-auto w-full object-cover"
/>`}</code>
      </pre>
      <p>
        If you use <code>fill</code> without <code>sizes</code>, the browser assumes{" "}
        <code>100vw</code> and downloads a desktop-sized image on a 390px phone screen, adding
        hundreds of milliseconds to Resource Load Duration on mobile networks.
      </p>

      <h3>2. Accidental Dynamic Rendering Inflating TTFB</h3>
      <p>
        If your page reads <code>cookies()</code>, <code>headers()</code>, or uncached{" "}
        <code>searchParams</code> at the top of a Server Component when the content is actually
        static, every visitor waits for a cold server render instead of receiving a CDN-cached HTML
        response in 30ms. Keep marketing pages, project case studies, and blog articles statically
        prerendered at build time (or cached via ISR) so TTFB stays under 100ms globally.
      </p>

      <h3>3. Client-Rendered Hero Text Hidden Behind Motion Libraries</h3>
      <p>
        A classic portfolio anti-pattern is wrapping the hero <code>&lt;h1&gt;</code> and lead
        paragraph in a client animation wrapper that initializes with{" "}
        <code>style=&#123;&#123; opacity: 0 &#125;&#125;</code> until React hydrates and Framer
        Motion runs its <code>useEffect</code>. Chrome does not count an element with{" "}
        <code>opacity: 0</code> as painted for LCP! Even if your HTML arrives in 40ms, your LCP is
        delayed until JavaScript downloads, parses, hydrates, and finishes the fade-in animation.
        Keep your hero heading and primary image visible in the initial SSR paint or use CSS-driven
        animations that do not block initial visibility.
      </p>

      <h2 id="fixing-inp-in-nextjs">
        Part 3: Fixing Interaction to Next Paint (INP) — Taming the Main Thread
      </h2>
      <p>
        INP measures the time from a user interaction (clicking a filter pill, opening the mobile
        navigation drawer, typing into a search box) to the moment the browser actually paints the
        next visual frame. To keep INP well under 200ms:
      </p>
      <ol>
        <li>
          <strong>Keep components Server Components by default:</strong> Every kilobyte of JavaScript
          shipped via <code>&quot;use client&quot;</code> must be parsed and hydrated on the main
          thread. Push <code>&quot;use client&quot;</code> down to the smallest interactive leaf
          (the search input, the mobile sheet trigger, the share button) rather than marking entire
          page templates as client components.
        </li>
        <li>
          <strong>Yield or defer heavy work on input events:</strong> If a search input filters a
          large list AND updates analytics or URL state, update the controlled input value
          immediately and wrap non-urgent filtering in React 19&apos;s{" "}
          <code>useTransition</code> or <code>useDeferredValue</code> so typing never stutters.
        </li>
        <li>
          <strong>Avoid layout thrashing inside scroll and pointer listeners:</strong> Never read{" "}
          <code>getBoundingClientRect()</code> and write DOM styles in an unthrottled{" "}
          <code>mousemove</code> or <code>scroll</code> handler. Prefer CSS transforms (
          <code>transform</code>, <code>opacity</code>) that run on the compositor thread without
          blocking main-thread input handling.
        </li>
      </ol>

      <h2 id="fixing-cls-in-nextjs">
        Part 4: Fixing Cumulative Layout Shift (CLS) — Zero Unexpected Movement
      </h2>
      <p>CLS is the easiest Core Web Vital to lock at <code>0.00</code> once you enforce three rules:</p>
      <ul>
        <li>
          <strong>Reserve aspect-ratio boxes for every media element:</strong> Always pass explicit{" "}
          <code>width</code> and <code>height</code> props on images, or wrap responsive cards in a
          fixed aspect-ratio container (<code>aspect-[16/9]</code> or <code>aspect-[16/10]</code>) so
          the browser reserves exact vertical space before a single byte of the image loads.
        </li>
        <li>
          <strong>
            Self-host fonts with <code>next/font/local</code> and metric overrides:
          </strong>{" "}
          External Google Font stylesheets require extra DNS/TLS handshakes and often swap in with
          different line heights. Loading local variable WOFF2 fonts via{" "}
          <code>next/font/local</code> with <code>display: &quot;swap&quot;</code> and matching
          fallback metrics prevents late font reflows.
        </li>
        <li>
          <strong>Never inject banners or dynamic cards above existing content:</strong> If a status
          toast, cookie prompt, or async widget loads after initial paint, render it as a fixed
          overlay or reserve a minimum height (<code>min-h-[260px]</code>) in the skeleton slot.
        </li>
      </ul>

      <h2 id="technical-seo-checklist-for-nextjs">
        Part 5: The Production Technical SEO Checklist for Next.js
      </h2>
      <p>
        Fast Core Web Vitals get crawlers and users through the door; clean technical SEO ensures
        search engines and AI retrieval systems index the right URLs and consolidate authority onto
        your canonical domain.
      </p>

      <h3>1. Canonical URLs and Single-Hop Redirect Hygiene</h3>
      <p>
        Every indexable route should export a deterministic canonical URL via Next.js&apos;s{" "}
        <code>Metadata</code> API (<code>alternates.canonical</code>). Enforce a single canonical
        host and trailing-slash policy (`trailingSlash: false` in `next.config.ts`), and strip
        tracking query parameters (`utm_*`, `fbclid`, `gclid`) in your proxy/middleware layer when
        appropriate so marketing links never create duplicate cache entries or split ranking signals.
        When retiring or merging older URLs (as we cover in our{" "}
        <Link href="/blog/ai-overviews-cut-clicks-what-small-sites-should-publish-instead">
          analysis of AI Overviews and content consolidation
        </Link>
        ), always map retired paths to their closest topical destination with a permanent{" "}
        <code>301</code> / <code>308</code> redirect in <code>next.config.ts</code>.
      </p>

      <h3>2. Honest Sitemaps (`app/sitemap.ts`) and `robots.txt` (`app/robots.ts`)</h3>
      <p>
        Two sitemap mistakes silently hurt Next.js sites:
      </p>
      <ul>
        <li>
          <strong>
            Setting <code>lastModified: new Date()</code> on every build:
          </strong>{" "}
          If every deploy stamps today&apos;s timestamp onto every static page, Googlebot quickly
          learns your <code>lastmod</code> dates are noise and ignores them. Store real{" "}
          <code>updatedAt</code> timestamps per post and bump static route freshness dates only when
          page content meaningfully changes.
        </li>
        <li>
          <strong>
            Using <code>.avif</code> URLs inside sitemap <code>&lt;image:loc&gt;</code> or OpenGraph
            tags:
          </strong>{" "}
          While browsers love AVIF inside <code>&lt;picture&gt;</code> tags, several social
          unfurlers and
          image crawlers only reliably index WebP, PNG, or JPEG URLs in metadata and sitemaps.
          Serve AVIF + WebP in the DOM, and point <code>og:image</code>, JSON-LD{" "}
          <code>ImageObject</code>, and sitemap image entries to <code>.webp</code> or{" "}
          <code>.jpg</code>.
        </li>
      </ul>

      <h3>3. Connected Entity Graph with Schema.org JSON-LD</h3>
      <p>
        Instead of pasting isolated snippets of JSON-LD on random pages, connect your site&apos;s
        entities with stable <code>@id</code> URIs:
      </p>
      <ul>
        <li>
          Define your canonical <code>Person</code> (or <code>Organization</code>) entity once with a
          stable <code>@id</code> (e.g., <code>https://thisistayyab.dev/#person</code>), complete
          with <code>sameAs</code> links to GitHub and LinkedIn.
        </li>
        <li>
          Reference that exact <code>@id</code> as the <code>author</code> and{" "}
          <code>publisher</code> on every <code>BlogPosting</code>, the <code>author</code>/
          <code>creator</code> on every <code>SoftwareApplication</code> case study (like{" "}
          <Link href="/projects/tillqorin">Tillqorin POS</Link> and{" "}
          <Link href="/projects/auditbloc">AuditBloc</Link>), and the <code>provider</code> on your
          services list.
        </li>
        <li>
          Add <code>BreadcrumbList</code> and <code>FAQPage</code> JSON-LD where visible breadcrumbs
          and FAQ sections exist on the page.
        </li>
      </ul>

      <h3>4. Machine-Readable Context (`llms.txt` and Semantic HTML)</h3>
      <p>
        Alongside <code>/sitemap.xml</code>, <code>/robots.txt</code>, and <code>/feed.xml</code>,
        serving a concise <code>/llms.txt</code> file at the domain root provides AI search engines
        and retrieval agents with a structured summary of your primary pages, live applications, and
        contact endpoints. Pair that with semantic HTML landmarks (<code>&lt;header&gt;</code>,{" "}
        <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>,{" "}
        <code>&lt;footer&gt;</code>) and server-rendered prose (see the performance half of this
        guide above) so crawlers never have to execute heavy client bundles just to read your copy.
      </p>

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        <strong>
          Why does my Lighthouse score say 98 while Search Console says Core Web Vitals failed?
        </strong>
        <br />
        Lighthouse is a single synthetic lab run on simulated hardware, whereas Google Search
        Console reports the 75th percentile of real user Chrome sessions (CrUX) across real mobile
        devices, networks, and geographic regions.
      </p>
      <p>
        <strong>What are the passing thresholds for LCP, INP, and CLS?</strong>
        <br />
        At the 75th percentile of real-user page loads, Largest Contentful Paint (LCP) must be 2.5
        seconds or under, Interaction to Next Paint (INP) must be 200 milliseconds or under, and
        Cumulative Layout Shift (CLS) must be 0.1 or under.
      </p>
      <p>
        <strong>Should sitemap lastmod use the build timestamp?</strong>
        <br />
        No. Setting every URL&apos;s <code>lastmod</code> to the deployment time trains crawlers to
        distrust your sitemap freshness signals. Only update <code>lastmod</code> when the
        page&apos;s primary content meaningfully changes.
      </p>

      <p>
        Need help optimizing Core Web Vitals, fixing Next.js App Router performance bottlenecks, or
        architecting technical SEO for a high-traffic product? Check out my{" "}
        <Link href="/services">Next.js and full stack engineering services</Link> or{" "}
        <Link href="/contact">get in touch</Link> for a technical audit.
      </p>
    </>
  )
}
