import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2070&auto=format&fit=crop"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
                    >
                        Our Story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-primary mb-6"
                    >
                        Crafting Emotions into <br /> <span className="italic">Bespoke Gifts</span>
                    </motion.h1>
                </div>
            </section>

            {/* 2. The Vision */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="aspect-[4/5] rounded-sm overflow-hidden shadow-2xl skew-y-2 border-8 border-white"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop"
                                alt="Vision"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="space-y-8">
                            <h2 className="font-serif text-4xl text-primary leading-tight">
                                More than just a hamper, <br /> it's a memory.
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg italic">
                                "At Wrap n Pack, we believe that the best gifts are those that evoke a feeling. Every ribbon tied and every product selected is done with a single purpose: to make your loved ones feel special."
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Born from a passion for aesthetics and a love for celebrations, Wrap n Pack was founded to fill the gap between generic gifts and truly personalized hampers. We source the finest delicacies, the most elegant accessories, and the most durable packaging to ensure that your gift is a masterpiece.
                            </p>
                            <div className="pt-4">
                                <Link to="/#collections" className="inline-flex items-center gap-2 text-primary uppercase tracking-widest text-xs font-bold border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-all">
                                    Explore Our Collections <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Core Values */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center mb-16">
                    <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-3 block">Why Choose Us</span>
                    <h2 className="font-serif text-4xl text-primary">The Wrap n Pack Promise</h2>
                </div>
                <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { icon: Heart, title: "Curated with Love", desc: "Every item in our hampers is hand-picked to ensure it meets our high standards of quality and emotion." },
                        { icon: ShieldCheck, title: "Premium Quality", desc: "We never compromise. From the box material to the finest chocolates, everything is premium." },
                        { icon: Sparkles, title: "Bespoke Design", desc: "Unique layouts tailored to your occasion, whether it's a wedding, corporate event, or a personal milestone." }
                    ].map((value, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-background p-10 rounded-sm text-center border border-gray-100 hover:shadow-xl transition-shadow group"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                <value.icon size={28} />
                            </div>
                            <h3 className="font-serif text-xl text-primary mb-4">{value.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. Team / Stats Section */}
            <section className="py-24 bg-secondary text-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <p className="text-5xl font-serif text-accent mb-2">500+</p>
                            <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Happy Clients</p>
                        </div>
                        <div>
                            <p className="text-5xl font-serif text-accent mb-2">2k+</p>
                            <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Hampers Delivered</p>
                        </div>
                        <div>
                            <p className="text-5xl font-serif text-accent mb-2">15+</p>
                            <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Corporate Partners</p>
                        </div>
                        <div>
                            <p className="text-5xl font-serif text-accent mb-2">4.9/5</p>
                            <p className="text-xs uppercase tracking-widest text-white/50 font-bold">Average Rating</p>
                        </div>
                    </div>
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            </section>

            {/* 5. Final CTA */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-6 max-w-2xl">
                    <h2 className="font-serif text-4xl text-primary mb-8 leading-tight">Ready to make your next occasion unforgettable?</h2>
                    <Link
                        to="/#contact"
                        className="inline-block bg-primary text-white py-4 px-12 uppercase tracking-[0.3em] text-xs font-bold hover:bg-secondary transition-all shadow-xl shadow-primary/20"
                    >
                        Get in Touch
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
