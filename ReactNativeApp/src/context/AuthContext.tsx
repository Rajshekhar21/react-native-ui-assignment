import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import AsyncStorage from '../utils/AsyncStorageFallback';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  accountType?: 'individual' | 'business';
  isOnboardingComplete?: boolean;
  profile?: UserProfile;
}

export interface UserProfile {
  companyName?: string;
  businessEmail?: string;
  address?: Address;
  professionalInfo?: ProfessionalInfo;
  portfolio?: PortfolioItem[];
  verificationDocuments?: VerificationDocument[];
}

export interface Address {
  buildingName?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface ProfessionalInfo {
  yearsOfExperience?: string;
  specialization?: string;
  styleExpertise?: string[];
}

export interface PortfolioItem {
  id: string;
  projectName: string;
  projectLocation: string;
  projectType: string;
  description: string;
  images: string[];
}

export interface VerificationDocument {
  id: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  token: string | null;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  clearError: () => void;
}

// Action Types
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: { user: User; token: string } }
  | { type: 'SET_UNAUTHENTICATED' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'COMPLETE_ONBOARDING' };

// Initial State
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
  error: null,
};

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case 'SET_UNAUTHENTICATED':
      return {
        ...state,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        token: null,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'COMPLETE_ONBOARDING':
      return {
        ...state,
        user: state.user ? { ...state.user, isOnboardingComplete: true } : null,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load stored auth data on app start
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userData = await AsyncStorage.getItem('user_data');
      
      if (token && userData) {
        const user = JSON.parse(userData);
        dispatch({ type: 'SET_AUTHENTICATED', payload: { user, token } });
      } else {
        dispatch({ type: 'SET_UNAUTHENTICATED' });
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      dispatch({ type: 'SET_UNAUTHENTICATED' });
    }
  };

  const storeAuthData = async (user: User, token: string) => {
    try {
      await AsyncStorage.setItem('auth_token', token);
      await AsyncStorage.setItem('user_data', JSON.stringify(user));
    } catch (error) {
      console.error('Error storing auth data:', error);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem('auth_token');
      await AsyncStorage.removeItem('user_data');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockUser: User = {
        id: '1',
        email,
        name: 'John Doe',
        accountType: 'individual',
        isOnboardingComplete: false,
      };
      const mockToken = 'mock_jwt_token';
      
      await storeAuthData(mockUser, mockToken);
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user: mockUser, token: mockToken } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockUser: User = {
        id: '1',
        email,
        name,
        accountType: 'individual',
        isOnboardingComplete: false,
      };
      const mockToken = 'mock_jwt_token';
      
      await storeAuthData(mockUser, mockToken);
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user: mockUser, token: mockToken } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed. Please try again.' });
    }
  };

  const logout = async () => {
    try {
      await clearAuthData();
      dispatch({ type: 'SET_UNAUTHENTICATED' });
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const verifyOTP = async (otp: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      // Mock verification success
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'OTP verification failed. Please try again.' });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Password reset failed. Please try again.' });
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // TODO: Replace with actual API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Password update failed. Please try again.' });
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (state.user) {
        const updatedUser = { ...state.user, ...userData };
        await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update user data.' });
    }
  };

  const completeOnboarding = async () => {
    try {
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      if (state.user) {
        const updatedUser = { ...state.user, isOnboardingComplete: true };
        await AsyncStorage.setItem('user_data', JSON.stringify(updatedUser));
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to complete onboarding.' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    verifyOTP,
    resetPassword,
    updatePassword,
    updateUser,
    completeOnboarding,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
