import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Fonts } from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import ProfileHeader from '../../components/ProfileHeader';
import CollapsibleSection from '../../components/CollapsibleSection';
import ImageUploader from '../../components/ImageUploader';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';

type ProfileEditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileEdit'
>;

interface Props {
  navigation: ProfileEditScreenNavigationProp;
}

const ProfileEditScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    // Basic Details
    fullName: 'Akash Sharma',
    companyName: 'Sharma Designs',
    phone: '81265 28355',
    businessEmail: 'akash@sharmadesigns.com',
    businessAddress: '123 Design Street, Dehradun',
    profilePhoto: '',
    
    // Business Address
    street: '123 Design Street',
    buildingName: 'Sharma Design Studio',
    zip: '248001',
    city: 'Dehradun',
    state: 'Uttarakhand',
    county: 'Dehradun',
    
    // Professional Profile
    yearsOfExperience: '10',
    specialization: 'Interior Design',
    styleExpertise: 'Modern',
    
    // Portfolio
    projectName: '',
    projectLocation: '',
    projectType: '',
    projectDescription: '',
    projectGallery: '',
    
    // Verification
    documentType: '',
    
    // Social Links
    website: '',
    linkedin: '',
    facebook: '',
    youtube: '',
    twitter: '',
  });

  const [expandedSections, setExpandedSections] = useState({
    businessAddress: false,
    professionalProfile: false,
    portfolio: false,
    verification: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionToggle = (section: string, expanded: boolean) => {
    setExpandedSections(prev => ({ ...prev, [section]: expanded }));
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleImageUpload = (field: string, imageUri: string) => {
    setFormData(prev => ({ ...prev, [field]: imageUri }));
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        userName={formData.fullName}
        userEmail="akash@gmail.com"
        onSave={handleSave}
        showEdit={false}
        showSave={true}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Basic Details Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            
            <CustomInput
              label="Full Name*"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
            />
            
            <CustomInput
              label="Company / Brand Name*"
              placeholder="Enter Company / Brand Name"
              value={formData.companyName}
              onChangeText={(value) => handleInputChange('companyName', value)}
            />
            
            <View style={styles.phoneContainer}>
              <CustomDropdown
                label="Phone Number*"
                placeholder="+91"
                value="+91"
                options={['+91', '+1', '+44', '+86']}
                onSelect={(value) => console.log('Country code:', value)}
                style={styles.countryCode}
              />
              <CustomInput
                placeholder="81265 28355"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                style={styles.phoneInput}
              />
            </View>
            
            <CustomInput
              label="Business Email*"
              placeholder="Enter Business Address"
              value={formData.businessEmail}
              onChangeText={(value) => handleInputChange('businessEmail', value)}
              keyboardType="email-address"
            />
            
            <CustomInput
              label="Business Address*"
              placeholder="Enter Business Address"
              value={formData.businessAddress}
              onChangeText={(value) => handleInputChange('businessAddress', value)}
            />
            
            <ImageUploader
              label="Profile Photo / Company Logo"
              onImageSelected={(imageUri) => handleImageUpload('profilePhoto', imageUri)}
              currentImage={formData.profilePhoto}
            />
          </View>

          {/* Business Address Section */}
          <CollapsibleSection
            title="Business Address"
            isExpanded={expandedSections.businessAddress}
            onToggle={(expanded) => handleSectionToggle('businessAddress', expanded)}
          >
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>Select Live Location</Text>
            </TouchableOpacity>
            
            <CustomInput
              label="Street*"
              placeholder="Enter Street Name"
              value={formData.street}
              onChangeText={(value) => handleInputChange('street', value)}
            />
            
            <CustomInput
              label="Building Name*"
              placeholder="Enter Street Name"
              value={formData.buildingName}
              onChangeText={(value) => handleInputChange('buildingName', value)}
            />
            
            <View style={styles.rowContainer}>
              <CustomInput
                label="ZIP*"
                placeholder="Enter ZIP"
                value={formData.zip}
                onChangeText={(value) => handleInputChange('zip', value)}
                style={styles.halfWidth}
              />
              <CustomDropdown
                label="City*"
                placeholder="Select City"
                value={formData.city}
                options={['Dehradun', 'Delhi', 'Mumbai', 'Bangalore']}
                onSelect={(value) => handleInputChange('city', value)}
                style={styles.halfWidth}
              />
            </View>
            
            <View style={styles.rowContainer}>
              <CustomDropdown
                label="State*"
                placeholder="Select State"
                value={formData.state}
                options={['Uttarakhand', 'Delhi', 'Maharashtra', 'Karnataka']}
                onSelect={(value) => handleInputChange('state', value)}
                style={styles.halfWidth}
              />
              <CustomDropdown
                label="County*"
                placeholder="Select County"
                value={formData.county}
                options={['Dehradun', 'New Delhi', 'Mumbai', 'Bangalore']}
                onSelect={(value) => handleInputChange('county', value)}
                style={styles.halfWidth}
              />
            </View>
          </CollapsibleSection>

          {/* Professional Profile Section */}
          <CollapsibleSection
            title="Professional Profile"
            isExpanded={expandedSections.professionalProfile}
            onToggle={(expanded) => handleSectionToggle('professionalProfile', expanded)}
          >
            <CustomDropdown
              label="Years of Experience*"
              placeholder="Select Years of Experience"
              value={formData.yearsOfExperience}
              options={['1-2 years', '3-5 years', '6-10 years', '10+ years']}
              onSelect={(value) => handleInputChange('yearsOfExperience', value)}
            />
            
            <CustomDropdown
              label="Specialization*"
              placeholder="Select Specialization"
              value={formData.specialization}
              options={['Interior Design', 'Architecture', 'Construction', 'Consulting']}
              onSelect={(value) => handleInputChange('specialization', value)}
            />
            
            <CustomDropdown
              label="Style Expertise*"
              placeholder="Select Style Expertise"
              value={formData.styleExpertise}
              options={['Modern', 'Traditional', 'Contemporary', 'Minimalist']}
              onSelect={(value) => handleInputChange('styleExpertise', value)}
            />
          </CollapsibleSection>

          {/* Portfolio Section */}
          <CollapsibleSection
            title="Portfolio"
            isExpanded={expandedSections.portfolio}
            onToggle={(expanded) => handleSectionToggle('portfolio', expanded)}
          >
            <CustomInput
              label="Project Name*"
              placeholder="Enter Project Name"
              value={formData.projectName}
              onChangeText={(value) => handleInputChange('projectName', value)}
            />
            
            <CustomDropdown
              label="Project Location*"
              placeholder="Select Project Location"
              value={formData.projectLocation}
              options={['Dehradun', 'Delhi', 'Mumbai', 'Bangalore']}
              onSelect={(value) => handleInputChange('projectLocation', value)}
            />
            
            <CustomDropdown
              label="Project Type*"
              placeholder="Select Project Type"
              value={formData.projectType}
              options={['Residential', 'Commercial', 'Office', 'Retail']}
              onSelect={(value) => handleInputChange('projectType', value)}
            />
            
            <CustomInput
              label="Project Description*"
              placeholder="Enter Project Description"
              value={formData.projectDescription}
              onChangeText={(value) => handleInputChange('projectDescription', value)}
              multiline
              numberOfLines={3}
            />
            
            <ImageUploader
              label="Project Gallery*"
              onImageSelected={(imageUri) => handleImageUpload('projectGallery', imageUri)}
              currentImage={formData.projectGallery}
            />
          </CollapsibleSection>

          {/* Verification Section */}
          <CollapsibleSection
            title="Verification"
            isExpanded={expandedSections.verification}
            onToggle={(expanded) => handleSectionToggle('verification', expanded)}
          >
            <CustomDropdown
              label="Upload Document*"
              placeholder="Select Document Type"
              value={formData.documentType}
              options={['Aadhar Card', 'PAN Card', 'Driving License', 'Passport']}
              onSelect={(value) => handleInputChange('documentType', value)}
            />
          </CollapsibleSection>

          {/* Additional Links Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Links</Text>
            
            <CustomInput
              label="Add Business Website"
              placeholder="Enter Business Website"
              value={formData.website}
              onChangeText={(value) => handleInputChange('website', value)}
            />
            
            <CustomInput
              label="LinkedIn"
              placeholder="Enter Linkdin url"
              value={formData.linkedin}
              onChangeText={(value) => handleInputChange('linkedin', value)}
            />
            
            <CustomInput
              label="Facebook"
              placeholder="Enter Facebook url"
              value={formData.facebook}
              onChangeText={(value) => handleInputChange('facebook', value)}
            />
            
            <CustomInput
              label="Youtube"
              placeholder="Enter Youtube url"
              value={formData.youtube}
              onChangeText={(value) => handleInputChange('youtube', value)}
            />
            
            <CustomInput
              label="X"
              placeholder="Enter X url"
              value={formData.twitter}
              onChangeText={(value) => handleInputChange('twitter', value)}
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 16,
  },
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  countryCode: {
    width: 80,
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.textPrimary,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
});

export default ProfileEditScreen;
