import { supabase } from '@/integrations/supabase/client';

/**
 * Upload payment screenshot to Supabase Storage
 * @param file - Image file to upload
 * @param bookingId - Booking ID for file naming
 * @returns Public URL of uploaded file
 */
export async function uploadPaymentScreenshot(
  file: File,
  bookingId: string
): Promise<string> {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPG, PNG, or WebP image.');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    throw new Error('File size too large. Maximum size is 5MB.');
  }

  // Generate unique filename
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const fileName = `${bookingId}_${timestamp}.${fileExt}`;
  const filePath = `payment-screenshots/${fileName}`;

  // Upload to Supabase Storage
  const { data, error } = await supabase.storage
    .from('payment-screenshots')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error(`Failed to upload screenshot: ${error.message}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('payment-screenshots')
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Delete payment screenshot from Supabase Storage
 * @param url - Public URL of the file to delete
 */
export async function deletePaymentScreenshot(url: string): Promise<void> {
  try {
    // Extract file path from URL
    const urlParts = url.split('/payment-screenshots/');
    if (urlParts.length < 2) {
      throw new Error('Invalid screenshot URL');
    }
    const filePath = `payment-screenshots/${urlParts[1]}`;

    const { error } = await supabase.storage
      .from('payment-screenshots')
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      throw new Error(`Failed to delete screenshot: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting screenshot:', error);
    // Don't throw - deletion is not critical
  }
}
