import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Calendar, Baby, Star, Package } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

// Map icon string names to actual Lucide components
const ICON_MAP = {
    Gift: <Gift size={40} className="text-primary mb-4" />,
    Heart: <Heart size={40} className="text-primary mb-4" />,
    Calendar: <Calendar size={40} className="text-primary mb-4" />,
    Baby: <Baby size={40} className="text-primary mb-4" />,
    Star: <Star size={40} className="text-primary mb-4" />,
    Package: <Package size={40} className="text-primary mb-4" />,
};

const Services = () => {
    const { content } = useSiteContent();

    const services = Array.isArray(content.services_cards) ? content.services_cards : [];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-4">
                        {content.services_section_title}
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        {content.services_section_subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative overflow-hidden h-64 mb-6">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-sm uppercase tracking-widest border border-white px-4 py-2">View Details</span>
                                </div>
                            </div>
                            <div className="text-center px-4">
                                <div className="flex justify-center">
                                    {ICON_MAP[service.icon] || ICON_MAP['Gift']}
                                </div>
                                <h3 className="font-serif text-xl text-secondary mb-3">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
