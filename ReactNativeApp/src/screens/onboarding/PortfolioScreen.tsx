import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import UploadButton from '../../components/UploadButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';
import { onboardingStore } from '../../store/onboardingStore';
import OnboardingProgressHeader from '../../components/OnboardingProgressHeader';
import { pickImageFromGallery } from '../../services/uploadService';
import { updateVendorPortfolioDetails } from '../../services/vendorService';

type PortfolioScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Portfolio'>;

interface Props {
  navigation: PortfolioScreenNavigationProp;
}

const PortfolioScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    projectName: '',
    projectLocation: '',
    projectType: '',
    description: '',
  });
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectTypeOptions = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Office', value: 'office' },
    { label: 'Retail', value: 'retail' },
    { label: 'Hospitality', value: 'hospitality' },
    { label: 'Healthcare', value: 'healthcare' },
  ];

  useEffect(() => {
    const data = onboardingStore.getData();
    if (data?.portfolio?.length) {
      const project = data.portfolio[0];
      setFormData({
        projectName: project.projectName,
        projectLocation: project.projectLocation,
        projectType: project.projectType,
        description: project.projectDescription,
      });
      setGalleryImages(project.images || []);
    }

    if (data?.uploadedFiles.portfolioImages?.length) {
      setGalleryImages(data.uploadedFiles.portfolioImages);
    }
  }, []);

  const handleContinue = async () => {
    if (!formData.projectName || !formData.projectLocation || !formData.projectType || !formData.description) {
      Alert.alert('Missing information', 'Please complete project details to continue.');
      return;
    }

    try {
      setIsSubmitting(true);

      const portfolioItem = {
        projectName: formData.projectName,
        projectLocation: formData.projectLocation,
        projectType: formData.projectType,
        projectDescription: formData.description,
        images: galleryImages,
      };

      await updateUser({
        profile: {
          ...user?.profile,
          portfolio: [
            {
              id: Date.now().toString(),
              ...portfolioItem,
            },
          ],
        },
      });

      await onboardingStore.setPortfolioProjects([{ ...portfolioItem }]);
      await onboardingStore.setUploadedFiles({ portfolioImages: galleryImages });

      await updateVendorPortfolioDetails({
        projectName: formData.projectName,
        projectLocation: formData.projectLocation,
        projectType: formData.projectType,
        projectDescription: formData.description,
        portfolioImageUris: galleryImages,
      });

      navigation.navigate('VerificationDocument');
    } catch (error) {
      console.error('Error updating portfolio:', error);
      Alert.alert('Failed', 'Unable to save portfolio at the moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = () => {
    if (isSubmitting) {
      return;
    }

    setFormData(prev => ({
      projectName: prev.projectName || 'Sample Project',
      projectLocation: prev.projectLocation || 'Not specified',
      projectType: prev.projectType || projectTypeOptions[0].value,
      description: prev.description || 'Portfolio details to be updated soon.',
    }));

    setTimeout(() => {
      handleContinue();
    }, 0);
  };

  const handleUploadGallery = async () => {
    try {
      const uri = await pickImageFromGallery();
      setGalleryImages(prev => {
        const updated = [...prev, uri];
        onboardingStore.setUploadedFiles({ portfolioImages: updated });
        return updated;
      });
    } catch (error) {
      console.log('Gallery upload cancelled or failed:', error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setGalleryImages(prev => {
      const updated = prev.filter((_, i) => i !== index);
      onboardingStore.setUploadedFiles({ portfolioImages: updated });
      return updated;
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.screen}>
      <OnboardingProgressHeader
        title="Portfolio"
        subtitle="Showcase a highlight project to impress potential clients."
        step={4}
        totalSteps={5}
      />
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <CustomInput
            label="Project Name"
            placeholder="Enter project name"
            value={formData.projectName}
            onChangeText={(value) => handleInputChange('projectName', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Project Location"
            placeholder="Enter project location"
            value={formData.projectLocation}
            onChangeText={(value) => handleInputChange('projectLocation', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomDropdown
            label="Project Type"
            placeholder="Select project type"
            options={projectTypeOptions}
            selectedValue={formData.projectType}
            onValueChange={(value) => handleInputChange('projectType', value)}
            accentColor={Colors.onboardingAccent}
          />

          <CustomInput
            label="Project Description"
            placeholder="Describe your project"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={4}
            accentColor={Colors.onboardingAccent}
          />

          <View style={styles.uploadSection}>
            <Text style={styles.uploadLabel}>Project Gallery</Text>
            <UploadButton title="Upload from Gallery" onPress={handleUploadGallery} />
            {galleryImages.length > 0 && (
              <View style={styles.previewContainer}>
                {galleryImages.map((uri, index) => (
                  <TouchableOpacity key={`${uri}-${index}`} onPress={() => handleRemoveImage(index)}>
                    <Image source={{ uri }} style={styles.previewImage} />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
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
  uploadSection: {
    marginTop: 10,
    gap: 12,
  },
  uploadLabel: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  previewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
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

export default PortfolioScreen;
