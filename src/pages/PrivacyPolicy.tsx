import { motion } from 'framer-motion';
import { GlobalBackground } from '../components/GlobalBackground';
import AppAppBar from '../components/Appbar';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrivacyPolicyProps {
    isDesktop: boolean;
}

export function PrivacyPolicy({ isDesktop }: PrivacyPolicyProps) {
    return (
        <>
            <SEOHead
                title="Privacy Policy | Tayyab"
                description="Privacy Policy for Tayyab's Portfolio. Learn how we handle your data."
            />
            <GlobalBackground isDesktop={isDesktop} showTechIcons={false} />
            <main className="relative z-10 min-h-screen flex flex-col pt-32">
                <div className="mb-4"><AppAppBar /></div>

                <div className="flex-grow max-w-3xl mx-auto px-4 w-full text-gray-300">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <Link to="/">
                            <Button variant="ghost" className="pl-0 hover:pl-2 transition-all text-gray-400 hover:text-white">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Home
                            </Button>
                        </Link>
                    </motion.div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Privacy Policy</h1>

                    <div className="prose prose-invert prose-blue max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
                            <p>Welcome to Tayyab's Portfolio. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. The Data We Collect</h2>
                            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data:</strong> includes email address and telephone number (if provided via contact form).</li>
                                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform and other technology on the devices you use to access this website.</li>
                                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Data</h2>
                            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                            <ul className="list-disc pl-5 mt-2 space-y-2">
                                <li>To verify your identity.</li>
                                <li>To manage your relationship with us.</li>
                                <li>To improve our website and services.</li>
                                <li>To ask for feedback.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. Cookies</h2>
                            <p>We use cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. Contact Us</h2>
                            <p>If you have any questions about this privacy policy or our privacy practices, please contact us via the contact form on this website.</p>
                        </section>

                        <div className="text-sm text-gray-500 pt-8 border-t border-white/10">
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>

                <Footer />
            </main>
        </>
    );
}
