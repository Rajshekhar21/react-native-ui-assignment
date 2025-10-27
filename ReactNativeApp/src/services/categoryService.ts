import { apiGet, apiPost, apiPut, apiDelete, handleApiError } from './apiClient';
import { AxiosError } from 'axios';

export interface Category {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  type: 'room' | 'service' | 'style' | 'feature' | 'design' | 'other';
  isActive: boolean;
  displayOrder: number;
  createdBy: string;
  categoryType: 'platform' | 'vendor';
  isGlobal: boolean;
  vendorId?: string;
  metadata?: {
    seoTitle?: string;
    seoDescription?: string;
    tags?: string[];
  };
}

export interface CategoryStats {
  totalCategories: number;
  activeCategories: number;
  vendorCategories: number;
  platformCategories: number;
}

export interface CategoryDropdown {
  value: string;
  label: string;
  type: string;
}

// Get all categories
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiGet('/categories');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get category by ID
export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const response = await apiGet(`/categories/${id}`);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get category stats
export const getCategoryStats = async (): Promise<CategoryStats> => {
  try {
    const response = await apiGet('/categories/stats');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get categories for dropdown
export const getCategoriesForDropdown = async (): Promise<CategoryDropdown[]> => {
  try {
    const response = await apiGet('/categories/util/dropdown');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get vendor available categories
export const getVendorAvailableCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiGet('/categories/vendor/available');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get vendor selected categories
export const getVendorSelectedCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiGet('/categories/vendor/selected');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Update vendor selected categories
export const updateVendorSelectedCategories = async (categories: string[]): Promise<Category[]> => {
  try {
    const response = await apiPut('/categories/vendor/selected', { categories });
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Create vendor category
export const createVendorCategory = async (formData: FormData): Promise<Category> => {
  try {
    const response = await apiPost('/categories/vendor/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Update vendor category
export const updateVendorCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  try {
    const response = await apiPut(`/categories/vendor/${id}`, data);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Delete vendor category
export const deleteVendorCategory = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/categories/vendor/${id}`);
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Admin: Create category
export const createCategory = async (formData: FormData): Promise<Category> => {
  try {
    const response = await apiPost('/categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Admin: Update category
export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
  try {
    const response = await apiPut(`/categories/${id}`, data);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Admin: Delete category
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await apiDelete(`/categories/${id}`);
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get categories by type
export const getCategoriesByType = async (type: Category['type']): Promise<Category[]> => {
  try {
    const response = await apiGet(`/categories?type=${type}`);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get active categories only
export const getActiveCategories = async (): Promise<Category[]> => {
  try {
    const response = await apiGet('/categories?isActive=true');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Search categories
export const searchCategories = async (query: string): Promise<Category[]> => {
  try {
    const response = await apiGet(`/categories?search=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};
