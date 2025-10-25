import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type UserDetailsScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'UserDetails'>;

interface Props {
  navigation: UserDetailsScreenNavigationProp;
}

const UserDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phoneNumber: user?.phone || '81265 28355',
    email: user?.email || '',
    lookingFor: '',
    suitableOption: '',
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

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
    const errors: {[key: string]: string} = {};
    
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
      
      if (user?.accountType === 'business') {
        navigation.navigate('BusinessDetails');
      } else {
        navigation.navigate('ProfessionalProfile');
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const handleSkip = () => {
    if (user?.accountType === 'business') {
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
    <View style={styles.container}>
      <AuthHeader 
        title="Details"
        subtitle="Tell us more about yourself"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChangeText={(value) => handleInputChange('fullName', value)}
            error={validationErrors.fullName}
          />

          <CustomInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            keyboardType="phone-pad"
            error={validationErrors.phoneNumber}
          />

          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            error={validationErrors.email}
          />

          <CustomDropdown
            label="What are you looking for?"
            placeholder="Select what you're looking for"
            options={lookingForOptions}
            selectedValue={formData.lookingFor}
            onValueChange={(value) => handleInputChange('lookingFor', value)}
          />

          <CustomDropdown
            label="Select Suitable Option"
            placeholder="Choose your preference"
            options={suitableOptions}
            selectedValue={formData.suitableOption}
            onValueChange={(value) => handleInputChange('suitableOption', value)}
          />

          <View style={styles.navigationContainer}>
            <CustomButton
              title="Back"
              onPress={() => navigation.goBack()}
              variant="secondary"
              style={styles.backButton}
            />
            <CustomButton
              title="Skip & Save"
              onPress={handleSkip}
              style={styles.skipButton}
            />
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
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    marginRight: 8,
  },
  skipButton: {
    flex: 2,
    marginLeft: 8,
  },
});

export default UserDetailsScreen;
