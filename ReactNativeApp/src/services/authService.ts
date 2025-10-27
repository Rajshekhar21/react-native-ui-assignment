import { 
  registerWithEmail, 
  loginWithEmail, 
  loginWithGoogle, 
  loginWithApple, 
  logout, 
  getCurrentUser,
  refreshFirebaseToken,
  AuthResult 
} from './firebaseAuth';
import { apiPost, apiGet, apiPut, handleApiError, setAuthToken } from './apiClient';
import { AxiosError } from 'axios';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
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

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'vendor' | 'admin';
  firebaseToken: string;
  authProvider: 'email' | 'google' | 'apple';
  title?: string; // For vendors
  professionType?: string; // For vendors
  location?: {
    city: string;
    state: string;
    pincode: string;
  };
}

export interface LoginRequest {
  email: string;
  firebaseToken: string;
}

export interface UpdateRoleRequest {
  newRole: 'user' | 'vendor' | 'admin';
}

// Helper function to map backend user data to UserProfile
const mapBackendUser = (backendUser: any): UserProfile => {
  if (!backendUser) {
    console.error('mapBackendUser: No user data provided');
    throw new Error('No user data received from server');
  }
  
  // Log the data we're trying to map
  if (__DEV__) {
    console.log('Mapping backend user:', JSON.stringify(backendUser, null, 2));
  }
  
  return {
    id: backendUser._id || backendUser.id,
    name: backendUser.name || 'User',
    email: backendUser.email,
    phone: backendUser.phone || '',
    role: backendUser.role || 'user',
    isVerified: backendUser.isVerified || false,
    profileImage: backendUser.profileImage || '',
    address: backendUser.address,
    isOnboardingComplete: backendUser.isOnboardingComplete || false,
  };
};

