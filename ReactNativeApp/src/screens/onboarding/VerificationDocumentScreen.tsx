import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import { onboardingStore } from '../../store/onboardingStore';
import { completeVendorVerificationStep } from '../../services/vendorService';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import UploadButton from '../../components/UploadButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { pickImageFromGallery } from '../../services/uploadService';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader';

type VerificationDocumentScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'VerificationDocument'>;

interface Props {
  navigation: VerificationDocumentScreenNavigationProp;
}

const VerificationDocumentScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser, completeOnboarding } = useAuth();
  const [formData, setFormData] = useState({
    projectLocation: '',
    businessWebsite: '',
    linkedinUrl: '',
    facebookUrl: '',
    youtubeUrl: '',
    xUrl: '',
    documentType: '',
  });
  const [documentUri, setDocumentUri] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectLocationOptions = [
    { label: 'Dehradun', value: 'Dehradun' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Bangalore', value: 'Bangalore' },
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Kolkata', value: 'Kolkata' },
  ];

  const documentTypeOptions = [
    { label: 'Business License', value: 'business_license' },
    { label: 'GST Certificate', value: 'gst_certificate' },
    { label: 'Tax Document', value: 'tax_document' },
    { label: 'Other', value: 'other' },
  ];

  useEffect(() => {
    const data = onboardingStore.getData();
    if (data?.verification) {
      setFormData(prev => ({
        ...prev,
        projectLocation: data.verification.projectLocation || prev.projectLocation,
        documentType: data.verification.documentType || prev.documentType,
      }));
      if (data.verification.documentImage) {
        setDocumentUri(data.verification.documentImage);
      }
    }

    if (data?.socialLinks) {
      setFormData(prev => ({
        ...prev,
        businessWebsite: data.socialLinks?.businessWebsite || prev.businessWebsite,
        linkedinUrl: data.socialLinks?.linkedin || prev.linkedinUrl,
        facebookUrl: data.socialLinks?.facebook || prev.facebookUrl,
        youtubeUrl: data.socialLinks?.youtube || prev.youtubeUrl,
        xUrl: data.socialLinks?.x || prev.xUrl,
      }));
    }
  }, []);

  const handleContinue = async () => {
    if (!formData.documentType) {
      Alert.alert('Missing information', 'Please select a document type.');
      return;
    }

    try {
      setIsSubmitting(true);

      await onboardingStore.setVerification({
        documentType: formData.documentType,
        documentImage: documentUri || '',
        projectLocation: formData.projectLocation,
      });

      await onboardingStore.setSocialLinks({
        businessWebsite: formData.businessWebsite,
        linkedin: formData.linkedinUrl,
        facebook: formData.facebookUrl,
        youtube: formData.youtubeUrl,
        x: formData.xUrl,
      });

      await updateUser({
        profile: {
          ...user?.profile,
          verificationDocuments: [
            ...(user?.profile?.verificationDocuments || []),
            {
              id: Date.now().toString(),
              type: formData.documentType,
              url: documentUri || '',
              uploadedAt: new Date().toISOString(),
            },
          ],
        },
      });

      await completeVendorVerificationStep({
        documentType: formData.documentType,
        documentImageUri: documentUri,
        projectLocation: formData.projectLocation,
        businessWebsite: formData.businessWebsite,
        linkedin: formData.linkedinUrl,
        facebook: formData.facebookUrl,
        youtube: formData.youtubeUrl,
        x: formData.xUrl,
        isJoinCompleted: true,
      });

      await completeOnboarding();
    } catch (error: any) {
      console.error('Error completing onboarding:', error);
      Alert.alert('Failed', error.message || 'Unable to finish onboarding right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (!isSubmitting) {
      setFormData(prev => ({
        ...prev,
        documentType: prev.documentType || documentTypeOptions[0].value,
        projectLocation: prev.projectLocation || projectLocationOptions[0].value,
      }));

      setTimeout(() => {
        handleContinue();
      }, 0);
    }
  };

  const handleUploadDocument = async () => {
    try {
      const uri = await pickImageFromGallery({ mediaType: 'photo' });
      setDocumentUri(uri);
      await onboardingStore.setUploadedFiles({ documentImage: uri });
    } catch (error) {
      console.log('Document upload cancelled or failed:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.screen}>
      <OnboardingProgressHeader
        title="Verification"
        subtitle="Complete your profile with documents and social links."
        step={5}
        totalSteps={5}
      />
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Upload Document</Text>
            <UploadButton
              title="Upload Document"
              onPress={handleUploadDocument}
              imageUri={documentUri}
            />
          </View>

          <CustomDropdown
            label="Document Type"
            placeholder="Select document type"
            options={documentTypeOptions}
            selectedValue={formData.documentType}
            onValueChange={(value) => handleInputChange('documentType', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="Project Location"
            placeholder="Choose your project location"
            options={projectLocationOptions}
            selectedValue={formData.projectLocation}
            onValueChange={(value) => handleInputChange('projectLocation', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Business Website"
            placeholder="https://yourwebsite.com"
            value={formData.businessWebsite}
            onChangeText={(value) => handleInputChange('businessWebsite', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="LinkedIn URL"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedinUrl}
            onChangeText={(value) => handleInputChange('linkedinUrl', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Facebook URL"
            placeholder="https://facebook.com/yourpage"
            value={formData.facebookUrl}
            onChangeText={(value) => handleInputChange('facebookUrl', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="YouTube URL"
            placeholder="https://youtube.com/yourchannel"
            value={formData.youtubeUrl}
            onChangeText={(value) => handleInputChange('youtubeUrl', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="X (Twitter) URL"
            placeholder="https://x.com/yourhandle"
            value={formData.xUrl}
            onChangeText={(value) => handleInputChange('xUrl', value)}
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
            title={isSubmitting ? 'Finishing...' : 'Skip & Save'}
            onPress={handleSkip}
            variant="secondary"
            style={styles.skipButton}
            textStyle={{ color: Colors.onboardingAccent }}
            disabled={isSubmitting}
          />
          <CustomButton
            title={isSubmitting ? 'Finishing...' : 'Complete Onboarding'}
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
  uploadSection: {
    gap: 12,
  },
  uploadLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
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

export default VerificationDocumentScreen;
