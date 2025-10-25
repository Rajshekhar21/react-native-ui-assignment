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
  });
  const [documentUri, setDocumentUri] = useState<string | undefined>();

  const projectLocationOptions = [
    { label: 'Dehradun', value: 'Dehradun' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Bangalore', value: 'Bangalore' },
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Kolkata', value: 'Kolkata' },
  ];

  const handleContinue = async () => {
    try {
      await updateUser({
        profile: {
          ...user?.profile,
          verificationDocuments: [
            ...(user?.profile?.verificationDocuments || []),
            {
              id: Date.now().toString(),
              type: 'business_license',
              url: documentUri || '',
              uploadedAt: new Date().toISOString(),
            },
          ],
        },
      });
      
      await completeOnboarding();
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleSkip = async () => {
    try {
      await completeOnboarding();
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const handleUploadDocument = () => {
    // TODO: Implement document picker
    console.log('Upload document');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Verification"
        subtitle="Complete your profile verification"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.uploadContainer}>
            <Text style={styles.uploadLabel}>Upload Document</Text>
            <UploadButton
              title="Upload Document"
              onPress={handleUploadDocument}
              imageUri={documentUri}
            />
          </View>

          <CustomDropdown
            label="Select Project Location"
            placeholder="Choose your project location"
            options={projectLocationOptions}
            selectedValue={formData.projectLocation}
            onValueChange={(value) => handleInputChange('projectLocation', value)}
          />

          <CustomInput
            label="Enter Business Website"
            placeholder="https://yourwebsite.com"
            value={formData.businessWebsite}
            onChangeText={(value) => handleInputChange('businessWebsite', value)}
            keyboardType="default"
          />

          <CustomInput
            label="Enter LinkedIn URL"
            placeholder="https://linkedin.com/in/yourprofile"
            value={formData.linkedinUrl}
            onChangeText={(value) => handleInputChange('linkedinUrl', value)}
            keyboardType="default"
          />

          <CustomInput
            label="Enter Facebook URL"
            placeholder="https://facebook.com/yourpage"
            value={formData.facebookUrl}
            onChangeText={(value) => handleInputChange('facebookUrl', value)}
            keyboardType="default"
          />

          <CustomInput
            label="Enter YouTube URL"
            placeholder="https://youtube.com/yourchannel"
            value={formData.youtubeUrl}
            onChangeText={(value) => handleInputChange('youtubeUrl', value)}
            keyboardType="default"
          />

          <CustomInput
            label="Enter X URL"
            placeholder="https://x.com/yourhandle"
            value={formData.xUrl}
            onChangeText={(value) => handleInputChange('xUrl', value)}
            keyboardType="default"
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

export default VerificationDocumentScreen;
