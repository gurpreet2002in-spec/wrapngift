import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';
import { usePromotional } from '../../context/PromotionalContext';
import ImageUpload from '../../components/ImageUpload';

const FieldLabel = ({ children }) => (
    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-1">{children}</label>
);

export const PromotionalManager = () => {
    const {
        promotionalCategories: categories, promoLoading: loading,
        addPromotionalCategory: addCategory, updatePromotionalCategory: updateCategory, deletePromotionalCategory: deleteCategory,
        addPromotionalProduct: addProduct, updatePromotionalProduct: updateProduct, deletePromotionalProduct: deleteProduct
    } = usePromotional();

    const [selectedCategory, setSelectedCategory] = useState('');
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({ title: '', subtitle: '', description: '', banner: '' });
    const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', image: '' });

    useEffect(() => {
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

    const startEditingProduct = (product) => {
        setEditingProductId(product.id);
        setEditedProduct({ ...product });
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

    if (loading) return <div>Loading Promotional Gifts...</div>;
    const currentCategory = categories[selectedCategory];

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar for Categories */}
            <div className="w-full md:w-1/4 bg-white p-6 shadow-md rounded-2xl h-fit">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
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

            {/* Main Content Area */}
            <div className="w-full md:w-3/4 space-y-6">
                {isAddingCategory ? (
                    <div className="bg-white p-8 shadow-md border-t-4 border-purple-500 rounded-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-serif text-primary">Create New Promotional Category</h2>
                            <button onClick={() => setIsAddingCategory(false)} className="outline-none text-gray-400 hover:text-gray-600"><X size={24} /></button>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <FieldLabel>Title</FieldLabel>
                                <input type="text" placeholder="Category Name" value={newCategory.title} onChange={e => setNewCategory({ ...newCategory, title: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" />
                            </div>
                            <div>
                                <FieldLabel>Subtitle</FieldLabel>
                                <input type="text" placeholder="Tagline" value={newCategory.subtitle} onChange={e => setNewCategory({ ...newCategory, subtitle: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" />
                            </div>
                            <div>
                                <FieldLabel>Description</FieldLabel>
                                <textarea placeholder="Describe this collection..." value={newCategory.description} onChange={e => setNewCategory({ ...newCategory, description: e.target.value })} className="w-full border p-3 rounded-lg focus:border-primary outline-none" rows="3" />
                            </div>
                            <ImageUpload currentImage={newCategory.banner} onImageUploaded={url => setNewCategory({ ...newCategory, banner: url })} label="Category Banner Image" />
                            <div className="flex justify-end pt-4 gap-4">
                                <button onClick={() => setIsAddingCategory(false)} className="px-8 py-3 rounded-lg text-gray-500 font-bold uppercase tracking-widest text-xs hover:bg-gray-100">Cancel</button>
                                <button onClick={handleAddCategory} className="bg-primary text-white px-10 py-3 rounded-lg hover:bg-opacity-90 transition-all font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20">Create Category</button>
                            </div>
                        </div>
                    </div>
                ) : currentCategory ? (
                    <>
                        <div className="bg-white p-8 shadow-md border-t-4 border-primary rounded-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-serif text-primary">Edit Promotional Category Details</h2>
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

                        {/* Products Section */}
                        <div className="bg-white p-8 shadow-md rounded-2xl">
                            <h2 className="text-2xl font-serif text-primary mb-6">Manage Promotional Products</h2>
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
                                                <textarea value={editedProduct.description || ''} onChange={e => setEditedProduct({ ...editedProduct, description: e.target.value })} className="w-full border p-2 rounded-lg outline-none focus:border-primary" placeholder="Product Description" rows="3" />
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

                            {/* Add New Product Form */}
                            <div className="bg-pearl p-6 rounded-2xl border-2 border-dashed border-gray-200">
                                <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                                    <div>
                                        <h4 className="font-bold text-primary flex items-center gap-2 uppercase tracking-widest text-xs"><Plus size={16} /> Add New Promotional Product</h4>
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
                    </>
                ) : (
                    <div className="text-center py-20 text-gray-500">Select or create a category to start managing promotional products.</div>
                )}
            </div>
        </div>
    );
};
