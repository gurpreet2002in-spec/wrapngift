import React, { useState } from 'react';
import { useGifting } from '../../context/GiftingContext';
import { Plus, Trash2, Edit2, Save, X } from 'lucide-react';
import ImageUpload from '../../components/ImageUpload';

const AdminDashboard = () => {
    const { categories, updateCategory, addProduct, updateProduct, deleteProduct, loading } = useGifting();
    const [selectedCategory, setSelectedCategory] = useState("corporate");
    const [editingProductId, setEditingProductId] = useState(null);
    const [editedProduct, setEditedProduct] = useState({});

    // New Product State
    const [newProduct, setNewProduct] = useState({ title: "", price: "", description: "", image: "" });

    const handleAddProduct = () => {
        if (!newProduct.title || !newProduct.price) return;
        addProduct(selectedCategory, newProduct);
        setNewProduct({ title: "", price: "", description: "", image: "" });
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

        // Update each field that changed
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

        setEditingProductId(null);
        setEditedProduct({});
    };

    if (loading) {
        return <div className="h-screen flex items-center justify-center text-primary font-serif text-xl">Loading Admin Panel...</div>;
    }

    if (!categories[selectedCategory]) {
        return <div className="h-screen flex items-center justify-center text-primary font-serif text-xl">Category not found. Please refresh.</div>;
    }

    return (
        <div className="container mx-auto px-6 py-20">
            <h1 className="text-4xl font-serif text-primary mb-8 border-b pb-4">Admin Dashboard</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="bg-white p-6 shadow-md h-fit">
                    <h3 className="font-bold text-lg mb-4 text-primary">Categories</h3>
                    <ul className="space-y-2">
                        {Object.values(categories).map(cat => (
                            <li
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`cursor-pointer px-4 py-2 rounded transition-colors ${selectedCategory === cat.id ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                            >
                                {cat.title}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-8">

                    {/* Category Details Editor */}
                    <div className="bg-white p-8 shadow-md border-t-4 border-primary">
                        <h2 className="text-2xl font-serif text-primary mb-6">Edit Category Details</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Title</label>
                                <input
                                    type="text"
                                    value={categories[selectedCategory].title}
                                    onChange={(e) => updateCategory(selectedCategory, 'title', e.target.value)}
                                    className="w-full border p-2 rounded focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Subtitle</label>
                                <input
                                    type="text"
                                    value={categories[selectedCategory].subtitle}
                                    onChange={(e) => updateCategory(selectedCategory, 'subtitle', e.target.value)}
                                    className="w-full border p-2 rounded focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Description</label>
                                <textarea
                                    value={categories[selectedCategory].description}
                                    onChange={(e) => updateCategory(selectedCategory, 'description', e.target.value)}
                                    className="w-full border p-2 rounded focus:border-primary outline-none"
                                    rows="3"
                                />
                            </div>
                            <ImageUpload
                                currentImage={categories[selectedCategory].banner}
                                onImageUploaded={(url) => updateCategory(selectedCategory, 'banner', url)}
                                label="Banner Image"
                            />
                        </div>
                    </div>

                    {/* Product Manager */}
                    <div className="bg-white p-8 shadow-md">
                        <h2 className="text-2xl font-serif text-primary mb-6">Manage Products</h2>

                        {/* Product List */}
                        <div className="space-y-3 mb-8">
                            {categories[selectedCategory].products.map(product => (
                                <div key={product.id} className="border p-4 rounded hover:shadow-md transition-all">
                                    {editingProductId === product.id ? (
                                        // Edit Mode
                                        <div className="space-y-3">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <input
                                                    type="text"
                                                    value={editedProduct.title}
                                                    onChange={(e) => setEditedProduct({ ...editedProduct, title: e.target.value })}
                                                    className="border p-2 rounded outline-none focus:border-primary"
                                                    placeholder="Product Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={editedProduct.price}
                                                    onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
                                                    className="border p-2 rounded outline-none focus:border-primary"
                                                    placeholder="Price"
                                                />
                                            </div>
                                            <textarea
                                                value={editedProduct.description}
                                                onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
                                                className="w-full border p-2 rounded outline-none focus:border-primary"
                                                placeholder="Product Description"
                                                rows="3"
                                            />
                                            <ImageUpload
                                                currentImage={editedProduct.image}
                                                onImageUploaded={(url) => setEditedProduct({ ...editedProduct, image: url })}
                                                label="Product Image"
                                            />
                                            <div className="flex gap-2 justify-end">
                                                <button
                                                    onClick={saveProductChanges}
                                                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors text-sm"
                                                >
                                                    <Save size={16} /> Save
                                                </button>
                                                <button
                                                    onClick={cancelEditingProduct}
                                                    className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors text-sm"
                                                >
                                                    <X size={16} /> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // View Mode
                                        <div className="flex items-center gap-4">
                                            <img src={product.image || "https://via.placeholder.com/100"} alt={product.title} className="w-16 h-16 object-cover rounded" />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-800">{product.title}</h4>
                                                <p className="text-sm text-gray-500">{product.price}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => startEditingProduct(product)}
                                                    className="text-blue-500 hover:text-blue-700 p-2 transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(selectedCategory, product.id)}
                                                    className="text-red-400 hover:text-red-600 p-2 transition-colors"
                                                    title="Delete Product"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Add New Product Form */}
                        <div className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300">
                            <h4 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <Plus size={18} /> Add New Product
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    className="border p-2 rounded outline-none"
                                    value={newProduct.title}
                                    onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Price (e.g. ₹2,500)"
                                    className="border p-2 rounded outline-none"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                            <textarea
                                placeholder="Product Description (optional)"
                                className="w-full border p-2 rounded outline-none mb-4"
                                value={newProduct.description}
                                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                rows="3"
                            />
                            <ImageUpload
                                currentImage={newProduct.image}
                                onImageUploaded={(url) => setNewProduct({ ...newProduct, image: url })}
                                label="Product Image"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleAddProduct}
                                    className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors uppercase text-sm font-bold tracking-wider"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
