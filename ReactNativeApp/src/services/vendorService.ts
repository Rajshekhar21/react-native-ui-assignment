import { apiPost, apiGet, apiPut, apiPatch, apiDelete, handleApiError } from './apiClient';
import { AxiosError } from 'axios';

const DEFAULT_IMAGE_TYPE = 'image/jpeg';

const createFormFile = (uri: string, namePrefix: string = 'upload'): { uri: string; type: string; name: string } => {
  const extension = uri.split('.').pop()?.toLowerCase() || 'jpg';
  const mimeType = extension === 'png' ? 'image/png' : DEFAULT_IMAGE_TYPE;
  return {
    uri,
    type: mimeType,
    name: `${namePrefix}_${Date.now()}.${extension}`,
  };
};

export interface VendorBasicInfoPayload {
  firebaseUid: string;
  authProvider: 'email' | 'google' | 'apple';
  googlePhotoURL?: string | null;
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  location?: {
    street?: string;
    buildingName?: string;
    zip?: string;
    city?: string;
    state?: string;
  };
  title: string;
  license: string;
  about?: string;
  profileImageUri?: string;
  coverImageUri?: string;
}

export interface VendorProfessionalDetailsPayload {
  experience: string;
  specialization: string;
  style: string;
}

export interface VendorPortfolioPayload {
  projectName: string;
  projectLocation: string;
  projectType: string;
  projectDescription: string;
  portfolioImageUris?: string[];
}

export interface VendorVerificationPayload {
  documentType: string;
  documentImageUri?: string;
  businessWebsite?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  x?: string;
  isJoinCompleted?: boolean;
  projectLocation?: string;
}

export const submitVendorBasicInfo = async (payload: VendorBasicInfoPayload): Promise<VendorProfile> => {
  const formData = new FormData();

  formData.append('firebaseUid', payload.firebaseUid);
  formData.append('authProvider', payload.authProvider);

  if (payload.googlePhotoURL) {
    formData.append('googlePhotoURL', payload.googlePhotoURL);
  }

  formData.append('fullName', payload.fullName);
  formData.append('companyName', payload.companyName);
  formData.append('phone', payload.phone);
  formData.append('email', payload.email);
  formData.append('address', payload.address);
  formData.append('title', payload.title);
  formData.append('license', payload.license);

  if (payload.about) {
    formData.append('about', payload.about);
  }

  if (payload.location) {
    if (payload.location.street) {
      formData.append('location.street', payload.location.street);
    }
    if (payload.location.buildingName) {
      formData.append('location.buildingName', payload.location.buildingName);
    }
    if (payload.location.zip) {
      formData.append('location.zip', payload.location.zip);
    }
    if (payload.location.city) {
      formData.append('location.city', payload.location.city);
    }
    if (payload.location.state) {
      formData.append('location.state', payload.location.state);
    }
  }

  if (payload.profileImageUri) {
    formData.append('profileImage', createFormFile(payload.profileImageUri, 'profile') as any);
  }

  if (payload.coverImageUri) {
    formData.append('coverImage', createFormFile(payload.coverImageUri, 'cover') as any);
  }

  return await completeVendorRegistration(formData);
};

export const updateVendorProfessionalDetails = async (
  payload: VendorProfessionalDetailsPayload
): Promise<VendorProfile> => {
  const formData = new FormData();
  formData.append('experience', payload.experience);
  formData.append('specialization', payload.specialization);
  formData.append('style', payload.style);

  const response = await apiPut('/vendors/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data || response;
};

export const updateVendorPortfolioDetails = async (
  payload: VendorPortfolioPayload
): Promise<VendorProfile> => {
  const formData = new FormData();
  formData.append('projectName', payload.projectName);
  formData.append('projectLocation', payload.projectLocation);
  formData.append('projectType', payload.projectType);
  formData.append('projectDescription', payload.projectDescription);

  if (payload.portfolioImageUris?.length) {
    payload.portfolioImageUris.forEach((uri, index) => {
      formData.append('portfolio', createFormFile(uri, `portfolio_${index}`) as any);
    });
  }

  const response = await apiPut('/vendors/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data || response;
};

export const completeVendorVerificationStep = async (
  payload: VendorVerificationPayload
): Promise<VendorProfile> => {
  const formData = new FormData();

  formData.append('documentType', payload.documentType);

  if (payload.documentImageUri) {
    formData.append('documentImage', createFormFile(payload.documentImageUri, 'document') as any);
  }

  if (payload.projectLocation) {
    formData.append('projectLocation', payload.projectLocation);
  }

  if (payload.businessWebsite) {
    formData.append('businessWebsite', payload.businessWebsite);
  }

  if (payload.linkedin) {
    formData.append('linkedin', payload.linkedin);
  }

  if (payload.facebook) {
    formData.append('facebook', payload.facebook);
  }

  if (payload.youtube) {
    formData.append('youtube', payload.youtube);
  }

  if (payload.x) {
    formData.append('x', payload.x);
  }

  formData.append('isJoinCompleted', String(payload.isJoinCompleted ?? true));

  const response = await apiPut('/vendors/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data || response;
};

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
