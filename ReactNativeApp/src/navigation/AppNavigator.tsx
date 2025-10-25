import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from '../context/AuthContextSimple';
import HomeScreen from '../screens/HomeScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

// Auth Screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import VerificationScreen from '../screens/auth/VerificationScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';

// Onboarding Screens
import AccountTypeScreen from '../screens/onboarding/AccountTypeScreen';
import UserDetailsScreen from '../screens/onboarding/UserDetailsScreen';
import BusinessDetailsScreen from '../screens/onboarding/BusinessDetailsScreen';
import ProfessionalProfileScreen from '../screens/onboarding/ProfessionalProfileScreen';
import PortfolioScreen from '../screens/onboarding/PortfolioScreen';
import AddressScreen from '../screens/onboarding/AddressScreen';
import VerificationDocumentScreen from '../screens/onboarding/VerificationDocumentScreen';

export type RootStackParamList = {
  Home: undefined;
  CategoryList: undefined;
  ProductListing: { category: string };
  ProductDetail: { productId: string };
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Verification: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
};

export type OnboardingStackParamList = {
  AccountType: undefined;
  UserDetails: undefined;
  BusinessDetails: undefined;
  ProfessionalProfile: undefined;
  Portfolio: undefined;
  Address: undefined;
  VerificationDocument: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const OnboardingStack = createStackNavigator<OnboardingStackParamList>();

// Auth Stack Navigator
const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Verification" component={VerificationScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
};

// Onboarding Stack Navigator
const OnboardingNavigator: React.FC = () => {
  return (
    <OnboardingStack.Navigator
      initialRouteName="AccountType"
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardingStack.Screen name="AccountType" component={AccountTypeScreen} />
      <OnboardingStack.Screen name="UserDetails" component={UserDetailsScreen} />
      <OnboardingStack.Screen name="BusinessDetails" component={BusinessDetailsScreen} />
      <OnboardingStack.Screen name="ProfessionalProfile" component={ProfessionalProfileScreen} />
      <OnboardingStack.Screen name="Portfolio" component={PortfolioScreen} />
      <OnboardingStack.Screen name="Address" component={AddressScreen} />
      <OnboardingStack.Screen name="VerificationDocument" component={VerificationDocumentScreen} />
    </OnboardingStack.Navigator>
  );
};

// Main App Stack Navigator
const MainNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <RootStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </View>
            </View>
          ),
          headerTitleAlign: 'left',
        }}
      />
      <RootStack.Screen 
        name="CategoryList" 
        component={CategoryListScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </View>
            </View>
          ),
          headerTitleAlign: 'left',
        }}
      />
      <RootStack.Screen
        name="ProductListing"
        component={ProductListingScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </View>
            </View>
          ),
          headerTitleAlign: 'left',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#333333',
        }}
      />
      <RootStack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </View>
            </View>
          ),
          headerTitleAlign: 'left',
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#333333',
        }}
      />
    </RootStack.Navigator>
  );
};

// Main App Navigator with Auth Logic
const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  // Guest mode: user is null but isAuthenticated is true
  if (!user) {
    return <MainNavigator />;
  }

  if (!user.isOnboardingComplete) {
    return <OnboardingNavigator />;
  }

  return <MainNavigator />;
};

// Root App Component with Auth Provider
const AppNavigatorWithAuth: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigatorWithAuth;
