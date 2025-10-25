import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OnboardingStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type AccountTypeScreenNavigationProp = StackNavigationProp<OnboardingStackParamList, 'AccountType'>;

interface Props {
  navigation: AccountTypeScreenNavigationProp;
}

const AccountTypeScreen: React.FC<Props> = ({ navigation }) => {
  const { updateUser } = useAuth();
  const [selectedType, setSelectedType] = useState<'individual' | 'business' | null>(null);

  const handleSelectType = (type: 'individual' | 'business') => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType) return;
    
    try {
      await updateUser({ accountType: selectedType });
      navigation.navigate('UserDetails');
    } catch (error) {
      console.error('Error updating account type:', error);
    }
  };

  const accountTypes = [
    {
      id: 'individual',
      title: 'Individual',
      description: 'For personal use and individual projects',
      icon: '👤',
    },
    {
      id: 'business',
      title: 'Business',
      description: 'For business and professional services',
      icon: '🏢',
    },
  ];

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Join Us"
        subtitle="Tell us about yourself, what type of account would you like to create?"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <View style={styles.cardsContainer}>
            {accountTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.card,
                  selectedType === type.id && styles.cardSelected
                ]}
                onPress={() => handleSelectType(type.id as 'individual' | 'business')}
                activeOpacity={0.8}
              >
                <View style={styles.cardContent}>
                  <Text style={styles.cardIcon}>{type.icon}</Text>
                  <Text style={[
                    styles.cardTitle,
                    selectedType === type.id && styles.cardTitleSelected
                  ]}>
                    {type.title}
                  </Text>
                  <Text style={[
                    styles.cardDescription,
                    selectedType === type.id && styles.cardDescriptionSelected
                  ]}>
                    {type.description}
                  </Text>
                </View>
                <View style={styles.arrowContainer}>
                  <Text style={[
                    styles.arrow,
                    selectedType === type.id && styles.arrowSelected
                  ]}>
                    →
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.navigationContainer}>
            <CustomButton
              title="Continue"
              onPress={handleContinue}
              disabled={!selectedType}
              style={styles.continueButton}
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
  cardsContainer: {
    marginBottom: 40,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.backgroundSecondary,
  },
  cardContent: {
    flex: 1,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  cardTitleSelected: {
    color: Colors.primary,
  },
  cardDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  cardDescriptionSelected: {
    color: Colors.textPrimary,
  },
  arrowContainer: {
    marginLeft: 16,
  },
  arrow: {
    fontSize: 20,
    color: Colors.textTertiary,
  },
  arrowSelected: {
    color: Colors.primary,
  },
  navigationContainer: {
    paddingBottom: 20,
  },
  continueButton: {
    marginBottom: 20,
  },
});

export default AccountTypeScreen;
