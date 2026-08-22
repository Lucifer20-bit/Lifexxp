import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

export const PhilosophySection: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>OPERATING THESIS</Text>
        </View>
        <Text style={styles.title}>
          From Superficial Stimulation to <Text style={styles.titleHighlight}>Sovereign Character</Text>
        </Text>
        <Text style={styles.subtitle}>
          Most productivity tools treat human focus like a consumer game. LifeXP treats your daily actions like military-grade character architecture.
        </Text>
      </View>

      {/* Comparison Grid */}
      <View style={styles.comparisonGrid}>
        {/* Left: Legacy Traps */}
        <View style={styles.legacyCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="close-circle" size={16} color={CyberTheme.rose} />
            <Text style={styles.legacyTitle}>CONVENTIONAL GAMIFICATION</Text>
          </View>
          <View style={styles.pointList}>
            <Text style={styles.legacyPoint}>• Arbitrary badges with zero real-world leverage</Text>
            <Text style={styles.legacyPoint}>• Dopamine depletion through endless micro-notifications</Text>
            <Text style={styles.legacyPoint}>• Fictional leveling disconnected from physical health</Text>
            <Text style={styles.legacyPoint}>• Easy task spamming to fake daily progress</Text>
          </View>
        </View>

        {/* Right: LifeXP Sovereign System */}
        <View style={styles.sovereignCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="checkmark-circle" size={16} color={CyberTheme.cyan} />
            <Text style={styles.sovereignTitle}>LIFEXP SOVEREIGN STANDARD</Text>
          </View>
          <View style={styles.pointList}>
            <Text style={styles.sovereignPoint}>• S-Rank quest matrix tied directly to real deliverables</Text>
            <Text style={styles.sovereignPoint}>• Multiplied gold & XP driven by genuine habit consistency</Text>
            <Text style={styles.sovereignPoint}>• Neuro-biological attribute scaling (STR, INT, VIT, DIS)</Text>
            <Text style={styles.sovereignPoint}>• Permanent compounding momentum toward career ascendance</Text>
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
    gap: 16,
  },
  headerGroup: {
    alignItems: 'center',
    gap: 8,
  },
  sectionBadge: {
    backgroundColor: 'rgba(6, 182, 212, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sectionBadgeText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 26,
  },
  titleHighlight: {
    color: CyberTheme.cyan,
  },
  subtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 550,
  },
  comparisonGrid: {
    gap: 12,
  },
  legacyCard: {
    backgroundColor: '#090D16',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(244, 63, 94, 0.3)',
    padding: 14,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 6,
  },
  legacyTitle: {
    color: CyberTheme.rose,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  sovereignCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.4)',
    padding: 14,
    gap: 8,
  },
  sovereignTitle: {
    color: CyberTheme.cyan,
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  pointList: {
    gap: 6,
  },
  legacyPoint: {
    color: CyberTheme.textMuted,
    fontSize: 11,
    lineHeight: 16,
  },
  sovereignPoint: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '600',
  },
});
