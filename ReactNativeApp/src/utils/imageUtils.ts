import ImageResizer from 'react-native-image-resizer';

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageResizeOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'JPEG' | 'PNG' | 'WEBP';
  rotation?: number;
}

// Default resize options for different use cases
export const RESIZE_OPTIONS = {
  profile: {
    maxWidth: 400,
    maxHeight: 400,
    quality: 0.8,
    format: 'JPEG' as const,
  },
  cover: {
    maxWidth: 1200,
    maxHeight: 600,
    quality: 0.8,
    format: 'JPEG' as const,
  },
  portfolio: {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.9,
    format: 'JPEG' as const,
  },
  thumbnail: {
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.7,
    format: 'JPEG' as const,
  },
  document: {
    maxWidth: 2048,
    maxHeight: 2048,
    quality: 0.9,
    format: 'JPEG' as const,
  },
};

// Get image dimensions
export const getImageDimensions = (uri: string): Promise<ImageDimensions> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve({ width, height });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

// Resize image with specific options
export const resizeImage = async (
  uri: string,
  options: ImageResizeOptions
): Promise<string> => {
  try {
    const result = await ImageResizer.createResizedImage(
      uri,
      options.maxWidth,
      options.maxHeight,
      options.format,
      options.quality,
      options.rotation || 0,
      undefined, // outputPath
      false, // keepMeta
      { mode: 'contain', onlyScaleDown: true }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Image resize error:', error);
    throw new Error('Failed to resize image');
  }
};

// Resize image for specific use case
export const resizeImageForUse = async (
  uri: string,
  useCase: keyof typeof RESIZE_OPTIONS
): Promise<string> => {
  const options = RESIZE_OPTIONS[useCase];
  return resizeImage(uri, options);
};

// Compress image while maintaining quality
export const compressImage = async (
  uri: string,
  maxSizeKB: number = 500
): Promise<string> => {
  try {
    // Start with high quality
    let quality = 0.9;
    let compressedUri = uri;
    
    // Get initial file size
    const initialSize = await getFileSize(uri);
    
    if (initialSize <= maxSizeKB * 1024) {
      return uri; // Already small enough
    }
    
    // Reduce quality until size is acceptable
    while (quality > 0.1 && await getFileSize(compressedUri) > maxSizeKB * 1024) {
      quality -= 0.1;
      compressedUri = await resizeImage(uri, {
        maxWidth: 1920,
        maxHeight: 1920,
        quality,
        format: 'JPEG',
      });
    }
    
    return compressedUri;
  } catch (error) {
    console.error('Image compression error:', error);
    throw new Error('Failed to compress image');
  }
};

// Get file size in bytes
export const getFileSize = async (uri: string): Promise<number> => {
  try {
    // This would typically use react-native-fs
    // For now, return a mock size
    return 1024 * 1024; // 1MB
  } catch (error) {
    console.error('Failed to get file size:', error);
    return 0;
  }
};

// Validate image file
export const validateImageFile = (uri: string, maxSizeMB: number = 5): Promise<{
  isValid: boolean;
  errors: string[];
}> => {
  return new Promise(async (resolve) => {
    const errors: string[] = [];
    
    try {
      // Check file size
      const fileSize = await getFileSize(uri);
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      
      if (fileSize > maxSizeBytes) {
        errors.push(`File size must be less than ${maxSizeMB}MB`);
      }
      
      // Check file extension
      const extension = uri.split('.').pop()?.toLowerCase();
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
      
      if (!extension || !allowedExtensions.includes(extension)) {
        errors.push('File must be a valid image (JPG, PNG, GIF, WebP)');
      }
      
      // Try to get image dimensions to verify it's a valid image
      try {
        await getImageDimensions(uri);
      } catch {
        errors.push('Invalid image file');
      }
      
      resolve({
        isValid: errors.length === 0,
        errors,
      });
    } catch (error) {
      resolve({
        isValid: false,
        errors: ['Failed to validate image file'],
      });
    }
  });
};

// Create thumbnail from image
export const createThumbnail = async (uri: string): Promise<string> => {
  try {
    return await resizeImageForUse(uri, 'thumbnail');
  } catch (error) {
    console.error('Thumbnail creation error:', error);
    throw new Error('Failed to create thumbnail');
  }
};

// Batch resize images
export const batchResizeImages = async (
  uris: string[],
  useCase: keyof typeof RESIZE_OPTIONS
): Promise<string[]> => {
  try {
    const resizePromises = uris.map(uri => resizeImageForUse(uri, useCase));
    return await Promise.all(resizePromises);
  } catch (error) {
    console.error('Batch resize error:', error);
    throw new Error('Failed to resize images');
  }
};

// Generate image hash for caching
export const generateImageHash = (uri: string): string => {
  // Simple hash function for caching
  let hash = 0;
  for (let i = 0; i < uri.length; i++) {
    const char = uri.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

// Check if image needs resizing
export const needsResizing = async (
  uri: string,
  maxWidth: number,
  maxHeight: number
): Promise<boolean> => {
  try {
    const dimensions = await getImageDimensions(uri);
    return dimensions.width > maxWidth || dimensions.height > maxHeight;
  } catch (error) {
    console.error('Failed to check image dimensions:', error);
    return true; // Assume it needs resizing if we can't check
  }
};

// Progressive image loading helper
export const createProgressiveImage = async (
  originalUri: string,
  thumbnailUri: string
): Promise<{
  original: string;
  thumbnail: string;
  hash: string;
}> => {
  try {
    const thumbnail = await createThumbnail(originalUri);
    const hash = generateImageHash(originalUri);
    
    return {
      original: originalUri,
      thumbnail,
      hash,
    };
  } catch (error) {
    console.error('Progressive image creation error:', error);
    throw new Error('Failed to create progressive image');
  }
};
