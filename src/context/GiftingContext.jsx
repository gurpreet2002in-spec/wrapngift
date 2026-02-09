import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const GiftingContext = createContext();

export const useGifting = () => useContext(GiftingContext);

export const GiftingProvider = ({ children }) => {
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch all categories with their products on mount
    useEffect(() => {
        fetchCategories();
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

    return (
        <GiftingContext.Provider value={{ categories, loading, updateCategory, addProduct, updateProduct, deleteProduct }}>
            {children}
        </GiftingContext.Provider>
    );
};
