import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../styles/colors';
import { Fonts } from '../styles/fonts';

interface OnboardingProgressHeaderProps {
  title: string;
  subtitle?: string;
  step?: number;
  totalSteps?: number;
  hideProgress?: boolean;
}

const OnboardingProgressHeader: React.FC<OnboardingProgressHeaderProps> = ({
  title,
  subtitle,
  step = 1,
  totalSteps = 5,
  hideProgress = false,
}) => {
  const insets = useSafeAreaInsets();
  const activeStep = Math.min(Math.max(step, 0), totalSteps);
  const titleStyles = subtitle ? [styles.title, styles.titleWithSubtitle] : styles.title;
  const containerStyles = [styles.container, { paddingTop: insets.top + 16 }];

  return (
    <View style={containerStyles}>
      {!hideProgress && totalSteps > 0 && (
        <View style={styles.progressContainer}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isActive = index < activeStep;
            return (
              <View
                key={index}
                style={[styles.progressSegment, isActive ? styles.progressSegmentActive : styles.progressSegmentInactive]}
              />
            );
          })}
        </View>
      )}
      <Text style={titleStyles}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: Colors.background,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressSegment: {
    flex: 1,
    height: 6,
    borderRadius: 999,
    marginHorizontal: 4,
  },
  progressSegmentActive: {
    backgroundColor: Colors.onboardingProgressActive,
  },
  progressSegmentInactive: {
    backgroundColor: Colors.onboardingProgressInactive,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.textPrimary,
  },
  titleWithSubtitle: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: Fonts.regular,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});

export default OnboardingProgressHeader;

