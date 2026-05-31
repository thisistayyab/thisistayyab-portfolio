import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImg from '../assets/about.avif';
import cv from "../assets/Tayyab's CV.pdf";
import { aboutPageContent } from '../data/aboutContent';
import { heroStats } from '../data/heroStats';
import { socialLinks } from '../data/socialLinks';
import AppAppBar from '../components/Appbar';
import Footer from '../components/Footer';
import { GlobalBackground } from '../components/GlobalBackground';
import { SEOHead } from '../components/SEOHead';
import { HeroCtaLink } from '../components/ui/hero-cta-link';
import { Card } from '../components/ui/card';
import { SocialIcon } from '../components/ui/social-icon';

interface AboutPageProps {
  isDesktop: boolean;
}

const baseUrl = 'https://thisistayyab.dev';

function getPlatformName(href: string): string {
  if (href.includes('github')) return 'GitHub';
  if (href.includes('linkedin')) return 'LinkedIn';
  if (href.includes('leetcode')) return 'LeetCode';
  if (href.startsWith('mailto:')) return 'Email';
  return '';
}

export function AboutPage({ isDesktop }: AboutPageProps) {
  const socialProfileUrls = socialLinks
    .filter(link => !link.href.startsWith('mailto:'))
    .map(link => link.href);

  return (
    <>
      <SEOHead />
      <GlobalBackground isDesktop={isDesktop} showTechIcons={true} />
      <AppAppBar />

      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="relative z-[5] pt-[calc(var(--template-frame-height,0px)+88px)]"
        itemScope
        itemType="https://schema.org/ProfilePage"
      >
        <article className="mx-auto max-w-[1200px] px-4 pb-20 sm:px-6 lg:px-4">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 pt-4"
          >
            <Link
              to="/"
              className="inline-flex items-center text-sm text-slate-400 transition-all hover:pl-2 hover:text-white"
            >
              <ArrowLeft className="mr-2 size-4" aria-hidden="true" />
              Back to home
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Card
                className="mx-auto max-w-[380px] p-4 hover:scale-100"
                hoverScale={false}
                hoverLift={false}
                glowColor="rgba(59, 130, 246, 0.1)"
              >
                <img
                  src={aboutImg}
                  alt="Tayyab — full stack web developer specializing in React, Node.js, and PostgreSQL"
                  title="Tayyab — Full Stack Developer"
                  width={380}
                  height={500}
                  className="block w-full rounded-2xl"
                  loading="eager"
                  fetchPriority="high"
                  itemProp="image"
                />
              </Card>
            </motion.div>

            <div itemScope itemType="https://schema.org/Person" itemProp="mainEntity">
              <meta itemProp="name" content="Tayyab" />
              <meta itemProp="jobTitle" content="Full Stack Web Developer" />
              <meta itemProp="url" content={baseUrl} />
              <meta
                itemProp="description"
                content="Full stack web developer specializing in React, Next.js, Node.js, and PostgreSQL."
              />
              {socialProfileUrls.map(url => (
                <meta key={url} itemProp="sameAs" content={url} />
              ))}

              <motion.header
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.55 }}
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.5rem]">
                  {aboutPageContent.h1}
                </h1>
                <p className="text-base leading-relaxed text-slate-400 sm:text-lg sm:leading-[1.8]">
                  {aboutPageContent.intro}
                </p>
              </motion.header>

              <motion.ul
                className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
                aria-label="Professional highlights"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.5 }}
              >
                {heroStats.map(stat => (
                  <li
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm"
                  >
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                  </li>
                ))}
              </motion.ul>

              <div className="mt-10 space-y-10">
                {aboutPageContent.sections.map((section, index) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    aria-labelledby={`${section.id}-heading`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.55 }}
                    viewport={{ once: true }}
                  >
                    <h2
                      id={`${section.id}-heading`}
                      className="mb-4 text-xl font-semibold text-white sm:text-2xl"
                    >
                      {section.title}
                    </h2>
                    {section.paragraphs.map((paragraph, i) => (
                      <p
                        key={i}
                        className="mb-4 text-base leading-relaxed text-slate-400 sm:leading-[1.8]"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {section.list && (
                      <ul className="list-disc space-y-2 pl-5 text-slate-400">
                        {section.list.map(item => (
                          <li key={item} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.section>
                ))}

                <motion.blockquote
                  className="rounded-xl border border-white/10 border-l-4 border-l-blue-500 bg-white/5 p-6 text-slate-400 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55 }}
                  viewport={{ once: true }}
                >
                  <p>{aboutPageContent.leetcodeQuote}</p>
                </motion.blockquote>

              </div>

              <motion.nav
                className="hero-actions mt-10 w-full justify-center lg:justify-start"
                aria-label="About page actions"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <HeroCtaLink
                  href={cv}
                  download
                  title="Download Tayyab's Full Stack Developer CV"
                >
                  Download CV
                  <Download className="size-[1.05rem]" aria-hidden="true" />
                </HeroCtaLink>
                <HeroCtaLink
                  to="/projects"
                  variant="secondary"
                  title="View Tayyab's web development projects"
                >
                  View My Work
                  <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
                </HeroCtaLink>
                <HeroCtaLink to="/contact" variant="secondary" title="Contact Tayyab for web development work">
                  Get in touch
                </HeroCtaLink>
                <div className="flex items-center gap-3" role="list" aria-label="Social profiles">
                  {socialLinks.map((link, i) => (
                    <div key={i} role="listitem">
                      <SocialIcon
                        Icon={link.Icon}
                        size={44}
                        iconSize={link.size}
                        href={link.href}
                        ariaLabel={link.ariaLabel}
                        color={link.color}
                        platformName={getPlatformName(link.href)}
                      />
                    </div>
                  ))}
                </div>
              </motion.nav>
            </div>
          </div>
        </article>

        <Footer />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
              { '@type': 'ListItem', position: 2, name: 'About', item: `${baseUrl}/about` },
            ],
          }),
        }}
      />
    </>
  );
}

export default AboutPage;
