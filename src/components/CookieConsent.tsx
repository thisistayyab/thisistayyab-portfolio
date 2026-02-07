import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie } from 'lucide-react';
import { Button } from './ui/button';

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already consented
        const consented = localStorage.getItem('cookie-consent');
        if (!consented) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6 flex justify-center pointer-events-none"
                >
                    <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:max-w-2xl w-full shadow-2xl pointer-events-auto flex flex-col md:flex-row items-center gap-6">
                        <div className="p-3 bg-blue-500/10 rounded-full text-blue-400 shrink-0">
                            <Cookie size={24} />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-white font-bold mb-2">We use cookies</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                We use cookies to analyze our traffic and improve your experience.
                                By clicking "Accept", you consent to our use of cookies for analytics purposes.
                                We respect your privacy and do not share your data with third parties.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                            <Button variant="ghost" className="hover:bg-white/5 text-gray-400 hover:text-white" onClick={handleDecline}>
                                Decline
                            </Button>
                            <Button className="bg-white text-black hover:bg-gray-200" onClick={handleAccept}>
                                Accept
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
