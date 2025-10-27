import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import { onboardingStore } from '../../store/onboardingStore';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type AccountTypeScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'AccountType'>;

interface Props {
  navigation: AccountTypeScreenNavigationProp;
}

const AccountTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { updateUserRole, isLoading, logout } = useAuth();
  const [selectedType, setSelectedType] = useState<'user' | 'vendor' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    if (__DEV__) {
      console.log('🔙 handleBack called');
    }
    Alert.alert(
      'Exit Onboarding?',
      'Are you sure you want to exit? You will be logged out and need to sign in again.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            if (__DEV__) {
              console.log('❌ User cancelled logout');
            }
          },
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: async () => {
            if (__DEV__) {
              console.log('✅ User confirmed logout, logging out...');
            }
            try {
              await logout();
              if (__DEV__) {
                console.log('✅ Logout successful');
              }
              // Navigation will be handled by AuthContext logout
            } catch (error) {
              console.error('❌ Error during logout:', error);
            }
          },
        },
      ]
    );
  };

  const handleSelectType = (type: 'user' | 'vendor') => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType) return;
    
    try {
      setIsProcessing(true);
      
      if (__DEV__) {
        console.log('🎯 handleContinue called, selectedType:', selectedType);
      }
      
      // Store account type in onboarding store
      await onboardingStore.setAccountType(selectedType);
      
      if (__DEV__) {
        console.log('✅ Account type stored in onboarding store');
      }
      
      // If user selects vendor, update their role in the backend
      if (selectedType === 'vendor') {
        if (__DEV__) {
          console.log('🏢 Updating user role to vendor...');
        }
        await updateUserRole('vendor');
        if (__DEV__) {
          console.log('✅ User role updated to vendor, navigating to BusinessDetails');
        }
        // Navigate to vendor onboarding screens
        navigation.navigate('BusinessDetails');
      } else {
        if (__DEV__) {
          console.log('👤 Navigating to UserDetails for client');
        }
        // Navigate to user details for regular users
        navigation.navigate('UserDetails');
      }
    } catch (error: any) {
      console.error('❌ Error updating account type:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to update account type. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const accountTypes = [
    {
      id: 'user',
      title: 'Client',
      description: 'Looking for interior design services',
      icon: '👤',
    },
    {
      id: 'vendor',
      title: 'Professional',
      description: 'Provide interior design services',
      icon: '🏢',
    },
  ];

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Join Us"
        subtitle="Tell us about yourself, what type of account would you like to create?"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.cardsContainer}>
            {accountTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.card,
                  selectedType === type.id && styles.cardSelected
                ]}
                onPress={() => handleSelectType(type.id as 'user' | 'vendor')}
                activeOpacity={0.8}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.cardTitle,
                    selectedType === type.id && styles.cardTitleSelected
                  ]}>
                    {type.title}
                  </Text>
                  <Text style={[
                    styles.cardDescription,
                    selectedType === type.id && styles.cardDescriptionSelected
                  ]}>
                    {type.description}
                  </Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Text style={[
                    styles.arrow,
                    selectedType === type.id && styles.arrowSelected
                  ]}>
                    →
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.navigationContainer}>
            <CustomButton
              title={isProcessing ? "Processing..." : "Continue"}
              onPress={handleContinue}
              disabled={!selectedType || isProcessing || isLoading}
              style={styles.continueButton}
            />
            
            <TouchableOpacity 
              style={styles.backToLoginButton}
              onPress={handleBack}
            >
              <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  formContainer: {
    flex: 1,
  },
  cardsContainer: {
    marginBottom: 40,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.backgroundSecondary,
  },
  cardContent: {
    flex: 1,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  cardTitleSelected: {
    color: Colors.primary,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  cardDescriptionSelected: {
    color: Colors.textPrimary,
  },
  arrowContainer: {
    marginLeft: 16,
  },
  arrow: {
    fontSize: 20,
    color: Colors.textTertiary,
  },
  arrowSelected: {
    color: Colors.primary,
  },
  navigationContainer: {
    paddingBottom: 20,
  },
  continueButton: {
    marginBottom: 20,
  },
  backToLoginButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backToLoginText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default AccountTypeScreen;
