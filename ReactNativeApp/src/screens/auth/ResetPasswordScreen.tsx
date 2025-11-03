import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AppNavigator';
import { useAuth } from '../../context/AuthContextSimple';
import AuthHeader from '../../components/AuthHeader';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { Colors } from '../../styles/colors';
import { Fonts } from '../../styles/fonts';

type ResetPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'ResetPassword'>;

interface Props {
  navigation: ResetPasswordScreenNavigationProp;
}

const ResetPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const { updatePassword, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (!validateForm()) return;
    
    clearError();
    try {
      await updatePassword(formData.newPassword);
      navigation.navigate('Login');
    } catch (err) {
      console.error('Password update error:', err);
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
        title="Set a new Password"
        subtitle="Enter a new password to secure your account"
        onBack={() => navigation.goBack()}
      />
      
      <View style={styles.formCard}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
          <CustomInput
            placeholder="New password"
            value={formData.newPassword}
            onChangeText={(value) => handleInputChange('newPassword', value)}
            secureTextEntry={!showNewPassword}
            error={validationErrors.newPassword}
            rightIcon={
              <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                <Text style={styles.eyeIcon}>
                  {showNewPassword ? '👁️‍🗨️' : '👁️'}
                </Text>
              </TouchableOpacity>
            }
          />

          <CustomInput
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(value) => handleInputChange('confirmPassword', value)}
            secureTextEntry={!showConfirmPassword}
            error={validationErrors.confirmPassword}
            rightIcon={
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={styles.eyeIcon}>
                  {showConfirmPassword ? '👁️‍🗨️' : '👁️'}
                </Text>
              </TouchableOpacity>
            }
          />

          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <CustomButton
            title="Send Reset Email"
            onPress={handleUpdatePassword}
            loading={isLoading}
            style={styles.updateButton}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password? </Text>
            <Text 
              style={styles.loginLink}
              onPress={() => navigation.navigate('Login')}
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
  updateButton: {
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
  eyeIcon: {
    fontSize: 18,
    color: Colors.textTertiary,
  },
});

export default ResetPasswordScreen;
