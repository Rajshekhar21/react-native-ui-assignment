import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import UploadButton from '../../components/UploadButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type BusinessDetailsScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'BusinessDetails'>;

interface Props {
  navigation: BusinessDetailsScreenNavigationProp;
}

const BusinessDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    companyName: '',
    phoneNumber: user?.phone || '81265 28355',
    businessEmail: '',
    businessAddress: '',
  });
  const [logoUri, setLogoUri] = useState<string | undefined>();
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!formData.companyName.trim()) {
      errors.companyName = 'Company name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    }
    
    if (!formData.businessEmail.trim()) {
      errors.businessEmail = 'Business email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.businessEmail)) {
      errors.businessEmail = 'Please enter a valid email';
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
        profile: {
          ...user?.profile,
          companyName: formData.companyName,
          businessEmail: formData.businessEmail,
          address: {
            ...user?.profile?.address,
            buildingName: formData.businessAddress,
          },
        },
      });
      
      navigation.navigate('ProfessionalProfile');
    } catch (error) {
      console.error('Error updating business details:', error);
    }
  };

  const handleSkip = () => {
    navigation.navigate('ProfessionalProfile');
  };

  const handleUploadLogo = () => {
    // TODO: Implement image picker
    console.log('Upload logo');
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
        title="Join Us"
        subtitle="Complete your business profile"
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
            label="Company/Brand Name"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChangeText={(value) => handleInputChange('companyName', value)}
            error={validationErrors.companyName}
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
            label="Business Email"
            placeholder="Enter your business email"
            value={formData.businessEmail}
            onChangeText={(value) => handleInputChange('businessEmail', value)}
            keyboardType="email-address"
            error={validationErrors.businessEmail}
          />

          <CustomInput
            label="Enter Business Address"
            placeholder="Enter your business address"
            value={formData.businessAddress}
            onChangeText={(value) => handleInputChange('businessAddress', value)}
            multiline
            numberOfLines={3}
          />

          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Upload Photo/Company/Logo</Text>
            <UploadButton
              title="Upload Photo/Company/Logo"
              onPress={handleUploadLogo}
              imageUri={logoUri}
            />
          </View>

          <View style={styles.navigationContainer}>
            <CustomButton
              title="Back"
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  navigation.navigate('AccountType');
                }
              }}
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
  uploadContainer: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
    marginBottom: 8,
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

export default BusinessDetailsScreen;
