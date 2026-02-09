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
import WhatsAppButton from './components/Common/WhatsAppButton';
import ScrollToTop from './components/Common/ScrollToTop';

function App() {
    return (
        <GiftingProvider>
            <Router>
                <ScrollToTop />
                <div className="font-sans text-text-main bg-background min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/category/:categoryId" element={<CategoryPage />} />
                            <Route path="/product/:productId" element={<ProductDetailPage />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                </div>
            </Router>
        </GiftingProvider>
    );
}

export default App;
