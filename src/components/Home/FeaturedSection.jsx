import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const features = [
    {
        id: 1,
        title: "Curated with Love",
        subtitle: "The Art of Gifting",
        description: "Every hamper is a labor of love, meticulously assembled to convey your deepest emotions. We source the finest products to ensure your gift stands out.",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop",
        align: "left"
    },
    {
        id: 2,
        title: "Corporate Excellence",
        subtitle: "Make a Statement",
        description: "Strengthen business relationships with our premium corporate gifting solutions. elegantly packaged to reflect your brand's prestige.",
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2070&auto=format&fit=crop",
        align: "right"
    }
];

const FeaturedSection = () => {
    return (
        <section className="py-24 overflow-hidden" id="about">
            <div className="container mx-auto px-6">
                {features.map((feature, index) => (
                    <div
                        key={feature.id}
                        className={`group relative flex flex-col md:flex-row items-center gap-16 mb-32 last:mb-0 p-8 md:p-12 rounded-2xl transition-all duration-1000
                        ${index % 2 === 0 ? 'bg-secondary mesh-gradient-midnight text-white' : 'bg-pearl mesh-gradient-pearl text-text'}`}
                    >
                        {/* Decorative Large Background Quote/Number */}
                        <div className={`absolute top-0 ${index % 2 === 0 ? 'right-10 text-white/5' : 'left-10 text-secondary/5'} font-serif text-[200px] leading-none pointer-events-none italic`}>
                            0{feature.id}
                        </div>

                        {/* Image Side with Floating Frame */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className={`w-full md:w-1/2 relative z-10 ${index % 2 !== 0 ? 'md:order-last' : ''}`}
                        >
                            <div className="relative p-4">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-[500px] object-cover rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-[1.02]"
                                />
                                {/* Elegant Corner Accent */}
                                <div className={`absolute top-0 ${index % 2 === 0 ? 'left-0' : 'right-0'} w-12 h-12 border-t-2 border-l-2 border-accent`}></div>
                            </div>
                        </motion.div>

                        {/* Text Side with Glassmorphism */}
                        <div className="w-full md:w-1/2 relative z-10">
                            <div className={`p-8 md:p-12 rounded-2xl backdrop-blur-sm shadow-2xl ${index % 2 === 0 ? 'bg-white/5 border border-white/10' : 'bg-white/50 border border-secondary/5'}`}>
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-4 block"
                                >
                                    {feature.subtitle}
                                </motion.span>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="font-serif text-4xl md:text-6xl mt-2 mb-8 leading-tight"
                                >
                                    {feature.title}
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                    className={`text-lg leading-relaxed mb-10 font-light ${index % 2 === 0 ? 'text-white/70' : 'text-gray-600'}`}
                                >
                                    {feature.description}
                                </motion.p>
                                <Link
                                    to="/about"
                                    className={`inline-flex items-center gap-4 uppercase tracking-[0.3em] text-[10px] font-bold group/link transition-all
                                    ${index % 2 === 0 ? 'text-white hover:text-accent' : 'text-secondary hover:text-primary'}`}
                                >
                                    Read Our Story
                                    <span className="w-10 h-[1px] bg-current transform origin-left group-hover/link:scale-x-150 transition-transform"></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedSection;
