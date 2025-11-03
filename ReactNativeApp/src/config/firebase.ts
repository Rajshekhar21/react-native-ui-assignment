import { getApps, initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Firebase configuration from GoogleService-Info.plist
const firebaseConfig = {
  apiKey: "AIzaSyAE2Sj69YXuJP2y0lPbp-Gd37WPNgy3hi4",
  authDomain: "decormate-6b483.firebaseapp.com",
  databaseURL: "https://decormate-6b483-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "decormate-6b483",
  storageBucket: "decormate-6b483.firebasestorage.app",
  messagingSenderId: "96274365009",
  appId: "1:96274365009:ios:86107b6a5f630135925670",
};

// Initialize Firebase using modular SDK
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} else {
  console.log('Firebase already initialized');
}

// Configure Google Sign-In with both web and iOS client IDs
GoogleSignin.configure({
  webClientId: "96274365009-mmajaumsjv8ugr9bd3f2ba0cijm195mb.apps.googleusercontent.com",
  iosClientId: "96274365009-mmajaumsjv8ugr9bd3f2ba0cijm195mb.apps.googleusercontent.com",
  offlineAccess: true,
});

export { auth };
export default auth;
