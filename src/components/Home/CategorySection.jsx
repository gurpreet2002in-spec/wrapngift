import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../Common/ProductCard';

const CategorySection = ({ id, title, subtitle, description, products, background = "bg-pearl", align = "left" }) => {
    return (
        <section id={id} className={`py-24 ${background} mesh-gradient-pearl`}>
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <div className={`mb-12 ${align === 'center' ? 'text-center' : 'flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6'}`}>
                    <div className={`${align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
                        <span className="text-accent uppercase tracking-[0.2em] text-[10px] font-bold mb-2 block">
                            {subtitle}
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-3">
                            {title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {align !== 'center' && (
                        <div>
                            <Link to={`/category/${id}`} className="hidden md:flex items-center gap-2 text-primary font-semibold uppercase tracking-[0.15em] text-[10px] hover:text-accent transition-colors whitespace-nowrap">
                                View All <ArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Products Grid - Clean & Modern */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            categoryId={id}
                        />
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className={`mt-8 md:hidden flex justify-center`}>
                    <Link to={`/category/${id}`} className="flex items-center gap-2 text-primary font-semibold uppercase tracking-[0.15em] text-[10px] hover:text-accent transition-colors">
                        View All {title} <ArrowRight size={14} />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default CategorySection;
