import { apiPost, apiGet, apiPut, apiPatch, apiDelete, handleApiError } from './apiClient';
import { AxiosError } from 'axios';

export interface VendorProfile {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  rating: number;
  reviewCount: number;
  license: string;
  about: string;
  credentials: string[];
  location: {
    pincode: string;
    city: string;
    state: string;
    geo?: {
      type: 'Point';
      coordinates: [number, number];
    };
  };
  categories: string[];
  style: string;
  projectTypes: string[];
  styles: string[];
  businessHighlights: string[];
  languages: string[];
  budgetLevel: 'Low' | 'Medium' | 'High';
  images: {
    profileImage?: string;
    coverImage?: string;
  };
  portfolioData: Array<{
    projectName: string;
    projectImages: string[];
    projectDescription: string;
    projectType: string;
    projectLocation: string;
  }>;
  role: 'vendor';
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  isVerified: boolean;
  isJoinCompleted: boolean;
  rejectionReason?: string;
}

export interface VendorRegistrationData {
  name: string;
  title: string;
  about: string;
  license: string;
  categories: string[];
  projectTypes: string[];
  styles: string[];
  languages: string[];
  businessHighlights: string[];
  profileImage?: File;
  coverImage?: File;
  portfolio?: File[];
  documentImage?: File;
}

export interface VendorDashboard {
  stats: {
    totalViews: number;
    totalInquiries: number;
    totalProjects: number;
    rating: number;
  };
  recentActivities: Array<{
    id: string;
    type: string;
    description: string;
    date: string;
  }>;
  topProducts: Array<{
    id: string;
    name: string;
    views: number;
    inquiries: number;
  }>;
}

export interface CategoryBreakdown {
  category: string;
  count: number;
  percentage: number;
}

export interface VendorPlan {
  name: string;
  features: string[];
  price: number;
  duration: string;
}

export interface PerformanceMetrics {
  views: number;
  inquiries: number;
  conversions: number;
  revenue: number;
  period: string;
}

// Complete vendor registration
export const completeVendorRegistration = async (formData: FormData): Promise<VendorProfile> => {
  try {
    if (__DEV__) {
      console.log('🏢 completeVendorRegistration called');
      console.log('📤 FormData entries:');
      // Log FormData entries if possible (some entries may not be loggable)
      try {
        // @ts-ignore
        for (let pair of formData.entries()) {
          if (typeof pair[1] === 'string') {
            console.log(`  ${pair[0]}: ${pair[1]}`);
          } else {
            console.log(`  ${pair[0]}: [File]`);
          }
        }
      } catch (e) {
        console.log('  (FormData logging not supported)');
      }
    }
    
    const response = await apiPost('/auth/complete-registration', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (__DEV__) {
      console.log('✅ completeVendorRegistration response:', JSON.stringify(response, null, 2));
    }
    
    // Backend returns { success: true, vendor: {...} } or { success: true, data: {...} }
    return response.vendor || response.data || response;
  } catch (error) {
    console.error('❌ completeVendorRegistration error:', error);
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get vendor profile
export const getVendorProfile = async (): Promise<VendorProfile> => {
  try {
    const response = await apiGet('/vendors/profile');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Update vendor profile
export const updateVendorProfile = async (data: Partial<VendorProfile>): Promise<VendorProfile> => {
  try {
    const response = await apiPut('/vendors/profile', data);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get vendor dashboard
export const getVendorDashboard = async (): Promise<VendorDashboard> => {
  try {
    const response = await apiGet('/vendors/dashboard');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get category breakdown
export const getCategoryBreakdown = async (): Promise<CategoryBreakdown[]> => {
  try {
    const response = await apiGet('/vendors/categories/breakdown');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get vendor plan
export const getVendorPlan = async (): Promise<VendorPlan> => {
  try {
    const response = await apiGet('/vendors/plan');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get recent activities
export const getRecentActivities = async (limit: number = 10): Promise<any[]> => {
  try {
    const response = await apiGet(`/vendors/recent-activities?limit=${limit}`);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Update vendor images
export const updateVendorImages = async (formData: FormData): Promise<{ profileImage?: string; coverImage?: string }> => {
  try {
    const response = await apiPut('/vendors/profile/images', formData, {
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

// Get performance metrics
export const getPerformanceMetrics = async (): Promise<PerformanceMetrics> => {
  try {
    const response = await apiGet('/vendors/performance');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Upload portfolio images
export const uploadPortfolioImages = async (images: File[]): Promise<string[]> => {
  try {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('portfolio', {
        uri: image.uri,
        type: image.type,
        name: `portfolio_${Date.now()}_${index}.jpg`,
      } as any);
    });
    
    const response = await apiPost('/vendors/profile/portfolio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.urls;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get available tags
export const getAvailableTags = async (): Promise<string[]> => {
  try {
    const response = await apiGet('/vendors/tags');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get popular tags
export const getPopularTags = async (): Promise<string[]> => {
  try {
    const response = await apiGet('/vendors/tags/popular');
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Delete portfolio image
export const deletePortfolioImage = async (imageUrl: string): Promise<void> => {
  try {
    await apiDelete('/vendors/profile/portfolio', {
      data: { imageUrl }
    });
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get all vendors (for admin or public listing)
export const getAllVendors = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  location?: string;
  rating?: number;
}): Promise<{ vendors: VendorProfile[]; total: number; page: number; limit: number }> => {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.location) queryParams.append('location', params.location);
    if (params?.rating) queryParams.append('rating', params.rating.toString());
    
    const response = await apiGet(`/vendors?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get vendor by ID
export const getVendorById = async (id: string): Promise<VendorProfile> => {
  try {
    const response = await apiGet(`/vendors/${id}`);
    return response.data;
  } catch (error) {
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};
