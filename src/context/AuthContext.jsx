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
                    if (passRow && passRow.value) setGlobalPassword(passRow.value);
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

    const login = (email, password) => {
        const storedEmail = adminProfile.email;

        if ((email === storedEmail || email === 'admin@wrapngift.com') && password === globalPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('wrapngift_admin_auth', 'true');
            return { success: true };
        }

        // Fallback for local dev
        if (password === globalPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('wrapngift_admin_auth', 'true');
            return { success: true };
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
            value: newProfile,
            section: 'admin',
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

        return { success: true };
    };

    const updatePassword = async (newPassword) => {
        setGlobalPassword(newPassword);

        await supabase.from('site_content').upsert({
            key: 'admin_password',
            value: newPassword,
            section: 'admin',
            updated_at: new Date().toISOString()
        }, { onConflict: 'key' });

        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, adminProfile, login, logout, updateProfile, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
