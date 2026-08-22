import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

interface AccessTiersSectionProps {
  onLaunchConsole: () => void;
}

const TIERS = [
  {
    name: 'INITIATE TIER',
    clearance: 'Base Clearance',
    price: 'OPEN ACCESS',
    highlighted: false,
    color: CyberTheme.textMuted,
    features: [
      'Standard Character HUD & Vitals',
      'Daily Quest Board (Up to 10 Active)',
      'Basic Habit Streak Tracking',
      'Local Storage State Engine',
    ],
  },
  {
    name: 'SYSTEM HUNTER',
    clearance: 'Active Vanguard (Recommended)',
    price: 'PRO PROTOCOL',
    highlighted: true,
    color: CyberTheme.cyan,
    features: [
      'Unlimited S to E-Rank Quest Forging',
      'Continuous Habit Streak Multipliers',
      'Full Loot & Artifact Shop Access',
      'Hunter Class Ascension Title Unlocks',
      'Real-time Attribute Progression Matrix',
    ],
  },
  {
    name: 'SOVEREIGN MONARCH',
    clearance: 'Ascended Class',
    price: 'SYNDICATE ACCESS',
    highlighted: false,
    color: CyberTheme.purple,
    features: [
      'All System Hunter Capabilities',
      'Custom Stat Multiplier Calibrations',
      'Multi-Device Cloud Matrix Sync',
      'Private High-Performer Syndicate',
    ],
  },
];

export const AccessTiersSection: React.FC<AccessTiersSectionProps> = ({
  onLaunchConsole,
}) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>CLEARANCE TIERS</Text>
        </View>
        <Text style={styles.title}>Ascension Clearance Protocols</Text>
        <Text style={styles.subtitle}>
          Select your level of commitment to character optimization.
        </Text>
      </View>

      {/* Tiers Grid */}
      <View style={styles.grid}>
        {TIERS.map(tier => (
          <View
            key={tier.name}
            style={[
              styles.card,
              tier.highlighted && styles.cardHighlighted,
            ]}
          >
            <View style={styles.cardTop}>
              <View style={styles.titleGroup}>
                <Text style={[styles.tierName, { color: tier.color }]}>{tier.name}</Text>
                <Text style={styles.tierClearance}>{tier.clearance}</Text>
              </View>
              <Text style={styles.tierPrice}>{tier.price}</Text>
            </View>

            <View style={styles.featureList}>
              {tier.features.map((feat, idx) => (
                <View key={idx} style={styles.featureRow}>
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color={tier.highlighted ? CyberTheme.cyan : CyberTheme.textMuted}
                  />
                  <Text style={styles.featureText}>{feat}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={onLaunchConsole}
              style={({ pressed }) => [
                styles.btnAction,
                tier.highlighted ? styles.btnActionHighlighted : styles.btnActionStandard,
                pressed && styles.btnPressed,
              ]}
            >
              <Text
                style={[
                  styles.btnActionText,
                  tier.highlighted ? styles.btnActionTextHighlighted : styles.btnActionTextStandard,
                ]}
              >
                INITIALIZE CLEARANCE
              </Text>
            </Pressable>
          </View>
        ))}
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
  subtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 550,
  },
  grid: {
    gap: 12,
  },
  card: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 16,
    gap: 14,
  },
  cardHighlighted: {
    borderColor: CyberTheme.cyan,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    shadowColor: CyberTheme.cyan,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 10,
    gap: 8,
  },
  titleGroup: {
    flex: 1,
    gap: 2,
  },
  tierName: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  tierClearance: {
    color: CyberTheme.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  tierPrice: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  featureList: {
    gap: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 16,
    flex: 1,
  },
  btnAction: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnActionHighlighted: {
    backgroundColor: CyberTheme.cyan,
  },
  btnActionStandard: {
    backgroundColor: '#090D16',
    borderWidth: 1,
    borderColor: CyberTheme.border,
  },
  btnActionText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  btnActionTextHighlighted: {
    color: '#000',
  },
  btnActionTextStandard: {
    color: CyberTheme.textSecondary,
  },
  btnPressed: {
    opacity: 0.8,
  },
});
