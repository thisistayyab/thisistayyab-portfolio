export interface NavItem {
  label: string;
  href: string;
  sectionId: string; // For scroll-to-section functionality
}

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', sectionId: 'home' },
  { label: 'About', href: '/about', sectionId: 'about' },
  { label: 'Projects', href: '/projects', sectionId: 'project' },
  { label: 'Experience', href: '/experience', sectionId: 'experience' },
  { label: 'Testimonials', href: '/testimonials', sectionId: 'client' },
  { label: 'Services', href: '/services', sectionId: 'services' },
  { label: 'Insights', href: '/insights', sectionId: 'blog' },
  { label: 'Contact', href: '/contact', sectionId: 'contact' },
];
