import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, ShieldCheck, Truck, Clock } from 'lucide-react';
import { useGifting } from '../context/GiftingContext';

const ProductDetailPage = () => {
    const { productId } = useParams();
    const { categories, loading } = useGifting();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if (!loading && categories) {
            // Search for product in all categories
            let foundProduct = null;
            let foundCategoryId = null;

            Object.keys(categories).forEach(catId => {
                const p = categories[catId].products.find(item => item.id.toString() === productId);
                if (p) {
                    foundProduct = p;
                    foundCategoryId = catId;
                }
            });

            if (foundProduct) {
                setProduct(foundProduct);
                // Get related products from same category (excluding current)
                const related = categories[foundCategoryId].products
                    .filter(p => p.id.toString() !== productId)
                    .slice(0, 4);
                setRelatedProducts(related);
            }
        }
        window.scrollTo(0, 0);
    }, [productId, categories, loading]);

    const handleInquiry = () => {
        navigate('/', { state: { prefillInquiry: `Interested in: ${product.title}` } });
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    if (loading) return <div className="h-screen flex items-center justify-center text-primary">Loading Product...</div>;

    if (!product) return (
        <div className="h-screen flex flex-col items-center justify-center pt-20">
            <h2 className="text-2xl font-serif text-primary mb-4">Product Not Found</h2>
            <Link to="/" className="text-accent hover:underline flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Collections
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-white pt-24 pb-16">
            <div className="container mx-auto px-6">

                {/* Breadcrumbs & Back */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-xs uppercase tracking-widest font-bold"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-16">

                    {/* 1. Left: Product Image */}
                    <div className="lg:w-1/2">
                        <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100 shadow-sm relative group">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                                <span className="text-primary font-bold text-sm tracking-tight">{product.price}</span>
                            </div>
                        </div>
                    </div>

                    {/* 2. Right: Product Details */}
                    <div className="lg:w-1/2 space-y-8">
                        <div>
                            <span className="text-accent uppercase tracking-[0.3em] text-[10px] font-bold mb-3 block">Premium Hamper</span>
                            <h1 className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-4">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100 pb-6">
                                <span className="flex items-center gap-1"><Truck size={14} /> Pan India Delivery</span>
                                <span className="flex items-center gap-1"><ShieldCheck size={14} /> Premium Quality</span>
                            </div>
                        </div>

                        <div className="prose prose-sm text-gray-600 leading-relaxed">
                            <p className="text-lg text-gray-500 italic mb-6">
                                {product.description || "An exquisitely curated hamper designed for elegance and lasting impressions."}
                            </p>
                            <p>
                                Every detail of our {product.title} has been thoughtfully selected to ensure the highest standards of gifting. From the bespoke packaging to the premium contents inside, this hamper is perfect for those who appreciate the finer things.
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-100">
                            <div className="flex gap-3">
                                <Clock size={20} className="text-primary shrink-0" />
                                <div>
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">Standard Delivery</h4>
                                    <p className="text-[11px] text-gray-500">3-5 Business Days</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <ShieldCheck size={20} className="text-primary shrink-0" />
                                <div>
                                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">Fragile Care</h4>
                                    <p className="text-[11px] text-gray-500">Specially packaged for safety</p>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                onClick={handleInquiry}
                                className="flex-grow bg-primary text-white py-4 px-8 uppercase tracking-[0.2em] text-xs font-bold hover:bg-secondary transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/20"
                            >
                                <Send size={18} /> Send Inquiry
                            </button>
                            <a
                                href="tel:+919315697718"
                                className="py-4 px-8 border-2 border-primary text-primary uppercase tracking-[0.2em] text-xs font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3"
                            >
                                <Phone size={18} /> Call Us
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <div className="mt-24">
                        <h3 className="font-serif text-3xl text-primary mb-10 text-center">You May Also Like</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {relatedProducts.map(p => (
                                <Link
                                    key={p.id}
                                    to={`/product/${p.id}`}
                                    className="group block"
                                >
                                    <div className="aspect-square overflow-hidden mb-4 bg-gray-50 border border-gray-100">
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <h4 className="font-serif text-lg text-primary text-center group-hover:text-accent transition-colors">{p.title}</h4>
                                    <p className="text-xs text-center text-gray-500 mt-1">{p.price}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;
