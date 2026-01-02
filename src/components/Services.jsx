import React from 'react';
import { motion } from 'framer-motion';

const profiles = [
  {
    id: 1,
    name: 'Upwork',
    description: 'Check out my Upwork profile where I offer freelance full-stack development services.',
    link: 'https://www.upwork.com/freelancers/~015384474940802080',
    button: 'View Profile',
  },
  {
    id: 2,
    name: 'Fiverr',
    description: 'Explore my Fiverr gigs covering modern web apps, portfolio sites, and custom solutions.',
    link: 'https://www.fiverr.com/thisistayyab',
    button: 'View Profile',
  },
  {
    id: 3,
    name: 'Freelancer',
    description: 'Check out my Freelancer profile where I deliver web apps, CRM systems, and tailored solutions.',
    link: 'https://www.freelancer.com/u/thisistayyab',
    button: 'View Profile',
  },
  {
    id: 4,
    name: 'Truelancer',
    description: 'Browse my Truelancer profile for professional projects in web development and custom applications.',
    link: 'https://www.truelancer.com/freelancer/tayyabaslam19',
    button: 'View Profile',
  },
  {
    id: 5,
    name: 'GitHub',
    description: 'Browse my GitHub repositories including full-stack apps, experiments, and open-source projects.',
    link: 'https://github.com/thisistayyab',
    button: 'View Repos',
  },
  {
    id: 6,
    name: 'LinkedIn',
    description: 'Connect with me on LinkedIn to view my professional journey, skills, and endorsements.',
    link: 'https://pk.linkedin.com/in/thisistayyab',
    button: 'Connect',
  },
  {
    id: 7,
    name: 'LeetCode',
    description: 'Explore my LeetCode profile where I solved 1150+ problems, showcasing strong DSA and problem-solving skills.',
    link: 'https://leetcode.com/u/thisistayyab/',
    button: 'View Profile',
  },
  {
    id: 8,
    name: 'Credly',
    description: 'Check out my Credly profile to view verified certifications that highlight my technical expertise and achievements.',
    link: 'https://www.credly.com/users/thisistayyab',
    button: 'View Profile',
  },

];

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
        {profiles.map((profile, i) => (
          <motion.div
            key={profile.id}
            className="profile__card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3>{profile.name}</h3>
            <p>{profile.description}</p>
            <a
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              {profile.button}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Services;
