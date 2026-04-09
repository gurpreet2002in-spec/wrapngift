import React, { createContext, useState, useContext, useEffect } from 'react';

import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adminProfile, setAdminProfile] = useState({
        name: 'Admin User',
        email: 'admin@wrapngift.com',
        role: 'Super Admin'
    });
    const [globalPassword, setGlobalPassword] = useState('admin123');

    useEffect(() => {
        const fetchAdminSettings = async () => {
            try {
                const { data, error } = await supabase
                    .from('site_content')
                    .select('key, value')
                    .in('key', ['admin_profile', 'admin_password']);

                if (data && !error) {
                    const profileRow = data.find(d => d.key === 'admin_profile');
                    if (profileRow && profileRow.value) setAdminProfile(profileRow.value);

                    const passRow = data.find(d => d.key === 'admin_password');
                    if (passRow && passRow.value) {
                        let val = passRow.value;
                        if (typeof val === 'string' && val.startsWith('"') && val.endsWith('"')) {
                            val = val.slice(1, -1);
                        }
                        setGlobalPassword(val);
                    }
                }
            } catch (err) {
                console.error("Failed to load admin settings", err);
            } finally {
                setLoading(false);
            }
        };

        const authStat = localStorage.getItem('wrapngift_admin_auth');
        if (authStat === 'true') {
            setIsAuthenticated(true);
        }

        fetchAdminSettings();
    }, []);

    const login = async (email, password) => {
        try {
            // Fetch the very latest credentials from the database to avoid stale local state issues
            const { data, error } = await supabase
                .from('site_content')
                .select('key, value')
                .in('key', ['admin_profile', 'admin_password']);

            let currentPassword = globalPassword;
            let currentEmail = adminProfile.email;

            if (data && !error) {
                const profileRow = data.find(d => d.key === 'admin_profile');
                if (profileRow && profileRow.value && profileRow.value.email) {
                    currentEmail = profileRow.value.email;
                    setAdminProfile(profileRow.value);
                }
                const passRow = data.find(d => d.key === 'admin_password');
                if (passRow && passRow.value) {
                    let val = passRow.value;
                    if (typeof val === 'string' && val.startsWith('"') && val.endsWith('"')) {
                        val = val.slice(1, -1);
                    }
                    currentPassword = val;
                    setGlobalPassword(val);
                }
            }

            const inputEmail = email.trim().toLowerCase();
            const inputPassword = password.trim();

            if ((inputEmail === currentEmail.toLowerCase() || inputEmail === 'admin@wrapngift.com') && inputPassword === currentPassword) {
                setIsAuthenticated(true);
                localStorage.setItem('wrapngift_admin_auth', 'true');
                return { success: true };
            }

            // Fallback for local dev
            if (inputPassword === currentPassword) {
                setIsAuthenticated(true);
                localStorage.setItem('wrapngift_admin_auth', 'true');
                return { success: true };
            }
        } catch (err) {
            console.error("Login verification failed", err);
        }

        return { success: false, error: 'Invalid credentials.' };
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('wrapngift_admin_auth');
    };

    const updateProfile = async (updates) => {
        const newProfile = { ...adminProfile, ...updates };
        setAdminProfile(newProfile);

        await supabase.from('site_content').upsert({
            key: 'admin_profile',
            value: newProfile, // Objects are handled natively by supabase-js for jsonb
            section: 'admin',
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

        return { success: true };
    };

    const updatePassword = async (newPassword) => {
        try {
            setGlobalPassword(newPassword);

            const { error } = await supabase.from('site_content').upsert({
                key: 'admin_password',
                value: newPassword, // Removed JSON.stringify to prevent double-quotes in DB
                section: 'admin',
                updated_at: new Date().toISOString()
            }, { onConflict: 'key' });

            if (error) throw error;
            return { success: true };
        } catch (error) {
            console.error('Failed to update password:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, adminProfile, login, logout, updateProfile, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
