import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  accountType?: 'individual' | 'business';
  isOnboardingComplete?: boolean;
  profile?: any;
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
  continueAsGuest: () => Promise<void>;
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

// Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
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
      
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user: mockUser, token: mockToken } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call
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
      
      dispatch({ type: 'SET_AUTHENTICATED', payload: { user: mockUser, token: mockToken } });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed. Please try again.' });
    }
  };

  const logout = async () => {
    try {
      dispatch({ type: 'SET_UNAUTHENTICATED' });
    } catch (error) {
      console.error('Error during logout:', error);
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

  const completeOnboarding = async () => {
    try {
      dispatch({ type: 'COMPLETE_ONBOARDING' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to complete onboarding.' });
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
    logout,
    verifyOTP,
    resetPassword,
    updatePassword,
    updateUser,
    completeOnboarding,
    continueAsGuest,
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
