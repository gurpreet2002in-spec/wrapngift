import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../Common/ProductCard';

const CategorySection = ({ id, title, subtitle, description, products, background = "bg-pearl", align = "center" }) => {
    return (
        <section id={id} className={`py-24 ${background} mesh-gradient-pearl`}>
            <div className="container mx-auto px-6">

                {/* Section Header - Centered for Elegance */}
                <div className={`mb-16 text-center mx-auto max-w-2xl`}>
                    <span className="text-accent uppercase tracking-[0.2em] text-[10px] font-bold mb-4 block">
                        {subtitle}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl text-primary mb-4 leading-tight">
                        {title}
                    </h2>
                    <p className="text-gray-600 text-lg font-serif italic leading-relaxed">
                        {description}
                    </p>
                    <div className="w-24 h-px bg-accent/30 mx-auto mt-8" />
                </div>

                {/* Products Grid - Clean & Modern */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            categoryId={id}
                        />
                    ))}
                </div>

                {/* Centered View All Button for All Screens */}
                <div className="mt-16 flex justify-center">
                    <Link
                        to={`/category/${id}`}
                        className="group flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-[11px] hover:text-accent transition-all duration-300 bg-white/50 backdrop-blur-sm py-4 px-10 rounded-full border border-primary/10 hover:border-accent/40 shadow-sm hover:shadow-md"
                    >
                        Explore the Entire {title} Collection
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default CategorySection;
