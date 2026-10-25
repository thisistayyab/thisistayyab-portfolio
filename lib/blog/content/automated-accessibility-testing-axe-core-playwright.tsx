import Link from "next/link"

export function AutomatedAccessibilityTestingAxeCorePlaywrightBody() {
  return (
    <>
      <p>
        Most accessibility problems that ship to production are not subtle. They are an{" "}
        <code>&lt;img&gt;</code> with no <code>alt</code> attribute, an icon-only button with no{" "}
        <code>aria-label</code>, body text in <code>#9ca3af</code> on a <code>#f3f4f6</code>{" "}
        background, a form input whose visual label is a <code>&lt;div&gt;</code> three nodes away
        instead of a <code>&lt;label&gt;</code>, or a modal that trapped focus inside a closed
        overlay. None of those require a human accessibility
        specialist to spot — they are deterministic DOM and computed-style facts that a headless
        browser can check in two seconds on every pull request.
      </p>
      <p>
        When I built <Link href="/projects/auditbloc">AuditBloc</Link> — a web accessibility and
        compliance scanner that evaluates live URLs for WCAG 2.1 Level A/AA violations, GDPR cookie
        behaviors, and AI disclosure signals — the core scanning engine was built on{" "}
        <strong>Playwright</strong> and Deque&apos;s <strong>axe-core</strong>. This guide walks
        through how to wire that same stack into your own test suite, how to scan interactive UI
        states that naive URL crawlers miss, what automated tools genuinely cannot catch, and how we
        combined accessibility and privacy checks in AuditBloc.
      </p>

      <h2 id="what-automation-catches-vs-what-it-cannot">
        What Automated Accessibility Testing Catches (and What It Cannot)
      </h2>
      <p>
        Let&apos;s start with an honest number, because the accessibility tooling market is full of
        dishonest ones. Deque&apos;s own research on millions of axe-core scans shows that{" "}
        <strong>
          automated testing catches roughly 30–40% of WCAG success criteria by count, and up to ~50%
          of actual issue volume
        </strong>{" "}
        found in real-world audits (because the rules automation <em>can</em> check — contrast,
        missing labels, missing alt text, invalid ARIA — happen to be the mistakes developers repeat
        hundreds of times per site).
      </p>
      <p>Why can&apos;t automation catch 100%? Because WCAG criteria fall into three buckets:</p>
      <ol>
        <li>
          <strong>Deterministic structural and style rules (Automated):</strong> Does every{" "}
          <code>&lt;img&gt;</code> have an <code>alt</code> attribute? Does every{" "}
          <code>&lt;input&gt;</code> have an accessible name via <code>&lt;label&gt;</code>,{" "}
          <code>aria-label</code>, or <code>aria-labelledby</code>? Is the computed foreground/background
          contrast ratio at least <code>4.5:1</code> for normal text and <code>3:1</code> for large
          text? Are <code>id</code> attributes unique? Are <code>aria-*</code> attributes valid for
          the element&apos;s role? <code>axe-core</code> catches these with a near-zero false-positive
          rate.
        </li>
        <li>
          <strong>Contextual semantic accuracy (Requires human review):</strong>{" "}
          <code>axe-core</code> can verify that <code>&lt;img alt=&quot;chart&quot;&gt;</code> has a
          non-empty <code>alt</code> string. It <em>cannot</em> know that the image is actually a Q3
          revenue chart whose key takeaway (&quot;Q3 revenue up 18% YoY&quot;) is completely missing
          from the alt text, or conversely that a decorative background flourish should have{" "}
          <code>alt=&quot;&quot;</code> so screen readers skip it.
        </li>
        <li>
          <strong>Interaction and reading-order ergonomics (Semi-automated / manual):</strong> Can a
          keyboard-only user complete the multi-step checkout without focus jumping to the footer
          when a step changes? Does the screen reader announce dynamic toast errors via an{" "}
          <code>aria-live</code> region at the right moment? You can write targeted Playwright tests
          for specific keyboard flows, but a generic rule scanner cannot invent your user journey.
        </li>
      </ol>
      <p>
        Understanding that split is liberating: you use <strong>Playwright + axe-core</strong> to
        eliminate the 50% of mechanical regressions automatically in CI, which frees your manual
        keyboard and screen-reader pass to focus on real user flows instead of hunting for missing{" "}
        <code>alt</code> tags. And with the{" "}
        <Link href="/blog/ada-title-ii-web-accessibility-deadline-2027">
          ADA Title II WCAG 2.1 AA compliance deadline set for April 2027
        </Link>
        , having automated regression gates in CI is now a baseline procurement expectation.
      </p>

      <h2 id="setting-up-playwright-and-axe-core">Setting Up Playwright and @axe-core/playwright</h2>
      <p>
        If you already have a Next.js or React app, install Playwright and the official Deque
        Playwright integration:
      </p>
      <pre>
        <code>{`npm install -D @playwright/test @axe-core/playwright
npx playwright install --with-deps chromium`}</code>
      </pre>
      <p>
        Why run <code>axe-core</code> inside Playwright instead of running a static HTML linter or{" "}
        <code>jsdom</code> test? Two huge reasons:
      </p>
      <ul>
        <li>
          <strong>Real CSS layout and computed contrast:</strong> Color contrast rules (WCAG 1.4.3)
          need a real browser rendering engine to resolve CSS custom properties, inherited font
          sizes, gradients, and stacking contexts. <code>jsdom</code> does not compute layout or real
          painted styles, so contrast checks are blind or inaccurate outside a real browser.
        </li>
        <li>
          <strong>Hydrated client-side UI:</strong> Modern React and Next.js apps render portals,
          radix/headless-ui dialogs, client-loaded menus, and dynamic state after hydration.
          Playwright runs real Chromium, waits for network and hydration settle, and can click into
          interactive states before running the scan.
        </li>
      </ul>

      <p>
        Here is a clean, production-ready accessibility test file (
        <code>tests/a11y.spec.ts</code>) that scans your core routes against WCAG 2.0 and WCAG 2.1
        Level A and AA rules:
      </p>
      <pre>
        <code>{`import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const PUBLIC_ROUTES = ["/", "/about", "/projects", "/services", "/blog", "/contact"]

for (const route of PUBLIC_ROUTES) {
  test(\`WCAG 2.1 AA scan passes on \${route}\`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" })

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze()

    // Format violations clearly in CI output when a test fails
    const summary = results.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        failureSummary: n.failureSummary,
      })),
    }))

    expect(summary, \`Accessibility violations on \${route}\`).toEqual([])
  })
}`}</code>
      </pre>

      <h2 id="scanning-interactive-states">
        The Secret Most Scanners Miss: Scanning Interactive States
      </h2>
      <p>
        If you only run <code>new AxeBuilder(&#123; page &#125;).analyze()</code> immediately after{" "}
        <code>page.goto()</code>, you have only tested the resting state of the page. Your mobile
        navigation drawer, search modal, dropdown menus, and form validation error messages are not
        even in the DOM yet — or they have <code>display: none</code> /{" "}
        <code>aria-hidden=&quot;true&quot;</code>, which tells <code>axe-core</code> to skip them.
      </p>
      <p>
        In Playwright, you can drive the UI into each interactive state and scope or re-run the
        scan:
      </p>
      <pre>
        <code>{`test("mobile navigation drawer and contact form error states are accessible", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto("/contact")

  // 1. Open mobile navigation menu and scan the open sheet
  const menuButton = page.getByRole("button", { name: /open navigation menu/i })
  await menuButton.click()
  await expect(page.getByRole("dialog")).toBeVisible()

  const menuScan = await new AxeBuilder({ page })
    .include('[role="dialog"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze()
  expect(menuScan.violations).toEqual([])

  // Close mobile menu with Escape and verify focus returns to trigger
  await page.keyboard.press("Escape")
  await expect(menuButton).toBeFocused()

  // 2. Trigger form validation errors and scan the form in its error state
  await page.getByRole("button", { name: /send message/i }).click()
  const formScan = await new AxeBuilder({ page })
    .include("form")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze()
  expect(formScan.violations).toEqual([])
})`}</code>
      </pre>
      <p>
        Look at what that 30-line test verifies: not only does it run <code>axe-core</code> against
        the open dialog and the error-state form (catching low-contrast red error text or missing{" "}
        <code>aria-describedby</code> links), it also asserts <strong>WCAG 2.1.2 / 2.4.3</strong>{" "}
        keyboard behavior — pressing <code>Escape</code> closes the dialog and returns focus to the
        button that opened it.
      </p>

      <h2 id="five-common-violations-and-fixes">
        The 5 Violations You Will Hit First (and How to Fix Them in React/Next.js)
      </h2>
      <p>
        Across hundreds of scans run through <Link href="/projects/auditbloc">AuditBloc</Link>,
        these five <code>axe-core</code> rule IDs account for the overwhelming majority of failures
        on modern React and Tailwind sites:
      </p>
      <ol>
        <li>
          <strong>
            <code>color-contrast</code> (Serious):
          </strong>{" "}
          Tailwind classes like <code>text-slate-500</code> on a dark card (`bg-slate-900`) or{" "}
          <code>text-slate-400</code> on a white background often land around <code>3.2:1</code>,
          failing the <code>4.5:1</code> AA requirement for body text. Bump secondary body copy on
          dark surfaces to <code>text-slate-300</code> or <code>text-slate-400</code> against near-black
          (`#020106`), and reserve dimmer shades strictly for decorative borders.
        </li>
        <li>
          <strong>
            <code>button-name</code> and <code>link-name</code> (Critical):
          </strong>{" "}
          Icon-only buttons (hamburger menu, theme toggle, carousel prev/next, social links) with an{" "}
          <code>&lt;svg&gt;</code> inside and no text. Fix by adding an explicit{" "}
          <code>aria-label=&quot;Previous testimonial&quot;</code> on the{" "}
          <code>&lt;button&gt;</code> and <code>aria-hidden=&quot;true&quot;</code> on the{" "}
          <code>&lt;svg&gt;</code>.
        </li>
        <li>
          <strong>
            <code>label</code> (Critical):
          </strong>{" "}
          Search bars or newsletter inputs that rely on <code>placeholder=&quot;Search...&quot;</code>{" "}
          with no <code>&lt;label&gt;</code>. Placeholders disappear as soon as the user types and
          are not a reliable accessible name. Wrap the input in a <code>&lt;label&gt;</code> with a{" "}
          <code>&lt;span className=&quot;sr-only&quot;&gt;Search articles&lt;/span&gt;</code>.
        </li>
        <li>
          <strong>
            <code>heading-order</code> (Moderate):
          </strong>{" "}
          Jumping from <code>&lt;h1&gt;</code> straight to <code>&lt;h3&gt;</code> or{" "}
          <code>&lt;h4&gt;</code> because you wanted a smaller font size. In Tailwind, heading level
          and visual size are completely decoupled — use the semantically correct{" "}
          <code>&lt;h2&gt;</code> and style it with <code>text-sm font-semibold</code> if the design
          calls for a compact subheading.
        </li>
        <li>
          <strong>
            <code>region</code> / Landmark structure (Moderate):
          </strong>{" "}
          Content floating outside <code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>,{" "}
          <code>&lt;main&gt;</code>, or <code>&lt;footer&gt;</code> landmarks, or multiple{" "}
          <code>&lt;nav&gt;</code> elements on the same page without distinct{" "}
          <code>aria-label</code> attributes (e.g., <code>aria-label=&quot;Main navigation&quot;</code>{" "}
          vs. <code>aria-label=&quot;Footer navigation&quot;</code>).
        </li>
      </ol>

      <h2 id="running-in-github-actions">Running Accessibility Scans in GitHub Actions</h2>
      <p>
        An accessibility test suite only protects you if it blocks regressions on pull requests. In
        GitHub Actions, build your Next.js production output, start the server, and run the
        Playwright accessibility spec:
      </p>
      <pre>
        <code>{`name: Accessibility CI
on: [pull_request]

jobs:
  a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build
      - run: npx playwright test tests/a11y.spec.ts`}</code>
      </pre>
      <p>
        If you are introducing automated accessibility testing into a legacy codebase that already
        has 80 violations, don&apos;t let that stop you from turning on CI today. Gate CI on{" "}
        <code>critical</code> and <code>serious</code> impacts first, or use{" "}
        <code>.exclude(&quot;#legacy-widget&quot;)</code> with a tracked issue ticket while you burn
        down the backlog route by route.
      </p>

      <h2 id="how-auditbloc-combines-wcag-and-gdpr">
        How AuditBloc Combines WCAG and GDPR Cookie Checks in One Pass
      </h2>
      <p>
        When we architected <Link href="/projects/auditbloc">AuditBloc</Link>, we realized that the
        exact same headless Playwright browser session needed for a WCAG audit is also the ideal
        vantage point for auditing <strong>GDPR / ePrivacy cookie behavior</strong>:
      </p>
      <ul>
        <li>
          <strong>Pre-consent cookie and network inspection:</strong> Before clicking anything on the
          page, Playwright inspects <code>context.cookies()</code>, <code>localStorage</code>, and
          outbound network requests on initial load. If analytics or advertising trackers fire{" "}
          <em>before</em> the user has interacted with a consent banner, AuditBloc flags a pre-consent
          tracking issue with the exact cookie names and domains.
        </li>
        <li>
          <strong>Consent banner symmetry and accessibility:</strong> If a cookie banner is present,
          is it keyboard-reachable? Does it offer a clear reject/decline path alongside accept, or is
          &quot;Reject&quot; buried three screens deep with <code>2.1:1</code> contrast? Because the
          banner is in the live DOM on first load, <code>axe-core</code> and our custom banner
          heuristics evaluate it in the same pass.
        </li>
        <li>
          <strong>Structured remediation report:</strong> Raw <code>axe-core</code> JSON output is
          great for developers but overwhelming for product owners. AuditBloc groups findings by
          severity (<code>Critical</code>, <code>Serious</code>, <code>Moderate</code>,{" "}
          <code>Minor</code>), maps each to its WCAG 2.1 success criterion, and highlights the exact
          DOM selector and remediation steps.
        </li>
      </ul>

      <h2 id="faq">Frequently Asked Questions</h2>
      <p>
        <strong>What percentage of WCAG issues can axe-core catch automatically?</strong>
        <br />
        Roughly 30% to 40% of WCAG criteria by count, and up to 50% of common real-world violations
        by volume. The remaining criteria require human judgment on reading order, alt-text
        accuracy, and keyboard usability.
      </p>
      <p>
        <strong>Does passing an automated axe-core scan make a website ADA compliant?</strong>
        <br />
        No. Passing an automated scan eliminates the machine-detectable violations that trigger most
        demand letters, but full WCAG 2.1 AA compliance also requires manual keyboard and
        screen-reader verification.
      </p>
      <p>
        <strong>Why run axe-core inside Playwright instead of a static HTML checker?</strong>
        <br />
        Playwright renders the real page in a headless browser, executes client-side JavaScript,
        computes actual CSS contrast ratios, and lets you open modals, drawers, and form error
        states before running axe-core.
      </p>

      <p>
        You can read the full <Link href="/projects/auditbloc">AuditBloc case study</Link> or try the
        live scanner at{" "}
        <a
          href="https://auditbloc.taylancetech.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          auditbloc.taylancetech.com
        </a>
        . If your team needs an accessibility audit, automated CI guardrails, or WCAG 2.1 AA
        remediation on a React or Next.js application,{" "}
        <Link href="/contact">get in touch</Link>.
      </p>
    </>
  )
}
