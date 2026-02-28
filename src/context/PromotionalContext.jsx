import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const PromotionalContext = createContext();

export const usePromotional = () => useContext(PromotionalContext);

export const PromotionalProvider = ({ children }) => {
    const [promotionalCategories, setPromotionalCategories] = useState({});
    const [promoLoading, setPromoLoading] = useState(true);

    useEffect(() => {
        fetchPromotionalCategories();
    }, []);

    const fetchPromotionalCategories = async () => {
        try {
            setPromoLoading(true);

            const { data, error } = await supabase
                .from('promotional_categories')
                .select(`
          *,
          promotional_products (*)
        `)
                .order('id');

            if (error) throw error;

            const categoryMap = {};
            data.forEach(cat => {
                categoryMap[cat.id] = {
                    ...cat,
                    products: cat.promotional_products || []
                };
            });

            setPromotionalCategories(categoryMap);
        } catch (error) {
            console.error("Failed to fetch promotional categories:", error);
        } finally {
            setPromoLoading(false);
        }
    };

    const addPromotionalCategory = async (category) => {
        try {
            const id = category.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

            const { data, error } = await supabase
                .from('promotional_categories')
                .insert([{
                    id,
                    title: category.title,
                    subtitle: category.subtitle || '',
                    description: category.description || '',
                    banner: category.banner || null
                }])
                .select()
                .single();

            if (error) throw error;

            setPromotionalCategories(prev => ({
                ...prev,
                [data.id]: {
                    ...data,
                    products: []
                }
            }));

            return data.id;
        } catch (error) {
            console.error("Failed to add promotional category:", error);
            fetchPromotionalCategories();
        }
    };

    const updatePromotionalCategory = async (id, field, value) => {
        setPromotionalCategories(prev => ({
            ...prev,
            [id]: { ...prev[id], [field]: value }
        }));

        try {
            const { error } = await supabase
                .from('promotional_categories')
                .update({ [field]: value, updated_at: new Date().toISOString() })
                .eq('id', id);

            if (error) throw error;
        } catch (error) {
            console.error("Failed to update promotional category:", error);
            fetchPromotionalCategories();
        }
    };

    const deletePromotionalCategory = async (id) => {
        if (!window.confirm("Are you sure you want to delete this promotional category? All products within it will also be deleted.")) return;

        try {
            const { error: prodError } = await supabase
                .from('promotional_products')
                .delete()
                .eq('category_id', id);

            if (prodError) throw prodError;

            const { error } = await supabase
                .from('promotional_categories')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPromotionalCategories(prev => {
                const newCats = { ...prev };
                delete newCats[id];
                return newCats;
            });
        } catch (error) {
            console.error("Failed to delete promotional category:", error);
            fetchPromotionalCategories();
        }
    };

    const addPromotionalProduct = async (categoryId, product) => {
        try {
            const { data, error } = await supabase
                .from('promotional_products')
                .insert([{
                    category_id: categoryId,
                    title: product.title,
                    price: product.price,
                    description: product.description || null,
                    image: product.image || null
                }])
                .select()
                .single();

            if (error) throw error;

            setPromotionalCategories(prev => ({
                ...prev,
                [categoryId]: {
                    ...prev[categoryId],
                    products: [...prev[categoryId].products, data]
                }
            }));
        } catch (error) {
            console.error("Failed to add promotional product:", error);
            fetchPromotionalCategories();
        }
    };

    const updatePromotionalProduct = async (categoryId, productId, field, value) => {
        if (field === 'category_id' && value !== categoryId) {
            const productToMove = promotionalCategories[categoryId].products.find(p => p.id === productId);
            if (!productToMove) return;

            setPromotionalCategories(prev => ({
                ...prev,
                [categoryId]: {
                    ...prev[categoryId],
                    products: prev[categoryId].products.filter(p => p.id !== productId)
                },
                [value]: {
                    ...prev[value],
                    products: [...prev[value].products, { ...productToMove, category_id: value }]
                }
            }));
        } else {
            setPromotionalCategories(prev => ({
                ...prev,
                [categoryId]: {
                    ...prev[categoryId],
                    products: prev[categoryId].products.map(p =>
                        p.id === productId ? { ...p, [field]: value } : p
                    )
                }
            }));
        }

        try {
            const { error } = await supabase
                .from('promotional_products')
                .update({ [field]: value, updated_at: new Date().toISOString() })
                .eq('id', productId);

            if (error) throw error;
        } catch (error) {
            console.error("Failed to update promotional product:", error);
            fetchPromotionalCategories();
        }
    };

    const deletePromotionalProduct = async (categoryId, productId) => {
        setPromotionalCategories(prev => ({
            ...prev,
            [categoryId]: {
                ...prev[categoryId],
                products: prev[categoryId].products.filter(p => p.id !== productId)
            }
        }));

        try {
            const { error } = await supabase
                .from('promotional_products')
                .delete()
                .eq('id', productId);

            if (error) throw error;
        } catch (error) {
            console.error("Failed to delete promotional product:", error);
            fetchPromotionalCategories();
        }
    };

    return (
        <PromotionalContext.Provider value={{
            promotionalCategories, promoLoading,
            fetchPromotionalCategories,
            addPromotionalCategory, updatePromotionalCategory, deletePromotionalCategory,
            addPromotionalProduct, updatePromotionalProduct, deletePromotionalProduct
        }}>
            {children}
        </PromotionalContext.Provider>
    );
};
