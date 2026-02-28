import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';

// Map icon string names to components
const ICON_MAP = { Heart, ShieldCheck, Sparkles, Users };

const AboutUs = () => {
    const { content } = useSiteContent();

    const values = Array.isArray(content.aboutpage_values) ? content.aboutpage_values : [];
    const stats = Array.isArray(content.stats) ? content.stats : [];

    return (
        <div className="min-h-screen bg-white">
            {/* 1. Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={content.aboutpage_hero_image}
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
                        {content.aboutpage_hero_badge}
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-serif text-5xl md:text-7xl text-primary mb-6"
                    >
                        {content.aboutpage_hero_title}
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
                                src={content.aboutpage_vision_image}
                                alt="Vision"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <div className="space-y-8">
                            <h2 className="font-serif text-4xl text-primary leading-tight">
                                {content.aboutpage_vision_title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg italic">
                                "{content.aboutpage_vision_quote}"
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                {content.aboutpage_vision_para}
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
                    <h2 className="font-serif text-4xl text-primary">{content.aboutpage_promise_title}</h2>
                </div>
                <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12">
                    {values.map((value, i) => {
                        const IconComp = ICON_MAP[value.icon] || Heart;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="bg-background p-10 rounded-sm text-center border border-gray-100 hover:shadow-xl transition-shadow group"
                            >
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                                    <IconComp size={28} />
                                </div>
                                <h3 className="font-serif text-xl text-primary mb-4">{value.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* 4. Stats Section */}
            <section className="py-24 bg-secondary text-white relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, i) => (
                            <div key={i}>
                                <p className="text-5xl font-serif text-accent mb-2">{stat.number}</p>
                                <p className="text-xs uppercase tracking-widest text-white/50 font-bold">{stat.label}</p>
                            </div>
                        ))}
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
