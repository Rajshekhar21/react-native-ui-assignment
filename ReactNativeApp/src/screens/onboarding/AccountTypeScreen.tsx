import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import { onboardingStore } from '../../store/onboardingStore';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader';

type AccountTypeScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'AccountType'>;

interface Props {
  navigation: AccountTypeScreenNavigationProp;
}

const accountTypeIcons = {
  user: require('../../../assets/images/individualjoinus.png'),
  vendor: require('../../../assets/images/businessjoinus.png'),
};

const AccountTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { updateUserRole, isLoading, logout } = useAuth();
  const [selectedType, setSelectedType] = useState<'user' | 'vendor' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    Alert.alert(
      'Exit Onboarding?',
      'Are you sure you want to exit? You will be logged out and need to sign in again.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch (error) {
              console.error('❌ Error during logout:', error);
            }
          },
        },
      ],
    );
  };

  const handleSelectType = (type: 'user' | 'vendor') => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType) return;

    try {
      setIsProcessing(true);
      await onboardingStore.setAccountType(selectedType);

      if (selectedType === 'vendor') {
        await updateUserRole('vendor');
        navigation.navigate('BusinessDetails');
      } else {
        navigation.navigate('UserDetails');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to update account type. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const accountTypes = [
    {
      id: 'user',
      title: 'Individual',
      description: 'Personal account to manage all your activities.',
      arrowColor: Colors.onboardingAccent,
      icon: accountTypeIcons.user,
    },
    {
      id: 'vendor',
      title: 'Business',
      description: 'Own or belong to a company? This is for you.',
      arrowColor: Colors.onboardingProgressActive,
      icon: accountTypeIcons.vendor,
    },
  ];

  return (
    <View style={styles.screen}>
      <OnboardingProgressHeader
        title="Join Us"
        subtitle="To begin this journey, tell us what type of account you'd be opening."
        hideProgress
      />
      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.cardContainer}>
          {accountTypes.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <TouchableOpacity
                key={type.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => handleSelectType(type.id as 'user' | 'vendor')}
                activeOpacity={0.85}
              >
                <View style={styles.cardTextWrapper}>
                  <Image source={type.icon} style={styles.cardIcon} resizeMode="contain" />
                  <Text style={[styles.cardTitle, isSelected && styles.cardTitleSelected]}>{type.title}</Text>
                  <Text style={[styles.cardDescription, isSelected && styles.cardDescriptionSelected]}>{type.description}</Text>
                </View>
                <View style={[styles.cardArrow, { backgroundColor: isSelected ? Colors.onboardingAccent : Colors.backgroundSecondary }]}> 
                  <Text style={[styles.cardArrowIcon, { color: isSelected ? Colors.textWhite : type.arrowColor }]}>→</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.actions}>
          <CustomButton
            title={isProcessing ? 'Processing...' : 'Continue'}
            onPress={handleContinue}
            disabled={!selectedType || isProcessing || isLoading}
            variant="onboarding"
            style={styles.primaryButton}
          />

          <TouchableOpacity style={styles.backLink} onPress={handleBack}>
            <Text style={styles.backLinkText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundSecondary,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    gap: 16,
    marginTop: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  cardSelected: {
    borderColor: Colors.onboardingAccent,
    backgroundColor: Colors.onboardingAccentLight,
  },
  cardTextWrapper: {
    flex: 1,
  },
  cardIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  cardTitleSelected: {
    color: Colors.onboardingAccent,
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
  cardArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  cardArrowIcon: {
    fontSize: 18,
    fontFamily: Fonts.bold,
  },
  actions: {
    marginTop: 32,
  },
  primaryButton: {
    borderRadius: 14,
  },
  backLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  backLinkText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
});

export default AccountTypeScreen;
