// src/shared/styles/theme/index.ts

export * from './colors';
export * from './typography';
export * from './spacing';
export * from './effects';

import { colors } from './colors';
import { typography, textStyles } from './typography';
import { spacing, containerWidths, breakpoints, spacingPatterns } from './spacing';
import { shadows, borderRadius, transitions, effects } from './effects';

// Theme completo
export const theme = {
  colors,
  typography,
  textStyles,
  spacing,
  containerWidths,
  breakpoints,
  spacingPatterns,
  shadows,
  borderRadius,
  transitions,
  effects,
};

export default theme;