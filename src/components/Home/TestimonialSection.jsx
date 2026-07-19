import React from "react";
import { useGifting } from "../../context/GiftingContext";

const TestimonialSection = () => {
  const { testimonials } = useGifting();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-pearl relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royalty/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-royalty/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 px-4">
          <span className="text-highlight font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
            Our Partners
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-royalty">
            Trusted By
          </h2>
        </div>

        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {testimonials.map((client, index) => (
            <div 
              key={client.id || index}
              className="w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              title={client.name}
            >
              <img
                src={client.image_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"}
                alt={client.name}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
