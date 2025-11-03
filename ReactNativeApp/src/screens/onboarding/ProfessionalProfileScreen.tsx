import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { onboardingStore } from '../../store/onboardingStore';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader';
import { updateVendorProfessionalDetails } from '../../services/vendorService';

type ProfessionalProfileScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'ProfessionalProfile'>;

interface Props {
  navigation: ProfessionalProfileScreenNavigationProp;
}

const ProfessionalProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    yearsOfExperience: '',
    specialization: '',
    styleExpertise: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const data = onboardingStore.getData();
    if (data?.professionalProfile) {
      setFormData({
        yearsOfExperience: data.professionalProfile.yearsOfExperience || '',
        specialization: data.professionalProfile.specialization || '',
        styleExpertise: data.professionalProfile.styleExpertise || '',
      });
    }
  }, []);

  const experienceOptions = [
    { label: 'Less than 1 year', value: '0-1' },
    { label: '1-2 years', value: '1-2' },
    { label: '3-5 years', value: '3-5' },
    { label: '6-10 years', value: '6-10' },
    { label: '10+ years', value: '10+' },
  ];

  const specializationOptions = [
    { label: 'Residential Interior Design', value: 'residential' },
    { label: 'Commercial Interior Design', value: 'commercial' },
    { label: 'Kitchen Design', value: 'kitchen' },
    { label: 'Bathroom Design', value: 'bathroom' },
    { label: 'Office Design', value: 'office' },
    { label: 'Retail Design', value: 'retail' },
  ];

  const styleExpertiseOptions = [
    { label: 'Modern', value: 'modern' },
    { label: 'Contemporary', value: 'contemporary' },
    { label: 'Traditional', value: 'traditional' },
    { label: 'Minimalist', value: 'minimalist' },
    { label: 'Scandinavian', value: 'scandinavian' },
    { label: 'Industrial', value: 'industrial' },
    { label: 'Bohemian', value: 'bohemian' },
    { label: 'Rustic', value: 'rustic' },
  ];

  const handleContinue = async () => {
    if (!formData.yearsOfExperience || !formData.specialization || !formData.styleExpertise) {
      Alert.alert('Missing information', 'Please complete all fields to continue.');
      return;
    }

    try {
      setIsSubmitting(true);

      await updateUser({
        profile: {
          ...user?.profile,
          professionalInfo: {
            yearsOfExperience: formData.yearsOfExperience,
            specialization: formData.specialization,
            styleExpertise: formData.styleExpertise ? [formData.styleExpertise] : [],
          },
        },
      });

      await onboardingStore.setProfessionalProfile({
        yearsOfExperience: formData.yearsOfExperience,
        specialization: formData.specialization,
        styleExpertise: formData.styleExpertise,
        categories: [],
        projectTypes: [],
        styles: [formData.styleExpertise],
        languages: [],
        businessHighlights: [],
      });

      await updateVendorProfessionalDetails({
        experience: formData.yearsOfExperience,
        specialization: formData.specialization,
        style: formData.styleExpertise,
      });

      navigation.navigate('Portfolio');
    } catch (error) {
      console.error('Error updating professional profile:', error);
      Alert.alert('Failed', 'Unable to save professional details right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (isSubmitting) {
      return;
    }

    const fallback = {
      yearsOfExperience: formData.yearsOfExperience || experienceOptions[0].value,
      specialization: formData.specialization || specializationOptions[0].value,
      styleExpertise: formData.styleExpertise || styleExpertiseOptions[0].value,
    };

    setFormData(fallback);
    setTimeout(() => {
      handleContinue();
    }, 0);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.screen}>
      <OnboardingProgressHeader
        title="Professional Profile"
        subtitle="Tell us about your expertise so we can match you with the right clients."
        step={3}
        totalSteps={5}
      />
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <CustomDropdown
            label="Years of Experience"
            placeholder="Select your experience level"
            options={experienceOptions}
            selectedValue={formData.yearsOfExperience}
            onValueChange={(value) => handleInputChange('yearsOfExperience', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="Select Specialization"
            placeholder="Choose your specialization"
            options={specializationOptions}
            selectedValue={formData.specialization}
            onValueChange={(value) => handleInputChange('specialization', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="Style Expertise"
            placeholder="Select your style expertise"
            options={styleExpertiseOptions}
            selectedValue={formData.styleExpertise}
            onValueChange={(value) => handleInputChange('styleExpertise', value)}
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

export default ProfessionalProfileScreen;
