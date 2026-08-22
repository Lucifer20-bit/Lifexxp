/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#0B0F19',
    tint: '#06B6D4',
    icon: '#9BA1A6',
    tabIconDefault: '#64748B',
    tabIconSelected: '#06B6D4',
  },
};

export const CyberTheme = {
  bg: '#0B0F19',
  bgCard: '#0F172A',
  bgCardElevated: '#1E293B',
  bgCardSubtle: 'rgba(15, 23, 42, 0.75)',
  border: '#1E293B',
  borderHighlight: 'rgba(6, 182, 212, 0.4)',
  borderGlow: '#06B6D4',
  
  cyan: '#06B6D4',
  cyanGlow: 'rgba(6, 182, 212, 0.2)',
  purple: '#A855F7',
  purpleGlow: 'rgba(168, 85, 247, 0.2)',
  amber: '#F59E0B',
  amberGlow: 'rgba(245, 158, 11, 0.2)',
  rose: '#F43F5E',
  roseGlow: 'rgba(244, 63, 94, 0.2)',
  emerald: '#10B981',
  emeraldGlow: 'rgba(16, 185, 129, 0.2)',
  blue: '#3B82F6',
  blueGlow: 'rgba(59, 130, 246, 0.2)',

  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
};

export const RankColors: Record<string, { text: string; bg: string; border: string }> = {
  S: { text: '#FB7185', bg: 'rgba(244, 63, 94, 0.15)', border: 'rgba(244, 63, 94, 0.4)' },
  A: { text: '#F472B6', bg: 'rgba(236, 72, 153, 0.15)', border: 'rgba(236, 72, 153, 0.4)' },
  B: { text: '#C084FC', bg: 'rgba(168, 85, 247, 0.15)', border: 'rgba(168, 85, 247, 0.4)' },
  C: { text: '#38BDF8', bg: 'rgba(14, 165, 233, 0.15)', border: 'rgba(14, 165, 233, 0.4)' },
  D: { text: '#34D399', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.4)' },
  E: { text: '#94A3B8', bg: 'rgba(100, 116, 139, 0.15)', border: 'rgba(100, 116, 139, 0.4)' },
  ALL: { text: '#06B6D4', bg: 'rgba(6, 182, 212, 0.15)', border: 'rgba(6, 182, 212, 0.4)' },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
