import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from '../context/AuthContextSimple';
import BottomNavigation from '../components/BottomNavigation';
import NavigationDrawer from '../components/NavigationDrawer';
import AppHeader from '../components/AppHeader';
import HomeScreen from '../screens/HomeScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import FindProsScreen from '../screens/FindProsScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ResidentialScreen from '../screens/ResidentialScreen';
import CommercialScreen from '../screens/CommercialScreen';
import HospitalityScreen from '../screens/HospitalityScreen';
import TurnkeyScreen from '../screens/TurnkeyScreen';
import EstimateWizardScreen from '../screens/estimate/EstimateWizardScreen';
import ProfilesScreen from '../screens/ProfilesScreen';

// Profile Screens
import ProfileViewScreen from '../screens/profile/ProfileViewScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import ClientProfileEditScreen from '../screens/profile/ClientProfileEditScreen';
import ProjectAddScreen from '../screens/profile/ProjectAddScreen';
import ProjectDetailScreen from '../screens/profile/ProjectDetailScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import PortfolioScreenMain from '../screens/PortfolioScreen';
import TermsConditionScreen from '../screens/TermsConditionScreen';
import RateAppScreen from '../screens/RateAppScreen';

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
  Services: undefined;
  Residential: undefined;
  Commercial: undefined;
  Hospitality: undefined;
  Turnkey: undefined;
  Estimate: undefined;
  Profiles: undefined;
  ProfileView: undefined;
  ProfileEdit: undefined;
  ClientProfileEdit: undefined;
  ProjectAdd: undefined;
  ProjectDetail: { projectId: string };
  AboutUs: undefined;
  Portfolio: undefined;
  TermsCondition: undefined;
  RateApp: undefined;
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
const bottomTabRoutes = new Set<keyof RootStackParamList>(['Home', 'CategoryList', 'FindPros', 'ProfileView', 'Estimate']);

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
  const [activeTab, setActiveTab] = useState<'home' | 'design' | 'pros' | 'estimate' | 'profile' | null>('home');

  // Listen to navigation state changes to update active tab
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e: any) => {
      const currentRoute = navigation.getCurrentRoute();
      if (currentRoute) {
        switch (currentRoute.name) {
          case 'Home':
            setActiveTab('home');
            break;
          case 'CategoryList':
            setActiveTab('design');
            break;
          case 'FindPros':
            setActiveTab('pros');
            break;
          case 'ProfileView':
            setActiveTab('profile');
            break;
          case 'Estimate':
            setActiveTab('estimate');
            break;
          case 'Services':
            // Don't set any tab as active for Services
            setActiveTab(null);
            break;
          default:
            // Keep current state for other screens
            break;
        }
      }
    });

    return unsubscribe;
  }, [navigation]);

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
        navigation.navigate('Estimate');
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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigationRef = useRef<any>(null);

  const toggleDrawer = () => {
    setDrawerVisible((prev) => !prev);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleDrawerNavigation = (screen: string) => {
    console.log('Drawer navigation called:', screen);
    if (navigationRef.current) {
      switch (screen) {
        case 'Services':
          console.log('Navigating to Services');
          navigationRef.current.navigate('Services');
          break;
        case 'Portfolio':
          console.log('Navigate to Portfolio');
          navigationRef.current.navigate('Portfolio');
          break;
        case 'AboutUs':
          console.log('Navigate to About Us');
          navigationRef.current.navigate('AboutUs');
          break;
        case 'TermsCondition':
          console.log('Navigate to Terms & Condition');
          navigationRef.current.navigate('TermsCondition');
          break;
        case 'RateApp':
          console.log('Rate Our App');
          navigationRef.current.navigate('RateApp');
          break;
        default:
          console.log(`Navigate to: ${screen}`);
      }
      closeDrawer();
    } else {
      console.log('Navigation ref is null');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation, route }) => {
            navigationRef.current = navigation;
            const routeName = route.name as keyof RootStackParamList;
            const isBottomTabRoute = bottomTabRoutes.has(routeName);
            const canGoBack = navigation.canGoBack();

            return {
              header: () => (
                <AppHeader
                  showBack={!isBottomTabRoute && canGoBack}
                  onBackPress={() => navigation.goBack()}
                  onDropdownPress={toggleDrawer}
                />
              ),
              headerShown: true,
              headerBackTitleVisible: false,
              headerShadowVisible: false,
              gestureEnabled: !isBottomTabRoute,
            };
          }}
        >
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen name="CategoryList" component={CategoryListScreen} />
          <RootStack.Screen name="ProductListing" component={ProductListingScreen} />
          <RootStack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <RootStack.Screen name="FindPros" component={FindProsScreen} />
          <RootStack.Screen name="Services" component={ServicesScreen} />
          <RootStack.Screen name="Residential" component={ResidentialScreen} />
          <RootStack.Screen name="Commercial" component={CommercialScreen} />
          <RootStack.Screen name="Hospitality" component={HospitalityScreen} />
          <RootStack.Screen name="Turnkey" component={TurnkeyScreen} />
          <RootStack.Screen name="Estimate" component={EstimateWizardScreen} />
          <RootStack.Screen name="Profiles" component={ProfilesScreen} />
          <RootStack.Screen name="ProfileView" component={ProfileViewScreen} />
          <RootStack.Screen name="ProfileEdit" component={ProfileEditScreen} />
          <RootStack.Screen name="ClientProfileEdit" component={ClientProfileEditScreen} />
          <RootStack.Screen name="ProjectAdd" component={ProjectAddScreen} />
          <RootStack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
          <RootStack.Screen name="AboutUs" component={AboutUsScreen} />
          <RootStack.Screen name="Portfolio" component={PortfolioScreenMain} />
          <RootStack.Screen name="TermsCondition" component={TermsConditionScreen} />
          <RootStack.Screen name="RateApp" component={RateAppScreen} />
        </RootStack.Navigator>
      </View>
      <BottomNavComponent />
      <NavigationDrawer
        visible={drawerVisible}
        onClose={closeDrawer}
        onNavigate={handleDrawerNavigation}
      />
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
