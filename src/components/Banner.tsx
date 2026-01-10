import { motion } from 'framer-motion';
import { bannerCards } from '../data/banner';
import { Card } from './ui/card';

function Banner() {
  const baseUrl = 'https://thisistayyab.dev';

  return (
    <section 
      className="max-w-[1200px] mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 items-stretch"
      id="services-overview"
      aria-labelledby="banner-heading"
      role="region"
    >
      {/* Structured Data for Services/Features - JSON-LD only (removed duplicate microdata) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": `${baseUrl}/#services-overview`,
            "name": "Web Development Services Overview",
            "description": "Tayyab's core web development services: Design, Development, and Testing & QA. Expert full-stack developer offering comprehensive digital solutions.",
            "itemListElement": bannerCards.map((card, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Service",
                "name": card.title,
                "description": card.description,
                "provider": {
                  "@type": "Person",
                  "name": "Tayyab",
                  "url": baseUrl
                },
                "serviceType": card.title === "Design" 
                  ? "Web Design Service"
                  : card.title === "Development"
                  ? "Web Development Service"
                  : "Quality Assurance Service"
              }
            }))
          })
        }}
      />

      {/* Visible heading for proper hierarchy and SEO */}
      <h2 id="banner-heading" className="sr-only">
        Core Web Development Services - Design, Development, and Quality Assurance
      </h2>

      {bannerCards.map((card, i) => {
        const Icon = card.Icon;
        const cardId = `service-card-${i}`;
        return (
          <motion.article
            key={card.title}
            id={cardId}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: i * 0.15, 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-transparent rounded-[8px]"
            tabIndex={0}
            role="article"
            aria-labelledby={`${cardId}-title`}
            aria-describedby={`${cardId}-description`}
          >
            <Card
              className="h-full py-10 px-8 flex flex-row items-start gap-6 group focus-within:ring-0"
              glowColor="rgba(59, 130, 246, 0.1)"
              hoverScale={true}
              hoverLift={true}
            >
              {/* Icon Container */}
              <span 
                className="w-14 h-14 min-w-[56px] flex items-center justify-center text-2xl bg-[linear-gradient(135deg,rgba(59,130,246,0.2),rgba(139,92,246,0.2))] border-[1.5px] border-[rgba(59,130,246,0.3)] rounded-[8px] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] relative z-[2] text-[#3b82f6] group-hover:scale-110 group-hover:rotate-[5deg] group-hover:bg-[linear-gradient(135deg,rgba(59,130,246,0.3),rgba(139,92,246,0.3))] group-hover:border-[rgba(59,130,246,0.5)] group-hover:shadow-[0_8px_24px_rgba(59,130,246,0.4)] shrink-0 mb-3"
                aria-hidden="true"
              >
                <Icon size={card.iconSize} />
              </span>
              
              {/* Content */}
              <div className="relative z-[2] flex-1">
                <h3 
                  id={`${cardId}-title`}
                  className="mb-3 text-[1.3rem] font-bold text-white bg-[linear-gradient(135deg,#ffffff,#94a3b8)] bg-clip-text text-transparent transition-all duration-300 ease-in-out group-hover:bg-[linear-gradient(135deg,#3b82f6,#8b5cf6)] group-hover:bg-clip-text"
                >
                  {card.title}
                </h3>
                <p 
                  id={`${cardId}-description`}
                  className="text-[#94a3b8] leading-[1.7] text-[0.95rem] opacity-90"
                >
                  {card.description}
                </p>
              </div>
            </Card>
          </motion.article>
        );
      })}
    </section>
  );
}

export default Banner;
