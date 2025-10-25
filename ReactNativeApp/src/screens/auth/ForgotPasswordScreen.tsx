import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [validationError, setValidationError] = useState('');

  const validateEmail = () => {
    if (!email) {
      setValidationError('Email is required');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Please enter a valid email');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleSendResetEmail = async () => {
    if (!validateEmail()) return;
    
    clearError();
    try {
      await resetPassword(email);
      setEmailSent(true);
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <AuthHeader 
          title="Forgot your Password?"
          subtitle="No worries, we'll send you a reset link. Enter your email and we'll send you a reset link."
        />
        
        <View style={styles.content}>
          <View style={styles.successContainer}>
            <View style={styles.successBanner}>
              <Text style={styles.successText}>
                A reset link has been sent to your email.
              </Text>
              <CustomButton
                title="Back to Login"
                onPress={handleBackToLogin}
                style={styles.backToLoginButton}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Forgot your Password?"
        subtitle="No worries, we'll send you a reset link. Enter your email and we'll send you a reset link."
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <CustomInput
            label="Enter Registered Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={validationError}
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <CustomButton
            title="Send Reset Email"
            onPress={handleSendResetEmail}
            loading={isLoading}
            style={styles.sendButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password? </Text>
            <Text 
              style={styles.loginLink}
              onPress={handleBackToLogin}
            >
              Back to login
            </Text>
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
  sendButton: {
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
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successBanner: {
    backgroundColor: Colors.successLight,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.success,
  },
  successText: {
    fontSize: 16,
    fontFamily: Fonts.medium,
    color: Colors.success,
    textAlign: 'center',
    marginBottom: 20,
  },
  backToLoginButton: {
    backgroundColor: Colors.success,
    minWidth: 150,
  },
});

export default ForgotPasswordScreen;
