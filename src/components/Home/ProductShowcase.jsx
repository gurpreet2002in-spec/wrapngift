import React from 'react';
import CategorySection from './CategorySection';
import { useGifting } from '../../context/GiftingContext';

const ProductShowcase = () => {
    const { categories, loading } = useGifting();

    if (loading) return null; // or a skeleton loader

    if (!categories.corporate) return null;

    return (
        <>
            <CategorySection
                {...categories.corporate}
                background="bg-white"
            />

            <CategorySection
                {...categories.wedding}
                background="bg-background"
            />

            <CategorySection
                {...categories.social}
                background="bg-white"
            />

            <CategorySection
                {...categories.baby}
                background="bg-pink-50/50"
            />
        </>
    );
};

export default ProductShowcase;
