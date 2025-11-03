import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'google' | 'outline' | 'onboarding';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
  icon,
}) => {
  const getButtonStyle = () => {
    const baseStyle: any[] = [styles.button, styles[variant]];
    
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    
    if (style) {
      baseStyle.push(style);
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle: any[] = [styles.buttonText, styles[`${variant}Text`]];
    
    if (disabled || loading) {
      baseTextStyle.push(styles.disabledText);
    }
    
    if (textStyle) {
      baseTextStyle.push(textStyle);
    }
    
    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.textWhite : Colors.primary} />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 52,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  onboarding: {
    backgroundColor: Colors.onboardingAccent,
  },
  secondary: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  google: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  outline: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
  primaryText: {
    color: Colors.textWhite,
  },
  onboardingText: {
    color: Colors.textWhite,
  },
  secondaryText: {
    color: Colors.primary,
  },
  googleText: {
    color: Colors.textPrimary,
    marginLeft: 8,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledText: {
    opacity: 0.6,
  },
});

export default CustomButton;
