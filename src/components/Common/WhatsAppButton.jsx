import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
    const phoneNumber = "919315697718";
    const message = encodeURIComponent("Hi Wrap n Pack, I'm interested in your gifting solutions. Could you help me?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-3 overflow-hidden"
            aria-label="Connect on WhatsApp"
        >
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            <MessageCircle size={28} className="relative z-10" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-[120px] transition-all duration-500 relative z-10 font-bold text-sm whitespace-nowrap">
                WhatsApp Us
            </span>
        </a>
    );
};

export default WhatsAppButton;
