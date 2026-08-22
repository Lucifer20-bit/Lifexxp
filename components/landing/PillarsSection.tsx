import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { CyberTheme } from '@/constants/theme';

export const PillarsSection: React.FC = () => {
  const PILLARS = [
    {
      title: 'PHYSICAL VITALITY',
      subtitle: 'Zone 2 Cardio, Compound Lifts & Sleep Recovery',
      icon: <FontAwesome5 name="heartbeat" size={18} color={CyberTheme.rose} />,
      color: CyberTheme.rose,
      desc: 'Build an unshakeable biological engine. Energy capacity dictates the ultimate ceiling of your cognitive and creative output.',
    },
    {
      title: 'COGNITIVE INTELLECT',
      subtitle: 'Deep Work, Algorithm Drills & Technical Mastery',
      icon: <MaterialCommunityIcons name="brain" size={20} color={CyberTheme.cyan} />,
      color: CyberTheme.cyan,
      desc: 'Sharpen your neural architecture through deliberate problem-solving sessions and high-retention architectural analysis.',
    },
    {
      title: 'EXECUTION AGILITY',
      subtitle: 'Rapid Prototyping & Bias to Action',
      icon: <Ionicons name="flash" size={20} color={CyberTheme.amber} />,
      color: CyberTheme.amber,
      desc: 'Eliminate hesitation. Transform complex strategic goals into deployed, functional software with military precision.',
    },
    {
      title: 'SOVEREIGN DISCIPLINE',
      subtitle: 'Distraction-Free Windows & Habit Streaks',
      icon: <Ionicons name="shield-checkmark" size={20} color={CyberTheme.purple} />,
      color: CyberTheme.purple,
      desc: 'Automate high-performance routines. Long habit streaks multiply your compound character momentum over years.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>THE FOUR CORNERSTONES</Text>
        </View>
        <Text style={styles.title}>Engineered for Total Spectrum Mastery</Text>
        <Text style={styles.subtitle}>
          LifeXP does not isolate single tasks; it bridges your biology, mind, execution speed, and discipline into a unified RPG system.
        </Text>
      </View>

      {/* Pillars Grid */}
      <View style={styles.grid}>
        {PILLARS.map(pillar => (
          <View key={pillar.title} style={styles.card}>
            <View style={styles.cardHeader}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: `${pillar.color}15`, borderColor: `${pillar.color}40` },
                ]}
              >
                {pillar.icon}
              </View>
              <View style={styles.titleGroup}>
                <Text style={[styles.cardTitle, { color: pillar.color }]}>{pillar.title}</Text>
                <Text style={styles.cardSubtitle}>{pillar.subtitle}</Text>
              </View>
            </View>
            <Text style={styles.cardDesc}>{pillar.desc}</Text>
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
    backgroundColor: 'rgba(168, 85, 247, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sectionBadgeText: {
    color: CyberTheme.purple,
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
    gap: 10,
  },
  card: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 14,
    gap: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleGroup: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    color: CyberTheme.textMuted,
    fontSize: 10,
  },
  cardDesc: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
});
