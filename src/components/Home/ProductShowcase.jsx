import React from "react";
import CategorySection from "./CategorySection";
import { useGifting } from "../../context/GiftingContext";
import { useSiteContent } from "../../context/SiteContentContext";

const BG_CYCLE = ["bg-white", "bg-background", "bg-white", "bg-pearl", "bg-pink-50/50"];

const ProductShowcase = () => {
  const { categories, loading } = useGifting();
  const { content } = useSiteContent();

  if (loading) return null;

  const featuredIds = Array.isArray(content.home_featured_categories)
    ? content.home_featured_categories
    : [];

  const featuredCategories = featuredIds
    .map((id) => categories[id])
    .filter(Boolean); // skip IDs that don't exist yet

  if (featuredCategories.length === 0) return null;

  return (
    <>
      {featuredCategories.map((cat, index) => (
        <CategorySection
          key={cat.id}
          {...cat}
          background={BG_CYCLE[index % BG_CYCLE.length]}
        />
      ))}
    </>
  );
};

export default ProductShowcase;
