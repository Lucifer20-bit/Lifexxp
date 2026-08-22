import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

interface LandingFooterProps {
  onLaunchConsole: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({
  onLaunchConsole,
  onOpenAuth,
}) => {
  return (
    <View style={styles.container}>
      {/* Brand Header */}
      <View style={styles.brandRow}>
        <View style={styles.logoBadge}>
          <Ionicons name="flash" size={14} color="#FFF" />
        </View>
        <Text style={styles.brandTitle}>
          LIFE<Text style={styles.brandHighlight}>XP</Text>
        </Text>
      </View>

      <Text style={styles.manifestoQuote}>
        "Your character is not an immutable state. It is an architectural calculation."
      </Text>

      {/* Quick Actions */}
      <View style={styles.actionRow}>
        <Pressable onPress={() => onOpenAuth?.('signin')} style={styles.linkTouch}>
          <Text style={styles.linkText}>SIGN IN</Text>
        </Pressable>
        <Text style={styles.bullet}>•</Text>
        <Pressable onPress={() => onOpenAuth?.('signup')} style={styles.linkTouch}>
          <Text style={styles.linkText}>ASCEND (SIGN UP)</Text>
        </Pressable>
        <Text style={styles.bullet}>•</Text>
        <Pressable onPress={onLaunchConsole} style={styles.linkTouch}>
          <Text style={styles.linkTextCyan}>INITIALIZE HUD</Text>
        </Pressable>
      </View>

      {/* Copyright & System Version */}
      <View style={styles.bottomRow}>
        <Text style={styles.copyrightText}>© 2026 LifeXP System Matrix. All rights reserved.</Text>
        <Text style={styles.versionText}>V 1.0.0 // PROTOCOL ACTIVE</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: CyberTheme.border,
    backgroundColor: '#070A10',
    alignItems: 'center',
    gap: 12,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.2,
  },
  brandHighlight: {
    color: CyberTheme.cyan,
  },
  manifestoQuote: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    fontStyle: 'italic',
    textAlign: 'center',
    maxWidth: 400,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  linkTouch: {
    paddingVertical: 4,
  },
  linkText: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  linkTextCyan: {
    color: CyberTheme.cyan,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  bullet: {
    color: CyberTheme.textMuted,
    fontSize: 10,
  },
  bottomRow: {
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  copyrightText: {
    color: CyberTheme.textMuted,
    fontSize: 9,
  },
  versionText: {
    color: 'rgba(6, 182, 212, 0.7)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
