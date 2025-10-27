import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from '../context/AuthContextSimple';
import BottomNavigation from '../components/BottomNavigation';
import HomeScreen from '../screens/HomeScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FindProsScreen from '../screens/FindProsScreen';

// Profile Screens
import ProfileViewScreen from '../screens/profile/ProfileViewScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import ClientProfileEditScreen from '../screens/profile/ClientProfileEditScreen';
import ProjectAddScreen from '../screens/profile/ProjectAddScreen';
import ProjectDetailScreen from '../screens/profile/ProjectDetailScreen';

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
  FindPros: undefined;
  ProfileView: undefined;
  ProfileEdit: undefined;
  ClientProfileEdit: undefined;
  ProjectAdd: undefined;
  ProjectDetail: { projectId: string };
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
  const { user } = useAuth();
  
  // Determine initial route based on user's role
  const getInitialRoute = (): keyof OnboardingStackParamList => {
    if (user?.role === 'vendor') {
      // If user is already a vendor, skip AccountType and UserDetails
      return 'BusinessDetails';
    }
    // New users should start with account type selection
    return 'AccountType';
  };
  
  return (
    <OnboardingStack.Navigator
      initialRouteName={getInitialRoute()}
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

// Bottom Navigation Component with Navigation
const BottomNavComponent: React.FC = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'home' | 'design' | 'pros' | 'estimate' | 'profile'>('home');

  const handleTabPress = (tab: 'home' | 'design' | 'pros' | 'estimate' | 'profile') => {
    setActiveTab(tab);
    
    // Navigate to the correct screen based on the tab
    switch (tab) {
      case 'home':
        navigation.navigate('Home');
        break;
      case 'design':
        navigation.navigate('CategoryList');
        break;
      case 'pros':
        navigation.navigate('FindPros');
        break;
      case 'estimate':
        // Navigate to estimate screen when implemented
        break;
      case 'profile':
        navigation.navigate('ProfileView');
        break;
    }
  };

  return <BottomNavigation activeTab={activeTab} onTabPress={handleTabPress} />;
};

// Main App Stack Navigator with Bottom Navigation
const MainNavigator: React.FC = () => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
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
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <TouchableOpacity 
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('ProfileView')}
              >
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'left',
          headerBackTitleVisible: false,
          gestureEnabled: false,
        })}
      />
      <RootStack.Screen 
        name="CategoryList" 
        component={CategoryListScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <TouchableOpacity 
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('ProfileView')}
              >
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'left',
          headerLeft: () => null,
          headerBackTitleVisible: false,
          gestureEnabled: false,
        })}
      />
      <RootStack.Screen
        name="ProductListing"
        component={ProductListingScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <TouchableOpacity 
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('ProfileView')}
              >
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'left',
          headerBackTitle: '',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#333333',
        })}
      />
      <RootStack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingRight: 20 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#333' }}>LOGO</Text>
              <TouchableOpacity 
                style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('ProfileView')}
              >
                <Text style={{ fontSize: 16, color: '#333' }}>👤</Text>
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: 'left',
          headerBackTitle: '',
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: '#ffffff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          headerTintColor: '#333333',
        })}
      />
      <RootStack.Screen 
        name="FindPros" 
        component={FindProsScreen}
        options={{
          headerShown: false,
        }}
      />
      
      {/* Profile Screens */}
      <RootStack.Screen 
        name="ProfileView" 
        component={ProfileViewScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen 
        name="ProfileEdit" 
        component={ProfileEditScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen 
        name="ClientProfileEdit" 
        component={ClientProfileEditScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen 
        name="ProjectAdd" 
        component={ProjectAddScreen}
        options={{
          headerShown: false,
        }}
      />
      <RootStack.Screen 
        name="ProjectDetail" 
        component={ProjectDetailScreen}
        options={{
          headerShown: false,
        }}
              />
        </RootStack.Navigator>
      </View>
      <BottomNavComponent />
    </View>
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
