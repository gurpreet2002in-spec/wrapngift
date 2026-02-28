import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

const Hero = () => {
    const { content } = useSiteContent();

    return (
        <section
            className="relative h-screen flex items-center bg-secondary overflow-hidden mesh-gradient-midnight"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-40 grayscale-0">
                <img
                    src={content.hero_image}
                    alt="Luxury Gift"
                    className="w-full h-full object-cover scale-110"
                />
            </div>

            {/* Overlay Gradient for focus */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/70 to-transparent z-10" />

            <div className="relative z-20 container mx-auto px-6">
                <div className="max-w-4xl">
                    <span className="inline-block text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 border-l-4 border-accent pl-4 drop-shadow-lg">
                        {content.hero_badge}
                    </span>

                    <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl mb-8 leading-[1.1] text-white text-glow">
                        {content.hero_title_line1} <br />
                        <span className="italic text-accent">{content.hero_title_highlight}</span> {content.hero_title_line2}
                    </h1>

                    <p className="text-pearl/80 text-lg md:text-xl mb-12 leading-relaxed max-w-2xl font-light">
                        {content.hero_subtitle}
                    </p>

                    <div className="flex flex-wrap gap-6">
                        <Link
                            to="/category/corporate"
                            className="group relative inline-flex items-center gap-3 bg-white text-secondary px-10 py-5 overflow-hidden hover:text-white transition-colors duration-500 uppercase tracking-widest text-xs font-bold"
                        >
                            <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                            <span className="relative z-10 flex items-center gap-3">
                                <ShoppingBag size={18} />
                                {content.hero_cta_primary}
                            </span>
                        </Link>
                        <Link
                            to="/about"
                            className="inline-flex items-center gap-2 border border-white/30 text-white px-10 py-5 hover:bg-white hover:text-secondary transition-all uppercase tracking-widest text-xs font-bold backdrop-blur-sm"
                        >
                            {content.hero_cta_secondary}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute top-20 right-40 w-64 h-64 bg-accent/5 rounded-full blur-[80px]"></div>
        </section>
    );
};

export default Hero;
