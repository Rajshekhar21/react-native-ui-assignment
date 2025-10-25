import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import UploadButton from '../../components/UploadButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

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

  const projectTypeOptions = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Office', value: 'office' },
    { label: 'Retail', value: 'retail' },
    { label: 'Hospitality', value: 'hospitality' },
    { label: 'Healthcare', value: 'healthcare' },
  ];

  const handleContinue = async () => {
    try {
      const portfolioItem = {
        id: Date.now().toString(),
        projectName: formData.projectName,
        projectLocation: formData.projectLocation,
        projectType: formData.projectType,
        description: formData.description,
        images: galleryImages,
      };

      await updateUser({
        profile: {
          ...user?.profile,
          portfolio: [...(user?.profile?.portfolio || []), portfolioItem],
        },
      });
      
      navigation.navigate('Address');
    } catch (error) {
      console.error('Error updating portfolio:', error);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Address');
  };

  const handleUploadGallery = () => {
    // TODO: Implement image picker for multiple images
    console.log('Upload gallery images');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Portfolio"
        subtitle="Showcase your work and projects"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <CustomInput
            label="Project Name"
            placeholder="Enter project name"
            value={formData.projectName}
            onChangeText={(value) => handleInputChange('projectName', value)}
          />

          <CustomInput
            label="Project Location"
            placeholder="Enter project location"
            value={formData.projectLocation}
            onChangeText={(value) => handleInputChange('projectLocation', value)}
          />

          <CustomDropdown
            label="Project Type"
            placeholder="Select project type"
            options={projectTypeOptions}
            selectedValue={formData.projectType}
            onValueChange={(value) => handleInputChange('projectType', value)}
          />

          <CustomInput
            label="Enter Project Description"
            placeholder="Describe your project"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={4}
          />

          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Project Gallery</Text>
            <UploadButton
              title="Upload from Gallery"
              onPress={handleUploadGallery}
            />
          </View>

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

export default PortfolioScreen;
