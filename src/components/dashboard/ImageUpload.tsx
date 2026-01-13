import React, { useState } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { uploadImage, deleteImage, STORAGE_BUCKETS, getImageUrl } from '../../lib/storage';

interface ImageUploadProps {
  bucket: keyof typeof STORAGE_BUCKETS;
  currentImageUrl?: string;
  onImageUploaded: (url: string, path: string) => void;
  onImageRemoved?: () => void;
  folder?: string;
  label?: string;
  maxSizeMB?: number;
  acceptedTypes?: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  bucket,
  currentImageUrl,
  onImageUploaded,
  onImageRemoved,
  folder = '',
  label = 'Image',
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      setError(`Invalid file type. Accepted types: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File size exceeds ${maxSizeMB}MB limit`);
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage
      const result = await uploadImage(STORAGE_BUCKETS[bucket], file, folder);

      if (result) {
        setImagePath(result.path);
        onImageUploaded(result.url, result.path);
        setError(null);
      } else {
        setError('Failed to upload image. Please try again.');
        setPreview(currentImageUrl || null);
      }
    } catch (err: any) {
      console.error('Error uploading image:', err);
      const errorMessage = err?.message || 'Error uploading image. Please try again.';
      
      // Provide user-friendly error messages
      let displayError = errorMessage;
      
      if (errorMessage.includes('not found') || errorMessage.includes('Bucket not found')) {
        displayError = `Bucket "${STORAGE_BUCKETS[bucket]}" not found. Please verify it exists in Supabase Dashboard.`;
      } else if (errorMessage.includes('RLS') || errorMessage.includes('row-level security')) {
        displayError = 'Storage policy error. Please check RLS policies in Supabase Dashboard. See STORAGE_SETUP.md for policy setup.';
      } else if (errorMessage.includes('already exists')) {
        displayError = 'A file with this name already exists. Please try uploading again.';
      }
      
      setError(displayError);
      setPreview(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (imagePath) {
      const deleted = await deleteImage(STORAGE_BUCKETS[bucket], imagePath);
      if (deleted) {
        setImagePath(null);
        setPreview(null);
        if (onImageRemoved) {
          onImageRemoved();
        }
      }
    } else if (currentImageUrl) {
      // If it's an existing image, just clear the preview
      setPreview(null);
      if (onImageRemoved) {
        onImageRemoved();
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-2">{label}</label>
      
      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-w-full h-48 object-cover rounded-lg border border-gray-600"
          />
          {!uploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full text-white cursor-pointer"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
          <Upload className="mx-auto mb-2 text-gray-400" size={32} />
          <p className="text-sm text-gray-400 mb-2">Click to upload or drag and drop</p>
          <p className="text-xs text-gray-500">Max size: {maxSizeMB}MB</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <input
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id={`image-upload-${bucket}`}
        />
        <label
          htmlFor={`image-upload-${bucket}`}
          className={`flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm cursor-pointer hover:bg-gray-600 transition-colors ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Uploading...
            </>
          ) : (
            <>
              <Upload size={16} />
              {preview ? 'Change Image' : 'Upload Image'}
            </>
          )}
        </label>
        {preview && !uploading && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRemove}
            className="cursor-pointer"
          >
            <X size={16} className="mr-1" />
            Remove
          </Button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {currentImageUrl && !preview && (
        <p className="text-xs text-gray-500">Current image URL: {currentImageUrl}</p>
      )}
    </div>
  );
};
