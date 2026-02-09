import React, { useState } from 'react';
import { useGifting } from '../../context/GiftingContext';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';

const AdminDashboard = () => {
    const {
        categories, updateCategory, addCategory, deleteCategory,
        addProduct, updateProduct, deleteProduct,
        testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
        loading
    } = useGifting();

    const [activeTab, setActiveTab] = useState("collections");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    // New Category State
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ title: "", subtitle: "", description: "", banner: "" });

    // New Product State
    const [newProduct, setNewProduct] = useState({ title: "", price: "", description: "", image: "" });

    // Testimonial State
    const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
    const [editingTestimonialId, setEditingTestimonialId] = useState(null);
    const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", content: "", image_url: "" });

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
            setNewCategory({ title: "", subtitle: "", description: "", banner: "" });
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
        setNewProduct({ title: "", price: "", description: "", image: "" });
    };

    const handleAddTestimonial = () => {
        if (!newTestimonial.name || !newTestimonial.content) return;
        addTestimonial(newTestimonial);
        setNewTestimonial({ name: "", role: "", content: "", image_url: "" });
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
        if (editedProduct.title !== original.title) {
            updateProduct(selectedCategory, editingProductId, 'title', editedProduct.title);
        }
        if (editedProduct.price !== original.price) {
            updateProduct(selectedCategory, editingProductId, 'price', editedProduct.price);
        }
        if (editedProduct.description !== original.description) {
            updateProduct(selectedCategory, editingProductId, 'description', editedProduct.description);
        }
        if (editedProduct.image !== original.image) {
            updateProduct(selectedCategory, editingProductId, 'image', editedProduct.image);
        }
        if (editedProduct.category_id && editedProduct.category_id !== selectedCategory) {
            updateProduct(selectedCategory, editingProductId, 'category_id', editedProduct.category_id);
            setSelectedCategory(editedProduct.category_id); // Switch view to new category
        }

        setEditingProductId(null);
        setEditedProduct({});
    };

    if (loading) {
        return <div className="h-screen flex items-center justify-center text-primary font-serif text-xl">Loading Admin Panel...</div>;
    }

    const currentCategory = categories[selectedCategory];

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-serif text-primary mb-8 border-b pb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="bg-white p-6 shadow-md h-fit space-y-8">
                    {/* Main Tabs */}
                    <div className="space-y-4">
                        <button
                            onClick={() => setActiveTab('collections')}
                            className={`w-full text-left px-4 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'collections' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-pearl'}`}
                        >
                            📦 Product Collections
                        </button>
                        <button
                            onClick={() => setActiveTab('testimonials')}
                            className={`w-full text-left px-4 py-3 rounded-lg font-bold uppercase tracking-widest text-xs transition-all ${activeTab === 'testimonials' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-pearl'}`}
                        >
                            💬 Testimonials
                        </button>
                    </div>

                    {/* Conditional Sidebar Content */}
                    {activeTab === 'collections' && (
                        <div className="pt-8 border-t border-pearl">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">Categories</h3>
                                <button
                                    onClick={() => setIsAddingCategory(true)}
                                    className="p-1 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
                                    title="Add New Category"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <ul className="space-y-1">
                                {Object.values(categories).map(cat => (
                                    <li
                                        key={cat.id}
                                        onClick={() => { setSelectedCategory(cat.id); setIsAddingCategory(false); }}
                                        className={`cursor-pointer px-4 py-3 rounded-lg text-[11px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat.id ? 'bg-pearl text-primary' : 'hover:bg-gray-50 text-gray-700'}`}
                                    >
                                        {cat.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {activeTab === 'collections' ? (
                        <>
                            {/* Category Management Forms */}
                            {isAddingCategory ? (
                                <div className="bg-white p-8 shadow-md border-t-4 border-green-500 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-2xl font-serif text-primary">Create New Category</h2>
                                        <button onClick={() => setIsAddingCategory(false)} className="outline-none text-gray-400 hover:text-gray-600">
                                            <X size={24} />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Title</label>
                                            <input
                                                type="text"
                                                placeholder="Category Name"
                                                value={newCategory.title}
                                                onChange={(e) => setNewCategory({ ...newCategory, title: e.target.value })}
                                                className="w-full border p-3 rounded focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Subtitle</label>
                                            <input
                                                type="text"
                                                placeholder="Elegant Tagline"
                                                value={newCategory.subtitle}
                                                onChange={(e) => setNewCategory({ ...newCategory, subtitle: e.target.value })}
                                                className="w-full border p-3 rounded focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Description</label>
                                            <textarea
                                                placeholder="Describe this collection..."
                                                value={newCategory.description}
                                                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                                                className="w-full border p-3 rounded focus:border-primary outline-none"
                                                rows="3"
                                            />
                                        </div>
                                        <ImageUpload
                                            currentImage={newCategory.banner}
                                            onImageUploaded={(url) => setNewCategory({ ...newCategory, banner: url })}
                                            label="Category Banner Image"
                                        />
                                        <div className="flex justify-end pt-4 gap-4">
                                            <button onClick={() => setIsAddingCategory(false)} className="px-8 py-3 rounded text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-100">Cancel</button>
                                            <button onClick={handleAddCategory} className="bg-primary text-white px-10 py-3 rounded hover:bg-opacity-90 transition-all font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20">Create Collection</button>
                                        </div>
                                    </div>
                                </div>
                            ) : currentCategory ? (
                                <div className="bg-white p-8 shadow-md border-t-4 border-primary">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-serif text-primary">Edit Category Details</h2>
                                        <button
                                            onClick={handleDeleteCategory}
                                            className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors text-xs font-bold uppercase tracking-widest"
                                        >
                                            <Trash2 size={16} /> Delete Category
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Title</label>
                                            <input
                                                type="text"
                                                value={currentCategory.title}
                                                onChange={(e) => updateCategory(selectedCategory, 'title', e.target.value)}
                                                className="w-full border p-2 rounded focus:border-primary outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Subtitle</label>
                                            <input
                                                type="text"
                                                value={currentCategory.subtitle || ''}
                                                onChange={(e) => updateCategory(selectedCategory, 'subtitle', e.target.value)}
                                                className="w-full border p-2 rounded focus:border-primary outline-none"
                                            />
                                        </div>
                                        <ImageUpload
                                            currentImage={currentCategory.banner}
                                            onImageUploaded={(url) => updateCategory(selectedCategory, 'banner', url)}
                                            label="Banner Image"
                                        />
                                    </div>
                                </div>
                            ) : null}

                            {/* Product Management Section */}
                            {currentCategory && !isAddingCategory && (
                                <div className="bg-white p-8 shadow-md">
                                    <h2 className="text-2xl font-serif text-primary mb-6">Manage Products</h2>

                                    {/* Product List */}
                                    <div className="space-y-3 mb-8">
                                        {currentCategory.products.map(product => (
                                            <div key={product.id} className="border p-4 rounded hover:shadow-md transition-all">
                                                {editingProductId === product.id ? (
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            <input type="text" value={editedProduct.title} onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })} className="border p-2 rounded outline-none focus:border-primary" placeholder="Product Name" />
                                                            <input type="text" value={editedProduct.price} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} className="border p-2 rounded outline-none focus:border-primary" placeholder="Price" />
                                                        </div>
                                                        <div>
                                                            <label className="block text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-bold">Category</label>
                                                            <select
                                                                value={editedProduct.category_id || selectedCategory}
                                                                onChange={(e) => setEditedProduct({ ...editedProduct, category_id: e.target.value })}
                                                                className="w-full border p-2 rounded outline-none focus:border-primary text-sm"
                                                            >
                                                                {Object.values(categories).map(cat => (
                                                                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <textarea value={editedProduct.description} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} className="w-full border p-2 rounded outline-none focus:border-primary" placeholder="Product Description" rows="3" />
                                                        <ImageUpload currentImage={editedProduct.image} onImageUploaded={(url) => setEditedProduct({ ...editedProduct, image: url })} label="Product Image" />
                                                        <div className="flex gap-2 justify-end">
                                                            <button onClick={saveProductChanges} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-widest text-[10px]"><Save size={14} /> Save Changes</button>
                                                            <button onClick={cancelEditingProduct} className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-widest text-[10px]"><X size={14} /> Cancel</button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-4">
                                                        <img src={product.image || "https://via.placeholder.com/100"} alt={product.title} className="w-16 h-16 object-cover rounded shadow" />
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

                                    {/* Add New Product Form */}
                                    <div className="bg-pearl p-6 rounded-2xl border-2 border-dashed border-gray-200">
                                        <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                            <div>
                                                <h4 className="font-bold text-primary flex items-center gap-2 uppercase tracking-widest text-xs"><Plus size={16} /> Add New Product</h4>
                                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">To collection: <span className="text-primary font-bold">{currentCategory.title}</span></p>
                                            </div>
                                            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                                                Contextual Add
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <input type="text" placeholder="Product Name" className="border p-2 rounded outline-none" value={newProduct.title} onChange={e => setNewProduct({ ...newProduct, title: e.target.value })} />
                                            <input type="text" placeholder="Price (e.g. ₹2,500)" className="border p-2 rounded outline-none" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} />
                                        </div>
                                        <textarea placeholder="Product Description (optional)" className="w-full border p-2 rounded outline-none mb-4" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} rows="3" />
                                        <ImageUpload currentImage={newProduct.image} onImageUploaded={(url) => setNewProduct({ ...newProduct, image: url })} label="Product Image" />
                                        <div className="flex justify-end pt-4">
                                            <button onClick={handleAddProduct} className="bg-primary text-white px-10 py-3 rounded-full hover:bg-opacity-90 transition-all font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20">Add Product</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        /* Testimonial Management */
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="bg-white p-8 shadow-md border-t-4 border-highlight">
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
                                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Client Name</label>
                                                <input type="text" placeholder="e.g. Rahul Sharma" value={newTestimonial.name} onChange={e => setNewTestimonial({ ...newTestimonial, name: e.target.value })} className="w-full border p-3 rounded focus:border-primary outline-none" />
                                            </div>
                                            <div>
                                                <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Client Role/Location</label>
                                                <input type="text" placeholder="e.g. Wedding Planner" value={newTestimonial.role} onChange={e => setNewTestimonial({ ...newTestimonial, role: e.target.value })} className="w-full border p-3 rounded focus:border-primary outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1 font-bold">Testimonial Content</label>
                                            <textarea placeholder="What did they say?" value={newTestimonial.content} onChange={e => setNewTestimonial({ ...newTestimonial, content: e.target.value })} className="w-full border p-3 rounded focus:border-primary outline-none" rows="3" />
                                        </div>
                                        <ImageUpload currentImage={newTestimonial.image_url} onImageUploaded={url => setNewTestimonial({ ...newTestimonial, image_url: url })} label="Client Avatar" />
                                        <div className="flex justify-end pt-2">
                                            <button onClick={handleAddTestimonial} className="bg-primary text-white px-10 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg">Save Testimonial</button>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {testimonials.map(t => (
                                        <div key={t.id} className="border p-6 rounded-2xl hover:shadow-lg transition-all bg-white relative group">
                                            <div className="flex gap-6 items-start">
                                                <img src={t.image_url || "https://via.placeholder.com/80"} className="w-16 h-16 rounded-full object-cover border-2 border-highlight shadow-md" alt={t.name} />
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
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
