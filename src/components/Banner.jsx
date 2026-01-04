import React from 'react';
import { motion } from 'framer-motion';
import { RiPenNibLine, RiLayoutMasonryLine, RiCheckboxLine } from 'react-icons/ri';

function Banner() {
  const cards = [
    {
      icon: <RiPenNibLine size={24} />,
      title: 'Design',
      description: 'My focus is on delivering engaging and impactful digital content.'
    },
    {
      icon: <RiLayoutMasonryLine size={24} />,
      title: 'Development',
      description: 'I stay at forefront of technological advancements, ensuring your digital presence performant.'
    },
    {
      icon: <RiCheckboxLine size={24} />,
      title: 'Testing & QA',
      description: 'I understand that your digital presence should not just look good, it should deliver traffic & engagement.'
    }
  ];

  return (
    <section className="section__container banner__container">
      {cards.map((card, i) => (
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
          <span>{card.icon}</span>
          <div>
            <h4>{card.title}</h4>
            <p>{card.description}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

export default Banner; 