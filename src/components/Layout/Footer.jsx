import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-secondary text-white pt-20 pb-10 border-t border-white/5 font-sans">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* 1. Branding Section */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="bg-white p-2 rounded-full shadow-2xl mb-6 w-28 h-28 overflow-hidden border-2 border-white/10 group">
                            <img
                                src="/logo.jpg"
                                alt="Wrap n Pack Logo"
                                className="w-full h-full object-contain rounded-full transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-accent font-serif text-2xl font-bold tracking-widest mb-2 uppercase">WRAP n PACK</h3>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-4 font-bold">Premium Gifting Solutions</p>
                        <p className="text-white/60 text-[13px] leading-relaxed max-w-[260px]">
                            Your trusted partner in creating unforgettable gifting experiences. Bespoke hampers curated with love and elegance.
                        </p>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:pl-8">
                        <h4 className="text-accent font-serif text-lg font-bold mb-8 tracking-wide">Quick Links</h4>
                        <ul className="space-y-4 text-[14px] text-white/70">
                            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
                            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link to="/#collections" className="hover:text-accent transition-colors">Collections</Link></li>
                            <li><Link to="/#contact" className="hover:text-accent transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* 3. Important Links */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-accent font-serif text-lg font-bold mb-8 tracking-wide">Important Links</h4>
                        <ul className="space-y-4 text-[14px] text-white/70">
                            <li><Link to="/category/corporate" className="hover:text-accent transition-colors">Corporate Gifting</Link></li>
                            <li><Link to="/category/wedding" className="hover:text-accent transition-colors">Wedding Hampers</Link></li>
                            <li><Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* 4. Contact Us */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h4 className="text-accent font-serif text-lg font-bold mb-8 tracking-wide">Contact Us</h4>
                        <div className="space-y-5 mb-8">
                            <a href="tel:+919315697718" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                                <Phone size={18} className="text-accent" />
                                <span className="text-[14px]">+91 93156 97718</span>
                            </a>
                            <a href="mailto:gurpreet2002in@gmail.com" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                                <Mail size={18} className="text-accent" />
                                <span className="text-[14px]">gurpreet2002in@gmail.com</span>
                            </a>
                            <div className="flex items-start gap-4 text-white/70 leading-relaxed group">
                                <MapPin size={18} className="text-accent shrink-0 mt-1" />
                                <span className="text-[14px]">Pitampura & Gurgaon, NCR, India</span>
                            </div>
                        </div>

                        {/* Social Icons - Round with subtle border */}
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent hover:text-secondary transition-all">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent hover:text-secondary transition-all">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-accent hover:border-accent hover:text-secondary transition-all">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Line & Copyright */}
                <div className="mt-20 pt-8 border-t border-white/10 text-center">
                    <p className="text-[12px] text-white/30 tracking-[0.1em]">
                        &copy; {new Date().getFullYear()} Wrap n Pack Gifting Solutions. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
