import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const GiftingContext = createContext();

export const useGifting = () => useContext(GiftingContext);

export const GiftingProvider = ({ children }) => {
    const [categories, setCategories] = useState({});
    const [testimonials, setTestimonials] = useState([
        {
            id: 'mock-1',
            name: 'Ananya Sharma',
            role: 'Interior Designer',
            content: 'The attention to detail in their packaging is unmatched. Every gift I have ordered has been a masterpiece of elegance and luxury.',
            image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
        },
        {
            id: 'mock-2',
            name: 'Vikram Malhotra',
            role: 'Corporate VP',
            content: 'Wrap n Pack transformed our corporate gifting strategy. Our clients were genuinely impressed with the sophistication of the leather collections.',
            image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
        }
    ]);
    const [loading, setLoading] = useState(true);

    // Fetch all categories and testimonials on mount
    useEffect(() => {
        fetchCategories();
        fetchTestimonials();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);

            console.log('Fetching categories from Supabase...');

            // Fetch categories with their products using a join
            const { data: categoriesData, error } = await supabase
                .from('categories')
                .select(`
          *,
          products (*)
        `)
                .order('id');

            console.log('Supabase response:', { categoriesData, error });

            if (error) throw error;

            // Transform array to object map for easier access
            const categoryMap = {};
            categoriesData.forEach(cat => {
                categoryMap[cat.id] = {
                    ...cat,
                    products: cat.products || []
                };
            });

            console.log('Transformed category map:', categoryMap);
            setCategories(categoryMap);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
            setLoading(false);
        }
    };

    const updateCategory = async (id, field, value) => {
        // Optimistic Update
        setCategories(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));

        try {
            const { error } = await supabase
                .from('categories')
                .update({ [field]: value, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error("Failed to update category:", error);
            fetchCategories(); // Revert on error
        }
    };

    const addProduct = async (categoryId, product) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .insert([
                    {
                        category_id: categoryId,
                        title: product.title,
                        price: product.price,
                        description: product.description || null,
                        image: product.image || null
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            // Optimistic Update with the returned product (includes auto-generated ID)
            setCategories(prev => ({
                ...prev,
                [categoryId]: {
                    ...prev[categoryId],
                    products: [...prev[categoryId].products, data]
                }
            }));
        } catch (error) {
            console.error("Failed to add product:", error);
            fetchCategories();
        }
    };

    const updateProduct = async (categoryId, productId, field, value) => {
        // Optimistic Update
        setCategories(prev => ({
            ...prev,
            [categoryId]: {
                ...prev[categoryId],
                products: prev[categoryId].products.map(p =>
                    p.id === productId ? { ...p, [field]: value } : p
                )
            }
        }));

        try {
            const { error } = await supabase
                .from('products')
                .update({ [field]: value, updated_at: new Date().toISOString() })
                .eq('id', productId);

            if (error) throw error;
        } catch (error) {
            console.error("Failed to update product:", error);
            fetchCategories();
        }
    };

    const deleteProduct = async (categoryId, productId) => {
        // Optimistic Update
        setCategories(prev => ({
            ...prev,
            [categoryId]: {
                ...prev[categoryId],
                products: prev[categoryId].products.filter(p => p.id !== productId)
            }
        }));

        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId);

            if (error) throw error;
        } catch (error) {
            console.error("Failed to delete product:", error);
            fetchCategories();
        }
    };

    const addCategory = async (category) => {
        try {
            // Generate slug-like ID from title if not provided
            const id = category.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            const { data, error } = await supabase
                .from('categories')
                .insert([
                    {
                        id,
                        title: category.title,
                        subtitle: category.subtitle || '',
                        description: category.description || '',
                        banner: category.banner || null
                    }
                ])
                .select()
                .single();

            if (error) throw error;

            // Update local state
            setCategories(prev => ({
                ...prev,
                [data.id]: {
                    ...data,
                    products: []
                }
            }));

            return data.id;
        } catch (error) {
            console.error("Failed to add category:", error);
            fetchCategories();
        }
    };

    const deleteCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category? All products within it will also be deleted.")) return;

        try {
            // First delete products in this category (cascading normally handles this, but being explicit is safer)
            const { error: prodError } = await supabase
                .from('products')
                .delete()
                .eq('category_id', id);

            if (prodError) throw prodError;

            // Then delete the category
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setCategories(prev => {
                const newCats = { ...prev };
                delete newCats[id];
                return newCats;
            });
        } catch (error) {
            console.error("Failed to delete category:", error);
            fetchCategories();
        }
    };

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            if (!data || data.length === 0) {
                // Return some high-quality mock data if the DB is empty
                setTestimonials([
                    {
                        id: 'mock-1',
                        name: 'Ananya Sharma',
                        role: 'Interior Designer',
                        content: 'The attention to detail in their packaging is unmatched. Every gift I have ordered has been a masterpiece of elegance and luxury.',
                        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
                    },
                    {
                        id: 'mock-2',
                        name: 'Vikram Malhotra',
                        role: 'Corporate VP',
                        content: 'Wrap n Pack transformed our corporate gifting strategy. Our clients were genuinely impressed with the sophistication of the leather collections.',
                        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
                    }
                ]);
            } else {
                setTestimonials(data);
            }
        } catch (error) {
            console.error("Failed to fetch testimonials:", error);
            // Fallback to mock data on error too, so the section is visible
            setTestimonials([
                {
                    id: 'mock-1',
                    name: 'Ananya Sharma',
                    role: 'Interior Designer',
                    content: 'The attention to detail in their packaging is unmatched. Every gift I have ordered has been a masterpiece of elegance and luxury.',
                    image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
                },
                {
                    id: 'mock-2',
                    name: 'Vikram Malhotra',
                    role: 'Corporate VP',
                    content: 'Wrap n Pack transformed our corporate gifting strategy. Our clients were genuinely impressed with the sophistication of the leather collections.',
                    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'
                }
            ]);
        }
    };

    const addTestimonial = async (testimonial) => {
        try {
            const { data, error } = await supabase
                .from('testimonials')
                .insert([testimonial])
                .select()
                .single();

            if (error) throw error;
            setTestimonials(prev => [data, ...prev]);
        } catch (error) {
            console.error("Failed to add testimonial:", error);
        }
    };

    const updateTestimonial = async (id, updates) => {
        try {
            const { error } = await supabase
                .from('testimonials')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
        } catch (error) {
            console.error("Failed to update testimonial:", error);
        }
    };

    const deleteTestimonial = async (id) => {
        if (!window.confirm("Delete this testimonial?")) return;
        try {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setTestimonials(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error("Failed to delete testimonial:", error);
        }
    };

    return (
        <GiftingContext.Provider value={{
            categories, testimonials, loading,
            updateCategory, addCategory, deleteCategory,
            addProduct, updateProduct, deleteProduct,
            fetchTestimonials, addTestimonial, updateTestimonial, deleteTestimonial
        }}>
            {children}
        </GiftingContext.Provider>
    );
};
