import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { Fonts } from '../../styles/fonts';
import { Colors } from '../../styles/colors';
import ProfileHeader from '../../components/ProfileHeader';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';

type ClientProfileEditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ClientProfileEdit'
>;

interface Props {
  navigation: ClientProfileEditScreenNavigationProp;
}

const ClientProfileEditScreen: React.FC<Props> = ({ navigation }) => {
  const [formData, setFormData] = useState({
    fullName: 'Akash Sharma',
    phone: '81265 28355',
    email: 'akash@gmail.com',
    lookingFor: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <ProfileHeader
        userName={formData.fullName}
        userEmail={formData.email}
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
              label="Email"
              placeholder="Enter Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
            />
            
            <CustomDropdown
              label="What are you looking for?*"
              placeholder="Select Suitable Option"
              value={formData.lookingFor}
              options={[
                'Interior Design Services',
                'Architecture Consultation',
                'Construction Services',
                'Home Renovation',
                'Commercial Design',
                'Space Planning',
                'Furniture Selection',
                'Color Consultation'
              ]}
              onSelect={(value) => handleInputChange('lookingFor', value)}
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
});

export default ClientProfileEditScreen;
