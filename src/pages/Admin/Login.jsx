import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Mail, Lock, ArrowRight, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
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
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 mt-3">Secure Access</p>
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

                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-500">Password</label>
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

                    <p className="mt-8 text-center text-xs text-gray-400 leading-relaxed max-w-[200px] mx-auto">
                        This is a restricted area. Authorized personnel only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
