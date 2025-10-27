import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import CategoryListScreen from '../screens/CategoryListScreen';
import ProductListingScreen from '../screens/ProductListingScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

// Profile Screens
import ProfileViewScreen from '../screens/profile/ProfileViewScreen';
import ProfileEditScreen from '../screens/profile/ProfileEditScreen';
import ClientProfileEditScreen from '../screens/profile/ClientProfileEditScreen';
import ProjectAddScreen from '../screens/profile/ProjectAddScreen';
import ProjectDetailScreen from '../screens/profile/ProjectDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  CategoryList: undefined;
  ProductListing: { category: string };
  ProductDetail: { productId: string };
  ProfileView: undefined;
  ProfileEdit: undefined;
  ClientProfileEdit: undefined;
  ProjectAdd: undefined;
  ProjectDetail: { projectId: string };
};

const RootStack = createStackNavigator<RootStackParamList>();

const SimpleAppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
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
          options={{ title: 'Categories' }}
        />
        <RootStack.Screen 
          name="ProductListing" 
          component={ProductListingScreen}
          options={({ route }) => ({ title: route.params.category })}
        />
        <RootStack.Screen 
          name="ProductDetail" 
          component={ProductDetailScreen}
          options={{ title: 'Product Details' }}
        />
        <RootStack.Screen 
          name="ProfileView" 
          component={ProfileViewScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ProfileEdit" 
          component={ProfileEditScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ClientProfileEdit" 
          component={ClientProfileEditScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ProjectAdd" 
          component={ProjectAddScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen 
          name="ProjectDetail" 
          component={ProjectDetailScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default SimpleAppNavigator;
