import React from 'react';
import { motion } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';

const About = () => {
    const { content } = useSiteContent();

    // Highlight by replacing the highlighted phrase in the title
    const renderTitle = () => {
        const title = content.about_home_title || '';
        const highlight = content.about_home_title_highlight || '';
        if (highlight && title.includes(highlight)) {
            const parts = title.split(highlight);
            return (
                <>
                    {parts[0]}
                    <span className="text-primary italic">{highlight}</span>
                    {parts[1]}
                </>
            );
        }
        return title;
    };

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
                                src={content.about_home_image}
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
                            {renderTitle()}
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {content.about_home_para1}
                        </p>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            {content.about_home_para2}
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-serif text-xl text-primary mb-2">{content.about_home_stat1_number}</h4>
                                <p className="text-sm text-gray-500">{content.about_home_stat1_label}</p>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl text-primary mb-2">{content.about_home_stat2_number}</h4>
                                <p className="text-sm text-gray-500">{content.about_home_stat2_label}</p>
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
