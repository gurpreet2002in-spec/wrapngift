import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedSection from '../components/Home/FeaturedSection';
import ProductShowcase from '../components/Home/ProductShowcase';
import TestimonialSection from '../components/Home/TestimonialSection';
import Contact from '../components/Home/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <FeaturedSection />
            <ProductShowcase />
            <TestimonialSection />
            <Contact />
        </main>
    );
};

export default Home;
