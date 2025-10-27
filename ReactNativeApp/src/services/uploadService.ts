import { apiUpload, apiDelete, handleApiError } from './apiClient';
import { AxiosError } from 'axios';
import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

export interface UploadResponse {
  url: string;
  publicId: string;
  type: 'image' | 'video' | 'document';
}

export interface ImagePickerOptions {
  mediaType?: MediaType;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  allowsEditing?: boolean;
  aspect?: [number, number];
}

export interface ImageResizeOptions {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: 'JPEG' | 'PNG' | 'WEBP';
}

// Default image picker options
const DEFAULT_IMAGE_OPTIONS: ImagePickerOptions = {
  mediaType: 'photo',
  quality: 0.8,
  maxWidth: 1920,
  maxHeight: 1920,
  allowsEditing: true,
  aspect: [16, 9],
};

// Default resize options
const DEFAULT_RESIZE_OPTIONS: ImageResizeOptions = {
  maxWidth: 1920,
  maxHeight: 1920,
  quality: 0.8,
  format: 'JPEG',
};

// Validate file size
export const validateFileSize = (fileSize: number, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return fileSize <= maxSizeBytes;
};

// Validate file type
export const validateFileType = (fileName: string, allowedTypes: string[]): boolean => {
  const extension = fileName.split('.').pop()?.toLowerCase();
  return extension ? allowedTypes.includes(extension) : false;
};

// Compress and resize image
export const compressImage = async (
  imageUri: string,
  options: Partial<ImageResizeOptions> = {}
): Promise<string> => {
  try {
    const resizeOptions = { ...DEFAULT_RESIZE_OPTIONS, ...options };
    
    const result = await ImageResizer.createResizedImage(
      imageUri,
      resizeOptions.maxWidth,
      resizeOptions.maxHeight,
      resizeOptions.format,
      resizeOptions.quality,
      0, // rotation
      undefined, // outputPath
      false, // keepMeta
      { mode: 'contain', onlyScaleDown: true }
    );
    
    return result.uri;
  } catch (error) {
    console.error('Image compression error:', error);
    throw new Error('Failed to compress image');
  }
};

// Pick image from gallery
export const pickImageFromGallery = (options: Partial<ImagePickerOptions> = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pickerOptions = { ...DEFAULT_IMAGE_OPTIONS, ...options };
    
    launchImageLibrary(pickerOptions, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        reject(new Error('Image picker cancelled'));
      } else if (response.errorMessage) {
        reject(new Error(response.errorMessage));
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        if (asset.uri) {
          resolve(asset.uri);
        } else {
          reject(new Error('No image selected'));
        }
      } else {
        reject(new Error('No image selected'));
      }
    });
  });
};

// Take photo with camera
export const takePhoto = (options: Partial<ImagePickerOptions> = {}): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pickerOptions = { ...DEFAULT_IMAGE_OPTIONS, ...options };
    
    launchCamera(pickerOptions, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        reject(new Error('Camera cancelled'));
      } else if (response.errorMessage) {
        reject(new Error(response.errorMessage));
      } else if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        if (asset.uri) {
          resolve(asset.uri);
        } else {
          reject(new Error('No image captured'));
        }
      } else {
        reject(new Error('No image captured'));
      }
    });
  });
};

// Upload single image
export const uploadImage = async (
  imageUri: string,
  type: 'profile' | 'cover' | 'portfolio' | 'document' = 'profile',
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  try {
    // Compress image before upload
    const compressedUri = await compressImage(imageUri);
    
    // Create FormData
    const formData = new FormData();
    formData.append('image', {
      uri: compressedUri,
      type: 'image/jpeg',
      name: `image_${Date.now()}.jpg`,
    } as any);
    
    // Upload with progress tracking
    const response = await apiUpload('/upload/image', formData, (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onProgress(progress);
      }
    });
    
    return {
      url: response.data.url,
      publicId: response.data.publicId,
      type: 'image',
    };
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Upload document
export const uploadDocument = async (
  documentUri: string,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> => {
  try {
    // Create FormData
    const formData = new FormData();
    formData.append('document', {
      uri: documentUri,
      type: 'application/pdf',
      name: `document_${Date.now()}.pdf`,
    } as any);
    
    // Upload with progress tracking
    const response = await apiUpload('/upload/document', formData, (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = (progressEvent.loaded / progressEvent.total) * 100;
        onProgress(progress);
      }
    });
    
    return {
      url: response.data.url,
      publicId: response.data.publicId,
      type: 'document',
    };
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Upload multiple images
export const uploadMultipleImages = async (
  imageUris: string[],
  type: 'portfolio' = 'portfolio',
  onProgress?: (progress: number) => void
): Promise<UploadResponse[]> => {
  try {
    const uploadPromises = imageUris.map(async (uri, index) => {
      // Compress each image
      const compressedUri = await compressImage(uri);
      
      // Create FormData for each image
      const formData = new FormData();
      formData.append('image', {
        uri: compressedUri,
        type: 'image/jpeg',
        name: `image_${Date.now()}_${index}.jpg`,
      } as any);
      
      // Upload with progress tracking
      return apiUpload('/upload/image', formData, (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          onProgress(progress);
        }
      });
    });
    
    const responses = await Promise.all(uploadPromises);
    
    return responses.map(response => ({
      url: response.data.url,
      publicId: response.data.publicId,
      type: 'image' as const,
    }));
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Delete uploaded file
export const deleteFile = async (publicId: string): Promise<void> => {
  try {
    await apiDelete('/upload/delete', {
      data: { publicId }
    });
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Batch upload with progress tracking
export const batchUpload = async (
  files: Array<{ uri: string; type: 'image' | 'document' }>,
  onProgress?: (progress: number) => void,
  onFileProgress?: (fileIndex: number, progress: number) => void
): Promise<UploadResponse[]> => {
  try {
    const results: UploadResponse[] = [];
    const totalFiles = files.length;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let uploadResult: UploadResponse;
      
      if (file.type === 'image') {
        uploadResult = await uploadImage(file.uri, 'portfolio', (progress) => {
          onFileProgress?.(i, progress);
        });
      } else {
        uploadResult = await uploadDocument(file.uri, (progress) => {
          onFileProgress?.(i, progress);
        });
      }
      
      results.push(uploadResult);
      
      // Calculate overall progress
      const overallProgress = ((i + 1) / totalFiles) * 100;
      onProgress?.(overallProgress);
    }
    
    return results;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Utility function to get file info
export const getFileInfo = (uri: string): Promise<{ size: number; type: string }> => {
  return new Promise((resolve, reject) => {
    // This would typically use a library like react-native-fs
    // For now, we'll return mock data
    resolve({
      size: 1024 * 1024, // 1MB
      type: 'image/jpeg',
    });
  });
};
