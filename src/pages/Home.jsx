import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedSection from '../components/Home/FeaturedSection';
import ProductShowcase from '../components/Home/ProductShowcase';
import Contact from '../components/Home/Contact';

const Home = () => {
    return (
        <main>
            <Hero />
            <FeaturedSection />
            <ProductShowcase />
            <Contact />
        </main>
    );
};

export default Home;
