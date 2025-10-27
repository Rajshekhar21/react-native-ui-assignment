import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
}

export interface ValidationError {
  field: string;
  message: string;
  value: any;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
  validationDetails?: ValidationError[];
}

// Parse API error response
export const parseApiError = (error: AxiosError): ApiError => {
  const response = error.response;
  
  if (!response) {
    return {
      message: 'Network error. Please check your internet connection.',
      code: 'NETWORK_ERROR',
    };
  }
  
  const data = response.data as ApiErrorResponse;
  const status = response.status;
  
  // Handle different error types
  switch (status) {
    case 400:
      return {
        message: data?.message || 'Bad request. Please check your input.',
        status,
        code: 'BAD_REQUEST',
        details: data?.validationDetails,
      };
      
    case 401:
      return {
        message: 'Authentication failed. Please login again.',
        status,
        code: 'UNAUTHORIZED',
      };
      
    case 403:
      return {
        message: 'Access denied. You don\'t have permission to perform this action.',
        status,
        code: 'FORBIDDEN',
      };
      
    case 404:
      return {
        message: 'Resource not found.',
        status,
        code: 'NOT_FOUND',
      };
      
    case 422:
      return {
        message: data?.message || 'Validation error. Please check your input.',
        status,
        code: 'VALIDATION_ERROR',
        details: data?.validationDetails,
      };
      
    case 429:
      return {
        message: 'Too many requests. Please try again later.',
        status,
        code: 'RATE_LIMITED',
      };
      
    case 500:
      return {
        message: 'Server error. Please try again later.',
        status,
        code: 'SERVER_ERROR',
      };
      
    default:
      return {
        message: data?.message || 'An unexpected error occurred.',
        status,
        code: 'UNKNOWN_ERROR',
      };
  }
};

// Get user-friendly error message
export const getErrorMessage = (error: AxiosError): string => {
  const apiError = parseApiError(error);
  return apiError.message;
};

// Get validation errors
export const getValidationErrors = (error: AxiosError): ValidationError[] => {
  const apiError = parseApiError(error);
  return apiError.details || [];
};

// Check if error is network error
export const isNetworkError = (error: AxiosError): boolean => {
  return !error.response;
};

// Check if error is authentication error
export const isAuthError = (error: AxiosError): boolean => {
  return error.response?.status === 401 || error.response?.status === 403;
};

// Check if error is validation error
export const isValidationError = (error: AxiosError): boolean => {
  return error.response?.status === 422;
};

// Check if error is server error
export const isServerError = (error: AxiosError): boolean => {
  return error.response?.status >= 500;
};

// Format validation errors for display
export const formatValidationErrors = (validationErrors: ValidationError[]): string => {
  if (validationErrors.length === 0) return '';
  
  if (validationErrors.length === 1) {
    return validationErrors[0].message;
  }
  
  return validationErrors.map(err => `${err.field}: ${err.message}`).join('\n');
};

// Log error for debugging
export const logError = (error: AxiosError, context?: string): void => {
  if (__DEV__) {
    const apiError = parseApiError(error);
    console.error(`API Error${context ? ` in ${context}` : ''}:`, {
      message: apiError.message,
      status: apiError.status,
      code: apiError.code,
      url: error.config?.url,
      method: error.config?.method,
      data: error.response?.data,
    });
  }
};

// Handle error with retry logic
export const handleErrorWithRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: AxiosError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as AxiosError;
      
      // Don't retry on client errors (4xx)
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error;
      }
      
      // Don't retry on last attempt
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
  
  throw lastError!;
};

// Create error handler hook
export const createErrorHandler = () => {
  const handleError = (error: AxiosError, context?: string): string => {
    logError(error, context);
    return getErrorMessage(error);
  };
  
  const handleValidationErrors = (error: AxiosError): ValidationError[] => {
    return getValidationErrors(error);
  };
  
  return {
    handleError,
    handleValidationErrors,
    isNetworkError,
    isAuthError,
    isValidationError,
    isServerError,
  };
};
