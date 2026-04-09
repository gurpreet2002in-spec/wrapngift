import React from "react";

/**
 * HtmlContent
 * Safely renders an HTML string stored in the database.
 * Falls back gracefully if the value is plain text.
 *
 * Props:
 *  html      – string (may contain HTML tags like <b>, <i>, <ul>, etc.)
 *  className – additional Tailwind classes for the wrapper
 *  tag       – wrapper element (default: 'div')
 */
const HtmlContent = ({ html, className = "", tag: Tag = "div" }) => {
  if (!html) return null;
  return (
    <Tag
      className={`html-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default HtmlContent;
