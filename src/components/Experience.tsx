import React from 'react';
import { motion } from 'framer-motion';
import { experiences } from '../data/experience';

function Experience() {
  return (
    <section className="section__container experience__container" id="experience" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Blurred Circle Background */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '10%',
        width: 200,
        height: 200,
        background: '#3b82f6',
        borderRadius: '50%',
        filter: 'blur(100px)',
        opacity: 0.15,
        zIndex: 0,
      }} />

      <motion.h2
        className="section__header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        Experience
      </motion.h2>

      <motion.p
        className="section__description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 2 }}
      >
        My journey in software development, from learning to building production-ready applications
      </motion.p>

      <div className="experience__grid" style={{ position: 'relative', zIndex: 2, marginTop: '4rem' }}>
        {experiences.map((exp, i) => {
          const colorRgb = exp.color === '#3b82f6' ? '59, 130, 246' : exp.color === '#8b5cf6' ? '139, 92, 246' : '236, 72, 153';
          const Icon = exp.Icon;
          return (
            <motion.div
              key={exp.id}
              className="experience__card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.7 }}
              viewport={{ once: true }}
              style={{
                '--experience-color': exp.color,
                '--experience-color-rgb': colorRgb,
                '--badge-color': exp.color,
                '--badge-color-rgb': colorRgb
              } as React.CSSProperties}
            >
              <div className="experience__icon" style={{ color: exp.color }}>
                <Icon size={exp.iconSize} />
              </div>
              <div className="experience__badge" style={{ '--badge-color': exp.color } as React.CSSProperties}>
                {exp.type === 'work' ? 'Work' : 'Education'}
              </div>
              <h3>{exp.title}</h3>
              <h4>{exp.company} <span>• {exp.period}</span></h4>
              <p>{exp.description}</p>
              <div className="experience__tech">
                {exp.technologies.map((tech, idx) => (
                  <span key={idx} className="experience__tech-tag">{tech}</span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;
