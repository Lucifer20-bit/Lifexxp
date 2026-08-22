import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

interface LandingNavbarProps {
  onLaunchConsole: () => void;
  onOpenAuth?: (mode?: 'signin' | 'signup') => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onLaunchConsole,
  onOpenAuth,
}) => {
  return (
    <View style={styles.container}>
      {/* Brand Logo */}
      <View style={styles.brandGroup}>
        <View style={styles.logoBox}>
          <Ionicons name="flash" size={16} color="#FFF" />
        </View>
        <View>
          <Text style={styles.brandTitle}>
            LIFE<Text style={styles.brandHighlight}>XP</Text>
          </Text>
          <Text style={styles.brandSubtitle}>RPG LIFE MASTERY</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <Pressable
          onPress={() => onOpenAuth?.('signin')}
          style={({ pressed }) => [styles.btnSignIn, pressed && styles.btnPressed]}
        >
          <Text style={styles.btnSignInText}>SIGN IN</Text>
        </Pressable>

        <Pressable
          onPress={onLaunchConsole}
          style={({ pressed }) => [styles.btnConsole, pressed && styles.btnPressed]}
        >
          <FontAwesome5 name="terminal" size={11} color="#000" />
          <Text style={styles.btnConsoleText}>LAUNCH HUD</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: CyberTheme.border,
    backgroundColor: CyberTheme.bgCard,
    gap: 8,
  },
  brandGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#0284C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: CyberTheme.cyan,
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
  brandSubtitle: {
    color: 'rgba(6, 182, 212, 0.8)',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  btnSignIn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    backgroundColor: '#090D16',
  },
  btnSignInText: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  btnConsole: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: CyberTheme.cyan,
  },
  btnConsoleText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  btnPressed: {
    opacity: 0.8,
  },
});
