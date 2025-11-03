import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import { Colors } from '../../styles/colors';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader';

 type UserDetailsScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'UserDetails'>;

interface Props {
  navigation: UserDetailsScreenNavigationProp;
}

const UserDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phoneNumber: user?.phone || '',
    email: user?.email || '',
    lookingFor: '',
    suitableOption: '',
  });
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const lookingForOptions = [
    { label: 'Interior Design Services', value: 'interior_design' },
    { label: 'Architecture Services', value: 'architecture' },
    { label: 'Home Renovation', value: 'renovation' },
    { label: 'Commercial Design', value: 'commercial' },
    { label: 'Furniture & Decor', value: 'furniture' },
  ];

  const suitableOptions = [
    { label: 'Budget Friendly', value: 'budget' },
    { label: 'Premium Quality', value: 'premium' },
    { label: 'Eco-Friendly', value: 'eco_friendly' },
    { label: 'Modern Style', value: 'modern' },
    { label: 'Traditional Style', value: 'traditional' },
  ];

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;

    try {
      await updateUser({
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
      });

      if (user?.role === 'vendor') {
        navigation.navigate('BusinessDetails');
      } else {
        navigation.navigate('ProfessionalProfile');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleSkip = () => {
    if (user?.role === 'vendor') {
      navigation.navigate('BusinessDetails');
    } else {
      navigation.navigate('ProfessionalProfile');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.screen}>
      <OnboardingProgressHeader
        title="Tell Us About You"
        subtitle="Share your contact details so we can stay in touch."
        hideProgress
      />
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
            error={validationErrors.fullName}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            keyboardType="phone-pad"
            error={validationErrors.phoneNumber}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            error={validationErrors.email}
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="What are you looking for?"
            placeholder="Select an option"
            options={lookingForOptions}
            selectedValue={formData.lookingFor}
            onValueChange={(value) => handleInputChange('lookingFor', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="What suits you best?"
            placeholder="Select an option"
            options={suitableOptions}
            selectedValue={formData.suitableOption}
            onValueChange={(value) => handleInputChange('suitableOption', value)}
            accentColor={Colors.onboardingAccent}
          />
        </View>

        <View style={styles.footerActions}>
          <CustomButton
            title="Skip"
            onPress={handleSkip}
            variant="secondary"
            style={styles.skipButton}
            textStyle={{ color: Colors.onboardingAccent }}
          />
          <CustomButton
            title="Continue"
            onPress={handleContinue}
            variant="onboarding"
            style={styles.primaryButton}
          />
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
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 3,
    gap: 16,
  },
  footerActions: {
    marginTop: 28,
    gap: 12,
  },
  skipButton: {
    borderRadius: 14,
    backgroundColor: Colors.onboardingAccentLight,
    borderWidth: 0,
  },
  primaryButton: {
    borderRadius: 14,
  },
});

export default UserDetailsScreen;
