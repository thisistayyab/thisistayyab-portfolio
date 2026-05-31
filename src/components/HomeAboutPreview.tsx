import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { homeAboutPreview, type TextSegment } from '../data/aboutContent';
import { HeroCtaLink } from './ui/hero-cta-link';

function RichParagraph({ segments }: { segments: readonly TextSegment[] }) {
  return (
    <p className="mb-5 text-base leading-relaxed text-slate-400 sm:text-[1.05rem] sm:leading-[1.85]">
      {segments.map((segment, index) =>
        segment.bold ? (
          <strong key={index} className="font-semibold text-slate-200">
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        ),
      )}
    </p>
  );
}

function HomeAboutPreview() {
  return (
    <section
      className="relative mx-auto max-w-[1200px] px-4 py-20 sm:px-6"
      aria-labelledby="home-about-heading"
    >
      <div className="relative z-[2] mx-auto max-w-3xl text-center">
        <motion.p
          className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-blue-300/70"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {homeAboutPreview.eyebrow}
        </motion.p>

        <motion.h2
          id="home-about-heading"
          className="mx-auto mb-6 max-w-4xl text-[clamp(1.85rem,5vw,2.75rem)] font-bold leading-[1.15] tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.55 }}
          viewport={{ once: true }}
        >
          <span className="block">
            {homeAboutPreview.headingBefore}{' '}
            <span className="hero-title-gradient whitespace-nowrap">
              {homeAboutPreview.headingHighlight}
            </span>
          </span>
          <span className="block">{homeAboutPreview.headingAfter}</span>
        </motion.h2>

        <motion.div
          className="mx-auto mb-8 h-px w-12 bg-white/15"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.12, duration: 0.45 }}
          viewport={{ once: true }}
          aria-hidden="true"
        />

        {homeAboutPreview.paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 + index * 0.08, duration: 0.55 }}
            viewport={{ once: true }}
          >
            <RichParagraph segments={paragraph} />
          </motion.div>
        ))}

        <motion.div
          className="mt-2 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <HeroCtaLink
            to={homeAboutPreview.ctaHref}
            title="Read Tayyab's full professional background and achievements"
          >
            {homeAboutPreview.ctaLabel}
            <ArrowRight className="size-[1.05rem]" aria-hidden="true" />
          </HeroCtaLink>
        </motion.div>
      </div>
    </section>
  );
}

export default HomeAboutPreview;
