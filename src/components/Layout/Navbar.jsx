import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, Phone, Mail, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useGifting } from '../../context/GiftingContext';

const Navbar = () => {
    const { categories } = useGifting();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [productMenuOpen, setProductMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Contact Us', path: '/', hash: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-sm py-2`}>
            <div className="container mx-auto px-6 flex justify-between items-center relative h-16">

                {/* Left: Overlapping Round Logo */}
                <Link to="/" className="absolute left-6 top-0 z-50 transform translate-y-1">
                    <div className="bg-white p-1 rounded-full shadow-2xl border-2 border-gray-100 transform hover:scale-105 transition-transform duration-300">
                        <img
                            src="/logo.jpg"
                            alt="Wrap n Pack"
                            className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-full"
                        />
                    </div>
                </Link>

                {/* Middle: Navigation Links */}
                <div className="hidden lg:flex flex-grow justify-center space-x-8 items-center pl-40">
                    <Link to="/" className="text-[12px] font-bold tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">Home</Link>
                    <Link to="/about" className="text-[12px] font-bold tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">About</Link>

                    {/* Products Dropdown */}
                    <div
                        className="relative group"
                        onMouseEnter={() => setProductMenuOpen(true)}
                        onMouseLeave={() => setProductMenuOpen(false)}
                    >
                        <button className="flex items-center gap-1 text-[12px] font-bold tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors outline-none">
                            Products <ChevronDown size={14} className={`transition-transform duration-300 ${productMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div className={`absolute top-full -left-4 w-64 bg-white shadow-2xl border border-gray-50 rounded-xl py-4 transition-all duration-300 origin-top ${productMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                            <div className="absolute top-0 left-8 -translate-y-2 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-50" />
                            {Object.values(categories).map(cat => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.id}`}
                                    className="block px-6 py-3 text-[11px] font-bold uppercase tracking-widest text-secondary hover:bg-pearl hover:text-primary transition-all border-b border-gray-50 last:border-0"
                                >
                                    {cat.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link to="/gallery" className="text-[12px] font-bold tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">Gallery</Link>
                    <a href="/#contact" className="text-[12px] font-bold tracking-[0.15em] uppercase text-secondary hover:text-primary transition-colors">Contact Us</a>
                </div>

                {/* Right: Contact Info & Action Icons */}
                <div className="flex items-center space-x-8 text-secondary">
                    <div className="hidden md:flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <Phone size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 leading-none mb-1">Call Us</span>
                            <span className="text-[11px] font-bold">+91 93156 97718</span>
                        </div>
                    </div>

                    <button className="lg:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white absolute top-full left-0 w-full shadow-lg py-6 flex flex-col items-center space-y-4 border-t border-gray-100 animate-in slide-in-from-top-4 duration-300">
                    <Link to="/" className="text-secondary hover:text-primary uppercase tracking-widest text-[12px] font-bold" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/about" className="text-secondary hover:text-primary uppercase tracking-widest text-[12px] font-bold" onClick={() => setIsOpen(false)}>About</Link>

                    {/* Mobile Products Submenu */}
                    <div className="w-full px-8 pb-2">
                        <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-3 text-center">Collections</span>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.values(categories).map(cat => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.id}`}
                                    className="bg-pearl px-4 py-3 rounded-lg text-center text-[11px] font-bold uppercase tracking-widest text-secondary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {cat.title}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <Link to="/gallery" className="text-secondary hover:text-primary uppercase tracking-widest text-[12px] font-bold" onClick={() => setIsOpen(false)}>Gallery</Link>
                    <a href="/#contact" className="text-secondary hover:text-primary uppercase tracking-widest text-[12px] font-bold" onClick={() => setIsOpen(false)}>Contact Us</a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
