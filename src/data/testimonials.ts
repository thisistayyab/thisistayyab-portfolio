import client1 from '../assets/client-1.webp';

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  clientCompany?: string;
  clientImage?: string;
  platform?: string; // e.g., "Fiverr", "Upwork", "Freelancer"
  platformUrl?: string;
  rating: number; // 1-5
  testimonial: string;
  date?: string;
  projectType?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    clientName: 'Christopher',
    clientRole: 'Business Owner',
    clientImage: client1,
    platform: 'Fiverr',
    platformUrl: 'https://www.fiverr.com',
    rating: 5,
    testimonial: 'Attentive, thorough and thorough; mission successfully completed.',
    date: '2025',
    projectType: 'Web Development'
  },
  // {
  //   id: 'testimonial-2',
  //   clientName: 'Satisfied Client',
  //   clientRole: 'Business Owner',
  //   clientImage: client1,
  //   platform: 'Fiverr',
  //   platformUrl: 'https://www.fiverr.com',
  //   rating: 5,
  //   testimonial: 'Outstanding work! The developer delivered exactly what was promised and exceeded expectations. Highly professional and responsive throughout the project.',
  //   date: '2024',
  //   projectType: 'Web Development'
  // }
];
