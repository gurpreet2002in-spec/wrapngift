import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useSiteContent } from "../../context/SiteContentContext";

// Strip all HTML tags — prevents stray buttons/links from subtitle field breaking the layout
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
};

const Hero = () => {
  const { content } = useSiteContent();
  const subtitleText = stripHtml(content.hero_subtitle);

  return (
    <section
      className="relative flex items-center bg-secondary overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero_image}
          alt="Luxury Gift"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Subtle dark overlay — ensures text is readable but shows image */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to right, rgba(var(--color-secondary),0.6) 0%, rgba(var(--color-secondary),0.3) 50%, rgba(var(--color-secondary),0.1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 w-full container mx-auto px-6" style={{ paddingTop: "7rem", paddingBottom: "4rem" }}>
        <div style={{ maxWidth: "600px" }}>

          {/* Badge */}
          <span
            className="inline-block uppercase font-bold mb-6"
            style={{
              color: "rgb(var(--color-accent))",
              fontSize: "10px",
              letterSpacing: "0.4em",
              borderLeft: "4px solid rgb(var(--color-accent))",
              paddingLeft: "1rem",
            }}
          >
            {content.hero_badge}
          </span>

          {/* Title */}
          <h1
            className="font-serif mb-6"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.1,
              color: "#ffffff",
              textShadow: "0 2px 20px rgba(0,0,0,0.5)",
            }}
          >
            {content.hero_title_line1}{" "}
            <span style={{ fontStyle: "italic", color: "rgb(var(--color-accent))" }}>
              {content.hero_title_highlight}
            </span>{" "}
            {content.hero_title_line2}
          </h1>

          {/* Subtitle — plain text only, no HTML */}
          {subtitleText && (
            <p
              className="mb-10 font-light"
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                maxWidth: "520px",
              }}
            >
              {subtitleText}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Link
              to={content.hero_cta_primary_link || "/category/corporate"}
              className="group relative inline-flex items-center gap-3 bg-white text-secondary px-8 py-4 overflow-hidden hover:text-white transition-colors duration-500 uppercase tracking-widest text-xs font-bold shadow-lg"
            >
              <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                <ShoppingBag size={16} />
                {content.hero_cta_primary}
              </span>
            </Link>
            <Link
              to={content.hero_cta_secondary_link || "/about"}
              className="inline-flex items-center gap-2 border text-white px-8 py-4 hover:bg-white hover:text-secondary transition-all uppercase tracking-widest text-xs font-bold backdrop-blur-sm"
              style={{ borderColor: "rgba(255,255,255,0.4)" }}
            >
              {content.hero_cta_secondary}
            </Link>
          </div>
        </div>
      </div>

      {/* Subtle decorative glows */}
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full animate-pulse pointer-events-none" style={{ background: "rgba(var(--color-primary),0.04)", filter: "blur(80px)" }} />
      <div className="absolute top-20 right-40 w-64 h-64 rounded-full pointer-events-none" style={{ background: "rgba(var(--color-accent),0.03)", filter: "blur(60px)" }} />
    </section>
  );
};

export default Hero;


