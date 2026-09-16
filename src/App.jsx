import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutUs from './pages/AboutUs';
import PromotionalGallery from './pages/PromotionalGallery';
import AdminDashboard from './pages/Admin/Dashboard';
import Footer from './components/Layout/Footer';
import { GiftingProvider } from './context/GiftingContext';
import { PromotionalProvider } from './context/PromotionalContext';
import { SiteContentProvider, useSiteContent } from './context/SiteContentContext';
import { AuthProvider } from './context/AuthContext';
import WhatsAppButton from './components/Common/WhatsAppButton';
import ScrollToTop from './components/Common/ScrollToTop';
import PromotionalCategoryPage from './pages/PromotionalCategoryPage';

function AppContent() {
    const { contentLoading } = useSiteContent();

    if (contentLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-primary text-lg">Loading...</div>
            </div>
        );
    }

    return (
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
                        <Route path="/promotional" element={<PromotionalGallery />} />
                        <Route path="/gallery" element={<PromotionalGallery />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                    </Routes>
                </main>
                <Footer />
                <WhatsAppButton />
            </div>
        </Router>
    );
}

function App() {
    return (
        <AuthProvider>
            <GiftingProvider>
                <PromotionalProvider>
                    <SiteContentProvider>
                        <AppContent />
                    </SiteContentProvider>
                </PromotionalProvider>
            </GiftingProvider>
        </AuthProvider>
    );
}

export default App;
