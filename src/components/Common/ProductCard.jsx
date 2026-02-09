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
            className="group cursor-pointer bg-royalty border border-white/5 shadow-2xl hover:shadow-[0_40px_80px_-20px_rgba(25,55,60,0.4)] transition-all duration-700 flex flex-col h-full rounded-[2rem] overflow-hidden relative"
        >
            {/* Elegant Image Container with subtle zoom */}
            <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Decorative Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-royalty/80" />

                {/* Hover Quick Actions */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 bg-royalty/20 backdrop-blur-[2px]">
                    <button
                        onClick={handleInquiry}
                        className="bg-white text-royalty p-4 rounded-full shadow-2xl hover:bg-highlight hover:text-white transition-all transform scale-90 group-hover:scale-100 duration-500"
                        title="Send Inquiry"
                    >
                        <Send size={18} />
                    </button>
                    <Link
                        to={`/product/${product.id}`}
                        className="bg-highlight text-white p-4 rounded-full shadow-2xl hover:bg-white hover:text-royalty transition-all transform scale-90 group-hover:scale-100 duration-500 delay-75"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* Editorial Content Section */}
            <div className="p-8 flex flex-col flex-grow text-center items-center">
                <h3 className="font-serif text-2xl text-white mb-4 leading-tight tracking-wide group-hover:text-highlight transition-colors">
                    {product.title}:
                </h3>

                <div className="space-y-4 mb-8">
                    {product.description ? (
                        <p className="text-pearl/90 text-sm leading-relaxed italic font-serif">
                            {product.description.split(' ').map((word, i) => (
                                <span key={i} className={i % 7 === 0 ? "text-highlight not-italic font-sans font-bold" : ""}>
                                    {word}{' '}
                                </span>
                            ))}
                        </p>
                    ) : (
                        <p className="text-pearl/70 text-xs uppercase tracking-[0.3em] font-bold">
                            Exclusive Collection Item
                        </p>
                    )}
                </div>

                <div className="mt-auto w-full space-y-6">
                    <p className="text-xl text-highlight font-serif font-bold tracking-widest bg-white/5 py-2 inline-block px-6 rounded-full border border-white/10">
                        {product.price}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <Link
                            to={`/product/${product.id}`}
                            className="bg-white text-royalty uppercase tracking-[0.2em] text-[10px] font-bold py-4 px-2 rounded-full hover:bg-highlight hover:text-white transition-all duration-500 shadow-xl shadow-black/20 text-center flex items-center justify-center"
                        >
                            View Details
                        </Link>
                        <button
                            onClick={handleInquiry}
                            className="bg-highlight text-white uppercase tracking-[0.2em] text-[10px] font-bold py-4 px-2 rounded-full hover:bg-white hover:text-royalty transition-all duration-500 shadow-xl shadow-black/20 text-center flex items-center justify-center"
                        >
                            Enquiry
                        </button>
                    </div>
                </div>
            </div>

            {/* Subtle Texture/Grain Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/leather.png')]" />
        </div>
    );
};

export default ProductCard;
