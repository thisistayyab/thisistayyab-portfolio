import React from 'react';
import { motion } from 'framer-motion';
import { profiles } from '../data/services';

function Services() {
  return (
    <section className="section__container profile__container" id="service">
      <motion.h2
        className="section__header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        My Profiles
      </motion.h2>
      <div className="profile__grid">
        {profiles.map((profile, i) => {
          const Icon = profile.Icon;
          return (
            <motion.div
              key={profile.id}
              className="profile__card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
              viewport={{ once: true }}
              style={{ '--profile-color': profile.color } as React.CSSProperties}
            >
              <div className="profile__icon" style={{ color: profile.color }}>
                <Icon size={profile.iconSize} />
              </div>
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn profile__btn"
              style={{ 
                '--btn-color': profile.color,
                borderColor: profile.color,
                color: profile.color
              } as React.CSSProperties}
            >
              {profile.button}
            </a>
          </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Services;
