import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Lock, ArrowRight, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const { login, adminProfile, updatePassword } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    // Forgot Password Flow State
    const [view, setView] = useState('login'); // login | forgot_email | forgot_otp | forgot_new_password
    const [resetEmail, setResetEmail] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        // Simulate network request
        setTimeout(() => {
            const res = login(email, password);
            if (!res.success) {
                setError(res.error);
                setLoading(false);
            }
        }, 1000);
    };

    const handleForgotEmailSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (resetEmail !== adminProfile.email && resetEmail !== 'admin@wrapngift.com') {
            setError('Email address not found.');
            return;
        }
        setSuccessMessage('A verification code has been sent to your registered phone number.');
        setView('forgot_otp');
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (otpCode !== '7588900505') {
            setError('Invalid verification code.');
            return;
        }
        setView('forgot_new_password');
    };

    const handleNewPasswordSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (newPass !== confirmPass) {
            setError('Passwords do not match.');
            return;
        }
        if (newPass.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }
        updatePassword(newPass);
        setSuccessMessage('Password updated successfully! You can now log in.');
        setView('login');
        setResetEmail('');
        setOtpCode('');
        setNewPass('');
        setConfirmPass('');
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    return (
        <div className="min-h-screen bg-pearl flex items-center justify-center relative overflow-hidden px-6">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-highlight/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="w-full max-w-md relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-10">
                    <Link to="/" className="inline-block transform hover:scale-105 transition-transform duration-300">
                        <img src="/logo.jpg" alt="Wrap n Pack Logo" className="w-24 h-24 mx-auto rounded-full shadow-xl border-4 border-white mb-6" />
                    </Link>
                    <h1 className="text-4xl font-serif text-primary">Admin Portal</h1>
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mt-3">
                        {view === 'login' ? 'Secure Access' : 'Password Recovery'}
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 sm:p-10 relative overflow-hidden">
                    {/* Decorative header patch */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-highlight to-primary" />

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 flex items-start gap-3 animate-in shake">
                            <XCircle size={18} className="mt-0.5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {successMessage && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm mb-6 flex items-start gap-3 animate-in fade-in">
                            <ShieldCheck size={18} className="mt-0.5 shrink-0" />
                            <p>{successMessage}</p>
                        </div>
                    )}

                    {view === 'login' && (
                        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Email Address</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="admin@wrapngift.com"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => { setView('forgot_email'); setError(''); setSuccessMessage(''); }}
                                        className="text-[10px] text-primary hover:text-primary/70 font-bold tracking-widest uppercase transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full group relative flex justify-center py-4 px-4 border border-transparent text-sm font-bold uppercase tracking-widest rounded-xl text-white bg-primary hover:bg-opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <ShieldCheck size={20} className="text-white/40 group-hover:text-white/60 transition-colors" />
                                </span>
                                {loading ? 'Authenticating...' : 'Sign In securely'}
                                <span className="absolute right-0 inset-y-0 flex items-center pr-3">
                                    <ArrowRight size={20} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/50" />
                                </span>
                            </button>
                        </form>
                    )}

                    {view === 'forgot_email' && (
                        <form onSubmit={handleForgotEmailSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Account Email Address</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={resetEmail}
                                        onChange={e => setResetEmail(e.target.value)}
                                        placeholder="Enter your admin email"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setView('login')} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/30 hover:bg-opacity-90">Send Reset Code</button>
                            </div>
                        </form>
                    )}

                    {view === 'forgot_otp' && (
                        <form onSubmit={handleOtpSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Verification Code</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={otpCode}
                                        onChange={e => setOtpCode(e.target.value)}
                                        placeholder="Enter code sent via SMS/Email"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setView('login')} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/30 hover:bg-opacity-90">Verify Code</button>
                            </div>
                        </form>
                    )}

                    {view === 'forgot_new_password' && (
                        <form onSubmit={handleNewPasswordSubmit} className="space-y-6 animate-in fade-in slide-in-from-right-4">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">New Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={newPass}
                                        onChange={e => setNewPass(e.target.value)}
                                        placeholder="Enter new password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Confirm Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        required
                                        value={confirmPass}
                                        onChange={e => setConfirmPass(e.target.value)}
                                        placeholder="Confirm new password"
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button type="button" onClick={() => setView('login')} className="flex-1 py-4 border border-gray-200 text-gray-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-50">Cancel</button>
                                <button type="submit" className="flex-[2] py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/30 hover:bg-opacity-90">Reset Password</button>
                            </div>
                        </form>
                    )}

                    <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">
                        This is a restricted area. Authorized personnel only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
