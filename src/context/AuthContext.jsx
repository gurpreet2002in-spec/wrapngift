import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [adminProfile, setAdminProfile] = useState({
        name: 'Admin User',
        email: 'admin@wrapngift.com',
        role: 'Super Admin'
    });

    useEffect(() => {
        const authStat = localStorage.getItem('wrapngift_admin_auth');
        if (authStat === 'true') {
            setIsAuthenticated(true);
        }

        const profile = localStorage.getItem('wrapngift_admin_profile');
        if (profile) {
            setAdminProfile(JSON.parse(profile));
        }
    }, []);

    const login = (email, password) => {
        // Simple hardcoded check for demonstration (user can change this later or connect to Supabase)
        if (email === 'admin@wrapngift.com' && password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('wrapngift_admin_auth', 'true');
            return { success: true };
        }
        // Fallback catch-all for local development if they just want to get in
        if (password === 'admin123') {
            setIsAuthenticated(true);
            localStorage.setItem('wrapngift_admin_auth', 'true');
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials. Default: admin@wrapngift.com / admin123' };
    };

    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('wrapngift_admin_auth');
    };

    const updateProfile = (updates) => {
        const newProfile = { ...adminProfile, ...updates };
        setAdminProfile(newProfile);
        localStorage.setItem('wrapngift_admin_profile', JSON.stringify(newProfile));
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, adminProfile, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
