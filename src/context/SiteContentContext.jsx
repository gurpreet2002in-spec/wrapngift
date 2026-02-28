import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const SiteContentContext = createContext();

export const useSiteContent = () => useContext(SiteContentContext);

// ─── Default Fallback Content ───────────────────────────────────────────────
// Used when Supabase is unreachable or table not set up yet
const DEFAULTS = {
    // Hero
    hero_badge: 'Premium Gifting Solutions',
    hero_title_line1: 'Curated',
    hero_title_highlight: 'Bespoke',
    hero_title_line2: 'Hampers',
    hero_subtitle: 'Elevate your celebrations with hand-picked elegance. We craft memories, one thoughtfully curated hamper at a time.',
    hero_cta_primary: 'Explore Collections',
    hero_cta_secondary: 'Read Our Story',
    hero_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1920&q=80',

    // About Home
    about_home_title: 'A Legacy of Thoughtful Gifting',
    about_home_title_highlight: 'Thoughtful Gifting',
    about_home_para1: 'Established with a passion for celebrating relationships, Wrap and Pack Gifting creates bespoke experiences that linger in memory long after the occasion has passed.',
    about_home_para2: 'We specialize in crafting memorable moments through creative excellence and meticulous attention to detail. From grand weddings to intimate corporate events, and every milestone in between, we are your trusted partner in expressing gratitude and love.',
    about_home_stat1_number: '5+',
    about_home_stat1_label: 'Years of Experience',
    about_home_stat2_number: '1000+',
    about_home_stat2_label: 'Happy Clients',
    about_home_image: 'https://images.unsplash.com/photo-1512413914633-b5043f4041ea?q=80&w=1000&auto=format&fit=crop',

    // Services
    services_section_title: 'Our Collections',
    services_section_subtitle: 'Discover our range of meticulously crafted gifting solutions designed to make every occasion memorable.',
    services_cards: [
        { id: 'corporate', title: 'Corporate Gifting', description: 'Elevate your business relationships with our bespoke corporate hampers. Perfect for clients, employees, and partners.', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=1000', icon: 'Gift' },
        { id: 'wedding', title: 'Wedding Trousseau', description: 'Add a touch of elegance to your special day with our exquisite wedding favors and trousseau packing.', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1000', icon: 'Heart' },
        { id: 'social', title: 'Festive & Social', description: "Celebrate life's moments with our curated social gifting solutions. From Diwali to housewarmings.", image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&q=80&w=1000', icon: 'Calendar' },
        { id: 'baby', title: 'Baby Announcements', description: 'Welcome the little one with adorable and thoughtful hampers that spread joy and warmth.', image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000', icon: 'Baby' },
    ],

    // About Page
    aboutpage_hero_badge: 'Our Story',
    aboutpage_hero_title: 'Crafting Emotions into Bespoke Gifts',
    aboutpage_hero_image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2070&auto=format&fit=crop',
    aboutpage_vision_title: "More than just a hamper, it's a memory.",
    aboutpage_vision_quote: 'At Wrap n Pack, we believe that the best gifts are those that evoke a feeling. Every ribbon tied and every product selected is done with a single purpose: to make your loved ones feel special.',
    aboutpage_vision_para: 'Born from a passion for aesthetics and a love for celebrations, Wrap n Pack was founded to fill the gap between generic gifts and truly personalized hampers. We source the finest delicacies, the most elegant accessories, and the most durable packaging to ensure that your gift is a masterpiece.',
    aboutpage_vision_image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2040&auto=format&fit=crop',
    aboutpage_promise_title: 'The Wrap n Pack Promise',
    aboutpage_values: [
        { icon: 'Heart', title: 'Curated with Love', desc: 'Every item in our hampers is hand-picked to ensure it meets our high standards of quality and emotion.' },
        { icon: 'ShieldCheck', title: 'Premium Quality', desc: 'We never compromise. From the box material to the finest chocolates, everything is premium.' },
        { icon: 'Sparkles', title: 'Bespoke Design', desc: "Unique layouts tailored to your occasion, whether it's a wedding, corporate event, or a personal milestone." },
    ],

    // Stats
    stats: [
        { number: '500+', label: 'Happy Clients' },
        { number: '2k+', label: 'Hampers Delivered' },
        { number: '15+', label: 'Corporate Partners' },
        { number: '4.9/5', label: 'Average Rating' },
    ],

    // Contact & Social
    contact_whatsapp: '7588900505',
    contact_email: 'wrapnpack@gmail.com',
    contact_address: 'Pune, Maharashtra, India',
    social_instagram: 'https://instagram.com',
    social_facebook: 'https://facebook.com',
    social_linkedin: 'https://linkedin.com',
};

export const SiteContentProvider = ({ children }) => {
    const [content, setContent] = useState(DEFAULTS);
    const [contentLoading, setContentLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState({}); // per-key save status

    const fetchContent = useCallback(async () => {
        try {
            setContentLoading(true);
            const { data, error } = await supabase
                .from('site_content')
                .select('key, value');

            if (error) throw error;

            if (data && data.length > 0) {
                const fetched = {};
                data.forEach(row => {
                    fetched[row.key] = row.value; // value is already parsed JSONB
                });
                setContent(prev => ({ ...prev, ...fetched }));
            }
        } catch (err) {
            console.warn('site_content table not found, using defaults. Run site-content-setup.sql in Supabase.', err.message);
        } finally {
            setContentLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    /**
     * Update a single content key both locally (optimistic) and in Supabase.
     */
    const updateContent = async (key, value) => {
        // Optimistic update
        setContent(prev => ({ ...prev, [key]: value }));
        setSaveStatus(prev => ({ ...prev, [key]: 'saving' }));

        try {
            const { error } = await supabase
                .from('site_content')
                .upsert(
                    {
                        key,
                        value,
                        section: getSection(key),
                        label: DEFAULTS[key] !== undefined ? key : key,
                        updated_at: new Date().toISOString()
                    },
                    { onConflict: 'key' }
                );

            if (error) throw error;
            setSaveStatus(prev => ({ ...prev, [key]: 'saved' }));
            setTimeout(() => setSaveStatus(prev => ({ ...prev, [key]: null })), 2000);
        } catch (err) {
            console.error('Failed to update content key:', key, err);
            setSaveStatus(prev => ({ ...prev, [key]: 'error' }));
            // Revert
            fetchContent();
        }
    };

    /**
     * Batch save multiple keys at once (for complex JSON fields like services_cards)
     */
    const batchUpdateContent = async (updates) => {
        // Optimistic
        setContent(prev => ({ ...prev, ...updates }));

        const rows = Object.entries(updates).map(([key, value]) => ({
            key,
            value,
            section: getSection(key),
            updated_at: new Date().toISOString()
        }));

        try {
            const { error } = await supabase
                .from('site_content')
                .upsert(rows, { onConflict: 'key' });

            if (error) throw error;
        } catch (err) {
            console.error('Batch update failed:', err);
            fetchContent();
        }
    };

    return (
        <SiteContentContext.Provider value={{
            content,
            contentLoading,
            saveStatus,
            updateContent,
            batchUpdateContent,
            refetchContent: fetchContent
        }}>
            {children}
        </SiteContentContext.Provider>
    );
};

// Helper: derive which section a key belongs to
function getSection(key) {
    if (key.startsWith('hero_')) return 'hero';
    if (key.startsWith('about_home_')) return 'about_home';
    if (key.startsWith('services_')) return 'services';
    if (key.startsWith('aboutpage_')) return 'about_page';
    if (key === 'stats') return 'stats';
    if (key.startsWith('contact_') || key.startsWith('social_')) return 'contact';
    return 'general';
}
