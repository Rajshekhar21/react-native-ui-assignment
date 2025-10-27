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
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import ImageUploader from '../../components/ImageUploader';

type ProjectAddScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProjectAdd'
>;

interface Props {
  navigation: ProjectAddScreenNavigationProp;
}

const ProjectAddScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    projectLocation: '',
    projectType: '',
    projectDescription: '',
    projectGallery: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.projectName || !formData.projectLocation || !formData.projectType) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert('Success', 'Project added successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleImageUpload = (imageUri: string) => {
    setFormData(prev => ({ ...prev, projectGallery: imageUri }));
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        userName="Add New Project"
        userEmail=""
        onSave={handleSave}
        showEdit={false}
        showSave={true}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
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
            options={['Dehradun', 'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata']}
            onSelect={(value) => handleInputChange('projectLocation', value)}
          />
          
          <CustomDropdown
            label="Project Type*"
            placeholder="Select Project Type"
            value={formData.projectType}
            options={['Residential', 'Commercial', 'Office', 'Retail', 'Hospitality', 'Healthcare']}
            onSelect={(value) => handleInputChange('projectType', value)}
          />
          
          <CustomInput
            label="Project Description*"
            placeholder="Enter Project Description"
            value={formData.projectDescription}
            onChangeText={(value) => handleInputChange('projectDescription', value)}
            multiline
            numberOfLines={4}
          />
          
          <ImageUploader
            label="Project Gallery*"
            onImageSelected={handleImageUpload}
            currentImage={formData.projectGallery}
            supportedFormats={['JPG', 'JPEG', 'PNG', 'HEIC']}
            maxSizeMB={5}
          />
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
});

export default ProjectAddScreen;
