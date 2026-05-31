import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import aboutImg from '../assets/about.avif';
import cv from "../assets/Tayyab's CV.pdf";
import { heroStats } from '../data/heroStats';
import { heroTags } from '../data/heroTags';
import { socialLinksHeader } from '../data/socialLinks';
import AppAppBar from './Appbar';
import { SocialIcon } from './ui/social-icon';

function Header() {
  const getPlatformName = (href: string): string => {
    if (href.includes('github')) return 'GitHub';
    if (href.includes('linkedin')) return 'LinkedIn';
    if (href.includes('leetcode')) return 'LeetCode';
    if (href.startsWith('mailto:')) return 'Email';
    return '';
  };

  return (
    <header
      className="relative overflow-hidden bg-transparent pt-[calc(var(--template-frame-height,0px)+88px)]"
      itemScope
      itemType="https://schema.org/Person"
    >
      <AppAppBar />

      <meta itemProp="name" content="Tayyab" />
      <meta itemProp="jobTitle" content="Full Stack Web Developer" />
      <meta itemProp="url" content="https://thisistayyab.dev" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': 'https://thisistayyab.dev/#person',
            name: 'Tayyab',
            jobTitle: 'Full Stack Developer | React & Node.js Expert',
            description:
              'Full stack developer specializing in React, Next.js, Node.js, and PostgreSQL. 3+ years experience building fast, scalable web applications. 1,150+ LeetCode problems solved. 15+ projects completed.',
            url: 'https://thisistayyab.dev',
            knowsAbout: [
              'React',
              'Next.js',
              'Node.js',
              'PostgreSQL',
              'REST API',
              'TypeScript',
              'Full Stack Development',
              'Web Application Development',
            ],
            sameAs: socialLinksHeader
              .filter(link => !link.href.startsWith('mailto:'))
              .map(link => link.href),
            email: socialLinksHeader
              .find(link => link.href.startsWith('mailto:'))
              ?.href.replace('mailto:', ''),
          }),
        }}
      />

      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
        {socialLinksHeader.map((link, i) => (
          <SocialIcon
            key={i}
            Icon={link.Icon}
            size={48}
            iconSize={link.size}
            href={link.href}
            ariaLabel={link.ariaLabel}
            color={link.color}
            platformName={getPlatformName(link.href)}
          />
        ))}
      </div>

      <div className="hero-section mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-4" id="home">
        <div className="hero-main">
          <div className="hero-content relative z-[2]">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="hero-eyebrow sr-only"
            >
              Crafting Digital Excellence
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="hero-greeting-badge mb-7 inline-flex items-center gap-2.5"
            >
              <span className="hero-wave" aria-hidden="true">
                👋
              </span>
              <span className="text-[0.95rem] font-medium text-slate-100">Hi, I&apos;m Tayyab</span>
            </motion.div>

            <motion.h1
              className="hero-title mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55 }}
              itemProp="jobTitle"
            >
              <span className="hero-title-line text-white">Full Stack</span>
              <span className="hero-title-line hero-title-gradient">Developer</span>
              <span className="sr-only">
                {' '}
                — Tayyab | React Developer, Next.js Developer, Node.js Developer, PostgreSQL, REST API, Full
                Stack Developer for Hire
              </span>
            </motion.h1>

            <motion.p
              className="hero-subtitle mb-5 max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.55 }}
            >
              I design and build{' '}
              <strong className="hero-highlight font-semibold">fast, scalable web applications</strong> that
              rank, perform, and convert — from pixel-perfect React frontends to production-grade Node.js
              backends.
            </motion.p>

            <motion.p
              className="hero-seo-text mb-6 max-w-[620px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.55 }}
              itemProp="description"
            >
              With <strong>3+ years of hands-on full stack development</strong>, I&apos;ve shipped real-world
              projects using React, Next.js, Node.js, and PostgreSQL. I write clean, maintainable code backed by
              a deep understanding of data structures — having solved{' '}
              <strong>1,150+ LeetCode problems</strong>. Whether you need a landing page, a SaaS dashboard, or a
              full backend API, I build solutions that are engineered to last.
            </motion.p>

            <motion.ul
              className="hero-tags mb-8 list-none"
              aria-label="Core skills and services"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.5 }}
            >
              {heroTags.map(tag => (
                <li key={tag}>
                  <span className="hero-tag">{tag}</span>
                </li>
              ))}
            </motion.ul>

            <div className="hero-actions-bar">
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.5 }}
              >
                <Link to="/projects" className="hero-cta-primary" title="View Tayyab's web development projects">
                  View My Work
                  <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
                </Link>
                <a
                  href={cv}
                  download
                  className="hero-cta-secondary"
                  title="Download Tayyab's Full Stack Developer CV"
                >
                  Download CV
                  <Download className="size-[1.05rem]" aria-hidden="true" />
                </a>
              </motion.div>

              <div className="hero-status-badge">
                <span className="hero-status-dot" aria-hidden="true" />
                Available for work
              </div>
            </div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.65 }}
          >
            <div className="hero-visual-stage">
              <img
                src={aboutImg}
                alt="Tayyab - Full Stack Web Developer and Computer Engineering Student portrait photo. Professional developer specializing in React, Node.js, Express, and MongoDB with 3+ years of experience."
                title="Tayyab - Full Stack Web Developer"
                width={540}
                height={620}
                className="hero-portrait"
                loading="eager"
                fetchPriority="high"
                itemProp="image"
              />

              <motion.figure
                className="hero-code-card"
                initial={{ opacity: 0, y: 12, rotate: -7 }}
                animate={{ opacity: 1, y: 0, rotate: -7 }}
                transition={{ delay: 0.45, duration: 0.55 }}
              >
                <figcaption className="sr-only">Developer profile code snippet</figcaption>
                <pre>
                  <code>
                    <span className="hero-code-keyword">const</span>{' '}
                    <span className="hero-code-name">developer</span> = {'{'}
                    {'\n  '}
                    <span className="hero-code-key">name</span>:{' '}
                    <span className="hero-code-string">&quot;Tayyab&quot;</span>,
                    {'\n  '}
                    <span className="hero-code-key">role</span>:{' '}
                    <span className="hero-code-string">&quot;Full Stack Developer&quot;</span>,
                    {'\n  '}
                    <span className="hero-code-key">passion</span>:{' '}
                    <span className="hero-code-string">
                      &quot;Building amazing things on the web&quot;
                    </span>
                    {'\n}'}
                  </code>
                </pre>
              </motion.figure>
            </div>
          </motion.div>
        </div>

        <motion.section
          className="hero-stats"
          aria-label="Professional highlights"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.55 }}
        >
          {heroStats.map(({ icon: Icon, value, label, tone }) => (
            <article key={label} className={`hero-stat-card hero-stat-card--${tone}`}>
              <span className={`hero-stat-icon hero-stat-icon--${tone}`} aria-hidden="true">
                <Icon className="hero-stat-icon-svg" strokeWidth={2} />
              </span>
              <div className="hero-stat-copy">
                <p className="hero-stat-value">{value}</p>
                <p className="hero-stat-label">{label}</p>
              </div>
            </article>
          ))}
        </motion.section>
      </div>
    </header>
  );
}

export default Header;
