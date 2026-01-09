import React from 'react';
import { motion } from 'framer-motion';
import { bannerCards } from '../data/banner';

function Banner() {
  return (
    <section className="section__container banner__container">
      {bannerCards.map((card, i) => {
        const Icon = card.Icon;
        return (
          <motion.div
            key={card.title}
            className="banner__card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              delay: i * 0.15, 
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            <span><Icon size={card.iconSize} /></span>
            <div>
              <h4>{card.title}</h4>
              <p>{card.description}</p>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}

export default Banner;
