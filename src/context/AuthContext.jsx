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
        const storedEmail = adminProfile.email;
        const storedPassword = localStorage.getItem('wrapngift_admin_password') || 'admin123';

        if ((email === storedEmail || email === 'admin@wrapngift.com') && password === storedPassword) {
            setIsAuthenticated(true);
            localStorage.setItem('wrapngift_admin_auth', 'true');
            return { success: true };
        }

        // Fallback for local dev
        if (password === storedPassword) {
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

    const updateProfile = (updates) => {
        const newProfile = { ...adminProfile, ...updates };
        setAdminProfile(newProfile);
        localStorage.setItem('wrapngift_admin_profile', JSON.stringify(newProfile));
        return { success: true };
    };

    const updatePassword = (newPassword) => {
        localStorage.setItem('wrapngift_admin_password', newPassword);
        return { success: true };
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, adminProfile, login, logout, updateProfile, updatePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
