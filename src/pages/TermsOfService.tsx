import { motion } from 'framer-motion';
import { GlobalBackground } from '../components/GlobalBackground';
import AppAppBar from '../components/Appbar';
import Footer from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TermsOfServiceProps {
    isDesktop: boolean;
}

export function TermsOfService({ isDesktop }: TermsOfServiceProps) {
    return (
        <>
            <SEOHead
                title="Terms of Service | Tayyab"
                description="Terms of Service for Tayyab's Portfolio."
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

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Terms of Service</h1>

                    <div className="prose prose-invert prose-blue max-w-none space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. Intellectual Property</h2>
                            <p>The content, organization, graphics, design, compilation, and other matters related to the Site are protected under applicable copyrights, trademarks and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. Use of Site</h2>
                            <p>You agree to use this site only for lawful purposes. You agree not to take any action that might compromise the security of the site, render the site inaccessible to others or otherwise cause damage to the site or the Content.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. Disclaimer</h2>
                            <p>The information provided on this website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability or completeness of any information on the Site.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. Limitation of Liability</h2>
                            <p>Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site.</p>
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
