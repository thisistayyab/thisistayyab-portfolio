import { supabase } from './supabase';

// Storage bucket names
// Note: Only projects and testimonials use image uploads
// Profiles, services, and experiences use library icons (react-icons)
export const STORAGE_BUCKETS = {
  projects: 'project-images',
  testimonials: 'testimonial-images',
  // profiles: 'profile-images', // Uses library icons, not image uploads
  // services: 'service-images', // Uses library icons, not image uploads
  // experiences: 'experience-images', // Uses library icons, not image uploads
} as const;

// Get public URL for an image
export const getImageUrl = (bucket: string, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

// Upload image to Supabase Storage
export const uploadImage = async (
  bucket: string,
  file: File,
  folder: string = '',
  fileName?: string
): Promise<{ path: string; url: string } | null> => {
  try {
    // Generate unique filename if not provided
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const finalFileName = fileName || `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = folder ? `${folder}/${finalFileName}` : finalFileName;

    // Upload file directly - let the error tell us if bucket doesn't exist
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image:', error);
      
      // Provide helpful error messages
      if (error.message.includes('Bucket not found') || error.message.includes('not found')) {
        throw new Error(`Storage bucket "${bucket}" not found. Please verify the bucket exists in Supabase Dashboard.`);
      }
      
      if (error.message.includes('new row violates row-level security policy') || error.message.includes('RLS')) {
        throw new Error('Storage RLS policy error. Please ensure storage policies allow authenticated uploads. See STORAGE_SETUP.md for policy setup.');
      }
      
      if (error.message.includes('The resource already exists')) {
        throw new Error('File with this name already exists. Please try again.');
      }
      
      // Generic error with original message
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const url = getImageUrl(bucket, filePath);

    return { path: filePath, url };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw error; // Re-throw to allow component to handle error
  }
};

// Delete image from Supabase Storage
export const deleteImage = async (bucket: string, path: string): Promise<boolean> => {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Initialize storage buckets (silent check - buckets must be created manually)
// Note: listBuckets() may require admin access, so we skip the check
// Buckets will be validated when upload is attempted
export const initializeStorageBuckets = async () => {
  // Silently initialize - buckets are checked during actual upload
  // This prevents RLS policy errors when checking bucket existence
  console.log('Storage buckets will be validated during upload');
};
