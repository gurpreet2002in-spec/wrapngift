import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, Send } from 'lucide-react';

const ProductCard = ({ product, categoryId }) => {
    const navigate = useNavigate();

    const handleInquiry = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Redirect to home page contact section with product info in state or query
        navigate('/', { state: { prefillInquiry: `Interested in: ${product.title}` } });

        // Use a timeout to ensure navigation happens first, then scroll to contact
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <div
            className="group cursor-pointer bg-white/80 backdrop-blur-sm border border-white/40 shadow-xl hover:shadow-[0_30px_60px_-15px_rgba(25,55,60,0.15)] transition-all duration-500 flex flex-col h-full rounded-sm"
        >
            {/* Square Image Container with Inner Glow */}
            <div className="relative w-full aspect-square overflow-hidden bg-pearl">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />

                {/* Hover Quick Actions - More Vibrant */}
                <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <button
                        onClick={handleInquiry}
                        className="bg-white text-secondary p-4 rounded-full shadow-2xl hover:bg-primary hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500"
                        title="Send Inquiry"
                    >
                        <Send size={18} />
                    </button>
                    <Link
                        to={`/product/${product.id}`}
                        className="bg-secondary text-white p-4 rounded-full shadow-2xl hover:bg-primary transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 delay-100"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* Product Info with Tighter Typography */}
            <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="font-serif text-lg text-secondary mb-2 leading-tight line-clamp-1 tracking-wide group-hover:text-primary transition-colors">
                    {product.title}
                </h3>
                {product.description && (
                    <p className="text-[11px] text-gray-400 mb-6 line-clamp-2 italic font-light tracking-wide">{product.description}</p>
                )}

                <div className="mt-auto">
                    <p className="text-sm text-accent font-bold mb-6 tracking-widest">{product.price}</p>

                    <div className="grid grid-cols-2 gap-3 pt-6 border-t border-secondary/5">
                        <Link
                            to={`/product/${product.id}`}
                            className="uppercase tracking-[0.2em] text-[9px] font-bold py-3 border border-secondary/10 hover:bg-secondary hover:text-white transition-all duration-300"
                        >
                            Details
                        </Link>
                        <button
                            onClick={handleInquiry}
                            className="bg-secondary text-white uppercase tracking-[0.2em] text-[9px] font-bold py-3 hover:bg-primary transition-all duration-300 shadow-lg shadow-secondary/10"
                        >
                            Enquire
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
