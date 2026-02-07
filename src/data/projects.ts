import project1 from '../assets/project-1.png';
import project2 from '../assets/project-2.jpg';
import project3 from '../assets/project-3.png';
import project4 from '../assets/project-4.png';
import project5 from '../assets/project-5.webp';
import project6 from '../assets/project-6.png';
import project7 from '../assets/project-7.png';
import project8 from '../assets/project-8.png';
import project9 from '../assets/project-9.png';
import project10 from '../assets/project-10.png';
import project11 from '../assets/p-11.png'
import project12 from '../assets/p-12.png'

export interface Technology {
  label: string;
  color: string;
  width: string;
}

export interface Project {
  id: number;
  category: string;
  img: string;
  link: string;
  name: string;
  description: string;
  technologies: Technology[];
  button: string;
}

export interface Filter {
  label: string;
  value: string;
}

export const projects: Project[] = [
  {
    id: 1,
    category: 'web',
    img: project12,
    link: 'https://qr.menuorderai.com/',
    name: 'Menu-OrderAI QR',
    description: `MenuOrderAI QR is an AI-powered QR code menu ordering system that enables restaurants to provide contactless dining experiences. Built with React, TypeScript, and Supabase, the platform allows customers to scan QR codes to instantly access digital menus with AI-powered meal recommendations. The system analyzes menu items in real-time to highlight GLP-1 friendly, high-protein, and low-carb options, helping health-conscious diners make informed choices. Features include real-time menu analysis, personalized recommendations, nutritional insights, and seamless ordering integration. The application demonstrates expertise in AI integration, real-time data processing, and creating user-friendly mobile-first experiences.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '95%' },
      { label: 'TypeScript', color: '#3178c6', width: '90%' },
      { label: 'Supabase', color: '#3ECF8E', width: '85%' },
      { label: 'AI Integration', color: '#10b981', width: '80%' },
    ],
    button: 'Live View'
  },
  {
    id: 2,
    category: 'web',
    img: project11,
    link: 'https://www.menuorderai.com/',
    name: 'Menu-OrderAI Website',
    description: `MenuOrderAI is a comprehensive WordPress website for an AI-powered dining app that helps health-conscious diners and GLP-1 medication users make smarter restaurant choices. The website showcases the app's features including real-time menu analysis, GLP-1 friendly meal recommendations, high-protein and low-carb filtering, and nutritional insights. Built with WordPress, the site features responsive design, SEO optimization, and seamless integration with app store listings. The platform serves as both a marketing website and informational resource, explaining how AI technology transforms restaurant dining experiences. This project demonstrates expertise in WordPress development, content management, SEO best practices, and creating conversion-focused landing pages.`,
    technologies: [
      { label: 'WordPress', color: '#21759b', width: '95%' },
      { label: 'PHP', color: '#777bb4', width: '80%' },
      { label: 'SEO', color: '#f59e0b', width: '90%' },
      { label: 'Responsive Design', color: '#8b5cf6', width: '85%' },
    ],
    button: 'Live View'
  },
  {
    id: 3,
    category: 'web',
    img: project8,
    link: 'https://7opportunity.vercel.app/',
    name: '7Opportunity',
    description: `7Opportunity is a sleek, animated multi-section website built to serve as a personal brand and marketing platform. It integrates smooth scrolling, dynamic transitions, and an interactive UI to provide an engaging experience. The backend, powered by Supabase, handles user inquiries, data storage, and dynamic content integration for maximum functionality. The site was carefully designed to be fully responsive, adapting seamlessly to various screen sizes and ensuring consistent performance. 7Opportunity demonstrates advanced frontend development skills with Framer Motion animations, backend integration, and modern deployment practices on Vercel.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '90%' },
      { label: 'Supabase', color: '#3ECF8E', width: '75%' },
      { label: 'Express.js', color: '#ab4908ff', width: '75%' },
      { label: 'API Development', color: '#2563EB', width: '95%' },
    ],
    button: 'Live View'
  },
  {
    id: 4,
    category: 'web',
    img: project9,
    link: 'https://7options.vercel.app/',
    name: '7Options',
    description: `7Options is a full stack subscription management platform designed to handle  subscription sign-ups, recurring payments, refundable deposits, and account management. The system includes a modern user dashboard, predefined subscription plans, à la carte options, and automated email reminders. It integrates seamlessly with Stripe for payments, Swikly for refundable deposits, and Odoo for quote signing and CRM follow-ups. The platform also includes admin and super admin dashboards for full control, with security and reliability at its core.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '75%' },
      { label: 'API Development', color: '#2563EB', width: '95%' },
      { label: 'Supabase', color: '#3ECF8E', width: '95%' },
      { label: 'Express.js', color: '#ab4908ff', width: '85%' },
    ],
    button: 'Live View'
  },
  {
    id: 5,
    category: 'web',
    img: project10,
    link: 'https://7talenthub.vercel.app/',
    name: '7TalentHub',
    description: `7 TalentHub is a full-featured company CRM for managing employee relations, talent tracking, and performance analytics. Built with React.js, Node.js, and Supabase, it streamlines HR workflows, boosts retention, and creates dynamic internal talent portfolios.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '85%' },
      { label: 'Supabase', color: '#3ECF8E', width: '85%' },
      { label: 'API Development', color: '#2563EB', width: '95%' },
      { label: 'Express.js', color: '#ab4908ff', width: '75%' },
    ],
    button: 'Live View'
  },
  {
    id: 6,
    category: 'web',
    img: project2,
    link: 'https://taylancecrm.vercel.app/',
    name: 'Taylance CRM',
    description: `Taylance CRM is a full-featured client relationship management system designed to help businesses seamlessly manage clients, leads, and projects from one central dashboard. Built with React on the frontend and Express.js on the backend, it integrates modern UI design with Material-UI components for an intuitive experience. The application supports CRUD operations for client and project management, route protection for authenticated users, and persistent data handling through REST APIs. With a responsive design and interactive animations, Taylance CRM ensures smooth navigation across devices, while backend integration guarantees secure and reliable performance for managing business workflows.`,
    technologies: [
      { label: 'API Development', color: '#2563EB', width: '95%' },
      { label: 'React', color: '#61dafb', width: '80%' },
      { label: 'Express.js', color: '#ab4908ff', width: '80%' },
      { label: 'MUI', color: '#1076adff', width: '60%' },
    ],
    button: 'Live View'
  },
  {
    id: 7,
    category: 'web',
    img: project1,
    link: 'https://notehub-thisistayyab.vercel.app/',
    name: 'NoteHub',
    description: `NoteHub is a modern note-taking web application that allows users to create, organize, and edit notes seamlessly in a clean, distraction-free interface. Built with React and Express.js, the app connects to a MongoDB database for secure storage and retrieval of user notes. It features real-time synchronization, so changes update instantly without refreshing the page. Notes can be easily searched, edited, or deleted with smooth UI transitions powered by Framer Motion. The responsive design ensures usability on both desktop and mobile devices, making NoteHub a reliable productivity companion for users who need efficient note management.`,
    technologies: [
      { label: 'API Development', color: '#2563EB', width: '95%' },
      { label: 'React', color: '#61dafb', width: '80%' },
      { label: 'Express.js', color: '#ab4908ff', width: '70%' },
      { label: 'MongoDB', color: '#00782eff', width: '60%' },
    ],
    button: 'Live View'
  },
  {
    id: 8,
    category: 'design',
    img: project3,
    link: 'https://leetcode.com/u/thisistayyab/',
    name: 'LeetCode Profile',
    description: `My LeetCode profile reflects a strong foundation in Data Structures and Algorithms with over 1150+ problems solved. This extensive problem-solving practice demonstrates deep expertise in algorithm design, time complexity optimization, and mastery of programming paradigms using C++ as the primary language. By tackling advanced problems across topics such as dynamic programming, graph theory, recursion, and system design, I have built a strong problem-solving mindset essential for real-world software development. This profile showcases dedication, persistence, and the ability to approach challenges logically and systematically.`,
    technologies: [
      { label: 'C++', color: '#004488ff', width: '90%' },
      { label: 'JavaScript', color: '#ffe96bff', width: '5%' },
      { label: 'Python', color: '#252cffff', width: '5%' },
      { label: 'Pandas', color: '#150458', width: '15%' },
    ],
    button: 'Live View'
  },
  {
    id: 9,
    category: 'web',
    img: project7,
    link: 'https://github.com/thisistayyab/Taynio-chat',
    name: 'Taynio Chat',
    description: `Taynio Chat is a real-time messaging application built with React, Node.js, and Socket.IO, designed for fast, secure, and reliable communication. It enables instant message exchange, active user presence detection, and seamless real-time updates without page reloads. The app features a clean and intuitive UI, message notifications, and smooth animations that enhance user experience. By leveraging WebSockets, the platform ensures low-latency communication, making it scalable for group chats and private messaging. Taynio Chat demonstrates expertise in building interactive, real-time applications with efficient backend event handling and persistent data storage.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '80%' },
      { label: 'Node.js', color: '#0d5619ff', width: '70%' },
      { label: 'Socket.io', color: '#005595ff', width: '60%' },
      { label: 'API Development', color: '#2563EB', width: '95%' },
    ],
    button: 'Repo Link'
  },
  {
    id: 10,
    category: 'web',
    img: project5,
    link: "https://newswave-thisistayyab.netlify.app/",
    name: 'NewsWave',
    description: `NewsWave is a dynamic news aggregator application designed to keep users informed with the latest headlines from around the world. Built with React and integrated with third-party news APIs, it fetches live articles and presents them in a structured, visually appealing layout. Users can browse articles by category, country, or keyword search, making the app highly interactive and personalized. NewsWave features infinite scrolling, responsive design, and smooth loading indicators to ensure a modern reading experience. The platform demonstrates skills in API integration, state management, and building scalable content-driven applications.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '90%' },
      { label: 'Bootstrap', color: '#0fb0f0ff', width: '50%' },
      { label: 'API Integration', color: '#ff0000ff', width: '40%' },
      { label: 'Responsive Design', color: '#8b5cf6', width: '90%' },
    ],
    button: 'Live View'
  },
  {
    id: 11,
    category: 'web',
    img: project6,
    link: 'https://thisistayyab.github.io/EditWave/',
    name: 'EditWave',
    description: `EditWave is a browser-based text editor web application designed to offer a smooth and modern editing experience. With a clean and minimalistic UI, it supports real-time text manipulation and formatting, making it ideal for quick note-taking or drafting documents. Built with React and Bootstrap, the editor is lightweight, responsive, and works seamlessly across devices. Features like instant editing, live preview, and interactive UI feedback provide a user-friendly workflow. EditWave demonstrates the ability to build functional, interactive web applications with strong focus on user experience and responsive design principles.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '90%' },
      { label: 'Responsive Design', color: '#8b5cf6', width: '50%' },
      { label: 'Bootstrap', color: '#7000e1ff', width: '90%' },
      { label: 'JavaScript', color: '#ffe96bff', width: '60%' },
    ],
    button: 'Live View'
  },
  {
    id: 12,
    category: 'web',
    img: project4,
    link: 'https://thisistayyab.github.io/kashif-project/',
    name: "Shahid's Portfolio",
    description: `Shahid's Portfolio is a modern personal branding website built to showcase projects, achievements, and skills with elegance. Developed with React, JavaScript, and CSS, the portfolio highlights clean UI design principles with smooth transitions, hover effects, and a modular layout. It provides dedicated sections for project showcases, skillsets, and contact information, allowing visitors to easily navigate and learn more. The design focuses on responsiveness, ensuring it adapts perfectly to mobile, tablet, and desktop devices. This project demonstrates expertise in portfolio website development, modern web styling, and delivering visually compelling presentations of personal work.`,
    technologies: [
      { label: 'React', color: '#61dafb', width: '90%' },
      { label: 'CSS', color: '#0fb0f0ff', width: '90%' },
      { label: 'JavaScript', color: '#ffe96bff', width: '60%' },
      { label: 'Responsive Design', color: '#8b5cf6', width: '90%' },
    ],
    button: 'Live View'
  },
];

export const filters: Filter[] = [
  { label: 'All', value: 'all' },
  { label: 'Web Apps', value: 'web' },
  { label: 'Problem Solving', value: 'design' },
];
