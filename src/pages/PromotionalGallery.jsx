import React from 'react';
import { usePromotional } from '../context/PromotionalContext';
import { motion } from 'framer-motion';

const PromotionalGallery = () => {
    const { promotionalCategories } = usePromotional();

    // Flatten all products from all promotional categories into a single gallery array
    const allProducts = Object.values(promotionalCategories || {}).flatMap(cat =>
        (cat.products || []).map(p => ({ ...p, categoryTitle: cat.title }))
    );

    return (
        <div className="pt-32 pb-24 bg-pearl min-h-screen">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-2xl mx-auto">
                    <span className="text-highlight font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-royalty/20 underline-offset-8">Curated Collection</span>
                    <h1 className="text-5xl md:text-6xl font-serif text-royalty mb-6">Promotional Gifts</h1>
                    <p className="text-royalty/60 font-serif italic text-lg leading-relaxed">
                        A definitive collection of quality promotional items and corporate gifts.
                    </p>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {allProducts.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.05 }}
                            className="relative group overflow-hidden rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-700 bg-white"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-1000"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-royalty/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                                <span className="text-highlight text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{item.categoryTitle}</span>
                                <h3 className="text-white font-serif text-xl border-t border-white/20 pt-4">{item.title}</h3>
                            </div>

                            {/* Texture Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
                        </motion.div>
                    ))}
                    {allProducts.length === 0 && (
                        <div className="text-center w-full col-span-full py-20 text-gray-500 italic">No promotional gifts available yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromotionalGallery;
