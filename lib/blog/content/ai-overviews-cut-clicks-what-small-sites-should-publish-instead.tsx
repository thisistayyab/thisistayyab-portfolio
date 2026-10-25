import Link from "next/link"

export function AiOverviewsCutClicksWhatSmallSitesShouldPublishInsteadBody() {
  return (
    <>
      <p>
        For fifteen years, the playbook for a small software company, agency, or independent
        developer blog was simple: find a long-tail informational keyword (&quot;what is WebRTC
        signaling,&quot; &quot;React vs Next.js,&quot; &quot;how to structure a PostgreSQL
        schema&quot;), write a clear 1,500-word explainer, rank in the top three, and collect steady
        organic traffic. In 2026, that playbook is upside down. Your page can still rank at position
        one in Google Search Console — impressions flat or even climbing — while actual clicks to
        your site fall by more than half.
      </p>
      <p>
        Here is what the 2025–2026 search data actually shows on{" "}
        <strong>Google AI Overviews</strong>, <strong>AI referral traffic</strong>, and{" "}
        <code>llms.txt</code> — and what small sites, developer portfolios, and boutique SaaS
        products should ship instead of another generic tutorial.
      </p>

      <h2 id="the-2026-numbers">The 2026 Numbers: Impressions Up, Clicks Down 58%</h2>
      <p>
        Multiple large-scale telemetry studies published across late 2025 and early 2026 converged
        on the same structural shift in informational search:
      </p>

      <table>
        <thead>
          <tr>
            <th>Study / Source</th>
            <th>Dataset scope</th>
            <th>Key finding</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ahrefs (Dec 2025 – Q1 2026)</td>
            <td>300,000 informational &amp; commercial keywords</td>
            <td>
              Position-one organic CTR averaged <strong>3.9%</strong> without an AI Overview vs.{" "}
              <strong>1.6%</strong> when an AI Overview appeared — a <strong>58% drop</strong>.
            </td>
          </tr>
          <tr>
            <td>Seer Interactive (2025–2026)</td>
            <td>Cross-client GSC + paid search cohort</td>
            <td>
              Organic CTR on queries triggering AI Overviews fell by roughly{" "}
              <strong>61% year-over-year</strong>, even when rankings held steady in positions 1–3.
            </td>
          </tr>
          <tr>
            <td>Similarweb (Global Web Index, 2026)</td>
            <td>Top 1,000 news &amp; informational domains</td>
            <td>
              Zero-click searches rose above <strong>65%</strong> on informational queries; AI
              chatbot referrals grew rapidly in percentage terms but replaced less than{" "}
              <strong>1% to 2%</strong> of lost search clicks for most publishers.
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        Notice the mechanism. Google did not de-index those pages. In fact, being cited inside the
        AI Overview counts as a high-ranking impression in Google Search Console, which is why so
        many site owners see the classic &quot;crocodile jaw&quot; chart in GSC: the purple
        impressions line tilts up while the blue clicks line tilts down. When a searcher asks a
        question that can be answered in six bullet points (&quot;what is the difference between SSR
        and CSR&quot;), the synthesized answer at the top of the SERP satisfies the query on the
        spot.
      </p>

      <h2 id="what-about-llms-txt-and-aeo">
        What About <code>llms.txt</code>, Schema, and &quot;Answer Engine Optimization&quot;?
      </h2>
      <p>
        As organic click-through rates dropped, a wave of &quot;AEO&quot; and &quot;GEO&quot; advice
        promised that adding an <code>/llms.txt</code> file or sprinkling extra schema markup would
        make ChatGPT, Perplexity, and Claude send floods of high-intent traffic. It helps to
        separate <strong>good technical hygiene</strong> from <strong>wishful thinking</strong>:
      </p>
      <ul>
        <li>
          <strong>
            <code>llms.txt</code> is documentation hygiene, not a ranking lever.
          </strong>{" "}
          I serve a clean <code>/llms.txt</code> file on this site (and cover how it fits alongside{" "}
          <code>sitemap.xml</code> and <code>robots.txt</code> in my{" "}
          <Link href="/blog/core-web-vitals-optimization-nextjs-guide">
            Core Web Vitals &amp; Technical SEO for Next.js guide
          </Link>
          ) because it costs twenty lines of Markdown and gives LLM retrieval agents a concise map
          of who I am and what software I have shipped. However, log-file studies across sites that
          adopted <code>llms.txt</code> show that model crawlers (<code>GPTBot</code>,{" "}
          <code>ClaudeBot</code>, <code>PerplexityBot</code>) still discover and rank pages primarily
          through standard HTML links, sitemaps, and search indexes. Treating <code>llms.txt</code>{" "}
          as a growth strategy while publishing generic content does nothing.
        </li>
        <li>
          <strong>
            Structured data (<code>Person</code>, <code>SoftwareApplication</code>,{" "}
            <code>BlogPosting</code>, <code>FAQPage</code>) clarifies entities; it does not rescue
            commodity prose.
          </strong>{" "}
          Clean JSON-LD helps search engines and AI systems connect an author entity to live
          software products without ambiguity. Keep your schema accurate and aligned with visible
          page content — just recognize that structured data makes <em>original</em> work easier to
          cite, rather than making commodity summaries worth clicking.
        </li>
      </ul>

      <h2 id="why-more-articles-make-it-worse">Why Publishing More Generic Articles Makes It Worse</h2>
      <p>
        When traffic dips, the reflex is to increase publishing velocity: two posts a week instead
        of two a month, often drafted with an LLM. For a small site, that makes the problem worse in
        three ways:
      </p>
      <ol>
        <li>
          <strong>Zero information gain:</strong> If an article can be written by prompting a model
          with no proprietary code, no benchmark table, and no production telemetry, then Google&apos;s
          AI Overview can synthesize the exact same answer without sending the user to your domain.
        </li>
        <li>
          <strong>Crawl and authority dilution:</strong> Fifty thin explainer articles dilute
          internal link equity away from the pages that actually convert clients — your live product
          case studies, interactive tools, and service pages.
        </li>
        <li>
          <strong>Trust erosion with technical buyers:</strong> Founders, CTOs, and engineering
          managers can spot generic AI-generated filler in three seconds. One shallow &quot;Top 10
          React Hooks in 2026&quot; post actively damages the credibility of a senior engineer&apos;s
          portfolio.
        </li>
      </ol>

      <h2 id="what-to-publish-instead">What Small Sites Should Publish Instead: Artifacts Over Essays</h2>
      <p>
        An AI Overview can summarize an explanation, but it cannot execute a workflow, run a live
        scanner against a user&apos;s URL, transfer a file over WebRTC, or replicate first-hand
        production architecture notes. Every piece of content on a small site in 2026 should fall
        into one of four categories:
      </p>

      <h3>1. Free Interactive Tools and Utilities</h3>
      <p>
        A user cannot run a headless Chromium accessibility audit inside a Google AI Overview. Look
        at the difference in user intent between an article titled &quot;What is WCAG 2.1&quot; and
        a live scanner like <Link href="/projects/auditbloc">AuditBloc</Link> that runs Playwright +
        axe-core + GDPR cookie inspection against a real URL, or a zero-signup browser utility like{" "}
        <Link href="/projects/relay">Relay</Link> for peer-to-peer WebRTC file transfers, or{" "}
        <Link href="/projects/youtube-downloader">YouTube Video &amp; Audio Downloader</Link>. Tools
        earn bookmarks, direct repeat visits, organic backlinks, and high-intent clicks that no
        SERP summary can intercept.
      </p>

      <h3>2. Production Architecture Case Studies With Real Constraints</h3>
      <p>
        Instead of writing &quot;React vs Next.js,&quot; write the engineering post-mortem of a real
        system you put into production — with the exact schema trade-offs, failure modes, and lines
        of code that broke under load:
      </p>
      <ul>
        <li>
          How <Link href="/projects/tillqorin">Tillqorin POS</Link> handles atomic multi-table
          retail checkouts, 80mm thermal receipt CSS, and barcode-scanner keyboard loops (read the{" "}
          <Link href="/blog/how-i-built-tillqorin-pos-commerce-os">Tillqorin POS case study</Link>).
        </li>
        <li>
          How <Link href="/projects/relay">Relay</Link> streams multi-hundred-megabyte files
          browser-to-browser over DTLS-encrypted WebRTC data channels using{" "}
          <code>bufferedAmountLowThreshold</code> backpressure (read the{" "}
          <Link href="/blog/webrtc-peer-to-peer-file-transfer-tutorial">
            WebRTC P2P file transfer case study
          </Link>
          ).
        </li>
        <li>
          How <Link href="/projects/taylance-crm">Taylance CRM</Link> structures multi-workspace B2B
          lead pipelines, role-based access, and revenue analytics.
        </li>
      </ul>

      <h3>3. Dated Regulatory, Specification, and Benchmark Reference Pages</h3>
      <p>
        Searchers click through when accuracy and exact dates carry legal or financial risk. Our{" "}
        <Link href="/blog/ada-title-ii-web-accessibility-deadline-2027">
          ADA Title II April 2027 deadline analysis
        </Link>{" "}
        maps exact CFR citations, population tiers, and procurement clauses into comparison tables
        and remediation checklists that compliance teams copy into internal planning docs.
      </p>

      <h3>4. Opinionated Buyer and Hiring Playbooks</h3>
      <p>
        Decision-makers who are about to spend money still read deep, experience-backed guides —
        like <Link href="/blog/how-to-hire-full-stack-developer-startup-2026">how to hire a full stack developer for a startup</Link>{" "}
        — when the article includes concrete screening questions, red-flag checklists, and real
        milestone structures rather than generic HR advice.
      </p>

      <h2 id="the-prune-and-consolidate-audit">How to Audit and Prune an Existing Blog in One Afternoon</h2>
      <p>
        If your site already has dozens of older informational posts losing clicks to AI Overviews,
        run this four-step consolidation pass:
      </p>
      <ol>
        <li>
          <strong>Export 16 months of Google Search Console query + page data.</strong> Flag every
          article where impressions are flat/rising, CTR is below 1.5%, and conversions or assisted
          contact visits are zero.
        </li>
        <li>
          <strong>Merge overlapping tutorials into one canonical reference guide.</strong> If you
          have separate posts on Next.js LCP, image optimization, and technical SEO checklists,
          combine the strongest code examples into a single comprehensive guide and <code>301</code>{" "}
          redirect the retired URLs to the canonical post so backlink equity consolidates.
        </li>
        <li>
          <strong>Retire zero-gain definitional posts with permanent 301 redirects.</strong> Never
          delete a URL into a <code>404</code>; map every retired slug in <code>next.config.ts</code>{" "}
          to the closest relevant case study, tool, or category index.
        </li>
        <li>
          <strong>Pair every remaining article with a live proof artifact.</strong> Every technical
          article should link directly to a live deployed application, a reproducible code pattern,
          or a downloadable checklist.
        </li>
      </ol>

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        <strong>How much do AI Overviews reduce click-through rate?</strong>
        <br />
        Across 300,000 informational keywords studied by Ahrefs, the average position-one organic
        click-through rate dropped from 3.9% on queries without an AI Overview to 1.6% on queries
        with one — a 58% reduction.
      </p>
      <p>
        <strong>Does llms.txt improve rankings in ChatGPT or Perplexity?</strong>
        <br />
        On its own, <code>llms.txt</code> is a lightweight machine-readability index rather than a
        ranking booster. It helps document site structure alongside <code>sitemap.xml</code> and
        JSON-LD, but real search and AI citations come from original data, live tools, and
        production case studies.
      </p>
      <p>
        <strong>Should a developer portfolio or small SaaS stop writing blog posts?</strong>
        <br />
        Stop publishing generic definitional essays that summarize existing documentation. Keep
        publishing original engineering case studies, dated regulatory or benchmark analysis, and
        interactive tools that require a visit to use.
      </p>

      <p>
        Want to build a high-performance Next.js product, interactive web tool, or technical SEO
        architecture that earns real users and conversions? Explore my{" "}
        <Link href="/projects">live deployed projects</Link>, review my{" "}
        <Link href="/services">full stack development services</Link>, or{" "}
        <Link href="/contact">get in touch</Link> to discuss your build.
      </p>
    </>
  )
}
