import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BlogCTA() {
    return (
        <section className="max-w-[1000px] mx-auto px-4 mb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 md:p-12 text-center"
            >
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-blue-300"
                    >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span>Let's Build Something Amazing</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-2xl"
                    >
                        Ready to turn your vision into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">reality?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl"
                    >
                        I help businesses and founders build scalable, high-performance web applications. Let's discuss your next project.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        {/* Using a hash link to the contact section on the main page, or we can use a direct Contact route if available. 
                Assuming main page has #contact id */ }
                        <Link to="/contact">
                            <Button
                                size="lg"
                                className="group min-w-[200px] text-base h-14"
                                glowColor="rgba(59, 130, 246, 0.5)"
                            >
                                Start a Project
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
