import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { setAuthToken, clearAuthData } from './apiClient';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
}

export interface AuthResult {
  user: AuthUser;
  token: string;
}

// Convert Firebase User to our AuthUser interface
const mapFirebaseUser = (user: FirebaseAuthTypes.User): AuthUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

// Get Firebase ID token
const getFirebaseToken = async (user: FirebaseAuthTypes.User): Promise<string> => {
  try {
    return await user.getIdToken();
  } catch (error) {
    console.error('Failed to get Firebase token:', error);
    throw new Error('Failed to get authentication token');
  }
};

// Register with email and password
export const registerWithEmail = async (
  email: string, 
  password: string, 
  name: string
): Promise<AuthResult> => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Update display name
    await user.updateProfile({ displayName: name });
    
    // Get Firebase token
    const token = await getFirebaseToken(user);
    
    // Store token
    await setAuthToken(token);
    
    return {
      user: mapFirebaseUser(user),
      token,
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    throw new Error(error.message || 'Registration failed');
  }
};

// Login with email and password
export const loginWithEmail = async (
  email: string, 
  password: string
): Promise<AuthResult> => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    
    // Get Firebase token
    const token = await getFirebaseToken(user);
    
    // Store token
    await setAuthToken(token);
    
    return {
      user: mapFirebaseUser(user),
      token,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
};

// Login with Google
export const loginWithGoogle = async (): Promise<AuthResult> => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
    // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    const user = userCredential.user;
    
    // Get Firebase token
    const token = await getFirebaseToken(user);
    
    // Store token
    await setAuthToken(token);
    
    return {
      user: mapFirebaseUser(user),
      token,
    };
  } catch (error: any) {
    console.error('Google login error:', error);
    throw new Error(error.message || 'Google login failed');
  }
};

// Login with Apple (iOS only)
export const loginWithApple = async (): Promise<AuthResult> => {
  try {
    // Apple Sign-In implementation would go here
    // This requires additional setup and is iOS specific
    throw new Error('Apple Sign-In not implemented yet');
  } catch (error: any) {
    console.error('Apple login error:', error);
    throw new Error(error.message || 'Apple login failed');
  }
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await auth().signOut();
    await clearAuthData();
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Logout failed');
  }
};

// Get current user
export const getCurrentUser = (): AuthUser | null => {
  const user = auth().currentUser;
  return user ? mapFirebaseUser(user) : null;
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return auth().onAuthStateChanged((user) => {
    callback(user ? mapFirebaseUser(user) : null);
  });
};

// Refresh token
export const refreshFirebaseToken = async (): Promise<string> => {
  try {
    const user = auth().currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }
    
    const token = await getFirebaseToken(user);
    await setAuthToken(token);
    return token;
  } catch (error: any) {
    console.error('Token refresh error:', error);
    throw new Error(error.message || 'Token refresh failed');
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return auth().currentUser !== null;
};
