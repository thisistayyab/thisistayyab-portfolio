import cplusplus from '../assets/tech-icons/c++.svg';
import css3 from '../assets/tech-icons/css.svg';
import html5 from '../assets/tech-icons/html.svg';
import tailwindcss from '../assets/tech-icons/tailwind.svg';
import javascript from '../assets/tech-icons/js.svg';
import bootstrap from '../assets/tech-icons/bootstrap.svg';
import mongodb from '../assets/tech-icons/mongodb.svg';
import express from '../assets/tech-icons/express.svg';
import python from '../assets/tech-icons/python.svg';
import scikitlearn from '../assets/tech-icons/scikit.svg';
import tensorflow from '../assets/tech-icons/tensorflow.svg';
import pytorch from '../assets/tech-icons/pytorch.svg';
import react from '../assets/tech-icons/react.svg';
import robotframework from '../assets/tech-icons/robo.svg';
import kalilinux from '../assets/tech-icons/kali.svg';

export interface TechIcon {
  src: string;
  alt: string;
  top: string;
  left: string;
  duration: number;
}

export const techIcons: TechIcon[] = [
  { src: cplusplus, alt: 'C++ programming language logo', top: '15%', left: '20%', duration: 9 },
  { src: css3, alt: 'CSS3 styling language logo', top: '19%', left: '30%', duration: 9 },
  { src: html5, alt: 'HTML5 markup language logo', top: '30%', left: '60%', duration: 11 },
  { src: tailwindcss, alt: 'Tailwind CSS framework logo', top: '70%', left: '25%', duration: 10 },
  { src: javascript, alt: 'JavaScript programming language logo', top: '50%', left: '40%', duration: 8 },
  { src: bootstrap, alt: 'Bootstrap UI framework logo', top: '15%', left: '75%', duration: 9 },
  { src: mongodb, alt: 'MongoDB database logo', top: '80%', left: '60%', duration: 12 },
  { src: express, alt: 'Express.js backend framework logo', top: '35%', left: '10%', duration: 10 },
  { src: python, alt: 'Python programming language logo', top: '65%', left: '80%', duration: 11 },
  { src: scikitlearn, alt: 'Scikit-learn machine learning library logo', top: '20%', left: '50%', duration: 10 },
  { src: tensorflow, alt: 'TensorFlow deep learning framework logo', top: '80%', left: '30%', duration: 12 },
  { src: pytorch, alt: 'PyTorch deep learning framework logo', top: '40%', left: '80%', duration: 10 },
  { src: react, alt: 'React JavaScript library logo', top: '60%', left: '10%', duration: 11 },
  { src: robotframework, alt: 'Robot Framework test automation logo', top: '75%', left: '50%', duration: 13 },
  { src: kalilinux, alt: 'Kali Linux cyber security distribution logo', top: '55%', left: '55%', duration: 13 },
];