// Register user with Firebase and backend
export const registerUser = async (userData: RegisterRequest): Promise<UserProfile> => {
  try {
    const response = await apiPost('/auth/register', userData);
    
    if (__DEV__) {
      console.log('✅ registerUser response:', JSON.stringify(response, null, 2));
    }
    
    // Backend returns { success: true, user: {...}, token: "..." }
    // apiPost returns response.data, so response.user is the user object
    const userData_from_response = response?.user || response?.data?.user || response?.data;
    
    if (!userData_from_response) {
      throw new Error('No user data received from server');
    }
    
    if (__DEV__) {
      console.log('🔍 User data extracted:', JSON.stringify(userData_from_response, null, 2));
    }
    
    // Store backend token if provided
    if (response?.token) {
      await setAuthToken(response.token);
      if (__DEV__) {
        console.log('🔑 Backend token stored');
      }
    }
    
    return mapBackendUser(userData_from_response);
  } catch (error) {
    console.error('❌ registerUser error:', error);
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Login user with Firebase and backend
export const loginUser = async (loginData: LoginRequest): Promise<UserProfile> => {
  try {
    const response = await apiPost('/auth/login', loginData);
    
    if (__DEV__) {
      console.log('✅ loginUser response:', JSON.stringify(response, null, 2));
    }
    
    // Backend returns { success: true, user: {...}, token: "..." }
    const userData_from_response = response?.user || response?.data?.user || response?.data;
    
    return mapBackendUser(userData_from_response);
  } catch (error) {
    console.error('❌ loginUser error:', error);
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Get user profile from backend
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const response = await apiGet('/auth/profile');
    
    if (__DEV__) {
      console.log('getUserProfile full response:', JSON.stringify(response, null, 2));
    }
    
    // Backend returns { success: true, user: {...} }
    const userData = response?.user || response?.data?.user || response?.data || response;
    
    return mapBackendUser(userData);
  } catch (error: any) {
    console.error('getUserProfile error:', error);
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Update user role to vendor
export const updateUserRole = async (roleData: UpdateRoleRequest): Promise<UserProfile> => {
  try {
    if (__DEV__) {
      console.log('✅ updateUserRole called with:', JSON.stringify(roleData, null, 2));
    }
    
    const response = await apiPut('/auth/update-role', roleData);
    
    if (__DEV__) {
      console.log('✅ updateUserRole response:', JSON.stringify(response, null, 2));
    }
    
    // Backend returns { success: true, user: {...} }
    const userProfile = response?.user || response?.data?.user || response?.data || response;
    return mapBackendUser(userProfile);
  } catch (error) {
    console.error('❌ updateUserRole error:', error);
    const apiError = handleApiError(error as AxiosError);
    throw new Error(apiError);
  }
};

// Complete authentication flow with Firebase
export const authenticateWithFirebase = async (
  email: string,
  password: string,
  name?: string
): Promise<{ user: UserProfile; firebaseUser: any }> => {
  try {
    let firebaseResult: AuthResult;
    let isNewUser = false;
    
    // Try to login first, if fails then register
    try {
      firebaseResult = await loginWithEmail(email, password);
    } catch (loginError) {
      if (name) {
        firebaseResult = await registerWithEmail(email, password, name);
        isNewUser = true;
      } else {
        throw new Error('Login failed and no name provided for registration');
      }
    }
    
    // Register/login with backend
    let userProfile: UserProfile;
    
    try {
      // Try to register with backend (for new users)
      userProfile = await registerUser({
        name: firebaseResult.user.displayName || name || 'User',
        email: firebaseResult.user.email || email,
        phone: '', // Will be updated in onboarding
        role: 'user',
        firebaseToken: firebaseResult.token,
        authProvider: 'email',
      });
    } catch (registerError: any) {
      // If user already exists (409), login instead
      if (registerError.message?.includes('already exists') || registerError.message?.includes('409')) {
        try {
          userProfile = await loginUser({
            email: firebaseResult.user.email || email,
            firebaseToken: firebaseResult.token,
          });
        } catch (loginApiError) {
          // If login also fails, try to get the profile
          userProfile = await getUserProfile();
        }
      } else {
        throw registerError;
      }
    }
    
    return {
      user: userProfile,
      firebaseUser: firebaseResult.user,
    };
  } catch (error: any) {
    console.error('Authentication error:', error);
    throw new Error(error.message || 'Authentication failed');
  }
};

// Google authentication flow
export const authenticateWithGoogle = async (): Promise<{ user: UserProfile; firebaseUser: any }> => {
  try {
    const firebaseResult = await loginWithGoogle();
    
    // Register/login with backend
    let userProfile: UserProfile;
    
    try {
      userProfile = await registerUser({
        name: firebaseResult.user.displayName || 'User',
        email: firebaseResult.user.email || '',
        phone: '', // Will be updated in onboarding
        role: 'user',
        firebaseToken: firebaseResult.token,
        authProvider: 'google',
      });
    } catch (registerError: any) {
      // If user already exists, login instead
      if (registerError.message?.includes('already exists') || registerError.message?.includes('409')) {
        try {
          userProfile = await loginUser({
            email: firebaseResult.user.email || '',
            firebaseToken: firebaseResult.token,
          });
        } catch (loginApiError) {
          userProfile = await getUserProfile();
        }
      } else {
        throw registerError;
      }
    }
    
    return {
      user: userProfile,
      firebaseUser: firebaseResult.user,
    };
  } catch (error: any) {
    console.error('Google authentication error:', error);
    throw new Error(error.message || 'Google authentication failed');
  }
};

// Apple authentication flow
export const authenticateWithApple = async (): Promise<{ user: UserProfile; firebaseUser: any }> => {
  try {
    const firebaseResult = await loginWithApple();
    
    // Register/login with backend
    let userProfile: UserProfile;
    
    try {
      userProfile = await registerUser({
        name: firebaseResult.user.displayName || 'User',
        email: firebaseResult.user.email || '',
        phone: '', // Will be updated in onboarding
        role: 'user',
        firebaseToken: firebaseResult.token,
        authProvider: 'apple',
      });
    } catch (registerError: any) {
      // If user already exists, login instead
      if (registerError.message?.includes('already exists') || registerError.message?.includes('409')) {
        try {
          userProfile = await loginUser({
            email: firebaseResult.user.email || '',
            firebaseToken: firebaseResult.token,
          });
        } catch (loginApiError) {
          userProfile = await getUserProfile();
        }
      } else {
        throw registerError;
      }
    }
    
    return {
      user: userProfile,
      firebaseUser: firebaseResult.user,
    };
  } catch (error: any) {
    console.error('Apple authentication error:', error);
    throw new Error(error.message || 'Apple authentication failed');
  }
};

// Logout from both Firebase and backend
export const logoutUser = async (): Promise<void> => {
  try {
    await logout();
    // Backend logout is handled by token removal
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Logout failed');
  }
};

// Refresh authentication token
export const refreshAuthToken = async (): Promise<string> => {
  try {
    return await refreshFirebaseToken();
  } catch (error: any) {
    console.error('Token refresh error:', error);
    throw new Error(error.message || 'Token refresh failed');
  }
};

// Get current Firebase user
export const getCurrentFirebaseUser = () => {
  return getCurrentUser();
};

// Check if user is authenticated
export const isUserAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};