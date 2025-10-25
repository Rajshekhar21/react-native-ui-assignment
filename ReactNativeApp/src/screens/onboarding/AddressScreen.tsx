import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CustomDropdown from '../../components/CustomDropdown';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type AddressScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'Address'>;

interface Props {
  navigation: AddressScreenNavigationProp;
}

const AddressScreen: React.FC<Props> = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    buildingName: '',
    street: '',
    streetName: '',
    zipCode: '',
    city: 'Dehradun',
    state: '',
  });

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

  const handleSelectLiveLocation = () => {
    Alert.alert(
      'Location Services',
      'This will open the map to select your current location',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Map', onPress: () => console.log('Open map') }
      ]
    );
  };

  const handleContinue = async () => {
    try {
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
      
      navigation.navigate('VerificationDocument');
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const handleSkip = () => {
    navigation.navigate('VerificationDocument');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Address"
        subtitle="Enter your address details"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <CustomButton
            title="Select Live Location"
            onPress={handleSelectLiveLocation}
            variant="secondary"
            style={styles.locationButton}
          />

          <CustomInput
            label="Building Name"
            placeholder="Enter building name"
            value={formData.buildingName}
            onChangeText={(value) => handleInputChange('buildingName', value)}
          />

          <CustomInput
            label="Street"
            placeholder="Enter street"
            value={formData.street}
            onChangeText={(value) => handleInputChange('street', value)}
          />

          <CustomInput
            label="Enter Street Name"
            placeholder="Enter street name"
            value={formData.streetName}
            onChangeText={(value) => handleInputChange('streetName', value)}
          />

          <CustomInput
            label="Enter ZP"
            placeholder="Enter ZIP code"
            value={formData.zipCode}
            onChangeText={(value) => handleInputChange('zipCode', value)}
            keyboardType="numeric"
          />

          <CustomDropdown
            label="City"
            placeholder="Select city"
            options={cityOptions}
            selectedValue={formData.city}
            onValueChange={(value) => handleInputChange('city', value)}
          />

          <CustomDropdown
            label="State"
            placeholder="Select state"
            options={stateOptions}
            selectedValue={formData.state}
            onValueChange={(value) => handleInputChange('state', value)}
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
  locationButton: {
    marginBottom: 20,
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

export default AddressScreen;
