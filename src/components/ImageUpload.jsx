import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';

const ImageUpload = ({ currentImage, onImageUploaded, label = "Upload Image" }) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(currentImage || null);

    const uploadImage = async (event) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
            const filePath = fileName;

            // Upload to Supabase Storage
            const { error: uploadError, data } = await supabase.storage
                .from('product-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: urlData } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);

            const publicUrl = urlData.publicUrl;
            setPreview(publicUrl);
            onImageUploaded(publicUrl);

        } catch (error) {
            alert('Error uploading image: ' + error.message);
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-1">
                {label}
            </label>
            <div className="flex items-center gap-3">
                {/* Preview */}
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded border"
                    />
                )}

                {/* Upload Button */}
                <label className={`flex items-center gap-2 px-4 py-2 border-2 border-dashed rounded cursor-pointer transition-all ${uploading ? 'bg-gray-100 border-gray-300' : 'hover:bg-gray-50 border-gray-400 hover:border-primary'
                    }`}>
                    {uploading ? (
                        <>
                            <Loader className="animate-spin" size={18} />
                            <span className="text-sm text-gray-600">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <Upload size={18} className="text-gray-600" />
                            <span className="text-sm text-gray-600">Choose File</span>
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={uploadImage}
                        disabled={uploading}
                        className="hidden"
                    />
                </label>

                {/* URL Input as fallback */}
                <div className="flex-1">
                    <input
                        type="text"
                        value={preview || ''}
                        onChange={(e) => {
                            setPreview(e.target.value);
                            onImageUploaded(e.target.value);
                        }}
                        placeholder="Or paste image URL"
                        className="w-full border p-2 rounded outline-none focus:border-primary text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;
