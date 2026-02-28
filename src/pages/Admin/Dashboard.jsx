import React, { useState } from 'react';
import { useGifting } from '../../context/GiftingContext';
import { useSiteContent } from '../../context/SiteContentContext';
import {
    Plus, Trash2, Edit2, Save, X, Image as ImageIcon,
    Layout, Gift, Info, Star, BarChart2, Phone, ChevronDown, ChevronUp, CheckCircle, AlertCircle, Loader, User, LogOut
} from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';
import { PromotionalManager } from './PromotionalManager';
import { useAuth } from '../../context/AuthContext';
import AdminLogin from './Login';

// ─── Reusable Field Components ────────────────────────────────────────────────

const FieldLabel = ({ children }) => (
    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">{children}</label>
);

const TextInput = ({ value, onChange, placeholder }) => (
    <input
        type="text"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 p-2.5 rounded-lg focus:border-primary outline-none text-sm transition-colors"
    />
);

const TextArea = ({ value, onChange, placeholder, rows = 3 }) => (
    <textarea
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-gray-200 p-2.5 rounded-lg focus:border-primary outline-none text-sm transition-colors resize-none"
    />
);

const SaveIndicator = ({ status }) => {
    if (!status) return null;
    if (status === 'saving') return <span className="flex items-center gap-1 text-xs text-blue-500"><Loader size={12} className="animate-spin" /> Saving...</span>;
    if (status === 'saved') return <span className="flex items-center gap-1 text-xs text-green-500"><CheckCircle size={12} /> Saved!</span>;
    if (status === 'error') return <span className="flex items-center gap-1 text-xs text-red-500"><AlertCircle size={12} /> Error saving</span>;
    return null;
};

