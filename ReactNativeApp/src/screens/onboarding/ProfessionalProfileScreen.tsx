import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropdown';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

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
    try {
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
      
      navigation.navigate('Portfolio');
    } catch (error) {
      console.error('Error updating professional profile:', error);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Portfolio');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Professional Profile"
        subtitle="Tell us about your professional background"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <CustomDropdown
            label="Years of Experience"
            placeholder="Select your experience level"
            options={experienceOptions}
            selectedValue={formData.yearsOfExperience}
            onValueChange={(value) => handleInputChange('yearsOfExperience', value)}
          />

          <CustomDropdown
            label="Select Specialization"
            placeholder="Choose your specialization"
            options={specializationOptions}
            selectedValue={formData.specialization}
            onValueChange={(value) => handleInputChange('specialization', value)}
          />

          <CustomDropdown
            label="Style Expertise"
            placeholder="Select your style expertise"
            options={styleExpertiseOptions}
            selectedValue={formData.styleExpertise}
            onValueChange={(value) => handleInputChange('styleExpertise', value)}
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

export default ProfessionalProfileScreen;
