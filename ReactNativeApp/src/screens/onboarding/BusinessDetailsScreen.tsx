import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import { onboardingStore } from '../../store/onboardingStore';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import UploadButton from '../../components/UploadButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { pickImageFromGallery } from '../../services/uploadService';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader';

type BusinessDetailsScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'BusinessDetails'>;

interface Props {
  navigation: BusinessDetailsScreenNavigationProp;
}

const BusinessDetailsScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    companyName: '',
    phoneNumber: user?.phone || '',
    businessEmail: '',
    businessAddress: '',
    title: '',
    license: '',
    about: '',
  });
  const [logoUri, setLogoUri] = useState<string | undefined>();
  const [coverUri, setCoverUri] = useState<string | undefined>();
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const hydrateStore = async () => {
      let data = onboardingStore.getData();

      if (!data) {
        await onboardingStore.setAccountType('vendor');
        data = onboardingStore.getData();
      }

      if (data?.businessDetails) {
        setFormData(prev => ({
          ...prev,
          fullName: data.businessDetails.fullName || prev.fullName,
          companyName: data.businessDetails.companyName || prev.companyName,
          businessEmail: data.businessDetails.businessEmail || prev.businessEmail,
          businessAddress: data.businessDetails.businessAddress || prev.businessAddress,
          phoneNumber: data.businessDetails.phoneNumber || prev.phoneNumber,
          title: data.businessDetails.title || prev.title,
          license: data.businessDetails.license || prev.license,
          about: data.businessDetails.about || prev.about,
        }));
      }

      if (data?.userDetails) {
        setFormData(prev => ({
          ...prev,
          fullName: data.userDetails.name || prev.fullName,
          phoneNumber: data.userDetails.phone || prev.phoneNumber,
          businessEmail: data.userDetails.email || prev.businessEmail,
        }));
      }

      if (data?.uploadedFiles.profileImage) {
        setLogoUri(data.uploadedFiles.profileImage);
      }

      if (data?.uploadedFiles.coverImage) {
        setCoverUri(data.uploadedFiles.coverImage);
      }
    };

    hydrateStore();
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

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

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.license.trim()) {
      errors.license = 'License is required';
    }

    if (!formData.about.trim()) {
      errors.about = 'Tell us about your business';
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
      await onboardingStore.setUserDetails({
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.businessEmail,
      });

      await onboardingStore.setBusinessDetails({
        fullName: formData.fullName,
        companyName: formData.companyName,
        businessEmail: formData.businessEmail,
        businessAddress: formData.businessAddress,
        phoneNumber: formData.phoneNumber,
        title: formData.title,
        license: formData.license,
        about: formData.about,
      });

      await onboardingStore.setUploadedFiles({
        profileImage: logoUri,
        coverImage: coverUri,
      });

      navigation.navigate('Address');
    } catch (error) {
      console.error('Error updating business details:', error);
      Alert.alert('Failed', 'Could not save business details. Please try again.');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Address');
  };

  const handleUploadLogo = async () => {
    try {
      const uri = await pickImageFromGallery();
      setLogoUri(uri);
      await onboardingStore.setUploadedFiles({ profileImage: uri });
    } catch (error) {
      console.log('Logo upload cancelled or failed:', error);
    }
  };

  const handleUploadCover = async () => {
    try {
      const uri = await pickImageFromGallery();
      setCoverUri(uri);
      await onboardingStore.setUploadedFiles({ coverImage: uri });
    } catch (error) {
      console.log('Cover upload cancelled or failed:', error);
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
        title="Join Us"
        subtitle="Complete your business profile"
        step={1}
        totalSteps={5}
      />
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            label="Company/Brand Name"
            placeholder="Enter your company name"
            value={formData.companyName}
            onChangeText={(value) => handleInputChange('companyName', value)}
            error={validationErrors.companyName}
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
            label="Business Email"
            placeholder="Enter your business email"
            value={formData.businessEmail}
            onChangeText={(value) => handleInputChange('businessEmail', value)}
            keyboardType="email-address"
            error={validationErrors.businessEmail}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Business Address"
            placeholder="Enter your business address"
            value={formData.businessAddress}
            onChangeText={(value) => handleInputChange('businessAddress', value)}
            multiline
            numberOfLines={3}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Professional Title"
            placeholder="e.g. Principal Designer"
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
            error={validationErrors.title}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Business License"
            placeholder="Enter your business license"
            value={formData.license}
            onChangeText={(value) => handleInputChange('license', value)}
            error={validationErrors.license}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="About Your Business"
            placeholder="Share a short description of your services"
            value={formData.about}
            onChangeText={(value) => handleInputChange('about', value)}
            multiline
            numberOfLines={3}
            error={validationErrors.about}
            accentColor={Colors.onboardingAccent}
          />

          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Profile Photo / Company Logo</Text>
            <UploadButton
              title="Upload from Gallery"
              onPress={handleUploadLogo}
              imageUri={logoUri}
            />
          </View>

          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Cover Image</Text>
            <UploadButton
              title="Upload from Gallery"
              onPress={handleUploadCover}
              imageUri={coverUri}
            />
          </View>
        </View>

        <View style={styles.footerActions}>
          <CustomButton
            title="Back"
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('AccountType');
              }
            }}
            variant="outline"
            style={[styles.outlineButton, { borderColor: Colors.onboardingAccent }]}
            textStyle={{ color: Colors.onboardingAccent }}
          />

          <CustomButton
            title="Skip & Save"
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
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  footerActions: {
    marginTop: 28,
    gap: 12,
  },
  outlineButton: {
    borderRadius: 14,
    borderWidth: 1.5,
    backgroundColor: Colors.background,
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

export default BusinessDetailsScreen;
