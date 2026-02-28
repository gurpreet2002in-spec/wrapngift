import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePromotional } from '../context/PromotionalContext';
import ProductCard from '../components/Common/ProductCard';

const PromotionalCategoryPage = () => {
    const { categoryId } = useParams();
    const { promotionalCategories, promoLoading } = usePromotional();

    if (promoLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-primary text-lg">Loading...</div>
            </div>
        );
    }

    const category = promotionalCategories[categoryId];

    if (!category) {
        return (
            <div className="h-screen flex flex-col items-center justify-center">
                <h2 className="text-2xl text-primary mb-4">Promotional Category not found</h2>
                <Link to="/" className="text-accent hover:underline">Return to Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Clean Banner */}
            <div
                className="relative h-80 bg-cover bg-center"
                style={{ backgroundImage: `url(${category.banner})` }}
            >
                <div className="absolute inset-0 bg-primary/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white max-w-2xl px-6">
                        <span className="text-accent uppercase tracking-[0.25em] text-[10px] font-bold mb-3 block">
                            {category.subtitle || "Promotional Gifts"}
                        </span>
                        <h1 className="font-serif text-4xl md:text-6xl mb-4">
                            {category.title}
                        </h1>
                        <p className="text-white/90 text-sm md:text-base">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {category.products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            categoryId={categoryId}
                        />
                    ))}
                    {category.products.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-10">No promotional products added to this category yet.</p>
                    )}
                </div>

                {/* Back Button */}
                <div className="mt-16 text-center border-t border-gray-200 pt-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-primary uppercase tracking-[0.15em] text-xs font-bold hover:text-accent transition-colors">
                        <ArrowLeft size={14} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PromotionalCategoryPage;