const SectionCard = ({ title, icon: Icon, accent = 'border-primary', children, defaultOpen = true }) => {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-t-4 ${accent} overflow-hidden`}>
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon size={16} />
                    </div>
                    <span className="font-bold text-sm uppercase tracking-widest text-gray-700">{title}</span>
                </div>
                {open ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
            </button>
            {open && <div className="px-6 pb-6 space-y-5 border-t border-gray-50 pt-5">{children}</div>}
        </div>
    );
};

const ContentField = ({ label, contentKey, type = 'text', rows, saveStatus, updateContent, content }) => (
    <div>
        <div className="flex items-center justify-between mb-1">
            <FieldLabel>{label}</FieldLabel>
            <SaveIndicator status={saveStatus[contentKey]} />
        </div>
        {type === 'textarea' ? (
            <TextArea
                value={content[contentKey]}
                onChange={val => updateContent(contentKey, val)}
                rows={rows}
            />
        ) : (
            <TextInput
                value={content[contentKey]}
                onChange={val => updateContent(contentKey, val)}
            />
        )}
    </div>
);

const ContentImageField = ({ label, contentKey, saveStatus, updateContent, content }) => (
    <div>
        <div className="flex items-center justify-between mb-2">
            <FieldLabel>{label}</FieldLabel>
            <SaveIndicator status={saveStatus[contentKey]} />
        </div>
        <ImageUpload
            currentImage={content[contentKey]}
            onImageUploaded={url => updateContent(contentKey, url)}
            label=""
        />
    </div>
);

// ─── Services Editor ──────────────────────────────────────────────────────────

const ICON_OPTIONS = ['Gift', 'Heart', 'Calendar', 'Baby', 'Star', 'Package'];

const ServicesEditor = ({ content, updateContent, saveStatus }) => {
    const cards = Array.isArray(content.services_cards) ? content.services_cards : [];

    const updateCard = (index, field, value) => {
        const updated = cards.map((c, i) => i === index ? { ...c, [field]: value } : c);
        updateContent('services_cards', updated);
    };

    const addCard = () => {
        const updated = [...cards, { id: `service-${Date.now()}`, title: 'New Service', description: '', image: '', icon: 'Gift' }];
        updateContent('services_cards', updated);
    };

    const removeCard = (index) => {
        updateContent('services_cards', cards.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {cards.map((card, i) => (
                <div key={card.id || i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Card {i + 1}</span>
                        <button onClick={() => removeCard(i)} className="text-red-400 hover:text-red-600 p-1 transition-colors">
                            <Trash2 size={14} />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <FieldLabel>Title</FieldLabel>
                            <TextInput value={card.title} onChange={v => updateCard(i, 'title', v)} />
                        </div>
                        <div>
                            <FieldLabel>Icon</FieldLabel>
                            <select
                                value={card.icon || 'Gift'}
                                onChange={e => updateCard(i, 'icon', e.target.value)}
                                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none focus:border-primary"
                            >
                                {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <FieldLabel>Description</FieldLabel>
                        <TextArea value={card.description} onChange={v => updateCard(i, 'description', v)} rows={2} />
                    </div>
                    <div>
                        <FieldLabel>Card Image</FieldLabel>
                        <ImageUpload
                            currentImage={card.image}
                            onImageUploaded={url => updateCard(i, 'image', url)}
                            label=""
                        />
                    </div>
                </div>
            ))}
            <button
                onClick={addCard}
                className="w-full border-2 border-dashed border-primary/30 text-primary py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
                <Plus size={14} /> Add Service Card
            </button>
            <div className="flex justify-end">
                <SaveIndicator status={saveStatus['services_cards']} />
            </div>
        </div>
    );
};

// ─── Values Editor ────────────────────────────────────────────────────────────

const ValuesEditor = ({ content, updateContent, saveStatus, contentKey = 'aboutpage_values' }) => {
    const values = Array.isArray(content[contentKey]) ? content[contentKey] : [];

    const updateValue = (index, field, val) => {
        const updated = values.map((v, i) => i === index ? { ...v, [field]: val } : v);
        updateContent(contentKey, updated);
    };

    const addValue = () => {
        updateContent(contentKey, [...values, { icon: 'Heart', title: 'New Value', desc: '' }]);
    };

    const removeValue = (index) => {
        updateContent(contentKey, values.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-3">
            {values.map((v, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-primary">Value {i + 1}</span>
                        <button onClick={() => removeValue(i)} className="text-red-400 hover:text-red-600 p-1"><Trash2 size={14} /></button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <FieldLabel>Title</FieldLabel>
                            <TextInput value={v.title} onChange={val => updateValue(i, 'title', val)} />
                        </div>
                        <div>
                            <FieldLabel>Icon</FieldLabel>
                            <select
                                value={v.icon || 'Heart'}
                                onChange={e => updateValue(i, 'icon', e.target.value)}
                                className="w-full border border-gray-200 p-2.5 rounded-lg text-sm outline-none focus:border-primary"
                            >
                                {['Heart', 'ShieldCheck', 'Sparkles', 'Star', 'Gift', 'Users'].map(ic => <option key={ic}>{ic}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <FieldLabel>Description</FieldLabel>
                        <TextArea value={v.desc} onChange={val => updateValue(i, 'desc', val)} rows={2} />
                    </div>
                </div>
            ))}
            <button onClick={addValue} className="w-full border-2 border-dashed border-primary/30 text-primary py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                <Plus size={14} /> Add Value
            </button>
            <div className="flex justify-end"><SaveIndicator status={saveStatus[contentKey]} /></div>
        </div>
    );
};

// ─── Stats Editor ─────────────────────────────────────────────────────────────

const StatsEditor = ({ content, updateContent, saveStatus }) => {
    const stats = Array.isArray(content.stats) ? content.stats : [];

    const updateStat = (index, field, val) => {
        const updated = stats.map((s, i) => i === index ? { ...s, [field]: val } : s);
        updateContent('stats', updated);
    };

    const addStat = () => updateContent('stats', [...stats, { number: '0', label: 'New Stat' }]);
    const removeStat = (i) => updateContent('stats', stats.filter((_, idx) => idx !== i));

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {stats.map((s, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stat {i + 1}</span>
                            <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600"><Trash2 size={13} /></button>
                        </div>
                        <div className="space-y-2">
                            <div>
                                <FieldLabel>Number / Value</FieldLabel>
                                <TextInput value={s.number} onChange={v => updateStat(i, 'number', v)} placeholder="e.g. 500+" />
                            </div>
                            <div>
                                <FieldLabel>Label</FieldLabel>
                                <TextInput value={s.label} onChange={v => updateStat(i, 'label', v)} placeholder="e.g. Happy Clients" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={addStat} className="w-full border-2 border-dashed border-primary/30 text-primary py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                <Plus size={14} /> Add Stat
            </button>
            <div className="flex justify-end"><SaveIndicator status={saveStatus['stats']} /></div>
        </div>
    );
};

// ─── Site Content Tab ─────────────────────────────────────────────────────────

const SiteContentTab = () => {
    const { content, updateContent, saveStatus } = useSiteContent();

    const fieldProps = { content, updateContent, saveStatus };

    return (
        <div className="space-y-6">

            {/* ── Hero Section ── */}
            <SectionCard title="Hero Section" icon={Layout} accent="border-t-4 border-purple-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ContentField label="Badge Text" contentKey="hero_badge" {...fieldProps} />
                    <ContentField label="Title Line 1" contentKey="hero_title_line1" {...fieldProps} />
                    <ContentField label="Highlighted Word" contentKey="hero_title_highlight" {...fieldProps} />
                    <ContentField label="Title Line 2" contentKey="hero_title_line2" {...fieldProps} />
                </div>
                <ContentField label="Subtitle / Tagline" contentKey="hero_subtitle" type="textarea" rows={2} {...fieldProps} />
                <div className="grid grid-cols-2 gap-4">
                    <ContentField label="Primary CTA Button" contentKey="hero_cta_primary" {...fieldProps} />
                    <ContentField label="Secondary CTA Button" contentKey="hero_cta_secondary" {...fieldProps} />
                </div>
                <ContentImageField label="Background Image" contentKey="hero_image" {...fieldProps} />
            </SectionCard>

            {/* ── About (Homepage) ── */}
            <SectionCard title="About Section (Homepage)" icon={Info} accent="border-t-4 border-blue-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ContentField label="Section Title" contentKey="about_home_title" {...fieldProps} />
                    <ContentField label="Highlighted Phrase in Title" contentKey="about_home_title_highlight" {...fieldProps} />
                </div>
                <ContentField label="Paragraph 1" contentKey="about_home_para1" type="textarea" rows={3} {...fieldProps} />
                <ContentField label="Paragraph 2" contentKey="about_home_para2" type="textarea" rows={3} {...fieldProps} />
                <div className="grid grid-cols-2 gap-4">
                    <ContentField label="Stat 1 – Number" contentKey="about_home_stat1_number" {...fieldProps} />
                    <ContentField label="Stat 1 – Label" contentKey="about_home_stat1_label" {...fieldProps} />
                    <ContentField label="Stat 2 – Number" contentKey="about_home_stat2_number" {...fieldProps} />
                    <ContentField label="Stat 2 – Label" contentKey="about_home_stat2_label" {...fieldProps} />
                </div>
                <ContentImageField label="About Section Image" contentKey="about_home_image" {...fieldProps} />
            </SectionCard>

            {/* ── Services Section ── */}
            <SectionCard title="Services / Collections Section (Homepage)" icon={Gift} accent="border-t-4 border-green-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ContentField label="Section Title" contentKey="services_section_title" {...fieldProps} />
                    <ContentField label="Section Subtitle" contentKey="services_section_subtitle" {...fieldProps} />
                </div>
                <div className="border-t border-gray-100 pt-5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Service Cards</p>
                    <ServicesEditor {...fieldProps} />
                </div>
            </SectionCard>

            {/* ── About Us Page ── */}
            <SectionCard title="About Us Page" icon={Info} accent="border-t-4 border-amber-500" defaultOpen={false}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ContentField label="Page Hero Badge" contentKey="aboutpage_hero_badge" {...fieldProps} />
                    <ContentField label="Page Hero Title" contentKey="aboutpage_hero_title" {...fieldProps} />
                </div>
                <ContentImageField label="Hero Background Image" contentKey="aboutpage_hero_image" {...fieldProps} />

                <div className="border-t border-gray-100 pt-5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Vision Section</p>
                    <div className="space-y-4">
                        <ContentField label="Vision Title" contentKey="aboutpage_vision_title" {...fieldProps} />
                        <ContentField label="Quote / Italic Text" contentKey="aboutpage_vision_quote" type="textarea" rows={3} {...fieldProps} />
                        <ContentField label="Body Paragraph" contentKey="aboutpage_vision_para" type="textarea" rows={3} {...fieldProps} />
                        <ContentImageField label="Vision Image" contentKey="aboutpage_vision_image" {...fieldProps} />
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-5">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Promise / Values Section</p>
                    <ContentField label="Section Title" contentKey="aboutpage_promise_title" {...fieldProps} />
                    <div className="mt-4">
                        <ValuesEditor {...fieldProps} />
                    </div>
                </div>
            </SectionCard>

            {/* ── Stats ── */}
            <SectionCard title="Stats / Numbers Section" icon={BarChart2} accent="border-t-4 border-rose-500" defaultOpen={false}>
                <StatsEditor {...fieldProps} />
            </SectionCard>

            {/* ── Contact ── */}
            <SectionCard title="Contact Information" icon={Phone} accent="border-t-4 border-teal-500" defaultOpen={false}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ContentField label="WhatsApp Number" contentKey="contact_whatsapp" {...fieldProps} />
                    <ContentField label="Email Address" contentKey="contact_email" {...fieldProps} />
                    <ContentField label="Business Address" contentKey="contact_address" {...fieldProps} />
                </div>
            </SectionCard>
        </div>
    );
};

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────

const AdminDashboard = () => {
    const { isAuthenticated, adminProfile, updateProfile, logout } = useAuth();

    const {
        categories, updateCategory, addCategory, deleteCategory,
        addProduct, updateProduct, deleteProduct,
        testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
        loading
    } = useGifting();

    const [activeTab, setActiveTab] = useState('collections');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    // New Category State
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ title: '', subtitle: '', description: '', banner: '' });

    // New Product State
    const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', image: '' });

    // Profile State
    const [profileForm, setProfileForm] = useState(adminProfile);
    const [profileSaveStatus, setProfileSaveStatus] = useState(false);

    // Testimonial State
    const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
    const [editingTestimonialId, setEditingTestimonialId] = useState(null);
    const [newTestimonial, setNewTestimonial] = useState({ name: '', role: '', content: '', image_url: '' });

    // Auto-select first category if none selected
    React.useEffect(() => {
        if (!selectedCategory && Object.keys(categories).length > 0) {
            setSelectedCategory(Object.keys(categories)[0]);
        }
    }, [categories, selectedCategory]);

    const handleAddCategory = async () => {
        if (!newCategory.title) return;
        const newId = await addCategory(newCategory);
        if (newId) {
            setSelectedCategory(newId);
            setIsAddingCategory(false);
            setNewCategory({ title: '', subtitle: '', description: '', banner: '' });
        }
    };

    const handleDeleteCategory = async () => {
        await deleteCategory(selectedCategory);
        const remainingIds = Object.keys(categories).filter(id => id !== selectedCategory);
        if (remainingIds.length > 0) {
            setSelectedCategory(remainingIds[0]);
        }
    };

    const handleAddProduct = () => {
        if (!newProduct.title || !newProduct.price) return;
        addProduct(selectedCategory, newProduct);
        setNewProduct({ title: '', price: '', description: '', image: '' });
    };

    const handleAddTestimonial = () => {
        if (!newTestimonial.name || !newTestimonial.content) return;
        addTestimonial(newTestimonial);
        setNewTestimonial({ name: '', role: '', content: '', image_url: '' });
        setIsAddingTestimonial(false);
    };

    const startEditingProduct = (product) => {
        setEditingProductId(product.id);
        setEditedProduct({
            id: product.id,
            title: product.title || '',
            price: product.price || '',
            description: product.description || '',
            image: product.image || ''
        });
    };

    const cancelEditingProduct = () => {
        setEditingProductId(null);
        setEditedProduct({});
    };

    const saveProductChanges = () => {
        if (!editedProduct.title || !editedProduct.price) return;
        const original = categories[selectedCategory].products.find(p => p.id === editingProductId);
        if (editedProduct.title !== original.title) updateProduct(selectedCategory, editingProductId, 'title', editedProduct.title);
        if (editedProduct.price !== original.price) updateProduct(selectedCategory, editingProductId, 'price', editedProduct.price);
        if (editedProduct.description !== original.description) updateProduct(selectedCategory, editingProductId, 'description', editedProduct.description);
        if (editedProduct.image !== original.image) updateProduct(selectedCategory, editingProductId, 'image', editedProduct.image);
        if (editedProduct.category_id && editedProduct.category_id !== selectedCategory) {
            updateProduct(selectedCategory, editingProductId, 'category_id', editedProduct.category_id);
            setSelectedCategory(editedProduct.category_id);
        }
        setEditingProductId(null);
        setEditedProduct({});
    };

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    if (loading) {
        return <div className="h-screen flex items-center justify-center text-primary font-serif text-xl">Loading Admin Panel...</div>;
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        setProfileSaveStatus(true);
        updateProfile(profileForm);
        setTimeout(() => setProfileSaveStatus(false), 2000);
    };

    const currentCategory = categories[selectedCategory];

    const TABS = [
        { id: 'collections', label: '📦 Product Collections' },
        { id: 'promotional', label: '🎁 Promotional Gifts' },
        { id: 'testimonials', label: '💬 Testimonials' },
        { id: 'site_content', label: '🎨 Site Content & Images' },
        { id: 'profile', label: '👤 Admin Settings' },
    ];

    return (
        <div className="container mx-auto px-6 py-20">
            <div className="flex items-start gap-4 mb-8 border-b pb-6">
                <div>
                    <h1 className="text-4xl font-serif text-primary">Admin Dashboard</h1>
                    <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest">Manage your entire website from here</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="bg-white p-6 shadow-md h-fit space-y-8 rounded-2xl">
                    {/* Main Tabs */}
                    <div className="space-y-2">
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition-all ${activeTab === tab.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-gray-500 hover:bg-pearl'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Conditional Category List */}
                    {activeTab === 'collections' && (
                        <div className="pt-6 border-t border-pearl">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">Categories</h3>
                                <button
                                    onClick={() => setIsAddingCategory(true)}
                                    className="p-1 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                                    title="Add New Category"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {Object.values(categories).map(cat => (
                                    <li
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); setIsAddingCategory(false); }}
                                        className={`cursor-pointer px-4 py-3 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-pearl text-primary' : 'hover:bg-gray-50 text-gray-700'}`}
                                    >
                                        {cat.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">

                    {/* ── SITE CONTENT TAB ── */}
                    {activeTab === 'site_content' && (
                        <div className="animate-in fade-in duration-500">
                            <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                                <p className="text-xs text-primary font-bold uppercase tracking-widest">
                                    🎨 Site Content Editor — Changes save automatically to Supabase and are reflected live on the website
                                </p>
                            </div>
                            <SiteContentTab />
                        </div>
                    )}

                    {/* ── PROMOTIONAL GIFTS TAB ── */}
                    {activeTab === 'promotional' && (
                        <div className="animate-in fade-in duration-500">
                            <PromotionalManager />
                        </div>
                    )}

                    {/* ── COLLECTIONS TAB ── */}
                    {activeTab === 'collections' && (
                        <>
                            {isAddingCategory ? (
                                <div className="bg-white p-8 shadow-md border-t-4 border-green-500 animate-in fade-in slide-in-from-top-4 duration-500 rounded-2xl">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-serif text-primary">Create New Category</h2>
                                        <button onClick={() => setIsAddingCategory(false)} className="outline-none text-gray-400 hover:text-gray-600"><X size={24} /></button>
                                    </div>
                                    <div className="space-y-6">
                                        <div>
                                            <FieldLabel>Title</FieldLabel>
                                            <input type="text" placeholder="Category Name" value={newCategory.title} onChange={e => setNewCategory({ ...newCategory, title: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" />
                                        </div>
                                        <div>
                                            <FieldLabel>Subtitle</FieldLabel>
                                            <input type="text" placeholder="Elegant Tagline" value={newCategory.subtitle} onChange={e => setNewCategory({ ...newCategory, subtitle: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" />
                                        </div>
                                        <div>
                                            <FieldLabel>Description</FieldLabel>
                                            <textarea placeholder="Describe this collection..." value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" rows="3" />
                                        </div>
                                        <ImageUpload currentImage={newCategory.banner} onImageUploaded={url => setNewCategory({ ...newCategory, banner: url })} label="Category Banner Image" />
                                        <div className="flex justify-end pt-4 gap-4">
                                            <button onClick={() => setIsAddingCategory(false)} className="px-8 py-3 rounded-lg text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-100">Cancel</button>
                                            <button onClick={handleAddCategory} className="bg-primary text-white px-10 py-3 rounded-lg hover:bg-opacity-90 transition-all font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20">Create Collection</button>
                                        </div>
                                    </div>
                                </div>
                            ) : currentCategory ? (
                                <div className="bg-white p-8 shadow-md border-t-4 border-primary rounded-2xl">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-serif text-primary">Edit Category Details</h2>
                                        <button onClick={handleDeleteCategory} className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-widest">
                                            <Trash2 size={16} /> Delete Category
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <FieldLabel>Title</FieldLabel>
                                            <input type="text" value={currentCategory.title} onChange={e => updateCategory(selectedCategory, 'title', e.target.value)} className="w-full border p-2 rounded-lg focus:border-primary outline-none" />
                                        </div>
                                        <div>
                                            <FieldLabel>Subtitle</FieldLabel>
                                            <input type="text" value={currentCategory.subtitle || ''} onChange={e => updateCategory(selectedCategory, 'subtitle', e.target.value)} className="w-full border p-2 rounded-lg focus:border-primary outline-none" />
                                        </div>
                                        <ImageUpload currentImage={currentCategory.banner} onImageUploaded={url => updateCategory(selectedCategory, 'banner', url)} label="Banner Image" />
                                    </div>
                                </div>
                            ) : null}

                            {/* Products */}
                            {currentCategory && !isAddingCategory && (
                                <div className="bg-white p-8 shadow-md rounded-2xl">
                                    <h2 className="text-2xl font-serif text-primary mb-6">Manage Products</h2>
                                    <div className="space-y-3 mb-8">
                                        {currentCategory.products.map(product => (
                                            <div key={product.id} className="border border-gray-100 p-4 rounded-xl hover:shadow-md transition-all">
                                                {editingProductId === product.id ? (
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            <input type="text" value={editedProduct.title} onChange={e => setEditedProduct({ ...editedProduct, title: e.target.value })} className="border p-2 rounded-lg outline-none focus:border-primary" placeholder="Product Name" />
                                                            <input type="text" value={editedProduct.price} onChange={e => setEditedProduct({ ...editedProduct, price: e.target.value })} className="border p-2 rounded-lg outline-none focus:border-primary" placeholder="Price" />
                                                        </div>
                                                        <div>
                                                            <FieldLabel>Category</FieldLabel>
                                                            <select value={editedProduct.category_id || selectedCategory} onChange={e => setEditedProduct({ ...editedProduct, category_id: e.target.value })} className="w-full border p-2 rounded-lg outline-none focus:border-primary text-sm">
                                                                {Object.values(categories).map(cat => <option key={cat.id} value={cat.id}>{cat.title}</option>)}
                                                            </select>
                                                        </div>
                                                        <textarea value={editedProduct.description} onChange={e => setEditedProduct({ ...editedProduct, description: e.target.value })} className="w-full border p-2 rounded-lg outline-none focus:border-primary" placeholder="Product Description" rows="3" />
                                                        <ImageUpload currentImage={editedProduct.image} onImageUploaded={url => setEditedProduct({ ...editedProduct, image: url })} label="Product Image" />
                                                        <div className="flex gap-2 justify-end">
                                                            <button onClick={saveProductChanges} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest"><Save size={14} /> Save</button>
                                                            <button onClick={cancelEditingProduct} className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest"><X size={14} /> Cancel</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <img src={product.image || 'https://via.placeholder.com/100'} alt={product.title} className="w-16 h-16 object-cover rounded-lg shadow" />
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-gray-800 text-sm">{product.title}</h4>
                                                            <p className="text-xs text-primary font-bold">{product.price}</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => startEditingProduct(product)} className="text-blue-500 hover:text-blue-700 p-2 transition-colors"><Edit2 size={16} /></button>
                                                            <button onClick={() => deleteProduct(selectedCategory, product.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors"><Trash2 size={16} /></button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add New Product */}
                                    <div className="bg-pearl p-6 rounded-2xl border-2 border-dashed border-gray-200">
                                        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                            <div>
                                                <h4 className="font-bold text-primary flex items-center gap-2 uppercase tracking-widest text-xs"><Plus size={16} /> Add New Product</h4>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">To collection: <span className="text-primary font-bold">{currentCategory.title}</span></p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input type="text" placeholder="Product Name" className="border p-2 rounded-lg outline-none" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} />
                                            <input type="text" placeholder="Price (e.g. ₹2,500)" className="border p-2 rounded-lg outline-none" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                                        </div>
                                        <textarea placeholder="Product Description (optional)" className="w-full border p-2 rounded-lg outline-none mb-4" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} rows="3" />
                                        <ImageUpload currentImage={newProduct.image} onImageUploaded={url => setNewProduct({ ...newProduct, image: url })} label="Product Image" />
                                        <div className="flex justify-end pt-4">
                                            <button onClick={handleAddProduct} className="bg-primary text-white px-10 py-3 rounded-full hover:bg-opacity-90 transition-all font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">Add Product</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* ── TESTIMONIALS TAB ── */}
                    {activeTab === 'testimonials' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="bg-white p-8 shadow-md border-t-4 border-highlight rounded-2xl">
                                <div className="flex justify-between items-center mb-8">
                                    <h2 className="text-2xl font-serif text-primary">Manage Testimonials</h2>
                                    <button
                                        onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
                                        className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all ${isAddingTestimonial ? 'bg-gray-100 text-gray-500' : 'bg-highlight text-white shadow-lg'}`}
                                    >
                                        {isAddingTestimonial ? <X size={14} /> : <Plus size={14} />} {isAddingTestimonial ? 'Cancel' : 'Add New'}
                                    </button>
                                </div>

                                {isAddingTestimonial && (
                                    <div className="bg-pearl p-6 rounded-2xl mb-8 space-y-6 animate-in slide-in-from-top-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <FieldLabel>Client Name</FieldLabel>
                                                <input type="text" placeholder="e.g. Rahul Sharma" value={newTestimonial.name} onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" />
                                            </div>
                                            <div>
                                                <FieldLabel>Client Role/Location</FieldLabel>
                                                <input type="text" placeholder="e.g. Wedding Planner" value={newTestimonial.role} onChange={e => setNewTestimonial({ ...newTestimonial, role: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <FieldLabel>Testimonial Content</FieldLabel>
                                            <textarea placeholder="What did they say?" value={newTestimonial.content} onChange={e => setNewTestimonial({ ...newTestimonial, content: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" rows="3" />
                                        </div>
                                        <ImageUpload currentImage={newTestimonial.image_url} onImageUploaded={url => setNewTestimonial({ ...newTestimonial, image_url: url })} label="Client Avatar" />
                                        <div className="flex justify-end pt-2">
                                            <button onClick={handleAddTestimonial} className="bg-primary text-white px-10 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg">Save Testimonial</button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {testimonials.map(t => (
                                        <div key={t.id} className="border border-gray-100 p-6 rounded-2xl hover:shadow-lg transition-all bg-white relative group">
                                            <div className="flex gap-6 items-start">
                                                <img src={t.image_url || 'https://via.placeholder.com/80'} className="w-16 h-16 rounded-full object-cover border-2 border-highlight shadow-md" alt={t.name} />
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-bold text-royalty uppercase tracking-widest text-sm">{t.name}</h4>
                                                            <p className="text-[10px] text-highlight font-bold uppercase tracking-widest leading-none">{t.role}</p>
                                                        </div>
                                                        <button onClick={() => deleteTestimonial(t.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors"><Trash2 size={18} /></button>
                                                    </div>
                                                    <p className="text-gray-600 italic font-serif text-sm">"{t.content}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {testimonials.length === 0 && !isAddingTestimonial && (
                                        <div className="text-center py-12 text-gray-400 italic">No testimonials added yet. Share some kind words!</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* ── PROFILE & SETTINGS TAB ── */}
                    {activeTab === 'profile' && (
                        <div className="animate-in fade-in duration-500">
                            <div className="bg-white p-8 shadow-md rounded-2xl border-t-4 border-gray-800">
                                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                                    <h2 className="text-2xl font-serif text-gray-800 flex items-center gap-3">
                                        <User size={24} className="text-primary" /> Admin Settings
                                    </h2>
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-xl font-bold uppercase tracking-widest text-[10px]"
                                    >
                                        <LogOut size={14} /> Sign Out Securely
                                    </button>
                                </div>
                                <div className="max-w-xl">
                                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                                        <div>
                                            <FieldLabel>Display Name</FieldLabel>
                                            <input
                                                type="text"
                                                value={profileForm.name}
                                                onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                                className="w-full border p-3 rounded-lg focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <FieldLabel>Admin Email (Login ID)</FieldLabel>
                                            <input
                                                type="email"
                                                value={profileForm.email}
                                                onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                                                className="w-full border p-3 rounded-lg focus:border-primary outline-none bg-gray-50"
                                            />
                                            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">Used for receiving important alerts</p>
                                        </div>
                                        <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
                                            <button
                                                type="submit"
                                                className="bg-gray-900 text-white px-8 py-3 rounded-xl hover:bg-black transition-all font-bold uppercase tracking-widest text-[10px] shadow-lg flex items-center gap-2"
                                            >
                                                <Save size={14} />
                                                Save Changes
                                            </button>
                                            {profileSaveStatus && <span className="text-green-500 font-bold uppercase tracking-widest text-[10px] flex items-center gap-1"><CheckCircle size={14} /> Saved Successfully!</span>}
                                        </div>
                                    </form>

                                    <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
                                            <ShieldCheck size={14} /> System Information
                                        </h3>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p className="flex justify-between border-b pb-2"><span className="uppercase tracking-widest text-[10px] font-bold">Role:</span> <span className="text-primary font-serif italic">{adminProfile.role}</span></p>
                                            <p className="flex justify-between border-b pb-2"><span className="uppercase tracking-widest text-[10px] font-bold">System Version:</span> <span>v2.1.0 (Promotional Gifts Enabled)</span></p>
                                            <p className="flex justify-between pb-2"><span className="uppercase tracking-widest text-[10px] font-bold">Last Login:</span> <span>Just now</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
