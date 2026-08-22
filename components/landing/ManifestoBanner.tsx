import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

interface ManifestoBannerProps {
  onLaunchConsole: () => void;
}

export const ManifestoBanner: React.FC<ManifestoBannerProps> = ({ onLaunchConsole }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bannerCard}>
        <View style={styles.topIcon}>
          <Ionicons name="flash" size={24} color="#000" />
        </View>

        <Text style={styles.bannerTitle}>
          Your next ascension is not an accident.{'\n'}It is an architectural necessity.
        </Text>

        <Text style={styles.bannerSubtitle}>
          Eliminate digital noise. Claim your daily objectives. Ascend through the Hunter class matrix with compound discipline.
        </Text>

        <Pressable
          onPress={onLaunchConsole}
          style={({ pressed }) => [styles.btnAction, pressed && styles.btnPressed]}
        >
          <FontAwesome5 name="terminal" size={13} color="#000" />
          <Text style={styles.btnActionText}>INITIALIZE CHARACTER CONSOLE</Text>
          <Ionicons name="arrow-forward" size={15} color="#000" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  bannerCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CyberTheme.borderHighlight,
    padding: 24,
    alignItems: 'center',
    textAlign: 'center',
    gap: 12,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  topIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: CyberTheme.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 25,
    letterSpacing: 0.5,
  },
  bannerSubtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 500,
  },
  btnAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: CyberTheme.cyan,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 6,
  },
  btnActionText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  btnPressed: {
    opacity: 0.85,
  },
});
