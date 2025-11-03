export const Colors = {
  // Primary Colors
  primary: '#FF6F61',
  primaryDark: '#E55A5A',
  primaryLight: '#FF8A8A',

  // Onboarding Accent Palette
  onboardingAccent: '#1DA1A5',
  onboardingAccentDark: '#12827E',
  onboardingAccentLight: '#E4F6F6',
  onboardingAccentMuted: '#B9E4E2',
  onboardingProgressActive: '#FF6F61',
  onboardingProgressInactive: '#E6E9EF',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  backgroundTertiary: '#F5F5F5',
  
  // Text Colors
  textPrimary: '#333333',
  textSecondary: '#666666',
  textTertiary: '#999999',
  textLight: '#CCCCCC',
  textWhite: '#FFFFFF',
  
  // Border Colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  borderDark: '#CCCCCC',
  
  // Status Colors
  success: '#4CAF50',
  successLight: '#E8F5E8',
  error: '#F44336',
  errorLight: '#FFEBEE',
  warning: '#FF9800',
  warningLight: '#FFF3E0',
  
  // Interactive Colors
  link: '#FF6B6B',
  linkHover: '#E55A5A',
  
  // Overlay Colors
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  
  // Gradient Colors
  gradientStart: '#FF6B6B',
  gradientEnd: '#FF8A8A',
} as const;

export type ColorKey = keyof typeof Colors;
