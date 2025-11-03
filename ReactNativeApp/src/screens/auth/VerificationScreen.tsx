import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import OTPInput from '../../components/OTPInput';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type VerificationScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Verification'>;

interface Props {
  navigation: VerificationScreenNavigationProp;
}

const VerificationScreen: React.FC<Props> = ({ navigation }) => {
  const { verifyOTP, isLoading, error, clearError } = useAuth();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(180); // 3 minutes
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOTPComplete = async (otpValue: string) => {
    setOtp(otpValue);
    clearError();
    try {
      await verifyOTP(otpValue);
      // Navigation will be handled by AuthContext
    } catch (err) {
      console.error('OTP verification error:', err);
    }
  };

  const handleResendOTP = () => {
    if (!canResend) return;
    
    setTimer(180);
    setCanResend(false);
    setOtp('');
    Alert.alert('OTP Sent', 'A new verification code has been sent to your mobile number');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <AuthHeader 
        title="Verification Code"
        subtitle="We have sent the verification code to your mobile number"
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.formCard}>
        <View style={styles.content}>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Please enter the 4-digit code sent to your mobile number
          </Text>
        </View>

        <OTPInput
          length={4}
          onComplete={handleOTPComplete}
          onResend={handleResendOTP}
          timer={timer}
          error={error || undefined}
          disabled={isLoading}
        />

        {timer > 0 && (
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Resend OTP in {formatTime(timer)}
            </Text>
          </View>
        )}

        <CustomButton
          title="Login"
          onPress={() => handleOTPComplete(otp)}
          loading={isLoading}
          disabled={otp.length !== 4}
          style={styles.loginButton}
        />
        </View>
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
    justifyContent: 'center',
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
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  timerText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
  loginButton: {
    marginTop: 20,
  },
});

export default VerificationScreen;
