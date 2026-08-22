import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeroStats, UserProfile } from '@/types/lifexp';
import { CyberTheme } from '@/constants/theme';

interface AttributesViewProps {
  stats: HeroStats;
  user: UserProfile;
}

export const AttributesView: React.FC<AttributesViewProps> = ({ stats, user }) => {
  const ATTRIBUTES = [
    {
      key: 'strength',
      name: 'STRENGTH (STR)',
      val: stats.strength,
      max: 100,
      icon: <FontAwesome5 name="dumbbell" size={14} color="#F97316" />,
      color: '#F97316',
      desc: 'Boosted by heavy lifting, physical training & resistance workouts.',
    },
    {
      key: 'intellect',
      name: 'INTELLECT (INT)',
      val: stats.intellect,
      max: 100,
      icon: <MaterialCommunityIcons name="brain" size={16} color={CyberTheme.cyan} />,
      color: CyberTheme.cyan,
      desc: 'Boosted by coding algorithms, reading technical books & problem solving.',
    },
    {
      key: 'vitality',
      name: 'VITALITY (VIT)',
      val: stats.vitality,
      max: 100,
      icon: <Ionicons name="heart" size={15} color={CyberTheme.emerald} />,
      color: CyberTheme.emerald,
      desc: 'Boosted by optimal sleep, nutrition, hydration & active recovery.',
    },
    {
      key: 'agility',
      name: 'AGILITY (AGI)',
      val: stats.agility,
      max: 100,
      icon: <Ionicons name="footsteps" size={15} color={CyberTheme.amber} />,
      color: CyberTheme.amber,
      desc: 'Boosted by speed of execution, fast sprints & daily step counts.',
    },
    {
      key: 'discipline',
      name: 'DISCIPLINE (DIS)',
      val: stats.discipline,
      max: 100,
      icon: <Ionicons name="shield-checkmark" size={15} color={CyberTheme.purple} />,
      color: CyberTheme.purple,
      desc: 'Boosted by habit consistency, deep focus blocks & daily meditation.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerGroup}>
        <View style={styles.titleRow}>
          <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={18} color={CyberTheme.cyan} />
          <Text style={styles.sectionTitle}>HERO ATTRIBUTES & MATRIX</Text>
        </View>
        <Text style={styles.sectionSubtitle}>
          Real-time neuro-biological & physiological RPG stat progression.
        </Text>
      </View>

      {/* Attributes Card */}
      <View style={styles.statsCard}>
        {ATTRIBUTES.map((attr, index) => {
          const pct = Math.min(100, (attr.val / attr.max) * 100);
          const isLast = index === ATTRIBUTES.length - 1;

          return (
            <View key={attr.key} style={[styles.attrRow, !isLast && styles.attrRowBorder]}>
              <View style={styles.attrHeader}>
                <View style={styles.attrNameGroup}>
                  {attr.icon}
                  <Text style={[styles.attrNameText, { color: attr.color }]}>{attr.name}</Text>
                </View>
                <Text style={styles.attrValueText}>
                  {attr.val} <Text style={styles.attrValueMax}>/ {attr.max}</Text>
                </Text>
              </View>

              {/* Bar */}
              <View style={styles.attrTrack}>
                <View style={[styles.attrFill, { width: `${pct}%`, backgroundColor: attr.color }]} />
              </View>

              {/* Description */}
              <Text style={styles.attrDesc}>{attr.desc}</Text>
            </View>
          );
        })}
      </View>

      {/* Hunter Class Ascension Card */}
      <View style={styles.ascensionCard}>
        <View style={styles.ascensionHeader}>
          <Ionicons name="trophy" size={16} color={CyberTheme.purple} />
          <Text style={styles.ascensionTitle}>HUNTER CLASS ASCENSION</Text>
        </View>

        <View style={styles.ascensionDetails}>
          <View style={styles.ascensionItem}>
            <Text style={styles.ascensionLabel}>CURRENT TITLE</Text>
            <Text style={styles.ascensionValCyan}>{user.title}</Text>
          </View>
          <View style={styles.ascensionItem}>
            <Text style={styles.ascensionLabel}>NEXT ASCENSION</Text>
            <Text style={styles.ascensionValPurple}>Grandmaster Monarch (Level 10)</Text>
          </View>
          <View style={styles.ascensionItem}>
            <Text style={styles.ascensionLabel}>ACTIVE BUFFS</Text>
            <Text style={styles.ascensionValEmerald}>+10% Daily Habit XP Multiplier</Text>
          </View>
        </View>
      </View>

      {/* System Tip */}
      <View style={styles.tipCard}>
        <Ionicons name="sparkles" size={20} color={CyberTheme.cyan} />
        <View style={styles.tipContent}>
          <Text style={styles.tipTitle}>SYSTEM PROTOCOL</Text>
          <Text style={styles.tipText}>
            Completing S-Rank quests grants permanent stat multipliers and unlocks legendary equipment in the Loot Shop.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 14,
  },
  headerGroup: {
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1,
  },
  sectionSubtitle: {
    color: CyberTheme.textSecondary,
    fontSize: 11,
  },
  statsCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CyberTheme.border,
    padding: 16,
    gap: 12,
  },
  attrRow: {
    gap: 6,
    paddingBottom: 10,
  },
  attrRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(30, 41, 59, 0.6)',
  },
  attrHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  attrNameGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  attrNameText: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  attrValueText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '900',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  attrValueMax: {
    color: CyberTheme.textMuted,
    fontSize: 10,
  },
  attrTrack: {
    height: 7,
    backgroundColor: '#090D16',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
  },
  attrFill: {
    height: '100%',
    borderRadius: 3,
  },
  attrDesc: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    lineHeight: 14,
  },
  ascensionCard: {
    backgroundColor: CyberTheme.bgCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(168, 85, 247, 0.3)',
    padding: 16,
    gap: 12,
  },
  ascensionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: CyberTheme.border,
    paddingBottom: 8,
  },
  ascensionTitle: {
    color: CyberTheme.purple,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  ascensionDetails: {
    gap: 8,
  },
  ascensionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#090D16',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CyberTheme.border,
  },
  ascensionLabel: {
    color: CyberTheme.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  ascensionValCyan: {
    color: CyberTheme.cyan,
    fontSize: 12,
    fontWeight: '800',
  },
  ascensionValPurple: {
    color: CyberTheme.purple,
    fontSize: 12,
    fontWeight: '800',
  },
  ascensionValEmerald: {
    color: CyberTheme.emerald,
    fontSize: 11,
    fontWeight: '700',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(6, 182, 212, 0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(6, 182, 212, 0.25)',
    padding: 14,
  },
  tipContent: {
    flex: 1,
    gap: 2,
  },
  tipTitle: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  tipText: {
    color: CyberTheme.textSecondary,
    fontSize: 10,
    lineHeight: 14,
  },
});
