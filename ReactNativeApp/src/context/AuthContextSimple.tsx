import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { 
  authenticateWithFirebase, 
  authenticateWithGoogle, 
  authenticateWithApple,
  logoutUser,
  getUserProfile,
  updateUserRole as updateUserRoleService,
  UserProfile 
} from '../services/authService';
import { onAuthStateChange } from '../services/firebaseAuth';
import { setAuthToken, getAuthToken, clearAuthData } from '../services/apiClient';
import { completeVendorRegistration } from '../services/vendorService';
import { onboardingStore } from '../store/onboardingStore';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'user' | 'vendor' | 'admin';
  isVerified: boolean;
  profileImage?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  isOnboardingComplete?: boolean;
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
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateUserRole: (role: 'vendor') => Promise<void>;
  completeOnboarding: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
  clearError: () => void;
  refreshUserProfile: () => Promise<void>;
}

// Action Types
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_AUTHENTICATED'; payload: { user: User; token: string } }
  | { type: 'SET_UNAUTHENTICATED' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_GUEST_MODE' };

// Initial State
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
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
    case 'SET_GUEST_MODE':
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: null,
        token: null,
        error: null,
      };
    default:
      return state;
  }
};

// Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to convert UserProfile to User
const convertUserProfile = (profile: UserProfile): User => {
  if (!profile || !profile.id) {
    throw new Error('Invalid user profile data');
  }
  
  return {
    id: profile.id,
    email: profile.email,
    name: profile.name,
    phone: profile.phone,
    role: profile.role,
    isVerified: profile.isVerified,
    profileImage: profile.profileImage,
    address: profile.address,
    isOnboardingComplete: profile.isOnboardingComplete || false, // Use backend value, default to false
  };
};

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        // Check if we have a stored token
        const token = await getAuthToken();
        if (token) {
          // Try to get user profile
          const userProfile = await getUserProfile();
          const user = convertUserProfile(userProfile);
          dispatch({ type: 'SET_AUTHENTICATED', payload: { user, token } });
        } else {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initializeAuth();

    // Listen to Firebase auth state changes (with error handling)
    let unsubscribe: (() => void) | undefined;
    try {
      unsubscribe = onAuthStateChange(async (firebaseUser) => {
        if (firebaseUser && !state.isAuthenticated) {
          try {
            const token = await getAuthToken();
            if (token) {
              const userProfile = await getUserProfile();
              const user = convertUserProfile(userProfile);
              dispatch({ type: 'SET_AUTHENTICATED', payload: { user, token } });
            }
          } catch (error) {
            console.error('Auth state change error:', error);
          }
        } else if (!firebaseUser && state.isAuthenticated) {
          dispatch({ type: 'SET_UNAUTHENTICATED' });
        }
      });
    } catch (error) {
      console.error('Firebase auth state listener error:', error);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const { user: userProfile, firebaseUser } = await authenticateWithFirebase(email, password);
      const user = convertUserProfile(userProfile);
      
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user, token: firebaseUser.uid } });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Login failed. Please try again.' });
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const { user: userProfile, firebaseUser } = await authenticateWithFirebase(email, password, name);
      const user = convertUserProfile(userProfile);
      
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user, token: firebaseUser.uid } });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Registration failed. Please try again.' });
    }
  };

  const loginWithGoogle = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const { user: userProfile, firebaseUser } = await authenticateWithGoogle();
      const user = convertUserProfile(userProfile);
      
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user, token: firebaseUser.uid } });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Google login failed. Please try again.' });
    }
  };

  const loginWithApple = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const { user: userProfile, firebaseUser } = await authenticateWithApple();
      const user = convertUserProfile(userProfile);
      
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user, token: firebaseUser.uid } });
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Apple login failed. Please try again.' });
    }
  };

  const logout = async () => {
    try {
      if (__DEV__) {
        console.log('🚪 Logout initiated');
      }
      
      await logoutUser();
      
      if (__DEV__) {
        console.log('✅ Logout successful, clearing auth state');
      }
      
      dispatch({ type: 'SET_UNAUTHENTICATED' });
      
      if (__DEV__) {
        console.log('✅ User should now see auth screens');
      }
    } catch (error) {
      console.error('❌ Error during logout:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Logout failed. Please try again.' });
    }
  };

  const verifyOTP = async (otp: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'OTP verification failed. Please try again.' });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Password reset failed. Please try again.' });
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
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
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update user data.' });
    }
  };

  const updateUserRole = async (role: 'vendor') => {
    try {
      if (__DEV__) {
        console.log('🎯 updateUserRole called, role:', role);
      }
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const userProfile = await updateUserRoleService({ newRole: role });
      if (__DEV__) {
        console.log('✅ User role updated, profile:', JSON.stringify(userProfile, null, 2));
      }
      const user = convertUserProfile(userProfile);
      
      if (__DEV__) {
        console.log('✅ Converted user:', JSON.stringify(user, null, 2));
        console.log('🔍 User will have isOnboardingComplete:', user.isOnboardingComplete);
      }
      
      dispatch({ type: 'UPDATE_USER', payload: user });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      if (__DEV__) {
        console.log('✅ User state updated, should show onboarding now');
      }
    } catch (error: any) {
      console.error('❌ updateUserRole error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to update user role.' });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const refreshUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();
      const user = convertUserProfile(userProfile);
      dispatch({ type: 'UPDATE_USER', payload: user });
    } catch (error: any) {
      console.error('Failed to refresh user profile:', error);
    }
  };

  const completeOnboarding = async () => {
    try {
      if (__DEV__) {
        console.log('🎯 completeOnboarding called');
        console.log('👤 Current user role:', state.user?.role);
      }
      
      // If user is a vendor, complete vendor registration with backend
      if (state.user?.role === 'vendor') {
        // Validate onboarding data
        const validation = onboardingStore.validateData();
        if (__DEV__) {
          console.log('📋 Onboarding data validation:', validation);
        }
        
        if (!validation.isValid) {
          console.warn('⚠️ Incomplete onboarding data:', validation.missingFields);
          // Continue anyway for now, backend will handle missing fields
        }
        
        // Prepare and send data to backend
        const formData = onboardingStore.prepareApiPayload();
        if (__DEV__) {
          console.log('🚀 Calling completeVendorRegistration...');
        }
        
        await completeVendorRegistration(formData);
        
        if (__DEV__) {
          console.log('✅ Vendor registration completed successfully');
        }
        
        // Clear onboarding data
        await onboardingStore.clearData();
        
        // Refresh user profile to get updated isOnboardingComplete flag from backend
        if (__DEV__) {
          console.log('🔄 Refreshing user profile...');
        }
        const userProfile = await getUserProfile();
        const user = convertUserProfile(userProfile);
        dispatch({ type: 'UPDATE_USER', payload: user });
        
        if (__DEV__) {
          console.log('✅ User profile refreshed, isOnboardingComplete:', user.isOnboardingComplete);
        }
      }
      
      // Manually set isOnboardingComplete to true for vendors if backend didn't update it
      if (state.user?.role === 'vendor' && state.user) {
        dispatch({ 
          type: 'UPDATE_USER', 
          payload: { ...state.user, isOnboardingComplete: true } 
        });
      }
      
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      
      if (__DEV__) {
        console.log('✅ Onboarding completed, user should now see main app');
      }
    } catch (error: any) {
      console.error('❌ completeOnboarding error:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message || 'Failed to complete onboarding.' });
      throw error;
    }
  };

  const continueAsGuest = async () => {
    try {
      dispatch({ type: 'SET_GUEST_MODE' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to continue as guest.' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    verifyOTP,
    resetPassword,
    updatePassword,
    updateUser,
    updateUserRole,
    completeOnboarding,
    continueAsGuest,
    clearError,
    refreshUserProfile,
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
