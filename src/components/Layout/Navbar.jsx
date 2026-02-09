import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
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
        { name: 'Corporate', path: '/category/corporate' },
        { name: 'Wedding', path: '/category/wedding' },
        { name: 'Social', path: '/category/social' },
        { name: 'Baby', path: '/category/baby' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 bg-white shadow-sm py-2`}>
            <div className="container mx-auto px-6 flex justify-between items-center relative h-16">

                {/* 1. Left: Overlapping Round Logo */}
                <Link to="/" className="absolute left-6 top-0 z-50 transform translate-y-1">
                    <div className="bg-white p-1 rounded-full shadow-2xl border-2 border-gray-100 transform hover:scale-105 transition-transform duration-300">
                        <img
                            src="/logo.jpg"
                            alt="Wrap n Pack"
                            className="h-20 w-20 md:h-24 md:w-24 object-contain rounded-full"
                        />
                    </div>
                </Link>

                {/* 2. Middle: Navigation Links */}
                <div className="hidden lg:flex flex-grow justify-center space-x-8 items-center pl-32">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-[12px] font-bold tracking-[0.15em] uppercase transition-colors text-secondary hover:text-primary`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* 3. Right: Contact Info & Action Icons */}
                <div className="flex items-center space-x-8 text-secondary">
                    {/* Phone - Hidden on small mobile */}
                    <div className="hidden md:flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <Phone size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 leading-none mb-1">Call Us</span>
                            <span className="text-[11px] font-bold">+91 93156 97718</span>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="hidden xl:flex items-center gap-2 group cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <Mail size={14} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-gray-400 leading-none mb-1">Email</span>
                            <span className="text-[11px] font-bold">gurpreet2002in@gmail.com</span>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden text-secondary" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden bg-white absolute top-full left-0 w-full shadow-lg py-6 flex flex-col items-center space-y-4 border-t border-gray-100">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className="text-secondary hover:text-primary uppercase tracking-widest text-[12px] font-bold"
                            onClick={() => setIsOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-4 flex flex-col items-center gap-3 border-t border-gray-100 w-full">
                        <span className="text-[11px] font-bold text-secondary flex items-center gap-2"><Phone size={14} /> +91-9876543210</span>
                        <span className="text-[11px] font-bold text-secondary flex items-center gap-2"><Mail size={14} /> hello@wrapnpack.com</span>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
