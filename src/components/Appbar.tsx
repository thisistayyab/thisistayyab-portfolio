import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import logo from '../assets/favicon.png';
import { navItems } from '../data/navigation';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

export default function AppAppBar() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <motion.div>
      <nav 
        className="fixed top-[calc(var(--template-frame-height,0px)+28px)] left-0 right-0 z-[1100] flex justify-center px-3"
        role="navigation"
        aria-label="Main navigation"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
      >
        <div className="w-full max-w-[1200px]">
          <div className="flex items-center relative rounded-[8px] backdrop-blur-[20px] border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_40px_rgba(59,130,246,0.1)] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(59,130,246,0.2)] hover:border-white/20 py-3 px-5">
            {/* Top gradient border */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60" />

            {/* Logo and Title */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <motion.a
                href="#home"
                aria-label="Go to home page - Tayyab's Portfolio"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer"
              >
                <img
                  src={logo}
                  alt="Tayyab - Full Stack Web Developer and AI/ML Enthusiast Logo"
                  width="24"
                  height="24"
                  className="w-6 h-6"
                  loading="eager"
                  itemProp="logo"
                />
              </motion.a>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h1 className="font-bold tracking-[1px] text-[17px] block bg-gradient-to-br from-white via-slate-400 to-blue-400 bg-clip-text text-transparent whitespace-nowrap">
                  <span aria-hidden="true">ayyab's Portfolio</span>
                  <span className="sr-only">Tayyab's Portfolio</span>
                </h1>
              </motion.div>
            </div>

            {/* Desktop Nav - Left aligned with margin */}
            <ul className="hidden sm:flex md:flex items-center gap-2 ml-6 p-2 list-none" role="menubar" aria-label="Main navigation menu">
              {navItems.map((item) => (
                <li key={item.label} role="none">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -5 }}
                  >
                    <a
                      href={item.href}
                      role="menuitem"
                      aria-label={`Navigate to ${item.label} section`}
                      title={`Go to ${item.label} section - Tayyab's Portfolio`}
                      className="group relative text-white/90 no-underline px-4 py-3 bg-transparent rounded-[10px] font-medium text-[0.95rem] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-white/5 hover:text-white hover:-translate-y-0.5"
                      itemProp="url"
                    >
                      <span itemProp="name">{item.label}</span>
                      <span className="nav-underline absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-sm group-hover:w-full" aria-hidden="true" />
                    </a>
                  </motion.div>
                </li>
              ))}
            </ul>

            {/* Mobile Nav */}
            <div className="flex sm:hidden md:hidden flex-shrink-0 ml-auto">
              <motion.div whileTap={{ scale: 0.9 }}>
                <Button
                  variant="ghost"
                  aria-label="Open mobile navigation menu"
                  aria-expanded={open}
                  aria-controls="mobile-navigation-menu"
                  onClick={() => setOpen(true)}
                  className="text-white hover:bg-white/10 w-10 h-10 p-0 flex items-center justify-center min-h-0 [&_svg]:!size-7 [&_svg]:shrink-0"
                >
                  <Menu strokeWidth={1.5} aria-hidden="true"/>
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </motion.div>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                  side="top"
                  id="mobile-navigation-menu"
                  aria-label="Mobile navigation menu"
                  className="bg-[#0b0c10] h-screen p-2 top-[var(--template-frame-height,0px)] [&>button]:text-white [&>button]:hover:bg-white/10 [&>button]:w-10 [&>button]:h-10 [&>button]:top-4 [&>button]:right-4 [&>button>svg]:w-5 [&>button>svg]:h-5 [&>button]:opacity-100 [&>button]:bg-transparent [&>button]:border-0 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:p-0"
                >
                  <SheetHeader>
                    <SheetTitle className="sr-only">Tayyab's Portfolio - Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <AnimatePresence>
                    {open && (
                      <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        role="navigation"
                        aria-label="Mobile navigation menu"
                      >
                        <ul className="list-none" role="menu">
                          {navItems.map((item, index) => (
                            <li key={item.label} role="none">
                              <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ x: 10 }}
                              >
                                <a
                                  href={item.href}
                                  role="menuitem"
                                  aria-label={`Navigate to ${item.label} section`}
                                  title={`Go to ${item.label} section - Tayyab's Portfolio`}
                                  className="block text-white py-3 px-4 hover:bg-white/5 rounded transition-colors"
                                  onClick={() => setOpen(false)}
                                >
                                  {item.label}
                                </a>
                              </motion.div>
                            </li>
                          ))}
                        </ul>
                        <div className="my-6 border-t border-gray-800" aria-hidden="true" />
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}
