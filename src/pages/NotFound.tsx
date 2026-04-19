import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GlobalBackground } from '../components/GlobalBackground';
import AppAppBar from '../components/Appbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Home, BookOpen, Mail } from 'lucide-react';

interface NotFoundProps {
  isDesktop: boolean;
}

export function NotFound({ isDesktop }: NotFoundProps) {
  return (
    <>
      <GlobalBackground isDesktop={isDesktop} showTechIcons={false} />
      <main className="relative z-10 min-h-screen flex flex-col pt-32">
        <div className="mb-4">
          <AppAppBar />
        </div>

        <div className="flex-grow flex flex-col items-center justify-center px-4 pb-24 text-center max-w-2xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-400/90 mb-4"
          >
            Error 404
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Page not found
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg mb-10 max-w-md"
          >
            This URL does not match any page on the site. The link may be outdated or the address may have a typo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center"
          >
            <Link to="/">
              <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white">
                <Home className="mr-2 h-4 w-4" />
                Back to home
              </Button>
            </Link>
            <Link to="/blog">
              <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                <BookOpen className="mr-2 h-4 w-4" />
                View blog
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-12"
          >
            <Link to="/contact">
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </Button>
            </Link>
          </motion.div>
        </div>

        <Footer />
      </main>
    </>
  );
}
