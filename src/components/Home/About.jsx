import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2 relative"
                    >
                        <div className="relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1000&auto=format&fit=crop"
                                alt="Crafting Gifts"
                                className="rounded-lg shadow-xl w-full h-96 object-cover"
                            />
                        </div>
                        {/* Decorative border */}
                        <div className="absolute top-4 -left-4 w-full h-full border-2 border-primary rounded-lg -z-0 hidden md:block"></div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="md:w-1/2"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-6 leading-tight">
                            A Legacy of <span className="text-primary italic">Thoughtful Gifting</span>
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Established with a passion for celebrating relationships, Wrap and Pack Gifting creates bespoke experiences that linger in memory long after the occasion has passed.
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            We specialize in crafting memorable moments through creative excellence and meticulous attention to detail. From grand weddings to intimate corporate events, and every milestone in between, we are your trusted partner in expressing gratitude and love.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-serif text-xl text-primary mb-2">5+ Years</h4>
                                <p className="text-sm text-gray-500">of Experience</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-primary mb-2">1000+</h4>
                                <p className="text-sm text-gray-500">Happy Clients</p>
                            </div>
                        </div>

                        <button className="mt-8 border-b-2 border-primary text-secondary pb-1 hover:text-primary transition-colors text-sm uppercase tracking-widest font-semibold">
                            Read Our Story
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
