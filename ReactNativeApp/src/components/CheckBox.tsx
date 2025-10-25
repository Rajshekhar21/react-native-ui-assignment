import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

interface CheckBoxProps {
  checked: boolean;
  onPress: () => void;
  label?: string;
  disabled?: boolean;
  style?: any;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onPress,
  label,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[
        styles.checkbox,
        checked && styles.checkboxChecked,
        disabled && styles.checkboxDisabled
      ]}>
        {checked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      {label && (
        <Text style={[
          styles.label,
          disabled && styles.labelDisabled
        ]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    borderRadius: 4,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkboxDisabled: {
    backgroundColor: Colors.backgroundSecondary,
    borderColor: Colors.borderLight,
  },
  checkmark: {
    color: Colors.textWhite,
    fontSize: 12,
    fontFamily: Fonts.semiBold,
  },
  label: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.textPrimary,
    flex: 1,
  },
  labelDisabled: {
    color: Colors.textTertiary,
  },
});

export default CheckBox;
