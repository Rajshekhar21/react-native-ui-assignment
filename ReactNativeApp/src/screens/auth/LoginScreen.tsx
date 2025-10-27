import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, loginWithGoogle, isLoading, error, clearError, continueAsGuest } = useAuth();
  const [formData, setFormData] = useState({
    email: 'loisbecker@gmail.com',
    password: '',
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
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    clearError();
    try {
      await login(formData.email, formData.password);
      // Navigation will be handled by AuthContext
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      await loginWithGoogle();
      // Navigation will be handled by AuthContext
    } catch (err) {
      console.error('Google login error:', err);
    }
  };

  const handleContinueAsGuest = async () => {
    try {
      await continueAsGuest();
    } catch (err) {
      console.error('Guest mode error:', err);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Welcome Back"
        subtitle="Sign in to your account"
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
            label="Email"
            placeholder="Enter your email"
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

          <View style={styles.forgotPasswordContainer}>
            <Text 
              style={styles.forgotPasswordText}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              Forgot Password?
            </Text>
          </View>

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <CustomButton
            title="Login"
            onPress={handleLogin}
            loading={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <Text 
              style={styles.signupLink}
              onPress={() => navigation.navigate('Welcome')}
            >
              Sign Up
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
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginBottom: 24,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  signupLink: {
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

export default LoginScreen;
