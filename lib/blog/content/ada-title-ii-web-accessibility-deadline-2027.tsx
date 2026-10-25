import Link from "next/link"

export function AdaTitleIiWebAccessibilityDeadline2027Body() {
  return (
    <>
      <p>
        Four days before the original compliance date, the Department of Justice moved the
        goalposts. On April 20, 2026, the Attorney General signed an interim final rule pushing the{" "}
        <strong>ADA Title II web and mobile app accessibility deadline</strong> back by one year —
        to <strong>April 26, 2027</strong> for larger public entities and{" "}
        <strong>April 26, 2028</strong> for smaller ones. The technical standard (WCAG 2.1 Level
        AA) did not change. The five narrow exceptions did not change. What changed is the clock,
        and for engineering and compliance teams that were either mid-remediation or quietly hoping
        the rule would be watered down, the next twelve months are the entire window.
      </p>

      <h2 id="what-changed-and-what-did-not">What Changed on April 20, 2026 — and What Did Not</h2>
      <p>
        The original final rule, published in the Federal Register on April 24, 2024 under{" "}
        <code>28 CFR Part 35</code>, gave state and local governments two years (or three, for
        smaller jurisdictions) to bring every public-facing website and mobile app into conformance
        with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. On April 20, 2026, the
        DOJ issued an interim final rule extending both compliance dates by one year while it
        conducts an additional rulemaking review on implementation costs for small entities.
      </p>

      <table>
        <thead>
          <tr>
            <th>Covered entity tier</th>
            <th>Original compliance date</th>
            <th>New compliance date</th>
            <th>Required standard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>State and local governments with total population of 50,000 or more</td>
            <td>April 24, 2026</td>
            <td>
              <strong>April 26, 2027</strong>
            </td>
            <td>WCAG 2.1 Level AA</td>
          </tr>
          <tr>
            <td>Public entities with total population under 50,000</td>
            <td>April 26, 2027</td>
            <td>
              <strong>April 26, 2028</strong>
            </td>
            <td>WCAG 2.1 Level AA</td>
          </tr>
          <tr>
            <td>Special district governments (transit, water, school, library districts)</td>
            <td>April 26, 2027</td>
            <td>
              <strong>April 26, 2028</strong>
            </td>
            <td>WCAG 2.1 Level AA</td>
          </tr>
        </tbody>
      </table>

      <p>
        Two details in the interim rule matter for anyone writing code or signing vendor contracts:
      </p>
      <ul>
        <li>
          <strong>The underlying obligation under Title II did not pause.</strong> Public entities
          have had a general nondiscrimination obligation under the ADA since 1990. The 2024 rule
          codified <em>WCAG 2.1 Level AA</em> as the specific technical benchmark; pushing the automatic
          enforcement date to 2027 does not immunize a public agency from individual complaints,
          OCR investigations, or private lawsuits filed today.
        </li>
        <li>
          <strong>Third-party vendor deliverables are explicitly in scope.</strong> Under{" "}
          <code>28 CFR § 35.200(b)</code>, a state or local government must ensure that web content
          and mobile apps provided through contractual, licensing, or other arrangements also
          conform to WCAG 2.1 AA. That clause is why private SaaS companies, agencies, and
          independent developers who sell to cities, counties, public universities, school
          districts, or transit authorities are already seeing WCAG 2.1 AA indemnification clauses
          in RFPs and renewal contracts.
        </li>
      </ul>

      <h2 id="who-is-covered">Who Is Actually Covered (Including Private Vendors)</h2>
      <p>
        ADA Title II applies directly to state and local government entities: state agencies,
        cities, counties, townships, public K–12 school districts, public universities and
        community colleges, municipal courts, public hospitals, public libraries, and regional
        transit authorities.
      </p>
      <p>
        If you run a private software company or agency, Title II reaches you through procurement.
        A city cannot outsource its utility billing portal, parking permit app, court scheduling
        system, or LMS and point at the vendor when a screen-reader user cannot pay a bill. The
        public entity remains legally liable to the citizen, so its procurement office passes that
        liability downstream in the Master Services Agreement:
      </p>
      <ul>
        <li>
          <strong>VPAT / ACR requirement:</strong> An Accessibility Conformance Report based on the
          ITI VPAT 2.5 template, filled out against actual WCAG 2.1 Level A and Level AA success
          criteria — not a one-page marketing statement.
        </li>
        <li>
          <strong>Remediation SLA:</strong> Contract language requiring critical accessibility
          blockers (keyboard traps, unlabeled checkout or payment inputs, broken screen-reader
          announcements) to be fixed within a defined window, often 30 to 90 days.
        </li>
        <li>
          <strong>Automated + manual audit evidence:</strong> Proof that the application is tested
          against both automated DOM rules (such as{" "}
          <Link href="/blog/automated-accessibility-testing-axe-core-playwright">
            Playwright + axe-core in CI
          </Link>
          ) and manual assistive-technology workflows.
        </li>
      </ul>
      <p>
        Meanwhile, purely private businesses (e-commerce, SaaS, hospitality, healthcare, fintech)
        remain governed by <strong>ADA Title III</strong> and state laws such as California&apos;s
        Unruh Civil Rights Act and New York State Human Rights Law. Over 4,000 federal and state
        ADA web lawsuits were filed in 2025 alone, and plaintiffs&apos; firms universally cite WCAG
        2.1 AA — the exact standard codified in the Title II rule — as the benchmark for settlement
        consent decrees.
      </p>

      <h2 id="what-wcag-21-aa-requires">What WCAG 2.1 Level AA Actually Requires in Code</h2>
      <p>
        WCAG 2.1 Level AA comprises <strong>50 success criteria</strong> (30 at Level A plus 20 at
        Level AA). In real engineering audits — including scans I run through{" "}
        <Link href="/projects/auditbloc">AuditBloc</Link>, the WCAG and GDPR compliance scanner I
        built — roughly 80% of failures cluster around eight concrete engineering mistakes:
      </p>
      <ol>
        <li>
          <strong>Insufficient color contrast (WCAG 1.4.3 &amp; 1.4.11):</strong> Body text needs a
          contrast ratio of at least <code>4.5:1</code> against its background; large text (18pt or
          14pt bold) and interactive UI boundaries/icons need at least <code>3:1</code>. Low-contrast
          muted gray text on light cards and pale placeholder text inside form inputs fail more
          audits than any other single rule.
        </li>
        <li>
          <strong>Missing programmatic form labels (WCAG 1.3.1 &amp; 3.3.2):</strong> A{" "}
          <code>placeholder</code> attribute is not an accessible name. Every{" "}
          <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, and <code>&lt;textarea&gt;</code>{" "}
          must be paired with a visible <code>&lt;label htmlFor=&quot;...&quot;&gt;</code> or an
          explicit <code>aria-label</code> / <code>aria-labelledby</code> reference, and validation
          errors must be linked via <code>aria-describedby</code> and{" "}
          <code>aria-invalid=&quot;true&quot;</code>.
        </li>
        <li>
          <strong>Keyboard traps and missing focus management (WCAG 2.1.1, 2.1.2, 2.4.3, 2.4.7):</strong>{" "}
          Every interactive control must be reachable and operable with <code>Tab</code>,{" "}
          <code>Shift+Tab</code>, <code>Enter</code>, <code>Space</code>, and arrow keys, with a
          visible <code>:focus-visible</code> outline. Custom modals and drawers must move focus
          inside when opened, trap <code>Tab</code> within the dialog while open, close on{" "}
          <code>Escape</code>, and restore focus to the trigger button on close.
        </li>
        <li>
          <strong>Clickable divs and spans without semantics (WCAG 4.1.2):</strong> A{" "}
          <code>&lt;div onClick=&#123;...&#125;&gt;</code> has no role, no keyboard tab stop, and no{" "}
          <code>Enter</code>/<code>Space</code> handler. Use a native{" "}
          <code>&lt;button type=&quot;button&quot;&gt;</code> for actions and an{" "}
          <code>&lt;a href=&quot;...&quot;&gt;</code> for navigation.
        </li>
        <li>
          <strong>Icon-only buttons and links without accessible names (WCAG 1.1.1 &amp; 4.1.2):</strong>{" "}
          Hamburger menu buttons, close buttons, pagination arrows, and social icon links must have
          either an <code>aria-label</code> or visually hidden <code>.sr-only</code> text, with{" "}
          <code>aria-hidden=&quot;true&quot;</code> on the decorative SVG.
        </li>
        <li>
          <strong>Broken heading hierarchy and missing landmarks (WCAG 1.3.1 &amp; 2.4.1):</strong>{" "}
          Screen-reader users navigate pages by landmark regions (<code>&lt;header&gt;</code>,{" "}
          <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>) and by
          heading levels (<code>h1</code> → <code>h2</code> → <code>h3</code>). Skipping from{" "}
          <code>h1</code> to <code>h4</code> for visual sizing breaks the document outline, and
          every page needs a &quot;Skip to main content&quot; link as its first focusable element.
        </li>
        <li>
          <strong>Reflow and text resizing up to 200% / 400% (WCAG 1.4.4 &amp; 1.4.10):</strong> At
          a <code>320px</code> CSS viewport width (equivalent to a <code>1280px</code> desktop
          monitor zoomed to 400%), content must reflow into a single column without requiring
          two-dimensional scrolling, except for data tables, maps, and diagrams. Fixed pixel
          heights (<code>height: 48px; overflow: hidden</code>) that clip wrapped text are a common
          violation.
        </li>
        <li>
          <strong>Untagged PDFs and missing video captions (WCAG 1.2.2, 1.2.5, 1.3.1):</strong> Under
          Title II, active PDFs — forms, agendas, fee schedules, policy packets — must be properly
          tagged with reading order, headings, table headers, and alt text, or replaced with
          accessible HTML pages. Pre-recorded video with audio requires synchronized captions, not
          unedited auto-captions.
        </li>
      </ol>

      <h2 id="the-five-exceptions">The Five Exceptions — and Where Teams Misread Them</h2>
      <p>
        The DOJ rule includes five narrow exceptions in <code>28 CFR § 35.204</code> where content
        does not need to meet WCAG 2.1 AA unless an individual with a disability specifically
        requests an accessible version:
      </p>
      <ol>
        <li>
          <strong>Archived web content:</strong> Content created before the compliance date that is
          kept exclusively for reference, research, or recordkeeping, stored in a dedicated archive
          area, and <em>never</em> modified or used to apply for or access a current service.
        </li>
        <li>
          <strong>Preexisting conventional electronic documents:</strong> PDFs, Word documents,
          spreadsheets, and presentations posted before the compliance date — <em>unless</em> they
          are currently used to apply for, gain access to, or participate in the public entity&apos;s
          services, programs, or activities. An old 2019 council budget PDF qualifies; a PDF building
          permit application used today does <strong>not</strong>.
        </li>
        <li>
          <strong>Content posted by a third party:</strong> User-generated comments or public
          submissions posted by unaffiliated third parties, when the third party is not acting under
          contract with the public entity.
        </li>
        <li>
          <strong>Individualized, password-protected documents:</strong> Account-specific PDFs (such
          as a single resident&apos;s water bill or tax statement) behind a login portal. The portal
          itself must still meet WCAG 2.1 AA, and the entity must provide an accessible version of
          the individual document upon request.
        </li>
        <li>
          <strong>Preexisting social media posts:</strong> Social media posts published before the
          compliance date. New posts published after the deadline must include alt text on images
          and captions on videos.
        </li>
      </ol>

      <h2 id="why-overlays-fail">Why Accessibility Overlays Are a Liability, Not a Fix</h2>
      <p>
        Whenever a deadline approaches, vendors selling one-line JavaScript &quot;accessibility
        overlay&quot; widgets flood inboxes promising instant ADA and WCAG conformance for $49 a
        month. Do not install them:
      </p>
      <ul>
        <li>
          <strong>Regulatory enforcement:</strong> In 2025, the Federal Trade Commission ordered one
          of the largest overlay vendors to pay <strong>$1 million</strong> for falsely claiming its
          AI widget could make any website WCAG-compliant.
        </li>
        <li>
          <strong>Litigation target:</strong> More than 20% of federal ADA web lawsuits filed in
          2024 and 2025 targeted websites that already had an accessibility overlay widget
          installed. Plaintiffs&apos; attorneys specifically scan for overlay script tags because an
          overlay does not fix broken keyboard navigation, unlabeled form controls, or untagged
          PDFs.
        </li>
        <li>
          <strong>Assistive-technology interference:</strong> Blind and low-vision users who already
          run NVDA, JAWS, or VoiceOver regularly report that overlay toolbars override their native
          screen-reader shortcuts and degrade page usability.
        </li>
      </ul>

      <h2 id="twelve-month-roadmap">A Practical 12-Month Remediation Plan Before April 2027</h2>
      <p>
        If you own a public-sector site, a university property, or a SaaS product sold into
        government and education, treat the one-year extension as four concrete engineering
        quarters:
      </p>
      <ul>
        <li>
          <strong>Quarter 1 (Months 1–3) — Inventory &amp; Automated Baseline:</strong> Crawl every
          public domain, subdomain, authenticated portal, and PDF directory. Archive obsolete PDFs
          into a clearly labeled archive route so they qualify for the archived-content exception.
          Wire automated accessibility scanning into CI using{" "}
          <Link href="/blog/automated-accessibility-testing-axe-core-playwright">
            Playwright and axe-core
          </Link>{" "}
          (or run an initial baseline scan with <Link href="/projects/auditbloc">AuditBloc</Link>)
          to surface every machine-detectable violation across key templates.
        </li>
        <li>
          <strong>Quarter 2 (Months 4–6) — Design System &amp; Shared Components:</strong> Fix
          accessibility at the component layer first. Remediate your shared navigation header,
          mobile drawer, modal dialog, form input wrapper, select dropdown, date picker, and data
          table components. Fixing 15 shared React/Next.js primitives typically resolves 70%+ of
          page-level findings across the entire site.
        </li>
        <li>
          <strong>Quarter 3 (Months 7–9) — Critical User Journeys &amp; PDF Replacement:</strong>{" "}
          Manually test your top 10 user flows (login, search, checkout/payment, form submission,
          appointment booking) using only a keyboard and a screen reader (NVDA on Windows or
          VoiceOver on macOS/iOS). Convert high-traffic fillable PDFs into accessible HTML forms.
        </li>
        <li>
          <strong>Quarter 4 (Months 10–12) — VPAT Documentation &amp; Regression Gates:</strong>{" "}
          Publish an Accessibility Statement with a direct feedback channel, prepare an updated VPAT
          2.5 Accessibility Conformance Report for procurement teams, and block pull requests in
          GitHub Actions when new critical or serious axe-core violations are introduced.
        </li>
      </ul>

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        <strong>Did the ADA Title II compliance deadline move?</strong>
        <br />
        Yes. On April 20, 2026, the Department of Justice issued an interim final rule moving the
        compliance date for public entities with a population of 50,000 or more from April 24, 2026
        to April 26, 2027. Entities under 50,000 and special district governments now have until
        April 26, 2028.
      </p>
      <p>
        <strong>Does ADA Title II apply to private businesses?</strong>
        <br />
        Directly, no — Title II covers state and local governments. Private businesses are covered
        by Title III, unless they build or operate web content or mobile apps under contract with a
        state or local government, in which case the Title II standard flows through the procurement
        contract.
      </p>
      <p>
        <strong>Why WCAG 2.1 AA and not WCAG 2.2?</strong>
        <br />
        The DOJ locked the technical standard to WCAG 2.1 Level AA when drafting the rule so
        regulated entities had a fixed specification to build against. Meeting WCAG 2.2 AA
        automatically satisfies WCAG 2.1 AA because 2.2 is backward-compatible.
      </p>
      <p>
        <strong>Can an accessibility overlay widget make a site compliant?</strong>
        <br />
        No. Overlay widgets do not remediate underlying DOM structure, form labels, keyboard traps,
        or PDF tags, and the FTC fined a major overlay vendor $1 million in 2025 for deceptive
        compliance claims.
      </p>

      <p>
        Need to audit or remediate a React, Next.js, or full stack web application for WCAG 2.1 AA
        compliance? Explore <Link href="/projects/auditbloc">AuditBloc</Link>, review my{" "}
        <Link href="/services">full stack engineering services</Link>, or{" "}
        <Link href="/contact">get in touch</Link> to scope an accessibility audit and remediation
        sprint.
      </p>
    </>
  )
}
