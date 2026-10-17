import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/site/json-ld"
import { LegalPageShell } from "@/components/site/legal-page-shell"
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_OPERATOR_NAME,
  LEGAL_SITE_URL,
} from "@/lib/legal"
import { buildPageMetadata } from "@/lib/site-metadata"
import { isGoogleAnalyticsEnabled } from "@/lib/google-analytics"
import { SITE_URL } from "@/lib/site"

const description =
  "How Tayyab collects and uses data on thisistayyab.dev when you browse, contact, or read the blog — including analytics and third-party tools."

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | Tayyab — Full Stack Developer",
  description,
  canonicalPath: "/privacy",
  openGraph: {
    title: "Privacy Policy | thisistayyab.dev",
    description,
  },
  twitter: { card: "summary" },
})

export default function PrivacyPolicyPage() {
  const analyticsEnabled = isGoogleAnalyticsEnabled()

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Privacy Policy", item: `${SITE_URL}/privacy` },
          ],
        }}
      />
    <LegalPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      lead={`This policy covers ${LEGAL_SITE_URL} — ${LEGAL_OPERATOR_NAME}'s personal full stack developer portfolio — including when you contact me here, read the blog, or use analytics on this site. Client work is delivered by me directly after we agree on the scope in writing.`}
    >
      <h2 id="who-we-are">Who we are</h2>
      <p>
        <strong>{LEGAL_OPERATOR_NAME}</strong> operates this portfolio at {LEGAL_SITE_URL} as a
        full stack web developer. You can contact me via{" "}
        the <Link href="/contact">contact page</Link> or{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>. For privacy questions
        about this portfolio, email {LEGAL_CONTACT_EMAIL}.
      </p>

      <h2 id="what-we-collect">Information we collect</h2>
      <p>Depending on how you use the site, we may process:</p>
      <ul>
        <li>
          <strong>Contact inquiries</strong> — name, email, subject, and message you submit through
          the contact form.
        </li>
        <li>
          <strong>Usage and device data</strong> — pages viewed, approximate location (country/region),
          browser type, screen size, referrer, and similar technical data collected by analytics
          tools.
        </li>
        <li>
          <strong>Blog interactions</strong> — which articles are read (view counts stored on our
          database server) without requiring you to create an account.
        </li>
        <li>
          <strong>Server and security logs</strong> — IP address, request time, and user agent, kept
          briefly by our hosting provider for reliability and abuse prevention.
        </li>
        <li>
          <strong>Admin access only</strong> — authentication cookies if you sign in to the private
          blog dashboard (not used by public visitors).
        </li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2 id="why-we-use-it">Why we use it</h2>
      <ul>
        <li>Reply to your messages and discuss potential projects</li>
        <li>Operate, secure, and improve the website</li>
        <li>Understand which content is useful (analytics and blog metrics)</li>
        <li>Comply with legal obligations where applicable</li>
      </ul>

      <h2 id="legal-bases">Legal bases (EEA/UK visitors)</h2>
      <p>If you are in the European Economic Area or United Kingdom, we rely on:</p>
      <ul>
        <li>
          <strong>Consent</strong> — where required for non-essential cookies/analytics (you may
          withdraw consent via browser settings or opt-out tools below).
        </li>
        <li>
          <strong>Legitimate interests</strong> — site security, basic analytics, and responding to
          inquiries that you initiate.
        </li>
        <li>
          <strong>Contract</strong> — processing needed to perform or prepare a development
          services agreement after you contact us.
        </li>
      </ul>

      <h2 id="third-parties">Third-party services</h2>
      <p>We use trusted providers that may process data on our behalf:</p>
      <ul>
        {analyticsEnabled ? (
          <li>
            <strong>Google Analytics 4</strong> — usage measurement. See{" "}
            <a
              href="https://policies.google.com/privacy"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google&apos;s Privacy Policy
            </a>{" "}
            and the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              rel="noopener noreferrer"
              target="_blank"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </li>
        ) : (
          <li>
            <strong>Google Analytics</strong> — may be enabled when a measurement ID is configured
            for this deployment.
          </li>
        )}
        <li>
          <strong>Vercel</strong> — hosting, analytics, and performance insights for this site.
        </li>
        <li>
          <strong>EmailJS</strong> — delivers contact form submissions to our inbox.
        </li>
        <li>
          <strong>Supabase</strong> — blog content storage and anonymous view-count updates.
        </li>
      </ul>
      <p>
        These providers may store data in the United States or other countries. We choose vendors
        with appropriate safeguards where available.
      </p>

      <h2 id="cookies">Cookies and similar technologies</h2>
      <p>
        Analytics and hosting services may set cookies or use local storage to recognize your
        browser across visits. Essential cookies needed to run the site are kept to a minimum. You
        can block or delete cookies in your browser settings; some features may still work without
        analytics cookies.
      </p>

      <h2 id="retention">How long we keep data</h2>
      <ul>
        <li>
          <strong>Contact messages</strong> — kept as long as needed to respond and for reasonable
          business records (typically up to a few years unless you ask us to delete sooner).
        </li>
        <li>
          <strong>Analytics</strong> — aggregated reports per each provider&apos;s default retention
          settings.
        </li>
        <li>
          <strong>Server logs</strong> — short rolling retention by the host.
        </li>
      </ul>

      <h2 id="your-rights">Your rights</h2>
      <p>
        Depending on where you live, you may have rights to access, correct, delete, or restrict
        processing of your personal data, and to object or port data. To exercise these rights, email{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>. You may also lodge a
        complaint with your local data protection authority.
      </p>

      <h2 id="children">Children</h2>
      <p>
        This site is not directed at children under 16. We do not knowingly collect their personal
        information.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        We may update this policy from time to time. The &quot;Last updated&quot; date at the top
        will change when we do. Continued use of the site after changes means you accept the
        revised policy.
      </p>

      <h2 id="related">Related</h2>
      <p>
        For website use and software services, see our{" "}
        <Link href="/terms">Terms of Service</Link>. Questions:{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>.
      </p>
    </LegalPageShell>
    </>
  )
}
