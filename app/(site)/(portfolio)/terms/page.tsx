import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/site/json-ld"
import { LegalPageShell } from "@/components/site/legal-page-shell"
import {
  LEGAL_BUSINESS_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_OPERATOR_NAME,
  LEGAL_SITE_URL,
  LEGAL_STUDIO_URL,
} from "@/lib/legal"
import { buildPageMetadata } from "@/lib/site-metadata"
import { SITE_URL } from "@/lib/site"

const description =
  "Terms of Service for thisistayyab.dev — website use, inquiries, and how Taylance Tech software development engagements are agreed after contact."

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | Tayyab — Full Stack Developer",
  description,
  canonicalPath: "/terms",
  openGraph: {
    title: "Terms of Service | thisistayyab.dev",
    description,
  },
  twitter: { card: "summary" },
})

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Terms of Service", item: `${SITE_URL}/terms` },
          ],
        }}
      />
    <LegalPageShell
      eyebrow="Legal"
      title="Terms of Service"
      lead={`These terms apply to ${LEGAL_SITE_URL}, ${LEGAL_OPERATOR_NAME}'s personal portfolio. I am a co-founder of ${LEGAL_BUSINESS_NAME} (${LEGAL_STUDIO_URL}). You can contact me here or through the company site; paid software work is agreed in writing through ${LEGAL_BUSINESS_NAME}, not purchased on this portfolio.`}
    >
      <h2 id="acceptance">Agreement</h2>
      <p>
        By accessing this website, you agree to these Terms of Service and our{" "}
        <Link href="/privacy">Privacy Policy</Link>. If you do not agree, please do not use the
        site.
      </p>

      <h2 id="about-the-site">About this website</h2>
      <p>
        {LEGAL_SITE_URL} is <strong>{LEGAL_OPERATOR_NAME}&apos;s</strong> personal portfolio —
        projects, blog, and contact. It is separate from, but connected to,{" "}
        <strong>{LEGAL_BUSINESS_NAME}</strong>, the co-founder-led software agency I co-founded at{" "}
        <a href={LEGAL_STUDIO_URL} rel="noopener noreferrer" target="_blank">
          taylancetech.com
        </a>
        . This portfolio has no checkout or visitor accounts; services are sold by the company after
        you inquire (here or on taylancetech.com). Content may change without notice.
      </p>

      <h2 id="services">Software services (after contact)</h2>
      <p>
        Custom development, consulting, and related services are <strong>not</strong> purchased
        directly through this website. Typical flow:
      </p>
      <ol>
        <li>
          You reach out on {LEGAL_SITE_URL} (contact page or{" "}
          <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>) or via{" "}
          <a href={LEGAL_STUDIO_URL} rel="noopener noreferrer" target="_blank">
            taylancetech.com
          </a>
          .
        </li>
        <li>We discuss scope, timeline, and pricing.</li>
        <li>
          If we both agree to proceed, terms are set out in a written quote, proposal, SOW, and/or
          contract with <strong>{LEGAL_BUSINESS_NAME}</strong> (including payment schedule,
          deliverables, and revisions).
        </li>
      </ol>
      <p>
        In case of conflict between these website terms and a signed project agreement, the{" "}
        <strong>signed agreement controls</strong> for that engagement.
      </p>

      <h2 id="quotes">Quotes and estimates</h2>
      <p>
        Any budget ranges or timelines discussed before a contract are estimates only. Fees,
        milestones, and scope are binding only when confirmed in writing (email or document) and,
        where applicable, after any deposit or signature you agree to.
      </p>

      <h2 id="payments">Payments</h2>
      <p>
        Payment methods, currency, invoices, late fees, and refunds are defined in your project
        agreement — not on this public site. Work may pause if agreed payments are overdue.
      </p>

      <h2 id="ip">Intellectual property</h2>
      <ul>
        <li>
          <strong>Site content</strong> — text, design, logos, and code shown on this portfolio
          (unless credited to a client) remain {LEGAL_OPERATOR_NAME}&apos;s property. You may not
          copy or scrape content for commercial use without permission.
        </li>
        <li>
          <strong>Client projects</strong> — ownership and license of deliverables (source code,
          designs, etc.) are defined in your contract. Until then, no license is granted.
        </li>
        <li>
          <strong>Third-party materials</strong> — open-source libraries and client-provided assets
          remain subject to their own licenses.
        </li>
      </ul>

      <h2 id="confidentiality">Confidentiality</h2>
      <p>
        Information you share about a potential or active project will be treated as confidential
        within normal business limits. We expect the same care for our processes, rates, and
        non-public work, subject to what we are allowed to show in a portfolio (often with your
        approval or anonymization).
      </p>

      <h2 id="blog">Blog and opinions</h2>
      <p>
        Articles and posts reflect personal professional opinions at the time of writing. They are
        not legal, financial, or security advice. You use any code snippets or suggestions at your
        own risk.
      </p>

      <h2 id="acceptable-use">Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Attempt to break into, disrupt, or overload the site or related systems</li>
        <li>Use automated scraping at a rate that harms performance</li>
        <li>Submit unlawful, harassing, or spam content through the contact form</li>
        <li>Misrepresent your identity or affiliation when inquiring about work</li>
      </ul>

      <h2 id="disclaimers">Disclaimers</h2>
      <p>
        The site and its content are provided <strong>&quot;as is&quot;</strong> without warranties
        of any kind, express or implied, including fitness for a particular purpose or
        uninterrupted availability. We do not guarantee that every project inquiry will be accepted.
      </p>

      <h2 id="liability">Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {LEGAL_OPERATOR_NAME} is not liable for indirect,
        incidental, special, or consequential damages arising from use of this website. Our total
        liability related to the site itself (excluding a signed services contract) is limited to
        the amount you paid us specifically for site access — which is zero for public browsing.
      </p>
      <p>
        Liability for paid development work is governed by your project agreement, not these
        general website terms.
      </p>

      <h2 id="links">External links</h2>
      <p>
        Links to GitHub, LinkedIn, client sites, or other third parties are provided for convenience.
        We are not responsible for their content or privacy practices.
      </p>

      <h2 id="termination">Termination</h2>
      <p>
        We may block access or refuse service to anyone who violates these terms or applicable law.
        Ongoing client work ends according to your contract&apos;s termination clause.
      </p>

      <h2 id="governing-law">Governing law</h2>
      <p>
        These website terms are governed by the laws of <strong>Pakistan</strong>, without regard to
        conflict-of-law rules. Disputes should first be raised in good faith by contacting{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>. Courts in Pakistan may
        have jurisdiction unless your signed project agreement states otherwise.
      </p>

      <h2 id="changes">Changes</h2>
      <p>
        We may update these terms. The date at the top of the page will reflect the latest version.
        Material changes will be posted here; continued use of the site constitutes acceptance.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a> or the{" "}
        <Link href="/contact">contact page</Link>.
      </p>
    </LegalPageShell>
    </>
  )
}
