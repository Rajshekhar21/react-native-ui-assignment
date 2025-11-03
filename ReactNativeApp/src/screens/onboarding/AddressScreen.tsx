import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import { Colors } from '../../styles/colors';
import { onboardingStore } from '../../store/onboardingStore';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader';
import { submitVendorBasicInfo } from '../../services/vendorService';

type AddressScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Address'>;

interface Props {
  navigation: AddressScreenNavigationProp;
}

const AddressScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser, token, authProvider } = useAuth();
  const [formData, setFormData] = useState({
    buildingName: '',
    street: '',
    streetName: '',
    zipCode: '',
    city: 'Dehradun',
    state: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = onboardingStore.getData();
    if (data?.address) {
      setFormData(prev => ({
        ...prev,
        buildingName: data.address.building || prev.buildingName,
        street: data.address.street || prev.street,
        zipCode: data.address.pincode || prev.zipCode,
        city: data.address.city || prev.city,
        state: data.address.state || prev.state,
      }));
    }
  }, []);

  const cityOptions = [
    { label: 'Dehradun', value: 'Dehradun' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Bangalore', value: 'Bangalore' },
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Kolkata', value: 'Kolkata' },
  ];

  const stateOptions = [
    { label: 'Uttarakhand', value: 'Uttarakhand' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Tamil Nadu', value: 'Tamil Nadu' },
    { label: 'West Bengal', value: 'West Bengal' },
  ];

  const handleContinue = async () => {
    try {
      if (!formData.buildingName || !formData.street || !formData.zipCode || !formData.state) {
        Alert.alert('Missing information', 'Please complete your address details to continue.');
        return;
      }

      setIsSubmitting(true);

      await updateUser({
        profile: {
          ...user?.profile,
          address: {
            buildingName: formData.buildingName,
            street: formData.street,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
        },
      });

      await onboardingStore.setAddress({
        building: formData.buildingName,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        pincode: formData.zipCode,
      });

      const data = onboardingStore.getData();

      if (!data?.businessDetails) {
        throw new Error('Business details missing. Please complete the previous step.');
      }

      const firebaseUid = token || user?.id;
      if (!firebaseUid) {
        throw new Error('Authentication token missing. Please login again.');
      }

      const payload = {
        firebaseUid,
        authProvider: authProvider || 'email',
        googlePhotoURL: user?.profileImage || null,
        fullName: data.businessDetails.fullName || data.userDetails?.name || '',
        companyName: data.businessDetails.companyName,
        phone: data.businessDetails.phoneNumber || data.userDetails?.phone || '',
        email: data.businessDetails.businessEmail || data.userDetails?.email || '',
        address: data.businessDetails.businessAddress || `${formData.buildingName}, ${formData.street}`,
        location: {
          street: formData.streetName || formData.street,
          buildingName: formData.buildingName,
          zip: formData.zipCode,
          city: formData.city,
          state: formData.state,
        },
        title: data.businessDetails.title,
        license: data.businessDetails.license,
        about: data.businessDetails.about,
        profileImageUri: data.uploadedFiles.profileImage,
        coverImageUri: data.uploadedFiles.coverImage,
      };

      await submitVendorBasicInfo(payload);

      navigation.navigate('ProfessionalProfile');
    } catch (error: any) {
      console.error('Error updating address:', error);
      Alert.alert('Failed', error.message || 'Unable to save address at the moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (!isSubmitting) {
      setFormData(prev => ({
        buildingName: prev.buildingName || 'Business Address',
        street: prev.street || 'Main Street',
        streetName: prev.streetName || prev.street || 'Main Street',
        zipCode: prev.zipCode || '000000',
        city: prev.city || 'Dehradun',
        state: prev.state || 'Uttarakhand',
      }));

      setTimeout(() => {
        handleContinue();
      }, 0);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.screen}>
      <OnboardingProgressHeader
        title="Business Address"
        subtitle="Enter location details so clients know where you operate."
        step={2}
        totalSteps={5}
      />
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formCard}>
          <CustomButton
            title="Select Live Location"
            onPress={() => Alert.alert('Location Services', 'This feature will let you pick your live location soon.')}
            variant="secondary"
            style={styles.locationButton}
            textStyle={{ color: Colors.onboardingAccent }}
          />

          <CustomInput
            label="Building Name"
            placeholder="Enter building name"
            value={formData.buildingName}
            onChangeText={(value) => handleInputChange('buildingName', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Street"
            placeholder="Enter street"
            value={formData.street}
            onChangeText={(value) => handleInputChange('street', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Street Name"
            placeholder="Enter street name"
            value={formData.streetName}
            onChangeText={(value) => handleInputChange('streetName', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="ZIP Code"
            placeholder="Enter ZIP code"
            value={formData.zipCode}
            onChangeText={(value) => handleInputChange('zipCode', value)}
            keyboardType="numeric"
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="City"
            placeholder="Select city"
            options={cityOptions}
            selectedValue={formData.city}
            onValueChange={(value) => handleInputChange('city', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="State"
            placeholder="Select state"
            options={stateOptions}
            selectedValue={formData.state}
            onValueChange={(value) => handleInputChange('state', value)}
            accentColor={Colors.onboardingAccent}
          />
        </View>

        <View style={styles.footerActions}>
          <CustomButton
            title="Back"
            onPress={() => navigation.goBack()}
            variant="outline"
            style={[styles.outlineButton, { borderColor: Colors.onboardingAccent }]}
            textStyle={{ color: Colors.onboardingAccent }}
          />
          <CustomButton
            title={isSubmitting ? 'Saving...' : 'Skip & Save'}
            onPress={handleSkip}
            variant="secondary"
            style={styles.skipButton}
            textStyle={{ color: Colors.onboardingAccent }}
            disabled={isSubmitting}
          />
          <CustomButton
            title={isSubmitting ? 'Saving...' : 'Continue'}
            onPress={handleContinue}
            variant="onboarding"
            style={styles.primaryButton}
            disabled={isSubmitting}
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
  locationButton: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.onboardingAccent,
    backgroundColor: Colors.onboardingAccentLight,
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

export default AddressScreen;
