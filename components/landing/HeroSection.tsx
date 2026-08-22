import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

interface HeroSectionProps {
  onLaunchConsole: () => void;
  onExploreSystem?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchConsole,
  onExploreSystem,
}) => {
  return (
    <View style={styles.container}>
      {/* Top Protocol Badge */}
      <View style={styles.eyebrowRow}>
        <View style={styles.cohortBadge}>
          <View style={styles.activeDot} />
          <Text style={styles.cohortText}>Active Protocol Cohort 2026</Text>
        </View>
        <Text style={styles.metaDivider}>/</Text>
        <Text style={styles.metaText}>Zero Dopamine Traps</Text>
        <Text style={styles.metaDivider}>/</Text>
        <Text style={styles.metaHighlight}>Irreversible Mastery</Text>
      </View>

      {/* Main Headline */}
      <View style={styles.heroTextGroup}>
        <Text style={styles.heroTitle}>
          Your life is the single most{' '}
          <Text style={styles.heroTitleEmphasized}>consequential</Text> campaign you will ever run.
        </Text>
        <Text style={styles.heroDescription}>
          LifeXP replaces superficial gamification and empty distractions with an uncompromising character architecture. Calibrate physical fortitude, intellectual depth, and daily discipline into permanent compound momentum.
        </Text>
      </View>

      {/* Primary Actions */}
      <View style={styles.actionGroup}>
        <Pressable
          onPress={onLaunchConsole}
          style={({ pressed }) => [styles.btnPrimary, pressed && styles.btnPressed]}
        >
          <FontAwesome5 name="terminal" size={13} color="#000" />
          <Text style={styles.btnPrimaryText}>INITIALIZE CHARACTER CONSOLE</Text>
          <Ionicons name="arrow-forward" size={15} color="#000" />
        </Pressable>

        {onExploreSystem ? (
          <Pressable
            onPress={onExploreSystem}
            style={({ pressed }) => [styles.btnSecondary, pressed && styles.btnPressed]}
          >
            <Text style={styles.btnSecondaryText}>EXPLORE ARCHITECTURE</Text>
            <Ionicons name="chevron-down" size={14} color={CyberTheme.cyan} />
          </Pressable>
        ) : null}
      </View>

      {/* Visual Specimen Card */}
      <View style={styles.specimenCard}>
        <View style={styles.specimenImageWrapper}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1000&auto=format&fit=crop&q=80',
            }}
            style={styles.specimenImage}
          />
          <View style={styles.specimenOverlay}>
            <View style={styles.photoTag}>
              <Text style={styles.photoTagText}>Specimen No. 084 // Focus & Precision</Text>
            </View>
            <Text style={styles.photoQuote}>
              "Progress is not an emotional state. It is an architectural calculation."
            </Text>
          </View>
        </View>

        {/* Live Specimen Telemetry Panel */}
        <View style={styles.telemetryPanel}>
          <View style={styles.telemetryHeader}>
            <View>
              <Text style={styles.telemetryEyebrow}>ACTIVE SPECIMEN</Text>
              <Text style={styles.telemetryName}>Archon Candidate</Text>
            </View>
            <View style={styles.sovereignBadge}>
              <Text style={styles.sovereignText}>LVL 14 SOVEREIGN</Text>
            </View>
          </View>

          {/* XP Progress Bar */}
          <View style={styles.xpGauge}>
            <View style={styles.xpGaugeHeader}>
              <Text style={styles.xpLabel}>ASCENSION PROGRESS</Text>
              <Text style={styles.xpVal}>8,450 / 10,000 XP (84.5%)</Text>
            </View>
            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: '84.5%' }]} />
            </View>
          </View>

          {/* Mini Stat Chips */}
          <View style={styles.statGrid}>
            <View style={styles.statChip}>
              <Text style={styles.statChipName}>STR</Text>
              <Text style={styles.statChipVal}>28</Text>
            </View>
            <View style={styles.statChip}>
              <Text style={styles.statChipName}>INT</Text>
              <Text style={styles.statChipVal}>36</Text>
            </View>
            <View style={styles.statChip}>
              <Text style={styles.statChipName}>VIT</Text>
              <Text style={styles.statChipVal}>30</Text>
            </View>
            <View style={styles.statChip}>
              <Text style={styles.statChipName}>DIS</Text>
              <Text style={styles.statChipVal}>42</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 18,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  cohortBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: CyberTheme.emerald,
  },
  cohortText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  metaDivider: {
    color: CyberTheme.border,
    fontSize: 10,
  },
  metaText: {
    color: CyberTheme.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  metaHighlight: {
    color: CyberTheme.amber,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  heroTextGroup: {
    alignItems: 'center',
    gap: 10,
  },
  heroTitle: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: 0.5,
  },
  heroTitleEmphasized: {
    color: CyberTheme.cyan,
    fontStyle: 'italic',
  },
  heroDescription: {
    color: CyberTheme.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    maxWidth: 600,
  },
  actionGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: CyberTheme.cyan,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  btnPrimaryText: {
    color: '#000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnSecondaryText: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  btnPressed: {
    opacity: 0.8,
  },
  specimenCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CyberTheme.borderHighlight,
    overflow: 'hidden',
    marginTop: 8,
  },
  specimenImageWrapper: {
    position: 'relative',
    height: 180,
    backgroundColor: '#000',
  },
  specimenImage: {
    width: '100%',
    height: '100%',
    opacity: 0.75,
  },
  specimenOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    right: 12,
    gap: 4,
  },
  photoTag: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
  },
  photoTagText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '700',
  },
  photoQuote: {
    color: '#FFF',
    fontSize: 11,
    fontStyle: 'italic',
    lineHeight: 15,
  },
  telemetryPanel: {
    padding: 14,
    gap: 10,
    backgroundColor: CyberTheme.bgCard,
  },
  telemetryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  telemetryEyebrow: {
    color: CyberTheme.textMuted,
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  telemetryName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  sovereignBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.4)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sovereignText: {
    color: CyberTheme.purple,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  xpGauge: {
    gap: 4,
  },
  xpGaugeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpLabel: {
    color: CyberTheme.textSecondary,
    fontSize: 9,
    fontWeight: '700',
  },
  xpVal: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '800',
  },
  xpTrack: {
    height: 6,
    backgroundColor: '#090D16',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: CyberTheme.cyan,
    borderRadius: 3,
  },
  statGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  statChip: {
    flex: 1,
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 6,
    gap: 1,
  },
  statChipName: {
    color: CyberTheme.textMuted,
    fontSize: 8,
    fontWeight: '800',
  },
  statChipVal: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
});
