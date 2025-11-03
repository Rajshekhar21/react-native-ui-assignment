import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import OTPInput from '../../components/OTPInput';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

interface Props {
  navigation: ForgotPasswordScreenNavigationProp;
}

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [currentStep, setCurrentStep] = useState<'email' | 'otp' | 'success'>('email');
  const [validationError, setValidationError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      // Simulate sending reset email
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      setCurrentStep('otp');
    } catch (err) {
      console.error('Password reset error:', err);
    }
  };

  const handleOTPComplete = async (otpValue: string) => {
    setOtp(otpValue);
    clearError();
    try {
      // Simulate OTP verification
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
      setCurrentStep('success');
    } catch (err) {
      console.error('OTP verification error:', err);
    }
  };

  const handlePasswordChanged = () => {
    Alert.alert(
      'Success',
      'Your password is changed',
      [
        {
          text: 'Back to login',
          onPress: () => navigation.navigate('Login')
        }
      ]
    );
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  if (currentStep === 'success') {
    return (
      <View style={styles.container}>
        <AuthHeader 
          title="Forgot Your Password?" 
          subtitle="Password reset completed"
          onBack={() => navigation.goBack()}
        />
        
        <View style={styles.formCard}>
          <View style={styles.content}>
            <View style={styles.successContainer}>
              <CustomButton
                title="Back to Login"
                onPress={handlePasswordChanged}
                style={styles.backToLoginButton}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  if (currentStep === 'otp') {
    return (
      <View style={styles.container}>
        <AuthHeader 
          title="Verification Code"
          subtitle="We have sent the verification code to your email"
          onBack={() => setCurrentStep('email')}
        />
        
        <View style={styles.formCard}>
          <View style={styles.content}>
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                Please enter the 4-digit code sent to your email
              </Text>
            </View>

            <OTPInput
              length={4}
              onComplete={handleOTPComplete}
              error={error || undefined}
              disabled={isLoading}
            />

            <CustomButton
              title="Verify OTP"
              onPress={() => handleOTPComplete(otp)}
              loading={isLoading}
              disabled={otp.length !== 4}
              style={styles.verifyButton}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Forgot Password"
        subtitle="No worries enter your email and we'll send you a reset link"
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.formCard}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
          <CustomInput
            placeholder="Enter Registered Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={validationError}
          />

          <CustomInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            error={validationError}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>
                  {showPassword ? '👁️‍🗨️' : '👁️'}
                </Text>
              </TouchableOpacity>
            }
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
  instructionContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  verifyButton: {
    marginTop: 20,
  },
  eyeIcon: {
    fontSize: 18,
    color: Colors.textTertiary,
  },
});

export default ForgotPasswordScreen;
