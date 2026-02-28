import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutUs from './pages/AboutUs';
import Gallery from './pages/Gallery';
import AdminDashboard from './pages/Admin/Dashboard';
import Footer from './components/Layout/Footer';
import { GiftingProvider } from './context/GiftingContext';
import { PromotionalProvider } from './context/PromotionalContext';
import { SiteContentProvider } from './context/SiteContentContext';
import WhatsAppButton from './components/Common/WhatsAppButton';
import ScrollToTop from './components/Common/ScrollToTop';
import PromotionalCategoryPage from './pages/PromotionalCategoryPage';

function App() {
    return (
        <GiftingProvider>
            <PromotionalProvider>
                <SiteContentProvider>
                    <Router>
                        <ScrollToTop />
                        <div className="font-sans text-text-main bg-background min-h-screen flex flex-col">
                            <Navbar />
                            <main className="flex-grow">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<AboutUs />} />
                                    <Route path="/category/:categoryId" element={<CategoryPage />} />
                                    <Route path="/promotional/:categoryId" element={<PromotionalCategoryPage />} />
                                    <Route path="/product/:productId" element={<ProductDetailPage />} />
                                    <Route path="/gallery" element={<Gallery />} />
                                    <Route path="/admin" element={<AdminDashboard />} />
                                </Routes>
                            </main>
                            <Footer />
                            <WhatsAppButton />
                        </div>
                    </Router>
                </SiteContentProvider>
            </PromotionalProvider>
        </GiftingProvider>
    );
}

export default App;
