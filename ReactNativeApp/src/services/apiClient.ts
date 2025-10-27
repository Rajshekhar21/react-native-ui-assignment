import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import AsyncStorage from '../utils/AsyncStorageFallback';

// API Configuration
const API_BASE_URL = 'https://api.godecormate.com/api';
const TIMEOUT = 30000;

// Token storage key
const TOKEN_KEY = 'firebase_token';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
        if (__DEV__) {
          console.log(`🔑 Using auth token: ${token.substring(0, 20)}...`);
        }
      } else if (__DEV__) {
        console.warn('⚠️ No auth token available for request');
      }
    } catch (error) {
      console.warn('Failed to get token from storage:', error);
      // Continue without token if AsyncStorage fails
    }
    
    // Log request in development
    if (__DEV__) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling and token refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (__DEV__) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Log error in development
    if (__DEV__) {
      console.error(`❌ API Error: ${error.response?.status} ${error.config?.url}`, error.response?.data);
    }
    
    // Handle 401 Unauthorized - token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh token
        const refreshed = await refreshToken();
        if (refreshed) {
          // Retry original request with new token
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        await clearAuthData();
        // You might want to dispatch a logout action here
        console.error('Token refresh failed:', refreshError);
      }
    }
    
    // Handle network errors
    if (!error.response) {
      error.message = 'Network error. Please check your internet connection.';
    }
    
    return Promise.reject(error);
  }
);

// Token management functions
export const setAuthToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to store token:', error);
    throw error;
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

export const clearAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear auth data:', error);
  }
};

// Token refresh logic
const refreshToken = async (): Promise<boolean> => {
  try {
    // This would typically call your refresh endpoint
    // For now, we'll return false to indicate refresh failed
    // You should implement actual token refresh logic here
    return false;
  } catch (error) {
    console.error('Token refresh failed:', error);
    return false;
  }
};

// Retry logic for failed requests
export const retryRequest = async (
  requestFn: () => Promise<any>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<any> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on 4xx errors (client errors)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }
      
      // Wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  
  throw lastError;
};

// Error handler utility
export const handleApiError = (error: AxiosError): string => {
  if (!error.response) {
    return 'Network error. Please check your internet connection.';
  }
  
  const status = error.response.status;
  const data = error.response.data as any;
  
  // Handle specific error cases
  switch (status) {
    case 400:
      return data?.message || 'Bad request. Please check your input.';
    case 401:
      return 'Authentication failed. Please login again.';
    case 403:
      return 'Access denied. You don\'t have permission to perform this action.';
    case 404:
      return 'Resource not found.';
    case 422:
      return data?.message || 'Validation error. Please check your input.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return data?.message || 'An unexpected error occurred.';
  }
};

// Request helper functions
export const apiGet = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.get(url, config);
  return response.data;
};

export const apiPost = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  if (__DEV__) {
    if (config?.headers?.['Content-Type'] === 'multipart/form-data') {
      console.log(`📤 POST ${url} [FormData]`);
      // Try to log FormData entries
      try {
        // @ts-ignore
        for (let pair of data.entries()) {
          if (typeof pair[1] === 'string') {
            console.log(`  ${pair[0]}: ${pair[1]}`);
          } else {
            console.log(`  ${pair[0]}: [File]`);
          }
        }
      } catch (e) {
        console.log('  (FormData entries not loggable)');
      }
    } else {
      console.log(`📤 POST ${url} with data:`, JSON.stringify(data, null, 2));
    }
  }
  
  const response = await apiClient.post(url, data, config);
  
  if (__DEV__) {
    console.log(`✅ POST ${url} response:`, JSON.stringify(response.data, null, 2));
  }
  
  return response.data;
};

export const apiPut = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  if (__DEV__) {
    console.log(`📤 PUT ${url} with data:`, JSON.stringify(data, null, 2));
    console.log(`📤 PUT request config:`, JSON.stringify({
      headers: config?.headers || 'default headers',
      baseURL: apiClient.defaults.baseURL,
      fullURL: `${apiClient.defaults.baseURL}${url}`,
    }, null, 2));
  }
  const response = await apiClient.put(url, data, config);
  if (__DEV__) {
    console.log(`📥 PUT response:`, JSON.stringify(response.data, null, 2));
  }
  return response.data;
};

export const apiDelete = async <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.delete(url, config);
  return response.data;
};

export const apiPatch = async <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await apiClient.patch(url, data, config);
  return response.data;
};

// Upload helper for FormData
export const apiUpload = async <T = any>(
  url: string, 
  formData: FormData, 
  onUploadProgress?: (progressEvent: any) => void
): Promise<T> => {
  const response = await apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
  return response.data;
};

export default apiClient;
