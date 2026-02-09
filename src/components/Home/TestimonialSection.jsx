import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGifting } from '../../context/GiftingContext';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TestimonialSection = () => {
    const { testimonials } = useGifting();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide every 8 seconds
    useEffect(() => {
        if (testimonials.length <= 1) return;
        const timer = setInterval(() => {
            handleNext();
        }, 8000);
        return () => clearInterval(timer);
    }, [currentIndex, testimonials.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    if (!testimonials || testimonials.length === 0) return null;

    const current = testimonials[currentIndex];

    return (
        <section className="py-24 bg-pearl relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-royalty/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-royalty/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16 px-4">
                    <span className="text-highlight font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Kind Words</span>
                    <h2 className="text-4xl md:text-5xl font-serif text-royalty">Client Testimonials</h2>
                </div>

                <div className="max-w-4xl mx-auto relative px-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.05, y: -20 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-royalty/10 flex flex-col items-center text-center relative overflow-hidden group"
                        >
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                            <Quote className="text-royalty/10 absolute top-10 left-10 w-24 h-24 transform -scale-x-100" />

                            <div className="relative mb-8 pt-4">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-highlight ring-8 ring-royalty/5 shadow-xl">
                                    <img
                                        src={current.image_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"}
                                        alt={current.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-royalty text-white p-2 rounded-full shadow-lg">
                                    <Quote size={16} fill="currentColor" />
                                </div>
                            </div>

                            <p className="text-xl md:text-2xl font-serif text-royalty/90 leading-relaxed italic mb-10 max-w-2xl">
                                "{current.content}"
                            </p>

                            <div className="space-y-1">
                                <h4 className="text-lg font-bold text-royalty tracking-widest uppercase">{current.name}</h4>
                                <p className="text-xs text-highlight font-bold tracking-[0.2em] uppercase">{current.role || 'Happy Client'}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    {testimonials.length > 1 && (
                        <div className="flex justify-center gap-6 mt-12">
                            <button
                                onClick={handlePrev}
                                className="w-12 h-12 rounded-full border border-royalty/10 flex items-center justify-center text-royalty hover:bg-royalty hover:text-white transition-all duration-500 shadow-lg hover:shadow-royalty/20"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div className="flex items-center gap-3">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${i === currentIndex ? 'w-8 bg-royalty' : 'w-2 bg-royalty/20 hover:bg-royalty/40'}`}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={handleNext}
                                className="w-12 h-12 rounded-full border border-royalty/10 flex items-center justify-center text-royalty hover:bg-royalty hover:text-white transition-all duration-500 shadow-lg hover:shadow-royalty/20"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
