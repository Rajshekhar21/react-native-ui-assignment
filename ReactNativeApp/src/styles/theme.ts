import { Colors } from './colors';
import { Fonts } from './fonts';
import { CommonStyles } from './commonStyles';
import { Spacing, BorderRadius, ScreenDimensions } from './commonStyles';

export const Theme = {
  colors: Colors,
  fonts: Fonts,
  spacing: Spacing,
  borderRadius: BorderRadius,
  screenDimensions: ScreenDimensions,
  commonStyles: CommonStyles,
} as const;

export type ThemeType = typeof Theme;
