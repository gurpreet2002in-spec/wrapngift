import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Heart, Calendar, Baby } from 'lucide-react';

const services = [
    {
        id: 'corporate',
        title: 'Corporate Gifting',
        description: 'Elevate your business relationships with our bespoke corporate hampers. Perfect for clients, employees, and partners.',
        icon: <Gift size={40} className="text-primary mb-4" />,
        image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: 'wedding',
        title: 'Wedding Trousseau',
        description: 'Add a touch of elegance to your special day with our exquisite wedding favors and trousseau packing.',
        icon: <Heart size={40} className="text-primary mb-4" />,
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: 'social',
        title: 'Festive & Social',
        description: 'Celebrate life’s moments with our curated social gifting solutions. From Diwali to housewarmings.',
        icon: <Calendar size={40} className="text-primary mb-4" />,
        image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1000',
    },
    {
        id: 'baby',
        title: 'Baby Announcements',
        description: 'Welcome the little one with adorable and thoughtful hampers that spread joy and warmth.',
        icon: <Baby size={40} className="text-primary mb-4" />,
        image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000',
    },
];

const Services = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-4">Our Collections</h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Discover our range of meticulously crafted gifting solutions designed to make every occasion memorable.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
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
                                <div className="flex justify-center">{service.icon}</div>
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
