import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ title, subtitle, onBack }) => {
  if (__DEV__) {
    console.log('🔍 AuthHeader rendered with onBack:', !!onBack);
  }
  
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => {
            if (__DEV__) {
              console.log('🔙 Back button pressed');
            }
            onBack();
          }}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingTop: 100,
    paddingBottom: 140,
    marginBottom: -100,
    paddingHorizontal: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backIcon: {
    fontSize: 24,
    color: Colors.textWhite,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 34,
    fontFamily: Fonts.bold,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.textWhite,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
  },
});

export default AuthHeader;
