import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import CheckBox from '../../components/CheckBox';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type WelcomeScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const { register, isLoading, error, clearError, continueAsGuest } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    agreeToTerms: false,
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and policy';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    clearError();
    try {
      await register(formData.email, formData.password, 'User');
      // Navigation will be handled by AuthContext
    } catch (err) {
      console.error('Registration error:', err);
    }
  };

  const handleGoogleAuth = () => {
    Alert.alert('Google Auth', 'Google authentication will be implemented');
  };

  const handleContinueAsGuest = async () => {
    try {
      await continueAsGuest();
    } catch (err) {
      console.error('Guest mode error:', err);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Welcome to Decor mate"
        subtitle="Create your account to get started"
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <CustomButton
            title="Continue with Google"
            onPress={handleGoogleAuth}
            variant="google"
            icon={<Text style={styles.googleIcon}>G</Text>}
            style={styles.googleButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <CustomInput
            label="Email or Phone Number"
            placeholder="Enter your email or phone"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            error={validationErrors.email}
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
            error={validationErrors.password}
          />

          <CheckBox
            checked={formData.agreeToTerms}
            onPress={() => handleInputChange('agreeToTerms', !formData.agreeToTerms)}
            label="I agree to the terms & policy"
          />
          {validationErrors.agreeToTerms && (
            <Text style={styles.errorText}>{validationErrors.agreeToTerms}</Text>
          )}

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <CustomButton
            title="Create a New Account"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.registerButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Don't have an account? </Text>
            <Text 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
            >
              Sign In
            </Text>
          </View>

          <CustomButton
            title="Continue as Guest"
            onPress={handleContinueAsGuest}
            variant="outline"
            style={styles.guestButton}
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  formContainer: {
    flex: 1,
  },
  googleButton: {
    marginBottom: 20,
  },
  googleIcon: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  registerButton: {
    marginTop: 20,
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  errorText: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.error,
    marginTop: 4,
    textAlign: 'center',
  },
  guestButton: {
    marginTop: 16,
  },
});

export default WelcomeScreen;
