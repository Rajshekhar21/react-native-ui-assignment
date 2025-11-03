import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

const decorMateLogo = require('../../assets/images/decor-mate-logo.png');

interface AppHeaderProps {
  showBack?: boolean;
  onBackPress?: () => void;
  onDropdownPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ showBack = false, onBackPress, onDropdownPress }) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Text style={styles.backIcon}>←</Text>
            </TouchableOpacity>
          ) : null}

          <View style={styles.logoContainer}>
            <Image source={decorMateLogo} style={styles.logoImage} resizeMode="contain" />
            <View style={styles.logoTextWrapper}>
              <Text style={styles.logoPrimaryText}>ecor </Text>
              <Text style={styles.logoSecondaryText}>Mate</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={onDropdownPress}
          style={styles.dropdownButton}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <Text style={styles.dropdownIcon}>☰</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.backgroundSecondary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backIcon: {
    fontSize: 18,
    color: Colors.textPrimary,
    fontFamily: Fonts.semiBold,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 4,
  },
  logoTextWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginLeft: -8,
  },
  logoPrimaryText: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  logoSecondaryText: {
    fontSize: 22,
    fontFamily: Fonts.semiBold,
    color: Colors.textPrimary,
  },
  dropdownButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownIcon: {
    fontSize: 20,
    color: Colors.textPrimary,
    fontFamily: Fonts.semiBold,
  },
});

export default AppHeader;

