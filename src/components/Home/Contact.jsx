import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';

const Contact = () => {
    const { content } = useSiteContent();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [prefillValue, setPrefillValue] = useState("");

    useEffect(() => {
        if (location.state?.prefillInquiry) {
            setPrefillValue(location.state.prefillInquiry);
        }
    }, [location.state]);

    const formAction = "https://formsubmit.co/ajax/gurpreet2002in@gmail.com";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(formAction, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                setIsSubmitted(true);
                // Reset form state after 5 seconds if desired, or keep success message
            } else {
                throw new Error("Submission failed");
            }
        } catch (error) {
            console.error("Form error:", error);
            alert("Oops! Something went wrong. Please try again or contact us directly via WhatsApp/Phone.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-32 bg-secondary text-white relative overflow-hidden mesh-gradient-midnight">
            {/* Elegant Background Accents - Enhanced Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start">

                    {/* Contact Information Side */}
                    <div className="lg:w-1/3">
                        <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block drop-shadow-md">Get in Touch</span>
                        <h2 className="font-serif text-5xl md:text-7xl mb-12 leading-tight text-white text-glow">We'd Love to <br /> Hear From You</h2>

                        <div className="space-y-12">
                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0 border border-white/10 group-hover:bg-accent group-hover:text-secondary transition-all duration-300">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white/50 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">Call Us</h4>
                                    <p className="text-white text-xl tracking-tight">+91 {content.contact_whatsapp}</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0 border border-white/10 group-hover:bg-accent group-hover:text-secondary transition-all duration-300">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white/50 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">Email Us</h4>
                                    <p className="text-white text-xl tracking-tight">{content.contact_email}</p>
                                </div>
                            </div>

                            <div className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-accent shrink-0 border border-white/10 group-hover:bg-accent group-hover:text-secondary transition-all duration-300">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white/50 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">Our Presence</h4>
                                    <div className="space-y-6">
                                        <p className="text-white/70 text-[13px] leading-relaxed whitespace-pre-line">
                                            {content.contact_address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inquiry Form Side - Glass Panel */}
                    <div className="lg:w-2/3 w-full">
                        <div className="bg-white/5 backdrop-blur-3xl p-8 md:p-16 border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] rounded-2xl min-h-[600px] flex flex-col justify-center relative overflow-hidden">
                            {/* Inner Glass Glow */}
                            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

                            {isSubmitted ? (
                                <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500">
                                    <div className="flex justify-center">
                                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                            <CheckCircle size={48} />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-3xl mb-2">Thank You!</h3>
                                        <p className="text-white/70">Your inquiry has been sent successfully. We will get back to you shortly.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-primary hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                                    >
                                        Send another inquiry
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h3 className="font-serif text-2xl mb-8">Send an Inquiry</h3>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Your Name</label>
                                                <input
                                                    name="name"
                                                    required
                                                    type="text"
                                                    placeholder="Enter your full name"
                                                    className="w-full bg-white/5 border border-white/10 focus:border-primary outline-none px-4 py-3 text-white transition-all text-sm rounded-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Email Address</label>
                                                <input
                                                    name="email"
                                                    required
                                                    type="email"
                                                    placeholder="yourname@example.com"
                                                    className="w-full bg-white/5 border border-white/10 focus:border-primary outline-none px-4 py-3 text-white transition-all text-sm rounded-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Phone Number</label>
                                                <input
                                                    name="phone"
                                                    required
                                                    type="tel"
                                                    placeholder="+91 00000 00000"
                                                    className="w-full bg-white/5 border border-white/10 focus:border-primary outline-none px-4 py-3 text-white transition-all text-sm rounded-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Inquiry Type</label>
                                                <select
                                                    name="type"
                                                    className="w-full bg-white/5 border border-white/10 focus:border-primary outline-none px-4 py-3 text-white transition-all text-sm rounded-sm appearance-none"
                                                >
                                                    <option className="bg-secondary" value="Corporate">Corporate Gifting</option>
                                                    <option className="bg-secondary" value="Wedding">Wedding Hampers</option>
                                                    <option className="bg-secondary" value="Festive">Festive Celebrations</option>
                                                    <option className="bg-secondary" value="Bespoke">Bespoke Customization</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-white/50 mb-2">Message</label>
                                            <textarea
                                                name="message"
                                                rows="4"
                                                required
                                                value={prefillValue}
                                                onChange={(e) => setPrefillValue(e.target.value)}
                                                placeholder="Tell us about your requirements, quantity, and dates..."
                                                className="w-full bg-white/5 border border-white/10 focus:border-primary outline-none px-4 py-4 text-white transition-all text-sm rounded-sm resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            disabled={isSubmitting}
                                            type="submit"
                                            className="w-full bg-primary text-white py-4 px-8 uppercase tracking-[0.2em] text-xs font-bold hover:bg-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 group"
                                        >
                                            {isSubmitting ? "Sending..." : "Submit Inquiry"}
                                            {!isSubmitting && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
