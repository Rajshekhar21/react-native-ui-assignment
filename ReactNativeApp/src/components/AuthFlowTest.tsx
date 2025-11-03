import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

interface AuthFlowTestProps {
  onNavigate: (screen: string) => void;
}

const AuthFlowTest: React.FC<AuthFlowTestProps> = ({ onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const testSteps = [
    {
      title: 'Welcome Screen',
      description: 'Sign up with mock data',
      mockData: { email: 'test@example.com', password: 'password123' },
      action: () => onNavigate('Welcome')
    },
    {
      title: 'Login Screen', 
      description: 'Sign in with mock data',
      mockData: { email: 'test@example.com', password: 'password123' },
      action: () => onNavigate('Login')
    },
    {
      title: 'Forgot  Password',
      description: 'Reset password with mock email',
      mockData: { email: 'test@example.com' },
      action: () => onNavigate('ForgotPassword')
    },
    {
      title: 'OTP Verification',
      description: 'Verify with mock OTP',
      mockData: { otp: '1234' },
      action: () => onNavigate('Verification')
    },
    {
      title: 'Reset Password',
      description: 'Set new password',
      mockData: { newPassword: 'newpassword123', confirmPassword: 'newpassword123' },
      action: () => onNavigate('ResetPassword')
    }
  ];

  const runMockTest = (step: typeof testSteps[0]) => {
    Alert.alert(
      `Testing ${step.title}`,
      `Mock Data: ${JSON.stringify(step.mockData, null, 2)}\n\nThis will simulate the ${step.description} flow.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Test', 
          onPress: () => {
            step.action();
            setCurrentStep((currentStep + 1) % testSteps.length);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auth Flow Test</Text>
      <Text style={styles.subtitle}>Test authentication screens with mock data</Text>
      
      <View style={styles.stepsContainer}>
        {testSteps.map((step, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.stepButton,
              index === currentStep && styles.activeStep
            ]}
            onPress={() => runMockTest(step)}
          >
            <Text style={[
              styles.stepTitle,
              index === currentStep && styles.activeStepText
            ]}>
              {step.title}
            </Text>
            <Text style={styles.stepDescription}>
              {step.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Mock Data Available:</Text>
        <Text style={styles.infoText}>• Email: test@example.com</Text>
        <Text style={styles.infoText}>• Password: password123</Text>
        <Text style={styles.infoText}>• OTP: 1234</Text>
        <Text style={styles.infoText}>• Phone: +1234567890</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
  },
  stepsContainer: {
    flex: 1,
  },
  stepButton: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activeStep: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight + '20',
  },
  stepTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  activeStepText: {
    color: Colors.primary,
  },
  stepDescription: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
  },
  infoContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
});

export default AuthFlowTest;
