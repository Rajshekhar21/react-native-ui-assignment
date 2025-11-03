import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image } from 'react-native';
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
  const [showPassword, setShowPassword] = useState(false);

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
        subtitle="Enter your email and password to log in"
      />
      
      <View style={styles.formCard}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
          <CustomButton
            title="Continue with Google"
            onPress={handleGoogleAuth}
            variant="google"
            icon={
              <Image 
                source={require('../../../assets/images/google.png')} 
                style={styles.googleIcon}
                resizeMode="contain"
              />
            }
            style={styles.googleButton}
          />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or login with</Text>
            <View style={styles.dividerLine} />
          </View>

          <CustomInput
            placeholder="Email or Phone Number"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            error={validationErrors.email}
          />

          <CustomInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry={!showPassword}
            error={validationErrors.password}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </Text>
              </TouchableOpacity>
            }
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
            title="Sign In"
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  formCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -16,
    marginHorizontal: 16,
    paddingTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
  },
  googleButton: {
    marginBottom: 20,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  eyeIcon: {
    fontSize: 18,
    color: Colors.textTertiary,
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
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary
  },
});

export default LoginScreen;
