import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { CyberTheme, RankColors } from '@/constants/theme';

const TIERS = [
  {
    rank: 'S',
    name: 'SUPREME ASCENSION',
    xp: '500 XP',
    gold: '150 G',
    stat: '+3 STAT BOOST',
    desc: 'Grand architectural milestones, major product launches & zero-to-one ventures.',
  },
  {
    rank: 'A',
    name: 'MASTER LEVEL',
    xp: '350 XP',
    gold: '80 G',
    stat: '+2 STAT BOOST',
    desc: 'Complex algorithmic challenges, deep work multi-hour sprint sessions & critical features.',
  },
  {
    rank: 'B',
    name: 'ADEPT DRILL',
    xp: '200 XP',
    gold: '50 G',
    stat: '+1 STAT BOOST',
    desc: 'High-leverage deliverables, 5KM cardiovascular workouts & textbook chapters.',
  },
  {
    rank: 'C',
    name: 'STANDARD TARGET',
    xp: '120 XP',
    gold: '30 G',
    stat: '+1 STAT BOOST',
    desc: 'Daily task execution, pull request reviews & targeted learning modules.',
  },
  {
    rank: 'D',
    name: 'MINOR OBJECTIVE',
    xp: '80 XP',
    gold: '20 G',
    stat: 'BASE RECOVERY',
    desc: 'Small bug fixes, email clearing blocks & light movement routines.',
  },
  {
    rank: 'E',
    name: 'BASIC HYGIENE',
    xp: '50 XP',
    gold: '10 G',
    stat: 'VITAL STABILIZATION',
    desc: 'Hydration checkpoints, posture resets & baseline physical upkeep.',
  },
];

export const QuestEngineSection: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.sectionBadge}>
          <Text style={styles.sectionBadgeText}>TACTICAL PROTOCOL</Text>
        </View>
        <Text style={styles.title}>The 6-Tier Quest Engine</Text>
        <Text style={styles.subtitle}>
          Every challenge is classified by difficulty rank, calibrating immediate XP and Gold rewards along with permanent attribute point allocation.
        </Text>
      </View>

      {/* Tiers Grid */}
      <View style={styles.grid}>
        {TIERS.map(tier => {
          const rankStyle = RankColors[tier.rank] || RankColors.E;

          return (
            <View key={tier.rank} style={styles.card}>
              <View style={styles.cardTop}>
                <View
                  style={[
                    styles.rankBadge,
                    { backgroundColor: rankStyle.bg, borderColor: rankStyle.border },
                  ]}
                >
                  <Text style={[styles.rankText, { color: rankStyle.text }]}>
                    RANK {tier.rank}
                  </Text>
                </View>
                <Text style={styles.tierName}>{tier.name}</Text>
              </View>

              <Text style={styles.tierDesc}>{tier.desc}</Text>

              {/* Rewards */}
              <View style={styles.rewardRow}>
                <View style={styles.rewardXp}>
                  <Text style={styles.rewardXpText}>{tier.xp}</Text>
                </View>
                <View style={styles.rewardGold}>
                  <Text style={styles.rewardGoldText}>{tier.gold}</Text>
                </View>
                <View style={styles.rewardStat}>
                  <Text style={styles.rewardStatText}>{tier.stat}</Text>
                </View>
              </View>
            </View>
          );
        })}
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
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.35)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sectionBadgeText: {
    color: CyberTheme.amber,
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
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  rankText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tierName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  tierDesc: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
    lineHeight: 15,
  },
  rewardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
    marginTop: 2,
  },
  rewardXp: {
    backgroundColor: CyberTheme.cyanGlow,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rewardXpText: {
    color: CyberTheme.cyan,
    fontSize: 9,
    fontWeight: '800',
  },
  rewardGold: {
    backgroundColor: CyberTheme.amberGlow,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rewardGoldText: {
    color: CyberTheme.amber,
    fontSize: 9,
    fontWeight: '800',
  },
  rewardStat: {
    backgroundColor: CyberTheme.purpleGlow,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rewardStatText: {
    color: CyberTheme.purple,
    fontSize: 9,
    fontWeight: '800',
  },
});
